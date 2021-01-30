<template>
  <div v-if="itemid === -1" style="font-size: 32px;background:#8338; max-width: 500px;margin-left: auto; margin-right:auto; color: #fcc;margin-top: 35px;">
    <br>
    &gt;&gt; deleted &lt;&lt;
    <br><br>
  </div>
  <div v-else class="demoHeader">
    <table v-if="typeof item !== 'undefined'">
      <tr><td class="leftCell"><i>demo title</i></td><td class="rightCell">
        <div v-if="state.isAdmin || state.loggedin && item.userID === state.loggedinUserID">
          <input
            type="text"
            :ref="'demoTitle' + item.id"
            maxlength="120"
            @click="$event.target.select()"
            v-model="item.title"
            class="input demoInput"
            :class="{'success':titleUpdated==1,'failure':titleUpdated==-1}"
            @input="updateDemoTitle(item.id)"
          >
        </div>
        <div v-else>
          {{item.title}}
        </div>
      </td></tr>
      <!--<tr><td class="leftCell"><i>author</i></td><td class="rightCell">{{item.author}}</td></tr>-->
      <tr v-if="state.isAdmin || state.loggedin && item.userID === state.loggedinUserID">
        <td class="leftCell">
          <i>video URL</i>
        </td><td class="rightCell">
          <input
            type="text"
            :ref="'videoLink' + item.id"
            maxlength="2048"
            @click="$event.target.select()"
            v-model="item.videoLink"
            class="input demoInput"
            :class="{'success':URLUpdated==1,'failure':URLUpdated==-1}"
            @input="updateVideoURL(item)"
          >
        </td>
      </tr>
      <tr><td class="leftCell"><i>views</i></td><td class="rightCell">{{item.views-1}}</td></tr>
      <tr><td class="leftCell"><i>created</i></td><td class="rightCell">{{formattedDate(item.created)}}</td></tr>
      <tr><td class="leftCell"><i>share</i></td><td class="rightCell">
        <a
          :href="origin+'/d/'+state.decToAlpha(item.id)"
          target="_blank"
          v-html="'/d/'+state.decToAlpha(item.id)"
          class="shareLink"
        ></a>
      </td></tr>
      <tr v-if="forkhistoryview"><td class="leftCell"><i>user</i></td><td class="rightCell">
        <a
          :href="origin+'/u/'+item.author"
          target="_blank"
          v-html="item.author"
          style = "text-decoration: none;"
        ></a>
      </td></tr>
      <tr v-else><td class="leftCell"></td><td class="rightCell">
        <a
          :href="origin+'/u/'+item.author"
          target="_blank"
          v-html="'/u/'+truncate(item.author)"
          class="shareLink"
        ></a>
      </td></tr>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      iteration: 0,
      cols: 0,
      e: [],
      titleUpdated: 0,
      item: [],
      URLUpdated: 0,
      spacers: [],
      wraptextareas: false
    }
  },
  name: 'demoHeader',
  props: [ 'state', 'itemid', 'forkhistoryview'],
  computed:{
    filteredDemos(){
      return this.state.demos.filter(v=>v.show)
    },
    origin(){
      return window.location.origin
    }
  },
  mounted(){
    if(typeof this.state.demos.filter(v=>v.id===this.itemid)[0] !== 'undefined'){
      this.item = this.state.demos.filter(v=>v.id===this.itemid)[0]
    } else {
      let sendData = {demoID: this.itemid}
      fetch(this.state.baseURL + '/getSingle.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(data => {
        if(data.length){
          if(typeof this.state.demos.filter(v=>v.id===this.itemid)[0] === 'undefined'){
            data[0].show = false
            this.state.demos.push(data[0])
            this.item = this.state.demos.filter(v=>v.id===this.itemid)[0]
          }
        }
      })
    }
  },
  methods:{
    truncate(str){
      if(typeof str === 'undefined') return
      return str.length > 9 ? str.substring(0,5) + '...' + str.substring(str.length-3) : str
    },
    updateDemoTitle(){
      let sendData = {
        userName: this.state.loggedinUserName,
        newTitle: this.item.title,
        passhash: this.state.passhash,
        demoID: this.item.id
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
    updateVideoURL(item){
      let sendData = {
        userName: this.state.loggedinUserName,
        newURL: this.item.videoLink,
        passhash: this.state.passhash,
        demoID: item.id
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
          this.state.extractEmbedURL(item)
					item.videoPlaying = false
          setTimeout(()=>this.URLUpdated = 0, 1000)
        } else {
          this.URLUpdated = -1
          setTimeout(()=>this.URLUpdated = 0, 1000)
        }
      })
    },
    formattedDate(d){
      let M=['January','February','March','April','May','June','July','August','September','October','November','December']
      var l=new Date(d)
      return M[l.getMonth()] + ' ' + l.getDate() + ', ' + l.getFullYear()// + ' • ' + (l.getHours()%12) + ':' + l.getMinutes() + ' ' + (l.getHours()<12?'AM':'PM')
    },
    vidThumb(link){
      return '//img.youtube.com/vi/' + link.split('/')[link.split('/').length-1] + '/0.jpg'
    }
  }
}
</script>

<style>
.demoHeader{
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 20px;
}
a{
  color: #8fc;
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
.vidThumb{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 10px);
  min-height: 125px;
  display: block;
}
.landscape{
  width: 50%;
}
.portrait{
  width:100%;
}
table{
  border-collapse: collapse;
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
.shareLink{
  font-weight: 400;
  font-size: 1em;
  margin: 3px;
  margin-left: 0;
  padding: 2px!important;
  padding-bottom: 4px;
  background: #144;
  text-decoration: none;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  min-width: 200px!important;
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
.disabledButton{
  color: #888;
  background: #333;
}
.display{
  display: block!important;
}
</style>
