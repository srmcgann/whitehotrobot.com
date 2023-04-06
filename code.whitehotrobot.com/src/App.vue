<template>
  <div id="app">
    <Controls :state="state"/>
    <Header :state="state"/>
    <Main :state="state"/>
    <UserSettings v-if="state.userSettingsVisible" :state="state"/>
    <LoginPrompt v-if="state.loginPromptVisible" :state="state"/>
    <Footer :state="state"/>
  </div>
</template>

<script>
import Main from './components/Main'
import LoginPrompt from './components/LoginPrompt'
import Controls from './components/Controls'
import UserSettings from './components/UserSettings'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Main,
    Header,
    Controls,
    UserSettings,
    Footer,
    LoginPrompt
  },
  data(){
    return {
      state: {
        baseURL: 'https://code.dweet.net',
        baseDemoURL: 'https://demo.dweet.net',
        rootDomain: 'code.dweet.net',
        demos: [],
        loggedin: false,
        toggleLogin: null,
        globalT: 0,
        showLoginPrompt: null,
        userAgent: null,
        toggleShowForkHistory: null,
        closePrompts: null,
        loginPromptVisible: false,
        username: '',
        password: '',
        passhash: '',
        userInfo: [],
        userData: [],
        updateDemoItem: null,
        regusername: '',
        loadUserData: null,
        regpassword: '',
        showRegister: false,
        showUserSettings: null,
        userSettingsVisible: false,
        getAvatar: null,
        autoplay: false,
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
        showControls: false,
        toggleShowControls: null,
        logout: null,
        login: null,
        mode: 'default', // default, user, single
        viewAuthor: '',
        isAdmin: false,
        goHome: null,
        //viewDemo: '',
        rawDemoID: '',
        fetchUserData: null,
        error404: false,
        extractEmbedURL: null,
        openFullscreen: null,
        invalidLoginAttempt: false,
        defaultAvatar: 'https://jsbot.cantelope.org/uploads/1pnBdc.png',
        inView:[],
        maxCommentsBeforeExpansion: 3,
        curPage: 0,
        beginSearch: null,
        curSearchPage: 0,
        totalPages: 0,
        jumpToPage: null,
        curUserPage: null,
        search: {
          string: '',
          demos: [],
          hits: 0,
          inProgress: false,
          timer: 0,
          timerHandle: null,
          exact: false,
          allWords: true
        },
        showControlsToggleTimer: 0,
        loadDemoFromBackup: null,
        maxResultsPerPage: 0,
        advancePage: null,
        regressPage: null,
        firstPage: null,
        lastPage: null,
        landingPage:{
          demos: []
        },
        closeMenus: 0
      }
    }
  },
  methods:{
    fetchUserData(id){
      if(1||typeof this.state.userData[id] == 'undefined'){
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
    loadHotKeys(){
      window.addEventListener('click',e=>{
        let close = true
        let path = e.path || (e.composedPath && e.composedPath())
        path.forEach(v=>{
          if(v.className && (v.className.indexOf('revertMenu')!==-1 || v.className.indexOf('revertButton')!==-1)) close = false
        })
        if(close) this.state.closeMenus++
      })
      window.addEventListener('click',e=>{
        let close = true
        let path = e.path || (e.composedPath && e.composedPath())
        path.forEach(v=>{
          if(v.className && (v.className.indexOf('revertMenu')!==-1 || v.className.indexOf('revertButton')!==-1)) close = false
        })
        if(close) this.state.closeMenus++
      })
      window.addEventListener('keydown',(e)=>{
        if(e.keyCode == 27){
          if(this.state.showControlsToggleTimer < (new Date()).getTime()){
            this.state.showControlsToggleTimer = (new Date()).getTime()+100
            e.preventDefault()
            e.stopPropagation()
            this.toggleShowControls()
          }
        }
        if(e.keyCode == 13){
        }
      })
    },
    extractEmbedURL(item){
      if(typeof item.id == 'undefined' ) return
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
    doSearch(searchString, page1){
      this.state.search.demos = []
      this.state.search.timerHandle = null
      let sendData = {
        string: searchString.trim(),
        loggedinUserName: this.state.loggedinUserName,
        page: this.state.curPage,
        allWords: this.state.search.allWords,
        exact: this.state.search.exact,
        passhash: this.state.loggedin ? this.state.passhash : '',
        maxResultsPerPage: this.state.maxResultsPerPage
      }
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
        data[0].map(v=>{
          v.updated = {}
          for (const [key, value] of Object.entries(v)) {
            v.updated[key]=0
          }
          v.editHTML = false
          v.private = !!(+v.private)
          v.allowDownload = !!(+v.allowDownload)
          this.state.incrementViews(v.id)
          this.state.loadUserData(v.author)
          v.userID = +v.userID
          v.comments = v.comments.map(q=>{
            q.updated = false
            q.editing = false
            this.state.fetchUserData(q.userID)
            return q
          })
          v.iteration = 0
          this.extractEmbedURL(v)
          return v
        })
        if(this.state.search.string) this.state.search.hits = +data[3]
        this.state.search.demos = data[0]
        switch(this.state.mode){
          case 'user':
            this.state.totalUserPages = +data[1]
            if(this.state.curUserPage && this.state.curUserPage+1 > this.state.totalUserPages) this.lastPage()
          break
          case 'default':
            this.state.totalPages = +data[1]
            if(this.state.curPage && this.state.curPage+1 > this.state.totalPages) this.lastPage()
          break
          case 'single':
            this.state.totalPages = +data[1]
            if(this.state.curPage && this.state.curPage+1 > this.state.totalPages) this.lastPage()
          break
        }
        this.state.loaded = true
        this.state.search.inProgress = false
      })
    },
    beginSearch(page1){
      if(this.state.search.string.charAt(0) != ' '){
        this.state.search.inProgress = true
        if(page1){
          history.pushState(null, null, window.location.origin + '/' + 1 + (this.state.search.string ? '/' : '') + (this.state.search.string))
          this.state.curPage = 0
        } else {
          history.pushState(null, null, window.location.origin + '/' + (this.state.curPage+1) + '/' + (this.state.search.string))
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
    getMode(){
      let vars = window.location.pathname.split('/').filter(v=>v)
      if(vars.length>0){
        switch(vars[0]){
          case 'd':
            this.state.mode = 'single'
            this.state.curPage = (+vars[1])-1
            //this.state.viewDemo = this.alphaToDec(vars[1])
            this.state.rawDemoID = vars[1]
            this.$nextTick(()=>this.loadDemo(this.alphaToDec(vars[1])))
            if(vars[2]){
              this.state.search.string = decodeURIComponent(vars[2])
            }
            break
          case 'u':
            if(!vars[1]) window.location.href = window.location.origin
            this.state.viewAuthor = decodeURIComponent(vars[1]);
            this.state.user = {name: decodeURIComponent(vars[1])}
            this.state.mode = 'user'
            if(vars[2]){
              this.state.curUserPage = (+vars[2])-1
              if(vars[3]){
                this.state.search.string = decodeURIComponent(vars[3])
                search = '/' + vars[3]
                history.pushState(null,null,window.location.origin + '/u/' + (this.state.user.name) + '/' + (this.state.curPage + 1)) + search
                this.beginSearch()
              }else{
                if(!this.state.curUserPage || this.state.curUserPage < 0 || this.state.curUserPage > 1e6) this.state.curUserPage = 0
                history.pushState(null,null,window.location.origin + '/u/' + (vars[1]) + ((this.state.curUserPage) ? '/' + (this.state.curUserPage + 1) : ''))
                this.getPages()
              }
            } else {
              this.state.curUserPage = 0
              history.pushState(null,null,window.location.origin + '/u/' + (vars[1]) + ((this.state.curUserPage) ? '/' + (this.state.curUserPage + 1) : ''))
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
        if(this.state.search.string){
          if(this.state.search.demos.filter(v=>v.id==id).length) this.state.search.demos.filter(v=>v.id==id)[0].views++
        }else{
          switch(this.state.mode){
            case 'user': this.state.user.demos.filter(v=>v.id==id)[0].views++; break
            case 'default': if(this.state.landingPage.demos.filter(v=>v.id==id).length) this.state.landingPage.demos.filter(v=>v.id==id)[0].views++; break
            case 'single': this.state.demos.filter(v=>v.id==id)[0].views++; break
          }
        }
      })
    },
    toggleShowForkHistory(item){
      this.$nextTick(()=>{
        if(item.showForkHistory){
          item.showForkHistory = false
          document.getElementsByTagName('html')[0].style.overflow = 'auto';
        } else {
          item.showForkHistory = true
          document.getElementsByTagName('html')[0].style.overflow = 'hidden';
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
        this.state.demoDataReceived = true
        if(this.state.user != null && typeof this.state.user.demos != 'undefined' && this.state.user.demos.length){
          data[0].demos = this.state.user.demos.map(v=>{
            if(typeof v != 'undefined'){
              v.updated = {}
              v.userID = +v.userID
              v.private = !!(v.private)
              v.iteration = 0
              v.allowDownload = !!(v.allowDownload)
              for (const [key, value] of Object.entries(data[0].demos)) {
                v.updated[key]=0
              }
            }
          })
        }else{
          data[0].demos.map(v=>{
            v.updated = {}
            for (const [key, value] of Object.entries(v)) {
              v.updated[key]=0
            }
            if(this.state.mode != 'default') this.incrementViews(v.id)
            v.editHTML = false
            v.userID = +v.userID
            v.iteration = 0
            v.private = !!(+v.private)
            v.allowDownload = !!(+v.allowDownload)
            v.comments = v.comments.map(q=>{
              q.updated = false
              q.editing = false
              this.fetchUserData(q.userID)
              return q
            })
            this.extractEmbedURL(v)
          })
          this.state.inView = Array(data[0].length).fill().map(v=>false)
        }
        this.state.totalUserPages = data[1]
        if(this.state.curUserPage+1 > this.state.totalUserPages) this.lastPage()
        this.state.user = data[0]
        this.state.maxResultsPerPage = this.state.user.demoPostsPerPage
        this.state.userInfo[this.state.user.id] = {}
        this.state.userInfo[this.state.user.id].name = this.state.user.name
        this.state.userInfo[this.state.user.id].avatar = this.state.user.avatar
        this.state.userInfo[this.state.user.id].isAdmin = this.state.user.isAdmin
        this.state.refreshAvatar = true
        this.state.loaded = true
      })
    },
    firstPage(){
      let search = this.state.search.string ? ('/1/' + (this.state.search.string)) : ''
      switch(this.state.mode){
        case 'user':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + search
        break
        case 'default':
          window.location.href = window.location.origin + search
        break
        case 'single':
          window.location.href = window.location.origin + '/d/' + this.state.curPost + search
        break
      }
    },
    lastPage(){
      let search = this.state.search.string ? ('/' + (this.state.search.string)) : ''
      switch(this.state.mode){
        case 'u':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + '/' + this.state.totalUserPages + search
        break
        case 'default':
          window.location.href = window.location.origin + '/' + this.state.totalPages + search
        break
        case 'post':
          window.location.href = window.location.origin + '/post/' + this.decToAlpha(this.state.curPost) + '/' + this.state.totalPages + search
        break
      }
    },
    advancePage(){
      let search = this.state.search.string ? ('/' + (this.state.search.string)) : ''
      switch(this.state.mode){
        case 'user':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + '/' + (this.state.curUserPage + 2) + search
        break
        case 'default':
          window.location.href = window.location.origin + '/' + (this.state.curPage + 2) + search
        break
        case 'single':
          window.location.href = window.location.origin + '/d/' + this.decToAlpha(this.state.curPost) + '/' +(this.state.curPage + 2) + search
        break
      }
    },
    regressPage(){
      let search = this.state.search.string ? ('/' + (this.state.search.string)) : ''
      switch(this.state.mode){
        case 'user':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + '/' + this.state.curUserPage + search
        break
        case 'default':
          window.location.href = window.location.origin + '/' + this.state.curPage + search
        break
        case 'single':
          window.location.href = window.location.origin + '/d/' + this.decToAlpha(this.state.curPost) + '/' +(this.state.curPage + 2) + search
        break
      }
    },
    loadDemo(demoID){
      this.state.curDemo = demoID
      let sendData = {
        userName: this.state.loggedinUserName,
        passhash: this.state.passhash,
        demoID
      }
      fetch(this.state.baseURL + '/fetchDemo.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
        if(data){
          this.state.demos=[data]
          this.state.viewDemo = data.id
          this.state.demos.map(v=>{
            v.updated = {}
            for (const [key, value] of Object.entries(v)) {
              v.updated[key]=0
            }
            v.iteration = 0
            v.private = !!(+v.private)
            this.extractEmbedURL(v)
            v.userID = +v.userID
            v.comments = v.comments.map(q=>{
              q.updated = false
              q.editing = false
              this.fetchUserData(q.userID)
              return q
            })
            v.videoPlaying = false
            v.play = false//this.state.autoplay
            v.show = true
            this.incrementViews(v.id)
            this.fetchUserData(v.userID)
          })
          this.state.inView = Array(this.state.demos.length).fill().map(v=>false)
        }else{
          console.log('404')
          this.state.error404 = true
        }
      })
    },
    getPages(){
      if(this.state.search.string != '') this.beginSearch()
      switch(this.state.mode){
        case 'user':
        this.loadUserData(this.state.user.name)
        break
        case 'single':
        this.loadDemo()
        break
        case 'default':
        this.loadLandingPage()
        break
      }
    },
    loadLandingPage(){
      let sendData = {
        page: this.state.curPage,
        maxResultsPerPage: this.state.maxResultsPerPage
      }
      fetch(this.state.baseURL + '/getRecentDemos.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
        this.state.demoDataReceived = true
        data[0].map(v=>{
          v.updated = {}
          for (const [key, value] of Object.entries(v)) {
            v.updated[key]=0
          }
          v.private = !!(+v.private)
          v.allowDownload = !!(+v.allowDownload)
          this.incrementViews(v.id)
          this.loadUserData(v.author)
          v.videoPlaying = false
          v.iteration = 0
          v.userID = +v.userID
          v.comments = v.comments.map(q=>{
            q.updated = false
            q.editing = false
            this.fetchUserData(q.userID)
            return q
          })
          this.extractEmbedURL(v)
        })
        this.state.inView = Array(data[0].length).fill().map(v=>false)
        this.state.landingPage.demos = data[0]
        this.state.totalPages = data[1]
        if(this.state.curPage+1 > this.state.totalPages) this.lastPage()
        this.state.loaded = true
      })
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
    checkExactSearchPref(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='exactSearch')
      if(l.length) this.state.search.exact = l[0].split('=')[1]=='true'
      l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='allWords')
      if(l.length) this.state.search.allWords = l[0].split('=')[1]=='true'
    },
    loadDemoFromBackup(demo, database){
      let sendData = {
        userName: this.state.loggedinUserName,
        passhash: this.state.passhash,
        demoID: demo.id,
        database
      }
      fetch(this.state.baseURL + '/loadBackup.php',{
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
        for (const [key, value] of Object.entries(demo)) {
          if(key !== 'updated'){
            demo[key] = data[key]
            this.updateDemoItem(demo, key)
          }
        }
        demo.iteration = 0
        this.state.extractEmbedURL(demo)
        this.state.closeMenus++
      })
    },
    updateDemoItem(demo, item){
      if(item !== 'updated'){
        let newItemVal = demo[item]
        if(item == 'private') newItemVal = !newItemVal ? 1 : 0
        if(item == 'allowDownload') newItemVal = !newItemVal ? 1 : 0
        let sendData = {
          userName: this.state.loggedinUserName,
          item,
          newItemVal,
          passhash: this.state.passhash,
          demoID: demo.id
        }
        fetch(this.state.baseURL + '/updateDemoItem.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        }).then(res => res.json()).then(data=>{
          demo.updated[item] = 1
          if(this.state.search.string && item == 'private'){
            this.state.search.demos.filter(v=>v.id==demo.id)[0][item] = !!newItemVal
          }else if(item == 'private'){
            switch(this.state.mode){
              case 'single':
                this.state.demos.filter(v=>v.id == demo.id)[0][item] = !!newItemVal
              break
              case 'default':
                this.state.landingPage.demos.filter(v=>v.id == demo.id)[0][item] = !!newItemVal
              break
              case 'user':
                this.state.user.demos.filter(v=>v.id == demo.id)[0][item] = !!newItemVal
              break
            }
          }
          if(item=='videoLink'){
            this.state.extractEmbedURL(demo)
            demo.videoPlaying = false
          }
          setTimeout(()=>{
            demo.updated[item] = 0
          }, 1000)
        })
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
          this.state.fetchUserData(this.state.loggedinUserID)
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
          this.checkExactSearchPref()
          this.checkShowControlsPref()
          //this.getPages()
          window.location.reload()
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
      if(this.state.search.string != '') this.state.search.demos = this.state.search.demos.filter(v=>!v.private)
      switch(this.state.mode){
        case 'user':
        this.state.user.demos = this.state.user.demos.filter(v=>!v.private)
        break
        case 'single':
        this.state.demos = this.state.demos.filter(v=>!v.private)
        break
        case 'default':
        this.state.landingPage.demos = this.state.landingPage.demos.filter(v=>!v.private)
        break
      }
      this.state.loggedin = false
      this.state.isAdmin = false
      this.state.loggedinUserID = this.state.loggedinUserName = ''
      window.location.reload()
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
            this.state.loggedinUserID = +l3[0].split('=')[1]
            this.checkEnabled()
          }
        }
      } else {
        this.getMode() 
      }
      this.checkShowControlsPref()
      this.checkAutoplayPref()
      this.checkExactSearchPref()
    }
  },
  mounted(){
    this.loadHotKeys()
    setInterval(()=>{
      this.state.globalT+=1/60
    },1/60*1000|0)
    this.state.userAgent = navigator.userAgent
    this.state.toggleLogin = this.toggleLogin
    this.state.showLoginPrompt = this.showLoginPrompt
    this.state.toggleShowForkHistory = this.toggleShowForkHistory
    this.state.toggleShowControls = this.toggleShowControls
    this.state.loadDemoFromBackup = this.loadDemoFromBackup
    this.state.showUserSettings = this.showUserSettings
    this.state.extractEmbedURL= this.extractEmbedURL
    this.state.toggleAutoplay = this.toggleAutoplay
    this.state.incrementViews = this.incrementViews
    this.state.openFullscreen = this.openFullscreen
    this.state.updateDemoItem = this.updateDemoItem
    this.state.fetchUserData = this.fetchUserData
    this.state.loadUserData = this.loadUserData
    this.state.closePrompts = this.closePrompts
    this.state.beginSearch = this.beginSearch
    this.state.advancePage = this.advancePage
    this.state.regressPage = this.regressPage
    this.state.decToAlpha = this.decToAlpha
    this.state.alphaToDec = this.alphaToDec
    this.state.setCookie = this.setCookie
    this.state.firstPage = this.firstPage
    this.state.getAvatar = this.getAvatar
    this.state.lastPage = this.lastPage
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
html{
  margin: 0;
  overflow-X: hidden;
  font-family: Play;
  color: #8fc;
  min-height: 100%;
  min-width: 475px;
  background: #000;
  scroll-behavior: smooth;
}
body{
  overflow: hidden;
  margin: 0;
  overflow-X: hidden;
  background: linear-gradient(45deg, #001, #011);
  font-family: Play;
  color: #8fc;
  min-height: 100vh;
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
input[type=text]{
  font-size: 24px;
  background: #0004;
  border: none;
  border-bottom: 2px solid #2fa;
  width: 300px;
  color: #ffa;
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
select:focus{
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
.hideOverflow{
  overflow: hidden;
}
/* width */
option{
  text-align: center;
}
select{
  background: #012;
  color: #ff0;
}
::-webkit-scrollbar {
  width: 12px!important;
}
::-webkit-scrollbar:hover{
  cursor: pointer!important;
}

::-webkit-scrollbar-track {
  background: #133!important; 
}
::-webkit-scrollbar-track:hover {
  cursor: pointer!important;
}
 
::-webkit-scrollbar-thumb {
  background: #166!important;
}

::-webkit-scrollbar-thumb:hover {
  background: #588; 
  cursor: pointer!important;
}
a,button{
  cursor: pointer;
}
a{
  color: #fa0;
  text-decoration: none;
}
.spacerDiv{
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #0000, #4dd8, #0000);
  margin-top: .3em;
  margin-bottom: .3em;
}
/* Customize the label (the checkboxLabel) */
.checkboxLabel {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: -2px;
  margin-left: 30px;
  margin-top: 3px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkboxLabel input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border: 1px solid #2468;
  background-color: #123;
}

/* On mouse-over, add a grey background color */
.checkboxLabel:hover input ~ .checkmark {
  background-color: #234;
}

/* When the checkbox is checked, add a blue background */
.checkboxLabel input:checked ~ .checkmark {
  background-color: #086;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkboxLabel input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkboxLabel .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
video:focus{
  outline: none;
}
</style>
