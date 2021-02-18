<template>
  <div class="main">
    <Header :state="state"/>
    <div v-if="!state.createButtonEnabled"
      style="position: fixed; top:0; left: 0; width: 100%; height: 100%; z-index: 1000;background: #123d;">
      <div style="position: relative;top: 50%;font-size: 42px;transform: translate(0,-50%);">
        Please wait<br>this takes just a moment...
        <br>
        <img src="https://lookie.jsbot.net/uploads/14F97E.png" style="width: 80px;">
        <br>
        <div v-if="!state.user.pages.length" style="font-size: .6em;">if this is your first page, there is a<br>lot of stuff going on behind the scenes!</div>
      </div>
    </div>
    <div class="mainBody" v-if="state.loaded">
      <div v-if="state.showUserPages && this.state.user !== null">
        <div v-if="personal">
          <br>Welcome,<br><span style="font-size: 1.5em; color: #ff0;">{{state.loggedinUserName}}</span>!<br>
          <div v-if="!(state.user.pages.length || state.pages.length)">
            <br><br><br>
          </div>
          <button :disabled="!state.createButtonEnabled" @click="state.createPage(state.user)" class="createPageButton">create<br>page</button>
          <button
            @click="goHome()"
            style="position: absolute;margin-left: -350px;font-size: 16px;min-width: 40px;"
          >
            home
          </button>
          <div style="position: absolute; left: calc(50% + 250px); margin-top: -60px;transform: translate(-50%,-50%)">
            <img
              class="avatar"
              style="cursor: pointer"
              @click="state.showUserSettings()"
              :src="state.user !== null && state.user.avatar || 'https://lookie.jsbot.net/uploads/1pnBdc.png'">
          </div>
        </div>
        <div v-else>
          <button
            @click="goHome()"
            style="position: absolute;margin-left: -350px;font-size: 16px;min-width: 40px;margin-top:50px"
          >
            home
          </button>
          <br><span style="font-size: 1.5em; color: #ff0;">{{state.user !== null ? state.user.name : ''}}</span>'s pages....<br>
          <br>
          <div style="position: absolute; left: calc(50% + 250px); margin-top: 10px;transform: translate(-50%,-50%)">
            <img class="avatar" :src="state.user !== null && state.user.avatar || 'https://lookie.jsbot.net/uploads/1pnBdc.png'">
          </div>
        </div>
        <div v-if="state.user !== null && state.user.pages.length || state.pages.length">
          <div v-for="(page, idx) in filteredPages" class="pageItem">
            <div style="position: absolute;">
              slug <a :href="buildPageURL(page)" target="_blank" class="pageLinkShort">{{state.decToAlpha(page.id)}}</a>
            </div>
            <button v-if="personal || state.isAdmin" @click="state.deletePage(page.id)" class="deletePageButton"></button>            
            <table>
              <tr>
                <td class="leftTD">
                  URL
                </td>
                <td class="rightTD">
                  <a :href="buildPageURL(page)" target="_blank" class="sharePageLink">{{buildPageURL(page)}}</a>
                </td>
              </tr>
              <tr>
                <td class="leftTD">
                  views
                </td>
                <td class="rightTD">
                  {{page.views}}
                </td>
              </tr>
              <tr>
                <td class="leftTD">
                  title
                </td>
                <td class="rightTD">
                  <input
                    type="text"
                    maxlength="30"
                    @click="$event.target.select()"
                    v-model="page.title"
                    :disabled = "!personal && !state.isAdmin"
                    class="input pageInput"
                    :class="{'success':updated['title']==1,'failure':updated['title']==-1}"
                    @input="updatePageItem(page.id, 'title')"
                  >
                </td>
              </tr>
              <tr>
                <td class="leftTD">
                  <img v-if="page.favicon" :src="page.favicon" class="faviconPreview">
                  favicon
                </td>
                <td class="rightTD">
                  <input
                    type="text"
                    maxlength="2048"
                    @click="$event.target.select()"
                    v-model="page.favicon"
                    :disabled = "!personal && !state.isAdmin"
                    class="input pageInput"
                    :class="{'success':updated['favicon']==1,'failure':updated['favicon']==-1}"
                    @input="updatePageItem(page.id, 'favicon')"
                  >
                </td>
              </tr>
            </table>
            <br>
            <button
              class="fullScreenButton"
              @click="fullScreen(item.id)"
             >full-screen</button>
            <iframe
              :ref="'iframe'+idx"
              class="pageIframe"
              :src="state.inView[idx] ? buildPageURL(page)+'?v='+iteration : ''"
              sandbox="allow-same-origin allow-scripts"
              allowfullscreen
            ></iframe><br>

            <div class="textareaCluster" :class="{'no-wrap': !wraptextareas}" :key="'textareaCluster'+page.id">
              <div class='pageHTMLContainer textareaContainer' :key="'HTMLContainer'+page.id">
                <div class="textAreaTitle no-select">
                  HTML
                  <div v-if="!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                    <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
                  </div>
                </div>
                <textarea
                  spellcheck = "false"
                  v-html="page.pageHTML"
                  @input="update(page.id)"
                  :ref="'HTML' + page.id"
                  :class="{'HTMLtextarea': state.isAdmin || state.loggedin && page.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)}"
                  :disabled="0&&!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)"
                ></textarea>
              </div>
              <div class='pageCSSContainer textareaContainer' :key="'CSSContainer'+page.id">
                <div class="textAreaTitle no-select">
                  CSS
                  <div v-if="!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                    <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
                  </div>
                </div>
                <textarea
                  spellcheck = "false"
                  v-html="page.pageCSS"
                  @input="update(page.id)"
                  :ref="'CSS' + page.id"
                  :class="{'CSStextarea': state.isAdmin || state.loggedin && page.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)}"
                  :disabled="0&&!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)"
                ></textarea>
              </div>
              <div class='pageJSContainer textareaContainer' :key="'JSContainer'+page.id">
                <div class="textAreaTitle no-select">
                  JS
                  <div v-if="!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                    <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
                  </div>
                </div>
                <textarea
                  spellcheck = "false"
                  v-html="page.pageJS"
                  @input="update(page.id)"
                  :ref="'JS' + page.id"
                  :class="{'JStextarea': state.isAdmin || state.loggedin && page.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)}"
                  :disabled="0&&!(state.isAdmin || state.loggedin && page.userID === state.loggedinUserID)"
                ></textarea>
              </div>
            </div>

          </div>
        </div>
        <div v-else>
          <br><br><br>
          <div v-if="state.loggedin && state.user.name == state.loggedinUserName">
            <span style="font-size: 1.5em;">You have no pages...</span><br>
            <span style="font-size: .6em">Your pages will appear here when you create some...</span>
          </div>
          <div v-else>
            <span style="font-size: 1.5em;">This user has no pages yet...</span><br><br>
            <div style="font-size: .7em;line-height: 1.6em;">Maybe they need a little encouragement to create some...</div>
          </div>
          <br>
        </div>
      </div>
      <div v-else-if="state.mode==='browse'">
        <br>
        <div v-for="user in state.userShowcase" :key="user.name" style="width: 400px;margin-top: 10px;margin-left: auto; margin-right: auto;text-align: left;">
            &bull; <a :href="origin + '/u/' + user.escaped_name" target="_blank">{{user.name}}</a> ({{user.pages.length}} page{{user.pages.length>1?'s':''}})
        </div>
        <br><br><br>
      </div>
      <div v-else class="introContainer">
        <div v-if="state.loggedin">
          <br>Welcome,<span style="font-size: 1em; color: #ff0;">{{state.loggedinUserName}}</span>!<br>
          <button
            @click="state.launchUserPage()"
            class="bigButton"
            style="background: linear-gradient(-45deg, #f00, #0000);color: #f80;font-size: 24px;"
           >
            access your pages
          </button><br>
        </div>
        <span style="font-size: .7em;">welcome to the <i><a :href="state.baseURL" target="_blank" style="text-decoration: none;color: #8ff!important;background: #2a88;padding-left: 6px; padding-right: 10px;font-size: 1.25em;border-radius: 8px;padding-top:0px; padding-bottom: 2px;">whitehot robot</a></i></span><br>
        <span style="color: #ff0; font-size: 1.5em;font-weight: 900;">productivity suite</span><br>
        <span style="font-size: 1.33em">registration is <span style="color: red;">FREE</span></span><br>
        <span style="font-size: 1.64em">and <span style="color: #2cf">anonymous</span></span><br>
        <div class="spacerDiv"></div>
        <button
          @click="toggleLogin()"
          class="bigButton"
          style="background:linear-gradient(-45deg, #80f, #0000);color: #f88"
        >
          l&nbsp;&nbsp;o&nbsp;&nbsp;g&nbsp;&nbsp;i&nbsp;&nbsp;n
        </button>
        <button @click="register()" class="bigButton">r e g i s t e r</button>
        <div class="spacerDiv"></div>        
        <button @click="launchDemos()" class="bigButton" style="background: linear-gradient(-45deg, #0f8, #0000);color: #8ff;font-size: 24px;">
          browse user demos
        </button><br>
        <button @click="launchPages()" class="bigButton" style="background: linear-gradient(-45deg, #ff0, #0000);color: #ffa;font-size: 24px;">
          browse user pages
        </button><br>
        <button @click="launchVideos()" class="bigButton" style="background: linear-gradient(-45deg, #f80, #0000);color: #ff0;font-size: 24px;">
          browse user videos
        </button><br>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
export default {
  components:{
    Header,
  },
  data(){
    return {
      cols: 0,
      e: null,
      updated:{
        title: 0,
        favicon: 0
      },
      spacers: [],
      iteration: 0,
      wraptextareas: false
    }
  },
  name: 'Main',
  props: [ 'state' ],
  computed:{
    personal(){
      return this.state.user !== null && (typeof this.state.loggedinUserName !== 'undefined') && this.state.loggedinUserName===this.state.user.name 
    },
    origin(){
      return window.location.origin
    },
    filteredPages(){
      return this.state.user === null ? this.state.pages.filter(v=>v.show) : this.state.user.pages.filter(v=>v.show)
    }
  },
  watch:{
    'state.startStopPages'(val){
      this.startStopPages()
      this.state.startStopPages = false
      this.sync(this.e)
      this.reset()
      this.applySplitters()
    }
  },
  methods:{
    goHome(){
      window.location.href = window.location.origin
    },
    toggleLogin(){
      if(!this.state.loggedin) this.state.showLoginPrompt()
    },
    buildPageURL(page){
      if(!page || typeof page === 'undefined') return ''
      return this.state.baseProtocol + '://' + page.escaped_name.replaceAll("'",'') + '.' + this.state.baseUserDomain + '/' + this.state.decToAlpha(page.id)
    },
    launchVideos(){
      let d = document.createElement('a')
      d.setAttribute('target', '_blank')
      d.setAttribute('href', this.state.baseVideoURL)
      d.click()
    },
    launchDemos(){
      let d = document.createElement('a')
      d.setAttribute('target', '_blank')
      d.setAttribute('href', this.state.baseDemoURL)
      d.click()
    },
    launchPages(){
      window.location.href = window.location.origin + '/browse'
    },
    register(){
      this.state.showRegister = true;
      this.state.showLoginPrompt()
    },
    updatePageItem(pageID, item){
      let sendData = {
        userName: this.state.loggedinUserName,
        item,
        newItemVal: this.state.user === null ? this.state.pages.filter(v=>v.id==pageID)[0][item] : this.state.user.pages.filter(v=>v.id==pageID)[0][item],
        passhash: this.state.passhash,
        pageID: pageID
      }
      fetch(this.state.baseURL + '/updatePageItem.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data[0]){
          this.updated[item] = 1
          setTimeout(()=>this.updated[item] = 0, 1000)
        } else {
          this.updated[item] = -1
          setTimeout(()=>this.updated[item] = 0, 1000)
        }
      })
    },
    fullScreen(id){
      this.state.openFullscreen(this.$refs['iframe'+id])
    },
    startStopPages(){
      let vtop=0
      let vbottom=window.innerHeight
      let rect
      document.querySelectorAll('.pageIframe').forEach((v,idx)=>{
        rect = v.getBoundingClientRect()
        this.state.inView[idx] = !(((rect.bottom + rect.top) / 2 > vbottom)||((rect.top + rect.bottom) / 2 < 0))
      })
    },
    sync(e){
      if(e===null || (!this.state.pages.length && (this.state.user === null || !this.state.user.pages.length))) return
      let rect
      let pages = this.user === null ? this.state.pages : this.state.user.pages
      let l=document.querySelectorAll('.pageItem')
      if(l.length){
        rect = l[l.length-1].getBoundingClientRect()
        if(rect.top < window.innerHeight/2 && pages.filter(v=>!v.show).length){
          setTimeout(()=>{
            let s = false
            pages.map(v=>{
              if(!v.show && !s) {
                s = v.show = true
                //this.state.incrementViews(v.id)
                this.$nextTick(()=>this.applySplitters())
              }
            })
          }, 200)
        }
      }

      document.querySelectorAll('.textareaContainer').forEach(v=>{
        v.style.width = v.clientWidth + 'px'
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
        this.startStopPages()
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
          this.startStopPages()
        }
        window.onresize=()=>{
          let els = document.querySelectorAll('.textareaContainer')
          els.forEach(v=>{
            v.style.height = ''
          })
          this.$nextTick(()=>{
            this.sync(this.e)
            this.reset()
            this.applySplitters()
          })
        }
      }
    },
    update(id){
      if(this.state.loggedin){
        let pageHTML = this.$refs['HTML' + id].value
        let pageCSS = this.$refs['CSS' + id].value
        let pageJS = this.$refs['JS' + id].value
        let sendData = {pageHTML, pageCSS, pageJS, pageID: id, userName: this.state.loggedinUserName, passhash: this.state.passhash}
        fetch(this.state.baseURL + '/updatePage.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          this.iteration++
        })
      }
    }    
  },
  mounted(){
    setInterval(()=>this.sync(this.e), 150)
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
  text-align: center;
}
button:focus{
}
.pageIframe{
  width:640px;
  height: 360px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #4688;
  width: 100%;
}
.sharePageLink{
  font-size: 14px;
  background: #4080;
  color: #82f!important;
  font-weight: 200;
  text-decoration: underline;
  padding-bottom: 5px;
  padding-top: 5px;
}
.bigButton{
  border-radius: 12px;
  font-size: 32px;
  background: linear-gradient(-45deg, #08f, #0000);
  border:1px solid #fff8;
  border-left: 0;
  border-top: 0;
  color: #6af;
  min-width:280px;
  padding-bottom: .3em;
  text-shadow: 2px 2px 4px #000
}
.faviconPreview{
  position: relative;
  margin-left: 10px;
  margin-bottom: -10px;
  border: 1px solid #4680;
  max-width: 30px;
  max-height: 30px;
}
.introContainer{
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top:50%; left: 50%;
  transform: translate(-50%,-50%)
}
.createPageButton{
  padding-left: 45px;
  font-size: 24px;
  line-height: .8em;
  min-width: 50px!important;
  background: #4f8 url(https://lookie.jsbot.net/uploads/hLu7v.png) no-repeat;
  height: 55px;
  background-size: 40px 40px;
  background-position: 5px center;
}
table{
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
.leftTD{
  width: 150px;
  height: 30px;
  font-size: 18px;
  padding-right: 10px;
  text-align: right;
}
.rightTD{
  text-align: left;
}
.mainBody{
  position: relative;
  margin-top: 0px;
  line-height: 1.2em;
  min-width: 700px;
  min-height: calc(100vh - 80px);
  width: 100%;
  padding-top: 50px;
  margin-left: auto;
  margin-right: auto;
  font-size: 24px;
}
a{
  color: #8fc;
}
.deletePageButton{
  background: #f880;
  position: absolute;
  right: 38px;
  color: #300;
  font-weight: 900;
  font-size: 16px;
  float:right;
  margin-top: -12px;
  margin-right: -10px;
  border-radius: 50%;
  width: 45px;
  min-width: 0;
  height: 45px;
  background-image: url(https://lookie.jsbot.net/uploads/XeGsK.png);
  background-position: center center;
  background-size: 40px 40px;
  background-repeat: no-repeat;
  padding:25px!important;
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
textarea:focus{
  outline: none;
}
.pageHTMLContainer{
  background: #100008b0;
  color: #fff;
}
.pageCSSContainer{
  background: #101000b0;
  color: #fff;
}
.pageJSContainer{
  background: #001020b0;
  color: #fff;
}
.clear{
  clear:both;
}
.pageItem{
  margin-top: 30px;
  margin-bottom: 100px;
  border-radius: 0px;
  width: calc(100% - 80px);
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border-radius: 0px;
  background: linear-gradient(#012a, #234a);
  border: 1px solid #2466;
  min-width:400px;
  line-height: .8em;
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
.disabledTextArea{
  color: #aef;
  background: #000;
}
.pageTitle{
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  color: #fff;
  text-align: center;
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
  background-image: url(https://lookie.jsbot.net/uploads/1ahi67.png);
  background-repeat: no-repeat;
  cursor: w-resize;
  width: 14px;
  height: 300px;
}
.verticalSpacer{
  background-size: 100% 100%;
  background-image: url(https://lookie.jsbot.net/uploads/1ld1vc.png);
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
.pageLinkShort{
  background: #f80;
  padding: 2px;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  font-weight: 900;
  color: #ff0!important;
  font-size: 18px;
  text-shadow: 2px 2px 3px #000;
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
.fullScreenButton{
  margin: 0;
  margin-left: -115px;
  padding: 2px;
  padding-bottom: 4px;
  padding-left: 15px;
  padding-right: 15px;
  width: 130px;
  min-width: 100px;
  border-radius: 10px;
  color: #ff2a;
  background: #416;
  position: absolute;
  margin-top: -35px;
  transform: translateX(-50%);
}
.e404{
  position: absolute;
  width: 100%;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  font-size: 32px;
}
.pageInput{
  font-size: 16px!important;
  text-align: left!important;
  width: 450px!important;
  padding: 0!important;
  vertical-align: top;
}
.loginTitleButtonContainer{
  display: inline-block;
  margin-right: 3px;
  float: right;
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
.success{
  background: #264!important;
}
.failure{
  background: #622!important;
}
.disabledButton{
  color: #888;
  background: #333;
}
.display{
  display: block!important;
}
.avatar{
  max-width: 150px;
  max-height: 150px;
}
</style>
