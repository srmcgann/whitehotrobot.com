<template>
  <div class="main">
    <div v-if="state.stage==1" class="controls" style="width: 750px;">
      <select v-model="state.colorMode" style="margin-right: 10px;" @input="c.focus()">
        <option selected value="cyberpunk">cyberpunk</option>
        <option value="rainbows">rainbows</option>
      </select>
      <div v-if="!(state.author && state.stage==1 && !state.challengerJoined)" style="display: inline-block;">
        <input v-if="!state.singlePlayerMode" type="search" v-model="state.playerName" style="width: 150px; font-size: 18px; margin-right: 10px;background: #1236" @input="pollServer(1)">
        <div style="display: inline-block;" v-if="state.author">
          <span ref="gamelink" class= "gamelink" v-html="processedGameLink" style="font-size: .75em;background: #001; display: inline-block"></span>
          <div style="display: inline-block;">
            <button style="font-size: 14px;margin-left: 5px; padding: 5px; padding-left: 30px; padding-right: 1=5px; margin-top: 0px;background-image: url(https://lookie.jsbot.net/uploads/19npcK.png);background-repeat: no-repeat;background-position: 5px 2px; text-shadow: 1px 1px 2px #000;background-size: 20px 20px; border: 1px solid #8888; background-color: #6fa8;border-radius: 8px;padding-top: 3;"
            @click="copy()"
            :class="{'copied':state.linkCopied}"
            >copy</button><br>
            <span v-if="state.linkCopied" style="color: #0f8;font-size:12px;position: absolute; maring-top: 45px; width: 120px;margin-left: -58px;">link copied!</span>
          </div>
        </div>
      </div>
    </div>
    <Header :state="state"/>
    <div class="actionContainer">
      <canvas ref="mainCanvas" tabindex="0"></canvas>
      <div class="inputForm" :class="{'noyellow': state.colorMode=='cyberpunk'}" v-if="!state.stage || state.stage==2">
        <div class="innerInputForm" style="margin-top: -40px;background: #6488; padding: 20px; border-radius: 50%; box-shadow: 0 0 100px 100px #6488;width:300px;">
          <div v-if="state.stage" style="color: #8fa;font-size: 1.4em;line-height: 1em;">
            You've been<br><span style="font-size: .8em;">challenged to a</span><br>Tetris match!<br>
          </div>
          <div v-if="!state.stage" style="color: #8fa">
            create a multiplayer<br><span style="font-size: 1.5em;">Tetris match!</span><br>
          </div><br>
          <input
            type="search"
            maxlength="16"
            placeholder="enter your name"
            v-model="state.playerName"
            autocomplete="off"
            ref="userNameField"
            v-on:keyup.enter="state.stage ? joinGame() : createGame()"
          ><br>
          <button
            v-if="state.playerName"
            class="createGameButton"
            :class="{'disabled': !state.playerName.length}"
            :disabled="!state.playerName.length"
            style="position: absolute; width: 250px;transform: translatex(-50%);margin-top: 20px;"
            @click="state.stage ? joinGame() : createGame()"
            v-html="state.stage ? 'join game' : 'create game'"
          ></button><br>
          <br>or<br><br>
          <button @click="launchSinglePlayer()">play single<br>player mode</button>
        </div>
      </div>
      <div v-if="!state.gameActuallyPlaying">
        <div v-if="!state.author && state.stage==1" style="position: absolute; z-index: 1000; top:50%; left: 50%; transform: translate(-50%, -50%);background: #28a8; box-shadow: 0 0 100px 100px #28a8; padding: 20px; border-radius: 50%; font-size: 1em; margin-top:0px; width: 350px;">
          <div v-if="countdown <= 0" style="margin-top: -30px;">
            <div style="color: #fff; text-shadow: 2px 2px 2px #000;">
            <span style="font-size: 3em;text-shadow: 0 0 10px #fff;color: #0ff;">{{playerJoinedCount}}<br></span>players<br>have joined...<br>
              <span style="font-size: .6em;">
                {{Array(1+(t*8|0)%8).fill(' <').join('')+Array(1+(t*8|0)%8).fill('> ').join('')}}<br>
                waiting for the<br>
                <span style="font-size: 2em;">game master</span><br>to start the game<br>
                {{Array(1+(t*8|0)%8).fill(' <').join('')+Array(1+(t*8|0)%8).fill('> ').join('')}}
              </span>
            </div>
          </div>
          <div v-else>
            <div
              :class="{'noyello': state.colorMode=='cyberpunk'}"
              :style="'transform: scale('+(.1+(t%1)*20)+'); opacity: '+(1-t%1)"
              v-html="countdown"
            ></div>
          </div>
        </div>
        <div v-if="state.author && state.stage==1 && state.challengerJoined" style="position: absolute; z-index: 1000; top:50%; left: 50%; transform: translate(-50%, -50%);background: #28a8; box-shadow: 0 0 100px 100px #28a8; padding: 40px; border-radius: 50%; font-size: .8em; margin-top:-20px;">
          <div v-if="countdown <= 0">
            {{playerJoinedCount}} players have joined...<br>
            <button
              style="background: linear-gradient(135deg, #0ff, #80f); color: #000; margin-top: 10px;"
              @click="playGame()"
              ref="startGameButton"
            >start game</button>
          </div>
          <div v-else>
            <div
              :style="'transform: scale('+(.1+(t%1)*20)+'); opacity: '+(1-t%1)"
              v-html="countdown"
            ></div>
          </div>
        </div>
      </div>
      <div v-if="state.stage == 1 && !state.alive" >
        <div style="position: absolute; z-index: 1000; top:50%; left: 50%; transform: translate(-50%, -50%);background: #f038; box-shadow: 0 0 100px 100px #f038; padding: 40px; border-radius: 50%; font-size: .8em; text-shadow: 2px 2px 2px #000;margin-top: -30px;">
          You've been defeated!<br><br>
          <button
            @click="reload()"
          >re-start</button>
        </div>
      </div>
      <div v-if="state.author && state.stage==1 && !state.challengerJoined" style="position: absolute; z-index: 1000; top:50%; left: 50%; transform: translate(-50%, -50%);background: #86c8; box-shadow: 0 0 100px 100px #86c8; padding: 40px; border-radius: 50%; font-size: .8em; text-shadow: 2px 2px 2px #000;">
        share this link with<br>up to 3 opponents!<br>
        <span ref="gamelink" class= "gamelink" v-html="processedGameLink" style="background: #001;"></span><br>
        <div class="copyButtonDiv" style="display: inline-block">
          <button style="font-size: 18px;margin-left: 5px; padding: 15px; padding-left: 50px; padding-right: 10px; margin-top: 10px;background-image: url(https://lookie.jsbot.net/uploads/19npcK.png);background-repeat: no-repeat;background-position: 5px 5px; text-shadow: 1px 1px 2px #000;background-size: 40px 40px; border: 1px solid #8888; background-color: #6fa8;border-radius: 8px;"
          @click="copy()"
          :class="{'copied':state.linkCopied}"
          >copy</button><br>
          <span v-if="state.linkCopied" style="color: #0f8;font-size:20px;position: absolute; maring-top: 45px; width: 120px;margin-left: -58px;">link copied!</span>
        </div><br>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
export default {
  name: 'Main',
  props: [ 'state' ],
  components: {
    Header
  },
  data(){
    return {
      t: 0,
      S: Math.sin,
      C: Math.cos,
      x: null,
      currentPiece: null,
      swapped: false,
      boardBG: new Image(),
      tempBoard: [],
      initDropFreq: 40,
      dropFreq: 40,
      rowsCompleted: 0,
      c: null,
      spaceKey: false,
      leftKey: false,
      upKey: false,
      rightKey: false,
      downKey: false,
      tabKey: false,
      pieceMoveTimer: 0,
      pieceRotateTimer: 0,
      piceMoveInterval: .15,
      pieceManualDropTimer: 0,
      piecManualDropInterval: .02,
      B: [],
      G: [],
      R: null,
      nextPieceIdx: Math.random()*7|0,
      stage: null
    }
  },
  computed:{
    countdown(){
      return (this.state.countdownTimer - this.t | 0)
    },
    playerJoinedCount(){
      let ret = 0
      ret += this.state.playerAName ? 1 : 0
      ret += this.state.playerBName ? 1 : 0
      ret += this.state.playerCName ? 1 : 0
      ret += this.state.playerDName ? 1 : 0
      if(ret < 2) this.state.challengerJoined = false
      return ret
    },
    processedGameLink(){
      //return '<a href="' + this.state.gameLink + '" target="_blank">' + this.state.gameLink + '</a>'
      return this.state.gameLink
    }
  },
  methods:{
    launchSinglePlayer(){
      this.state.singlePlayerMode = true
      this.startGame()
    },
    spawnPiece(X, Y){
      this.tempBoard = JSON.parse(JSON.stringify(this.state.boardData))
      let n = this.nextPieceIdx
      this.nextPieceIdx = this.B.length*Math.random()|0
      let tempPiece = JSON.parse(JSON.stringify(this.B))[n].map(v=>{
        return [
          Math.round(X + v[0]),
          Math.round(Y + v[1]),
          n
        ]
      })
      if(this.canDo(tempPiece)){
        this.currentPiece = tempPiece
        this.state.boardData = this.state.boardData.map((v, i)=>{
          let tx = i%10
          let ty = (i/10|0) - 6
          this.currentPiece.map(q=>{
            if(q[0] == tx && q[1] == ty){
              v[0] = q[2]+1
              v[1] = 0
            }
          })
          return v
        })
      } else {
        this.state.alive = false
      }
    },
    checkRowCompletion(){
      let rowfound
      for(let j=26; j--;){
        rowfound = true
        for(let i=0; i<10; ++i){
          if(!this.state.boardData[j*10+i][0]) rowfound = false
        }
        if(rowfound){
          this.rowsCompleted++
          this.dropFreq = this.initDropFreq / (1+this.rowsCompleted/20)
          if(this.rowsCompleted > this.state.highScore) this.state.highScore = this.rowsCompleted
          for(let i=0; i<10; ++i){
            this.state.boardData[j*10+i][1] = 1
          }
        }
      }
    },
    canDo(piece){
      let ret = true
      this.tempBoard.map((v, i)=>{
        let tx = i%10
        let ty = (i/10|0) - 6
        piece.map(q=>{
          if(q[0] == tx && q[1] == ty && v[0] ||
          q[1] > 19 ||
          q[0] < 0 ||
          q[0] > 9
          ) ret = false
        })
      })
      return ret
    },
    advancePiece(){
      if(!this.currentPiece) return
      let tempPiece = JSON.parse(JSON.stringify(this.currentPiece)).map(v=>{
          return [
            Math.round(v[0]),
            Math.round(v[1]+1),
            v[2]
          ]
        })
        
        
      if(this.canDo(tempPiece)){
        this.currentPiece = tempPiece
        this.state.boardData = JSON.parse(JSON.stringify(this.tempBoard))
        this.state.boardData = this.state.boardData.map((v, i)=>{
          let tx = i%10
          let ty = (i/10|0) - 6
          this.currentPiece.map(q=>{
            if(q[0] == tx && q[1] == ty){
              v[0] = q[2]+1
              v[1] = 0
            }
          })
          return v
        })
      } else {
        this.swapped = false
        this.state.boardData = this.state.boardData.map((v, i)=>{
          let tx = i%10
          let ty = (i/10|0) - 6
          this.currentPiece.map(q=>{
            if(q[0] == tx && q[1] == ty){
              v[0] = q[2]+1
              v[1] = 0
            }
          })
          return v
        })
        this.currentPiece = null
        this.tempBoard = JSON.parse(JSON.stringify(this.state.boardData))
        this.checkRowCompletion()
      }
    },
    syncBoard(){
      this.state.boardData = Array(260).fill().map(v=>[0,0])
      this.dropFreq = this.initDropFreq
      this.rowsCompleted = 0
      this.tempBoard = Array(260).fill().map(v=>[0,0])
    },
    copy(){
      this.state.copyToClipboard(this.$refs.gamelink)
    },
    createGame(){
      this.state.createGame()
    },
    joinGame(){
      this.state.playerNumber = '';
      this.state.stage = 1
      this.state.alive = true
      this.syncBoard()
      this.pollServer()
      this.$nextTick(()=>this.Draw())
    },
    drawNextPiece(tx1, ty1, nextPieceIdx, msx){
      let t = this.t
      let S = this.S
      let C = this.C
      let x = this.x
      let c = this.c
            
      x.lineJoin=x.lineCap = 'round'
      let X, Y, Z, R
      ty1 += 70
      let Rl, Pt, Yw, oX, oY, oZ
      Rl=t/4, Pt=-t/1.5, Yw=t*2
      let s = (c.height - c.height/20) * msx
      oX=0, oY=0, oZ=Math.max(4, 16 - s/60)

      let M, A, p, H, d
      R = (Rl,Pt,Yw,o)=>{
        X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d
        if(o)X+=oX,Y+=oY,Z+=oZ
      }
      this.B.map((v, j)=>{
        if(j==nextPieceIdx){
          v.map(v=>{
            let tx=v[0]
            let ty=v[1]
            let tz=v[2]
            this.G.map((q, i)=>{
              X = q[0] + tx
              Y = q[1] + ty
              Z = q[2] + tz
              R(Rl*(j%2?1:-1),Pt*(j%2?1:-1.5),Yw,1)
              if(!(i%4)) x.beginPath()
              x.lineTo(tx1 + s/4.5 - 100 + X/Z*200,ty1 + s/8 - 70 + Y/Z*200)
              if(i%4==3){
                switch(this.state.colorMode){
                  case 'cyberpunk':
                    x.strokeStyle=`hsla(${170},75%,${60}%,.8)`
                    x.fillStyle=`hsla(${170},75%,${60}%,.3)`
                    break
                  case 'rainbows':
                    x.strokeStyle=`hsla(${360/7*j},75%,50%,.8)`
                    x.fillStyle=`hsla(${360/7*j},75%,50%,.3)`
                    break
                }
                x.closePath()
                x.lineWidth=5/Z
                //x.strokeStyle=`hsla(${360/7*j},99%,80%,.8)`
                x.stroke()
                //x.fillStyle=`hsla(${360/7*j},99%,50%,.3)`
                x.fill()
              }
            })
          })
        }
      })
    },
    drawOpponents(X, Y){
      let t = this.t
      let S = this.S
      let C = this.C
      let x = this.x
      let c = this.c
      let tx, ty, j, tx1, ty1
      let ms = .4
      let s = (c.height - c.height/20) * ms
      let oy = Y + s/4


      if(this.state.singlePlayerMode){
        x.font  = s/10 + 'px "Varela Round"'
        x.fillStyle = '#0f8'
        x.fillText('high score', X + s/4, Y + s/8*2)
        x.fillStyle = '#fff'
        x.fillText(this.state.highScore, X + s/2 - s/32, Y + s/8*3)
        x.fillStyle = '#0f8'
        x.fillText('rows completed', X + s/6, Y + s/8*5)
        x.fillStyle = '#fff'
        x.fillText(this.rowsCompleted, X + s/2 - s/32, Y + s/8*6)
        return
      } else if(this.state.challengerJoined){
        let ms = .2
        let s = (c.height - c.height/20) * ms
        let oy = Y + s/4
        for(let k=0; k<4; ++k){
          let active = true
          switch(k){
            case 0: if(!this.state.playerAName) active = false; break
            case 1: if(!this.state.playerBName) active = false; break
            case 2: if(!this.state.playerCName) active = false; break
            case 3: if(!this.state.playerDName) active = false; break
          }
          let mx = (k%2+.3) * s*1.05
          let my = ((k/2|0)) * s * 1.22
          tx = mx + X + s/32 - s/4
          let name
          Y=my+oy
          if(active){
            let boardData = []
            switch(k){
              case 0: boardData = this.state.playerAdata.boardData; break
              case 1: boardData = this.state.playerBdata.boardData; break
              case 2: boardData = this.state.playerCdata.boardData; break
              case 3: boardData = this.state.playerDdata.boardData; break
            }
            x.drawImage(this.boardBG, tx, Y, s/2, s)
            let msp = s/1000
            boardData.map((v,i)=>{
              if(v[0]){
                let px = mx + (i%10) * s / 20 + s / 35- s/4
                let py = ((i/10|0)-6) * s / 20 - s/35
                if((i/10|0)-6>=0){
                  switch(this.state.colorMode){
                    case 'cyberpunk':
                      x.fillStyle=`hsla(${170},75%,${(v[1]?v[1]-1:0)*50*S(t*50)+25+70/7*(v[0]-1)}%,.8)`
                      break
                    case 'rainbows':
                      x.fillStyle=`hsla(${360/7*(v[0]-1)},75%,${(v[1]?v[1]-1:0)*50*S(t*50)+50}%,.8)`
                      break
                  }
                  x.fillRect(X + px + msp, Y + py + s/40 + msp, s/20 - msp*2, s/20 - msp*2)
                }
              }
            })
            x.strokeStyle='#aff6'
            x.lineWidth = 2
            x.strokeRect(tx, Y, s/2, s)

            let alive = true
            switch(k){
              case 0: alive = this.state.playerAdata.alive; break
              case 1: alive = this.state.playerBdata.alive; break
              case 2: alive = this.state.playerCdata.alive; break
              case 3: alive = this.state.playerDdata.alive; break
            }
            if(!alive){
              x.fillStyle='#f248'
              x.fillRect(tx, Y, s/2, s)
            }

            x.font = s/10 + 'px "Varela Round"'
            switch(this.state.colorMode){
              case 'cyberpunk': x.fillStyle='#0f8'; break
              case 'rainbows': x.fillStyle='#ff0'; break
              default: x.fillStyle='#0f8';
            }
            switch(k){
              case 0: name = this.state.playerAName; break
              case 1: name = this.state.playerBName; break
              case 2: name = this.state.playerCName; break
              case 3: name = this.state.playerDName; break
            }
            name = '"' + name + '"'
            x.fillStyle='#ff0'
            x.fillText(name, tx, Y - s/28)

            x.font = s/10 + 'px "Varela Round"'
            let highscore          
            switch(k){
              case 0: highscore = this.state.playerAdata.highScore; break
              case 1: highscore = this.state.playerBdata.highScore; break
              case 2: highscore = this.state.playerCdata.highScore; break
              case 3: highscore = this.state.playerDdata.highScore; break
            }
            
            x.fillStyle='#0f8'
            x.fillText('high', tx + s/1.9, Y + s/10)
            x.fillText('score', tx + s/1.9, Y + s/10*2)
            x.fillStyle="#fff"
            x.fillText(highscore, tx + s/1.75, Y + s/10*3)

            let currows
            switch(k){
              case 0: currows = this.state.playerAdata.rowsCompleted; break
              case 1: currows = this.state.playerBdata.rowsCompleted; break
              case 2: currows = this.state.playerCdata.rowsCompleted; break
              case 3: currows = this.state.playerDdata.rowsCompleted; break
            }
            x.fillStyle='#0f8'
            x.fillText('current', tx + s/1.9, Y + s/10 * 6)
            x.fillText('rows', tx + s/1.9, Y + s/10 * 7)
            x.fillStyle="#fff"
            x.fillText(currows, tx + s/1.75, Y + s/10 * 8)
          } else {
            x.fillStyle='#2228'
            x.fillRect(tx, Y, s/2, s)
            x.strokeStyle='#8886'
            x.lineWidth = 1
            x.strokeRect(tx, Y, s/2, s)
            name = 'not joined'
            x.font = s/10 + 'px "Varela Round"'
            x.fillStyle='#888'
            x.fillText(name, tx, Y - s/28)
          }
        }
      } else {
        Y = oy
        x.font = s/8 + 'px "Varela Round"'
        x.fillStyle='#fff8'
        x.fillText('awaiting', X + s/3.25, Y + s/4)
        x.fillText('challenger(s)', X + s / 5, Y + s/2.5)
        x.font = s/4 + 'px "Varela Round"'
        x.fillStyle='#4688'
        x.fillText('['+Array((t*8|0)%8).fill('.').join('')+']', X + s / 2.1 - ((t*8|0)%8)*.035*s, Y + s/1.45)
      }
    },
    async pollServer(quickPoll){
      
      let sendData = {
        playerNumber: this.state.playerNumber,
        gameID: this.state.gameID,
        playerName: this.state.playerName,
        gamedata: {
          boardData: this.state.boardData,
          highScore: this.state.highScore,
          rowsCompleted: this.rowsCompleted,
          alive: this.state.alive,
          playerName: this.state.playerName,
          playerNumber: this.state.playerNumber
        }
      }
      let res = await fetch(this.state.baseURL + '/sync.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          if(data[0] == 'error - game full'){
            alert('OOPS! game is full... you can create a new game though!')
            window.location.href = window.location.origin
          } else {
            if(data[2]){
              if(!(+data[2].playing)) this.state.gameActuallyPlaying = false
              if(!!(+data[2].playing) && !this.state.gameActuallyPlaying && !this.state.countdownTimer){
                this.t = 1
                this.state.countdownTimer = this.t + 6
              }
            }
            this.state.playerNumber = data[0]
            let gamedata = data[2]
            //let gamedataA = JSON.parse(gamedata.gamedataA)
            let gamedataA = gamedata.gamedataA == '' ? [] : JSON.parse(gamedata.gamedataA)
            let gamedataB = gamedata.gamedataB == '' ? [] : JSON.parse(gamedata.gamedataB)
            let gamedataC = gamedata.gamedataC == '' ? [] : JSON.parse(gamedata.gamedataC)
            let gamedataD = gamedata.gamedataD == '' ? [] : JSON.parse(gamedata.gamedataD)
            if(typeof gamedataA.playerNumber == 'undefined'){
              this.state.playerAName = ''
              this.state.playerAdata = {boardData:[]}
            }
            if(typeof gamedataB.playerNumber == 'undefined'){
              this.state.playerBName = ''
              this.state.playerBdata = {boardData:[]}
            }
            if(typeof gamedataC.playerNumber == 'undefined'){
              this.state.playerCName = ''
              this.state.playerCdata = {boardData:[]}
            }
            if(typeof gamedataD.playerNumber == 'undefined'){
              this.state.playerDName = ''
              this.state.playerDdata = {boardData:[]}
            }
            let tname
            if(this.state.author){
              tname = gamedataA.playerName              
            }
            switch(this.state.playerNumber){
              case 'B':
                tname = gamedataB.playerName; break
              case 'C':
                tname = gamedataC.playerName; break
              case 'D':
                tname = gamedataD.playerName; break
              default: if(!this.state.author) tname = ''; break
            }
            this.state.playerAdata = gamedataA
            this.state.playerBdata = gamedataB
            this.state.playerCdata = gamedataC
            this.state.playerDdata = gamedataD
            if(typeof tname != 'undefined' && !quickPoll && tname.length && (this.t - this.state.lastNameUpdateTimer) > 3 || this.t < 3){
              this.state.playerName = tname
              this.state.playerAdata = gamedataA
            }
            if(typeof gamedataA.playerName != 'undefined') this.state.playerAName = gamedataA.playerName
            if(typeof gamedataB.playerName != 'undefined') this.state.playerBName = gamedataB.playerName
            if(typeof gamedataC.playerName != 'undefined') this.state.playerCName = gamedataC.playerName
            if(typeof gamedataD.playerName != 'undefined') this.state.playerDName = gamedataD.playerName
            if(gamedataB.playerNumber || gamedataC.playerNumber || gamedataD.playerNumber) this.state.challengerJoined = true
            if(quickPoll){
              this.state.lastNameUpdateTimer = this.t
            } else {
              setTimeout(()=>{
                this.pollServer()
              }, 250)
            }
          }
        }
      })
    },
    Draw(){
      let t = this.t
      let S = this.S
      let C = this.C
      let x = this.x
      let c = this.c

      let G, j, i, p, a, l, B, w, Rn, R, Q, Rl, Pt, Yw, oX, oY, oZ, tx, ty, tz, X, Y, Z, M, A, H, d, s
      

      R = (Rl,Pt,Yw,o)=>{
        X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d
        if(o)X+=oX,Y+=oY,Z+=oZ
      }
      if(!this.t){
        for(j=6;j--;)for(i=4;i--;)this.G=[...this.G,[(a=[S(p=Math.PI*2/4*i+Math.PI/4)*(2**.5)/2,C(p)*(2**.5)/2,.5])[j%3]*(l=j<3?1:-1),a[(j+1)%3]*l,a[(j+2)%3]*l]]
        this.B = [
          [[-.5,-1,0],[-.5,0,0],[-.5,1,0],[.5,1,0]],
          [[.5,-1,0],[.5,0,0],[.5,1,0],[-.5,1,0]],
          [[-1,0,0],[0,0,0],[1,0,0],[0,1,0]],
          [[-1.5,0,0],[-.5,0,0],[.5,0,0],[1.5,0,0]],
          [[-.5,-1,0],[-.5,0,0],[.5,0,0],[.5,1,0]],
          [[.5,-1,0],[.5,0,0],[-.5,0,0],[-.5,1,0]],
          [[-.5,-.5,0],[.5,-.5,0],[.5,.5,0],[-.5,.5,0]]
        ]
      }
      x.lineJoin=x.lineCap='round'
      
      c.width = c.clientWidth
      c.height = c.clientHeight
      x.fillStyle='#000'//, x.fillRect(0,0,w=c.width,w)
      x.clearRect(0,0,w=c.width,w)
      
      Rl=t, Pt=-t/2, Yw=t
      oX=0, oY=0, oZ=40
 
      s = c.height - c.height/20

      switch(this.state.stage){
        
        case 0:
        
        break
        
        case 1:
        
          tx = c.width/2 - s/2
          x.fillStyle='#011a'
          //x.fillRect(tx,  s/40, s/2, s)
          x.drawImage(this.boardBG, tx,  s/40, s/2, s)
          x.strokeStyle='#aff6'
          x.lineWidth = 1
          x.strokeRect(tx,  s/40, s/2, s)
          let msp = s/500
          this.state.boardData = this.state.boardData.map((v,i)=>{
            if(v[0]){
              let px = (i%10) * s / 20
              let py = ((i/10|0)-6) * s / 20
              if((i/10|0)-6>=0){
                switch(this.state.colorMode){
                  case 'cyberpunk':
                    x.fillStyle=`hsla(${170},75%,${(v[1]?v[1]-1:0)*50*S(t*50)+25+70/7*(v[0]-1)}%,.8)`
                    break
                  case 'rainbows':
                    x.fillStyle=`hsla(${360/7*(v[0]-1)},75%,${(v[1]?v[1]-1:0)*50*S(t*50)+50}%,.8)`
                    break
                }
                x.fillRect(tx + px + msp, py + s/40 + msp, s/20 - msp*2, s/20 - msp*2)
              }
            }
            if(v[1]) v[1]+=.018
            if(v[1]>=2){
              for(let m=i+10; (m-=10)>=20;){
                if(m>=10){
                  if(1||this.state.boardData[m-10][0]){
                    this.state.boardData[m][0] = this.state.boardData[m-10][0]
                    this.state.boardData[m][1] = this.state.boardData[m-10][1]
                  }
                }
              }
              v[1]=0
            }
            return v
          })
          
          
          x.fillStyle='#102a'
          x.fillRect(tx + s/2 + s/32,  s/40, s/2 - s/16, s/2 - s/16)
          x.strokeStyle='#aaf6'
          x.lineWidth = 1
          x.strokeRect(tx + s/2 + s/32,  s/40, s/2 - s/16, s/2 - s/16)
          x.font= s**.9/12 + 'px "Varela Round"'
          x.fillStyle='#86fc'
          x.fillText('next piece', tx + s/2 + s/12 + (s/2 - s/16)/2.3 - s/9, s/11 - s/20 + s/40)
          this.drawNextPiece(tx + s/2 + s/32 + 100, s/16 + s/10 - s/20, this.nextPieceIdx, 1)

          /*
          x.strokeStyle='#aaf6'
          x.lineWidth = 1
          x.strokeRect(tx + s/2 + s/32 + s/80,  s/40 + s/64, s/8, s/8)
          x.font= s**.9/14 + 'px "Varela Round"'
          x.fillStyle='#8fc6'
          x.fillText('swap', tx + s/2 + s/32 + s/32,  s/40 + s/64 + s/32*1.2, s/8, s/8)          
          x.fillText('[tab]', tx + s/2 + s/32 + s/28,  s/40 + s/64 + s/32*2.85, s/8, s/8)
          if(this.swapPieceIdx != null) this.drawNextPiece(tx + s/2 + s/32 + s/80,  s/40 + s/64, s/8, s/8, this.swapPieceIdx, 1)
          */

          x.fillStyle='#102a'
          x.fillRect(tx + s/2 + s/32, s/2 - s/16 + s/10 - s/20, s/2 - s/16, s/2 + s/100 + s/40)
          x.strokeStyle='#aaf6'
          x.lineWidth = 1
          x.strokeRect(tx + s/2 + s/32, s/2 - s/16 + s/10 - s/20, s/2 - s/16, s/2 + s/64 + s/40)
          x.fillStyle='#86fc'
          if(this.state.challengerJoined){
            x.font= s**.9/16 + 'px "Varela Round"'
            x.fillText('challengers', tx + s/1.8 + s/32 + s/2 / 2.3 - s/7, s/2 + s/14 - s/20)
          }
          this.drawOpponents(tx + s/2 + s/30, s/2 - s/16 + s/10 - s/20 + s/40)
          
          if(((this.state.singlePlayerMode && this.state.alive) || (this.state.challengerJoined && this.state.gameActuallyPlaying &&
             this.state.alive)) && !((t*60|0)%(this.dropFreq|0))){
            this.advancePiece()
          }

          x.fillStyle='#2466'
          if(this.currentPiece != null && ((this.state.singlePlayerMode && this.state.alive) || (this.state.challengerJoined && this.state.gameActuallyPlaying &&
             this.state.alive))){
            let tempPiece = JSON.parse(JSON.stringify(this.currentPiece))
            do{
              tempPiece = tempPiece.map(v=>{
                v[1]++
                return v
              })
            }while(this.canDo(tempPiece))
            Array(260).fill().map((v, i)=>{
              let px = (i%10) * s / 20
              let py = ((i/10|0)-6) * s / 20
              tempPiece.map(q=>{
                if((i%10) == q[0] && ((i/10|0)-6)==q[1]-1){
                  x.fillRect(tx + px + msp, py + s/40 + msp, s/20 - msp*2, s/20 - msp*2)
                }
              })
            })
          }
          if((this.state.singlePlayerMode && this.state.gameActuallyPlaying && this.state.alive) || this.state.challengerJoined && this.state.gameActuallyPlaying && this.state.alive) {
            if(this.currentPiece != null){
              if(0&&this.tabKey){
                if(!this.swapped){
                  let tmpIdx = -1
                  if(this.swapPieceIdx) tmpIdx = this.swapPieceIdx
                  this.swapPieceIdx = this.currentPiece[0][2]
                  if(tmpIdx == -1){
                    this.state.boardData = JSON.parse(JSON.stringify(this.tempBoard))
                    this.spawnPiece(4, -2)
                  } else {
                    this.tempBoard = JSON.parse(JSON.stringify(this.state.boardData))
                    let n = tmpIdx
                    let tempPiece = JSON.parse(JSON.stringify(this.B))[n].map(v=>{
                      return [
                        Math.round(X + v[0]),
                        Math.round(Y + v[1]),
                        n
                      ]
                    })
                    if(this.canDo(tempPiece)){
                      this.currentPiece = tempPiece
                      this.state.boardData = this.state.boardData.map((v, i)=>{
                        let tx = i%10
                        let ty = (i/10|0) - 6
                        this.currentPiece.map(q=>{
                          if(q[0] == tx && q[1] == ty){
                            v[0] = q[2]+1
                            v[1] = 0
                          }
                        })
                        return v
                      })
                    } else {
                      this.state.alive = false
                    }
                  }
                  this.swapped = true
                }
                this.tabKey = false
              }
              if(this.spaceKey && this.currentPiece != null){
                do{
                  this.currentPiece = this.currentPiece.map(v=>{
                    v[1]++
                    return v
                  })
                }while(this.canDo(this.currentPiece))
                this.state.boardData = JSON.parse(JSON.stringify(this.tempBoard))
                this.state.boardData = this.state.boardData.map((v, i)=>{
                  let tx = i%10
                  let ty = (i/10|0) - 6
                  this.currentPiece.map(q=>{
                    if(q[0] == tx && q[1]-1 == ty){
                      v[0] = q[2]+1
                      v[1] = 0
                    }
                  })
                  return v
                })
                this.currentPiece = null
                this.spaceKey = false
                this.tempBoard = JSON.parse(JSON.stringify(this.state.boardData))
                this.checkRowCompletion()
              } 
              if(this.leftKey && this.currentPiece != null){
                if(this.pieceMoveTimer < t){
                  let tempPiece = JSON.parse(JSON.stringify(this.currentPiece)).map(v=>{
                    v[0]--
                    return v
                  })
                  if(this.canDo(tempPiece)){
                    this.currentPiece = tempPiece
                    this.pieceMoveTimer = this.t + this.piceMoveInterval
                  }
                }
              }
              if(this.rightKey && this.currentPiece != null){
                if(this.pieceMoveTimer < t){
                  let tempPiece = JSON.parse(JSON.stringify(this.currentPiece)).map(v=>{
                    v[0]++
                    return v
                  })
                  if(this.canDo(tempPiece)){
                    this.currentPiece = tempPiece
                    this.pieceMoveTimer = this.t + this.piceMoveInterval
                  }
                }
              }
              if(this.downKey && this.pieceManualDropTimer < t && this.currentPiece != null){
                this.advancePiece()
                this.pieceManualDropTimer = this.t + this.piecManualDropInterval
              }
              if(this.upKey && this.currentPiece != null){
                if(this.currentPiece[0][2]!=6){
                  if(this.pieceRotateTimer < t){
                    let tx = this.currentPiece[1][0]
                    let ty = this.currentPiece[1][1]
                    let cx
                    let tempPiece = JSON.parse(JSON.stringify(this.currentPiece)).map(v=>{
                      cx = v[0]
                      let X = v[0]
                      let Y = v[1]
                      let p = Math.atan2(v[0]-tx, v[1]-ty) + Math.PI / 2
                      let d = Math.hypot(v[0]-tx, v[1]-ty)
                      v[0] = Math.round(tx+S(p)*d)
                      v[1] = Math.round(ty+C(p)*d)
                      return v
                    })
                    if(this.canDo(tempPiece)){
                      this.currentPiece = tempPiece
                      this.pieceRotateTimer = this.t + this.piceMoveInterval * 2
                    } else if(cx >= 5) {
                      let tries = 0, res = false
                      do{
                        tries++
                        tempPiece = tempPiece.map(v=>{
                         v[0]--
                          return v
                        })
                      }while(!(res = this.canDo(tempPiece)) && tries < 3);
                      if(res){
                        this.currentPiece = tempPiece
                        this.pieceRotateTimer = this.t + this.piceMoveInterval * 2
                      }
                    } else if(cx <= 5) {
                      let tries = 0, res = false
                      do{
                        tries++
                        tempPiece = tempPiece.map(v=>{
                         v[0]++
                          return v
                        })
                      }while(!(res = this.canDo(tempPiece)) && tries < 3);
                      if(res){
                        this.currentPiece = tempPiece
                        this.pieceRotateTimer = this.t + this.piceMoveInterval * 2
                      }
                    }
                  }
                }
              }
              if(this.currentPiece != null){
                this.state.boardData = JSON.parse(JSON.stringify(this.tempBoard))
                this.state.boardData = this.state.boardData.map((v, i)=>{
                  let tx = i%10
                  let ty = (i/10|0) - 6
                  this.currentPiece.map(q=>{
                    if(q[0] == tx && q[1] == ty){
                      v[0] = q[2]+1
                      v[1] = 0
                    }
                  })
                  return v
                })
              }
            } else {
              if(!this.state.boardData.filter(v=>v[1]).length) this.spawnPiece(4, -2)
            }
          }

          this.t += 1/60
          requestAnimationFrame(this.Draw)
        break
        
        case 2:
        break
      }

    },
    launchGame(){
      this.stage = 0
      this.state.countdownTimer = 0
      this.t = 0
      this.pollServer()
      this.$nextTick(()=>this.Draw())
    },
    startGame(){
      if(this.state.singlePlayerMode) {
        history.pushState(0, 0 , window.location.origin + '/game')
      } else {
        history.pushState(0, 0 , window.location.origin + '/game/' + this.state.decToAlpha(this.state.gameID) + '/a')
      }
      this.state.stage = 1
      this.state.countdownTimer = 0
      this.t = 0
      if(!this.state.singlePlayerMode) {
        this.pollServer()
      } else {
        this.state.gameActuallyPlaying = false
        this.state.countdownTimer = this.t + 6
      }
      this.$nextTick(()=>this.Draw())
      this.syncBoard()
    },
    playGame(){
      this.state.gameActuallyPlaying = false
      let sendData = {
        gameID: this.state.gameID
      }
      fetch(this.state.baseURL + '/startGame.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data[0] !== 'started game# ' + this.state.gameID){
          console.log('error starting game :(')
        }
      })
    },
    setupListeners(){
      document.getElementsByTagName('body')[0].addEventListener('keydown', e=>{
        switch(e.keyCode){
          case 9: this.tabKey = true; break
          case 37: this.leftKey = true; break
          case 38: this.upKey = true; break
          case 39: this.rightKey = true; break
          case 40: this.downKey = true; break
          case 32: this.spaceKey = true; break
        }
      })
      document.getElementsByTagName('body')[0].addEventListener('keyup', e=>{
        this.pieceMoveTimer = 0
        this.pieceRotateTimer = 0
        switch(e.keyCode){
          case 9: this.tabKey = false; break
          case 37: this.leftKey = false; break
          case 38: this.upKey = false; break
          case 39: this.rightKey = false; break
          case 40: this.downKey = false; break
          case 40: this.spaceKey = false; break
        }
      })
    },
    reload(){
      this.syncBoard()
      this.state.alive = true
      this.currentPiece = null
      this.dropFreq = this.initDropFreq
      this.rowsCompleted = 0
    }
  },
  watch:{
    'state.gameActuallyPlaying'(val){
      if(val){
        this.reload()
      }
    },
    'state.gameLink'(val){
      if(val.length){
        this.$nextTick(()=>{this.$nextTick(()=>this.startGame())})
      }
    },
    countdown(val){
      if(!val && this.playerJoinedCount > 1 &&
        !(this.state.author && this.state.stage==1 && !this.state.challengerJoined)
        ) this.state.gameActuallyPlaying = true
      if(this.state.singlePlayerMode && !val ) this.state.gameActuallyPlaying = true
    }
  },
  mounted(){
    this.c = this.$refs.mainCanvas
    this.x = this.c.getContext('2d')
    this.t = 0
    this.c.width = this.c.clientWidth
    this.c.height = this.c.clientHeight
    this.boardBG.src = 'https://lookie.jsbot.net/uploads/rjc4W.png'
    if(this.state.author) this.gameActuallyPlaying = false
    this.$nextTick(()=>{
      if(this.state.stage != 1) this.$refs.userNameField.focus()
      if(this.state.singlePlayerMode) this.launchSinglePlayer()
    })
    this.setupListeners()
  }
}
</script>

<style scoped>
canvas{
  width: 100%;
  height: 100px;
  vertical-align: top;
  height: 100%;
}
.main{
  font-size: 32px;
  text-align: center;
  height: 100vh;
}
.headerText{
  font-size: 64px;
  color: #fff8;
  position: absolute;
  left: 50%;
  top: 15px;
  transform: translatex(-50%) scalex(2.0);
  font-style: oblique;
  text-shadow: 0px 0px 10px #0f4;
}
.innerInputForm{
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 20px);
  transform: translate(-50%, -50%);
}
.inputForm{
  position: absolute;
  top: 0;
  left: 0;
  padding: 50px;
  height: 100%;
  width: 100%;
  color: #ff0;
}
.createGameButton{
  width: 100%;
  margin-top: 60px;
}
.disabled{
  color: #000;
  background: linear-gradient(135deg, #3338, #888)!important;
}
.linkDiv{
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 20px);
  transform: translate(-50%, -50%);
}
.copied{
  background-color: #0f88!important;
}
.gamelink{
  color: #8ff;
  text-shadow: 1px 1px 2px #000;
  text-decoration: none;
  font-size: 18px;
  padding: 5px;
  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
  background: #246;
  border-radius: 10px;
}
.controls{
  font-size: 20px;
  position: absolute;
  top: 80px;
  z-index: 1010;
  color: #468;
  left: 50%;
  width: 100%;
  transform: translatex(-50%);
}
.actionContainer{
  position: absolute;
  top: calc(50vh + 50px);
  height: calc(100vh - 100px);
  max-height: 800px;
  width: 100%;
  transform: translateY(-50%);
}
</style>
