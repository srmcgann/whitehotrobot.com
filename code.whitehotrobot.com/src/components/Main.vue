<template>
  <div class="main">
    <Controls :state="state"/>
    <Header :state="state"/>
    <div class="demoContainer" :class="{'highTop':!state.showControls}">
      <div v-if="state.demoDataReceived && state.mode == 'user' && !state.demos.length" class="e404">
        <span style="color:#ff0;font-size: 1.5em;">{{state.viewAuthor}}</span><br>
        has no demos at this time!<br><br>
        <div v-if="state.mode === 'user' && state.viewAuthor.toUpperCase() === state.loggedinUserName.toUpperCase()">
          <button @click="state.createDemo()">create a demo</button>
          <br><br>- or -<br><br>
        </div>
        <button @click="state.goHome()">home page</button>
      </div>
      <div v-if="state.error404" class="e404">
        <div v-if="state.mode == 'user'">
          we don't know this user!<br><br>
          &quot;{{state.viewAuthor}}&quot;
        </div>
        <div v-else-if="state.mode == 'single'">
          could not find<br>
          demo &quot;{{state.rawDemoID}}&quot;<br><br>
          <div v-if="state.loggedin">
            <button @click="state.createDemo()">create a demo</button>
            <br><br>- or -<br><br>
          </div>
          <button @click="state.goHome()">home page</button>
        </div>
        <div v-else>
          404!
        </div>
      </div>
      <div v-else>
        <div v-for="(item, idx) in filteredDemos" :key="item.id">
          <div class="demoItem" v-if="state.mode === 'all' || (state.mode === 'user' && item.author.toUpperCase() === state.viewAuthor.toUpperCase()) || (state.mode ==='single' && item.id === state.viewDemo)">

              <div v-if="item.forkHistory.length" class="forkHistoryCluster">
                <div
                  class="forkHistoryOverlay"
                  style="width:100vw; min-height: 100%; background:#012e; color:#fff; position:fixed; display:none; top:0px; left:0;bottom:0;right:0;margin:0;z-index:10000;overflow:auto;"
                  :class="{'display': item.showForkHistory}"
                >
                  <button @click="toggleShowForkHistory(item)"
                    style="margin-top: 40px; background: #c94;color: #000; font-size: 1.5em;padding: 0px;padding-bottom: 5px;"
                  >close</button><br><br>


                  <div class="demoHeaderContainer"
                    style="background: #000b;border: 1px solid #4566;padding-top: 50px;max-width: 500px; margin-left: auto; margin-right: auto;"
                  >
                    <img v-if="item.videoLink" :src="vidThumb(item)" width=300 style="margin-right: 10px;border: 1px solid #4566;margin-bottom: 20px;"><br>
                    <demoHeader :state="state" :itemid="item.id" :forkhistoryview="1"/>
                  </div>

                  <span v-if="JSON.parse(item.forkHistory).length" style="font-size: 4em;">&uarr;</span><br>

                  <div v-for="(itemID, idx) in JSON.parse(item.forkHistory)" :key="itemID">
                      <demoHeader :state="state" :itemid="itemID" :forkhistoryview="1"/>
                      <br>
                      <span v-if="idx < JSON.parse(item.forkHistory).length-1" style="font-size: 4em;">&uarr;</span>
                      <br><br>
                  </div>

                  <button v-if="JSON.parse(item.forkHistory).length > 1" @click="toggleShowForkHistory(item)"
                    style="margin-top: -25px; margin-bottom: 60px; background: #c94;color: #000; font-size: 1.5em;padding: 0px;padding-bottom: 5px;"
                  >close</button><br><br>

                </div>
                <button @click="toggleShowForkHistory(item)"
                  :class="{'slideRight': item.userID !== state.loggedinUserID}"
                  class="showForkHistoryButton"
                >show<br>fork<br>history</button>
              </div>

            <div class="demoTitle">
              <a :href="'/u/' + item.author">
                <div class="avatarContainer">
                  <div style="color: #fff8;font-size: 14px;line-height: .8em;"><i>author</i><br><br></div>
                  <img class="avatar" :src="state.getAvatar(item.userID)"><br>
                  {{item.author}}
                </div>
              </a>

              <demoHeader :state="state" :itemid="item.id" :forkhistoryview="0"/>

              <div class="clear"></div>
            </div>
            <div class="demoGraphicsCluster">
              <div class="vidThumbContainer">
                <div class="vidThumb" :ref="'vidThumb'+item.id">
                  <iframe
									  v-if="typeof item.videoIframeURL !== 'undefined' &&item.videoIframeURL.indexOf('/thumbs/')===-1"
                    class="vidThumbImg"
                    :src="item.videoIframeURL"
                    frameborder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay '*'"
                    allowfullscreen="true"
                  ></iframe>
									<div v-else-if="!item.videoPlaying" class="sizedThumb">
									  <img :src="item.videoIframeURL" class="sizedThumbImg" />
										<button class="startVidButton" @click="item.videoPlaying = !item.videoPlaying">⏵︎</button>
								  </div>
									<div v-else>
                    <video
                      class="vidThumbImg"
                      :src="item.videoLink"
                      frameborder="0"
										  controls = true
											autoplay=true
                    ></video>
									</div>
                </div>
              </div>

              <div class="demoIframeContainer">
                <button
                  @click="playPause(item.id)"
                  class="playPauseButton"
                  v-html="item.play ? '❚❚' : '⏵︎'"
                ></button>
                <button
                  v-if="state.loggedin"
                  class="forkDemoButton"
                  @click="forkDemo(item.id)"
                 >fork demo</button>
                <button
                  class="fullScreenButton"
                  @click="fullScreen(item.id)"
                  :disabled="!item.play"
                  :class="{'disabledButton':!item.play}"
                 >full-screen</button>
                <button
                  v-if="state.isAdmin || state.loggedin && item.userID === state.loggedinUserID"
                  class="deleteDemoButton"
                  @click="deleteDemo(item.id)"
                 >delete demo</button>
                <iframe
                  :src="state.inView[idx] && item.play ? state.baseDemoURL + '/?demoID=' + item.id + '&v=' + iteration : ''"
                  sandbox="allow-same-origin allow-scripts"
									allow="autoplay *"
                  class="demoIframe"
                  allowfullscreen
                  :ref="'iframe' + item.id"
                ></iframe>
              </div>
            </div>
            <div class="clear"></div>
            <div class="textareaCluster" :class="{'no-wrap': !wraptextareas}" :key="'textareaCluster'+item.id">
              <div class='demoHTMLContainer textareaContainer' :key="'HTMLContainer'+item.id">
                <div class="textAreaTitle no-select">
                  HTML
                  <div v-if="!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                    <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
                  </div>
                </div>
                <textarea
                  spellcheck = "false"
                  v-html="item.demoHTML"
                  @input="update(item.id)"
                  :ref="'HTML' + item.id"
                  :class="{'HTMLtextarea': state.isAdmin || state.loggedin && item.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)}"
                  :disabled="0&&!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)"
                ></textarea>
              </div>
              <div class='demoCSSContainer textareaContainer' :key="'CSSContainer'+item.id">
                <div class="textAreaTitle no-select">
                  CSS
                  <div v-if="!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                    <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
                  </div>
                </div>
                <textarea
                  spellcheck = "false"
                  v-html="item.demoCSS"
                  @input="update(item.id)"
                  :ref="'CSS' + item.id"
                  :class="{'CSStextarea': state.isAdmin || state.loggedin && item.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)}"
                  :disabled="0&&!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)"
                ></textarea>
              </div>
              <div class='demoJSContainer textareaContainer' :key="'JSContainer'+item.id">
                <div class="textAreaTitle no-select">
                  JS
                  <div v-if="!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)" class="loginTitleButtonContainer">
                    <button class="loginTitleButton" @click="state.showLoginPrompt()">login as author to edit</button>
                  </div>
                </div>
                <textarea
                  spellcheck = "false"
                  v-html="item.demoJS"
                  @input="update(item.id)"
                  :ref="'JS' + item.id"
                  :class="{'JStextarea': state.isAdmin || state.loggedin && item.userID === state.loggedinUserID, 'disabledTextArea':!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)}"
                  :disabled="0&&!(state.isAdmin || state.loggedin && item.userID === state.loggedinUserID)"
                ></textarea>
              </div>
            </div>
            <div class="commentContainer">
			  		  <div class="commentsHeader">
		  				  comments
	  					</div>
							<div v-if="item.comments.length">
    						<div v-for="comment in item.comments">
	  					    <div class="commentMain">
		  				  		<span  v-if="typeof state.userData[comment.userID] != 'undefined'" class="commentUserName" style="font-size: 20px;">
			  		  			  <img :src="state.userData[comment.userID].avatar || 'https://lookie.jsbot.net/uploads/1pnBdc.png'" class="commentAvatar">
				    				  <a :href="state.baseURL + '/u/' + state.userData[comment.userID].name" target="_blank" style="color:#4dc!important;font-style: oblique;">{{state.userData[comment.userID].name}}</a>
			  	  			  </span>
						  			<div v-if="comment.editing && this.state.loggedin" style="display:inline-block;width:calc(100% - 350px);">
    	  			  		  <input
		  					  			:ref="'comment' + comment.id"
			  					  		class="commentInput"
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
										    @click='deleteComment(comment, item)'
										    class="commentDeleteButton"
  											style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;"
	  									></button>
  	  							</div>
                    <div v-else style="display: inline-block;width: calc(100% - 400px);padding-right: 0;">
                      <span class="commentText" v-html="comment.text" v-linkified style="width: calc(100% - 68px)"></span>
                      <button
                        v-if="comment.userID == state.loggedinUserID || state.isAdmin"
                        @click='toggleEditMode(comment)'
                        class="commentEditButton"
                        style="min-width: 0;margin:0;margin-top:-1px;height: 25px;left: 0;display: inline-block;background-image:url(https://lookie.jsbot.net/uploads/2cyWBg.png);"
                      ></button>
  								  </div>
	  							  <span class="timestamp" v-html="processedTimestamp(comment.date)" style="float: right;display: inline-block!important;"></span>
		  							<div style="clear:both;"></div>
			  				  </div>
				  		  </div>
			  	    </div>
              <div v-else>
                -- no comments --
	    					<div v-if="!state.loggedin">(log in to comment on this demo)</div>
              </div>
              <div v-if="state.loggedin">
                <input v-on:keyup.enter="postComment(item.id)" :ref="'newComment' + item.id" placeholder="say something..." class="commentInput newComment" style="margin-left: 0;margin-top: 16px;">
                <button
                  @click="postComment(item.id)"
                  style="padding: 2px;padding-bottom: 4px;margin: 0;margin-left: 25px;display: block; margin-top: 12px; min-width: initial; padding-left: 10px; padding-right: 10px;float:left;"
                >post</button>
                <div style="clear:both"></div>
              </div>
  					</div>
					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import Controls from './Controls'
import demoHeader from './demoHeader'
export default {
  components:{
    Header,
    Controls,
    demoHeader
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
    filteredDemos(){
      return this.state.demos.filter(v=>v.show)
    },
    origin(){
      return window.location.origin
    }
  },
  methods:{
		toggleEditMode(comment){
			comment.editing = !comment.editing
			if(comment.editing){
				this.$nextTick(()=>{
			    this.$refs['comment' + comment.id].focus()
          this.$refs['comment' + comment.id].select()
				})
			}
		},
    deleteComment(comment, item){
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
            item.comments = item.comments.filter(v=>v.id != id)
            console.log('comment deleted...')
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
          itemID: id
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
  		  	  this.state.demos.filter(v=>v.id==id)[0].comments.push(comment)
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
			let mn = ''+d.getMinutes()
      if(mn.length < 2) mn = '0' + mn
			return hours[d.getHours()] + ':' + mn + (d.getHours<12?'AM':'PM') + ' - ' + days[d.getDay()] + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear()
		},
    toggleShowForkHistory(item){
      if(item.showForkHistory){
        item.showForkHistory = false
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
      } else {
        item.showForkHistory = true
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      }
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
    deleteDemo(id){
      if(confirm('ARE YOU SURE YOU WANT TO DELETE THIS DEMO?\n\n\n           >>>  FOREVER  <<<\n\n\nThis CANNOT BE UNDONE!')){
        let sendData = {
          userName: this.state.loggedinUserName,
          demoID: id,
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
          if(data[0]){
            window.location.reload()
          }
        })
      }
    },
    playPause(itemID){
      this.state.demos.filter(v=>v.id==itemID)[0].play = !this.state.demos.filter(v=>v.id==itemID)[0].play
    },
    updateDemoTitle(itemID){
      let sendData = {
        userName: this.state.loggedinUserName,
        newTitle: this.state.demos.filter(v=>v.id==itemID)[0].title,
        passhash: this.state.passhash,
        demoID: itemID
      }
      fetch(this.state.baseURL + '/updateDemoTitle.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data[0]){
          this.titleUpdated = 1
          setTimeout(()=>this.titleUpdated = 0, 1000)
        } else {
          this.titleUpdated = -1
          setTimeout(()=>this.titleUpdated = 0, 1000)
        }
      })
    },
    updateVideoURL(itemID){
      let sendData = {
        userName: this.state.loggedinUserName,
        newURL: this.state.demos.filter(v=v.id==itemID)[0].videoLink,
        passhash: this.state.passhash,
        demoID: itemID
      }
      fetch(this.state.baseURL + '/updateVideoURL.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data[0]){
          this.URLUpdated = 1
          setTimeout(()=>this.URLUpdated = 0, 1000)
        } else {
          this.URLUpdated = -1
          setTimeout(()=>this.URLUpdated = 0, 1000)
        }
      })
    },
    fullScreen(id){
      this.state.openFullscreen(this.$refs['iframe'+id])
    },
    startStopDemos(){
      let vtop=0
      let vbottom=window.innerHeight
      let rect
      document.querySelectorAll('.demoIframe').forEach((v,idx)=>{
        rect = v.getBoundingClientRect()
        this.state.inView[idx] = !(((rect.bottom + rect.top) / 2 > vbottom)||((rect.top + rect.bottom) / 2 < 0))
      })
    },
    sync(e){

      let rect

      let l=document.querySelectorAll('.demoItem')
      if(l.length){
        rect = l[l.length-1].getBoundingClientRect()
        if(rect.top < window.innerHeight/2 && this.state.demos.filter(v=>!v.show).length){
          setTimeout(()=>{
            let s = false
            this.state.demos.map(v=>{
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
        this.startStopDemos()
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
          this.startStopDemos()
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
    update(id){
      if(this.state.loggedin){
        let demoHTML = this.$refs['HTML' + id].value
        let demoCSS = this.$refs['CSS' + id].value
        let demoJS = this.$refs['JS' + id].value
        let sendData = {demoHTML, demoCSS, demoJS, demoID: id, userName: this.state.loggedinUserName, passhash: this.state.passhash}
        fetch(this.state.baseURL + '/updateDemo.php', {
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
    },
    
    vidThumb(item){
			let link = item.videoLink
			if(link.substring(link.length-3).toUpperCase() === 'MP4'){
				return item.videoIframeURL
			} else {
        return '//img.youtube.com/vi/' + link.split('/')[link.split('/').length-1] + '/0.jpg'
			}
    },
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
.demoGraphicsCluster{
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
.demoItem{
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
  max-width: 1200px;
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
.demoContainer{
  background: linear-gradient(135deg, #000, #024);
  padding-top:155px;
  padding-bottom: 100px;
  min-height: calc(100vh - 280px);
  text-align: center;
  position: absolute;
  width:100%;
  min-width: 475px;
  transition: 0.5s padding-top;
  min-height: calc(100vh - 180px);
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
.demoTitle{
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
.deleteDemoButton{
  margin: 0;
  padding: 2px;
  padding-bottom: 4px;
  padding-left: 5px;
  margin-left: -255px;
  padding-right: 5px;
  width: 130px;
  min-width: 100px;
  border-radius: 10px;
  color: #fbaa;
  background: #512;
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
.demoInput{
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
.showForkHistoryButton{
  position: absolute;
  min-width: 0;
  font-size: 16px;
  line-height: .9em;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background: #c94;
  color: #000;
  font-weight: 900;
  height: 53px;
}
.slideRight{
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
	background-image: url(https://lookie.jsbot.net/uploads/XeGsK.png);
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
  background-image: url(https://lookie.jsbot.net/uploads/ct1hv.png);
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
</style>
