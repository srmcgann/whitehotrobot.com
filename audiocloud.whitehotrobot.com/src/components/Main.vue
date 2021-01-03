<template>
  <div class="main">
    <div v-if="state.mode=='track'">
      <div v-if="state.tracks.length" class="flex">
        <Track v-for="track in state.tracks" :key="track.id" :track="track" :state="state"/>
      </div>
      <div v-else-if="state.loaded" style="font-size: 1.5em;">
        <br><br><br><br><br>OOPS!
        <br><br><br>this track could not be found!
      </div>
    </div>
    <div v-if="state.mode=='default'">
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
    <div v-if="state.mode=='u'">
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
    filteredUserTracks(){
      if(typeof this.state.user.audiocloudTracks !== 'undefined'){
        return this.state.user.audiocloudTracks.filter(v=>!v.private || this.state.loggedinUserName.toUpperCase() == this.state.user.name.toUpperCase() || this.state.isAdmin)
      } else {
        return []
      }
    },
    filteredLandingPageTracks(){
      return this.state.landingPage.audiocloudTracks
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
  justify-content: space-around;
  margin: 0;
}
</style>
