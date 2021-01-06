<template>
  <div class="main" :class="{'footerPadding': state.mode=='track'}">
    <div v-if="state.mode=='track'" class="trackDiv" :class="{'highTop':state.showControls}">
      <div v-if="state.tracks.length" class="flex">
        <Track v-for="track in state.tracks" :key="track.id" :track="track" :state="state"/>
      </div>
      <div v-else-if="state.loaded" style="font-size: 1.5em;">
        <br><br><br><br><br>OOPS!
        <br><br><br>this track could not be found!
      </div>
    </div>
    <div v-if="state.mode=='default'" class="trackDiv" :class="{'highTop':state.showControls}">
      <div v-if="filteredLandingPageTracks.length" class="flex">
        <Track v-for="track in filteredLandingPageTracks" :key="track.id" :track="track" :state="state"/>
      </div>
      <div v-else-if="state.loaded" style="font-size: 1.5em;">
        <br><br><br><br><br>OOPS!
        <br><br><br>we seem to be missing some tracks!
        <br><br><br>
        :(
      </div>
    </div>
    <div v-if="state.mode=='u'" class="trackDiv" :class="{'highTop':state.showControls}">
      <div v-if="state.loaded && state.user.name">
        <div v-if="filteredUserTracks.length" class="flex">
          <Track v-for="track in filteredUserTracks" :key="track.id" :track="track" :state="state"/>
        </div>
        <div v-else-if="state.loaded" style="font-size: 1.5em;">
          <br><br><br><br>OOPS!
          <br><br>{{state.user.name}} has not<br>uploaded any tracks yet!
          <br><br><br>
          :(
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Track from './Track'
export default {
  name: 'Main',
  components:{
    Track
  },
  props: [ 'state' ],
  methods:{
  },
  computed:{
    filteredLandingPageTracks(){
      return this.state.landingPage.audiocloudTracks
    },
    filteredUserTracks(){
      if(this.state.user != null && typeof this.state.user.audiocloudTracks !== 'undefined'){
        return this.state.user.audiocloudTracks.filter(v=>!v.private || this.state.loggedinUserName.toUpperCase() == this.state.user.name.toUpperCase() || this.state.isAdmin)
      } else {
        return []
      }
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
.main{
  text-align: center;
  margin-top: 60px;
  padding-bottom: 60px;
}
.flex{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 0;
}
.trackDiv{
  background: transparent;
  padding-top:0px;
  transition: 0.5s padding-top;
}
</style>
<style>
.highTop{
  padding-top: 160px!important;
}
.footerPadding{
  min-height: calc(100vh + 200px);
}
</style>
