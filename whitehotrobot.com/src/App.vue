<template>
  <div>
    <div class="admin" @click="loadAdminPage()"></div>
    <Main :state="state"/>
    <Footer :state="state"/>
  </div>
</template>

<script>
import Main from './components/Main'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Main,
    Footer
  },
  data(){
    return {
      state: {
        getVideos: null,
        activePlaylist: null,
        baseDomain: 'whitehotrobot.com',
        baseProtocol: 'https',
        baseDemoURL: 'https://code.whitehotrobot.com',
        baseURL: 'https://whitehotrobot.com',
        error404: false,
        playlistID: null,
        queueNextVideo: null,
        playlist: {name: ''},
        playlists: [],
        formattedDate: null,
        playAll: null,
				incrementViews: null,
        displayConsole: false,
        userName: '',
        users: [],
        itemID: '',
        decToAlpha: null,
        openFullscreen: null,
        home: null,
				codeHome: null,
        mode: 'default',
        shuffle: false,
        thumbURL: 'https://code.whitehotrobot.com',
        videos: []
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
    playAll(){
      this.state.videos.map(v=>v.playing=false)
      this.$nextTick(()=>{
        this.state.videos[0].playing = true
        this.state.incrementViews(this.state.videos[0].id)
      })
    },
    loadAdminPage(){
      let url = this.state.baseProtocol + '://' + this.state.baseDomain + '/admin'
      setTimeout(()=>{
        window.location.href = url
      }, 50)
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
		codeHome(){
      window.location.href = this.state.baseDemoURL
		},
    home(){
      window.location.href = this.state.baseURL
    },
    formattedDate(d){
      let M=['January','February','March','April','May','June','July','August','September','October','November','December']
      var l=new Date(d)
      return M[l.getMonth()] + ' ' + l.getDate() + ', ' + l.getFullYear()// + ' • ' + (l.getHours()%12) + ':' + l.getMinutes() + ' ' + (l.getHours()<12?'AM':'PM')
    },
		incrementViews(id){
      let sendData = {demoID: id}
      fetch(this.state.baseURL + '/incrementViews.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
        this.state.videos.filter(v=>+v.id==id)[0].videoViews =  +data[1]
			})
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
    getMode(){
      let vars = window.location.pathname.split('/').filter(v=>v)
      this.state.mode = 'default'
      this.state.displayConsole = true
      if(vars.length>1){
        switch(vars[0]){
          case 'playlist':
            this.state.mode = 'playlist'
            this.state.playlistID = this.alphaToDec(vars[1])
            this.state.displayConsole = true
          break
          case 'user': this.state.mode = 'user'
            this.state.userName = vars[1]
            this.state.displayConsole = true
          break
          case 'video': this.state.mode = 'single'
            this.state.itemID = this.alphaToDec(vars[1])
            this.state.displayConsole = true
          break
        }
        if(vars[2]=='shuffle') this.state.shuffle = true
      }else{
        if(window.location.href !== window.location.origin + '/') window.location.href = window.location.origin
      }
    },
    getVideos(){
      let sendData
      switch(this.state.mode){
        case 'default':
          fetch(this.state.baseURL + '/getAllPlaylists.php',{mode:'cors'}).then(res=>res.json()).then(data=>{
            this.state.playlists=data
          })
          fetch(this.state.baseURL + '/getVideos.php',{mode:'cors'}).then(res=>res.json()).then(data=>{
            this.state.videos=data
            this.state.videos.map(v=>{
              v.playing = false
            })
          })
          fetch(this.state.baseURL + '/getUsers.php',{mode:'cors'}).then(res=>res.json()).then(data=>{
            this.state.users=data
          })
        break
        case 'user':
          sendData = {userName: this.state.userName}
          fetch(this.state.baseURL + '/getUserVideos.php',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
          })
          .then(res => res.json())
          .then(data => {
            if(data){
              this.state.videos=data
              this.state.videos.map(v=>{
                v.playing = false
              })
              this.$nextTick(()=>this.playAll())
            } else {
              console.log('404')
              this.state.error404 = true
            }
          })
        break
        case 'single':
          sendData = {itemID: this.state.itemID}
          fetch(this.state.baseURL + '/getSingle.php',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
          })
          .then(res => res.json())
          .then(data => {
            if(data){
              this.state.videos=data
              this.state.videos.map(v=>{
                v.playing = false
              })
              this.$nextTick(()=>this.playAll())
            } else {
              console.log('404')
              this.state.error404 = true
            }
          })
        break
        case 'playlist':
          sendData = {playlistID: this.state.playlistID}
          fetch(this.state.baseURL + '/getVideosByPlaylist.php',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
          })
          .then(res => res.json())
          .then(data => {
            if(data){
              this.state.playlist=data.playlist
              this.state.videos=data.videos
              this.state.videos.map(v=>{
                v.playing = false
              })
              this.$nextTick(()=>this.playAll())
            } else {
              console.log('404')
              this.state.error404 = true
            }
          })
        break
      }
    },
    queueNextVideo(){
      let current = -1
      let next = -1
      this.state.videos.map((v,i)=>{
        if(v.playing) current = i
      })
      this.state.videos.map(v=>v.playing=false)
      switch(current){
        case -1: next = 0; break
        case this.state.videos.length-1: next = 0; break
        default: next = current + 1; break
      }
      this.state.videos[next].playing = true
      this.state.incrementViews(this.state.videos[next].id)
    },
    getPlaylist(id){
      let sendData = {playlistID: id}
      fetch(this.state.baseURL + '/getPlaylistByID.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data.length){
          this.state.activePlaylist=data
        }else{
          console.log('404')
          this.state.error404 = true
        }
      })
    }
  },
  mounted(){
    this.getMode()
    this.getVideos()
    this.state.decToAlpha = this.decToAlpha
    this.state.home = this.home
    this.state.codeHome = this.codeHome
		this.state.playAll = this.playAll
    this.state.formattedDate = this.formattedDate
    this.state.incrementViews = this.incrementViews
    this.state.queueNextVideo = this.queueNextVideo
    this.state.openFullscreen = this.openFullscreen
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
body,html{
  margin: 0;
  overflow-x: hidden;
  font-family: Play;
  background: #000 url(https://lookie.jsbot.net/uploads/7MBow.jpg) no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: 100vw 100vh;
  color: #8fc;
}
#app{
  min-height: 100%;
}
button{
  font-size: 26px;
  background: #4f8;
  color: #012;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
button:focus{
  outline: none;
}
.hidden{
  display: none;
}
.admin{
  cursor: pointer;
  position: fixed;
  margin: 5px;
  border: 2px solid #468;
  left: 0;
  z-index: 10;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 2.5px;
  background-repeat: no-repeat;
  background-size: 40px 40px;
  background-position: center center;
  background-image: url(https://lookie.jsbot.net/uploads/ZSU0m.png);
  background-color: #246;
}
</style>
