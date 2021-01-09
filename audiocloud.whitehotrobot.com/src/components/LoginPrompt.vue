<template>
  <div class="LoginPrompt">
    <div class="mainLoginContainer">
      <div v-if="!state.showRegister">
        <span class="title">login</span><br>
        <div class="inputContainer">
          <div class="inputTitle">User Name</div>
          <input
            style="position: absolute; z-index:-1; opacity: 0;z-index: -1"
            ref="loginTabAnchor"
            v-on:keydown.shift.tab="$refs.bottomTabAnchor.focus()" type="text"
            class="textInput"
          >
          <input
            type="text"
            ref="username"
            v-model="state.username"
            class="input textInput"
            v-on:keydown.enter="state.login()"
            v-on:keydown.shift.tab="$refs.bottomTabAnchor.focus()"
          ><br>
        </div>
        <div class="inputContainer">
          <div class="inputTitle">Password</div>
          <input
            type="password"
            ref="password"
            v-model="state.password"
            class="input"
            v-on:keydown.enter="state.login()"
          ><br>
        </div>
        <button @click="state.login()" ref="go">Go</button>
        <button @click="closePrompt()"
          v-on:keydown.tab="$refs.loginTabAnchor.focus()"
          v-on:keydown.shift.tab="$refs.cancelButton.focus()"
          style="background: #faa"
          ref="cancelButton"
        >cancel</button>
        <div v-if="state.invalidLoginAttempt" class="invalidLogin">
          Invalid User Name or Password
        </div>
        <div class="spacerDiv" style="margin-top: 30px;"></div>
        <button class="toggleButton" @click="toggleView()" ref="bottomTabAnchor">
          &darr;&nbsp;&nbsp;&nbsp;register&nbsp;&nbsp;&nbsp;&darr;
        </button>
      </div>
      <div v-else>
        <div class="spacerDiv" style="margin-top: 20px"></div>
        <button class="toggleButton" @click="toggleView()">
          &uarr;&nbsp;&nbsp;&nbsp;login&nbsp;&nbsp;&nbsp;&uarr;
        </button>
        <br>
        <div v-if="state.displayLoginRequired" class="mustRegister">
          You must register or<br>
          log-in to create a demo!<br>
        </div>
        <span class="title">register</span><br>
        <div class="inputContainer">
          <div class="inputTitle">
            User Name
            <div v-if="!userNameAvailable" style="display: inline-block; color: #f00">
              &nbsp;&nbsp;&nbsp; <i>user name unavailable</i>
            </div>
            <div v-if="userNameAvailable && state.regusername" style="display: inline-block; color: #0f4">
              &nbsp;&nbsp;&nbsp; <i>user name available</i>
            </div>
          </div>
          <input
            style="position: absolute;; z-index:-1; opacity: 0;z-index: -1;"
            ref="loginTabAnchor"
            type="text"
            class="textInput" 
            v-on:keydown.enter="submit()"
            v-on:keydown.shift.tab="$refs.bottomTabAnchor.focus()"
          >
          <input
            type="text"
            ref="regusername"
            v-model="state.regusername"
            class="input textInput"
            maxlength="16"
            :class="{'userNameUnavailable': !userNameAvailable, 'userNameAvailable': userNameAvailable && state.regusername}"
            @input="checkUserNameAvailability()"
            v-on:keydown.enter="submit()"
            v-on:keydown.shift.tab="$refs.bottomTabAnchor.focus()"
          ><br>
        </div>
        <div class="inputContainer">
          <div class="inputTitle">
            Password
            <div v-if="!passwordsMatch && state.regpassword && state.confirmpassword" style="display: inline-block; color: #f00">
              &nbsp;&nbsp;&nbsp; passwords do not match
            </div>
            <div v-if="passwordsMatch && state.regpassword && state.confirmpassword" style="display: inline-block; color: #0f4">
              &nbsp;&nbsp;&nbsp; <i>passwords match!</i>
            </div>
          </div>
          <input type="password"
            ref="regpassword"
            v-model="state.regpassword"
            class="input"
            :class="{'passwordsDoNotMatch': !passwordsMatch && state.regpassword && state.confirmpassword, 'passwordsMatch': passwordsMatch && state.regpassword && state.confirmpassword}"
            v-on:keydown.enter="submit()"
          ><br>
        </div>
        <div class="inputContainer">
          <div class="inputTitle">Confirm Password</div>
          <input
            type="password"
            ref="confirmpassword"
            v-model="state.confirmpassword"
            class="input"
            :class="{'passwordsDoNotMatch': !passwordsMatch && state.regpassword && state.confirmpassword, 'passwordsMatch': passwordsMatch && state.regpassword && state.confirmpassword}"
            v-on:keydown.enter="submit()"
          ><br>
        </div>
        <button
          @click="submit()"
          :disabled="!validate"
          :class="{'disabledButton': !validate}"
        >submit</button>
        <button
          @click="closePrompt()"
          v-on:keydown.tab="$refs.loginTabAnchor.focus()"
          v-on:keydown.shift.tab="$refs.cancelButton.focus()"
          ref="cancelButton"
          style="background: #faa"
        >cancel</button>
        <div v-if="showInvalid" class="invalidLogin">
          Whoa! check your info...
        </div>
        <input
          style="position: absolute;; z-index:-1; opacity: 0;z-index: -1"
          ref="bottomTabAnchor"
          type="text"
          class="textInput" 
        >
      </div>
    </div>
  </div>
</template>


<script>

export default{
  name: 'Account',
  props: [ 'state' ],
  data(){
    return {
      userNameAvailable: true,
      showInvalid: false
    }
  },
  computed: {
    passwordsMatch(){
      return this.state.regpassword === this.state.confirmpassword
    },
    validate(){
      return this.state.regusername && this.state.regpassword && this.passwordsMatch && this.userNameAvailable
    }
  },
  methods:{
    submit(){
      if(this.validate){
        let sendData = {userName: this.state.regusername, password: this.state.regpassword}
        fetch(this.state.baseURL + '/submitReg.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          if(data[0]){
            this.state.loggedin = true
            this.state.loggedinUserName = this.state.regusername
            this.state.passhash = data[1]
            this.state.loggedinUserID = data[2]
            this.state.closePrompts()
            this.state.setCookie()
            this.state.userInfo[this.state.loggedinUserID] = {}
            this.state.userInfo[this.state.loggedinUserID].name = this.state.regusername
            this.state.userInfo[this.state.loggedinUserID].avatar = this.state.getAvatar(this.state.loggedinUserID)
            this.state.checkEnabled()
            //window.location.reload()
          } else {
            this.showInvalid = true
          }
        })
      } else {
        this.showInvalid = true
      }
    },
    toggleView(){
      this.state.showRegister = !this.state.showRegister
      this.$nextTick(()=>{
        if(this.state.showRegister){
          this.$refs.regusername.focus()
        } else {
          this.$refs.username.focus()
        }
      })
    },
    toggleLogin(){
      if(!this.state.loggedin) this.state.showLoginPrompt()
    },
    closePrompt(){
      this.state.closePrompts()
    },
    checkUserNameAvailability(){
      this.userNameAvailable = true
      if(this.state.regusername){
        let sendData = {userName: this.state.regusername}
        fetch(this.state.baseURL + '/checkUserNameAvailability.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(data => {
          this.userNameAvailable = data
        })
      }
    }
  },
  mounted(){
    this.state.confirmpassword = ''
    if(this.state.showRegister) {
      this.$refs.regusername.focus()
    }else{
      this.$refs.username.focus()
    }
  }
}
</script>

<style>
.LoginPrompt{
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  top: 0;
  background: #012e;
  text-align: center;
}
.mainLoginContainer{
  position: absolute;
  left: 50%;
  top: 45%;
  min-width: 320px;
  min-height: 200px;
  border-radius: 10px;
  background: #024;
  padding: 20px;
  color: #ff0;
  transform: translate(-50%, -50%);
}
.inputTitle{
  text-align: left;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.inputContainer{
  padding: 10px;
}
.title{
  font-size: 2em;
}
.toggleButton{
  position: absolute;
  transform: translate(-55%,-36px);
  background: #6df;
}
.userNameUnavailable{
  background: #b446!important;
}
.passwordsDoNotMatch{
  background: #b446;
}
.passwordsMatch, .userNameAvailable{
  background: #4b46!important;
}
.disabledButton{
  color: #888;
  background: #333;
}
.invalidLogin{
  color: #f43;
  background: #400;
  padding: 10px;
  width: 290px;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}
.mustRegister{
  font-size: 26px;
  color: #4f8;
  background: #258;
  padding: 10px;
}
</style>
