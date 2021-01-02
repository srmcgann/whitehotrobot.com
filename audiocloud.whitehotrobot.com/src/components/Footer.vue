<template>
  <div ref="footerBar" class="footerBar">
    <div class="footerMenu">
      <button @click="launchWeb()" class="socialButton" title="Code & Demos https://code.whitehotrobot.com">
        <img src="../assets/web.png" class="socialIcon">
      </button>
      <!--
      <button @click="launchFacebook()" class="socialButton" title="Open our Facebook Page">
        <img src="../assets/facebook.png" class="socialIcon">
      </button>
      -->
      <button @click="launchEmail()" class="socialButton" title="Email us!">
        <img src="../assets/email.png" class="socialIcon">
      </button>
      <button @click="launchAdmin()" class="socialButton" title="Admin Section">
        <img src="../assets/admin.png" class="socialIcon">
      </button>
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
    launchFacebook () {
      window.open('https://www.facebook.com/RedwoodFord/', '_blank')
    },
    launchInstagram () {
      window.open('https://www.instagram.com/redwoodford/?hl=en', '_blank')
    },
    launchEmail () {
      location.href = 'mailto: whitehotrobot.com@gmail.com?subject=I%20come%20from%20the%20Internet!&body=I%20have%20a%20comment%20or%20concern%20about%20the%20website...'
    },
    launchWeb () {
      window.open('http://code.whitehotrobot.com/', '_blank')
    },
    launchAdmin () {
      window.open('https://whitehotrobot.com/admin/', '_blank')
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
  background: linear-gradient(90deg, #000, #023a);
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