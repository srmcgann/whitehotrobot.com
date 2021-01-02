<template>
  <div id="app">
    <Header :state="state"/>
    <Main :state="state"/>
    <UserSettings v-if="state.userSettingsVisible" :state="state"/>
    <LoginPrompt v-if="state.loginPromptVisible" :state="state"/>
    <Footer :state="state"/>
  </div>
</template>

<script>
import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPrompt from './components/LoginPrompt'
import UserSettings from './components/UserSettings'

export default {
  name: 'App',
  data(){
    return {
      state:{
        baseURL: 'http://local.audiocloud.whitehotrobot.com',
        baseDemoURL: 'https://code.whitehotrobot.com',
        baseVideoURL: 'https://whitehotrobot.com',
        baseDomain: 'audiocloud.whitehotrobot.com',
        baseUserDomain: 'whitehotrobot.com',
        rootDomain: 'whitehotrobot.com',
        userData: [],
        incrementViews: null,
        loggedinUserName: '',
        baseProtocol: 'http',
        loggedin: false,
        showUploadModal: false,
        toggleLogin: null,
        showLoginPrompt: null,
        closePrompts: null,
        loginPromptVisible: false,
        viewAuthor: null,
        isAdmin: false,
        checkEnabled: null,
        loggedinuser: '',
        inView: [],
        loaded: false,
        user: null,
        fetchUserData: null,
        startStopPages: false,
        username: '',
        password: '',
        passhash: '',
        userInfo: [],
        tracks: [],
        regusername: '',
        showControls: false,
        regpassword: '',
        preload: 2,
        decToAlpha: null,
        alphaToDec: null,
        showRegister: false,
        showUserSettings: null,
        userSettingsVisible: false,
        openFullscreen: null,
        getAvatar: null,
        landingPage:{
          audiocloudTracks: []
        },
        mode: '',
        defaultAvatar: 'https://lookie.jsbot.net/uploads/1pnBdc.png',
      }
    }
  },
  components: {
    Main,
    Header,
    Footer,
    UserSettings,
    LoginPrompt
  },
  methods:{
    openFullscreen(elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
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
		fetchUserData(id){
			if(typeof this.state.userData[id] == 'undefined'){
        let sendData = {userID: id}
        fetch(this.state.baseURL + '/fetchUserData.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(data) {
            this.state.userData[id] = data
            this.state.userInfo[id] = {}
            this.state.userInfo[id].name = data.name
            this.state.userInfo[id].avatar = data.avatar
            this.state.userInfo[id].isAdmin = data.isAdmin
          }
        })
			}
		},
    loadLandingPage(){
      fetch(this.state.baseURL + '/getRecentTracks.php',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res=>res.json()).then(data=>{
        data.map(v=>{
          v.private = !!(+v.private)
          v.allowDownload = !!(+v.allowDownload)
          this.incrementViews(v.id)
          v.comments = v.comments.map(q=>{
            q.updated = false
            q.editing = false
            this.fetchUserData(q.userID)
            return q
          })
        })
        this.state.landingPage.audiocloudTracks = data
        this.state.loaded = true
      })
    },
    loadUserData(name){
      let sendData = {
        name: name,
        loggedinUserName: this.state.loggedinUserName,
        passhash: this.state.passhash
      }
      console.log(sendData)
      fetch(this.state.baseURL + '/fetchUserDataByName.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
        console.log(data)
        data.audiocloudTracks.map(v=>{
          this.incrementViews(v.id)
          v.private = !!(+v.private)
          v.allowDownload = !!(+v.allowDownload)
          v.comments = v.comments.map(q=>{
            q.updated = false
            q.editing = false
            this.fetchUserData(q.userID)
            return q
          })
        })
        this.state.user = data
        this.state.userInfo[this.state.user.id] = {}
        this.state.userInfo[this.state.user.id].name = this.state.user.name
        this.state.userInfo[this.state.user.id].avatar = this.state.user.avatar
        this.state.userInfo[this.state.user.id].isAdmin = this.state.user.isAdmin
        this.state.loaded = true
      })
    },
    loadTrack(trackID){
      let sendData = {
        trackID
      }
      fetch(this.state.baseURL + '/fetchTrack.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
        data.private = !!(+data.private)
        data.comments = data.comments.map(q=>{
          q.updated = false
          q.editing = false
          this.fetchUserData(q.userID)
          return q
        })
        data.allowDownload = !!(+data.allowDownload)
        this.incrementViews(data.id)
        this.state.loaded = true
        this.state.tracks = [data]
      })
    },
    getQueryVar(url, variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
       }
       return false;
    },
    goHome(){
      window.location.href = window.location.origin
    },
    getAvatar(id){
      if(typeof this.state.userInfo[id] == 'undefined' || !this.state.userInfo[id].avatar){
        return this.state.defaultAvatar
      } else {
        this.state.userInfo[id].avatar = this.state.userInfo[id].avatar.replace(' ','')
        return this.state.userInfo[id].avatar
      }
    },
    closePrompts(){
      this.state.loginPromptVisible = false
      this.state.userSettingsVisible = false
      this.state.showRegister = false
      this.state.displayLoginRequired = false
      document.getElementsByTagName('HTML')[0].style.overflowY = 'visible'
    },
    showUserSettings(){
      document.getElementsByTagName('HTML')[0].style.overflowY = 'hidden'
      this.state.userSettingsVisible = true
    },
    showLoginPrompt(){
      document.getElementsByTagName('HTML')[0].style.overflowY = 'hidden'
      this.state.username = this.state.password = this.state.regusername = this.state.regpassword = ''
      this.state.invalidLoginAttempt = false
      this.state.loginPromptVisible = true
    },
    toggleLogin(){
      this.state.loggedin = !this.state.loggedin
    },
    setCookie() {
      let cookies = document.cookie
      cookies.split(';').map(v=>{
        if(v.indexOf('autoplay')==-1){
          document.cookie = v + '; expires=' + (new Date(0)).toUTCString() + '; path=/'
        }
      })
      document.cookie = 'loggedinuser=' + this.state.loggedinUserName + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
      document.cookie = 'loggedinuserID=' + this.state.loggedinUserID + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
      document.cookie = 'token=' + this.state.passhash + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
      document.cookie = 'autoplay=' + this.state.autoplay + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
      document.cookie = 'showControls=' + this.state.showControls + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
    },
    checkEnabled(){
      if(this.state.loggedinUserName) {
        let sendData = {userName: this.state.loggedinUserName, passhash: this.state.passhash}
        fetch(this.state.baseURL + '/checkEnabled.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(!!(+data[0])){
            this.state.loggedin = true
            this.state.loggedinUserID = +data[1]
            this.state.fetchUserData(this.state.loggedinUserID)
            this.setCookie()
            this.state.loginPromptVisible = false
            this.state.invalidLoginAttemp = false
            this.state.userInfo[this.state.loggedinUserID] = {}
            this.state.userInfo[this.state.loggedinUserID].name = this.state.regusername || this.state.loggedinUserName
            this.state.userInfo[this.state.loggedinUserID].avatar = data[2]
            this.state.userInfo[this.state.loggedinUserID].isAdmin = +data[3]
            if(+data[3]) this.state.isAdmin = true
            if(this.state.mode !== 'u'){
              sendData = {userID: this.state.loggedinUserID}
              fetch(this.state.baseURL + '/fetchUserData.php',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData),
              }).then(res=>res.json()).then(data=>{
                if(!this.state.viewAuthor || this.state.viewAuthor === data.escaped_name){
                  this.state.user = data
                  this.state.userInfo[this.state.loggedinUserID].name = data.name
                  this.state.userInfo[this.state.loggedinUserID].avatar = data.avatar
                  this.state.userInfo[this.state.loggedinUserID].isAdmin = +data.isAdmin
                }
                //this.state.loaded = true
              })
            }
          }else{
            this.state.loggedin = false
            this.state.loggedinUserName = ''
            this.state.loggedinUserID = ''
            this.state.passhash = ''
            this.state.isAdmin = false
            this.state.invalidLoginAttempt = true
            //this.state.loaded = true
          }
        })
      }
    },
    checkAutoplayPref(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='autoplay')
      if(l.length) this.state.autoplay = l[0].split('=')[1]=='true'
    },
    getMode(){
      let vars = window.location.pathname.split('/').filter(v=>v)
      if(vars.length>0){
        switch(vars[0]){
          case 'track':
            this.state.mode = 'track'
            this.$nextTick(()=>this.loadTrack(this.alphaToDec(vars[1])))
            break
          case 'playlist':
            this.state.mode = 'playlist'
            break
          case 'upload':
            this.state.mode = 'upload'
            break
          case 'browse':
            this.state.mode = 'browse'
            break
          case 'u':
            this.state.mode = 'u'
            this.$nextTick(()=>this.loadUserData(decodeURIComponent(vars[1]).replaceAll(' ', ' ')))
          break
          default:
            if(window.location.href !== window.location.origin + '/') window.location.href = window.location.origin
          break
        }
      }else{
        this.state.mode = 'default'
        this.loadLandingPage()
        if(window.location.href !== window.location.origin + '/') window.location.href = window.location.origin
      }
    },
    login(){
      let sendData = {userName: this.state.username, password: this.state.password}
      fetch(this.state.baseURL + '/login.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data[0]){
          this.state.loggedin = true
          this.state.loggedinUserName = this.state.username
          this.state.loggedinUserID = +data[2]
          this.state.isAdmin = +data[4]
          this.state.passhash = data[1]
          this.setCookie()
          this.closePrompts()
          this.state.invalidLoginAttemp = false
          this.state.userInfo[this.state.loggedinUserID] = {}
          this.state.userInfo[this.state.loggedinUserID].name = this.state.regusername || this.state.loggedinUserName
          this.state.userInfo[this.state.loggedinUserID].avatar = data[3]
          this.state.userInfo[this.state.loggedinUserID].isAdmin = +data[4]
          sendData = {userID: this.state.loggedinUserID}
          fetch(this.state.baseURL + '/fetchUserData.php',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
          }).then(res=>res.json()).then(data=>{
            if(this.state.viewAuthor === data.escaped_name){
              this.state.user = data
              this.state.user.pages.map((v, i)=>{
                if(i < this.state.preload){
                  v.show = true
                } else {
                  v.show = false
                }
                v.userID = +v.userID
              })
            }
            // this.state.loaded = true
          })
        }else{
          this.state.loggedin = false
          this.state.invalidLoginAttempt = true
          //this.state.loaded = true
        }
      })
    },
    logout(){
      let cookies = document.cookie
      cookies.split(';').map(v=>{
        if(v.indexOf('autoplay')==-1){
          document.cookie = v + '; expires=' + (new Date(0)).toUTCString() + '; path=/; domain=' + this.state.rootDomain
        }
      })
      this.state.loggedin = false
      this.state.isAdmin = false
      this.state.loggedinUserID = this.state.loggedinUserName = ''
    },
    checkLogin(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='loggedinuser')
      if(l.length){
        this.state.loggedinUserName = l[0].split('=')[1]
        let l2 = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='token')
        if(l2.length){
          this.state.passhash = l2[0].split('=')[1]
          let l3 = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='loggedinuserID')
          if(l3.length){
            this.state.loggedinUserID = l3[0].split('=')[1]
            this.checkEnabled()
          }
        }
      } else {
        //this.state.loaded = true
      }
    },
    incrementViews(id){
      let sendData = {trackID: id}
      fetch(this.state.baseURL + '/incrementViews.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res=>res.json()).then(data=>{
        switch(this.state.mode){
          case 'u': this.state.user.audiocloudTracks.filter(v=>v.id==id)[0].views++; break
          case 'default': this.state.landingPage.audiocloudTracks.filter(v=>v.id==id)[0].views++; break
          case 'track': this.state.tracks.filter(v=>v.id==id)[0].views++; break
        }
      })
    },
  },
  watch:{
    'state.showUploadModal'(val){
      if(val){
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
      } else {
        document.getElementsByTagName('html')[0].style.overflow = 'initial'
      }
    }
  },
  mounted(){
    this.getMode()
    this.state.showLoginPrompt = this.showLoginPrompt
    this.state.showUserSettings = this.showUserSettings
    this.state.incrementViews = this.incrementViews
    this.state.openFullscreen = this.openFullscreen
    this.state.fetchUserData = this.fetchUserData
    this.state.closePrompts = this.closePrompts
    this.state.loadUserData = this.loadUserData
    this.state.checkEnabled = this.checkEnabled
    this.state.toggleLogin = this.toggleLogin
    this.state.decToAlpha = this.decToAlpha
    this.state.alphaToDec = this.alphaToDec
    this.state.setCookie = this.setCookie
    this.state.getAvatar = this.getAvatar
    this.state.goHome = this.goHome
    this.state.logout = this.logout
    this.state.login = this.login
    this.checkLogin()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
#app{
  min-width: 475px;
}
body,html{
  margin: 0;
  overflow-X: hidden;
  background: #011;
  font-family: Play;
  color: #8fc;
  min-height: 100%;
  min-width: 475px;
}
.input{
  text-align: center;
  font-size: 24px;
  background: #0004;
  border: none;
  border-bottom: 2px solid #2fa;
  width: 300px;
  color: #ffa;
}
.input:focus{
  outline: none;
}
button{
  font-family: Play;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  background: #adc;
  padding: 4px;
  padding-bottom: 6px;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 900;
  margin: 10px;
  min-width: 140px;
  cursor: pointer;
}
button:focus{
  //outline: none;
}
hr{
  border: 2px solid #0aaa;
  line-height: 0;
  height: 0;
  padding: 0;
}
a,button{
  cursor: pointer;
}
span{
  cursor: default;
}
.input{
  text-align: center;
  font-size: 24px;
  background: #0004;
  border: none;
  border-bottom: 2px solid #2fa;
  width: 300px;
  color: #ffa;
}
.input:focus{
  outline: none;
}
.spacerDiv{
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #0000, #4dd8, #0000);
  margin-top: .3em;
  margin-bottom: .3em;
}
input[type=checkbox]{
  transform: scale(1.5);
  margin: 8px;
  margin-left: 5px;
}
input:focus{
  outline: none;
}
button:focus{
  outline: none;
}
</style>
