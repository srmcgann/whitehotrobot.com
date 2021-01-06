<template>
  <div class="controls" v-if="!state.showUploadModal" :class="{'shortControlsContainer':!state.showControls}">
    <div class="controlsWorkingSpace">
      <div @click="state.toggleShowControls" title="show additional controls" :class="{'showImg':!state.showControls, 'hideImg': state.showControls}" style="margin-top:-55px;"></div>
      <div v-if="state.showControls">

        <div class="navContainer">


          <div class="curPageContainer" v-if="state.mode != 'track'" :class="{'bumpLeft': !state.loggedin}">
            <button
              class="navButton"
              :class="{'disabled': curPage < 1}"
              :disabled="curPage < 1"
              @click="state.firstPage()"
            >
              &lt;&lt;
            </button>
            <button
              class="navButton"
              :disabled="curPage < 1"
              :class="{'disabled': curPage < 1}"
              @click="state.regressPage()"
            >
              &lt;
            </button>
            {{pagenumber}}
            <button
              class="navButton"
              :class="{'disabled': totalPages == curPage+1}"
              :disabled="totalPages == curPage+1"
              @click="state.advancePage()"
            >
              &gt;
            </button>
            <button
              class="navButton"
              :class="{'disabled': totalPages == curPage+1}"
              :disabled="totalPages == curPage+1"
              @click="state.lastPage()"
            >
              &gt;&gt;
            </button>
          </div>


          <div v-if="state.mode !== 'track'" class="advancedControls" >
            <label for="playall" style="margin-left: 0px;margin-bottom:14px;">
              <input id="playall" @input="updateUserPrefs('audiocloudPlayAll')" type="checkbox" v-model="state.playall">play all
            </label>
            <label for="shuffle" style="margin-left: 20px;">
              <input id="shuffle" @input="updateUserPrefs('audiocloudShuffle')" type="checkbox" v-model="state.shuffle">shuffle
            </label>
            <label for="disco" style="margin-left: 20px;">
              <input id="disco" @input="updateUserPrefs('audiocloudDisco')" type="checkbox" v-model="state.disco">disco
            </label>
          </div>
          <div v-else class="advancedControls">
            <label for="disco" style="margin-left: 20px;">
              <input id="disco" @input="updateUserPrefs('audiocloudDisco')" type="checkbox" v-model="state.disco">disco
            </label>
          </div>

          <span v-if="state.loggedin" class="maxResultsLabel">max results</span>
          <select v-if="state.loggedin && state.mode != 'track'" style="font-size: 12px;" v-model="state.maxResultsPerPage" @input="updateUserPrefs('audiocloudNumTracksPerPage')">
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
        </div>
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
		jumpToPlayingTrack(){
			let l
      if((l=this.state.currentTrack()).length){
				l[0].jump++
			}
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
  background: url(https://lookie.jsbot.net/uploads/Bi6Kz.png) no-repeat;
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
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 15px;
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
  margin-right: 10px;
}
</style>
<style>
.bumpLeft{
  margin-left: -100px;
}
.bumpDown{
  margin-top: 17px;
}
</style>