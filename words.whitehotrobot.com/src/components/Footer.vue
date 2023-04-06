<template>
  <div ref="footerBar" class="footerBar" id="footerBar">
    <div class="footerMenu">
      <button @click="launchPage('https://code.dweet.net')" class="socialButton" title="demos / code  https://code.dweet.net">
        <img src="https://jsbot.cantelope.org/uploads/1Zt7AV.png" class="socialIcon">
      </button>
      <button @click="launchPage('https://audiocloud.dweet.net')" class="socialButton" title="audiocloud https://audiocloud.dweet.net">
        <img src="https://jsbot.cantelope.org/uploads/1zROT5.png" class="socialIcon">
      </button>
      <button @click="launchPage('https://messaging.dweet.net')" class="socialButton" title="RobotNet Messaging https://messaging.dweet.net">
        <img src="https://jsbot.cantelope.org/uploads/1gojp0.png" class="socialIcon">
      </button>
      <button @click="launchPage('https://hosting.dweet.net')" class="socialButton" title="static page hosting https://hosting.dweet.net">
        <img src="../assets/web.png" class="socialIcon">
      </button>
      <button @click="launchPage('https://games.dweet.net')" class="socialButton" title="community browser games hosting https://games.dweet.net">
        <img src="../assets/games.png" class="socialIcon">
      </button>
      <!--
      <button @click="launchPage('https://words.dweet.net')" class="socialButton" title="blog / literature https://words.dweet.net">
        <img src="https://jsbot.cantelope.org/uploads/1oHzZO.png" class="socialIcon">
      </button>
      -->
      <button @click="launchPage('https://dweet.net')" class="socialButton" title="music videos / playlists https://dweet.net">
        <img src="https://jsbot.cantelope.org/uploads/cdR9g.png" class="socialIcon">
      </button>
      <!--
      <button @click="launchFacebook()" class="socialButton" title="Open our Facebook Page">
        <img src="../assets/facebook.png" class="socialIcon">
      </button>
      -->
      <button @click="launchEmail()" class="socialButton" title="whitehot robot email">
        <img src="../assets/email.png" class="socialIcon">
      </button>
      <!--
      <button @click="launchPage('https://dweet.net/admin')" class="socialButton" title="Admin Section">
        <img src="../assets/admin.png" class="socialIcon">
      </button>
      -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  props: [ 'state' ],
  data () {
    return {
    }
  },
  methods: {
    launchEmail () {
      location.href = 'https://email.dweet.net'
    },
    launchPage (loc) {
      window.open(loc, '_blank')
    },
    launchAdmin () {
      window.open('https://dweet.net/admin/', '_blank')
    }
  }
}
</script>
<style scoped>
.footerBar{
  opacity: 1;
  position: fixed;
  z-index: 99;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 45px;
  font-size: 32px;
  color: #603;
  border-top: 1px solid #2466;
  background: linear-gradient(90deg, #001c, #0046);
  transition: opacity 2s;
}
.footerMenu{
}
.socialIcon{
  height: 28px;
  margin-bottom: 4px;
}
.socialButton{
  width: 60px!important;
}
button{
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
</style>
