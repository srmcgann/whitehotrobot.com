<template>
  <div class="main">
    <Header :state="state"/>
    <div v-if="!state.error404" class="mainBody">
      <button style="opacity: 0; display: block; position: fixed;width: 110px; height: 110px;margin-top:70px;z-index: 50;cursor: pointer;" @click="state.home()"></button>
      <button style="opacity: 0; display: block; position: fixed;width: 110px; height: 110px;margin-top:75px;z-index: 50;cursor: pointer;right: calc(50% - 400px);" @click="state.codeHome()"></button>
      <canvas
        ref="console"
        class='consoleAnimation'
        :class="{'hidden': !state.displayConsole}"
      >
      </canvas>
      <div class="mainContent">
        <div v-if="state.mode=='default'" style="width: 675px;margin-left: auto; margin-right:auto;">
          <span v-if="state.playlists.length" style="font-size: 1.2em;color: #ff0a;"><i>choose a playlist</i></span>
          <span v-else style="font-size: 1.2em;color: #ff0a;"><i>there are no playlists!</i></span>
          <br><br>
          <div v-for="playlist in state.playlists" :key="playlist.name">
            <div
              style="margin-top: 10px;margin-bottom: 10px;background:linear-gradient(#0000,#0015,#0015,#0000);padding-top:10px;padding-bottom: 10px;width: 675px;margin-left: auto;margin-right: auto;"
            >
              <table style="width: 675px;">
                <tr>
                  <td class="leftTD" style="text-align: center;">
                    <span style="line-height:1.5em;font-size: 1.1em;color: #ff0;">title<br></span>
                    <span style="font-size: 1.5em; color: #ff0;">&#x201C;</span>
                    <span style="font-size: 1.3em"> {{playlist.name}}</span>
                    <span style="font-size: 1.5em; color: #ff0;">&#x201D;</span><br>
                    <div class="spacerDiv"></div>
                    <i><span class="yellow">users involved</span></i><br>
                    <div
                      style="width: 100%;display: flex; flex-wrap: wrap;justify-content: center;"
                      v-html="filteredUsers(playlist)"
                    >
                    </div>
                    <div class="spacerDiv"></div>
                    <i><div class="yellow" style="line-height: 1.4em">date created<br></div></i>
                    {{state.formattedDate(playlist.date)}}
                    <div class="spacerDiv"></div>
                    <a :href="state.baseURL + '/playlist/' + state.decToAlpha(playlist.id)"
                      class="playButton"
                      style="text-decoration: none;display: inline-block;margin-top: 16px;margin-left: auto;margin-right: auto; position: relative;left: 0;font-size: 24px; padding: 10px;"
                    >
                      launch
                    </a>
                  </td>
                  <td class="rightTD" style="text-align: left;">
                    <div v-if="filteredPlaylistThumbs(playlist)">
                      <div style="display: flex; flex-wrap:wrap; justify-content: space-around;width: 100%;align-items: stretch;">
                        <div v-for="vid in filteredPlaylistThumbs(playlist)" :key="vid" style="width:85px;border: 1px solid #6fc4;margin:3px;margin-left: 2px; margin-right: 2px">
                          <a v-if="vid" :href="state.baseURL + '/video/' + state.decToAlpha(vid.id) " target="_blank">
                            <img :src="vid.videoThumb" class="playlistVidThumb" style="position: relative; top: 50%; transform: translate(0,-50%);vertical-align: initial;">
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="spacerDiv" style="width:675px;margin-left: auto; margin-right: auto;"></div>
          </div>
        </div>
        <div v-else-if="state.mode=='single' && typeof state.videos[0] !== 'undefined'" style="width: 675px;margin-left: auto; margin-right:auto;">
          <span style="font-size: 1.1em;color: #ff0;">video</span><br>
          <span style="font-size: 1.5em; color: #ff0;">&#x201C;</span>
          <span style="font-size: 1.5em"> {{state.videos[0].title}}</span>
          <span style="font-size: 1.5em; color: #ff0;">&#x201D;</span><br>
          <a
            :href="state.baseURL + '/video/' + state.decToAlpha(state.videos[0].id)"
            v-if="state.videos.length"
            class="shareButton"
            target="_blank"
          >
            {{'/video/' + state.decToAlpha(state.videos[0].id)}}
          </a>
          <br><br>
          <div v-for="(video, idx) in state.videos" :key="video.videoLink" style="background:linear-gradient(#0000,#0014,#0014,#0000); width: 675px;margin-left: auto; margin-right: auto;margin-top: 100px;">
            <table style="width: 675px">
              <tr>
                <td class="leftTD" style="text-align: center;line-height: 1.1em">
                  <button
                    class="playButton"
                    style="margin-left: 80px;margin-top: -30px;"
                    @click="playPauseVideo(video)"
                    v-html="video.playing ? 'stop ■' : 'play ►'"
                  ></button>
                  <div class="spacerDiv"></div>
                  <div v-if="video.title">
                    <span class="yellow" style="font-size: 1.1em;">title<br></span>
                    <span style="font-size: 1.5em; color: #ff0;">&#x201C;</span>
                    <span style="font-size: .9em;">{{video.title}}</span>
                    <span style="font-size: 1.5em; color: #ff0;">&#x201D;</span><br>
                  </div>
                  <div v-else>
                    <span class="yellow"><i>untitled</i></span><br>
                  </div>
                  <div class="spacerDiv"></div>
                  <span class="yellow">User:&nbsp;</span>
                  {{video.author}}<br>
                  <a :href="state.baseURL + '/user/' + video.author" class="videoShareLink">videos</a>
                  <a :href="state.baseDemoURL + '/u/' + video.author" class="demoShareLink">demos</a><br>
                  <div class="spacerDiv"></div>
                  <button v-if="video.playing" @click="fullscreen('#videoElement'+idx)" class="fullscreenButton" style="margin-top: -2px;">fullscreen</button>
                  <span class="yellow">Views:&nbsp;</span>{{video.videoViews}}<br>
                  <div class="spacerDiv"></div>
                  <span class="yellow">share video</span>
                  <a
                    :href="state.baseURL + '/video/' + state.decToAlpha(video.id)"
                    v-if="state.videos.length"
                    class="shareButton"
                    target="_blank"
                    style="display: inline-block;position:relative;margin-top:0px;padding-top:0;padding-bottom: 0;vertical-align:top;"
                  >
                    {{'/video/' + state.decToAlpha(video.id)}}
                  </a>
                </td>
                <td class="rightTD">
                  <div
                    class="videoThumbContainer"
                  >
                    <img
                      v-if="!video.playing"
                      @click="playPauseVideo(video)"
                      :src="video.videoThumb"
                      class="videoThumb"
                    >
                    <div v-else>
                      <div
                        :id="'videoElement'+idx"
                        v-if="getEmbedURL(video, idx)"
                        class="videoElement"
                        :ref="'videoElement' + idx"
                      ></div>
                      <video
                        v-else
                        :src="video.videoLink"
                        :id="'videoElement' + idx"
                        class="videoElement"
                        autoplay="true"
                        controls="true"
                        @ended="state.queueNextVideo()"
                      ></video>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <div class="spacerDiv" style="width: 700px;margin: 5px;margin-bottom: 10px;;margin-left: auto; margin-right: auto;margin-top: 0;"></div>
          </div>
        </div>
        <div v-else-if="state.mode=='user'" style="width: 675px;margin-left: auto; margin-right:auto;">
          <span style="font-size: 1.1em;color: #ff0;">user</span><br>
          <span style="font-size: 1.5em; color: #ff0;">&#x201C;</span>
          <span style="font-size: 1.5em"> {{state.userName}}</span>
          <span style="font-size: 1.5em; color: #ff0;">&#x201D;</span><br>
          <button v-if="state.videos.length" class="playAllButton" @click="state.playAll()">play from beginning</button>
          <a
            :href="state.baseURL + '/user/' + state.userName"
            v-if="state.videos.length"
            class="shareButton"
            target="_blank"
          >
            {{'/user/' + state.userName}}
          </a>
          <br><br>
          <div v-for="(video, idx) in state.videos" :key="video.videoLink" style="background:linear-gradient(#0000,#0014,#0014,#0000); width: 675px;margin-left: auto; margin-right: auto;">
            <table style="width: 675px">
              <tr>
                <td class="leftTD">
                  <i><div class="yellow" style="display: block;margin: 0;margin-left: 80px;text-align: center;">Track <span style="font-size: 1.5em; color: #0f0;">{{idx+1}}</span></div></i>
                  <button
                    class="playButton"
                    @click="playPauseVideo(video)"
                    v-html="video.playing ? 'stop ■' : 'play ►'"
                  ></button>
                  <div class="spacerDiv"></div>
                  <div v-if="video.title">
                    <span class="yellow">Title:&nbsp;</span>{{video.title}}<br>
                  </div>
                  <div v-else>
                    <span class="yellow"><i>untitled</i></span><br>
                  </div>
                  <div class="spacerDiv"></div>
                  <span class="yellow">User:&nbsp;</span>
                  {{video.author}}<br>
                  <a :href="state.baseURL + '/user/' + video.author" class="videoShareLink">videos</a>
                  <a :href="state.baseDemoURL + '/u/' + video.author" class="demoShareLink">demos</a><br>
                  <div class="spacerDiv"></div>
                  <button v-if="video.playing" @click="fullscreen('#videoElement'+idx)" class="fullscreenButton">fullscreen</button>
                  <span class="yellow">Views:&nbsp;</span>{{video.videoViews}}<br>
                  <div class="spacerDiv"></div>
                  <span class="yellow">share video</span>
                  <a
                    :href="state.baseURL + '/video/' + state.decToAlpha(video.id)"
                    v-if="state.videos.length"
                    class="shareButton"
                    target="_blank"
                    style="display: inline-block;position:relative;margin-top:-2px;padding-top:0;padding-bottom: 0;vertical-align:top;"
                  >
                    {{'/video/' + state.decToAlpha(video.id)}}
                  </a>
                </td>
                <td class="rightTD">
                  <div
                    class="videoThumbContainer"
                  >
                    <img
                      v-if="!video.playing"
                      @click="playPauseVideo(video)"
                      :src="video.videoThumb"
                      class="videoThumb"
                    >
                    <div v-else>
                      <div
                        :id="'videoElement'+idx"
                        v-if="getEmbedURL(video, idx)"
                        class="videoElement"
                        :ref="'videoElement' + idx"
                      ></div>
                      <video
                        v-else
                        :src="video.videoLink"
                        :id="'videoElement' + idx"
                        class="videoElement"
                        autoplay="true"
                        controls="true"
                        @ended="state.queueNextVideo()"
                      ></video>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <div class="spacerDiv" style="width: 700px;margin: 5px;margin-bottom: 10px;;margin-left: auto; margin-right: auto;"></div>
          </div>
        </div>
        <div v-else-if="state.mode=='playlist'" style="width: 675px;margin-left: auto; margin-right:auto;">
          <span style="font-size: 1.1em;color: #ff0;">playlist name</span><br>
          <span style="font-size: 1.5em; color: #ff0;">&#x201C;</span>
          <span style="font-size: 1.5em"> {{state.playlist.name}}</span>
          <span style="font-size: 1.5em; color: #ff0;">&#x201D;</span><br>
          <button v-if="state.videos.length" class="playAllButton" @click="state.playAll()">play from beginning</button>
          <a
            :href="state.baseURL + '/playlist/' + state.playlistID"
            v-if="state.videos.length"
            class="shareButton"
            target="_blank"
          >
            {{'/playlist/' + state.playlistID}}
          </a>
          <br><br>
          <div v-for="(video, idx) in state.videos" :key="video.videoLink" style="background:linear-gradient(#0000,#0014,#0014,#0000);width:675px;margin-left: auto; margin-right: auto;">
            <table style="width: 675px;">
              <tr>
                <td class="leftTD">
                  <i><div class="yellow" style="display: block;margin: 0;margin-left: 80px;text-align: center;">Track <span style="font-size: 1.5em; color: #0f0;">{{idx+1}}</span></div></i>
                  <button
                    class="playButton"
                    @click="playPauseVideo(video)"
                    v-html="video.playing ? 'stop ■' : 'play ►'"
                  ></button>
                  <div class="spacerDiv"></div>
                  <div v-if="video.title">
                    <span class="yellow">Title:&nbsp;</span>{{video.title}}<br>
                  </div>
                  <div v-else>
                    <span class="yellow"><i>untitled</i></span><br>
                  </div>
                  <div class="spacerDiv"></div>
                  <span class="yellow">User:&nbsp;</span>
                  {{video.author}}<br>
                  <a :href="state.baseURL + '/user/' + video.author" class="videoShareLink">videos</a>
                  <a :href="state.baseDemoURL + '/u/' + video.author" class="demoShareLink">demos</a><br>
                  <div class="spacerDiv"></div>
                  <button v-if="video.playing" @click="fullscreen('#videoElement'+idx)" class="fullscreenButton">fullscreen</button>
                  <span class="yellow">Views:&nbsp;</span>{{video.videoViews}}<br>
                  <div class="spacerDiv"></div>
                  <span class="yellow">share video</span>
                  <a
                    :href="state.baseURL + '/video/' + state.decToAlpha(video.id)"
                    v-if="state.videos.length"
                    class="shareButton"
                    target="_blank"
                    style="display: inline-block;position:relative;margin-top:-2px;padding-top:0;padding-bottom: 0;vertical-align:top;"
                  >
                    {{'/video/' + state.decToAlpha(video.id)}}
                  </a>
                </td>
                <td class="rightTD">
                  <div
                    class="videoThumbContainer"
                  >
                    <img
                      v-if="!video.playing"
                      @click="playPauseVideo(video)"
                      :src="video.videoThumb"
                      class="videoThumb"
                    >
                    <div v-else>
                      <div
                        :id="'videoElement'+idx"
                        v-if="getEmbedURL(video, idx)"
                        class="videoElement"
                        :ref="'videoElement' + idx"
                      ></div>
                      <video
                        v-else
                        :src="video.videoLink"
                        :id="'videoElement' + idx"
                        class="videoElement"
                        autoplay="true"
                        controls="true"
                        @ended="state.queueNextVideo()"
                      ></video>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <div class="spacerDiv" style="width: 700px;margin: 5px;margin-bottom: 10px;;margin-left: auto; margin-right: auto;"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="e404">
        {{e404Text}}
        <br><br>
        <button @click="state.home()">go home</button><br><br>
        <span style="font-size: 32px;">404!</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
export default {
  components:{
    Header
  },
  name: 'Main',
  props: [ 'state' ],
  data(){
    return {
      console: null,
      ctx: null,
      S: Math.sin,
      C: Math.cos,
      t:0,
      YTplayer: null,
      videoID: -1,
      consoleBGImg: null,
			bracketsImg: null
    }
  },
  computed:{
    e404Text(){
      let ret = ''
      switch(this.state.mode){
        case 'playlist':
          ret = 'this playlist could not be found'
        break;
        case 'user':
          ret = 'this user does not exist, or has no videos!'
        break;
        case 'single':
          ret = 'this video could not be found'
        break;
        case 'default':
          ret = ''
        break;
      }
      return ret
    }
  },
  methods:{
    filteredUsers(playlist){
        if(typeof playlist !== 'undefined' && this.state.users.length){
          return [...JSON.parse(playlist.user_ids)].map(v=>this.state.users.filter(q=>+q.id==+v)[0].name).map(v=>{
            return '<a class="shareButton" style="display: block; padding:3px;padding-bottom: 5px;padding-left:8px;padding-right:8px;margin:2px;margin-top: 5px;font-size: 18px;" href="' + this.state.baseURL + '/user/' + v + '" target="_blank">' + v + '</a>'
          }).join('')
        } else {
          return []
        }
    },
    filteredPlaylistThumbs(playlist){
      if(typeof playlist !== 'undefined'){
        let a =JSON.parse(playlist.item_ids)
        if(a.length){
          return a.map(v=>{
            return this.state.videos.filter(q=>{
              return +q.id==+v
            })[0]
          })
        } else {
          return false
        }
      }
      return false
    },
    loadYTPlayer(item, idx){
      setTimeout(()=>{
        if(typeof window.YT === 'undefined'){
          this.loadYTPlayer(item, idx)
        } else {
          this.YTplayer = new window.YT.Player('videoElement' + idx, {
            height: '390',
            width: '640',
            videoId: this.videoID,
            events: {
              'onReady': this.YTonReady,
              'onStateChange': this.YTonStateChange
            }
          })
        }
      }, 200)
    },
    fullscreen(id){
      let elem = document.querySelector(id)
      this.state.openFullscreen(elem)
    },
    YTonStateChange(e){
      if (e.data == window.YT.PlayerState.ENDED) {
        this.state.queueNextVideo()
      }
    },
    YTonReady(e){
      e.target.playVideo()
    },
    getEmbedURL(item, idx){
      if(item.videoLink.indexOf('youtu')!==-1){
				let l=''
        if((l=item.videoLink.split('?')).length){
          l=l.filter(v=>v.indexOf('v=')!==-1)
          if(l.length) l=l[l.length-1].split('v=')[1].split('&')[0]
        }
        if(!l || !l[0]){
          l=item.videoLink.split('/')
          l=l[l.length-1]
        }
        //return l ? 'https://www.youtube.com/embed/' + l + '?autoplay=1': ''
        this.videoID = l ? l : ''
			} else {
        this.videoID = -1
      }
      if(this.videoID !== -1){
        this.$nextTick(()=>{
          this.loadYTPlayer(item, idx)
        })
        return true
      }
    },
    playPauseVideo(video){
      if(video.playing){
        video.playing = false
      } else {
        this.state.videos.map(v=>v.playing=false)
        this.videoID = -1
        video.playing = true
				this.state.incrementViews(video.id)
      }
    },
    Draw(){
      
      let x = this.ctx
      let c = this.console
      let t = this.t
      let S = this.S
      let C = this.C
      let X=0,p=0,A=0,d=0,H=0,M=0,w=0,s=0
      let Y=0
      let Z=0
      let tx=0
      let ty=0
      let tz=0
      if(!this.t){
        this.consoleBGImg = new Image()
        this.consoleBGImg.src = 'https://lookie.jsbot.net/uploads/gmMHe.png'
				this.bracketsImg = new Image()
				this.bracketsImg.src = 'https://lookie.jsbot.net/uploads/1Tofda.png'
      }

      var R=(Rl,Pt,Yw,o)=>{
        X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d
        if(o)X+=oX,Y+=oY,Z+=oZ
      }
      var Q=()=>[50+X/Z*600,50+Y/Z*600]

      x.clearRect(0,0,w=c.width,w)
      x.globalAlpha = .25
      x.drawImage(this.consoleBGImg,24,24,464,464)
      x.globalAlpha=.6
			x.drawImage(this.bracketsImg, 437, 20, 50,70)
			x.globalAlpha = .14+S(t*4)/16
      
      let Rl=-t*2
      let Pt=0
      let Yw=0
      let oX=0, oY=0, oZ=60

      let P=Array(6).fill().map((v,i)=>{
        X=S(p=Math.PI*2/6*i+Math.PI/6)
        Y=C(p)
        Z=0
        return [X,Y,Z]
      })
      let ls=1.6
      let B=Array(6).fill().map((v,i)=>{
        let q=Math.PI*2/6*i-t*8
        s=ls*(1+(1+S(q)/2)*(1+S(t*1.5))/3)
        X=S(p=Math.PI*2/6*i)*s
        Y=C(p)*s
        Z=S(p+i+t*4)/2*S(t*2)
        //R(0,-t/2+i,t+i)
        return [X,Y,Z,[...P]]
      })
      B=[...B,[0,0,0,[...P]]]
      
      x.lineJoin=x.lineCap='round'
      
      B.map(v=>{
        tx=v[0]
        ty=v[1]
        tz=v[2]
        x.beginPath()
        v[3].map(q=>{
          X=tx+q[0]
          Y=ty+q[1]
          Z=tz+q[2]
          R(Rl,Pt,Yw,1)
          x.lineTo(...Q())
        })
        x.closePath()
        x.lineWidth=140/Z
        x.strokeStyle='#4bcf'
        x.fillStyle='#2cff'
        x.fill()
        x.stroke()
      })
      
      this.t += 1/60
      requestAnimationFrame(this.Draw)
    },
    initConsole(){
      this.console = this.$refs.console
      this.ctx = this.console.getContext('2d')
      this.console.width = this.console.height = 512
      this.Draw()
    }
  },
  mounted(){
    var tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    this.$nextTick(()=>this.initConsole())
  }
}
</script>

<style>
.main{
  text-align: center;
  background: linear-gradient(135deg, #0000, #023);
  min-height: 100vh;
  left: 0;
  top: 0;
  width: 100%;
}

.mainBody{
  font-size: 24px;
  padding-top: 10px;
  left: 0;
  top: 0;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 100px;
}
.videoThumbContainer{
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  margin: 0;
}
.e404{
  padding-top: 100px;
  font-size: 24px;
}
.playlistVidThumb{
  width: 100%;
  vertical-align: top;
}
.videoThumb{
  cursor: pointer;
  max-width: 350px;
  border-radius: 50%;
}
table{
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 120px);
}
.mainContent{
	width: 675px;
	margin-left: auto;
	margin-right: auto;
  position: relative;
  margin-top: 100px;
  text-align: center;
  z-index: 20;
}
.spacerDiv{
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #0000, #4dd8, #0000);
  margin-top: .3em;
  margin-bottom: .3em;
}
td{
  border: none;
  font-size: .9em;
}
hr{
  border: 1px solid #1fe3;
  height: 0;
  line-height: 0;
  padding: 0;
  margin: 0;
  margin-top: .5em;
  margin-bottom: .5em;
}
.leftTD{
  text-align: right;
  padding-right: 15px;
  width: 300px;
  line-height: .8em;
}
.rightTD{
  text-align: center;
  width: 400px;
}
.yellow{
  color: #ff0;
}
.consoleAnimation{
  width: 850px;
  height: 850px;
  top:50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  position: fixed;
  z-index: 0;
  transform: translatex(-50%);
}
.playButton{
  position: absolute;
  font-size: 18px;
  border-radius: 5px;
  margin: 0;
  margin-top: -22px;
  left: 15px;
  width: 100px;
  background: linear-gradient(45deg, #2a28, #034);
  color: #afd;
  padding: 1px;
  padding-left: 10px;
  padding-right: 5px;
  padding-bottom: 2px;
  border: 1px solid #4684;
}
.clear{
  clear: both;
}
.videoShareLink, .demoShareLink{
  font-size: 14px;
  border-radius: 5px;
  font-weight: 900;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 0;
  text-decoration: none;
  display: inline-block;
  min-width: 50px;
  text-align: center;
  margin-left:5px;
}
.videoShareLink{
  background: #6bf;
}
.demoShareLink{
  background: #f84;
}
.videoElement{
  max-width: 350px;
  height: 200px;
  border-radius: 0;
  border: 1px solid #4568;
}
.fullscreenButton{
  font-size: 18px;
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 15px;
  margin-top: -4px;
  padding: 0;
  background: #147;
  color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  border: 1px solid #4688;
  float: left;
  width: 100px;
}
.shareButton{
  background: #840;
  margin: 10px;
  margin-top: 10px;
  font-size: 13px;
  border-radius: 6px;
  font-weight: 500;
  padding: 8px;
  padding-top: 3px;
  padding-bottom: 3px;
  border: 1px solid #ff03;
  color: #ff8;
  text-decoration: none;
}
.playAllButton{
  margin: 10px;
  margin-top: 10px;
  font-size: 13px;
  border-radius: 6px;
  background: #145;
  font-weight: 500;
  padding: 8px;
  padding-top: 3px;
  padding-bottom: 3px;
  border: 1px solid #8fe3;
  color: #cfe;
}
</style>
