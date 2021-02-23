<template>
  <div class="trackContainer"
    :ref="'trackContainer' + track.id"
    :class="{'singleTrack': state.mode=='track', 'embedTrack': state.mode=='embed'}"
  >
  <div class="embedCode" v-if="showEmbedCode">
    <div class="embedCodeInner">
      <div class="embedcodetext" :ref="'embedCodeText' + track.id" :class="{'pulse':pulse}">{{embedCodeText}}</div>
      <button @click="copyDivToClipboard('embedCodeText' + track.id)" class="embedbutton copytoclipbutton" :class="{'pulse':pulse}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;copy</button>
      <button @click="showEmbedCode=false" class="embedbutton">close</button>
    </div>
  </div>
  <transition name="fadePulse">
    <div v-if="showPulse" style="position:absolute; width: 100%; background: #0f0;z-index: -1;margin-left: -10px; margin-top:-10px;border-radius: 10px;" :ref="'pulse' + track.id"></div>
  </transition>

    <button v-if="state.loggedinUserName.toUpperCase() == track.author.toUpperCase() || state.isAdmin" class="deleteTrackButton" @click="deleteTrack(track)">
    </button>
    <div class="avatar" :style="'float: left;max-width: 100px;background-image:url('+state.getAvatar(track.userID)+');width:100px;height:100px;background-repeat: no-repeat; background-position: center center; background-size: cover;'"></div>
    <a :href="state.baseURL + '/u/' + track.author" target="_blank" class="link" v-html="track.author" style="float: left;"></a>
    <div v-if="state.loggedinUserName.toUpperCase() == track.author.toUpperCase() || state.isAdmin" class="trackElem" style="display: inline-block;width:490px;float:left;">
      <input
        maxlength="128"
        :class="{'success':updated['trackName']==1,'failure':updated['trackName']==-1}"
        style="width: 350px;float:left;"
        placeholder="track name"
        class="textInput" 
        @input="updateTrackItem(track.id, 'trackName')" type="text" v-model="track.trackName"
      >
      <span style="word-break: keep-all;display: inline-block;">{{track.plays + ' view' + (track.plays != 1 ? 's' : '')}}</span>
    </div>
    <div v-else class="trackElem" style="width: 400px;text-align: center;">
      <span class="trackTitle" v-html="'&quot;'+track.trackName+'&quot;'" style="font-size: 26px;font-style:oblique;color: #0f8;word-break: break-word"></span>
      <span style="margin-left: 20px;word-break: keep-all;display: inline-block;">{{track.plays + ' view' + (track.plays > 1 ? 's' : '')}}</span>
    </div>
    <div style="clear:both;"></div>
    <table>
      <!--
      <tr>
        <td class="tdLeft">views </td>
        <td class="tdRight date">
          {{(Math.max(1, track.plays)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}
        </td>
      </tr>
      <tr>
        <td class="tdLeft">track title</td>
        <td class="tdRight">
          <div v-if="state.loggedinUserName.toUpperCase() == track.author.toUpperCase() || state.isAdmin" class="trackElem">
            <input
               maxlength="256"
              :class="{'success':updated['trackName']==1,'failure':updated['trackName']==-1}"
              @input="updateTrackItem(track.id, 'trackName')" type="text" v-model="track.trackName"
              class="textInput"
            >
          </div>
          <div v-else class="trackElem">
            <span class="trackTitle" v-html="track.trackName"></span>
          </div>
        </td>
      </tr>
      -->
      <tr v-if="track.description || state.loggedinUserName.toUpperCase() == track.author.toUpperCase() || state.isAdmin">
        <td class="tdLeft">description </td>
        <td class="tdRight">
          <div v-if="state.loggedinUserName.toUpperCase() == track.author.toUpperCase() || state.isAdmin" class="trackElem">
            <input
               maxlength="256"
              :class="{'success':updated['description']==1,'failure':updated['description']==-1}"
              class="textInput" 
              @input="updateTrackItem(track.id, 'description')" type="text" v-model="track.description"
            >
          </div>
          <div v-else class="trackElem">
            <span class="date" v-html="track.description"></span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="tdLeft">date added </td>
        <td class="tdRight">
          <span class="date" v-html="formattedDate(track.date)"></span>
        </td>
      </tr>
      <tr>
        <td class="tdLeft">duration </td>
        <td class="tdRight">
          <span class="date" v-html="formattedDuration()"></span>
        </td>
      </tr>
      <tr>
        <td class="tdLeft">share </td>
        <td class="tdRight">
          <a class="fileLink" target="_blank" :href="state.baseURL + '/track/' + state.decToAlpha(track.id)" v-html="'/'+state.decToAlpha(track.id)"></a>
          <a
            v-if="track.allowDownload == 1 || state.loggedinUserName.toUpperCase() == track.author.toUpperCase() || state.isAdmin"
            class="fileLink"
            :href="'/audio/' + track.audioFile.split('/')[track.audioFile.split('/').length-1]"
            :download="track.author + ' - ' + track.trackName + track.audioFile.substring(track.audioFile.length-4).toLowerCase()"
            style="margin-left: 10px;"
          >
            download file
          </a>
          <button
            v-if="track.allowDownload == 1 || state.loggedinUserName.toUpperCase() == track.author.toUpperCase() || state.isAdmin"
            class="fileLink"
            :href="'/audio/' + track.audioFile.split('/')[track.audioFile.split('/').length-1]"
            :download="track.author + ' - ' + track.trackName + track.audioFile.substring(track.audioFile.length-4).toLowerCase()"
            style="margin-left: 10px; padding-left: 12px; padding-right: 12px;min-width: initial;"
            @click="showEmbedCode=true"
          >
            embed code
          </button>
        </td>
      </tr>
    </table>
    <table>
      <tr v-if="state.loggedinUserName.toUpperCase() == track.author.toUpperCase() || state.isAdmin">
        <td class="tdLeft">
        </td>
        <td class="tdRight" style="padding-right: 30px;">
          <label :for="'privateCheckbox' + track.id" :key="'cblabel'+track.id" class="checkboxLabel" style="padding-top: 5px;margin-bottom:0px;display: inline-block;margin-left: 100px;" title="omit this post from the home page">
            <input type="checkbox" :key="'cbkey'+track.id" :id="'privateCheckbox' + track.id" v-model="track.private" @input="updateTrackItem(track.id, 'private')">
            <span class="checkmark"></span>
            <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;">private</span>
          </label>
        </td>
        <td class="tdLeft">
          <label :for="'allowdlCheckbox' + track.id" :key="'cblabel'+track.id" class="checkboxLabel" style="padding-top: 3px;margin-bottom:0px;display: inline-block;margin-left: 10px;" title="allow public download">
            <input type="checkbox" :key="'cbkeydl'+track.id" :id="'allowdlCheckbox' + track.id" v-model="track.allowDownload" @input="updateTrackItem(track.id, 'allowDownload')">
            <span class="checkmark"></span>
            <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;">allow public download</span>
          </label>
        </td>
      </tr>
    </table>
    <div class="audioContainer" :class="{'embedAudioContainer': state.mode=='embed'}">
      <button
        v-if="!track.playing"
        class="playbutton"
        @click="playPauseTrack()"
        :class="{'disabledPlayButton': !track.canPlay}"
        title="play/pause track [space]"
      ></button>
      <button
        v-else
        class="pausebutton"
        @click="playPauseTrack()"
        :class="{'disabledPauseButton': !track.canPlay}"
      ></button>
      <button
        @click="loop=!loop"
        class="smallControlButton loopButton"
        :class="{'highlighted':loop}"
        title="loop track"
      ></button>
      <button
        class="smallControlButton resetButton"
        @click="resetTrack()"
        title="start of track (or prev. track if pos<dur/20) [left arrow key]"
      ></button>
      <button
        class="smallControlButton jumpToNextButton"
        @click="track.mp3.currentTime = Math.max(6e6, track.mp3.duration-.1);if(skipRedraw)B=[],Draw(skipRedraw=false)"
        title="play next track [right arrow key]"
      ></button>
      <canvas ref="canvas" class="canvas"></canvas>
    </div>

    <div class="commentContainer" v-if="state.mode!='embed'">
      <div class="commentsHeader" style="background: linear-gradient(90deg, #102f, #1023, #0000);display: inline-block;padding-right: 200px;padding-left: 10px;color:#2f4;margin-bottom: 10px;height: 25px;line-height: 20px;margin-left: -10px;">
        comments
      </div>
      <div v-if="track.comments.length">
        <div v-for="comment in filteredComments">
          <div class="commentMain">
            <span class="timestamp" v-html="processedTimestamp(comment.date)" style="float: right;display: inline-block!important;"></span>
            <span  v-if="typeof state.userInfo[comment.userID] != 'undefined'" class="commentUserName" style="font-size: 20px;">
              <div 
                :class="{'bumpUp': state.userAgent.toUpperCase().indexOf('FIREFOX')!==-1}"
                class="commentAvatar" :style="'background-image:url('+state.getAvatar(comment.userID)+');width:50px!important;height:50px!important;background-repeat: no-repeat; background-position: center center; background-size: cover;'"></div>
              <a :href="state.baseURL + '/u/' + state.userInfo[comment.userID].name" target="_blank" style="color:#4dc!important;font-style: oblique;margin-left: 5px;">{{state.userInfo[comment.userID].name}}</a>
            </span><br>
            <div v-if="comment.editing && state.loggedin" style="display:inline-block;width:calc(100% + 30px);">
              <input
                maxlength="1024"
                type="text"
                :ref="'comment' + comment.id"
                class="commentInput textInput"
                style="width: calc(100% - 100px);"
                @input="editComment(comment)"
                v-model="comment.text"
                :class="{'success':comment.updated==1,'failure':comment.updated==-1}"
              >
              <button
                v-if="comment.userID == state.loggedinUserID || state.isAdmin"
                @click='comment.editing = !comment.editing'
                class="commentEditButton"
                style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;"
              ></button>
              <button
                @click='deleteComment(comment, track)'
                class="commentDeleteButton"
                style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;"
              ></button>
            </div>
            <div v-else style="display: inline-block;width: calc(100% + 10px);left: 0!important;padding-right: 0;">
              <span class="commentText" v-html="comment.text" v-linkified style="width: calc(100% - 68px)"></span>
              <button
                v-if="comment.userID == state.loggedinUserID || state.isAdmin"
                @click='toggleEditMode(comment)'
                class="commentEditButton"
                style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;display: inline-block;background-image:url(https://lookie.jsbot.net/uploads/2cyWBg.png);"
              ></button>
            </div>
            <div style="clear:both;"></div>
          </div>
        </div>
        <div v-if="moreComments" style="text-align: center;">
          <span style="display: inline-block;font-size: 32px;">...</span>
          <button
            class = "loadCommentsButton"
            @click="incrComments()"
          >load more comments</button>
        </div>
      </div>
      <div v-else>
        <div style="text-align: center;">-- no comments --</div>
        <div v-if="!state.loggedin" style="text-align: center;">(log in to comment on this track)</div>
      </div>
      <div v-if="state.loggedin">
        <input
          maxlength="1024"
          v-on:keyup.enter="postComment(track.id)"
          :ref="'newComment' + track.id" placeholder="say something..."
          class="commentInput newComment textInput"
          style="margin-left: 0;margin-top: 16px;"
        >
        <button
          @click="postComment(track.id)"
          style="background: #1ca;padding: 2px;padding-bottom: 4px;margin: 0;margin-left: 25px;display: block; margin-top: 14px; min-width: initial; padding: 0;padding-left: 10px; padding-right: 10px;float:left;"
        >post</button>
        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: [ 'state', 'track' ],
  data(){
    return {
      t: 0,
      loop: false,
      trackAmplitude:[],
      marquisTimer: null,
      showComments: 2,
      skipRedraw: false,
      moreCommentsVal: 5,
      pulse: false,
      showEmbedCode: false,
      x: null,
      B: [],
      P: [],
      audioCtx: null,
      updated:{
        title: 0,
        favicon: 0
      },
      trackdata: [],
      c: null,
      percentLoaded: 0,
      showPulse: true,
      duration: 0,
      trackAnalyzed: false,
      bufferLength: null,
      analyzer: null,
      fftsize: 256,
    }
  },
  methods:{
    copyDivToClipboard(ref) {
      var range = document.createRange()
      range.selectNode(this.$refs[ref])
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
      document.execCommand("copy")
      window.getSelection().removeAllRanges()
      this.pulse = true
      setTimeout(()=>this.pulse=false,200)
    },
    resetTrack(){
      if(this.track.mp3.currentTime < this.track.mp3.duration / 20){
        if(this.skipRedraw)this.B=[],this.Draw(this.skipRedraw=false)
        this.state.playPreviousTrack()
      } else {
        this.track.mp3.currentTime = 0;
        if(this.skipRedraw)this.B=[],this.Draw(this.skipRedraw=false)
      }
    },
    doMarquis(){
      if(this.track.playing){
        let s = this.track.author + ' - ' + this.track.trackName
        let p = (this.marquisTimer++) % s.length
        document.title = s.substring(p) + '  -  ' + s.substring(0, p)
      }
    },
    incrComments(){
      this.showComments += this.moreCommentsVal
    },
    toggleEditMode(comment){
      comment.editing = !comment.editing
      if(comment.editing){
        this.$nextTick(()=>{
          this.$refs['comment' + comment.id].focus()
          this.$refs['comment' + comment.id].select()
        })
      }
    },
    deleteComment(comment, item){
      if(confirm('are you SURE you want to delete this comment?!?!?\n\n\nTHIS ACTION IS IRREVERSIBLE!')){
        let id = comment.id
        let sendData = {
          userName: this.state.loggedinUserName,
          passhash: this.state.passhash,
          commentID: id
        }
        fetch(this.state.baseURL + '/deleteComment.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(data[0]){
            item.comments = item.comments.filter(v=>v.id != id)
          }
        })
      }
    },
    editComment(comment){
      let id = comment.id
      let text = this.$refs['comment' + id].value
      let sendData = {
        userName: this.state.loggedinUserName,
        comment: text,
        passhash: this.state.passhash,
        commentID: id
      }
      fetch(this.state.baseURL + '/updateComment.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data[0]){
          comment.updated = 1
          setTimeout(()=>comment.updated = 0, 1000)
        } else {
          comment.updated = -1
          setTimeout(()=>comment.updated = 0, 1000)
        }
      })
    },
    postComment(id){
      let text = this.$refs['newComment' + id].value
      if(text.length){
        let sendData = {
          userName: this.state.loggedinUserName,
          comment: text,
          passhash: this.state.passhash,
          trackID: id
        }
        fetch(this.state.baseURL + '/postComment.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(data[0]){
            let comment = {
              userID: this.state.loggedinUserID,
              text,
              trackID: id,
              id: data[1],
              date: data[2]
            }

            if(this.state.search.string){
              this.state.search.audiocloudTracks.filter(v=>v.id==id)[0].comments.push(comment)
            }else{
              switch(this.state.mode){
                case 'u':
                this.state.user.audiocloudTracks.filter(v=>v.id==id)[0].comments.push(comment)
                break
                case 'default':
                this.state.landingPage.audiocloudTracks.filter(v=>v.id==id)[0].comments.push(comment)
                break
                case 'track':
                this.state.tracks.filter(v=>v.id==id)[0].comments.push(comment)
                break
              }        
            }

            this.$refs['newComment' + id].value = ''
          }
        })
      }
    },
    processedTimestamp(val){
      let months=[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      /*
      let days=[
        'Sun,',
        'Mon,',
        'Tue,',
        'Wed,',
        'Thur,',
        'Fri,',
        'Sat,'
      ]
      */
      let days = Array(7).fill('')
      let hours = [
        12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
      ]
      let d = new Date(Date.parse(val.replace(/-/g, '/')))
      let mn = '' + d.getMinutes()
      if(mn.length == 1) mn = '0' + mn
      return hours[d.getHours()] + ':' + mn + (d.getHours<12?'AM':'PM') + ' - ' + days[d.getDay()] + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear()
    },
    deleteTrack(track){
      if(confirm("\n\n\nAre you SURE you want to delete this track??!?!\n\n\n     Track: \"" + track.trackName + "\"\n     created: " + this.formattedDate(track.date) + "\n\n\nThis action is IRREVERSIBLE!!!!")){
        this.track.mp3.pause()
        let sendData = {
          userName: this.state.loggedinUserName,
          trackID: +track.id, 
          passhash: this.state.passhash
        }
        fetch(this.state.baseURL + '/deleteTrack.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(this.state.search.string){
            this.state.search.audiocloudTracks = this.state.search.audiocloudTracks.filter(v=>v.id!=track.id)
          }else{
            switch(this.state.mode){
              case 'u':
              this.state.user.audiocloudTracks = this.state.user.audiocloudTracks.filter(v=>v.id!=track.id)
              break
              case 'default':
              this.state.landingPage.audiocloudTracks = this.state.landingPage.audiocloudTracks.filter(v=>v.id!=track.id)
              break
              case 'track':
              this.state.tracks = this.state.tracks.filter(v=>v.id!=track.id)
              break
            }        
          }
        })
      }
    },
    updateTrackItem(trackID, item){
      let newItemVal
      if(this.state.search.string){
        newItemVal = this.state.search.audiocloudTracks.filter(v=>v.id==trackID)[0][item]
      }else{
        switch(this.state.mode){
          case 'default': newItemVal = this.state.landingPage.audiocloudTracks.filter(v=>v.id==trackID)[0][item] ; break
          case 'track': newItemVal = this.state.tracks.filter(v=>v.id==trackID)[0][item] ; break
          case 'u': newItemVal = this.state.user.audiocloudTracks.filter(v=>v.id==trackID)[0][item] ; break
        }
      }
      if(item == 'private') newItemVal = !newItemVal ? 1 : 0
      if(item == 'allowDownload') newItemVal = !newItemVal ? 1 : 0
      let sendData = {
        userName: this.state.loggedinUserName,
        item,
        newItemVal,
        passhash: this.state.passhash,
        trackID: trackID
      }
      fetch(this.state.baseURL + '/updateTrackItem.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data[0]){
          this.updated[item] = 1
          setTimeout(()=>this.updated[item] = 0, 1000)
        } else {
          this.updated[item] = -1
          setTimeout(()=>this.updated[item] = 0, 1000)
        }
      })
    },
    formattedDuration(){
      return (this.duration / 60 /60 | 0) + ' hr : ' + (this.duration / 60 | 0) + ' min : ' + ((this.duration/60 - (this.duration / 60 | 0))*60|0) + ' seconds'
    },
    formattedDate(d){
      let M=['January','February','March','April','May','June','July','August','September','October','November','December']
      var l=new Date(d)
      let mn = '' + l.getMinutes()
      if(mn.length == 1) mn = '0' + mn
      return M[l.getMonth()] + ' ' + l.getDate() + ', ' + l.getFullYear() + ' • ' + ((l.getHours()%12)+1) + ':' + mn + ' ' + (l.getHours()<12?'AM':'PM')
    },
    playPauseTrack(){
      if(!this.track.playing){
        this.state.pauseVisible()
        this.track.playing = true
      } else {
        this.track.playing = false
      }
    },
    Draw(){
      if(this.skipRedraw) return
      let t = this.t
      let x = this.x
      let c = this.c
      let S = Math.sin
      let C = Math.cos
    
    
      //c.width|=0
      x.fillStyle='#0006', x.fillRect(0,0,c.width,c.height)
      x.lineJoin = x.lineCap = 'round'
      if(this.trackAnalyzed && typeof this.track.mp3 !== 'undefined' && typeof this.track.leftChannelData != 'undefined'){
        x.fillStyle='#000'
        x.fillRect(0,0,c.width,c.height)
        let res = 256
        x.strokeStyle='#affa'
        x.beginPath()
        let perc = this.track.mp3.currentTime/this.track.mp3.duration
        x.lineTo(c.width*perc,0)
        x.lineTo(c.width*perc,c.height)
        x.lineWidth=(2+c.width/400)|0
        x.stroke()
        for(let i=res;i--;){
          let col1
          let col2
          let col3
          let col4
          if(this.track.playing){
            col1 = `hsla(${360/res*i + -t*300 + 360/4*0}, 99%,50%,.75)`
            col3 = `hsla(${360/res*i + -t*300 + 360/4*2}, 99%,50%,.75)`
          } else {
            col1 = `hsla(${360/res*i/4 + t*50 + 360/4*0}, 15%, 50%, .75)`
            col3 = `hsla(${360/res*i/4 + t*50 + 360/4*2}, 15%, 50%, .75)`
          }
          col2 = `hsla(${360/res*i/4 + t*50 + 360/4*1}, 15%, 50%, .75)`
          col4 = `hsla(${360/res*i/4 + t*50 + 360/4*3}, 15%, 50%, .75)`
          
          x.beginPath()
          x.lineTo(c.width/res*i,c.height/2)
          let l = this.track.leftChannelData.length / res * i | 0
          let Y = (Math.abs(this.track.leftChannelData[l])) * c.height/2
          x.lineTo(c.width/res*i,c.height/2+Y)
          if(i<=perc*res){
            x.strokeStyle=col1
          } else {
            x.strokeStyle=col2
          }
          x.stroke()

          x.beginPath()
          x.lineTo(c.width/res*i,c.height/2)
          l = this.track.rightChannelData.length / res * i | 0
          Y = (Math.abs(this.track.rightChannelData[l])) * c.height/2
          x.lineTo(c.width/res*i,c.height/2-Y)
          if(i<=perc*res){
            x.strokeStyle=col3
          } else {
            x.strokeStyle=col4
          }
          x.stroke()
        }
        if(this.trackAnalyzed){
          for(let m=20;m--;)this.B.push([c.width*perc, Math.random()*c.height,.01])
          this.B = this.B.map(v=>{
            let X = (v[0]-=v[2]/2)-2
            let Y = v[1]
            v[2]+=.05+v[2]/25
            x.fillStyle=`hsla(200,99%,80%,${.05/(1+(1+v[2])**2/40)})`
            x.fillRect(X,Y-2.5,5,5)
            return v
          }).filter(v=>v[0]>0)
        }
        if(typeof this.track.mp3.currentTime != 'undefined'){
          x.font='16px Play'
          x.fillStyle='#4fc8'
          x.fillText(this.formattedCurrentTime() , c.width-120, 16)
        }
      } else {
        x.fillStyle='#0fa2'
        x.fillRect(0,0,c.width*this.percentLoaded/100,c.height)
        x.font='26px Play'
        x.fillStyle='#2fa8'
        let l
        x.fillText('<' + '-'.repeat((t*60|0)%16) + 'loading' + '-'.repeat(l=(t*60|0)%16) + '>', c.width/2-60-l*9.3, c.height/2+10)
      }
      
      this.t += 1/60
      if(!this.track.playing && this.trackAnalyzed) this.skipRedraw = true
      requestAnimationFrame(this.Draw)
    },
    formattedCurrentTime(){
      let hr = this.track.mp3.currentTime / 60 / 60 |0
      let mn = (this.track.mp3.currentTime / 60 / 60 - hr)*60 | 0 
      let sec = ((this.track.mp3.currentTime / 60 / 60 - hr)*60 - mn)*60 | 0
      hr = ''+hr
      mn = ''+mn
      sec = ''+sec
      if(hr.length == 0) hr = '00'
      if(hr.length ==1) hr = '0' + hr
      if(mn.length == 0) mn = '00'
      if(mn.length ==1) mn = '0' + mn
      if(sec.length == 0) sec = '00'
      if(sec.length == 1) sec = '0' + sec
      let cur = (+hr ? hr + ':' : '') +  mn + ':' + sec
      let l
      hr = (l = this.track.mp3.duration - this.track.mp3.currentTime) / 60 / 60 |0
      mn = (l / 60 / 60 - hr)*60 | 0
      sec = ((l / 60 / 60 - hr)*60 - mn)*60 | 0
      hr = ''+hr
      mn = ''+mn
      sec = ''+sec
      if(hr.length == 0) hr = '00'
      if(hr.length == 1) hr = '0' + hr
      if(mn.length == 0) mn = '00'
      if(mn.length == 1) mn = '0' + mn
      if(sec.length == 0) sec = '00'
      if(sec.length == 1) sec = '0' + sec
      return cur + '  ( -' + (+hr ? hr + ':' : '') +  mn + ':' + sec + ')'
    },
    stringToUint(string) {
        var string = btoa(unescape(encodeURIComponent(string))),
            charList = string.split(''),
            uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint16Array(uintArray);
    }
  },
  computed:{
    embedCodeText(){
      return '<iframe style="transform:scale(.75);width:640px;height:360px;border:none;vertical-align:top;" src="'+this.state.baseURL+'/embed/'+this.state.decToAlpha(this.track.id)+'"></iframe>'
    },
    filteredComments(){
      return this.track.comments.filter((v,i)=>i<this.showComments)
    },
    moreComments(){
      return this.track.comments.length > this.showComments
    }
  },
  watch:{
    'track.jump'(val){
      if(val){
        let el = this.$refs['trackContainer' + this.track.id]
        window.scroll(0, el.offsetTop-80 + (this.state.showControls ? -160 : 0))
        this.showPulse = true
        this.$nextTick(()=>{
          this.$refs['pulse' + this.track.id].style.width = this.$refs['trackContainer' + this.track.id].clientWidth + 'px'
          this.$refs['pulse' + this.track.id].style.height = this.$refs['trackContainer' + this.track.id].clientHeight + 'px'
        })
        this.$nextTick(()=>{
          this.showPulse = false
        })
      }
    },
    'track.playing'(val){
      if(!val){
        this.track.mp3.pause()
      } else {
        this.$nextTick(()=>{
          this.track.mp3.play()
          this.state.curPlayId = this.track.id
          this.$nextTick(()=>{
            if(this.skipRedraw){
              this.skipRedraw = false
              this.Draw()
            }
          })
        })
      }
    }
  },
  beforeUnmount(){
    if(typeof this.track.mp3 !== 'undefined'){
      this.track.mp3.pause()
      this.track.mp3.src = ''
    }
  },
  mounted(){
    this.track.jump = 0
    setInterval(()=>{
      this.doMarquis()
    }, 300)
    this.c = this.$refs.canvas
    this.c.addEventListener('click', e=>{
      if(this.trackAnalyzed){
        let perc = e.offsetX / this.c.clientWidth
        this.track.mp3.currentTime = this.track.mp3.duration * perc
        this.state.pauseVisible()
        if(!this.track.playing){
          this.track.playing = false
          this.$nextTick(()=>{
            this.skipRedraw
            this.track.playing = true
          })
        }
      }
    })
    this.c.width = this.c.clientWidth
    this.c.height = this.c.clientHeight
    window.addEventListener('resize',()=>{
      this.c.width = this.c.clientWidth
      this.c.height = this.c.clientHeight
      if(this.skipRedraw){
        this.skipRedraw=false
        this.Draw()
      }
    })
    this.x = this.c.getContext('2d')
    this.t = 0
    
    if(typeof this.track.mp3 == 'undefined'){
      this.track.mp3 = new Audio()
      this.track.mp3.addEventListener('ended',()=>{
        if(this.state.playall && !this.loop){
          this.state.playNextTrack()
        } else {
          if(this.loop){
            this.track.mp3.currentTime = 0
            this.track.playing = false
            this.$nextTick(()=>{
              this.track.playing = true
            })
          }else{
            this.track.playing = false
          }
        }
      })
      this.track.mp3.addEventListener('canplay',()=>{
        if(typeof this.track.mp3 !== 'undefined'){
          this.duration = this.track.mp3.duration
          this.track.canPlay = true
          if(this.state.mode == 'track') {
            this.track.playing = false
            this.$nextTick(()=>{
              this.track.playing = true
            })
          }
        }
      })
      this.track.mp3.src = this.track.audioFile
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      let req = new XMLHttpRequest()
      req.open('GET', this.track.audioFile, true)
      req.responseType = 'arraybuffer'
      req.onprogress=e=>{
        this.percentLoaded = Math.round(e.loaded/e.total*100*100)/100
      }
      req.onload = ()=> {
        let audioData = req.response
        this.audioCtx.decodeAudioData(audioData, buffer=>{
          this.trackAnalyzed = true
          this.track.leftChannelData = buffer.getChannelData(0)
          this.track.rightChannelData = buffer.getChannelData(1)
        })
      }
      if(this.state.mode == 'track'){
        document.getElementsByTagName('html')[0].scroll(0, document.getElementsByTagName('html')[0].clientHeight/3.5)
      }
      req.send()
    } else {
      this.trackAnalyzed = true
    }
    if(this.track.playing){
      this.$nextTick(()=>{
      this.track.mp3.play()
      })
    }
    this.Draw()
    }
  }
</script>

<style scoped>
.trackElem{
  display: inline-block;
  font-size: 20px;
}
.trackTitle{
  color: #ff8;
  font-size: 1.2em;
}
.trackContainer{
  display: inline-block;
  vertical-align: top;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 12px;
  /*border: 1px solid #6fa3;*/
  background: #4443;
  padding: 10px;
  border-radius: 3px;
  width: 600px;
  text-align: center;
}
.playbutton{
  background-image: url(https://lookie.jsbot.net/uploads/2ftyk1.png);
  background-repeat: no-repeat;
  background-size: 80% 80%;
  background-position: 22px;
  border-radius: 50%;
  background-color: #201;
  padding: 0;
  margin:0;
  min-width: 0;
  width: 100px;
  height: 100px;
}
.pausebutton{
  background-image: url(https://lookie.jsbot.net/uploads/BGNlv.png);
  background-repeat: no-repeat;
  background-size: 80% 80%;
  background-position: 10px;
  border-radius: 50%;
  background-color: #201;
  padding: 0;
  margin:0;
  min-width: 0;
  width: 100px;
  height: 100px;
}
.audioContainer{
  background: #001;
  padding: 5px;
  margin-top: 5px;
}
.date{
  font-style: oblique;
  color: #ff8;
}
.avatar{
  height: 100px;
  margin: 3px;
  border-radius: 50%;
  display: inline-block;
}
.link{
  background: linear-gradient(90deg, #0000,#8fe4);
  padding-left: 12px;
  padding-right: 12px;
  margin: 0;
  font-size: 40px;
  color: #ff0!important;
  font-style: oblique;
  height: 52px;
  display: inline-block;
  vertical-align: top;
  margin-top: 2px;
}
.fileLink{
  background: #204;
  padding: 2px;
  word-break: break-all;
  max-width: 400px;
  padding-left: 12px;
  padding-right: 12px;
  margin: 0;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height:1em;
  color: #fffb!important;
  display: inline-block;
  text-align: center;
  vertical-align: top;
}
.tdLeft{
  text-align: right;
}
.tdRight{
  text-align: left;
}
.disabledPlayButton{
  background-image: url(https://lookie.jsbot.net/uploads/FU3vq.png);
  background-color: #222;
}
.disabledPauseButton{
  background-image: url(https://lookie.jsbot.net/uploads/zAYeB.png);
  background-color: #222;
}
.canvas{
  display: inline-block;
  margin-left: 10px;
  width: calc(100% - 112px);
  height: 102px;
  vertical-align: top;
}
.embedAudioContainer{
  width: calc(100% - 30px);
}
.success{
  background: #264!important;
}
.failure{
  background: #622!important;
}
input[type=text]{
  color: #ff8;
  background: #000;
  padding: 2px;
  width: 500px;
  border: none;
  border-bottom: 2px solid #4f8;
  font-size: 16px;
}
.deleteTrackButton{
  position: relative;
  margin-top: -5px;
  margin-right: -5px;
  float: right;
  background-color: #300a;
  width: 50px;
  min-width: initial;
  height: 50px;
  background-position: center center;
  background-size: 45px 45px;
  background-repeat: no-repeat;
  background-image: url(https://lookie.jsbot.net/uploads/XeGsK.png);
}
.commentContainer{
  background: #2020;
  padding: 10px;
  margin-top: 6px;
}
.commentsHeader{
  font-size: 28px;
  text-align: left;
  color: #0ff;
  width: calc(100% - 200px);
  background: #0000;
  vertical-align: top;
  float: left;
  margin-bottom: 10px;
}
.commentText{
  color: #ff8;
  text-align: left;
  display: inline-block;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
  background: #2466;
  margin-top: 10px;
  width: calc(100% - 120px)!important;
  margin-left: 60px;
}
.commentInput:focus{
  outline: none;
}
.commentInput{
  border: none;
  color: #ef8;
  text-align: left;
  vertical-align: top;
  display: inline-block;
  font-size: 18px;
  background: #001c;
  margin-top: 10px;
  width: calc(100% - 160px)!important;
  margin-right: 10px;
  margin-left: 60px;
}
.commentAvatar{
  position: absolute;
  margin-left: -1px;
  max-height: 50px;
  max-width: 50px;
  width: auto;
  border-radius: 50%;
  height:50px;
  top: initial;
  margin-top: -2px;
}
.commentMain{
  width: 100%;
  margin-top: 4px;
  padding-bottom: 6px;
  border-bottom: 2px solid #48f3;
  text-align: left;
}
.commentUserName{
  color: #6dc;
  padding: 0;
  padding-left: 50px;
  padding-right: 5px;
  padding-top: 2px;
  vertical-align: top;
}
.commentDeleteButton{
  background-image: url(https://lookie.jsbot.net/uploads/XeGsK.png);
  background-repeat: no-repeat;
  background-size: 25px 25px;
  background-position: center center;
  width: 34px;
  height: 34px!important;
  vertical-align: top;
  margin-top: -5px;
  border-radius: 5px;
  background-color: #f880;
}
.commentEditButton{
  background-image: url(https://lookie.jsbot.net/uploads/ct1hv.png);
  background-repeat: no-repeat;
  background-size: 25px 25px;
  background-position: center center;
  width: 34px;
  height: 34px!important;
  vertical-align: top;
  margin-top: -5px;
  border-radius: 5px;
  background-color: #f880;
}
.newComment{
  width: calc(100% - 100px)!important;
  float:left;
}
table{
  margin-left: auto;
  margin-right: auto;
}
.loadCommentsButton{
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  background: #3f83;
  color: #fffc;
  font-weight: 300;
  font-size: 24px;
  position: relative;
  display: inline-block;
}
.smallControlButton{
  width: 32px;
  height: 32px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 25px 25px;
  border-radius: 50%;
  position: absolute!important;
  min-width: 0;
}
.loopButton{
  background-color: #028;
  margin-left: -27px;
  margin-top: 0px;
  background-image: url(https://lookie.jsbot.net/uploads/2kPCX5.png);
}
.highlighted{
  background-color: #0fa;
  background-image: url(https://lookie.jsbot.net/uploads/14MAyj.png);
}
.resetButton{
  background-color: #0000;
  margin-left: -106px;
  margin-top: 72px;
  border-radius: 0;
  background-image: url(https://lookie.jsbot.net/uploads/6aevA.png);
}
.jumpToNextButton{
  background-color: #0000;
  margin-left: -22px;
  margin-top: 72px;
  border-radius: 0;
  background-image: url(https://lookie.jsbot.net/uploads/20SIWe.png);
}
.singleTrack{
  position: absolute;
  top: 47%;
  margin-top: 200px;
  margin-bottom: 200px;
  transform: translate(0, -50%);
}
.embedTrack{
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  background: #012;
  height: calc(100% - 65px);
}
.bumpUp{
  margin-top: -25px;
}

.fadePulse-enter-active{
  transition: opacity 0s;
}
.fadePulse-leave-active {
  transition: opacity 1s;
}
.fadePulse-enter, .fadePulse-leave-to{
  opacity: 0;
}
.embedCode{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #103c;
  z-index: 3000;
}
.embedCodeInner{
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.embedcodetext{
   background: #000;
   width: calc(100% - 40px);
   text-align: left;
   word-break: break-all;
   font-family: courier, arial, tahoma;
   padding: 20px;
}
.copytoclipbutton{
  background-image: url(https://cantelope.org/clippy.svg);
  background-position: 5px 4px;
  background-repeat: no-repeat;
  background-size: 25px 25px;
}
.pulse{
  background-color: #0fcc!important;
  color: #012;
}
.embedbutton{
  background-color: #18c;
  color: #cfd;
  text-shadow: 1px 1px 1px #000;
  min-width: initial;
  max-width: initial;
  width: 100px;
}
</style>
