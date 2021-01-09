<template>
  <div id="app">
    <Controls :state="state" />
    <Header :state="state"/>
    <Main :state="state"/>
    <UserSettings v-if="state.userSettingsVisible" :state="state"/>
    <LoginPrompt v-if="state.loginPromptVisible" :state="state"/>
    <Footer :state="state"/>
  </div>
</template>

<script>
import Main from './components/Main'
import Controls from './components/Controls'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPrompt from './components/LoginPrompt'
import UserSettings from './components/UserSettings'

export default {
  name: 'App',
  data(){
    return {
      state:{
        baseURL: 'https://audiocloud.whitehotrobot.com',
        baseDemoURL: 'https://code.whitehotrobot.com',
        baseVideoURL: 'https://whitehotrobot.com',
        baseDomain: 'audiocloud.whitehotrobot.com',
        baseUserDomain: 'whitehotrobot.com',
        rootDomain: 'whitehotrobot.com',
        maxCommentsBeforeExpansion: 3,
        curPage: 0,
        curPlayId: 0,
        playPauseCurrentTrack: null,
        jumpToPlayingTrack: null,
        beginSearch: null,
        curTrack: null,
        curSearchPage: 0,
				jumpToPage: null,
				playall: false,
				userAgent: null,
				shuffle: false,
				disco: false,
        userData: [],
				preloadImages: [],
        curUserPage: null,
        incrementViews: null,
        loggedinUserName: '',
        exactClicked: false,
        search: {
          string: '',
          audiocloudTracks: [],
          hits: 0,
          inProgress: false,
          timer: 0,
          timerHandle: null,
          exact: false,
          allWords: true
        },
        loggedin: false,
        totalUserPages: 0,
        totalPages: 0,
				playPreviousTrack: null,
				playNextTrack: null,
        showUploadModal: false,
				currentTrack: null,
        toggleLogin: null,
				maxResultsPerPage: 0,
        showLoginPrompt: null,
        globalT: 0,
        showControls: true,
        toggleShowControls: null,
        closePrompts: null,
        loginPromptVisible: false,
        isAdmin: false,
        checkEnabled: null,
        loggedinuser: '',
        inView: [],
        loaded: false,
        user: null,
        fetchUserData: null,
        startStopPages: false,
        pauseVisible: null,
        username: '',
        password: '',
        passhash: '',
        userInfo: [],
        tracks: [],
        regusername: '',
        advancePage: null,
        regressPage: null,
				filteredUserTracks: null,
        firstPage: null,
        lastPage: null,
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
    Controls,
    Header,
    Footer,
    UserSettings,
    LoginPrompt
  },
  methods:{
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
    pauseVisible(){
      if(this.state.search.string){
        this.state.search.audiocloudTracks.map(v=>v.playing=false)
      }else{
        switch(this.state.mode){
          case 'u':
            this.state.user.audiocloudTracks.map(v=>v.playing=false)
          break
          case 'track':
            this.state.tracks.map(v=>v.playing=false)
          break
          case 'default':
            this.state.landingPage.audiocloudTracks.map(v=>v.playing=false)
          break
        }
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
        let sendData = {
          userID: id,
          page: this.state.curUserPage,
          maxResultsPerPage: this.state.maxResultsPerPage
        }
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
            this.state.userData[id] = data[0]
            this.state.userInfo[id] = {}
            this.state.userInfo[id].name = data[0].name
            this.state.userInfo[id].avatar = data[0].avatar
            this.state.userInfo[id].isAdmin = data[0].isAdmin
          }
        })
			}
		},
    loadLandingPage(){
      let sendData = {
        page: this.state.curPage,
        maxResultsPerPage: this.state.maxResultsPerPage
      }
      fetch(this.state.baseURL + '/getRecentTracks.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
				data[0].map(v=>{
          v.playing = false
          v.private = !!(+v.private)
          v.allowDownload = !!(+v.allowDownload)
          this.incrementViews(v.id)
					this.loadUserData(v.author)
          v.comments = v.comments.map(q=>{
            q.updated = false
            q.editing = false
            this.fetchUserData(q.userID)
            return q
          })
        })
        this.state.landingPage.audiocloudTracks = data[0]
        this.state.totalPages = data[1]
        if(this.state.curPage+1 > this.state.totalPages) this.lastPage()
				this.state.loaded = true
				if(this.state.playall) {
				  this.playNextTrack()
				}
      })
    },
    loadUserData(name){
      let sendData = {
        name: decodeURIComponent(name),
        loggedinUserName: this.state.loggedinUserName,
        passhash: this.state.passhash,
				maxResultsPerPage: this.state.maxResultsPerPage,
        page: this.state.curUserPage
      }
      fetch(this.state.baseURL + '/fetchUserDataByName.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
          if(this.state.user != null && typeof this.state.user.audiocloudTracks != 'undefined' && this.state.user.audiocloudTracks.length){
            data[0].audiocloudTracks = this.state.user.audiocloudTracks
          }else{
            data[0].audiocloudTracks.map(v=>{
              if(this.state.mode != 'default') this.incrementViews(v.id)
              v.playing = false
              v.private = !!(+v.private)
              v.allowDownload = !!(+v.allowDownload)
              v.comments = v.comments.map(q=>{
                q.updated = false
                q.editing = false
                this.fetchUserData(q.userID)
                return q
              })
            })
          }
          this.state.totalUserPages = data[1]
          if(this.state.curUserPage+1 > this.state.totalUserPages) this.lastPage()
          this.state.user = data[0]
        this.state.userInfo[this.state.user.id] = {}
        this.state.userInfo[this.state.user.id].name = this.state.user.name
        this.state.userInfo[this.state.user.id].avatar = this.state.user.avatar
        this.state.userInfo[this.state.user.id].isAdmin = this.state.user.isAdmin
				this.state.refreshAvatar = true
        this.state.loaded = true
        if(this.state.playall && this.state.search.string == '') {
          if(this.state.mode == 'u') this.playNextTrack()
        }
      })
    },
    loadTrack(trackID){
      this.state.curTrack = trackID
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
				this.fetchUserData(data.userID)
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
      document.cookie = 'autoplay=' + this.state.playall + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
      document.cookie = 'showControls=' + this.state.showControls + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
      document.cookie = 'exactSearch=' + this.state.search.exact + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
      document.cookie = 'allWords=' + this.state.search.allWords + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
    },
    checkEnabled(){
      if(this.state.loggedinUserName) {
        let sendData = {
          userName: this.state.loggedinUserName, passhash: this.state.passhash,
        }
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
						this.state.maxResultsPerPage = +data[4]
            this.state.playall = !!(+data[5])
            this.state.shuffle = !!(+data[6])
						this.state.disco = !!(+data[7])
          }else{
            this.state.loggedin = false
            this.state.loggedinUserName = ''
            this.state.loggedinUserID = ''
            this.state.passhash = ''
            this.state.isAdmin = false
            this.state.invalidLoginAttempt = true
          }
          this.getMode()
        })
      }
    },
    checkAutoplayPref(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='autoplay')
      if(l.length) this.state.playall = l[0].split('=')[1]=='true'
    },
    checkExactSearchPref(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='exactSearch')
      if(l.length) this.state.search.exact = l[0].split('=')[1]=='true'
      l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='allWords')
      if(l.length) this.state.search.allWords = l[0].split('=')[1]=='true'
    },
    getMode(){
      let vars = window.location.pathname.split('/').filter(v=>v)
      if(vars.length>0){
        switch(vars[0]){
          case 'track':
            this.state.mode = 'track'
            this.state.curPage = (+vars[1])-1
            this.$nextTick(()=>this.loadTrack(this.alphaToDec(vars[1])))
            if(vars[2]){
              this.state.search.string = decodeURIComponent(vars[2])
            }
            break
          case 'playlist':
            this.state.mode = 'playlist'
            break
          case 'u':
            if(!vars[1]) window.location.href = window.location.origin
            this.state.user = {name: decodeURIComponent(vars[1])}
            this.state.mode = 'u'
            if(vars[2]){
              this.state.curUserPage = (+vars[2])-1
              if(vars[3]){
                this.state.search.string = decodeURIComponent(vars[3])
                search = '/' + vars[3]
                history.pushState(null,null,window.location.origin + '/u/' + encodeURIComponent(this.state.user.name) + '/' + (this.state.curPage + 1)) + search
                this.beginSearch()
              }else{
                if(!this.state.curUserPage || this.state.curUserPage < 0 || this.state.curUserPage > 1e6) this.state.curUserPage = 0
                history.pushState(null,null,window.location.origin + '/u/' + encodeURIComponent(vars[1]) + ((this.state.curUserPage) ? '/' + (this.state.curUserPage + 1) : ''))
                this.getPages()
              }
            } else {
              this.state.curUserPage = 0
              history.pushState(null,null,window.location.origin + '/u/' + encodeURIComponent(vars[1]) + ((this.state.curUserPage) ? '/' + (this.state.curUserPage + 1) : ''))
              this.getPages()
            }
          break
          default:
            this.state.mode = 'default'
            let search = ''
            if(vars[0]){
              this.state.curPage = (+vars[0])-1
              if(vars[1]){
                this.state.search.string = decodeURIComponent(vars[1])
                search = '/' + vars[1]
                history.pushState(null,null,window.location.origin + '/' + (this.state.curPage + 1)) + search
                this.beginSearch()
              }else{
                history.pushState(null,null,window.location.origin + '/' + this.state.curPage ? (this.state.curPage + 1) : '')
                if(!this.state.curPage || this.state.curPage < 0 || this.state.curPage > 1e6) this.state.curPage = 0
                this.getPages()
              }
            }else{
              window.location.href = window.location.origin
            }
          break
        }
      }else{
        this.state.mode = 'default'
        this.getPages()
				if(window.location.href !== window.location.origin + '/') window.location.href = window.location.origin
      }
    },
		getPages(){
			switch(this.state.mode){
				case 'u':
				this.loadUserData(this.state.user.name)
				break
				case 'track':
				this.loadTrack()
				break
				case 'default':
				this.loadLandingPage()
				break
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
        if(data[0]){
          this.state.loggedin = true
          this.state.loggedinUserName = this.state.username
          this.state.loggedinUserID = +data[2]
          this.state.isAdmin = +data[4]
          this.state.playall = !!(+data[5])
          this.state.shuffle = !!(+data[6])
					this.state.disco = !!(+data[7])
          this.state.passhash = data[1]
          this.setCookie()
          this.closePrompts()
          this.state.invalidLoginAttemp = false
          this.state.userInfo[this.state.loggedinUserID] = {}
          this.state.userInfo[this.state.loggedinUserID].name = this.state.regusername || this.state.loggedinUserName
          this.state.userInfo[this.state.loggedinUserID].avatar = data[3]
          this.state.userInfo[this.state.loggedinUserID].isAdmin = +data[4]
          this.checkShowControlsPref()
          this.checkExactSearchPref()
          sendData = {
            userID: this.state.loggedinUserID,
            page: this.state.curUserPage,
		        maxResultsPerPage: this.state.maxResultsPerPage
          }
          fetch(this.state.baseURL + '/fetchUserData.php',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
          }).then(res=>res.json()).then(data=>{
            window.location.reload()
          })
          this.$nextTick(()=>this.loadUserData(this.state.user.name))
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
        if(v.indexOf('autoplay')==-1){
          document.cookie = v + '; expires=' + (new Date(0)).toUTCString() + '; path=/; domain=' + this.state.rootDomain
        }
      })
      this.state.loggedin = false
      this.state.isAdmin = false
      if(this.state.mode = 'u'){
        window.location.reload()
      }
      this.state.loggedinUserID = this.state.loggedinUserName = ''
      this.$nextTick(()=>this.loadUserData(this.state.user.name))
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
        this.getMode() 
      }
      this.checkAutoplayPref()
      this.checkShowControlsPref()
      this.checkExactSearchPref()
    },
    checkShowControlsPref(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='showControls')
      if(l.length) this.state.showControls = l[0].split('=')[1]=='true'
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
        if(this.state.search.string){
          if(this.state.search.audiocloudTracks.filter(v=>v.id==id).length) this.state.search.audiocloudTracks.filter(v=>v.id==id)[0].views++
        }else{
          switch(this.state.mode){
            case 'u': this.state.user.audiocloudTracks.filter(v=>v.id==id)[0].views++; break
            case 'default': if(this.state.landingPage.audiocloudTracks.filter(v=>v.id==id).length) this.state.landingPage.audiocloudTracks.filter(v=>v.id==id)[0].views++; break
            case 'track': this.state.tracks.filter(v=>v.id==id)[0].views++; break
          }
        }
      })
    },
    firstPage(){
      let search = this.state.search.string ? ('/1/' + encodeURIComponent(this.state.search.string)) : ''
      switch(this.state.mode){
        case 'u':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + search
        break
        case 'default':
          window.location.href = window.location.origin + search
        break
        case 'track':
          window.location.href = window.location.origin + '/track/' + this.state.curTrack + search
        break
      }
    },
		jumpToPage(pageNo){
      let search = this.state.search.string ? ('/' + encodeURIComponent(this.state.search.string)) : ''
			switch(this.state.mode){
			  case 'u':
				window.location.href = window.location.origin + '/u/' + this.user.name + '/' + pageNo + search
				break
				case 'default':
        window.location.href = window.location.origin + '/' + pageNo + search
				break
				case 'track':
        window.location.href = window.location.origin + '/track/' + this.decToAlpha(this.state.curTrack) + '/' + pageNo + search
				break
			}
		},
    lastPage(){
      let search = this.state.search.string ? ('/' + encodeURIComponent(this.state.search.string)) : ''
      switch(this.state.mode){
        case 'u':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + '/' + this.state.totalUserPages + search
        break
        case 'default':
          window.location.href = window.location.origin + '/' + this.state.totalPages + search
        break
        case 'track':
          window.location.href = window.location.origin + '/track/' + this.decToAlpha(this.state.curTrack) + '/' + this.state.totalPages + search
        break
      }
    },
    advancePage(){
      let search = this.state.search.string ? ('/' + encodeURIComponent(this.state.search.string)) : ''
      switch(this.state.mode){
        case 'u':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + '/' + (this.state.curUserPage + 2) + search
        break
        case 'default':
          window.location.href = window.location.origin + '/' + (this.state.curPage + 2) + search
        break
        case 'track':
          window.location.href = window.location.origin + '/track/' + this.decToAlpha(this.state.curTrack) + '/' +(this.state.curPage + 2) + search
        break
      }
    },
    regressPage(){
      let search = this.state.search.string ? ('/' + encodeURIComponent(this.state.search.string)) : ''
      switch(this.state.mode){
        case 'u':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + '/' + this.state.curUserPage + search
        break
        case 'default':
          window.location.href = window.location.origin + '/' + this.state.curPage + search
        break
        case 'track':
          window.location.href = window.location.origin + '/track/' + this.decToAlpha(this.state.curTrack) + '/' +(this.state.curPage + 2) + search
        break
      }
    },
		playNextTrack(){
			let curplayId
			let curplayIdx
			if(this.currentPlayingTracks.length){
				curplayId = this.currentPlayingTracks[0].id
				curplayIdx = this.currentPlayingTracks[0].idx
				this.currentPlayingTracks[0].mp3.currentTime = 0
				this.currentPlayingTracks[0].playing = false
      } else {
				curplayId = -1
			}
			
      if(this.state.search.string){
        if(this.state.search.audiocloudTracks.length) {				
          if(curplayId == -1){
            if(this.state.shuffle){
              let idx
              this.state.search.audiocloudTracks[idx = Math.random()*this.state.search.audiocloudTracks.length|0].playing = true
              this.state.search.audiocloudTracks[idx].jump++
            }else{
              this.state.search.audiocloudTracks[0].playing = true
              this.state.search.audiocloudTracks[0].jump++
            }
          } else {
            this.state.search.audiocloudTracks.map((v, i)=>{
              if(v.id == curplayId){
                if(this.state.shuffle){
                  let idx
                  while((idx = Math.random()*this.state.search.audiocloudTracks.length|0) == curplayIdx && this.state.search.audiocloudTracks.length > 1);
                  this.state.search.audiocloudTracks[idx].playing = true
                  this.state.search.audiocloudTracks[idx].jump++
                }else{
                  if(i < this.state.search.audiocloudTracks.length-1){
                    this.state.search.audiocloudTracks[i+1].playing = true
                    this.state.search.audiocloudTracks[i+1].jump++
                  } else {
                    this.state.search.audiocloudTracks[0].playing = true
                    this.state.search.audiocloudTracks[0].jump++
                  }
                }
              }
            })
          }
        }
      }else{
        switch(this.state.mode){
          case 'u':
            if(this.filteredUserTracks.length) {				
              if(curplayId == -1){
                if(this.state.shuffle){
                  let idx
                  this.filteredUserTracks[idx = Math.random()*this.filteredUserTracks.length|0].playing = true
                  this.filteredUserTracks[idx].jump++
                }else{
                  this.filteredUserTracks[0].playing = true
                  this.filteredUserTracks[0].jump++
                }
              } else {
                this.filteredUserTracks.map((v, i)=>{
                  if(v.id == curplayId){
                    if(this.state.shuffle){
                      let idx
                      while((idx = Math.random()*this.filteredUserTracks.length|0) == curplayIdx && this.filteredUserTracks.length > 1);
                      this.filteredUserTracks[idx].playing = true
                      this.filteredUserTracks[idx].jump++
                    }else{
                      if(i < this.filteredUserTracks.length-1){
                        this.filteredUserTracks[i+1].playing = true
                        this.filteredUserTracks[i+1].jump++
                      } else {
                        this.filteredUserTracks[0].playing = true
                        this.filteredUserTracks[0].jump++
                      }
                    }
                  }
                })
              }
            }
          break
          case 'track':
            this.state.tracks[0].playing=true
          break
          case 'default':
            if(this.state.landingPage.audiocloudTracks.length) {
              if(curplayId == -1){
                if(this.state.shuffle){
                  let idx
                  this.state.landingPage.audiocloudTracks[idx = Math.random()*this.state.landingPage.audiocloudTracks.length|0].playing = true
                  this.state.landingPage.audiocloudTracks[idx].jump++
                }else{
                  this.state.landingPage.audiocloudTracks[0].playing = true
                  this.state.landingPage.audiocloudTracks[0].jump++
                }
              } else {
                this.state.landingPage.audiocloudTracks.map((v, i)=>{
                  if(v.id == curplayId){
                    if(this.state.shuffle){
                      let idx
                      while((idx = Math.random()*this.state.landingPage.audiocloudTracks.length|0) == curplayIdx && this.state.landingPage.audiocloudTracks.length > 1);
                      this.state.landingPage.audiocloudTracks[idx].playing = true
                      this.state.landingPage.audiocloudTracks[idx].jump++
                    }else{
                      if(i < this.state.landingPage.audiocloudTracks.length-1){
                        this.state.landingPage.audiocloudTracks[i+1].playing = true
                        this.state.landingPage.audiocloudTracks[i+1].jump++
                      } else {
                        this.state.landingPage.audiocloudTracks[0].playing = true
                        this.state.landingPage.audiocloudTracks[0].jump++
                      }
                    }
                  }
                })
              }
            }
          break
        }
      }
		},
		playPauseCurrentTrack(){
      if(!this.state.curPlayId) this.playNextTrack()
      let el
      if(this.state.search.string){
        el = this.state.search.audiocloudTracks.filter(v=>v.id==this.state.curPlayId)[0]
        if(typeof el != 'undefined') el.playing = !el.playing
      } else {
        switch(this.state.mode){
          case 'u':
            el = this.state.user.audiocloudTracks.filter(v=>v.id==this.state.curPlayId)[0]
            if(typeof el != 'undefined') el.playing = !el.playing
          break
          case 'track':
            el = this.state.tracks.audiocloudTracks.filter(v=>v.id==this.state.curPlayId)[0]
            if(typeof el != 'undefined') el.playing = !el.playing
          break
          case 'default':
            el = this.state.landingPage.audiocloudTracks.filter(v=>v.id==this.state.curPlayId)[0]
            if(typeof el != 'undefined') el.playing = !el.playing
          break
        }
      }
		},
		playPreviousTrack(){
			let curplayId
			let curplayIdx
			if(this.currentPlayingTracks.length){
				curplayId = this.currentPlayingTracks[0].id
				curplayIdx = this.currentPlayingTracks[0].idx
				this.currentPlayingTracks[0].mp3.currentTime = 0
				this.currentPlayingTracks[0].playing = false
      } else {
				curplayId = -1
			}
			
      if(this.state.search.string){
        if(this.state.search.audiocloudTracks.length) {				
          if(curplayId == -1){
            if(this.state.shuffle){
              let idx
              this.state.search.audiocloudTracks[idx = Math.random()*this.state.search.audiocloudTracks.length|0].playing = true
              this.state.search.audiocloudTracks[idx].jump++
            }else{
              this.state.search.audiocloudTracks[0].playing = true
              this.state.search.audiocloudTracks[0].jump++
            }
          } else {
            this.state.search.audiocloudTracks.map((v, i)=>{
              if(v.id == curplayId){
                if(this.state.shuffle){
                  let idx
                  while((idx = Math.random()*this.state.search.audiocloudTracks.length|0) == curplayIdx && this.state.search.audiocloudTracks.length > 1);
                  this.state.search.audiocloudTracks[idx].playing = true
                  this.state.search.audiocloudTracks[idx].jump++
                }else{
                  if(i){
                    this.state.search.audiocloudTracks[i-1].playing = true
                    this.state.search.audiocloudTracks[i-1].jump++
                  } else {
                    this.state.search.audiocloudTracks[this.state.search.audiocloudTracks.length-1].playing = true
                    this.state.search.audiocloudTracks[this.state.search.audiocloudTracks.length-1].jump++
                  }
                }
              }
            })
          }
        }
      }else{
        switch(this.state.mode){
          case 'u':
            if(this.filteredUserTracks.length) {				
              if(curplayId == -1){
                if(this.state.shuffle){
                  let idx
                  this.filteredUserTracks[idx = Math.random()*this.filteredUserTracks.length|0].playing = true
                  this.filteredUserTracks[idx].jump++
                }else{
                  this.filteredUserTracks[0].playing = true
                  this.filteredUserTracks[0].jump++
                }
              } else {
                this.filteredUserTracks.map((v, i)=>{
                  if(v.id == curplayId){
                    if(this.state.shuffle){
                      let idx
                      while((idx = Math.random()*this.filteredUserTracks.length|0) == curplayIdx && this.filteredUserTracks.length > 1);
                      this.filteredUserTracks[idx].playing = true
                      this.filteredUserTracks[idx].jump++
                    }else{
                      if(i){
                        this.filteredUserTracks[i-1].playing = true
                        this.filteredUserTracks[i-1].jump++
                      } else {
                        this.filteredUserTracks[this.filteredUserTracks.length-1].playing = true
                        this.filteredUserTracks[this.filteredUserTracks.length-1].jump++
                      }
                    }
                  }
                })
              }
            }
          break
          case 'track':
            this.state.tracks[0].playing=true
          break
          case 'default':
            if(this.state.landingPage.audiocloudTracks.length) {
              if(curplayId == -1){
                if(this.state.shuffle){
                  let idx
                  this.state.landingPage.audiocloudTracks[idx = Math.random()*this.state.landingPage.audiocloudTracks.length|0].playing = true
                  this.state.landingPage.audiocloudTracks[idx].jump++
                }else{
                  this.state.landingPage.audiocloudTracks[0].playing = true
                  this.state.landingPage.audiocloudTracks[0].jump++
                }
              } else {
                this.state.landingPage.audiocloudTracks.map((v, i)=>{
                  if(v.id == curplayId){
                    if(this.state.shuffle){
                      let idx
                      while((idx = Math.random()*this.state.landingPage.audiocloudTracks.length|0) == curplayIdx && this.state.landingPage.audiocloudTracks.length > 1);
                      this.state.landingPage.audiocloudTracks[idx].playing = true
                      this.state.landingPage.audiocloudTracks[idx].jump++
                    }else{
                      if(i){
                        this.state.landingPage.audiocloudTracks[i-1].playing = true
                        this.state.landingPage.audiocloudTracks[i-1].jump++
                      } else {
                        this.state.landingPage.audiocloudTracks[this.state.landingPage.audiocloudTracks.length-1].playing = true
                        this.state.landingPage.audiocloudTracks[this.state.landingPage.audiocloudTracks.length-1].jump++
                      }
                    }
                  }
                })
              }
            }
          break
        }
      }
		},
    doSearch(searchString, page1){
      this.state.search.audiocloudTracks = []
      this.state.search.timerHandle = null
      let sendData = {
        string: searchString.trim(),
        loggedinUserName: this.state.loggedinUserName,
        page: this.state.curPage,
        allWords: this.state.search.allWords,
        exact: this.state.search.exact,
        passhash: this.state.passhash,
        maxResultsPerPage: this.state.maxResultsPerPage
      }
      console.log(sendData)
      this.state.exactClicked = true
      fetch(this.state.baseURL + '/search.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data[0] = data[0].map(v=>{
          v.playing = false
          v.private = !!(+v.private)
          v.allowDownload = !!(+v.allowDownload)
          this.state.incrementViews(v.id)
          this.state.loadUserData(v.author)
          v.comments = v.comments.map(q=>{
            q.updated = false
            q.editing = false
            this.state.fetchUserData(q.userID)
            return q
          })
          return v
        })
        if(this.state.search.string) this.state.search.hits = +data[3]
        this.state.search.audiocloudTracks = data[0]
        switch(this.state.mode){
          case 'u':
            this.state.totalUserPages = +data[1]
            if(this.state.curUserPage && this.state.curUserPage+1 > this.state.totalUserPages) this.lastPage()
          break
          case 'default':
            this.state.totalPages = +data[1]
            if(this.state.curPage && this.state.curPage+1 > this.state.totalPages) this.lastPage()
          break
          case 'track':
            this.state.totalPages = +data[1]
            if(this.state.curPage && this.state.curPage+1 > this.state.totalPages) this.lastPage()
          break
        }
        this.state.loaded = true
        if(this.state.playall) {
          this.playNextTrack()
        }
        this.state.search.inProgress = false
      })
    },
    beginSearch(page1){
      if(this.state.search.string.charAt(0) != ' '){
				//this.state.search.string = this.state.search.string.trim()
        this.state.search.inProgress = true
        if(page1){
          history.pushState(null, null, window.location.origin + '/' + 1 + (this.state.search.string ? '/' : '') + encodeURIComponent(this.state.search.string))
          this.state.curPage = 0
        } else {
          history.pushState(null, null, window.location.origin + '/' + (this.state.curPage+1) + '/' + encodeURIComponent(this.state.search.string))
        }
        let d = (new Date()).getTime()
        if(this.state.search.timerHandle != null) clearTimeout(this.state.search.timerHandle)
        let searchString = this.state.search.string
        this.state.search.timerHandle = setTimeout(()=>{
          this.doSearch(searchString, page1)
          this.state.search.timer = d
        }, Math.min(1000, d-this.state.search.timer))
      } else {
				this.state.search.string = this.state.search.string.trim()
			}
    },
    loadHotKeys(){
      window.addEventListener('keydown',(e)=>{
        if(e.keyCode == 27){
          e.preventDefault()
          e.stopPropagation()
          this.state.toggleShowControls()
        }
        if(e.keyCode == 13){
          e.preventDefault()
          e.stopPropagation()
          this.state.jumpToPlayingTrack()
        }
        if(e.keyCode == 37){
          e.preventDefault()
          e.stopPropagation()
          let cpt = this.currentPlayingTracks
          if(e.shiftKey){
            let el
            if((el=this.currentPlayingTracks).length)el[0].mp3.currentTime = Math.max(0, el[0].mp3.currentTime - 10)
          }else{
            if(cpt.length && cpt[0].mp3.currentTime>cpt[0].mp3.duration/20){
              cpt[0].mp3.currentTime = 0
            } else {
              this.state.playPreviousTrack()
            }
          }
        }
        if(e.keyCode == 39){
          e.preventDefault()
          e.stopPropagation()
          console.log(e)
          if(e.shiftKey){
            let el
            if((el=this.currentPlayingTracks).length)el[0].mp3.currentTime = Math.min(el[0].mp3.duration, el[0].mp3.currentTime + 10)
          }else{
            this.state.playNextTrack()
          }
        }
        if(e.keyCode == 32){
          if(document.activeElement.id != 'searchInput'){
            e.preventDefault()
            e.stopPropagation()
            this.state.playPauseCurrentTrack()
          }
        }
      })
    },
		jumpToPlayingTrack(){
			let l
      if((l=this.state.currentTrack()).length){
				l[0].jump++
			}
		},    
		currentTrack(){
      if(this.state.search.string){
        return this.state.search.audiocloudTracks.filter(v=>v.playing)
      }else{
        switch(this.state.mode){
          case 'u':
            return this.filteredUserTracks.filter(v=>v.playing)
          break
          case 'track':
            return this.state.tracks.filter(v=>v.playing)
          break
          case 'default':
            return this.state.landingPage.audiocloudTracks.filter(v=>v.playing)
          break
        }
      }
		},
  },
	computed:{
		currentPlayingTracks(){
      if(this.state.search.string){
        this.state.search.audiocloudTracks = this.state.search.audiocloudTracks.map((v, i)=>{v.idx = i; return v})
        if(this.state.search.audiocloudTracks.filter(v=>v.playing).length) this.state.curPlayId = this.state.search.audiocloudTracks.filter(v=>v.playing)[0].id
        return this.state.search.audiocloudTracks.filter(v=>v.playing)
      } else {
        switch(this.state.mode){
          case 'u':
            this.state.user.audiocloudTracks = this.state.user.audiocloudTracks.map((v, i)=>{v.idx = i; return v})
            if(this.filteredUserTracks.filter(v=>v.playing).length) this.state.curPlayId = this.filteredUserTracks.filter(v=>v.playing)[0].id
            return this.filteredUserTracks.filter(v=>v.playing)
          break
          case 'track':
            //this.state.tracks.map((v, i)=>{v.idx = i})
            if(this.state.tracks.filter(v=>v.playing).length) this.state.curPlayId = this.state.tracks.filter(v=>v.playing)[0].id
            return this.state.tracks.filter(v=>v.playing)
          break
          case 'default':
            this.state.landingPage.audiocloudTracks = this.state.landingPage.audiocloudTracks.map((v, i)=> {v.idx = i; return v})
            if(this.state.landingPage.audiocloudTracks.filter(v=>v.playing).length) this.state.curPlayId = this.state.landingPage.audiocloudTracks.filter(v=>v.playing)[0].id
            return this.state.landingPage.audiocloudTracks.filter(v=>v.playing)
          break
        }
      }
		},
    filteredUserTracks(){
      if(this.state.user != null && typeof this.state.user.audiocloudTracks !== 'undefined'){
        return this.state.user.audiocloudTracks.filter(v=>!v.private || this.state.loggedinUserName.toUpperCase() == this.state.user.name.toUpperCase() || this.state.isAdmin)
      } else {
        return []
      }
    },
	},
  watch:{
    'state.search.string'(val){
      if(!val) this.state.search.hits = 0
    },
    'state.search.exact'(val){
      document.cookie = 'exactSearch=' + this.state.search.exact + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
    },
    'state.search.allWords'(val){
      document.cookie = 'allWords=' + this.state.search.allWords + '; expires=' + (new Date((Date.now()+3153600000000))).toUTCString() + '; path=/; domain=' + this.state.rootDomain
    },
    'state.shuffle'(val){
    },
    'state.playall'(val){
      if(val){
        if(this.state.loaded) this.playNextTrack()
			} else {
				this.state.pauseVisible()
			}
    },
    'state.showUploadModal'(val){
      if(val){
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
      } else {
        document.getElementsByTagName('html')[0].style.overflow = 'initial'
      }
    }
  },
  mounted(){
    this.loadHotKeys()
    setInterval(()=>{
      this.state.globalT+=1/60
    },1/60*1000|0)
		this.state.userAgent = navigator.userAgent
    this.state.playPauseCurrentTrack = this.playPauseCurrentTrack
    this.state.toggleShowControls = this.toggleShowControls
    this.state.filteredUserTracks = this.filteredUserTracks
    this.state.jumpToPlayingTrack = this.jumpToPlayingTrack
		this.state.playPreviousTrack = this.playPreviousTrack
    this.state.showUserSettings = this.showUserSettings
    this.state.showLoginPrompt = this.showLoginPrompt
    this.state.incrementViews = this.incrementViews
    this.state.openFullscreen = this.openFullscreen
    this.state.fetchUserData = this.fetchUserData
		this.state.playNextTrack = this.playNextTrack
    this.state.closePrompts = this.closePrompts
    this.state.pauseVisible = this.pauseVisible
    this.state.loadUserData = this.loadUserData
    this.state.checkEnabled = this.checkEnabled
    this.state.currentTrack = this.currentTrack
    this.state.advancePage = this.advancePage
		this.state.beginSearch = this.beginSearch
		this.state.regressPage = this.regressPage
    this.state.toggleLogin = this.toggleLogin
		this.state.jumpToPage = this.jumpToPage
    this.state.decToAlpha = this.decToAlpha
    this.state.alphaToDec = this.alphaToDec
    this.state.firstPage = this.firstPage
    this.state.setCookie = this.setCookie
    this.state.getAvatar = this.getAvatar
    this.state.lastPage = this.lastPage
    this.state.goHome = this.goHome
    this.state.logout = this.logout
    this.state.login = this.login
    this.checkLogin()
		let startTime = (new Date()).getTime()
		setInterval(()=>{
			if(this.state.disco){
				let t = ((new Date()).getTime() - startTime)/10+200
  			document.getElementsByTagName('body')[0].style.backgroundColor = `hsla(${t}, 99%, 3%, 1)`
        document.getElementById('header').style.background = `linear-gradient(90deg, hsla(${t}, 99%, 1%, .9), hsla(${t}, 60%, 15%, .8)`
        document.getElementById('footerBar').style.background = `linear-gradient(90deg, hsla(${t}, 99%, 1%, 1), hsla(${t}, 60%, 5%, .7)`
			}
		}, 100)

    this.preloadImages = [
      'https://lookie.jsbot.net/uploads/2ftyk1.png',
      'https://lookie.jsbot.net/uploads/BGNlv.png',
      'https://lookie.jsbot.net/uploads/FU3vq.png',
      'https://lookie.jsbot.net/uploads/zAYeB.png',
      'https://lookie.jsbot.net/uploads/XeGsK.png',
      'https://lookie.jsbot.net/uploads/XeGsK.png',
      'https://lookie.jsbot.net/uploads/ct1hv.png',
      'https://lookie.jsbot.net/uploads/2kPCX5.png',
      'https://lookie.jsbot.net/uploads/14MAyj.png',
      'https://lookie.jsbot.net/uploads/20SIWe.png',
      'https://lookie.jsbot.net/uploads/6aevA.png',
			'https://lookie.jsbot.net/uploads/1RptlQ.png',
			'https://lookie.jsbot.net/uploads/v9UDT.png',
			'https://lookie.jsbot.net/uploads/1tgOjR.png'
	  ]
		this.preloadImages.map(v=>{
			let img = new Image()
      img.src = v
			return v
    })
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
#app{
  min-width: 475px;
}
html{
  margin: 0;
  overflow-X: hidden;
  font-family: Play;
  color: #8fc;
  min-height: 100%;
  min-width: 475px;
  scroll-behavior: smooth;
}
body{
  margin: 0;
  overflow-X: hidden;
  background: #011;
  font-family: Play;
  color: #8fc;
  min-height: 100%;
  min-width: 475px;
}
input[type=text]{
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
  outline: none;
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
a{
  color: #fa0;
  text-decoration: none;
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
option{
  text-align: center;
}
select{
  background: #012;
	color: #ff0;
}
select:focus{
  outline: none;
}
button:focus{
  outline: none;
}
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #133; 
}
 
::-webkit-scrollbar-thumb {
  background: #366; 
}

::-webkit-scrollbar-thumb:hover {
  background: #588; 
}
</style>
