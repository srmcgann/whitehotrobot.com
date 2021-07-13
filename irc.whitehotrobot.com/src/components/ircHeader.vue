<template>
  <div v-if="loaded" class="ircHeader">
    <div v-if="irc.id === -1" style="font-size: 32px;background:#8338; max-width: 500px;margin-left: auto; margin-right:auto; color: #fcc;margin-top: 35px;">
      <br>
      &gt;&gt; deleted &lt;&lt;
      <br><br>
    </div>
    <div v-else >
      <table v-if="typeof irc !== 'undefined'">
        <tr><td class="leftCell"><i>irc title</i></td><td class="rightCell">
          <div v-if="state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID">
            <input
              type="text"
              :ref="'ircTitle' + irc.id"
              maxlength="120"
              @click="$event.target.select()"
              v-model="irc.title"
              class="input ircInput"
              :class="{'success':typeof irc.updated != 'undefined' && irc.updated.title==1,'failure':typeof irc.updated != 'undefined' && irc.updated.title==-1}"
              @input="state.updateIrcItem(irc, 'title')"
            >
          </div>
          <div v-else>
            {{irc.title}}
          </div>
        </td></tr>
        <!--<tr><td class="leftCell"><i>author</i></td><td class="rightCell">{{irc.author}}</td></tr>-->
        <tr v-if="state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID">
          <td class="leftCell">
            <i>video URL</i>
          </td><td class="rightCell">
            <input
              type="text"
              :ref="'videoLink' + irc.id"
              maxlength="2048"
              @click="$event.target.select()"
              v-model="irc.videoLink"
              class="input ircInput"
              :class="{'success':typeof irc.updated != 'undefined' && irc.updated.videoLink==1,'failure':typeof irc.updated != 'undefined' && irc.updated.videoLink==-1}"
              @input="state.updateIrcItem(irc, 'videoLink')"
            >
          </td>
        </tr>
        <tr>
          <td class="leftCell"><i>views</i></td>
          <td class="rightCell">
            {{irc.views-1}}
              <label v-if="state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID" :for="'privateCheckbox' + irc.id" :key="'cblabel'+irc.id" class="checkboxLabel" style="margin-bottom:0px;display: inline-block;margin-left: 100px;" title="omit this post from the home page">
                <input type="checkbox" :key="'cbkey'+irc.id" :id="'privateCheckbox' + irc.id" v-model="irc.private" @input="state.updateIrcItem(irc, 'private')">
                <span class="checkmark"></span>
                <span style="font-size: .93em;margin-top:0px;display: block;">private</span>
              </label>
          </td>
        </tr>
        <tr><td class="leftCell"><i>created</i></td><td class="rightCell">{{formattedDate(irc.created)}}</td></tr>
        <tr><td class="leftCell"><i>share</i></td><td class="rightCell">
          <a
            :href="origin+'/d/'+state.decToAlpha(irc.id)"
            target="_blank"
            v-html="'/d/'+state.decToAlpha(irc.id)"
            class="shareLink"
          ></a>
        </td></tr>
        <tr v-if="forkhistoryview"><td class="leftCell"><i>user</i></td><td class="rightCell">
          <a
            :href="origin+'/u/'+irc.author"
            target="_blank"
            v-html="irc.author"
            style = "text-decoration: none;"
          ></a>
        </td></tr>
        <tr v-else><td class="leftCell"></td><td class="rightCell">
          <a
            :href="origin+'/u/'+irc.author"
            target="_blank"
            v-html="'/u/'+truncate(irc.author)"
            class="shareLink"
          ></a>
        </td></tr>
        <tr v-if="!forkhistoryview">
          <td></td>
          <td style="text-align: left;">
            <button v-if="irc.forkHistory.length" @click="state.toggleShowForkHistory(irc)"
              class="showForkHistoryButton"
            >show fork history</button>
            <button v-if="(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID)"
              class="revertButton"
              v-html="showRevert ? 'close':'revert changes'"
              @click="showRevert = !showRevert"
              title="roll back changes to backed up versions, if available"
            ></button>
            <div v-if="(state.isAdmin || state.loggedin && irc.userID === state.loggedinUserID) && showRevert" class="revertMenu">
              <div style="font-size: 18px;color: #ccc; background: #012;padding: 5px; margin-bottom: 10px;">snapshots</div>
              <div v-if="!irc.backups.length" style="color:#ace; font-size: 14px;text-align: left;padding: 10px;">
                no backups yet...<br><br>
                backups happen at the following intervals:<br><br>
                &bull; hourly<br>
                &bull; daily<br>
                &bull; weekly<br>
                &bull; monthly<br>
                &bull; yearly<br>
              </div>
              <div v-else>
                <div v-for="backup in irc.backups">
                    <button @click="revertTo(backup, irc.id)" class="revertInnerButton" v-html="backup.backup_date"></button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      cols: 0,
      e: [],
      irc: {},
      titleUpdated: 0,
      spacers: [],
      showRevert: false,
      wraptextareas: false,
      loaded: false
    }
  },
  name: 'ircHeader',
  props: [ 'state', 'thisirc', 'ircid', 'forkhistoryview'],
  watch:{
    'state.closeMenus'(val){
      if(val){
       this.$nextTick(()=>{
         this.loaded = true
         this.showRevert = false
       })
      }
    }
  },
  mounted(){
    if(this.forkhistoryview){
      let sendData = {
        ircID: this.ircid
      }
      fetch(this.state.baseURL + '/fetchIrc.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(res=>res.json()).then(data=>{
        if(data){
          this.irc = this.thisirc[0] = data
          this.irc.updated = {}
          this.irc.private = !!(+this.irc.private)
          for (const [key, value] of Object.entries(this.irc)) {
            this.irc.updated[key]=0
          }
        }
        this.loaded = true
      })
    } else {
      this.irc = this.thisirc[0]
      this.loaded = true
    }
  },
  computed:{
    origin(){
      return window.location.origin
    }
  },
  methods:{
    revertTo(backup, ircID){
      if(confirm("Are you SURE you want to revert to this backup?\n\nThis will replace all of this irc's data with the data from this backup...\n\n>>> " + backup.backup_date + " <<<\n Including: code, title, video link, and comments...\n\n this is IRREVERSIBLE!!!")){
        this.loaded = false
        this.state.loadIrcFromBackup(this.irc, backup.Database)
        this.showRevert = false
      }
    },
    truncate(str){
      if(typeof str === 'undefined') return
      return str.length > 9 ? str.substring(0,5) + '...' + str.substring(str.length-3) : str
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
.ircHeader{
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 40px;
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
.ircItem{
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
.ircTitle{
  text-align: left;
  width: 100%;
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
.disabledButton{
  color: #888;
  background: #333;
}
.display{
  display: block!important;
}
.revertMenu{
  position: absolute;
  width: 200px;
  margin-top: 5px;
  border: 1px solid #2468;
  margin-left: 130px;
  background: #135e;
  z-index: 100;
  text-align: center;
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
.revertButton, .showForkHistoryButton{
  position: relative;
  font-size: 16px;
  line-height: .9em;
  font-size: .8em;
  padding: 5px;
  min-width: initial;
  margin: 0;
  margin-left: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
}
.showForkHistoryButton{
  background: #c94;
  color: #000;
}
.revertButton{
  background: #804;
  color: #fcc;
}
</style>
