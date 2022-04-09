<template>
  <div class="account">
    <button @click="toggleLogin()"
      v-if="!state.loggedin"
      class="loginButton"
    >log in / register
    </button>
    <div v-else class="userButtonContainer">
      <button @click="logout()"
        class="userbutton"
      >logout</button>
      <button @click="showSettings()"
        class="userbutton"
      >settings</button>
    </div>
  </div>
</template>


<script>
export default{
  name: 'Account',
  props: [ 'state' ],
  methods:{
    showSettings(){
      this.state.showUserSettings()
    },
    logout(){
      this.state.logout()
    },
    toggleLogin(){
      if(!this.state.loggedin) this.state.showLoginPrompt()
    }
  }
}
</script>

<style>
.account{
  margin: 0px;
}
.userButtonContainer{
  float: right;
  //margin-left: 80px;
  margin-top: -2px;
  width: 80px;
}
.userbutton:focus{
  outline: none;
}
.userbutton{
  font-size: 12px;
  min-width: 50px;
  margin: 0;
  margin-top: 1px;
  margin-bottom: 1px;
  padding: 1px;
  padding-bottom: 2px;
  padding-left: 8px;
  padding-right: 8px;
  min-width: 70px;
}
.loginButton{
  font-size: .72em;
  margin-top: 15px;
  background: #123;
  color: #afc
}
</style>
