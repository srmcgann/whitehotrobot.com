<template>
  <div :class="{'demoContainer': (typeof demo.id != 'undefined'),'singleDemo':state.mode=='single'}"
	  :ref="'demoContainer' + demo.id"
  >
    <div v-if="typeof demo.id == 'undefined'" style="position: absolute; top: 40%;font-size: 48px;width: 100%; text-align: center;font-family: courier;">
        404<br>
        D:<br>
        <button @click="state.goHome()">home page</button>
    </div>
    <div v-else class="demoItem">
      <div v-if="state.mode === 'default' || (state.mode === 'user' && demo.author.toUpperCase() === state.viewAuthor.toUpperCase()) || (state.mode ==='single' && demo.id === state.viewDemo)">
        <div v-if="typeof demo.forkHistory !== 'undefined' && demo.forkHistory.length" class="forkHistoryCluster">
          <div
            :id="'fho'+demo.id"
            class="forkHistoryOverlay"
            @click="maybeClose($event)"
            style="width:100vw; min-height: 100%; background:#012e; color:#fff; position:fixed; display:none; top:0px; left:0;bottom:0;right:0;margin:0;z-index:10000;overflow:auto;"
            :class="{'display': demo.showForkHistory}"
          >
            <button @click="state.toggleShowForkHistory(demo)"
              style="margin-top: 40px; background: #c94;color: #000; font-size: 1.5em;padding: 0px;padding-bottom: 5px;"
            >close</button><br><br>


            <div class="demoHeaderContainer"
              style="background: #000b;border: 1px solid #4566;padding-top: 50px;max-width: 500px; margin-left: auto; margin-right: auto;"
            >
              <img v-if="demo.videoLink" :src="vidThumb" width=300 style="margin-right: 10px;border: 1px solid #4566;margin-bottom: 20px;"><br>
              <demoHeader :state="state" :thisdemo="[demo]"  :demoid="demo.id" :forkhistoryview="1"/>
            </div>

            <span v-if="JSON.parse(demo.forkHistory).length" style="font-size: 4em;">&uarr;</span><br>

            <div v-for="(demoID, idx) in JSON.parse(demo.forkHistory)" :key="demoID">
                <demoHeader :state="state" :thisdemo="[demo]" :demoid="demoID" :forkhistoryview="1"/>
                <br>
                <span v-if="idx < JSON.parse(demo.forkHistory).length-1" style="font-size: 4em;">&uarr;</span>
                <br><br>
            </div>

            <button v-if="JSON.parse(demo.forkHistory).length > 1" @click="state.toggleShowForkHistory(demo)"
              style="margin-top: -25px; margin-bottom: 60px; background: #c94;color: #000; font-size: 1.5em;padding: 0px;padding-bottom: 5px;"
            >close</button><br><br>

          </div>
        </div>
        <div class="demoTitle">
          <a :href="'/u/' + demo.author">
            <div class="avatarContainer">
              <div style="color: #fff8;font-size: 14px;line-height: .8em;"><i>author</i><br><br></div>
              <img class="avatar" :src="state.getAvatar(demo.userID)"><br>
              {{demo.author}}
            </div>
          </a>

          <demoHeader :state="state" :thisdemo="[demo]" :forkhistoryview="0"/>

          <div class="clear"></div>
        </div>
        <div class="demoGraphicsCluster">
          <div class="vidThumbContainer">
            <div class="vidThumb" :ref="'vidThumb'+demo.id">
              <iframe
                v-if="typeof demo.videoIframeURL !== 'undefined' && demo.videoIframeURL.indexOf('/thumbs/')===-1"
                class="vidThumbImg"
                :src="demo.videoIframeURL"
                frameborder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay '*'"
                allowfullscreen="true"
              ></iframe>
              <div v-else-if="!demo.videoPlaying" class="sizedThumb">
                <img :src="demo.videoIframeURL + '?' + iteration" class="sizedThumbImg" />
                <button class="startVidButton" @click="demo.videoPlaying = !demo.videoPlaying">⏵︎</button>
              </div>
              <div v-else>
                <video
                  class="vidThumbImg"
                  :src="demo.videoLink"
                  frameborder="0"
                  controls = true
                  autoplay=true
                ></video>
              </div>
            </div>
          </div>

          <div class="demoIframeContainer">
            <button
              @click="playPause(demo.id)"
              class="playPauseButton"
              v-html="demo.play ? '❚❚' : '⏵︎'"
            ></button>
            <button
              v-if="state.loggedin"
              class="forkDemoButton"
              @click="forkDemo(demo.id)"
             >fork demo</button>
            <button
              class="fullScreenButton"
              @click="fullScreen(demo.id)"
              :disabled="!demo.play"
              :class="{'disabledButton':!demo.play}"
             >full-screen</button>
            <button
              v-if="state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID"
              class="deleteDemoButton"
              @click="deleteDemo(demo)"
             >delete demo</button>
             
            <iframe
              :src="state.inView[idx] && demo.play ? state.baseDemoURL + '/?demoID=' + demo.id + '&v=' + iframeIteration : ''"
              sandbox="allow-same-origin allow-scripts"
              allow="autoplay *"
              class="demoIframe"
              allowfullscreen
              :ref="'iframe' + demo.id"
            ></iframe>
          </div>
        </div>
        <div class="clear"></div>
        <div class="textareaCluster" :class="{'no-wrap': !wraptextareas}" :key="'textareaCluster'+demo.id">
          <div class='demoHTMLContainer textareaContainer' :key="'HTMLContainer'+demo.id">
            <div class="textAreaTitle no-select">
              HTML
              <div v-if="!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
              </div>
            </div>
            <textarea
              spellcheck = "false"
              v-html="demo.demoHTML"
              @input="updateDemoItem('demoHTML')"
              ref="HTML"
              :class="{'HTMLtextarea': state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)}"
              :disabled="0&&!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)"
            ></textarea>
          </div>
          <div class='demoCSSContainer textareaContainer' :key="'CSSContainer'+demo.id">
            <div class="textAreaTitle no-select">
              CSS
              <div v-if="!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
              </div>
            </div>
            <textarea
              spellcheck = "false"
              v-html="demo.demoCSS"
              @input="updateDemoItem('demoCSS')"
              ref="CSS"
              :class="{'CSStextarea': state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)}"
              :disabled="0&&!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)"
            ></textarea>
          </div>
          <div class='demoJSContainer textareaContainer' :key="'JSContainer'+demo.id">
            <div class="textAreaTitle no-select">
              JS
              <div v-if="!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
              </div>
            </div>
            <textarea
              spellcheck = "false"
              v-html="demo.demoJS"
              @input="updateDemoItem('demoJS')"
              ref="JS"
              :class="{'JStextarea': state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)}"
              :disabled="0&&!(state.isAdmin || state.loggedin && demo.userID === state.loggedinUserID)"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="commentContainer">
        <div class="commentsHeader" style="background: linear-gradient(90deg, #102f, #1023, #0000);display: inline-block;padding-right: 200px;padding-left: 10px;color:#2f4;margin-bottom: 10px;height: 25px;line-height: 20px;margin-left: -10px;">
          comments
        </div>
        <div v-if="demo.comments.length">
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
                  @click='deleteComment(comment, demo)'
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
                  style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;display: inline-block;background-image:url(https://lookie.jsbot.net/uploads/2cyWBg.png);"
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
          <div v-if="!state.loggedin" style="text-align: center;">(log in to comment on this demo)</div>
        </div>
        <div v-if="state.loggedin">
          <input
            maxlength="1024"
            v-on:keyup.enter="postComment(demo.id)"
            :ref="'newComment' + demo.id" placeholder="say something..."
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
import demoHeader from './demoHeader'
export default {
  name: 'Demo',
  props: [ 'state', 'demo', 'idx'],
  components:{
    demoHeader
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
        demoJS: 0,
        demoHTML: 0,
        demoCSS: 0,
        videoLink: 0
      },
      demodata: [],
      wraptextareas: false,
      spacers: [],
      e: [],
      cols: 0,
    }
  },
  methods:{
    maybeClose(e){
      if(e.target.id == 'fho' + this.demo.id) this.state.toggleShowForkHistory(this.demo)
    },
    forkDemo(demoID){
      if(this.state.loggedin){
        let sendData = {userName: this.state.loggedinUserName, passhash: this.state.passhash, demoID}
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
    fullScreen(id){
      this.state.openFullscreen(this.$refs['iframe'+id])
    },
    playPause(demoID){
      if(this.state.search.string){
       this.state.search.demos.filter(v=>v.id==demoID)[0].play = !this.state.search.demos.filter(v=>v.id==demoID)[0].play
      }else{
        switch(this.state.mode){
          case 'user':
            this.state.user.demos.filter(v=>v.id==demoID)[0].play = !this.state.user.demos.filter(v=>v.id==demoID)[0].play
          break
          case 'single':
            this.state.demos.filter(v=>v.id==demoID)[0].play = !this.state.demos.filter(v=>v.id==demoID)[0].play
          break
          case 'default':
            this.state.landingPage.demos.filter(v=>v.id==demoID)[0].play = !this.state.landingPage.demos.filter(v=>v.id==demoID)[0].play
          break
        }
      }
    },
    updateDemoItem(item){

      if(this.state.loggedin){
        let newItemVal = null
        if(item =='demoHTML') newItemVal = this.$refs['HTML'].value
        if(item =='demoCSS') newItemVal = this.$refs['CSS'].value
        if(item =='demoJS') newItemVal = this.$refs['JS'].value

        if(newItemVal == null){
          newItemVal = this.demo[item]
        }
        if(item == 'private') newItemVal = !newItemVal ? 1 : 0
        if(item == 'allowDownload') newItemVal = !newItemVal ? 1 : 0
        let sendData = {
          userName: this.state.loggedinUserName,
          item,
          newItemVal,
          passhash: this.state.passhash,
          demoID: this.demo.id
        }
        fetch(this.state.baseURL + '/updateDemoItem.php',{
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
    revertTo(backup, demoID){
      if(confirm("Are you SURE you want to revert to this backup?\n\nThis will replace all of this demo's data with the data from this backup...\n\n>>> " + backup.backup_date + " <<<\n Including: code, title, video link, and comments...\n\n this is IRREVERSIBLE!!!")){
        this.state.loadDemoFromBackup(this.demo, backup.Database, this.$refs['contenteditable' + demoID])
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
    deleteComment(comment, demo){
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
            demo.comments = demo.comments.filter(v=>v.id != id)
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
          demoID: id
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
					  	demoID: id,
              id: data[1],
  						date: data[2]
	  				}

            if(this.state.search.string){
              this.state.search.demos.filter(v=>v.id==id)[0].comments.push(comment)
            }else{
              switch(this.state.mode){
                case 'user':
                this.state.user.demos.filter(v=>v.id==id)[0].comments.push(comment)
                break
                case 'default':
                this.state.landingPage.demos.filter(v=>v.id==id)[0].comments.push(comment)
                break
                case 'single':
                this.state.demos.filter(v=>v.id==id)[0].comments.push(comment)
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
    deleteDemo(demo){
      if(confirm("\n\n\nAre you SURE you want to delete this demo??!?!\n\n\n     Demo: \"" + demo.title + "\"\n     created: " + this.formattedDate(demo.created) + "\n\n\nThis action is IRREVERSIBLE!!!!")){
        let sendData = {
          userName: this.state.loggedinUserName,
          demoID: +demo.id, 
          passhash: this.state.passhash
        }
        fetch(this.state.baseURL + '/deleteDemo.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(this.state.search.string){
            this.state.search.demos = this.state.search.demos.filter(v=>v.id!=demo.id)
          }else{
            switch(this.state.mode){
              case 'user':
              this.state.user.demos = this.state.user.demos.filter(v=>v.id!=demo.id)
              break
              case 'default':
              this.state.landingPage.demos = this.state.landingPage.demos.filter(v=>v.id!=demo.id)
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
    }
  },
  computed:{
    vidThumb(){
      let item = this.demo
			let link = this.demo.videoLink
			if(link.substring(link.length-3).toUpperCase() === 'MP4'){
				return this.demo.videoIframeURL+'?'+this.iteration
			} else {
        return '//img.youtube.com/vi/' + link.split('/')[link.split('/').length-1] + '/0.jpg'
			}
    },
    filteredComments(){
      return this.demo.comments.filter((v,i)=>i<this.showComments)
    },
    moreComments(){
      return this.demo.comments.length > this.showComments
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
    setInterval(()=>{
      if(!this.refreshedVideoIframeURL){
        //this.refreshedVideoIframeURL = true
        this.iteration++
      }
    }, 1000)
    //if(this.state.mode == 'single'){
    //  document.getElementsByTagName('html')[0].scroll(0, document.getElementsByTagName('html')[0].clientHeight/3.5)
   // }
  }
}
</script>

<style scoped>
.demoElem{
  display: inline-block;
  font-size: 20px;
}
.demoTitle{
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  color: #fff;
  text-align: center;
}
.demoContainer{
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
.forkDemoButton{
  margin: 0;
  padding: 2px;
  padding-bottom: 4px;
  padding-left: 5px;
  margin-left: 10px;
  padding-right: 5px;
  width: 80px;
  min-width: 100px;
  border-radius: 10px;
  color: #243;
  background: #2a8;
  position: absolute;
  margin-top: -35px;
  transform: translateX(-50%);
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
	background-image: url(https://lookie.jsbot.net/uploads/XeGsK.png);
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
.deletePostButton{
  position: relative;
  margin-top: 0px;
  margin-right: 0px;
  float: right;
  background-color: #300a;
  width: 50px;
  min-width: initial;
  height: 50px;
  background-position: center center;
  background-size: 45px 45px;
  background-repeat: no-repeat;
  background-image: url(https://lookie.jsbot.net/uploads/XeGsK.png);
}
.commentEditButton{
  background-image: url(https://lookie.jsbot.net/uploads/ct1hv.png);
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
  background-image: url(https://lookie.jsbot.net/uploads/14MAyj.png);
}
.singleDemo{
  top: 0px;
  margin-bottom: 100px;
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
.demoGraphicsCluster{
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
.demoItem{
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
.demoHTMLContainer{
  background: #100008b0;
  color: #fff;
}
.demoCSSContainer{
  background: #101000b0;
  color: #fff;
}
.demoJSContainer{
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
.demoIframeContainer{
  width: calc(50% - 8px);
  min-width: 190px;
  background: #000;
  border: none;
}
.demoIframe{
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
</style>
