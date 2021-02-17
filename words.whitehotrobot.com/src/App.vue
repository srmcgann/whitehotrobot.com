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
        baseURL: 'https://words.whitehotrobot.com',
        baseDemoURL: 'https://code.whitehotrobot.com',
        baseVideoURL: 'https://whitehotrobot.com',
        baseDomain: 'words.whitehotrobot.com',
        baseUserDomain: 'whitehotrobot.com',
        rootDomain: 'whitehotrobot.com',
        maxCommentsBeforeExpansion: 3,
        curPage: 0,
        curPlayId: 0,
        beginSearch: null,
        curSearchPage: 0,
				jumpToPage: null,
				userAgent: null,
        userData: [],
				preloadImages: [],
        curUserPage: null,
        incrementViews: null,
        loggedinUserName: '',
        exactClicked: false,
        search: {
          string: '',
          posts: [],
          hits: 0,
          inProgress: false,
          timer: 0,
          timerHandle: null,
          exact: false,
          allWords: true
        },
        showControlsToggleTimer: 0,
        loggedin: false,
        updatePostItem: null,
        totalUserPages: 0,
        totalPages: 0,
        loadPostFromBackup: null,
        showUploadModal: false,
        toggleLogin: null,
				maxResultsPerPage: 0,
        showLoginPrompt: null,
        globalT: 0,
        showControls: false,
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
        posts: [],
        regusername: '',
        advancePage: null,
        regressPage: null,
				filteredUserPosts: null,
        firstPage: null,
        lastPage: null,
        regpassword: '',
        preload: 2,
        closeMenus: 0,
        decToAlpha: null,
        alphaToDec: null,
        showRegister: false,
        showUserSettings: null,
        userSettingsVisible: false,
        openFullscreen: null,
        getAvatar: null,
        landingPage:{
          posts: []
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
      fetch(this.state.baseURL + '/getRecentPosts.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
				data[0].map(v=>{
          v.editHTML = false
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
        this.state.landingPage.posts = data[0]
        this.state.totalPages = data[1]
        if(this.state.curPage+1 > this.state.totalPages) this.lastPage()
				this.state.loaded = true
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
          if(this.state.user != null && typeof this.state.user.posts != 'undefined' && this.state.user.posts.length){
            data[0].posts = this.state.user.posts
          }else{
            data[0].posts.map(v=>{
              if(this.state.mode != 'default') this.incrementViews(v.id)
              v.editHTML = false
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
      })
    },
    loadPostFromBackup(post, database, el){
      let sendData = {
        userName: this.state.loggedinUserName,
        passhash: this.state.passhash,
        postID: post.id,
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
        data.editHTML = false
				this.fetchUserData(data.userID)
        data.comments = data.comments.map(q=>{
          q.updated = false
          q.editing = false
          this.fetchUserData(q.userID)
          return q
        })
        data.allowDownload = !!(+data.allowDownload)
        switch(this.state.mode){
          case 'u':
          break
          case 'post':
          break
          default:
          break
        }
        for (const [key, value] of Object.entries(post)) {
          post[key] = data[key]
          this.updatePostItem(post.id, key)
        }
      })
    },
    updatePostItem(postID, item){
      let newItemVal
      if(this.state.search.string){
        newItemVal = this.state.search.posts.filter(v=>v.id==postID)[0][item]
      }else{
        switch(this.state.mode){
          case 'default':
            //if(item == 'text' && !this.state.landingPage.posts.filter(v=>v.id==postID)[0]['editHTML']){
              //let el = this.$refs['contenteditable' + postID]
              //newItemVal = el.innerHTML
            //}else{
              newItemVal = this.state.landingPage.posts.filter(v=>v.id==postID)[0][item]
            //}
            break
          case 'post':
            //if(item == 'text' && !this.state.posts.filter(v=>v.id==postID)[0]['editHTML']){
              //let el = this.$refs['contenteditable' + postID]
              //newItemVal = el.innerHTML
            //}else{
              newItemVal = this.state.posts.filter(v=>v.id==postID)[0][item]
            //}
            break
          case 'u':
            //if(item == 'text' && !this.state.user.posts.filter(v=>v.id==postID)[0]['editHTML']){
              //let el = this.$refs['contenteditable' + postID]
              //newItemVal = el.innerHTML
            //}else{
              newItemVal = this.state.user.posts.filter(v=>v.id==postID)[0][item]
            //}
            break
        }
      }
      if(item == 'private') newItemVal = !newItemVal ? 1 : 0
      if(item == 'allowDownload') newItemVal = !newItemVal ? 1 : 0
      let sendData = {
        userName: this.state.loggedinUserName,
        item,
        newItemVal,
        passhash: this.state.passhash,
        postID: postID
      }
      fetch(this.state.baseURL + '/updatePostItem.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
    },
    loadPost(postID){
      this.state.curPost = postID
      let sendData = {
        postID
      }
      fetch(this.state.baseURL + '/fetchPost.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
        data.private = !!(+data.private)
        data.editHTML = false
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
        this.state.posts = [data]
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
          case 'post':
            this.state.mode = 'post'
            this.state.curPage = (+vars[1])-1
            this.$nextTick(()=>this.loadPost(this.alphaToDec(vars[1])))
            if(vars[2]){
              this.state.search.string = decodeURIComponent(vars[2])
            }
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
		getPages(){
			switch(this.state.mode){
				case 'u':
				this.loadUserData(this.state.user.name)
				break
				case 'post':
				this.loadPost()
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
      this.checkShowControlsPref()
      this.checkExactSearchPref()
    },
    checkShowControlsPref(){
      let l = (document.cookie).split(';').filter(v=>v.split('=')[0].trim()==='showControls')
      if(l.length) this.state.showControls = l[0].split('=')[1]=='true'
    },
    incrementViews(id){
      let sendData = {postID: id}
      fetch(this.state.baseURL + '/incrementViews.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res=>res.json()).then(data=>{
        if(this.state.search.string){
          if(this.state.search.posts.filter(v=>v.id==id).length) this.state.search.posts.filter(v=>v.id==id)[0].views++
        }else{
          switch(this.state.mode){
            case 'u': this.state.user.posts.filter(v=>v.id==id)[0].views++; break
            case 'default': if(this.state.landingPage.posts.filter(v=>v.id==id).length) this.state.landingPage.posts.filter(v=>v.id==id)[0].views++; break
            case 'post': this.state.posts.filter(v=>v.id==id)[0].views++; break
          }
        }
      })
    },
    firstPage(){
      let search = this.state.search.string ? ('/1/' + (this.state.search.string)) : ''
      switch(this.state.mode){
        case 'u':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + search
        break
        case 'default':
          window.location.href = window.location.origin + search
        break
        case 'post':
          window.location.href = window.location.origin + '/post/' + this.state.curPost + search
        break
      }
    },
		jumpToPage(pageNo){
      let search = this.state.search.string ? ('/' + (this.state.search.string)) : ''
			switch(this.state.mode){
			  case 'u':
				window.location.href = window.location.origin + '/u/' + this.user.name + '/' + pageNo + search
				break
				case 'default':
        window.location.href = window.location.origin + '/' + pageNo + search
				break
				case 'post':
        window.location.href = window.location.origin + '/post/' + this.decToAlpha(this.state.curPost) + '/' + pageNo + search
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
        case 'u':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + '/' + (this.state.curUserPage + 2) + search
        break
        case 'default':
          window.location.href = window.location.origin + '/' + (this.state.curPage + 2) + search
        break
        case 'post':
          window.location.href = window.location.origin + '/post/' + this.decToAlpha(this.state.curPost) + '/' +(this.state.curPage + 2) + search
        break
      }
    },
    regressPage(){
      let search = this.state.search.string ? ('/' + (this.state.search.string)) : ''
      switch(this.state.mode){
        case 'u':
          window.location.href = window.location.origin + '/u/' + this.state.user.name + '/' + this.state.curUserPage + search
        break
        case 'default':
          window.location.href = window.location.origin + '/' + this.state.curPage + search
        break
        case 'post':
          window.location.href = window.location.origin + '/post/' + this.decToAlpha(this.state.curPost) + '/' +(this.state.curPage + 2) + search
        break
      }
    },
    doSearch(searchString, page1){
      this.state.search.posts = []
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
        data[0] = data[0].map(v=>{
          v.editHTML = false
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
        this.state.search.posts = data[0]
        switch(this.state.mode){
          case 'u':
            this.state.totalUserPages = +data[1]
            if(this.state.curUserPage && this.state.curUserPage+1 > this.state.totalUserPages) this.lastPage()
          break
          case 'default':
            this.state.totalPages = +data[1]
            if(this.state.curPage && this.state.curPage+1 > this.state.totalPages) this.lastPage()
          break
          case 'post':
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
    loadHotKeys(){
      window.addEventListener('click',e=>{
        let close = true
        e.path.forEach(v=>{
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
  },
	computed:{
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
    this.state.toggleShowControls = this.toggleShowControls
    this.state.loadPostFromBackup = this.loadPostFromBackup
    this.state.filteredUserPosts = this.filteredUserPosts
    this.state.showUserSettings = this.showUserSettings
    this.state.showLoginPrompt = this.showLoginPrompt
    this.state.updatePostItem = this.updatePostItem
    this.state.incrementViews = this.incrementViews
    this.state.openFullscreen = this.openFullscreen
    this.state.fetchUserData = this.fetchUserData
    this.state.closePrompts = this.closePrompts
    this.state.pauseVisible = this.pauseVisible
    this.state.loadUserData = this.loadUserData
    this.state.checkEnabled = this.checkEnabled
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
  overflow: hidden;
  margin: 0;
  overflow-X: hidden;
  background: #002;
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
::-webkit-scrollbar:hover{
  cursor: pointer!important;
}

::-webkit-scrollbar-track {
  background: #124; 
}
::-webkit-scrollbar-track:hover {
  cursor: pointer!important;
}
 
::-webkit-scrollbar-thumb {
  background: #148; 
}

::-webkit-scrollbar-thumb:hover {
  background: #588; 
  cursor: pointer!important;
}
</style>
