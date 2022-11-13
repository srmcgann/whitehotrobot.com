<template>
  <div class="controls" v-if="!state.showUploadModal" :class="{'shortControlsContainer':!state.showControls}">
    <div class="controlsWorkingSpace">
      <div @click="state.toggleShowControls" title="show additional controls [ESC]" :class="{'showImg':!state.showControls, 'hideImg': state.showControls, 'bump': state.mode=='track'}" style="margin-top:-70px;"></div>
      <transition name="fade">
        <div v-if="state.showControls">
          <div class="navContainer">
            <div v-if="state.mode !== 'track'" class="advancedControls">
              <div style="position: absolute; z-index:-1!important;background: #246;width: 505px;height: 70px;opacity: .5;margin-top: -10px;margin-left: 60px;border-radius: 5px;"></div>
              <input id="searchInput" type="text" spellcheck="false" ref="searchInput" v-model="state.search.string" @input="state.beginSearch(1)" placeholder="search" class="textInput searchInput" style="display: inline-block;float: left;margin-bottom: 25px;margin-left: 75px;margin-top: 15px;position: relative!important: z-index:10000!important;">
              <label for="allWords" key="allwordslabel" class="checkboxLabel" style="float: left;padding: 0;margin:0;margin-left: 40px;padding-top: 5px;margin-bottom:0px;display: inline-block;">
                <input type="checkbox" :disabled="state.search.exact" :checked="state.search.allWords || state.search.exact" id="allWords" v-model="state.search.allWords" @input="state.beginSearch(1)">
                <span class="checkmark" style="margin-left: -30px;"></span>
                <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;padding:0;">require all words</span>
              </label>
              <br>
              <label for="exact" key="exactlabel" class="checkboxLabel" style="float: left;margin-left: 40px;text-align: left;;">
                <input type="checkbox" id="exact" v-model="state.search.exact" @input="state.beginSearch(1)">
                <span class="checkmark" style="margin-left: -30px;"></span>
                <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;padding:0;margin-left:-35px;">exact</span>
              </label>
              <div style="clear: both;"></div>
              <div v-if="state.search.hits" style="position: absolute;left: 50%;margin-left: -100px;margin-top: -80px;">
              ({{state.search.hits}} hits)
              </div>
              <label for="playall" class="checkboxLabel" style="margin:0; padding:0; margin-left: 25px; padding-left: 32px;">
                <input type="checkbox" id="playall" v-model="state.playall" @input="updateUserPrefs('audiocloudPlayAll')">
                <span class="checkmark" style="margin-top:-5px;"></span>
                <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;padding:0;">play all</span>
              </label>
              <label for="shuffle" class="checkboxLabel" style="display: inline-block; margin: 0; padding:0; margin-left: 50px;">
                <input type="checkbox" id="shuffle" v-model="state.shuffle" @input="updateUserPrefs('audiocloudShuffle')">
                <span class="checkmark" style="margin-left: -30px;margin-top:-5px;"></span>
                <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;padding:0;">shuffle</span>
              </label>
              <label for="disco" class="checkboxLabel" style="display: inline-block; margin: 0; margin-left: 24px;padding-left:32px; ">
                <input type="checkbox" id="disco" v-model="state.disco" @input="updateUserPrefs('audiocloudDisco')">
                <span class="checkmark" style="margin-left: 0px;margin-top:-5px;"></span>
                <span style="font-size:.8em;margin-top:0px;display:block;color:#ff8;padding:0;">disco</span>
              </label>
              <select v-if="state.loggedin && state.mode != 'track'" style="font-size: 18px;margin-left: 20px;vertical-align: top;margin-top: -4px;border: 1px solid #8ff4;display: inline-block;position: relative;" v-model="state.maxResultsPerPage"  @change="updateUserPrefs('audiocloudNumTracksPerPage')">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option style="background: #ff0;color: #000;" value="30">30</option>
                <option style="background: #f80;color: #000;" value="40">40</option>
                <option style="background: #800;color: #fff;" value="50">50</option>
              </select>
              <span v-if="state.loggedin" class="maxResultsLabel" style="color: #ff8;">max results</span>
              <button class="navButton" style="margin-left: 10px;font-size: 12px;min-height: 20px; height: 20px;width: 50px;margin-top: -1px;vertical-align: top;" title="hotkeys" @click="showHotkeys()">hotkeys</button>
            </div>
            <div v-else class="advancedControls">
              <label for="disco" style="margin-left: 20px;">
                <input id="disco" @input="updateUserPrefs('audiocloudDisco')" type="checkbox" v-model="state.disco">disco
              </label>
            </div>
          </div>
        </div>
      </transition>
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
    showHotkeys(){
      alert("hotkeys cheat-sheet...\n\n    [space] : play/pause current track\n    [right-key] : advance to the next song (shuffle applies)\n    [left-key] : restart track if pos > 5%, else prev. track (shuffle applies)\n    [shift+right-key] : advance track by 10s\n    [shift+left-key] : rewind track by 10s\n    [ESC] : show/hide advanced controls section\n    [enter] : jump to current playing track")
    },
    updateUserPrefs(pref){
      this.$nextTick(()=>{
        let newval
        switch(pref){
          case 'audiocloudPlayAll': newval = this.state.playall ? 0 : 1; break
          case 'audiocloudShuffle': newval = this.state.shuffle ? 0 : 1; break
          case 'audiocloudDisco': newval = this.state.disco ? 0 : 1; break
          case 'audiocloudNumTracksPerPage': newval = this.state.maxResultsPerPage; break
        }
        let sendData = {
          userName: this.state.loggedinUserName,
          passhash: this.state.passhash,
          pref,
          newval
       }
       fetch(this.state.baseURL + '/updatePrefs.php',{
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(pref == 'audiocloudNumTracksPerPage') window.location.reload()
        })
      })
    },
    doReg(){
      this.state.showRegister = true
      this.state.showLoginPrompt()
    }
  },
  watch:{
    'state.showControls'(val){
      if(val){
        this.$nextTick(()=>{
          this.$refs.searchInput.focus()
          this.$refs.searchInput.select()
        })
      }
    }
  },
  computed:{
    trackPlaying(){
      let ret = false
      if(typeof this.state.currentTrack != 'undefined' && typeof this.state.currentTrack == 'function'){
        if(this.state.currentTrack()){
          ret = !!this.state.currentTrack().length
        }
      }
      return ret
    },
    totalPages(){
      switch(this.state.mode){
        case 'u': return +this.state.totalUserPages; break
        case 'default': return +this.state.totalPages; break
      }
    },
    curPage(){
      switch(this.state.mode){
        case 'u': return +this.state.curUserPage; break
        case 'default': return +this.state.curPage; break
      }
    },
    pagenumber(){
      let num
      switch(this.state.mode){
        case 'u':
          num = 'Page ' + (this.state.curUserPage+1) + ' of ' + this.state.totalUserPages
        break
        case 'default':
          num = 'Page ' + (this.state.curPage+1) + ' of ' + this.state.totalPages
        break
      }
      return num
    }
  }
}
</script>

<style scoped>
.controls{
  position: fixed;
  top: 61px;
  z-index: 1020;
  width: 93%;
  height: 200px;
  max-width: 1240px;
  min-width: 675px;
  background: url(https://jsbot.cantelope.org/uploads/Bi6Kz.png) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  text-align: center;
  transition: height .5s;
}
.controlsWorkingSpace .controlsbutton{
  background: linear-gradient(90deg, #158d, #145d);
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
  background: url(https://jsbot.cantelope.org/uploads/v9UDT.png) no-repeat;
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
  background: url(https://jsbot.cantelope.org/uploads/1tgOjR.png) no-repeat;
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
.curPageContainer{
  display: inline-block;
  width: 270px;
  line-height: .8em;
  min-height: 25px;
  margin-top: 3px;
  margin-left: -15px;
  vertical-align: top;
  padding-top: 0px;
}
.advancedControls{
  top: 0;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  left: 50%;
  width: 100%;
}
.navContainer{
  margin-top: -50px;
  top:0;
  font-size: .7em;
  margin-left: auto;
  margin-right: auto;
  width: 600px!important;
  height: 100%;
  position: relative;
  z-index: 0;
}
.uploadButton{
  background: #0f4;
  width: 80px;
  display: inline-block;
  text-align: center;
  line-height: .8em;
  margin-top: 4px;
  margin-left: 20px;
  min-width: 0;
}
.navButton{
  min-width:0;
  height: 25px;
  padding: 0;
  background: #0f0;
  margin: 0;
  margin-left: 2px;
  margin-right: 2px;
  width: 25px;
}
.maxResultsLabel{
  margin-left: 5px;
}
</style>
<style>
.bumpLeft{
  margin-left: -100px;
}
.bumpDown{
  margin-top: 17px;
}
.searchInput{
  display: inline-block;
  margin-bottom: 10px;
  text-align: center;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.bump{
  margin-top: -57px!important;
}
</style>
