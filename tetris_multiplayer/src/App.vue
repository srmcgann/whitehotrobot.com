<template>
  <Main :state="state"/>
</template>

<script>
import Main from './components/Main'

export default {
  name: 'App',
  components: {
    Main
  },
  data(){
    return {
      state: {
        gameStarted: false,
        createGame: null,
        getGameData: null,
        baseURL: 'https://tetris.whitehotrobot.com',
        gameLink: '',
        author: false,
        receivedGameData: {},
        playerName: '',
				singlePlayerMode: false,
        alive: true,
        highScore: 0,
        lastNameUpdateTimer: 0,
        decToAlpha: null,
        alphaToDec: null,
        boardData: [],
        gameActuallyPlaying: true,
        countdownTimer: null,
        actuallyStartGame: null,
        colorMode: Math.random()<.5?'rainbows':'cyberpunk',
        playerAName: '',
        playerBName: '',
        playerCName: '',
        playerDName: '',
        playerAdata: {boardData:[]},
        playerBdata: {boardData:[]},
        playerCdata: {boardData:[]},
        playerDdata: {boardData:[]},
        playerNumber: '',
        gameID: -1,
        mode: 0,
        copyToClipboard: null,
        setBG: null,
        linkeCopied: false,
        challengerJoined: false
      }
    }
  },
  methods:{
    copyToClipboard(el){
      let tmp = document.createElement('input')
      tmp.style.position = 'absolute'
      tmp.style.opacity = '0'
      tmp.setAttribute('type', 'text')
      tmp.value = this.state.gameLink
      document.getElementsByTagName('body')[0].appendChild(tmp)
      tmp.select()
      tmp.setSelectionRange(0, 99999)
      document.execCommand("copy")
      tmp.parentNode.removeChild(tmp)
      this.state.linkCopied = true
      setTimeout(()=>{
        this.state.linkCopied = false
      },1200)
    },
    alphaToDec(val){
      let pow=0
      let res=0
      let cur, mul
      while(val!=''){
        cur=val[val.length-1]
        val=val.substring(0,val.length-1)
        mul=cur.charCodeAt(0)<58?cur:cur.charCodeAt(0)-(cur.charCodeAt(0)>96?87:29)
        res+=mul*(62**pow)
        pow++
      }
      return res
    },
    decToAlpha(n){
      let alphabet='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let ret='', r
      while(n){
        ret = alphabet[Math.round((n/62-(r=n/62|0))*62)|0] + ret
        n=r
      }
      return ret == '' ? '0' : ret
    },
    createGame(){
      let sendData = {gamedata: {
          playerName: this.state.playerName,
          playerNumber: 'A'
        }
      }
      fetch(this.state.baseURL + '/createGame.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          this.state.author = true
          this.state.playerNumber = 'A'
          this.state.gameID = data[0]
          this.state.gameLink = this.state.baseURL + '/game/' + this.decToAlpha(data[0])
        }
      })
    },
    getMode(){
      let vars = window.location.pathname.split('/').filter(v=>v)
      if(vars.length>1){
        switch(vars[0]){
          case 'game':
            this.state.gameID = this.alphaToDec(vars[1])
            if(vars[2]=='a'){
              this.state.author = true
              this.state.stage = 1
              this.state.gameLink = this.state.baseURL + '/game/' + this.decToAlpha(this.state.gameID )
              this.state.playerNumber = 'A'
            } else {
              if(vars[1]){
								this.state.stage = 2
							}
            }
          break;
				}
      } else {
			  if(vars[0] == 'game') this.state.singlePlayerMode = true 
			}
    },
    setBG(val){
      let bgimg
      switch(val){
        case 'cyberpunk':
          bgimg = 'https://lookie.jsbot.net/uploads/2clPtA.jpg';
          document.getElementsByTagName('body')[0].style.color = '#0f8'
          break
        case 'rainbows':
          bgimg = 'https://lookie.jsbot.net/uploads/1ECv2A.jpg';
          document.getElementsByTagName('body')[0].style.color = '#ff0'
          break
        default:
          bgimg = 'https://lookie.jsbot.net/uploads/1ECv2A.jpg';
          break
      }
      document.getElementsByTagName('body')[0].style.backgroundImage = 'url(' + bgimg + ')'
    }
  },
  mounted(){
    this.getMode()
    this.state.setBG = this.setBG
    this.state.createGame = this.createGame
    this.state.decToAlpha = this.decToAlpha
    this.state.alphaToDec = this.alphaToDec
    this.state.getGameData = this.getGameData
    this.state.copyToClipboard = this.copyToClipboard
    this.state.actuallyStartGame = this.actuallyStartGame
    this.setBG(this.state.colorMode)
  },
  watch:{
    'state.colorMode'(val){
      this.setBG(val)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
html {
  margin: 0;
}
body{
  overflow: hidden;
  height:100vh;
  margin: 0;
  background: #000 url(https://lookie.jsbot.net/uploads/1ECv2A.jpg) no-repeat;
  background-position: center;
  background-size: cover;
  font-family: 'Varela Round';
  color: #0f8;
}
input:focus{
  outline: none;
}
input[type=search]{
  background: #0000;
  color: #0f8;
  border: none;
  border-bottom: 2px solid #0fc8;
  font-family: "Varela Round";
  text-align: center;
  font-size: 24px;
}
button:focus{
  outline: none;
}
button{
  border: none;
  background: linear-gradient(135deg, #0118, #068);
  font-family: "Varela Round";
  color: #0f8;
  font-size: 24px;
  padding: 20px;
  padding-top: 5px;
  padding-bottom: 8px;
  border-radius: 10px;
  cursor: pointer;
}
select{
  background: #000;
  color: #0ff;
  border: 1px solid #0ff8;
}
.noyellow{
  color: #0f8;
}
canvas:focus{
  outline: none;
}
</style>
