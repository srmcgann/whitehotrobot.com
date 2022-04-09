<template>
  <div class="main">
    <div style="background: #333;font-size: 32px;">admin page</div><br>
    <button @click="logout()" class="logoutButton">logout</button>
    <hr><br>
    <input
      @click="$event.target.select()"
      type="text"
      placeholder="search for a user"
      v-model="state.selectedUser"
    ><br><br>
    <div v-for="user in filteredUsers" :key='user.name' style="display:inline-block;">
      <button
        v-if="user.id !== -1"
        @click="toggleUserInvolvement(user)"
        :class="{'involved': user.involved}"
        class="userInvolvementButton"
        v-html="(user.involved ? 'un-involve ' : 'involve ') + '<i><span class=\'userInvolvementButtonText\'><br>' + user.name + '</span></i>'"
      >
      </button>
    </div>
    <div v-if="typeof state.data !== 'undefined' && state.data.users.filter(v=>v.involved).length">
      <div v-if="filteredVideos.length">
        <hr>
        Videos...
        <div v-if="editing">
          <button @click="addAll()">add all</button><br><br>
        </div>
        <div v-for="video in filteredVideos" :key="video.id" class="vidThumbContainer">
          <button v-if="editing" class="addRemoveButton" @click="addVideo(video.id)">
            Add
          </button>
          <img :src="video.videoThumb" class="vidThumb">
        </div>
      </div>
      <div v-else>
        The involved user(s) have no videos yet!
      </div>
    </div>
    <hr>
    Playlists...
      <button @click="state.createNewPlaylist()" >Create New</button>
    <br>
    <div v-for="(playlist, idx) in filteredPlaylists" :key='playlist.id' style="display:inline-block;" class="playlistContainer">
      <label :for="'radio'+playlist.id"
        :class="{'editing': playlist.selected}"
      >
        <input
          :ref="'radio'+idx"
          :id="'radio+playlist.id'"
          type="radio"
          style="margin: 20px;margin-left: 0;float: left; transform: scale(3.0)"
          name="playlists"
          @input="setSelectedPlaylist(playlist.id)"
        >
        {{playlist.selected ? 'adding' : 'add videos'}}
      </label>
      <button v-if="playlist.selected" @click="cancelEditing()" class="cancelEditing">cancel adding</button>
      <button @click="state.deletePlaylist(playlist.id)" class="deletePlaylist"></button>
      <table class='playlistHeaderTable'>
        <tr>
          <td class="leftTD"><span style="font-size: .9em; color: #fff;">playlist name</span></td>
          <td class="rightTD">
            <input
              @click="$event.target.select()"
              style="text-align: left"
              type="text"
              v-model="playlist.name"
              @input="state.updatePlaylist(playlist.id)"
            >
          </td>
        </tr>
        <tr>
          <td class="leftTD"><span style="font-size: .9em; color: #fff;">date created</span></td>
          <td class="rightTD">{{playlist.date}}</td>
        </tr>
        <tr>
          <td class="leftTD"><span style="font-size: .9em; color: #fff;"># of videos</span></td>
          <td class="rightTD">{{playlist.item_ids.length}}</td>
        </tr>
        <tr>
          <td class="leftTD"><span style="font-size: .9em; color: #fff;">users involved</span></td>
          <td class="rightTD" v-html="
            playlist.user_ids.map(v=>state.data.users.filter(q=>v==q.id)[0].name).map(v=>{
              return '<a href=\'' + state.baseVideoDemoURL + '/u/' + v + '\'>' + v + '</a>'
            }).join(', ')
          "></td>
        </tr>
      </table>
      
      <br>
      <div v-for="item_id in playlist.item_ids" :key="item_id" class="vidThumbContainer">
        <button class="removeButton" @click="removeVideo(playlist.id, item_id)">X</button>
        <img :src="getVideo(item_id)" class="vidThumb">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
  props: [ 'state' ],
  data(){
    return {}
  },
  computed:{
    editing(){
      return !!this.state.data.playlists.filter(v=>v.selected).length
    },
    filteredUsers(){
      if(typeof this.state.data !== 'undefined') {
        let ret = this.state.data.users.filter(v=>(!this.state.selectedUser && v.involved)||(this.state.selectedUser && (v.involved|| v.name.substring(0,this.state.selectedUser.length).toUpperCase()===this.state.selectedUser.toUpperCase())))
        return ret.length ? ret : [{id: -1, name: 'user not found!'}]
      } else {
        return []
      }
    },
    filteredVideos(){
      if(typeof this.state.data !== 'undefined'){
        return this.state.data.items.filter(v=>this.filteredUsers.filter(q=>q.involved && q.id === v.userID).length)
      } else {
        return []
      }
    },
    filteredPlaylists(){
      if(typeof this.state.data !== 'undefined'){
        return this.state.data.playlists.filter(v=>1)
      } else {
        return []
      }
    }
  },
  methods:{
    addAll(){
      if(this.editing){
        let playlist = this.state.data.playlists.filter(v=>v.selected)[0]
        this.filteredVideos.map(v=>{
          if(playlist.item_ids.indexOf(v.id) === -1) playlist.item_ids.push(v.id)
        })
        this.state.updatePlaylist(playlist.id)
      }
    },
    cancelEditing(){
      this.state.data.playlists.map(v=>v.selected = false)
      for(let i=0;i < this.state.data.playlists.length; ++i){
        this.$refs['radio'+i].checked = false
      }
    },
    setSelectedPlaylist(id){
      this.state.data.playlists.map(v=>v.selected = v.id === id)
    },
    removeVideo(playlistID, item_id){
      let playlist = this.state.data.playlists.filter(v=>v.id===playlistID)[0]
      playlist.item_ids = playlist.item_ids.filter(v=>v !== item_id)
      this.state.updatePlaylist(playlistID)
    },
    addVideo(item_id){
      if(this.editing){
        let playlist = this.state.data.playlists.filter(v=>v.selected)[0]
        playlist.item_ids.push(item_id)
        this.state.updatePlaylist(playlist.id)
      }
    },
    getVideo(id){
      return this.state.data.items.filter(v=>v.id===id)[0].videoThumb
    },
    logout(){
      fetch('logout.php').then(v=>{
        window.location.href = '..'
      })
    },
    toggleUserInvolvement(user){
      user.involved = !user.involved
    }
  }
}
</script>

<style scoped>
.main{
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background: none;
  padding-bottom: 100px;
}
.playlistContainer{
  margin-top: 40px;
  width:90%;
  background: linear-gradient(45deg, #036f, #002);
}
hr{
  border: 1px solid #2468;
}
.vidThumbContainer{
  display: inline-block;
  border: 1px solid #246;
  margin: 10px;
}
.vidThumb{
  max-width: 200px;
  display: block;
}
label{
  float: left;
  left: 0;
  padding-right: 20px;
  padding-left: 20px;
}
.editing{
  background: #8fc;
  color: #550;
}
.cancelEditing{
  transform: translate(calc(-100% - 10px));
  margin-top: 60px;
  min-width: 100px;
  background: #882;
  color: #ff0;
  float: left;
}
.userInvolvementButton{
  font-size: 16px;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  border: none;
  background: #f84;
  color: #000;
  margin: 5px;
  min-width: 200px;
  cursor: pointer;
  display: inline-block;
}
.logoutButton{
  background: #4f8;
  color: #000;
  font-size: 24px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin: 10px;
}
.deletePlaylist{
  background: #f88;
  color: #300;
  font-weight: 900;
  font-size: 16px;
  float:right;
  margin-right: 10px;
  margin-top: 10px;
  width: 45px;
  height: 45px;
  background-image: url(https://jsbot.cantelope.org/uploads/XeGsK.png);
  background-position: center center;
  background-size: 40px 40px;
  background-repeat: no-repeat;
}
.involved{
  background: #4f8;
  color: #000;
}
.leftTD{
  text-align: right;
  min-width: 200px;
}
.rightTD{
  text-align: left;
  padding-left: 10px;
}
.playlistHeaderTable{
  float: left;
  width: 50%;
  min-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.removeButton{
  position: absolute;
  background: #f88;
  color: #411;
  border: none;
  border-radius: 5px;
}
.addRemoveButton{
  margin: 0;
  font-size: 20px;
  border: none;
  background: #4f88;
  border-radius: 5px;
  position: absolute;
}
</style>
<style>
.userInvolvementButtonText{
  font-weight:900;
  line-height: .8em;
  font-size:20px;
}
</style>