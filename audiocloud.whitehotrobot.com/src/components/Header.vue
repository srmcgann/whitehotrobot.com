<template>
  <div class="header" id="header">
    <div v-if="showUploadProgress" class="uploadProgressContainer">
      <br>uploading {{filesUploading.length}} file{{filesUploading.length > 1 ? 's':''}}...
      <div class="progressBar" v-for="file in filesUploading">
        <div class="progressBarInnerOutline">
          <div class="progressBarInner" :style="'width:calc(' + (file.perc) + '%)'"></div>
        </div>
        <span class="progressText" v-html="file.trackName + ' - ' + (Math.round(file.perc*100)/100) + '%'"></span>
      </div>
    </div>
    <div
      v-if="state.showUploadModal"
      class="uploadModal"
      :class="{'dragover': dragover}"
      @drop.prevent="processDrop"
      @dragover.prevent="dragOverHandler"
      @dragleave.prevent="dragLeaveHandler"
    >
      <div class="uploadModalInner">
        <span style="font-size: 2em;color: #888">upload tracks</span><br><br>
        <br>valid formats<br><br>
        MP3, OGG, WAV<br><br><br>
        <span style="font-size: 1.4em;color: #ff0">drop file(s) here...</span><br>
        <br>or<br><br>
        <button @click="uploadManual()" style="background: #0f0;max-width: 400px;">manually select one from your device</button><br><br>
        <button @click="state.showUploadModal = false" style="background: #400;color: #fee;font-weight: 400;">cancel</button>
      </div>
    </div>

    <div v-if="!state.loggedin" style="display: inline-block; position: absolute">
      <button v-if="state.mode != 'track'" class="navButton jumpButton" :class="{'disabled': !trackPlaying}" @click="state.jumpToPlayingTrack()" title="jump to playing track [ctrl+y]"></button>
    </div>
    <div v-else style="display: inline-block; position: absolute;">
      <button v-if="state.mode != 'track'" class="navButton jumpButton" :class="{'disabled': !trackPlaying}" @click="state.jumpToPlayingTrack()" title="jump to playing track"></button>
      <button :class="{'bumpDown': state.mode == 'track'}" @click="startUpload()" class="uploadButton">upload</button>
    </div>
    <div class="curPageContainer" v-if="(state.totalPages > 0 || state.totalUserPages > 0) && state.mode != 'track' || (state.search.string && state.totalPages>1)" :class="{'bumpLeft': !state.loggedin}">
      <button
        class="navButton"
        :class="{'disabled': curPage < 1}"
        :disabled="curPage < 1"
        @click="state.firstPage()"
      >
        &lt;&lt;
      </button>
      <button
        class="navButton"
        :disabled="curPage < 1"
        :class="{'disabled': curPage < 1}"
        @click="state.regressPage()"
      >
        &lt;
      </button>
      {{pagenumber}}
      <button
        class="navButton"
        :class="{'disabled': totalPages == curPage+1}"
        :disabled="totalPages == curPage+1"
        @click="state.advancePage()"
      >
        &gt;
      </button>
      <button
        class="navButton"
        :class="{'disabled': totalPages == curPage+1}"
        :disabled="totalPages == curPage+1"
        @click="state.lastPage()"
      >
        &gt;&gt;
      </button>
    </div>
    <div class="workingSpace">
      <div class="loggedinDiv">
        <div v-if="state.loggedin" class="loggedInTitle">
          <span style="color: #afe;font-size: 16px;">Welcome,</span><br>
          <a :href="'/u/' + state.loggedinUserName" v-html="truncate(state.loggedinUserName)"></a>
        </div>
        <Account :state="state"/>
      </div>
      <div class="infoButton" title="about whitehot robot" @click="launchInfoPage()"></div>
      <a :href="origin" class="appName">
        <div class="appNameText">
          <div style="display: inline-block;transform: scalex(1.2);margin-right: 10px;">
          whitehot
          </div><br>
          <div style="display: inline-block;transform: scalex(2.05);margin-right: 30px">
            robot
          </div><br>
          audiocloud
        </div>
        <div class="clear"></div>
      </a>
    </div>
  </div>
</template>

<script>
import Account from './Account'
export default {
  components: {
    Account
  },
  data(){
    return {
      dragover: false,
      showUploadProgress: false,
      filesUploading: []
    }
  },
  name: 'Header',
  props: [ 'state' ],
  methods:{
    launchInfoPage(){
      let a = document.createElement('a')
      a.setAttribute('href', 'https://whitehotrobot.dweet.net/about')
      a.setAttribute('target', '_blank')
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.parentNode.removeChild(a)
    },
    updateUserPrefs(pref){
      this.$nextTick(()=>{
        let newval
        switch(pref){
          case 'audiocloudPlayAll': newval = this.state.playall ? 0 : 1; break
          case 'audiocloudShuffle': newval = this.state.shuffle ? 0 : 1; break
          case 'audiocloudDisco': newval = this.state.disco ? 0 : 1; break
          case 'audiocloudNumTracksPerPage': newval = this.state.maxResultsPerPage; break
        }
        let sendData = {
          userName: this.state.loggedinUserName,
          passhash: this.state.passhash,
          pref,
          newval
       }
       fetch(this.state.baseURL + '/updatePrefs.php',{
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(pref == 'audiocloudNumTracksPerPage') window.location.reload()
        })
      })
    },
    startUpload(){
      this.state.showUploadModal=true
    },
    dragLeaveHandler(){
      this.dragover = false
    },
    dragOverHandler(){
      this.dragover = true
    },
    upload(files){
      if(!files.length) return
      this.showUploadProgress = true
      this.filesUploading = Array(files.length).fill().map(v=>{return {}})
      console.log(files)
      Array.from(files).forEach((v, i)=>{
        v.completed = false
        this.filesUploading[i].perc = 0
        this.filesUploading[i].trackName = v.name
      })
      Array.from(files).forEach((v, i)=>{
        if(
          (v.type == 'audio/mpeg' ||
          v.type == 'audio/ogg' ||
          v.type == 'audio/wav') &&
          v.size < 100000000
        ){
          let data = new FormData()
          let trackName = v.name.split('.').filter((q,i)=>i<v.name.split('.').length-1).join('.')
          data.append('author', this.state.loggedinUserName)
          data.append('userID', this.state.loggedinUserID)
          data.append('trackName', trackName)
          data.append('userID', this.state.loggedinUserID)
          data.append('file', v)
          let request = new XMLHttpRequest()
          request.open('POST', this.state.baseURL + '/upload.php')
          request.upload.addEventListener('progress', e => {
            let perc = (e.loaded / e.total)*100
            this.filesUploading[i].trackName = v.name
            this.filesUploading[i].perc = perc
          })
          request.addEventListener('load', e=>{
            v.completed = true
            let finished = true
            Array.from(files).forEach(q=>{
              if(!q.completed) finished = false
            })
            if(finished) {
              window.location.href = window.location.origin + '/u/' + this.state.loggedinUserName
            }
          })
          request.send(data)
        } else {
          alert('a file was rejected due to incorrect type or filesize (max filesize = 100MB)')
          this.state.showUploadModal = false
          this.showUploadProgress = false
        }
      })
    },
    processDrop(e){
      let files = e.dataTransfer.files
      this.upload(files)
    },
    truncate(str){
      if(typeof str === 'undefined') return
      return str.length > 16 ? str.substring(0,2) + '...' + str.substring(str.length-3) : str
    },
    uploadManual(){
      let file = document.createElement('input')
      file.setAttribute('type', 'file')
      file.addEventListener('change', e=>{
        this.upload(e.path[0].files)
      })
      file.click()
    }
  },
  mounted(){
    if(this.curPage > this.totalPages) this.state.jumpToPage(this.totalPages)
  },
  computed:{
    trackPlaying(){
      let ret = false
      if(typeof this.state.currentTrack != 'undefined' && typeof this.state.currentTrack == 'function'){
        if(this.state.currentTrack()){
          ret = !!this.state.currentTrack().length
        }
      }
      return ret
    },
    totalPages(){
      switch(this.state.mode){
        case 'u': return +this.state.totalUserPages; break
        case 'default': return +this.state.totalPages; break
        case 'track': return +this.state.totalPages; break
      }
    },
    curPage(){
      switch(this.state.mode){
        case 'u': return +this.state.curUserPage; break
        case 'default': return +this.state.curPage; break
        case 'track': return +this.state.curPage; break
      }
    },
    pagenumber(){
      let num
      if(this.state.search.string){
        num = 'Page ' + (this.state.curPage+1) + ' of ' + this.state.totalPages
      }else{
        switch(this.state.mode){
          case 'u':
            num = 'Page ' + (this.state.curUserPage+1) + ' of ' + this.state.totalUserPages
          break
          case 'default':
            num = 'Page ' + (this.state.curPage+1) + ' of ' + this.state.totalPages
          break
          case 'track':
            num = 'Page ' + (this.state.curPage+1) + ' of ' + this.state.totalPages
          break
        }
      }
      return num
    },
    origin(){
      return window.location.origin
    }
  }
}
</script>

<style scoped>
.appName{
  float: right;
  position: relative;
  top:50%;
  padding: 2px;
  transform: translateY(-50%);
  text-decoration: none;
  background: #1350 url(https://jsbot.cantelope.org/uploads/1GY3GM.png) no-repeat;
  background-position: 10px 50%;
  background-size: 50px 50px;
  height: 50px;
  z-index: 100;
  border-radius: 10px;
  min-width: 180px;
  
}
.appNameText{
  position: absolute;
  top: 50%;
  color: #f80;
  line-height: .8em;
  text-align: right;
  padding-right: 5px;
  padding-bottom: 2px;
  right: 0;
  transform: translate(0,-50%);
}
.clear{
  clear: both;
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 60px;
  width: 100%;
  background: linear-gradient(90deg, #0008, #034c, #0008);
  border-bottom: 1px solid #2ef6;
  font-size: 24px;
  text-align: center;
  overflow: hidden;
}
.workingSpace{
  max-width: 1200px;
  position: relative;
  left: 50%;
  height: 100%;
  transform: translate(-50%);
}
.loggedInTitle{
  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
  top:0;
  left: 0;
  color: #ff6;
  font-size:16px;
  text-align: left;
  line-height: 1.6em;
}
.loggedinDiv{
  position: absolute;
  height: 60px;
  width: 250px;
  top: 0;
}
.username{
  font-size: 1em;
}
a{
  color: #ff0!important;
  text-decoration: none;
}
.uploadModal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #001d;
  z-index: 30000;
  line-height: 1.05em;
}
.uploadProgressContainer{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #021d;
  z-index: 30020;
  line-height: 1.05em;
}
.uploadModalInner{
  position: absolute;
  top: calc(50% - 60px);
  left: 50%;
  width: 400px;
  height: 280px;
  background: #103b;
  z-index: 30000;
  box-shadow: 0px 0px 100px 100px #103b;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.dragover{
  background: #1436;
}
.progressBar{
  width: 80%;
  height: 16px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
.progressBarInner{
  background: #0f48;
  height: 100%;
}
.progressBarInnerOutline{
  border: 1px solid #8fc3;
  height: 100%;
}
.progressText{
  position: absolute;
  font-size: 16px;
  left: 50%;
  transform: translate(-50%, -90%);
  text-shadow: 1px 1px 2px #000;
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
  background: #0000;
  vertical-align: top;
}
.commentText{
  color: #ccc;
  text-align: left;
  min-width: 200px;
  display: inline-block;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
  background: #024;
  width: calc(100% - 470px);
  margin-left: 10px;
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
  margin-left: 10px;
}
.commentAvatar{
  position: absolute;
  margin-left: -51px;
  width: 500px;
  height: 500px;
  max-height:30px;
  max-width:40px;
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
  background-image: url(https://jsbot.cantelope.org/uploads/XeGsK.png);
  background-repeat: no-repeat;
  background-size: 25px 25px;
  background-position: center center;
  width: 34px;
  height: 34px;
  vertical-align: top;
  margin-top: -5px;
  border-radius: 5px;
  background-color: #f880;
}
.commentEditButton{
  background-image: url(https://jsbot.cantelope.org/uploads/ct1hv.png);
  background-repeat: no-repeat;
  background-size: 25px 25px;
  background-position: center center;
  width: 34px;
  height: 34px;
  vertical-align: top;
  margin-top: -5px;
  border-radius: 5px;
  background-color: #f880;
}
.newComment{
  width: calc(100% - 100px)!important;
  float:left;
}
.curPageContainer{
  position: absolute;
  display: inline-block;
  width: 270px;
  transform: translateX(-50%);
  line-height: .8em;
  min-height: 25px;
  margin-top: 32px;
  margin-left: 30px;
  vertical-align: top;
  padding-top: 0px;
  font-size: .8em;
  z-index: 1000;
}
.uploadButton{
  margin: 0;
  background: #0f4;
  width: 80px;
  display: inline-block;
  text-align: center;
  line-height: .8em;
  min-width: 0;
  margin-top: 5px;
  margin-left: 65px;
  position: absolute;
  z-index: 1000;
}
.navButton{
  min-width:0;
  height: 25px;
  padding: 0;
  background: #0f0;
  margin: 0;
  margin-left: 2px;
  margin-right: 2px;
  width: 25px;
}
.disabled{
  background: #888;
}
.bumpLeft{
  margin-left: -30px;
}
.bumpDown{
  margin-top: 17px!important;
  margin-left: 0;
}
.infoButton{
  position: relative;
  width: 40px;
  height: 40px;
  top: 10px;
  margin-right: 5px;
  float: right;
  background-image: url(https://jsbot.cantelope.org/uploads/WEOZD.png);
  background-repeat: no-repeat;
  background-size: 40px 40px;
  background-position: center center;
  cursor: pointer;
}
.jumpButton{
  background-image:url(https://jsbot.cantelope.org/uploads/1RptlQ.png);
  background-size: cover;
  position: absolute;
  margin-top: 5px;
  margin-left: 15px;
  z-index: 1000;
}
</style>
