<template>
  <Main :state="state"/>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  },
  data(){
    return {
      state: {
        baseURL: 'http://local.whitehotrobot.com',
        baseVideoDemoURL: 'http://local.code.whitehotrobot.com',
        selectedUser: '',
        createNewPlaylist: null,
        updateNewPlaylist: null,
        deletePlaylist: null
      }
    }
  },
  methods:{
    updatePlaylist(playlistID){
      let playlist = JSON.parse(JSON.stringify(this.state.data.playlists.filter(v=>v.id===playlistID)[0]))
      playlist.user_ids = []
      playlist.item_ids.map(v=>{
        let uid = this.state.data.items.filter(q=>q.id==v)[0].userID
        if(playlist.user_ids.indexOf(uid) == -1) playlist.user_ids.push(uid)
      })
      this.state.data.playlists.filter(v=>v.id===playlistID)[0].user_ids = JSON.parse(JSON.stringify(playlist.user_ids))
      playlist.item_ids = JSON.stringify(playlist.item_ids)
      playlist.user_ids = JSON.stringify(playlist.user_ids).replace('"','').replace("'",'')
      let sendData = playlist
      fetch(this.state.baseURL + '/admin/updatePlaylist.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
    },
    deletePlaylist(id){
      if(confirm('Are your SURE you want to delete this playlist???\n\n\n       this is IRREVERSIBLE!!!')){
        let sendData = {playlistID: id}
        fetch(this.state.baseURL + '/admin/deletePlaylist.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res=>res.json())
        .then(data=>{
          this.state.data.playlists = this.state.data.playlists.filter(v=>v.id!=id)
        })
      }
    },
    createNewPlaylist(){
      fetch(this.state.baseURL + '/admin/createPlaylist.php')
      .then(res=>res.json())
      .then(data=>{
        let sendData = {playlistID: +data}
        fetch(this.state.baseURL + '/getPlaylistByID.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
        }).then(res=>res.json()).then(data=>{
          data.selected = false
          data.item_ids = JSON.parse(data.item_ids).map(v=>+v)
          data.user_ids = JSON.parse(data.user_ids).map(v=>+v)
          data.id = +data.id
          this.state.data.playlists=[data,...this.state.data.playlists]
        })
      })
    }
  },
  mounted(){
    fetch(this.state.baseURL + '/getPlaylistData.php').then(res=>res.json())
    .then(data=>{
      this.state.data=data
      this.state.data.items.filter(v=>v.videoLink)
      this.state.data.users.map(v=>{
        v.involved = false
        v.id = +v.id
      })
      this.state.data.playlists.map(v=>{
        v.selected = false
        v.item_ids = JSON.parse(v.item_ids).map(v=>+v)
        v.user_ids = JSON.parse(v.user_ids).map(v=>+v)
        v.id = +v.id
      })
      this.state.data.items.map(v=>{
        v.userID = +v.userID
        v.id = +v.id
      })
    })
    this.state.createNewPlaylist = this.createNewPlaylist
    this.state.updatePlaylist = this.updatePlaylist
    this.state.deletePlaylist = this.deletePlaylist
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
body,html{
  min-height: 100%;
  font-family: 'Open Sans';
  color: #ff0;
  font-size: 24px;
  margin: 0;
}
body{
  background: linear-gradient(45deg, #000, #123);
}
input[type=text]{
  background: none;
  border: none;
  text-align: center;
  font-size: 24px;
  color: #ff0;
  border-bottom: 2px solid #4f8;
}
input:focus{
  outline: none;
}
button{
  border: none;
  background: #468;
  color: #fff;
  padding: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
button:focus{
  outline: none;
}
</style>
