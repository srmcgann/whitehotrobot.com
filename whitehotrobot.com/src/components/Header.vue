<template>
  <div
    class="header"
    :class="{'hidden': state.error404}"
  >
  <div class="infoButton" title="about whitehot robot" @click="launchInfoPage()"></div>
    <div v-if="!state.error404">
      <div style="position: relative; margin-top: -13px;">
        <div class="headerTitle">Whitehot Robot - Jukebox</div><br>
        <!--
        <div v-if="state.mode=='default'">
          default
        </div>
        <div v-else-if="state.mode=='single'">
          <span class="yellow">Video Title: </span> {{videoTitle(state.videos[0])}}
        </div>
        <div v-else-if="state.mode=='user'">
          <span class="yellow">User: </span> {{state.userName}}
        </div>
        <div v-else-if="state.mode=='playlist'">
          <span class="yellow">playlist:</span> {{state.playlist.name}}
        </div>
        -->
      </div>
    </div>
    <div class="bottomBorder">
    </div>
  </div>
</template>

<script>
export default {
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
    videoTitle(video){
      if(typeof video == 'undefined'){
        return ''
      } else {
        return this.state.videos[0].title
      }
    }
  },
  computed:{
  }
}
</script>

<style>
.header{
  position: fixed;
  padding: 14px;
  z-index: 50;
  background: linear-gradient(90deg, #0000, #155c, #0000);
  width: 800px;
  left: 50%;
  transform: translatex(-50%);
  font-size: 20px;
  text-align: center;
  max-height: 30px;
}
.infoButton{
  position: absolute;
  width: 40px;
  height: 40px;
  top: 10px;
  z-index: 1000;
  margin-left: 0;
  right: 0px;
  background-image: url(https://jsbot.cantelope.org/uploads/WEOZD.png);
  background-repeat: no-repeat;
  background-size: 40px 40px;
  background-position: center center;
  cursor: pointer;
}
.bottomBorder{
  position: absolute;
  width: 800px;
  top: calc(30px + 20px);
  height: 4px;
  background: linear-gradient(90deg, #0000, #4cf8, #0000);
}
.headerTitle{
  color: #8ff;
  font-weight: 900;
  font-style: oblique;
  font-size: 2.0em;
  display: inline-block;
}
</style>
