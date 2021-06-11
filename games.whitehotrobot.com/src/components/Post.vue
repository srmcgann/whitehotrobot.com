<template>
  <div class="postContainer"
    :ref="'postContainer' + post.id"
    :class="{'singlePost': state.mode=='post'}"
  >  
    <button v-if="state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin" class="deletePostButton" @click="deletePost(post)">
    </button>
    <div class="avatar" :style="'float: left;max-width: 100px;background-image:url('+state.getAvatar(post.userID)+');width:100px;height:100px;background-repeat: no-repeat; background-position: center center; background-size: cover;'"></div>
    <a :href="state.baseURL + '/u/' + post.author" target="_blank" class="link" v-html="post.author" style="float: left;"></a>
    <div v-if="state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin" class="postElem" style="display: inline-block;width:490px;float:left;">
      <span style="word-break: keep-all;display: inline-block;">{{post.views + ' view' + (post.views != 1 ? 's' : '')}}</span>
      <button class="revertButton" v-html="showRevert ? 'close':'revert changes'" @click="showRevert = !showRevert"></button>
      <div v-if="showRevert" class="revertMenu">
        <div style="font-size: 18px;color: #ccc; background: #012;padding: 5px; margin-bottom: 10px;">snapshots</div>
        <div v-if="!post.backups.length" style="color:#ace; font-size: 14px;text-align: left;padding: 10px;">
          no backups yet...<br><br>
          backups happen at the following intervals:<br><br>
          &bull; half-hourly<br>
          &bull; daily<br>
          &bull; weekly<br>
          &bull; monthly<br>
          &bull; yearly<br>
        </div>
        <div v-else>
          <div v-for="backup in post.backups">
              <button @click="revertTo(backup, post.id)" class="revertInnerButton" v-html="backup.backup_date"></button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="postElem" style="min-width: 400px; width: 50%; text-align: center;margin-top: 10px;margin-left: auto; margin-right: auto;">
      <span class="postTitle" v-html="'<span style=\'font-size: .8em;color:#aaa;\'>Title:</span> ' + '&quot;'+post.title+'&quot;'" style="font-size: 26px;font-style:oblique;color: #0f8;word-break: break-word"></span>
      <span style="margin-left: 20px;word-break: keep-all;display: inline-block;">{{post.views + ' view' + (post.views > 1 ? 's' : '')}}</span>
    </div>
    <table>
      <tr v-if="state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin">
        <td class="tdLeft">title </td>
        <td class="tdRight">
          <input
            maxlength="128"
            :class="{'success':updated['title']==1,'failure':updated['title']==-1}"
            placeholder="post name"
            class="textInput" 
            @input="updatePostItem(post.id, 'title')" type="text" v-model="post.title"
          >
        </td>
      </tr>
      <tr v-if="post.description || state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin">
        <td class="tdLeft">description </td>
        <td class="tdRight">
          <div v-if="state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin" class="postElem">
            <input
               maxlength="256"
              placeholder="description"
              :class="{'success':updated['description']==1,'failure':updated['description']==-1}"
              class="textInput" 
              @input="updatePostItem(post.id, 'description')" type="text" v-model="post.description"
            >
          </div>
          <div v-else class="postElem">
            <span class="date" v-html="post.description"></span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="tdLeft">tags </td>
        <td class="tdRight">
          <div v-if="state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin" class="postElem">
            <input
               maxlength="256"
              placeholder="tags"
              :class="{'success':updated['tags']==1,'failure':updated['tags']==-1}"
              class="textInput" 
              @input="updatePostItem(post.id, 'tags')" type="text" v-model="post.tags"
            >
          </div>
          <div v-else class="postElem">
            <span class="date" v-html="post.tags"></span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="tdLeft">added </td>
        <td class="tdRight">
          <span class="date" v-html="formattedDate(post.date)"></span>
        </td>
      </tr>
      <tr>
        <td class="tdLeft">share </td>
        <td class="tdRight">
          <a class="fileLink" target="_blank" :href="state.baseURL + '/post/' + state.decToAlpha(post.id)" v-html="'/'+state.decToAlpha(post.id)"></a>
          <!--
          <a
            v-if="post.allowDownload == 1 || state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin"
            class="fileLink"
            :href=""
            :download=""
            style="margin-left: 10px;"
          >
            download file
          </a>
          -->
        </td>
      </tr>
    </table>
    <table>
      <tr v-if="state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin">
        <td class="tdLeft">
        </td>
        <td class="tdRight" style="padding-right: 30px;">
          <label :for="'privateCheckbox' + post.id" :key="'cblabel'+post.id" class="checkboxLabel" style="padding-top: 5px;margin-bottom:0px;display: inline-block;margin-left: 0;" title="omit this post from the home page">
            <input type="checkbox" :key="'cbkey'+post.id" :id="'privateCheckbox' + post.id" v-model="post.private" @input="updatePostItem(post.id, 'private')">
            <span class="checkmark"></span>
            <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;">private</span>
          </label>
        </td>
        <td class="tdLeft">
          <label :for="'editHTMLCheckbox' + post.id" :key="'cblabel'+post.id" class="checkboxLabel" style="padding-top: 5px;margin-bottom:0px;display: inline-block;margin-left: 0;" title="omit this post from the home page">
            <input type="checkbox" :key="'cbkey'+post.id" :id="'editHTMLCheckbox' + post.id" v-model="post.editHTML" @input="grabData(post, post.id)">
            <span class="checkmark"></span>
            <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;">edit HTML</span>
          </label>
        </td>
      </tr>
    </table>
    <div class="textareaContainer" type="text">
      <textarea
        v-if="post.editHTML"
        @input="updatePostItem(post.id, 'text')"
        v-model="post.text"
        :class="{'textareasuccess':updated['text']==1 && !post.editHTML,
                 'failure':updated['text']==-1 && !post.editHTML,
                 'editHTMLsuccess':updated['text']==1 && post.editHTML,
                 'editHTMLfailure':updated['text']==-1 && post.editHTML,
                 'editHTML':post.editHTML
                 }"
        v-html="post.text"
        style="margin-top: 10px;"
       ></textarea>
       <div
         v-else-if="state.loggedinUserName.toUpperCase() == post.author.toUpperCase() || state.isAdmin" contenteditable="true" style="display: inline-block;" class="contenteditable" v-html="post.text"
        :ref="'contenteditable' + post.id"
        @input="updatePostItem(post.id, 'text')"
        @paste="updatePostItem(post.id, 'text')"
        :class="{'textareasuccess':updated['text']==1 && !post.editHTML,
                 'failure':updated['text']==-1 && !post.editHTML,
                 'editHTMLsuccess':updated['text']==1 && post.editHTML,
                 'editHTMLfailure':updated['text']==-1 && post.editHTML,
                 'editHTML':post.editHTML
                 }"
        >
       </div>
       <div
         v-else style="display: inline-block;" class="contenteditable" v-html="post.text"
        >
       </div>
    </div>

    <div class="commentContainer">
      <div class="commentsHeader" style="background: linear-gradient(90deg, #121f, #1113, #0000);display: inline-block;padding-right: 200px;padding-left: 10px;color:#2f4;margin-bottom: 10px;height: 25px;line-height: 20px;margin-left: -10px;">
        comments
      </div>
      <div v-if="post.comments.length">
        <div v-for="comment in filteredComments">
          <div class="commentMain">
            <span class="timestamp" v-html="processedTimestamp(comment.date)" style="float: right;display: inline-block!important;"></span>
            <span  v-if="typeof state.userInfo[comment.userID] != 'undefined'" class="commentUserName" style="font-size: 20px;">
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
                @click='deleteComment(comment, post)'
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
        <div v-if="!state.loggedin" style="text-align: center;">(log in to comment on this post)</div>
      </div>
      <div v-if="state.loggedin">
        <input
          maxlength="1024"
          v-on:keyup.enter="postComment(post.id)"
          :ref="'newComment' + post.id" placeholder="say something..."
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
</template>

<script>
export default {
  name: 'Main',
  props: [ 'state', 'post' ],
  data(){
    return {
      showRevert: false,
      showComments: 3,
      moreCommentsVal: 3,
      updated:{
        title: 0,
        text: 0,
        description: 0,
        favicon: 0
      },
      postdata: [],
    }
  },
  methods:{
    updatePostItem(postID, item){
      let newItemVal
      if(this.state.search.string){
        newItemVal = this.state.search.posts.filter(v=>v.id==postID)[0][item]
      }else{
        switch(this.state.mode){
          case 'default':
            if(item == 'text' && !this.state.landingPage.posts.filter(v=>v.id==postID)[0]['editHTML']){
              let el = this.$refs['contenteditable' + postID]
              newItemVal = el.innerHTML
            }else{
              newItemVal = this.state.landingPage.posts.filter(v=>v.id==postID)[0][item]
            }
            break
          case 'post':
            if(item == 'text' && !this.state.posts.filter(v=>v.id==postID)[0]['editHTML']){
              let el = this.$refs['contenteditable' + postID]
              newItemVal = el.innerHTML
            }else{
              newItemVal = this.state.posts.filter(v=>v.id==postID)[0][item]
            }
            break
          case 'u':
            if(item == 'text' && !this.state.user.posts.filter(v=>v.id==postID)[0]['editHTML']){
              let el = this.$refs['contenteditable' + postID]
              newItemVal = el.innerHTML
            }else{
              newItemVal = this.state.user.posts.filter(v=>v.id==postID)[0][item]
            }
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
    revertTo(backup, postID){
      if(confirm("Are you SURE you want to revert to this backup?\n\nThis will replace all of this post's data with the data from this backup...\n\n>>> " + backup.backup_date + " <<<\n Including: text, title, description, tags, and comments...\n\n this is IRREVERSIBLE!!!")){
        this.state.loadPostFromBackup(this.post, backup.Database, this.$refs['contenteditable' + postID])
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
          postID: id
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
              postID: id,
              id: data[1],
              date: data[2]
            }

            if(this.state.search.string){
              this.state.search.posts.filter(v=>v.id==id)[0].comments.push(comment)
            }else{
              switch(this.state.mode){
                case 'u':
                this.state.user.posts.filter(v=>v.id==id)[0].comments.push(comment)
                break
                case 'default':
                this.state.landingPage.posts.filter(v=>v.id==id)[0].comments.push(comment)
                break
                case 'post':
                this.state.posts.filter(v=>v.id==id)[0].comments.push(comment)
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
    deletePost(post){
      if(confirm("\n\n\nAre you SURE you want to delete this post??!?!\n\n\n     Post: \"" + post.title + "\"\n     created: " + this.formattedDate(post.date) + "\n\n\nThis action is IRREVERSIBLE!!!!")){
        let sendData = {
          userName: this.state.loggedinUserName,
          postID: +post.id, 
          passhash: this.state.passhash
        }
        fetch(this.state.baseURL + '/deletePost.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(this.state.search.string){
            this.state.search.posts = this.state.search.posts.filter(v=>v.id!=post.id)
          }else{
            switch(this.state.mode){
              case 'u':
              this.state.user.posts = this.state.user.posts.filter(v=>v.id!=post.id)
              break
              case 'default':
              this.state.landingPage.posts = this.state.landingPage.posts.filter(v=>v.id!=post.id)
              break
              case 'post':
              this.state.posts = this.state.posts.filter(v=>v.id!=post.id)
              break
            }        
          }
        })
      }
    },
    grabData(post, postID){
      if(!post.editHTML){
        post.text = this.$refs['contenteditable'+ postID].innerHTML
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
    filteredComments(){
      return this.post.comments.filter((v,i)=>i<this.showComments)
    },
    moreComments(){
      return this.post.comments.length > this.showComments
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
    //if(this.state.mode == 'post'){
    //  document.getElementsByTagName('html')[0].scroll(0, document.getElementsByTagName('html')[0].clientHeight/3.5)
   // }
  }
}
</script>

<style scoped>
.postElem{
  display: inline-block;
  font-size: 20px;
}
.postTitle{
  color: #ff8;
  font-size: 1.2em;
}
.postContainer{
  display: inline-block;
  vertical-align: top;
  margin-left: 6px;
  margin-right: 6px;
  /*border: 1px solid #6fa3;*/
  border-radius: 3px;
  width: calc(100% - 200px);
  min-width: 600px;
  text-align: center;
  background: linear-gradient(#2438, #000);
  padding: 5px;
  margin-top: 25px;
}
.date{
  font-style: oblique;
  color: #ff8;
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
  background: #2466;
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
.singlePost{
  top: 60px;
  margin-bottom: 100px;
}
.bumpUp{
  margin-top: -25px;
}
.textareaContainer{
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
  border: 1px solid #48a0;
  resize: vertical;
  background: #0000;
  color: #ff0;
  line-height: 1em;
}
textarea{
  width: 100%;
  min-height: 200px;
  background: #012;
  resize: vertical;
  border: 1px solid #246a;
  color: #ff0;
}
textarea:focus{
  outline: #4686;
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
</style>
