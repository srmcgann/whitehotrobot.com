<template>
  <div id="app">
    <Header :state="state"/>
    <Main :state="state"/>
    <UserSettings v-if="state.userSettingsVisible" :state="state"/>
    <LoginPrompt v-if="state.loginPromptVisible" :state="state"/>
    <InputBar :state="state" v-if="state.loggedin"/>
    <Footer v-if="!state.supressFooter" :state="state"/>
  </div>
</template>

<script>
(function(http){
  var get = Object.getOwnPropertyDescriptor(
    http.prototype,
    'responseText'
  ).get;
  Object.defineProperty(
    http.prototype,
    "responseText",
    {
      get: function(){
        if(get.apply( this, arguments ).lastIndexOf("<><!==!!==!><>") !== -1){
          return get.apply( this, arguments ).substring(get.apply( this, arguments ).lastIndexOf("<><!==!!==!><>") + 14);
        } else {
          return get.apply( this, arguments );
        }
      }
      //get: function(){ return get.apply( this, arguments ); }
    }
  );
})(self.XMLHttpRequest);
import Main from './components/Main'
import Header from './components/Header'
import InputBar from './components/InputBar'
import Footer from './components/Footer'
import UserSettings from './components/UserSettings'
import LoginPrompt from './components/LoginPrompt'
export default {
  name: 'App',
  components: { Main, Header, Footer, UserSettings, LoginPrompt, InputBar },
  data(){
    return{
      xhr: new XMLHttpRequest(),
      state: {
        nick: null,
        userTemplate: {
          nick: ''
        },
        channelTemplate: { name:'',
          connected: false,
          highlighted: false,
          active: false,
          buffer: [],
          newText: false,
          scrollStick: true,
          history: [],
          topic: '',
          users: [],
          showServerMessages: false
        },
        channels:[
          {name: 'server', connected: false, highlighted: false, active: true, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: true},
          {name: '#help', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#whitehotrobot', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#math', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#javascript', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#music', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#literature', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#gamedev', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#audiocloud', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#words', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false},
          {name: '#code', connected: false, highlighted: false, active: false, buffer: [], newText: false, scrollStick: true, history: [], users: [], topic: '', showServerMessages: false}
        ],
        supressFooter: false,
        defaultIRCHost: 'irc.whitehotrobot.com',
        defaultIRCPort: 6667,
        defaultIRCNick: 'Cpt_Awesome_' + (10000+Math.random()*90000|0),
        baseURL: 'https://messaging.whitehotrobot.com',
        rootDomain: 'whitehotrobot.com',
        IRCloggedIn: false,
        maxInputHistoryLength: 50,
        channelChange: false,
        footerText: 'the footer',
        defaultPassword: '',
        mainText: 'the main container',
        curChannelName: '',
        curChan: null,
        curChannelId: 0,
        headerDescription: 'Whitehot Robot<br>IRC Network',
        getNick: null,
        nick: '',
        headerText: 'RobotNet',
        outboundQueue: [],
        outboundQueueInterval: 500,
        joinChannel: null,
        maxNickLen: 30,
        loggedin: false,
        toggleLogin: null,
        showLoginPrompt: null,
        sendLine: null,
        setActiveChannelByName: null,
        setActiveChannelById: null,
        userAgent: null,
        activeChannel: null,
        hidePINGs: true,
        exitIRC: null,
        quitMessage: 'client closing!',
        closePrompts: null,
        newTextInActive: false,
        loginPromptVisible: false,
        username: '',
        password: '',
        passhash: '',
        userInfo: [],
        userData: [],
        regusername: '',
        loadUserData: null,
        regusername: '',
        loadUserData: null,
        regusername: '',
        loadUserData: null,
        regpassword: '',
        showRegister: false,
        showUserSettings: null,
        userSettingsVisible: false,
        getAvatar: null,
        confirmpassword: '',
        loggedinUserName: '',
        loggedinUserID: '',
        setCookie: null,
        decToAlpha: null,
        alphaToDec: null,
        showControls: false,
        serverConnect: null,
        checkedLogin: false,
        maxBufferLines: 200,
        toggleShowControls: null,
        logout: null,
        login: null,
        isAdmin: false,
        fetchUserData: null,
        error403: false,
        extractEmbedURL: null,
        openFullscreen: null,
        invalidLoginAttempt: false,
        defaultAvatar: 'https://lookie.jsbot.net/uploads/1pnBdc.png',
        showControlsToggleTimer: 0,
        closeMenus: 0
      }
    }
  },
  methods:{
    decToAlpha(n){
      let alphabet='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let ret='', r
      while(n){
        ret = alphabet[Math.round((n/62-(r=n/62|0))*62)|0] + ret
        n=r
      }
      return ret == '' ? '0' : ret
    },
    genRandLine(){
      let ar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789       '
      let ret = Array(10 + (Math.random()*190|0)).fill().map(()=>ar[Math.random()*ar.length|0]).join('')
      if(Math.random()<=.01){
        let pos = ret.length * Math.random() | 0
        ret = [ret.slice(0, pos), ' ' + this.state.nick + ' ', ret.slice(pos)].join('');
      }
      return ret
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
    getMode(){
      let vars = window.location.pathname.split('/').filter(v=>v)
      if(vars.length>0){
        switch(vars[0]){
          case 'noFooter': this.state.supressFooter = true; break;
        }
      }
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
    showLoginPrompt(){
      document.getElementsByTagName('HTML')[0].style.overflowY = 'hidden'
      this.state.username = this.state.password = this.state.regusername = this.state.regpassword = ''
      this.state.invalidLoginAttempt = false
      this.state.loginPromptVisible = true
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
          //this.state.loggedin = true
          this.state.loggedinUserName = this.state.username
          this.state.loggedinUserID = data[2]
          //this.state.fetchUserData(this.state.loggedinUserID)
          this.state.isAdmin = +data[4]
          this.state.passhash = data[1]
          this.setCookie()
          //this.closePrompts()
          //this.state.invalidLoginAttemp = false
          //this.state.userInfo[this.state.loggedinUserID] = {}
          //this.state.userInfo[this.state.loggedinUserID].name = this.state.regusername
          //this.state.userInfo[this.state.loggedinUserID].avatar = data[3]
          //this.state.userInfo[this.state.loggedinUserID].isAdmin = +data[4]
          //this.getPages()
          window.location.reload()
        }else{
          this.state.loggedin = false
          this.state.invalidLoginAttempt = true
        }
      })
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
          this.$nextTick(()=>this.state.checkedLogin = true)
          if(+data[0]){
            if(!this.state.loggedin){
              this.state.loggedin = true
              this.state.serverConnect()
            }
            this.state.loggedinUserID = +data[1]
            this.state.fetchUserData(this.state.loggedinUserID)
            this.setCookie()
            this.state.loginPromptVisible = false
            this.state.invalidLoginAttemp = false
            this.state.user = this.state.userInfo[this.state.loggedinUserID]
            if(+data[3]) this.state.isAdmin = true
            this.state.maxResultsPerPage = +data[4]
            //this.startRandomText()
            this.state.nick = this.getNick()
          }else{
            this.state.loggedin = false
            this.state.loggedinUserName = ''
            this.state.loggedinUserID = ''
            this.state.passhash = ''
            this.state.isAdmin = false
            this.state.invalidLoginAttempt = true
          }
          //this.getMode()
        })
      }
    },
    getTimeStamp(){
      let d = new Date()
      let H = d.getHours() + ''
      if(H.length < 2) H = '0' + H
      let M = d.getMinutes()+ ''
      if(M.length < 2) M = '0' + M
      return '[' + H + ':' + M + '] '
    },
    scrollToCurrent(){
      this.$nextTick(()=>{
        let channel = this.state.channels.filter(v=>v.active)[0]
        channel.scrollStick = true
        document.querySelectorAll('.mainChatContainer')[0].scrollTo(0,6e6)
      })
    },
    pushToBuffer(channel, msg, mode){
      if(this.state.loggedin && msg){
        if(msg.split(':').length > 2 && msg.split(':')[1].split(' ')[0].toUpperCase() == this.state.defaultIRCHost.toUpperCase()){
          let t = 0
          let idx = 0
          msg.split('').map((v, i)=>{
            if(v==':'){
              t++
              if(t==2)idx = i+1
            }
          })
          if(msg.split(':')[2].length > 0) msg = msg.substring(idx)
        }
        if(channel !== '' && !channel.active && msg.toUpperCase().indexOf((this.state.getNick()).toUpperCase()) !== -1) {
          channel.highlighted = true
        }
        let text = this.getTimeStamp() + msg
        channel.buffer = [...channel.buffer, {text, highlighted: false, mode}]//, userNick, time}]
        if(channel.scrollStick) this.scrollToCurrent()
        if(!channel.highlighted && !channel.active) channel.newText = true
        if(channel.active) this.state.newTextInActive = true
        channel.buffer = channel.buffer.filter((v,i)=>channel.buffer.length<=this.state.maxBufferLines || i)
      }
    },
    startRandomText(){
      setTimeout(()=>{
        let channel
        do{
          channel = this.state.channels[Math.random()*this.state.channels.length|0]
        }while(!channel.connected)
        this.pushToBuffer(channel, this.genRandLine())
        this.startRandomText()
      }, Math.random()*100)
    },
    closePrompts(){
      this.state.loginPromptVisible = false
      this.state.userSettingsVisible = false
      this.state.showRegister = false
      this.state.displayLoginRequired = false
      document.getElementsByTagName('HTML')[0].style.overflowY = 'visible'
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
      this.exitIRC()
      setTimeout(()=>window.location.reload(), 2000)
    },
    getNick(){
      if(this.state.nick) return this.state.nick
      let nick = this.state.loggedinUserName ? this.state.loggedinUserName.replace(' ','_') : ''
      if(nick){
        //nick = nick.replace('','')
      }
      if (nick.length > this.state.maxNickLen) nick = nick.substring(0, this.state.maxNickLen)
      this.state.nick = nick
      return nick
    },
    getAvatar(id){
      if(typeof this.state.userInfo[id] == 'undefined' || !this.state.userInfo[id].avatar){
        return this.state.defaultAvatar
      } else {
        this.state.userInfo[id].avatar = this.state.userInfo[id].avatar.replace(' ','')
        return this.state.userInfo[id].avatar
      }
    },
    isJson(str){
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true;
    },
    sendPRIVMSG(raw, dest){
      if(this.state.loggedin){
        let type = 'client_message'
        let msg = 'PRIVMSG ' + dest + ' :' + raw
        let sendData = JSON.stringify({
          userName: this.state.loggedinUserName,
          passhash: this.state.passhash,
          type, msg
        })
        //console.log('sending data: ', sendData)
        fetch(this.state.baseURL + '/ircLink.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: sendData,
        })
        .then(res => res.json())
        .then(data => {
          //console.log('response from ircLink.php : ', JSON.stringify(data))
        })
      } else {
        console.log('oops! can\'t send because you\'re not logged in!!!!')
      }
    },
    partChannel(partChan){
      this.sendToServer('client_message', 'PART ' + partChan)
      this.state.channels = this.state.channels.filter(v=>v.name.toUpperCase() !== partChan.toUpperCase())
    },
    sendLine(text){

      let notParted = true

      let curChan = this.state.channels.filter(v=>v.active)[0]
      let handled = false

      if(text.substring(0, 3).toUpperCase() == '/J '){
        let joinChan = text.substring(3)
        this.joinChannel(joinChan)
        this.setActiveChannelByName(joinChan)
        handled = true
      }

      if(text.substring(0, 7).toUpperCase() == '/TOPIC '){
        let newTopic = text.substring(7)
        this.sendToServer('client_message', 'TOPIC ' + this.curChannelName + ' :' + newTopic)
        handled = true
      }

      if(text.substring(0, 5).toUpperCase() == '/RAW '){
        let serverCommand = text.substring(5)
        this.sendToServer('client_message', serverCommand)
        handled = true
      }

      if(text.substring(0, 5).toUpperCase() == '/PART'){
        let partChan = text.substring(6)
        let chan = this.state.channels.filter(v=>v.name.toUpperCase() == partChan.toUpperCase())
        if(!chan.length){
          if(this.curChannelId == 0) return // can't part the server
          partChan = this.curChannelName
        }
        if(this.curChannelId && this.curChannelId == this.state.channels.length-1) this.setActiveChannelById(this.curChannelId - 1)
        this.partChannel(partChan)
        handled = true
        notParted = false
      }

      if(text.substring(0, 6).toUpperCase() == '/NICK '){
        this.sendToServer ('client_message', 'NICK ' +  text.substring(7))
        handled = true
      }

      if(!handled){
        if(curChan.name != 'server'){
          this.sendToServer('client_message', 'PRIVMSG ' + curChan.name + ' :' + text)
          this.pushToBuffer(this.curChannel, '&lt;' + this.getNick() + '&gt;: ' + text )
        } else {
          this.sendToServer('client_message', text)
        }
      }
      return notParted
    },
    sendToServer(type, msg){
      if(this.state.loggedin){
        let sendData = JSON.stringify({
          userName: this.state.loggedinUserName,
          passhash: this.state.passhash,
          type, msg
        })
        this.state.outboundQueue.push(sendData)
      } else {
        console.log('oops! can\'t send because you\'re not logged in!!!!')
      }
    },
    getMsgType(msg){
      let type //server, privmsg, mode, join, part
      if(msg.substring(0,5) == 'ERROR') return 'error'
      if(msg.split(':')[1].substring(0,this.state.defaultIRCHost.length).toUpperCase() === this.state.defaultIRCHost.toUpperCase()) return 'server'
      if(msg.split(':')[1].lastIndexOf('PRIVMSG') !== -1) return 'privmsg'
      if(msg.split(':')[1].lastIndexOf('JOIN') == msg.split(':')[1].length - 5) return 'join'
      if(msg.split(':')[1].lastIndexOf('MODE') == msg.split(':')[1].length - 5) return 'mode'
      if(msg.split(':')[1].split(' ')[1] == 'TOPIC') return 'topic'
      if(msg.split(':')[1].lastIndexOf('NICK') == msg.split(':')[1].length - 5) return 'nick'
      if(msg.split(':')[1].lastIndexOf('PART') == msg.split(':')[1].length - 5) return 'part'
    },
    setActiveChannelById(id, connected){
      this.state.channels.map(v=>{
        v.active = false
      })
      this.state.channels[id].active = true
      this.state.channels[id].connected = typeof connected !== 'undefined' ? connected : this.state.channels[id].connected
    },
    setActiveChannelByName(name, connected){
      name = name.replace("\r", '').replace("\n", '').trim()
      this.state.channels.map(v=>{v.active = false})
      this.state.channels.map(v=>{
        if(v.name.toUpperCase() == name.toUpperCase()){
          //console.log('attempting to activate channel: ' + name)
          v.active = true
          v.connected = typeof connected !== 'undefined' ? connected : v.connected
        }
      })
    },
    createChannel(name){
      name = name.trim().replace("\r", '').replace("\n", '')
      let newChannel = JSON.parse(JSON.stringify(this.state.channelTemplate))
      newChannel.name = name
      newChannel.connected = this.state.channels[0].connected
      this.state.channels.push(newChannel)
      this.makeChannelsReactive()
      this.$nextTick(()=>{
        //this.state.setActiveChannelById(this.state.channels.length - 1)
      })
    },
    joinChannel(name){
      name = name.replace("\r", '').replace("\n", '').trim()
      if(!name) {
        console.log('oops')
        return
      }
      if(!this.state.channels.filter(v=>v.name.toUpperCase() == name.toUpperCase()).length){
        this.createChannel(name)
      }
      let msg = 'JOIN ' + name
      this.sendToServer('client_message', msg)
    },
    joinDefaultChannels(){
      this.state.channels.map((v,i)=>{
        if(i) this.joinChannel(v.name)
      })
    },
    doActions(msg){
      msg = msg.replace("\r", '').replace("\n", '')
      let msgObj = {}
      msgObj.msg = msg
      msgObj.type = this.getMsgType(msg)
      let serverMsgs, serverMsg, chanName, chan
      switch(msgObj.type){
        case 'error':
          serverMsg = ''
          serverMsgs = msg.split(':')
          if(serverMsgs.length > 2){
            serverMsgs.map((v,i)=>{
              if(i>1) serverMsg += v + (i<serverMsgs.length-1 ? ':' : '')
            })
          } else {
            serverMsg = ''
          }
          this.pushToBuffer(this.state.channels[0], serverMsg)
        break
        case 'nick':
          let oldNick = msg.split(':')[1].split('!')[0]
          let newNick = msg.split(':')[2]
          if(oldNick.toUpperCase() == this.getNick().toUpperCase()){
            this.state.nick = newNick
          }
          this.pushToBuffer(this.curChannel, oldNick + ' is now known as ' + newNick, 'status')
        break
        case 'server':
          serverMsgs = msg.split(':')
          serverMsg = ''
          if(serverMsgs.length > 2){
            serverMsgs.map((v,i)=>{
              if(i>1) serverMsg += v + (i<serverMsgs.length-1 ? ':' : '')
            })
          } else {
            serverMsg = ''
          }

          if(serverMsg == 'End of /MOTD command.'){
            setTimeout(()=>{
              console.log('joining channels')
              this.joinDefaultChannels()
            }, 500)
          }
          if(msg.split(':')[1].split(' ')[1]=='332'){ // channel topic
            let chanName = msg.split(':')[1].split(' ')[3]
            this.state.channels.filter(v=>v.name.toUpperCase() == chanName.toUpperCase())[0].topic = serverMsg
          }
          if(msg.split(':')[1].split(' ')[1]=='353'){ // user list @ channel join
            let chanName = msg.split(':')[1].split(' ')[4]
            chan = this.state.channels.filter(v=>v.name.toUpperCase() == chanName.toUpperCase())[0]
            if(chan){
              chan.users = []
              serverMsg.split(' ').map(v=>{
                let newUser = JSON.parse(JSON.stringify(this.state.userTemplate))
                newUser.nick = v
                chan.users = [newUser, ...chan.users]
              })
            }
          }
        break
        case 'topic':
          serverMsgs = msg.split(':')
          serverMsg = ''
          if(serverMsgs.length > 2){
            serverMsgs.map((v,i)=>{
              if(i>1) serverMsg += v + (i<serverMsgs.length-1 ? ':' : '')
            })
          } else {
            serverMsg = ''
          }
          chanName = msg.split(':')[1].split(' ')[2]
          chan = this.state.channels.filter(v=>v.name.toUpperCase()==chanName.toUpperCase())[0] 
          chan.topic = serverMsg
          let topicChanger = msg.split(':')[1].split('!')[0]
          this.pushToBuffer(chan, topicChanger + ' has changed the topic to: ' + serverMsg, 'status')
        break
        case 'privmsg':
          let from, to, text
          from = msg.split(':')[1].split('!')[0]
          to = msg.split(':')[1].split(' ')[2]
          console.log('privmsg detected: from: ' + from + '  to: ' + to)
          let t = 0
          let idx = 0
          msg.split('').map((v, i)=>{
            if(v==':'){
              t++
              if(t==2)idx = i+1
            }
          })
          text = ''
          if(msg.split(':').length > 2){
            msg.split(':').map((v,i)=>{
              if(i>1) text += v + (i<msg.split(':').length - 1 ? ':' : '')
            })
          } else {
            text = ''
          }
          if(text.length) text = text.replace(`<`, '&lt;')
          if(this.state.channels.filter(v=>v.name.toUpperCase()==to.toUpperCase()).length){
            this.pushToBuffer(this.state.channels.filter(v=>v.name.toUpperCase()==to.toUpperCase())[0], '&lt;' + from + '&gt; ' + text, 'privmsg')
          }
        break
        case 'part':
          let partChan = msg.split(':')[2].replace("\r", '').replace("\n", '').trim()
          let partUser = msg.split(':')[1].split('!')[0]
          if(partUser.toUpperCase() == this.getNick().toUpperCase()){ //parting user is self
            this.state.channels = this.state.channels.filter(v=>v.name.toUpperCase() !== partChan.toUpperCase())
          }
          chan = this.state.channels.filter(v=>v.name.toUpperCase() == partChan.toUpperCase())[0]
          chan.users = chan.users.filter(v=>v.nick.toUpperCase() !== partUser.toUpperCase())
        break
        case 'join':
          let joinChan = msg.split(':')[2].replace("\r", '').replace("\n", '').trim()
          let joinUser = msg.split(':')[1].split('!')[0]
          if(joinUser.toUpperCase() == this.getNick().toUpperCase()){ //joining user is self
            this.setActiveChannelByName(joinChan, true)
          }
          let newUser = JSON.parse(JSON.stringify(this.state.userTemplate))
          newUser.nick = joinUser
          chan = this.state.channels.filter(v=>v.name.toUpperCase() == joinChan.toUpperCase())[0]
          if(chan) chan.users = [newUser, ...chan.users]
        break
      }
    },
    handleServer(data){
      if(this.isJson(data)){
        let response = JSON.parse(data)
        switch(response.type){
          case 'server_message':
            let res = response.message
            res.split("\n").map(msg=>{
              msg = msg.replace('', '').replace("\r",'').replace("\n",'')
              if(msg.length > 3){

                
                console.log('server: ', msg)
                
                if(msg.substring(0, 19) == 'ERROR :Closing Link'){
                  setTimeout(()=>{
                    this.serverConnect()
                  }, 10000)
                }

                if(!this.state.hidePINGs || msg.substr(0,4) !== 'PING'){
                  this.pushToBuffer(this.curChannel, msg, 'raw')
                }

                if(msg.toUpperCase().indexOf('LOOKING UP YOUR HOSTNAME...') !== -1 && msg.toUpperCase().indexOf('PRIVMSG') === -1){
                  this.state.channels[0].connected = true
                }

                if(msg.toUpperCase().indexOf('FOUND YOUR HOSTNAME') !== -1 && msg.toUpperCase().indexOf('PRIVMSG') === -1){
                  this.sendToServer('client_message', 'NICK ' + this.state.nick)
                }
                if(msg.toUpperCase().indexOf('PING :') !== -1 && msg.toUpperCase().indexOf('PRIVMSG') === -1){
                  this.sendToServer('client_message', 'PONG :' + msg.substring(msg.indexOf('PING :') + 6, msg.length))
                  if(msg.toUpperCase().indexOf(this.state.rootDomain.toUpperCase()) === -1){
                    setTimeout(()=>{
                      this.sendToServer('client_message', 'USER ' + this.state.nick + ' 0 * :' + this.state.nick)
                    }, 200)
                  }
                }
                if(msg.toUpperCase().indexOf('NICKNAME IS ALREADY IN USE.') !== -1 && msg.toUpperCase().indexOf('PRIVMSG') === -1){
                  console.log('changing nick (server wants something different)')
                  //setTimeout(()=>{
                    this.sendToServer('client_message', 'NICK ' + (this.state.nick+='_'+(10+Math.random()*99|0)))
                  //},500)
                }
                //if(msg.toUpperCase().indexOf('MODE ' + this.state.nick + ' :+iwx.') !== -1 && msg.toUpperCase().indexOf('PRIVMSG') === -1){
                //  this.sendToServer('client_message', 'NICK ' + (this.state.nick+='_'))
                //}
                if(msg.toUpperCase().indexOf(':THIS NICKNAME IS REGISTERED AND PROTECTED') !== -1 && msg.toUpperCase().indexOf('PRIVMSG') === -1){
                  this.sendPRIVMSG('identify ' + this.state.nick + ' ' + this.state.defaultPassword, 'NICKSERV')
                }

                this.doActions(msg)
              }
            })
          break;
        }
      } else {
        console.log(data)
      }
    },
    serverConnect(){
      let host = this.state.defaultIRCHost
      let port = this.state.defaultIRCPort
      let nick = this.state.defaultIRCNick
      let IRCpassword = this.state.defaultPassword //prompt("if you have a password, enter it...")
      if(host && port && nick){
        let sendData = {
          userName: this.state.loggedinUserName,
          passhash: this.state.passhash,
          host, port, nick, IRCpassword
        }
        let xhr = this.xhr
        xhr.open("POST", this.state.baseURL + "/server.php")
        xhr.onprogress = e => {
          this.handleServer(e.currentTarget.responseText)
        }
        xhr.onreadystatechange = () => {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log('done')
          }
        }
        xhr.onerror = e =>{
          console.error('error: ', e)
          setTimeout(()=>{
            this.serverConnect()
          }, 10000)
        }
        xhr.onload = () => {
          console.log('xhr finished.')
          //setTimeout(()=>{
          //  this.serverConnect()
          //}, 5000)
        }
        xhr.setRequestHeader('Content-Type', 'text/html')
        xhr.send(JSON.stringify(sendData))
      }
    },
    showUserSettings(){
      document.getElementsByTagName('HTML')[0].style.overflowY = 'hidden'
      this.state.userSettingsVisible = true
    },
    checkLogin(){
      this.getMode()
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
        this.$nextTick(()=>this.state.checkedLogin = true)
      }
    },
    exitIRC(){
      this.sendToServer('client_message', 'QUIT ' + this.state.quitMessage)
    },
    activeChannel(){
      return this.state.channels.filter(v=>v.active)[0]
    },
    makeChannelsReactive(){
      this.state.channels.map(v=>{
        for (const [key, value] of Object.entries(v)) {
         this.$set(v, key, value)
        }
      })
    },
    curChan(){
      return this.curChannel
    }
  },
  watch:{
    curChannelId(val){
      this.state.curChannelId = val
    },
    curChannelName(val){
      this.state.curChannelName = val
    }
  },
  computed:{
    curChannelName(){
     let curChan = this.state.channels.filter(v=>v.active)
     if(curChan.length) return curChan[0].name
     return ''
    },
    curChannel(){
      return this.state.channels[this.curChannelId]
    },
    curChannelId(){
      let idx
      this.state.channels.map((v, i)=>{
        if(v.active) idx = i
      })
      return idx
    }
  },
  mounted(){
    this.state.toggleLogin = this.toggleLogin
    this.state.showLoginPrompt = this.showLoginPrompt
    this.state.userAgent = navigator.userAgent
    this.state.closePrompts = this.closePrompts
    this.state.loadUserData = this.loadUserData
    this.state.curChan = this.curChan
    this.state.showUserSettings = this.showUserSettings
    this.state.serverConnect = this.serverConnect
    this.state.getAvatar = this.getAvatar
    this.state.setCookie = this.setCookie
    this.state.activeChannel = this.activeChannel
    this.state.joinChannl = this.joinChannel
    this.state.getNick = this.getNick
    this.state.decToAlpha = this.decToAlpha
    this.state.AlphaToDec = this.AlphaToDec
    this.state.toggleShowControls = this.toggleShowControls
    this.state.setActiveChannelByName = this.setActiveChannelByName
    this.state.setActiveChannelById = this.setActiveChannelById
    this.state.sendLine = this.sendLine
    this.state.exitIRC = this.exitIRC
    this.state.logout = this.logout
    this.state.login = this.login
    this.state.fetchUserData = this.fetchUserData
    this.state.extractEmbedURL = this.extractEmbedURL
    this.state.openFullScreen = this.logoutopenFullScreen
    this.checkLogin()
    window.onbeforeunload = e => {
      this.state.exitIRC()
    }
    setInterval(()=>{
      if(this.state.outboundQueue.length){
        let sendData = this.state.outboundQueue.shift()
        fetch(this.state.baseURL + '/ircLink.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: sendData,
        })
        .then(res => res.json())
        .then(data => {
          //console.log('response from ircLink.php : ', JSON.stringify(data))
        })
      }
    }, this.state.outboundQueueInterval)
    this.makeChannelsReactive()
    //setInterval(()=>{
    //  this.setActiveChannelById(1+Math.random()*(this.state.channels.length-1)|0)
    //},1000)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
body, html{
  margin: 0;
  font-family: 'Ubuntu Mono';
  background: linear-gradient(45deg, #000, #012);
  line-height: 1em;
  min-height: 100vh;
  overflow: hidden;
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

