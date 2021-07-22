<template>
  <div ref="inputBar" class="inputBar" :class="{'bumpUp': !state.supressFooter}">
    <div class="nick">
      <div class="nickInner">
        {{this.state.nick}}
      </div>
    </div>
    <input
      type="text"
      class="userInput"
      :class="{'show': state.loggedin, 'hide': !state.loggedin}"
      ref="userInput"
      spellcheck="false"
      autofocus="true"
      v-on:keydown.enter="sendLine()"
      v-on:keydown.up="doHistory(-1)"
      v-on:keydown.page-up.shift.stop.prevent="changeTab(-1)"
      v-on:keydown.page-down.shift.stop.prevent="changeTab(1)"
    >
  </div>
</template>
<script>
export default {
  name: 'InputBar',
  props: [ 'state' ],
  data () {
    return {
      historyPointer: 0
    }
  },
  methods: {
    sendLine(){
      let userInput = this.$refs.userInput
      let text = userInput.value
      userInput.value = ''
      if(text && this.state.sendLine(text)){
        let curChan = this.state.channels.filter(v=>v.active)[0]
        curChan.history = [text, ...curChan.history]
        curChan.history = curChan.history.filter((v,i)=>i<this.state.maxInputHistoryLength)
        this.historyPointer = 0
      }
    },
    changeTab(direction){
      this.state.channels.map(v=>v.active-false)
      let newIdx = this.state.curChannelId + direction
      if(newIdx < 0) newIdx = this.state.channels.length - 1
      if(newIdx > this.state.channels.length - 1) newIdx = 0
      this.state.channels[newIdx].active = true
      this.$set(this.state.channels[newIdx], 'active', true)
      this.state.curChannelId = newIdx
    },
    doHistory(val){
      let curVal = this.$refs.userInput.value
      let curChan = this.state.channels.filter(v=>v.active)[0]
      this.historyPointer -= +val
      this.historyPointer = Math.min(curChan.history.length , Math.max(0, this.historyPointer))
      this.$refs.userInput.value = this.historyPointer > 0 ? curChan.history[this.historyPointer-1] : ''
    }
  },
  watch:{
    'state.channelChange'(){
      this.$refs.userInput.focus()
    }
  },
  mounted(){
  }
}
</script>
<style scoped>
.inputBar{
  opacity: 1;
  position: fixed;
  z-index: 99;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 35px;
  font-size: 32pxi;
  color: #603;
  background: #024;
  transition: opacity 2s;
}
.bumpUp{
  bottom: 45px; /* footer height */
}
.nick{
  position: absolute;
  left: 0px;
  color: #0f8;
  font-size: 20px;
  vertical-align: center;
  width: 200px;
  height: 35px;
  text-align: right;
  padding-right: 4px;
  word-break: break-all;
}
.nickInner{
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}
.userInput{
  width: calc(100% - 200px);
  float: right;
  color: #ace;
  background: #000;
  font-family: 'Ubuntu Mono';
  padding-left: 3px;
}
</style>
<style>
.hide{
  display: hidden;
}
.show{
  display: block;
}
</style>
