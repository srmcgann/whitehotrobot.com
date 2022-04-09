<template>
  <div class="main">
    <div v-if="state.search.string==''">
      <div v-if="state.mode=='user' && state.loaded" class="ircDiv" :class="{'highTop':state.showControls}">
        <div v-if="state.user.ircs.length" class="ircDivInner">
          <Irc v-for="(irc, idx) in state.user.ircs" :key="irc.id" :irc="irc" :idx='idx' :state="state"/>
        </div>
        <div v-else class="e404 ircDivInner">
          <span style="color:#ff0;font-size: 1.5em;">{{state.viewAuthor}}</span><br>
          has no ircs at this time!<br><br>
          <div v-if="state.mode === 'user' && state.viewAuthor.toUpperCase() === state.loggedinUserName.toUpperCase()">
            <button @click="state.createIrc()">create a irc</button>
            <br><br>- or -<br><br>
          </div>
          <button @click="state.goHome()">home page</button>
        </div>
      </div>
      <div v-if="state.mode=='single'" class="ircDiv" :class="{'highTop':state.showControls}">
        <div v-if="state.ircs.length" class="ircDivInner">
          <Irc v-for="(irc, idx) in state.ircs" :key="irc.id" :irc="irc" :idx='idx' :state="state"/>
        </div>
        <div v-else-if="state.loaded" style="font-size: 1.5em;">
          <br><br><br><br><br>OOPS!
          <br><br><br>this irc could not be found!
        </div>
      </div>
      <div v-if="state.mode=='default'" class="ircDiv" :class="{'highTop':state.showControls}">
        <div v-if="filteredIrcs.length" class="ircDivInner">
          <Irc v-for="(irc, idx) in filteredIrcs" :key="irc.id" :irc="irc" :idx='idx' :state="state"/>
        </div>
        <div v-else-if="state.loaded" style="font-size: 1.5em;">
          <br><br><br>OOPS!
          <br>we seem to be missing some ircs!
          <br><br>
          :(<br><br>
          maybe try a different search?
        </div>
      </div>
      <div v-if="state.error404" class="e404">
        <div v-if="state.mode == 'user'">
          we don't know this user!<br><br>
          &quot;{{state.viewAuthor}}&quot;
        </div>
        <div v-else-if="state.mode == 'single'" class="ircDivInner">
          could not find<br>
          irc &quot;{{state.rawIrcID}}&quot;<br><br>
          <div v-if="state.loggedin">
            <button @click="state.createIrc()">create a irc</button>
            <br><br>- or -<br><br>
          </div>
          <button @click="state.goHome()">home page</button>
        </div>
        <div v-else>
          404!
        </div>
      </div>
    </div>
    <div v-else>
      <div class="ircDiv" :class="{'highTop':state.showControls}">
        <div v-if="state.search.ircs.length" class="ircDivInner">
          <Irc v-for="(irc, idx) in state.search.ircs" :key="irc.id" :irc="irc" :idx="idx" :state="state"/>
        </div>
        <div v-if="state.search.inProgress" style="font-size: 2em;" >
          <br><br><br>
          <div style="width: 300px;padding-left: 50px;margin-left: auto; margin-right: auto; text-align: left;">{{searchingText}}</div>
        </div>
        <div v-else-if="!state.search.ircs.length && state.loaded" style="font-size: 1.5em;">
          <br>DRAT!
          <br><br>your search did not return anything!
          <br><br>
          maybe try something more general,<br>like &quot;whitehot robot&quot;
          <br><br><br>
          :(
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Controls from './Controls'
import Irc from './Irc'
export default {
  components:{
    Controls,
    Irc,
  },
  data(){
    return {
      iteration: 0,
      cols: 0,
      e: [],
      titleUpdated: 0,
      URLUpdated: 0,
      spacers: [],
      wraptextareas: false
    }
  },
  name: 'Main',
  props: [ 'state' ],
  computed:{
    filteredIrcs(){
      switch(this.state.mode){
        case 'default':
          return this.state.landingPage.ircs
        break
        case 'user':
          if(this.state.user != null && typeof this.state.user.ircs !== 'undefined'){
            return this.state.user.ircs.filter(v=>!v.private || this.state.loggedinUserName.toUpperCase() == this.state.user.name.toUpperCase() || this.state.isAdmin)
          } else {
            return []
          }
        break
      }
    },
    searchingText(){
      return 'Searching' + ('.'.repeat((this.state.globalT*20|0)%8))
    },
    origin(){
      return window.location.origin
    }
  },
  methods:{
    startStopIrcs(){
      let vtop=0
      let vbottom=window.innerHeight
      let rect
      document.querySelectorAll('.ircIframe').forEach((v,idx)=>{
        rect = v.getBoundingClientRect()
        this.state.inView[idx] = !(((rect.bottom + rect.top) / 2 > vbottom)||((rect.top + rect.bottom) / 2 < 0))
      })
    },
    sync(e){

      let rect

      let l=document.querySelectorAll('.ircItem')
      if(l.length){
        rect = l[l.length-1].getBoundingClientRect()
        if(rect.top < window.innerHeight/2 && this.state.ircs.filter(v=>!v.show).length){
          setTimeout(()=>{
            let s = false
            this.state.ircs.map(v=>{
              if(!v.show && !s) {
                s = v.show = true
                this.state.incrementViews(v.id)
                this.$nextTick(()=>this.applySplitters())
              }
            })
          }, 200)
        }
      }

      document.querySelectorAll('.textareaContainer').forEach(v=>{
        v.style.width = v.clientWidth + 'px'
      })
      document.querySelectorAll('.vidThumb').forEach(v=>{
        v.style.height = (v.clientWidth * .75) + 'px'
      })
      this.spacers.map(v=>{
        if(v[2]){
          v[1].map(q=>{
            switch(q[1]){
              case 'top':
                q[0].style.height = (q[0].clientHeight - (e.clientY - v[3][1])) + 'px'
                if(q[0].clientHeight<10 && q[0].nextSibling !== null && e.movementY>0){
                    q[0].nextSibling.nextSibling.style.height = (q[0].clientHeight - (e.clientY - v[3][1]) + q[0].nextSibling.nextSibling.clientHeight) + 'px'
                }
              break
              case 'bottom':
                q[0].style.height = (q[0].clientHeight + (e.clientY - v[3][1])) + 'px'
                if(q[0].clientHeight<10 && q[0].previousSibling !== null){
                  q[0].previousSibling.previousSibling.style.height = (q[0].clientHeight + (e.clientY - v[3][1]) + q[0].previousSibling.previousSibling.clientHeight) + 'px'
                }
              break
              case 'left':
                rect=q[0].getBoundingClientRect()
                q[0].style.width = Math.min(q[0].parentNode.clientWidth - 24, Math.max(5, rect.right - e.clientX - 2)) + 'px'
                if(q[0].clientWidth<10 && q[0].nextSibling !== null){
                  q[0].nextSibling.nextSibling.style.width = Math.min(q[0].parentNode.clientWidth - 24, Math.max(5, rect.right - e.clientX + q[0].nextSibling.nextSibling.clientWidth)) + 'px'
                }
              break
              case 'right':
                rect=q[0].getBoundingClientRect()
                q[0].style.width = Math.min(q[0].parentNode.clientWidth - 24, Math.max(5, e.clientX - rect.left - 17)) + 'px'
                if(q[0].clientWidth<10 && e.movementX<0){
                  if(q[0].previousSibling !== null){
                    q[0].previousSibling.previousSibling.style.width = Math.min(q[0].parentNode.clientWidth - 24, Math.max(5, e.clientX - rect.left + q[0].previousSibling.previousSibling.clientWidth)) + 'px'
                  }
                }
              break
            }
          })
        }
        if(!v[5])v[0].style.height = v[4].clientHeight + 'px'
      })
      this.spacers.map(m=>{
        m[3][1]=this.e.clientY
        if(!m[5])m[0].style.height = m[4].clientHeight + 'px'
      })
    },
    reset(){
      document.querySelectorAll('.textareaContainer').forEach((v,i)=>{
        switch(this.cols){
          case 0: v.style.height = 'calc(33% - 10px)'; break
          case 1: v.style.height = 'calc(50% - 10px)'; break
          case 2: v.style.height = ''; break
        }
      })
    },
    formattedDate(d){
      let M=['January','February','March','April','May','June','July','August','September','October','November','December']
      var l=new Date(d)
      return M[l.getMonth()] + ' ' + l.getDate() + ', ' + l.getFullYear()// + ' • ' + (l.getHours()%12) + ':' + l.getMinutes() + ' ' + (l.getHours()<12?'AM':'PM')
    },
    applySplitters(){
      let parent
      let spacers = document.querySelectorAll('.spacer')
      if(spacers.length){
        spacers.forEach((v,i)=>{
          v.parentNode.removeChild(v)
        })
      }
      if(typeof (parent = document.querySelectorAll('.textareaCluster')[0]) !== 'undefined'){
        this.startStopIrcs()
        this.spacers = []
        let coords = []
        let el = document.querySelectorAll('.textareaCluster')[0]
        this.wraptextareas = el.clientWidth < 700
        document.querySelectorAll('.textareaCluster').forEach((parent,j)=>{
          coords[j]=Array(parent.childNodes.length).fill().map(v=>[])
          
          let containerWidth = parent.clientWidth
          parent.childNodes.forEach((v,i)=>{
            let rect = v.getBoundingClientRect()
            coords[j][i][0]=rect.left
            coords[j][i][1]=rect.top
            coords[j][i][2]=rect.right
            coords[j][i][3]=rect.bottom
            coords[j][i][4]=v
          })
          this.cols=0
          coords[j].map((v,i)=>{
            let X1,Y1
            if(i){
              X1=coords[j][i-1][0]
              Y1=coords[j][i-1][1]
              let X2=v[0]
              let Y2=v[1]
              let newSpacer = document.createElement('div')
              if(Y1==Y2){
                this.cols++
                newSpacer.className += ' horizontalSpacer spacer'
                this.spacers.push([newSpacer,[],false,[0,0],v[4],0])
                this.spacers[this.spacers.length-1][1].push([coords[j][i-1][4],'right'])
                this.spacers[this.spacers.length-1][1].push([coords[j][i][4],'left'])
                newSpacer.style.height=v[4].clientHeight+'px'
                newSpacer.id = this.spacers.length - 1
                newSpacer.addEventListener('mousedown',e=> {
                  this.spacers[e.srcElement.id][3][0]=e.clientX
                  this.spacers[e.srcElement.id][3][1]=e.clientY
                  this.spacers[e.srcElement.id][2]=true
                  document.querySelectorAll('textarea').forEach(v=>{
                    v.classList.toggle('no-select')
                  })
                })
                parent.insertBefore(newSpacer, v[4])
              }else{
                newSpacer.className += ' verticalSpacer spacer'
                newSpacer.style.width=v[2].clientWidth+'px'
                newSpacer.style.display='inline-block'
                this.spacers.push([newSpacer,[],false,[0,0],v[4],1])
                coords[j].map((q,j)=>{
                  if(q[1]==Y1)this.spacers[this.spacers.length-1][1].push([q[4],'bottom'])
                  if(q[1]==Y2)this.spacers[this.spacers.length-1][1].push([q[4],'top'])
                })
                newSpacer.style.width=v[4].clientWidth+'px'
                newSpacer.id = this.spacers.length - 1
                newSpacer.addEventListener('mousedown',e=>{
                  this.spacers[e.srcElement.id][3][0]=e.clientX
                  this.spacers[e.srcElement.id][3][1]=e.clientY
                  this.spacers[e.srcElement.id][2]=true
                  document.querySelectorAll('textarea').forEach(v=>{
                    v.classList.toggle('no-select')
                  })
                })
                parent.insertBefore(newSpacer, v[4])
              }
            }
          })
        })
      }else{
        setTimeout(()=>{
          this.applySplitters()
        }, 200)
      }
    },
    setEventListeners(){
      if(typeof document.querySelectorAll('.textareaCluster')[0] === 'undefined'){
        setTimeout(()=>{
          this.setEventListeners()
        }, 200)
      } else {
        let els = document.querySelectorAll('.textareaCluster')
        els.forEach(v=>{
          v.addEventListener('move',e=>{
            let rect = v.getBoundingClientRect()
            if(e.buttons==1 && Math.hypot(e.clientX-rect.right, e.clientY-rect.bottom)<40){
              this.reset()
            }
          })
        })
        window.onscroll=()=>{
          this.startStopIrcs()
        }
        window.onresize=()=>{
          let els = document.querySelectorAll('.textareaContainer')
          els.forEach(v=>{
            v.style.height = ''
          })
          this.$nextTick(()=>{
            this.sync()
            this.reset()
            this.applySplitters()
          })
        }
      }
    },
    vidThumb(item){
      let link = item.videoLink
      if(link.substring(link.length-3).toUpperCase() === 'MP4'){
        return item.videoIframeURL
      } else {
        return link ? '//img.youtube.com/vi/' + link.split('/')[link.split('/').length-1] + '/0.jpg' : ''
      }
    },
  },
  mounted(){
    setInterval(()=>{
      this.sync(this.e)
    }, 150)
    setInterval(()=>{
      this.startStopIrcs()
    },1000)
    this.$nextTick(()=>this.applySplitters())
    document.body.addEventListener('mousemove', e=>{
      this.sync(this.e = e)
    })
    document.body.addEventListener('mouseup',e=>{
      document.querySelectorAll('textarea').forEach(v=>{
        v.classList.remove('no-select')
      })
      if(this.spacers.length){
        this.spacers.map(v=>{
          v[2]=false
        })
      }
    })
    this.setEventListeners()
    this.$nextTick(()=>{
      this.reset()
    })
  }
}
</script>

<style>
.main{
}
.embeddedList{
  width: 100%;
  height: calc(100vh - 80px);
}
textarea{
  width: calc(100% - 3px);
  height: calc(100% - 23px);
  font-family: courier;
  background: #0000;
  font-size: 16px;
  border: none;
  resize: none;
  overflow-x: hidden;
  vertical-align: top;
}
.sizedThumb{
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sizedThumbImg{
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
}

.textareaContainer{
  flex-grow: 3;
  background: #001;
  border: 1px solid #3888;
  max-height: 100%;
  max-width: 100%;
}
.textareaCluster{
  margin: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  resize: vertical;
  overflow: auto;
  align-content: stretch;
  align-items: stretch;
  min-height: 200px;
  overflow: hidden;
}
.ircGraphicsCluster{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
textarea:focus{
  outline: none;
}
a{
  color: #8fc;
}
.startVidButton{
  margin-top:0;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 32px;
  min-width: 0;
  padding: 15px;
  transform: translate(-50%,-50%);
  background: #4c6;
  min-height: 0;
  height: auto;
  height: 50px;
  line-height: .5em;
}
.startVidbutton:focus{
  outline: none;
}
.ircHTMLContainer{
  background: #100008b0;
  color: #fff;
}
.ircCSSContainer{
  background: #101000b0;
  color: #fff;
}
.ircJSContainer{
  background: #001020b0;
  color: #fff;
}
.clear{
  clear:both;
}
.vidLinkURL{
  position: absolute;
  left: 5%;
  width: 50%;
  min-width: 200px;
  max-width: 400px;
}
.ircIframeContainer{
  width: calc(50% - 8px);
  min-width: 190px;
  background: #000;
  border: none;
}
.ircIframe{
  border: none;
  width: calc(100% - 10px);
  height: 70%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: block;
}
.vidThumbContainer{
  background: #000;
  width: calc(50% - 8px);
  height: 100%;
  min-width: 206px;
}
.vidThumbImg{
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 50%!important;
  left: 50%;
  transform: translate(-50%, -50%);
}
.vidThumb{
  position: relative; 
  display: block;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 10px);
  min-height: 125px;
}
.textAreaTitle{
  text-align: left;
  border-bottom: 1px solid #3888;
  overflow: hidden;
}
.HTMLtextarea{
  color: #fbb;
}
.CSStextarea{
  color: #ffb;
}
.JStextarea{
  color: #acf;
}
.highTop{
  padding-top: 80px;
}
.landscape{
  width: 50%;
}
.portrait{
  width:100%;
}
.loginTitleButton{
  margin: 0;
  margin-top: 1px;
  margin-left: 20px;
  transform: translatey(-2px);
  border-radius: 5px;
  background: linear-gradient(45deg, #488, #4a6);
  color: #011;
  font-size: 12px;
  padding-top: 1px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 0;
}
.loginTitleButtonContainer{
  display: inline-block;
  float: right;
}
table{
  border-collapse: collapse;
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 20px;
}
td{
  height: 25px;
}
.leftCell{
  text-align: right;
  font-size: 900;
  padding-left: 0px;
  padding-right: 5px;
}
.rightCell{
  padding-left: 10px;
  text-align: left;
  color: #ff0;
}
.disabledTextArea{
  color: #aef;
  background: #000;
}
.avatarContainer{
  display: inline-block;
  min-width: 130px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
}
.avatar{
  max-width: 125px;
  max-height: 125px;
  border-radius: 50%;
}
.horizontalSpacer{
  background-size: 100% 100%;
  background-position: fill;
  background-image: url(https://jsbot.cantelope.org/uploads/1ahi67.png);
  background-repeat: no-repeat;
  cursor: w-resize;
  width: 14px;
  height: 300px;
}
.verticalSpacer{
  background-size: 100% 100%;
  background-image: url(https://jsbot.cantelope.org/uploads/1ld1vc.png);
  background-position: center center;
  background-repeat: no-repeat;
  cursor: s-resize;
  height: 14px;
  width: 300px;
}
.spacer{
}
.no-wrap{
  flex-wrap: nowrap!important;
}
.no-select {
  cursor: default!important;
  -webkit-user-select: none!important;
  -webkit-touch-callout: none!important;
  -khtml-user-select: none!important;
  -moz-user-select: none!important;
  -ms-user-select: none!important;
  -o-user-select: none!important;
  user-select: none!important;
}
.no-select:focus {
  outline: none!important;
}
.e404{
  position: absolute;
  width: 100%;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  font-size: 32px;
}
.ircInput{
  font-size: 16px!important;
  text-align: left!important;
}
.success{
  background: #264!important;
}
.failure{
  background: #622!important;
}
.playPauseButton:focus{
  outline: none;
}
.playPauseButton{
  margin: 0;
  padding: 2px;
  padding-bottom: 4px;
  width: 30px;
  min-width: 30px;
  border-radius: 10px;
  color: #040;
  background: #8e8;
  position: absolute;
  margin-top: -35px;
  margin-left: 85px;
  font-size: 24px;
  line-height: 20px;
  transform: translateX(-50%);
}
.disabledButton{
  color: #888;
  background: #333;
}
.display{
  display: block!important;
}
.forkHistoryOverlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  overflow: auto;
}
.forkHistoryCluster{
  position: absolute;
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
.ircDiv{
  background: transparent;
  text-align: center;
  padding-top:0px;
  margin-top:50px;
  margin-bottom: 200px;
  transition: 0.5s padding-top;
}
</style>
<style>
.highTop{
  padding-top: 160px!important;
}
.footerPadding{
  min-height: calc(100vh + 200px);
}
.ircDivInner{
  text-align: center;
}
</style>
