<template>
  <div ref="inputBar" class="inputBar" :class="{'bumpUp': !state.supressFooter}">
    <div class="nick">
      <div class="nickInner">
        {{this.state.nick}}
      </div>
    </div>
    <textarea
      type="text"
      class="userInput"
      :class="{'show': state.loggedin, 'hide': !state.loggedin}"
      ref="userInput"
      spellcheck="false"
      autofocus="true"
      v-on:keyup.enter="checkLine()"
      v-on:keydown.enter="sendLine()"
      v-on:keydown.up="doHistory(-1)"
      v-on:keydown.down="doHistory(1)"
      v-on:keydown.page-up.shift.stop.prevent="changeTab(-1)"
      v-on:keydown.page-down.shift.stop.prevent="changeTab(1)"
      v-on:keydown.tab.stop.prevent="attemptAutoComplete()"
      v-on:keydown.left="resizeTextarea()"
      v-on:keydown.right="resizeTextarea()"
      v-on:keydown.backspace="resizeTextarea()"
      v-on:keydown.delete="resizeTextarea()"
      @input="resizeTextarea()"
    ></textarea>
  </div>
</template>
<script>
export default {
  name: 'InputBar',
  props: [ 'state' ],
  data () {
    return {
      historyPointer: 0,
      backupUserInputValue: '',
      tabComplete: false
    }
  },
  methods: {
    checkLine(){
      let userInput = this.$refs.userInput
      if(userInput.value == "\n") userInput.value = ''
      this.resizeTextarea()
    },
    sendLine(){
      let userInput = this.$refs.userInput
      let text = userInput.value
      let curChan = this.state.channels[this.state.curChannelId]
      text.split("\n").map(v=>{
        if(v && this.state.sendLine(v)){
          let curChan = this.state.channels.filter(v=>v.active)[0]
          curChan.history = [v, ...curChan.history]
          curChan.history = curChan.history.filter((v,i)=>i<this.state.maxInputHistoryLength)
          this.historyPointer = 0
        }
      })
      userInput.value = ''
      this.resizeTextarea()
    },
    attemptAutoComplete(){
      let userInput = this.$refs.userInput
      let strs = userInput.value.substring(0, userInput.selectionStart).split(' ')
      let str = strs[strs.length-1]
      let line = userInput.value
      let found = false
      let pos, possibleNick
      this.state.channels[this.state.curChannelId].users.map(v=>{
       if(!found){
          possibleNick = this.state.rawNick(v.nick)
          if(possibleNick.toUpperCase().indexOf(str.toUpperCase()) === 0){
            if(str != 'possibleNick'){
              found = true
              pos = userInput.selectionStart
              line = [line.slice(0, pos), possibleNick.substring(str.length), line.slice(pos)].join('')
            }
          }
        }
      })
      if(found){
        this.backupUserInputValue = userInput.value
        userInput.value = line
        this.setCaretPosition(userInput, pos + possibleNick.length+1)
        this.tabComplete = true
      }
    },
    setCaretPosition(el, caretPos) {
      if(el) {
        if(el.createTextRange) {
        let range = el.createTextRange()
        range.move('character', caretPos)
        range.select();
        } else {
          if(el.selectionStart) {
            el.focus();
            el.setSelectionRange(caretPos, caretPos)
          } else {
            el.focus()
          }
        }
      }
    },
    changeTab(direction){
      let curIdx
      this.state.channels.map((v,i)=>{
        if(v.active) curIdx = i
      })
      this.state.channels.map(v=>v.active=false)
      let newIdx = curIdx + direction
      if(newIdx < 0) newIdx = this.state.channels.length - 1
      if(newIdx > this.state.channels.length - 1) newIdx = 0
      this.state.channels[newIdx].active = true
      this.$set(this.state.channels[newIdx], 'active', true)
      this.state.curChannelId = newIdx
      this.resizeTextarea()
    },
    doHistory(val){
      let curVal = this.$refs.userInput.value
      if(curVal.indexOf("\n") !== -1) return
      let curChan = this.state.channels.filter(v=>v.active)[0]
      this.historyPointer -= +val
      this.historyPointer = Math.min(curChan.history.length , Math.max(0, this.historyPointer))
      this.$refs.userInput.value = this.historyPointer > 0 ? curChan.history[this.historyPointer-1] : ''
      this.resizeTextarea()
    },
    resizeTextarea(){
      let userInput = this.$refs.userInput
      userInput.style.height = "auto"
      let sh = userInput.value.split('').filter(v=>v=="\n").length 
      userInput.style.marginTop = (this.state.userAgent.toUpperCase().indexOf('FIREFOX')!= -1 ? 0 : (24 - (Math.min(500, userInput.scrollHeight)) + ((userInput.value.indexOf("\n") === -1) ? 24 : 0))) + 'px';
      userInput.style.height = ((Math.min(500, userInput.scrollHeight) - ((userInput.value.indexOf("\n") === -1) ? 24 : 0))-(this.state.userAgent.toUpperCase().indexOf('FIREFOX') !== -1 ? 0: 0)) + 'px'
      userInput.style.overflowY = userInput.clientHeight > 490 ? 'scroll' : 'hidden'
      //userInput.style.marginTop = (-userInput.scrollHeight + 31 - ((userInput.value.indexOf("\n") !== -1) ? 0 : -12)) + 'px'
      //this.tabComplete=false
    }
  },
  watch:{
    'state.channelChange'(){
      this.$refs.userInput.focus()
    },
    'state.insertTextIntoBar'(val){
      let userInput = document.querySelectorAll('.userInput')[0]
      userInput.value = '/msg ' + val + ' '
      this.setCaretPosition(userInput, userInput.value.length)
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
  background: #011;
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
  word-break: break-word;
  color: #ace;
  height: 30px;
  border: none;
  overflow-y: hidden;
  font-size: 24px;
  border-bottom: 2px solid #2fa;
  background: #0004;
  line-height: 1em;
  color: #aaa;
  font-family: 'Ubuntu Mono';
  padding-left: 3px;
}
.userInput:focus{
  outline: none;
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
