<template>
  <div class="header">
    <div class="contactMenu">
      <button @click="launchWeb()" class="socialButton" title="videos and playlists https://whitehotrobot.com">
        <img src="../assets/web.png" class="socialIcon">
      </button>
      <!--
      <button @click="launchFacebook()" class="socialButton" title="Open our Facebook Page">
        <img src="../assets/facebook.png" class="socialIcon">
      </button>
      -->
      <button @click="launchEmail()" class="socialButton" title="contact">
        <img src="../assets/email.png" class="socialIcon">
      </button>
      <button @click="launchAdmin()" class="socialButton" title="Admin Section">
        <img src="../assets/admin.png" class="socialIcon">
      </button>
    </div>
    <div class="workingSpace">
      <div class="loggedinDiv">
        <div v-if="state.loggedin" class="loggedInTitle">
          <span style="color: #afe;font-size: 16px;">Welcome,</span><br>
          <a :href="'/u/' + state.loggedinUserName" v-html="truncate(state.loggedinUserName)"></a>
        </div>
        <Account :state="state"/>
      </div>
      <div class="infoButton" title="about whitehot robot" @click="launchInfoPage()"></div>
      <a :href="state.baseURL" class="appName">
        <div class="appNameText">Videos<br> & Demos</div>
        <div class="clear"></div>
      </a>
    </div>
  </div>
</template>

<script>
import Account from './Account'
export default {
  components: {
    Account
  },
  name: 'Header',
  props: [ 'state' ],
  methods:{
    launchInfoPage(){
      let a = document.createElement('a')
      a.setAttribute('href', 'https://whitehotrobot.com/about')
      a.setAttribute('target', '_blank')
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.parentNode.removeChild(a)
    },
    launchFacebook () {
      window.open('https://www.facebook.com/RedwoodFord/', '_blank')
    },
    launchInstagram () {
      window.open('https://www.instagram.com/redwoodford/?hl=en', '_blank')
    },
    launchEmail () {
      location.href = 'mailto:whitehotrobot@gmail.com?subject=I%20come%20from%20the%20Internet!&body=I%20have%20a%20comment%20or%20concern%20about%20the%20website(code.whitehotrobot.com)...'
    },
    launchWeb () {
      window.open('http://whitehotrobot.com/', '_blank')
    },
    launchAdmin () {
      window.open('https://whitehotrobot.com/admin/', '_blank')
    },
    truncate(str){
      if(typeof str === 'undefined') return
      return str.length > 16 ? str.substring(0,12) + '...' + str.substring(str.length-3) : str
    }
  }
}
</script>

<style>
.appName{
  float: right;
  position: relative;
  top:50%;
  padding: 2px;
  transform: translateY(-50%);
  text-decoration: none;
  background: #1350 url(https://lookie.jsbot.net/uploads/1GY3GM.png) no-repeat;
  background-position: 10px 50%;
  background-size: 50px 50px;
  height: 50px;
  border-radius: 10px;
  min-width: 180px;
  
}
.appNameText{
  position: absolute;
  left: 62%;
  top: 50%;
  width: 100%;
  transform: translate(-50%,-50%);
}
.clear{
  clear: both;
}
.header{
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 60px;
  width: 100%;
  background: linear-gradient(90deg, #0008, #0348);
  border-bottom: 1px solid #2ef6;
  font-size: 24px;
  text-align: center;
  overflow: hidden;
}
.workingSpace{
  max-width: 1200px;
  position: relative;
  left: 50%;
  height: 100%;
  transform: translate(-50%);
}
.loggedInTitle{
  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
  top:0;
  left: 0;
  color: #ff6;
  font-size:16px;
  text-align: left;
  line-height: 1.6em;
}
.loggedinDiv{
  position: absolute;
  height: 60px;
  width: 250px;
  top: 0;
}
.username{
  font-size: 1em;
}
.infoButton{
  position: relative;
  width: 40px;
  height: 40px;
  top: 10px;
  z-index: 1000;
  margin-right: 5px;
  float: right;
  background-image: url(https://lookie.jsbot.net/uploads/WEOZD.png);
  background-repeat: no-repeat;
  background-size: 40px 40px;
  background-position: center center;
  cursor: pointer;
}
a{
  color: #ff0!important;
  text-decoration: none;
}
.contactMenu{
  position: absolute;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%);
  margin-top: 8px;
}
.socialIcon{
  height: 28px;
  margin-bottom: 4px;
}
.socialButton{
  width: 60px!important;
  cursor: pointer;
  margin: 5px;
  padding: 2px;
  border-radius: 5px;
  background: #123;
  border: 1px solid #1ae8;
  font-weight: 900;
  color: #204;
  font-size: 30px;
  height: 35px;
  min-width: 40px!important;
  max-width: 50px;
  font-family: 'Oxanium';
}
.socialButton:focus{
  outline: none;
}
</style>
