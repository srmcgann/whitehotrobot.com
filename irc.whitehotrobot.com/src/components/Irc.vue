<template>
  <div :class="{'ircContainer': (typeof irc.id != 'undefined'),'singleIrc':state.mode=='single'}"
    :ref="'ircContainer' + irc.id"
  >
    <div v-if="typeof irc.id == 'undefined'" style="position: absolute; top: 40%;font-size: 48px;width: 100%; text-align: center;font-family: courier;">
        404<br>
        D:<br>
        <button @click="state.goHome()">home page</button>
    </div>
    <div v-else class="ircItem" :ref="'ircItem' + irc.id">
      <div v-if="state.mode === 'default' || (state.mode === 'user' && irc.author.toUpperCase() === state.viewAuthor.toUpperCase()) || (state.mode ==='single' && irc.id === state.viewIrc)">
        <div v-if="typeof irc.forkHistory !== 'undefined' && irc.forkHistory.length" class="forkHistoryCluster">
          <div
            :id="'fho'+irc.id"
            class="forkHistoryOverlay"
            @click="maybeClose($event)"
            style="width:100vw; min-height: 100%; background:#012e; color:#fff; position:fixed; display:none; top:0px; left:0;bottom:0;right:0;margin:0;z-index:10000;overflow:auto;"
            :class="{'display': irc.showForkHistory}"
          >
            <button @click="state.toggleShowForkHistory(irc)"
              style="margin-top: 40px; background: #c94;color: #000; font-size: 1.5em;padding: 0px;padding-bottom: 5px;"
            >close</button><br><br>


            <div class="ircHeaderContainer"
              style="background: #000b;border: 1px solid #4566;padding-top: 50px;max-width: 500px; margin-left: auto; margin-right: auto;"
            >
              <img v-if="irc.videoLink" :src="vidThumb" width=300 style="margin-right: 10px;border: 1px solid #4566;margin-bottom: 20px;"><br>
              <ircHeader :state="state" :thisirc="[irc]"  :ircid="irc.id" :forkhistoryview="1"/>
            </div>

            <span v-if="JSON.parse(irc.forkHistory).length" style="font-size: 4em;">&uarr;</span><br>

            <div v-for="(ircID, idx) in JSON.parse(irc.forkHistory)" :key="ircID">
                <ircHeader :state="state" :thisirc="[irc]" :ircid="ircID" :forkhistoryview="1"/>
                <br>
                <span v-if="idx < JSON.parse(irc.forkHistory).length-1" style="font-size: 4em;">&uarr;</span>
                <br><br>
            </div>

            <button v-if="JSON.parse(irc.forkHistory).length > 1" @click="state.toggleShowForkHistory(irc)"
              style="margin-top: -25px; margin-bottom: 60px; background: #c94;color: #000; font-size: 1.5em;padding: 0px;padding-bottom: 5px;"
            >close</button><br><br>

          </div>
        </div>
        <div class="ircTitle">
          <a :href="'/u/' + irc.author">
            <div class="avatarContainer">
              <div style="color: #fff8;font-size: 14px;line-height: .8em;"><i>author</i><br><br></div>
              <img class="avatar" :src="state.getAvatar(irc.userID)"><br>
              {{irc.author}}
            </div>
          </a>

          <ircHeader :state="state" :thisirc="[irc]" :forkhistoryview="0"/>

          <div class="clear"></div>
        </div>
        <div class="ircGraphicsCluster">
          <div class="vidThumbContainer">
            <div class="vidThumb" :ref="'vidThumb'+irc.id">
              <iframe
                v-if="typeof irc.videoIframeURL !== 'undefined' && irc.videoIframeURL.indexOf('/thumbs/')===-1"
                class="vidThumbImg"
                :src="irc.videoIframeURL"
                frameborder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay '*'"
                allowfullscreen="true"
              ></iframe>
              <div v-else-if="!irc.videoPlaying" class="sizedThumb">
                <img :src="irc.videoIframeURL + '?' + iteration" class="sizedThumbImg" />
                <button
                  class="startVidButton"
                  @click="toggleVidPlaying(irc)"
                  :class="{'pauseButtonActive': irc.videoPlaying, 'playButtonActive': !irc.videoPlaying}"
                ></button>
              </div>
              <div v-else>
                <video
                  class="vidThumbImg"
                  :src="irc.videoLink"
                  frameborder="0"
                  controls = true
                  autoplay=true
                ></video>
              </div>
            </div>
          </div>

          <div class="ircIframeContainer">
            <button
              class="playPauseButton"
              :class="{'pauseButtonActive': irc.play, 'playButtonActive': !irc.play}"
              @click="playPause(irc.id)"
            ></button>
            <!--
            <button
              @click="playPause(irc.id)"
              class="playPauseButton"
              v-html="irc.play ? '❚❚' : '⏵︎'"
            ></button>
            -->
            <button
              v-if="state.loggedin"
              class="forkIrcButton"
              :ref="'forkIrcButton' + irc.id"
              @click="forkIrc(irc.id)"
             >fork irc</button>
            <button
              class="fullScreenButton"
              @click="fullScreen(irc.id)"
              :disabled="!irc.play"
              :ref="'fullscreenButton' + irc.id"
              :class="{'disabledButton':!irc.play,'bumpRight': state.loggedin == false}"
             >full-screen</button>
            <button
              v-if="state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID"
              class="deleteIrcButton"
              :ref="'deleteIrcButton' + irc.id"
              @click="deleteIrc(irc)"
              title="delete irc"
             ></button>
            <br>
            <button
              class="fullPageButton"
              @click="fullPage(irc.id)"
              :ref="'fullPageButton' + irc.id"
              :class="{'bumpRight': state.loggedin == false}"
             >full-page</button>
            <button
              class="rawCodeButton"
              @click="rawCode(irc.id)"
              :ref="'rawCodeButton' + irc.id"
              :class="{'bumpRawRight': state.loggedin == false}"
             >raw code</button>
             
            <iframe
              :src="state.inView[idx] && irc.play ? state.baseIrcURL + '/?ircID=' + irc.id + '&v=' + iframeIteration : ''"
              sandbox="allow-same-origin allow-scripts"
              allow="autoplay *"
              class="ircIframe"
              allowfullscreen
              :ref="'iframe' + irc.id"
            ></iframe>
          </div>
        </div>
        <div class="clear"></div>
        <div class="textareaCluster" :class="{'no-wrap': !wraptextareas}" :key="'textareaCluster'+irc.id">
          <div class='ircHTMLContainer textareaContainer' :key="'HTMLContainer'+irc.id">
            <div class="textAreaTitle no-select">
              HTML
              <div v-if="!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
              </div>
            </div>
            <textarea
              spellcheck = "false"
              v-html="irc.ircHTML"
              @input="updateIrcItem('ircHTML')"
              ref="HTML"
              :class="{'HTMLtextarea': state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)}"
              :disabled="0&&!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)"
            ></textarea>
          </div>
          <div class='ircCSSContainer textareaContainer' :key="'CSSContainer'+irc.id">
            <div class="textAreaTitle no-select">
              CSS
              <div v-if="!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
              </div>
            </div>
            <textarea
              spellcheck = "false"
              v-html="irc.ircCSS"
              @input="updateIrcItem('ircCSS')"
              ref="CSS"
              :class="{'CSStextarea': state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)}"
              :disabled="0&&!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)"
            ></textarea>
          </div>
          <div class='ircJSContainer textareaContainer' :key="'JSContainer'+irc.id">
            <div class="textAreaTitle no-select">
              JS
              <div v-if="!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
              </div>
            </div>
            <textarea
              spellcheck = "false"
              v-html="irc.ircJS"
              @input="updateIrcItem('ircJS')"
              ref="JS"
              :class="{'JStextarea': state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)}"
              :disabled="0&&!(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="commentContainer">
        <div class="commentsHeader" style="background: linear-gradient(90deg, #102f, #1023, #0000);display: inline-block;padding-right: 200px;padding-left: 10px;color:#2f4;margin-bottom: 10px;height: 25px;line-height: 20px;margin-left: -10px;">
          comments
        </div>
        <div v-if="irc.comments.length">
          <div v-for="comment in filteredComments">
            <div class="commentMain">
              <span  v-if="typeof state.userInfo[comment.userID] != 'undefined'" class="commentUserName" style="font-size: 20px;">
              <span class="timestamp" v-html="processedTimestamp(comment.date)" style="float: right;display: inline-block!important;"></span>
                <div 
                  :class="{'bumpUp': state.userAgent.toUpperCase().indexOf('FIREFOX')!==-1}"
                  class="commentAvatar" :style="'background-image:url('+state.getAvatar(comment.userID)+');width:50px!important;height:50px!important;background-repeat: no-repeat; background-position: center center; background-size: cover;'"></div>
                <a :href="state.baseURL + '/u/' + state.userInfo[comment.userID].name" target="_blank" style="color:#4dc!important;font-style: oblique;margin-left: 5px;">{{state.userInfo[comment.userID].name}}</a>
              </span><br>
              <div v-if="comment.editing && state.loggedin" style="display:inline-block;width:calc(100% + 30px);">
                <input
                  maxlength="1024"
                  type="text"
                  placeholder="say something..."
                  :ref="'comment' + comment.id"
                  class="commentInput textInput"
                  style="width: calc(100% - 100px);"
                  @input="editComment(comment)"
                  v-model="comment.text"
                  :class="{'success':comment.updated==1,'failure':comment.updated==-1}"
                >
                <button
                  v-if="comment.userID == state.loggedinUserID || state.isAdmin"
                  @click='comment.editing = !comment.editing'
                  class="commentEditButton"
                  style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;"
                ></button>
                <button
                  @click='deleteComment(comment, irc)'
                  class="commentDeleteButton"
                  style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;"
                ></button>
              </div>
              <div v-else style="display: inline-block;width: calc(100% + 10px);left: 0!important;padding-right: 0;">
                <span class="commentText" v-html="comment.text" v-linkified style="width: calc(100% - 68px)"></span>
                <button
                  v-if="comment.userID == state.loggedinUserID || state.isAdmin"
                  @click='toggleEditMode(comment)'
                  class="commentEditButton"
                  style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;display: inline-block;background-image:url(https://jsbot.cantelope.org/uploads/2cyWBg.png);"
                ></button>
              </div>
              <div style="clear:both;"></div>
            </div>
          </div>
          <div v-if="moreComments" style="text-align: center;">
            <span style="display: inline-block;font-size: 32px;">...</span>
            <button
              class = "loadCommentsButton"
              @click="incrComments()"
            >load more comments</button>
          </div>
        </div>
        <div v-else>
          <div style="text-align: center;">-- no comments --</div>
          <div v-if="!state.loggedin" style="text-align: center;">(log in to comment on this irc)</div>
        </div>
        <div v-if="state.loggedin">
          <input
            maxlength="1024"
            v-on:keyup.enter="postComment(irc.id)"
            :ref="'newComment' + irc.id" placeholder="say something..."
            class="commentInput newComment textInput"
            style="margin-left: 0;margin-top: 16px; border: 1px solid #123f;"
          >
          <button
            @click="postComment(post.id)"
            style="background: #1ca;padding: 2px;padding-bottom: 4px;margin: 0;margin-left: 25px;display: block; margin-top: 14px; min-width: initial; padding: 0;padding-left: 10px; padding-right: 10px;float:left;"
          >post</button>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ircHeader from './ircHeader'
export default {
  name: 'Irc',
  props: [ 'state', 'irc', 'idx'],
  components:{
    ircHeader
  },
  data(){
    return {
      iteration: 0,
      iframeIteration: 0,
      refreshedVideoIframeURL: false,
      showRevert: false,
      showComments: 3,
      moreCommentsVal: 3,
      updated:{
        title: 0,
        ircJS: 0,
        ircHTML: 0,
        ircCSS: 0,
        videoLink: 0
      },
      ircdata: [],
      wraptextareas: false,
      spacers: [],
      e: [],
      cols: 0,
    }
  },
  methods:{
    maybeClose(e){
      if(e.target.id == 'fho' + this.irc.id) this.state.toggleShowForkHistory(this.irc)
    },
    toggleVidPlaying(irc){
      let ircID = irc.id
      if(this.state.search.string){
        this.state.search.ircs.map(v=>v.play=false)
        this.state.search.ircs.map(v=>{if(v.id!=ircID)v.videoPlaying = false})
      }else{
        switch(this.state.mode){
          case 'user':
            this.state.user.ircs.map(v=>v.play = false)
            this.state.user.ircs.map(v=>{if(v.id!=ircID)v.videoPlaying = false})
          break
          case 'single':
            this.state.ircs.map(v=>v.play = false)
            this.state.ircs.map(v=>{if(v.id!=ircID)v.videoPlaying = false})
          break
          case 'default':
            this.state.landingPage.ircs.map(v=>v.play = false)
            this.state.landingPage.ircs.map(v=>{if(v.id!=ircID)v.videoPlaying = false})
          break
        }
      }      
      irc.videoPlaying = !irc.videoPlaying
    },
    forkIrc(ircID){
      if(this.state.loggedin){
        let sendData = {userName: this.state.loggedinUserName, passhash: this.state.passhash, ircID}
        fetch(this.state.baseURL + '/fork.php',{
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
    rawCode(id){
      window.open(this.state.baseURL + '/prettycode/' + this.state.decToAlpha(id),'_blank')
    },
    fullScreen(id){
      this.state.openFullscreen(this.$refs['iframe'+id])
    },
    fullPage(id){
      window.open(this.state.baseURL + '/full/' + this.state.decToAlpha(id),'_blank')
    },
    playPause(ircID){
      if(this.state.search.string){
       this.state.search.ircs.map(v=>{if(v.id!=ircID)v.play = false})
       this.state.search.ircs.map(v=>v.videoPlaying = false)
       this.state.search.ircs.filter(v=>v.id==ircID)[0].play = !this.state.search.ircs.filter(v=>v.id==ircID)[0].play
      }else{
        switch(this.state.mode){
          case 'user':
            this.state.user.ircs.map(v=>{if(v.id!=ircID)v.play = false})
            this.state.user.ircs.map(v=>v.videoPlaying = false)
            this.state.user.ircs.filter(v=>v.id==ircID)[0].play = !this.state.user.ircs.filter(v=>v.id==ircID)[0].play
          break
          case 'single':
            this.state.ircs.map(v=>{if(v.id!=ircID)v.play = false})
            this.state.ircs.map(v=>v.videoPlaying = false)
            this.state.ircs.filter(v=>v.id==ircID)[0].play = !this.state.ircs.filter(v=>v.id==ircID)[0].play
          break
          case 'default':
            this.state.landingPage.ircs.map(v=>{if(v.id!=ircID)v.play = false})
            this.state.landingPage.ircs.map(v=>v.videoPlaying = false)
            this.state.landingPage.ircs.filter(v=>v.id==ircID)[0].play = !this.state.landingPage.ircs.filter(v=>v.id==ircID)[0].play
          break
        }
      }
    },
    updateIrcItem(item){

      if(this.state.loggedin){
        let newItemVal = null
        if(item =='ircHTML') newItemVal = this.$refs['HTML'].value
        if(item =='ircCSS') newItemVal = this.$refs['CSS'].value
        if(item =='ircJS') newItemVal = this.$refs['JS'].value

        if(newItemVal == null){
          newItemVal = this.irc[item]
        }
        if(item == 'private') newItemVal = !newItemVal ? 1 : 0
        if(item == 'allowDownload') newItemVal = !newItemVal ? 1 : 0
        let sendData = {
          userName: this.state.loggedinUserName,
          item,
          newItemVal,
          passhash: this.state.passhash,
          ircID: this.irc.id
        }
        fetch(this.state.baseURL + '/updateIrcItem.php',{
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
            this.iframeIteration++
            setTimeout(()=>this.updated[item] = 0, 1000)
          } else {
            this.updated[item] = -1
            setTimeout(()=>this.updated[item] = 0, 1000)
          }
        })
      }
    },
    revertTo(backup, ircID){
      if(confirm("Are you SURE you want to revert to this backup?\n\nThis will replace all of this irc's data with the data from this backup...\n\n>>> " + backup.backup_date + " <<<\n Including: code, title, video link, and comments...\n\n this is IRREVERSIBLE!!!")){
        this.state.loadIrcFromBackup(this.irc, backup.Database, this.$refs['contenteditable' + ircID])
        this.showRevert = false
      }
    },
    incrComments(){
      this.showComments += this.moreCommentsVal
    },
    toggleEditMode(comment){
      comment.editing = !comment.editing
      if(comment.editing){
        this.$nextTick(()=>{
          this.$refs['comment' + comment.id].focus()
          this.$refs['comment' + comment.id].select()
        })
      }
    },
    deleteComment(comment, irc){
      if(confirm('are you SURE you want to delete this comment?!?!?\n\n\nTHIS ACTION IS IRREVERSIBLE!')){
        let id = comment.id
        let sendData = {
          userName: this.state.loggedinUserName,
          passhash: this.state.passhash,
          commentID: id
        }
        fetch(this.state.baseURL + '/deleteComment.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(data[0]){
            irc.comments = irc.comments.filter(v=>v.id != id)
          }
        })
      }
    },
    editComment(comment){
      let id = comment.id
      let text = this.$refs['comment' + id].value
      let sendData = {
        userName: this.state.loggedinUserName,
        comment: text,
        passhash: this.state.passhash,
        commentID: id
      }
      fetch(this.state.baseURL + '/updateComment.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data[0]){
          comment.updated = 1
          setTimeout(()=>comment.updated = 0, 1000)
        } else {
          comment.updated = -1
          setTimeout(()=>comment.updated = 0, 1000)
        }
      })
    },
    postComment(id){
      let text = this.$refs['newComment' + id].value
      if(text.length){
        let sendData = {
          userName: this.state.loggedinUserName,
          comment: text,
          passhash: this.state.passhash,
          ircID: id
        }
        fetch(this.state.baseURL + '/postComment.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(data[0]){
            let comment = {
              userID: this.state.loggedinUserID,
              text,
              ircID: id,
              id: data[1],
              date: data[2]
            }

            if(this.state.search.string){
              this.state.search.ircs.filter(v=>v.id==id)[0].comments.push(comment)
            }else{
              switch(this.state.mode){
                case 'user':
                this.state.user.ircs.filter(v=>v.id==id)[0].comments.push(comment)
                break
                case 'default':
                this.state.landingPage.ircs.filter(v=>v.id==id)[0].comments.push(comment)
                break
                case 'single':
                this.state.ircs.filter(v=>v.id==id)[0].comments.push(comment)
                break
              }        
            }

            this.$refs['newComment' + id].value = ''
          }
        })
      }
    },
    processedTimestamp(val){
      let months=[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      /*
      let days=[
        'Sun,',
        'Mon,',
        'Tue,',
        'Wed,',
        'Thur,',
        'Fri,',
        'Sat,'
      ]
      */
      let days = Array(7).fill('')
      let hours = [
        12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
      ]
      let d = new Date(Date.parse(val.replace(/-/g, '/')))
      let mn = '' + d.getMinutes()
      if(mn.length == 1) mn = '0' + mn
      return hours[d.getHours()] + ':' + mn + (d.getHours<12?'AM':'PM') + ' - ' + days[d.getDay()] + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear()
    },
    deleteIrc(irc){
      if(confirm("\n\n\nAre you SURE you want to delete this irc??!?!\n\n\n     Irc: \"" + irc.title + "\"\n     created: " + this.formattedDate(irc.created) + "\n\n\nThis action is IRREVERSIBLE!!!!")){
        let sendData = {
          userName: this.state.loggedinUserName,
          ircID: +irc.id, 
          passhash: this.state.passhash
        }
        fetch(this.state.baseURL + '/deleteIrc.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(this.state.search.string){
            this.state.search.ircs = this.state.search.ircs.filter(v=>v.id!=irc.id)
          }else{
            switch(this.state.mode){
              case 'user':
              this.state.user.ircs = this.state.user.ircs.filter(v=>v.id!=irc.id)
              break
              case 'default':
              this.state.landingPage.ircs = this.state.landingPage.ircs.filter(v=>v.id!=irc.id)
              break
              case 'single':
              window.location.reload()
              break
            }        
          }
        })
      }
    },
    formattedDate(d){
      let M=['January','February','March','April','May','June','July','August','September','October','November','December']
      var l=new Date(d)
      let mn = '' + l.getMinutes()
      if(mn.length == 1) mn = '0' + mn
      return M[l.getMonth()] + ' ' + l.getDate() + ', ' + l.getFullYear() + ' • ' + ((l.getHours()%12)+1) + ':' + mn + ' ' + (l.getHours()<12?'AM':'PM')
    },
    stringToUint(string) {
        var string = btoa(unescape(encodeURIComponent(string))),
            charList = string.split(''),
            uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint16Array(uintArray);
    },
    positionButtons(){
      let container = this.$refs['ircItem' + this.irc.id]
      if(typeof container != 'undefined' && container != null){
        let rect = container.getBoundingClientRect()
        let el
        el = this.$refs['deleteIrcButton' + this.irc.id]
        if(typeof el != 'undefined' && el != null){
          el.style.display = 'block'
          el.style.top = (container.offsetTop + 180) + 'px'
          el.style.left = (rect.right - 80) + 'px'
        }
        el = this.$refs['forkIrcButton' + this.irc.id]
        if(typeof el != 'undefined' && el != null){
          el.style.display = 'block'
          el.style.left = (rect.left + rect.width / 2) + 'px'
        }
        el = this.$refs['fullscreenButton' + this.irc.id]
        if(typeof el != 'undefined' && el != null){
          el.style.display = 'block'
          el.style.left = (rect.left + rect.width / 2) + 'px'
        }
        el = this.$refs['fullPageButton' + this.irc.id]
        if(typeof el != 'undefined' && el != null){
          el.style.display = 'block'
          el.style.left = (rect.left + rect.width / 2) + 'px'
        }
        el = this.$refs['rawCodeButton' + this.irc.id]
        if(typeof el != 'undefined' && el != null){
          el.style.display = 'block'
          el.style.left = (rect.left + rect.width / 2) + 'px'
        }
      }
    }
  },
  computed:{
    vidThumb(){
      let item = this.irc
      let link = this.irc.videoLink
      if(link.substring(link.length-3).toUpperCase() === 'MP4'){
        return this.irc.videoIframeURL+'?'+this.iteration
      } else {
        return link ? '//img.youtube.com/vi/' + link.split('/')[link.split('/').length-1] + '/0.jpg' : ''
      }
    },
    filteredComments(){
      return this.irc.comments.filter((v,i)=>i<this.showComments)
    },
    moreComments(){
      return this.irc.comments.length > this.showComments
    }
  },
  watch:{
    'state.closeMenus'(val){
      if(val){
       this.$nextTick(()=>this.showRevert = false)
      }
    }
  },
  mounted(){
    this.$nextTick(()=>this.positionButtons())
    setInterval(()=>{
      if(!this.refreshedVideoIframeURL){
        this.iteration++
        this.positionButtons()
      }
    }, 1000)
    //if(this.state.mode == 'single'){
    //  document.getElementsByTagName('html')[0].scroll(0, document.getElementsByTagName('html')[0].clientHeight/3.5)
   // }
  }
}
</script>

<style scoped>
.ircElem{
  display: inline-block;
  font-size: 20px;
}
.ircTitle{
  text-align: left;
  width: 100%;
  font-size: 18px;
  color: #fff;
  text-align: center;
}
.ircContainer{
  display: inline-block;
  vertical-align: top;
  margin-left: 6px;
  margin-right: 6px;
  /*border: 1px solid #6fa3;*/
  border-radius: 3px;
  width: calc(100% - 200px);
  min-width: 600px;
  text-align: center;
  background: linear-gradient(#034a, #000);
  padding: 5px;
  max-width: 1200px;
  margin-top: 25px;
}
.date{
  font-style: oblique;
  color: #ff8;
}
.avatarContainer{
  display: inline-block;
  min-width: 130px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
}
.avatar{
  height: 100px;
  margin: 3px;
  border-radius: 50%;
  display: inline-block;
}
.link{
  background: linear-gradient(90deg, #0000,#8fe4);
  padding-left: 12px;
  padding-right: 12px;
  margin: 0;
  font-size: 40px;
  color: #ff0!important;
  font-style: oblique;
  height: 52px;
  display: inline-block;
  vertical-align: top;
  margin-top: 2px;
}
.fileLink{
  background: #804;
  padding: 2px;
  word-break: break-all;
  max-width: 400px;
  padding-left: 12px;
  padding-right: 12px;
  margin: 0;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height:1em;
  color: #fffb!important;
  display: inline-block;
  text-align: center;
  vertical-align: top;
}
.tdLeft{
  text-align: right;
}
.tdRight{
  text-align: left;
}
.forkIrcButton{
  margin: 0;
  padding: 2px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
  width: 80px;
  min-width: 100px;
  border-radius: 10px;
  color: #021;
  background: #2a8;
  position: absolute;
  margin-top: -62px;
  display: none;
  margin-left: 114px;
}
.success{
  background: #264!important;
}
.textareasuccess{
  background: #132a!important;
}
.failure{
  background: #622!important;
}
.editHTMLsuccess{
  background: #234!important;
  color: #ff8!important;
}
.editHTMLfailure{
  background: #622!important;
  color: #000!important;
}
input[type=text]{
  color: #ff8;
  background: #000;
  padding: 2px;
  width: 500px;
  border: none;
  border-bottom: 2px solid #4f8;
  font-size: 16px;
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
  width: calc(100% - 200px);
  background: #0000;
  vertical-align: top;
  float: left;
  margin-bottom: 10px;
}
.commentText{
  color: #ff8;
  text-align: left;
  display: inline-block;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
  background: #0046;
  margin-top: 10px;
  width: calc(100% - 120px)!important;
  margin-left: 60px;
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
  margin-top: 10px;
  width: calc(100% - 160px)!important;
  margin-right: 10px;
  margin-left: 60px;
}
.commentAvatar{
  position: absolute;
  margin-left: -1px;
  max-height: 50px;
  max-width: 50px;
  width: auto;
  border-radius: 50%;
  height:50px;
  top: initial;
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
  height: 34px!important;
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
  height: 34px!important;
  vertical-align: top;
  margin-top: -5px;
  border-radius: 5px;
  background-color: #f880;
}
.newComment{
  width: calc(100% - 100px)!important;
  float:left;
}
table{
  margin-left: auto;
  margin-right: auto;
}
.loadCommentsButton{
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  background: #3ce4;
  color: #fffc;
  font-weight: 300;
  font-size: 24px;
  position: relative;
  display: inline-block;
}
table{
  margin-left: auto;
  margin-right: auto;
}
.loadCommentsButton{
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  background: #3ce4;
  color: #fffc;
  font-weight: 300;
  font-size: 24px;
  position: relative;
  display: inline-block;
}
.smallControlButton{
  width: 32px;
  height: 32px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 25px 25px;
  border-radius: 50%;
  position: absolute!important;
  min-width: 0;
}
.highlighted{
  background-color: #0fa;
  background-image: url(https://jsbot.cantelope.org/uploads/14MAyj.png);
}
.singleIrc{
  top: 0px;
  margin-bottom: 100px;
}
.bumpRawRight{
  margin-left: 158px!important;
}
.bumpRight{
  margin-left: 20px!important;
}
.bumpUp{
  margin-top: -25px;
}
.editHTML{
  background: #012;
  color: #cc8;
  font-family: courier;
  font-size: 16px;
}
.contenteditable:focus{
  outline: none;
}
.contenteditable{
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 150px;
  max-width: 100%!important;
  min-width: 100%!important;
  width: 100%!important;
  margin-top: 10px;
  border: 1px solid #48a3;
  resize: vertical;
  background: #000;
  color: #ff0;
  line-height: 1em;
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
.revertButton{
  display: inline-block;
  font-size: 18px;
  background: #804;
  color: #fcc;
}
.revertMenu{
  position: absolute;
  width: 200px;
  margin-top:-10px;
  margin-left: 215px;
  background: #135e;
  z-index: 100;
}
.revertInnerButton{
  padding: 3px;
  font-size: 14px;
  background: #288;
  color: #8ff;
  text-shadow: 1px 1px 1px #004;
  margin:0;
  margin-bottom: 10px;
}
.ircItem{
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 0px;
  width: calc(100% - 10px);
  margin-left: auto;
  margin-right: auto;
  padding: 0px;
  padding-top: 10px;
  padding-bottom: 0px;
  border-radius: 0px;
  background: linear-gradient(#112a, #001a);
  border: 1px solid #2466;
  min-width:400px;
}
.playPauseButton{
  position: absolute;
  font-size: 32px;
  min-width: 0;
  padding: 15px;
  background-size: 70px 70px;
  background-position: 15px center;
  background-repeat: no-repeat;
  margin-left: -1vw;
  margin-top: 10vw;
  min-height: 0;
  width: 80px;
  height: 80px;
  line-height: .5em;
  border-radius: 50%;
  opacity: .9;
  z-index: 1000;
  transition: margin-left .5s, margin-top .5s, width .5s, height .5s, background-size .5s, background-position .5s;
}
.pauseButtonActive{
  background-image: url(https://jsbot.cantelope.org/uploads/1SNLck.png);
  background-position: center center;
  background-size: 80px 80px;
  transform: scale(.5);
  margin-top: -10px;
  margin-left: -150px;
}
.pauseButtonDisabled{
  background-image: url(https://jsbot.cantelope.org/uploads/zAYeB.png);
}
.playButtonDisabled{
  background-image: url(https://jsbot.cantelope.org/uploads/FU3vq.png);
}
.playButtonActive{
  background-image: url(https://jsbot.cantelope.org/uploads/D360h.png);
  background-color: #164a;
}
.startVidButton{
  position: absolute;
  font-size: 32px;
  min-width: 0;
  padding: 15px;
  background-size: 70px 70px;
  background-position: 15px center;
  background-repeat: no-repeat;
  margin-left: -1vw;
  margin-top: -1vw;
  min-height: 0;
  width: 80px;
  height: 80px;
  line-height: .5em;
  border-radius: 50%;
  opacity: .9;
  z-index: 1000;
}
.pauseVidButtonActive{
  background-image: url(https://jsbot.cantelope.org/uploads/1SNLck.png);
  background-position: center center;
  background-size: 80px 80px;
  transform: scale(.5);
  margin-top: -10px;
  margin-left: -150px;
}
.pauseVidButtonDisabled{
  background-image: url(https://jsbot.cantelope.org/uploads/zAYeB.png);
}
.playVidButtonDisabled{
  background-image: url(https://jsbot.cantelope.org/uploads/FU3vq.png);
}
.playVidButtonActive{
  background-image: url(https://jsbot.cantelope.org/uploads/D360h.png);
  background-color: #164c;
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
.deleteIrcButton{
  position: absolute;
  background-color: #300a;
  width: 55px;
  min-width: initial;
  height: 55px;
  display: none;
  background-position: center center;
  background-size: 45px 45px;
  background-repeat: no-repeat;
  background-image: url(https://jsbot.cantelope.org/uploads/XeGsK.png);
}
.rawCodeButton{
  margin: 0;
  padding: 2px;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100px;
  min-width: 50px;
  border-radius: 10px;
  color: #123;
  background: #1cf;
  position: absolute;
  margin-top: -51px;
  margin-left: 114px;
}
.fullPageButton{
  margin: 0;
  margin-left: 36px;
  padding: 2px;
  padding-bottom: 4px;
  padding-left: 15px;
  padding-right: 15px;
  width: 130px;
  min-width: 100px;
  border-radius: 10px;
  color: #fa6;
  background: #416;
  position: absolute;
  margin-top: -51px;
  display: none;
  margin-left: -28px;
}
.fullScreenButton{
  margin: 0;
  margin-left: 36px;
  padding: 2px;
  padding-bottom: 4px;
  padding-left: 15px;
  padding-right: 15px;
  width: 130px;
  min-width: 100px;
  border-radius: 10px;
  color: #fa6;
  background: #416;
  position: absolute;
  margin-top: -62px;
  display: none;
  margin-left: -28px;
}
.disabledButton{
  color: #888;
  background: #333;
}
</style>
