<template>
  <div id="app">
    <Main :state="state"/>
    <UserSettings v-if="state.userSettingsVisible" :state="state"/>
    <LoginPrompt v-if="state.loginPromptVisible" :state="state"/>
  </div>
</template>

<script>
import Main from './components/Main'
import LoginPrompt from './components/LoginPrompt'
import UserSettings from './components/UserSettings'

export default {
  name: 'App',
  components: {
    Main,
    UserSettings,
    LoginPrompt
  },
  data(){
    return {
      state: {
        baseURL: 'https://code.whitehotrobot.com',
				baseDemoURL: 'https://demo.whitehotrobot.com',
				rootDomain: 'whitehotrobot.com',
        demos: [],
        loggedin: false,
        toggleLogin: null,
        showLoginPrompt: null,
        closePrompts: null,
        loginPromptVisible: false,
        username: '',
        password: '',
        passhash: '',
        userInfo: [],
				userData: [],
        createDemo: null,
        regusername: '',
        regpassword: '',
        showRegister: false,
        showUserSettings: null,
        userSettingsVisible: false,
        getAvatar: null,
        autoplay: true,
        toggleAutoplay: null,
        demoDataReceived: false,
        confirmpassword: '',
        preload: 2,
        loggedinUserName: '',
        loggedinUserID: '',
        setCookie: null,
        displayLoginRequired: false,
        decToAlpha: null,
        alphaToDec: null,
        incrememtViews: null,
        showControls: true,
        toggleShowControls: null,
        logout: null,
        login: null,
        mode: 'all', // all, user, single
        viewAuthor: '',
        isAdmin: false,
        goHome: null,
        viewDemo: '',
        rawDemoID: '',
				fetchUserData: null,
        error404: false,
        extractEmbedURL: null,
        openFullscreen: null,
        invalidLoginAttempt: false,
        defaultAvatar: 'https://lookie.jsbot.net/uploads/1pnBdc.png',
        inView:[]
      }
    }
  },
  methods:{
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
          }
        })
			}
		},
    extractEmbedURL(item){
      if(item.videoLink.indexOf('youtu')!==-1){
        fetch(this.state.baseURL + '/vidThumb.php?id=' + item.id)
				let l=''
        if((l=item.videoLink.split('?')).length){
          l=l.filter(v=>v.indexOf('v=')!==-1)
          if(l.length) l=l[l.length-1].split('v=')[1].split('&')[0]
        }
        if(!l || !l[0]){
          l=item.videoLink.split('/')
          l=l[l.length-1]
        }
        item.videoIframeURL = l ? 'https://www.youtube.com/embed/' + l : ''
			} else if(item.videoLink.substring(item.videoLink.length-3).toUpperCase() === 'MP4') {
        let sendData = {demoID: item.id}
        fetch(this.state.baseURL + '/vidThumb.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
  				if(data) {
						item.videoIframeURL = data
					} else {
						item.videoIframeURL = ''
					}
        })
			} else {
        item.videoIframeURL = ''
      }
    },
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
    getMode(){
      let vars = window.location.pathname.split('/').filter(v=>v)
      this.state.mode = 'all'
      if(vars.length>1){
        switch(vars[0]){
          case 'd': this.state.mode = 'single'; this.state.viewDemo = this.alphaToDec(vars[1]); this.state.rawDemoID = vars[1]; break
          case 'u': this.state.mode = 'user'; this.state.viewAuthor = decodeURIComponent(vars[1]); break
        }
      }else{
        if(window.location.href !== window.location.origin + '/') window.location.href = window.location.origin
      }
    },
    incrementViews(id){
      let sendData = {demoID: id}
      fetch(this.state.baseURL + '/incrementViews.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res=>res.json()).then(data=>{
        this.state.demos.filter(v=>v.id==id)[0].views++
      })
    },
    createDemo(){
      if(this.state.loggedin){
        let sendData = {userName: this.state.loggedinUserName, passhash: this.state.passhash}
        fetch(this.state.baseURL + '/createDemo.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(data[0]){
            window.location.href = window.location.origin + '/d/' + this.state.decToAlpha(data[1])
          }
        })
      }else{
        this.state.showRegister = true
        this.state.displayLoginRequired = true
        this.state.showLoginPrompt()
      }
    },
    loadDemos(){
      let sendData
      switch(this.state.mode){
        case 'all':
          fetch(this.state.baseURL + '/getDemos.php').then(res=>res.json()).then(data=>{
            this.state.demos=data
            this.state.demoDataReceived = true
            this.state.demos.map((v,i)=>{
              this.extractEmbedURL(v)
              v.showForkHistory = false
              v.videoPlaying = false
							v.play = this.state.autoplay
              if(i < this.state.preload){
                v.show = true
                this.incrementViews(v.id)
              } else {
                v.show = false
              }
            })
            if(data){
              this.state.inView = Array(this.state.demos.length).fill().map(v=>false)
              data.map(v=>{
								v.comments = v.comments.map(q=>{
									q.updated = false
									q.editing = false
									this.fetchUserData(q.userID)
									return q
								})
                if(typeof this.state.userInfo[v.userID] == 'undefined'){
                  let sendData = {userID: v.userID}
                  fetch(this.state.baseURL + '/fetchUserData.php',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(sendData),
                  })
                  .then(res => res.json())
                  .then(data => {
                    this.state.userInfo[v.userID] = data
                  })
                }
              })
            }else{
              console.log('404')
              this.state.error404 = true
            }
          })
        break
        case 'single':
          sendData = {demoID: this.state.viewDemo}
          fetch(this.state.baseURL + '/getSingle.php',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
          })
          .then(res => res.json())
          .then(data => {
            this.state.demoDataReceived = true
            if(data.length){
              this.state.demos=data
              this.state.demos.map(v=>{
                v.comments = v.comments.map(q=>{
                  q.updated = false
                  q.editing = false
                  this.fetchUserData(q.userID)
                  return q
                })
                this.extractEmbedURL(v)
                v.videoPlaying = false
								v.play = this.state.autoplay
                v.show = true
                this.incrementViews(v.id)
              })
              this.state.inView = Array(this.state.demos.length).fill().map(v=>false)
              data.map(v=>{
                if(typeof this.state.userInfo[v.userID] == 'undefined'){
                  let sendData = {userID: v.userID}
                  fetch(this.state.baseURL + '/fetchUserData.php',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(sendData),
                  })
                  .then(res => res.json())
                  .then(data => {
                    this.state.userInfo[v.userID] = data
                  })
                }
              })
            }else{
              console.log('404')
              this.state.error404 = true
            }
          })
        break
        case 'user':
          sendData = {userName: this.state.viewAuthor}
          fetch(this.state.baseURL + '/getUserDemos.php',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
          })
          .then(res => res.json())
          .then(data => {
            this.state.demos=data
            this.state.demoDataReceived = true
            this.state.demos.map((v,i)=>{
              v.comments = v.comments.map(q=>{
                q.updated = false
                q.editing = false
                this.fetchUserData(q.userID)
                return q
              })
              this.extractEmbedURL(v)
              v.videoPlaying = false
							v.play = this.state.autoplay
              if(i < this.state.preload){
                v.show = true
                this.incrementViews(v.id)
              } else {
                v.show = false
              }
            })
            if(data){
              this.state.inView = Array(this.state.demos.length).fill().map(v=>false)
              data.map(v=>{
                if(typeof this.state.userInfo[v.userID] == 'undefined'){
                  let sendData = {userID: v.userID}
                  fetch(this.state.baseURL + '/fetchUserData.php',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(sendData),
                  })
                  .then(res => res.json())
                  .then(data => {
                    this.state.userInfo[v.userID] = data
                  })
                }
              })
            }else{
              console.log('404')
              this.state.error404 = true
            }
          })
        break
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
          document.cookie = v + '; expires=' + (new Date(0)).toUTCString() + '; path=/; domain=' + this.state.rootDomain
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
          if(data[0]){
            this.state.loggedin = true
            this.state.loggedinUserID = data[1]
            this.setCookie()
            this.state.loginPromptVisible = false
            this.state.invalidLoginAttemp = false
            this.state.userInfo[this.state.loggedinUserID] = {}
            this.state.userInfo[this.state.loggedinUserID].name = this.state.regusername
            this.state.userInfo[this.state.loggedinUserID].avatar = data[2]
            this.state.userInfo[this.state.loggedinUserID].isAdmin = +data[3]
            if(+data[3]) this.state.isAdmin = true
          }else{
            this.state.loggedin = false
            this.state.loggedinUserName = ''
            this.state.loggedinUserID = ''
            this.state.passhash = ''
            this.state.isAdmin = false
            this.state.invalidLoginAttempt = true
          }
        })
      }
    },
    toggleShowControls(){
      let cookies = document.cookie
      cookies.split(';').map(v=>{
        if(v.indexOf('showControls')!=-1){
          document.cookie = v + '; expires=' + (new Date(0)).toUTCString() + '; path=/'
        }
      })
      this.state.showControls = !this.state.showControls
      document.cookie = 'showControls=' + this.state.showControls + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
    },
    toggleAutoplay(){
      let cookies = document.cookie
      cookies.split(';').map(v=>{
        if(v.indexOf('autoplay')!=-1){
          document.cookie = v + '; expires=' + (new Date(0)).toUTCString() + '; path=/'
        }
      })
      this.state.autoplay = !this.state.autoplay
      this.state.demos.map(v=>{
        v.play = this.state.autoplay
      })
      document.cookie = 'autoplay=' + this.state.autoplay + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
    },
    checkShowControlsPref(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='showControls')
      if(l.length) this.state.showControls = l[0].split('=')[1]=='true'
    },
    checkAutoplayPref(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='autoplay')
      if(l.length) this.state.autoplay = l[0].split('=')[1]=='true'
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
        if(data[0]){
          this.state.loggedin = true
          this.state.loggedinUserName = this.state.username
          this.state.loggedinUserID = data[2]
          this.state.isAdmin = +data[4]
          this.state.passhash = data[1]
          this.setCookie()
          this.closePrompts()
          this.state.invalidLoginAttemp = false
          this.state.userInfo[this.state.loggedinUserID] = {}
          this.state.userInfo[this.state.loggedinUserID].name = this.state.regusername
          this.state.userInfo[this.state.loggedinUserID].avatar = data[3]
          this.state.userInfo[this.state.loggedinUserID].isAdmin = +data[4]
          this.checkAutoplayPref()
          this.checkShowControlsPref()
        }else{
          this.state.loggedin = false
          this.state.invalidLoginAttempt = true
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
      
      this.checkAutoplayPref()
      this.checkShowControlsPref()
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
      }
    }
  },
  mounted(){
    this.getMode()
    this.state.toggleLogin = this.toggleLogin
    this.state.showLoginPrompt = this.showLoginPrompt
    this.state.toggleShowControls = this.toggleShowControls
    this.state.showUserSettings = this.showUserSettings
    this.state.extractEmbedURL= this.extractEmbedURL
    this.state.toggleAutoplay = this.toggleAutoplay
    this.state.incrementViews = this.incrementViews
    this.state.openFullscreen = this.openFullscreen
    this.state.fetchUserData = this.fetchUserData
    this.state.closePrompts = this.closePrompts
    this.state.createDemo = this.createDemo
    this.state.decToAlpha = this.decToAlpha
    this.state.alphaToDec = this.alphaToDec
    this.state.setCookie = this.setCookie
    this.state.getAvatar = this.getAvatar
    this.state.goHome = this.goHome
    this.state.logout = this.logout
    this.state.login = this.login
    this.loadDemos()
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
.hideOverflow{
  overflow: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
  cursor: ns-resize;
}

/* Track */
::-webkit-scrollbar-track {
  background: #234;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #789;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  cursor: ns-resize!important;
  background: #abc;
}
textarea{
  cursor: auto;
}
.spacerDiv{
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #0000, #4dd8, #0000);
  margin-top: .3em;
  margin-bottom: .3em;
}
</style>
