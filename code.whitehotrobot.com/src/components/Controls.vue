<template>
  <div class="controls" :class="{'shortControlsContainer':!state.showControls}">
    <div class="controlsWorkingSpace">
      <div @click="state.toggleShowControls" :class="{'showImg':!state.showControls, 'hideImg': state.showControls}"></div>
      <div v-if="state.showControls">
        <img
          src="https://lookie.jsbot.net/uploads/1GY3GM.png"
          class="appLogo"
        >
        <label class="autoPlayLabel">
          <input type="checkbox" class="autoPlayCheckbox" @click="state.toggleAutoplay()" :checked="state.autoplay">
          autoplay<br>demos
        </label>
        <button @click="state.createDemo()">create demo</button>
        <button @click="doReg()">sign up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: [ 'state' ],
  data(){
    return {
    }
  },
  methods:{
    doReg(){
      this.state.showRegister = true
      this.state.showLoginPrompt()
    }
  }
}
</script>

<style>
.controls{
  position: fixed;
  top: 61px;
  z-index: 2000;
  height: 60px;
  width: 93%;
  height: 150px;
  max-width: 1240px;
  min-width: 675px;
  background: url(https://lookie.jsbot.net/uploads/2iIUmH.png) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  text-align: center;
  transition: height .5s;
}
.controlsWorkingSpace button{
  background: linear-gradient(90deg, #158d, #145d);
  border: 1px solid #afc4;
  color: #def;
  margin-top: -20px;
  margin-right:60px;
  margin-left:60px;
}
.controlsWorkingSpace button:focus{
  outline: none;
}
.controlsWorkingSpace{
  max-width: 1200px;
  width: calc(90% - 30px);
  position: relative;
  left: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%);
}
.appLogo{
  opacity: .6;
  width:130px;
  position: absolute;
  top:0;
  left: 50%;
  z-index: -1;
  margin-left: -60px;
  margin-top: 0px;
}
.hideImg{
  width: calc(50px * 1.5);
  height: calc(19px * 1.5);
  background: url(https://lookie.jsbot.net/uploads/v9UDT.png) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: absolute;
  top: 10px;
  left: calc(50% - 90px);
  cursor: pointer;
}
.shortControlsContainer{
  height: 0px!important;
}
.showImg{
  width: calc(50px * 1.5);
  height: calc(19px * 1.5);
  background: url(https://lookie.jsbot.net/uploads/1tgOjR.png) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: absolute;
  top: 10px;
  left: calc(50% - 90px);
  cursor: pointer;
}
.autoPlayLabel{
  position: absolute;
  left: calc(50% + 70px);
  margin-top: -45px;
  margin-left: 40px;
  font-size: .8em;
  line-height: .9em;
  text-align: left;
}
.autoPlayCheckbox{
  margin-left: -23px;
  position: absolute;
  transform: scale(2.0);
  margin-top: 11px;
}
</style>
