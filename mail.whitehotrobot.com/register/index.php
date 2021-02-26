<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=1024">
    <title>whitehot robot email - communication for the masses</title>
    <meta property="og:url" content="https://mail.whitehotrobot.com/register"/>
    <meta property="og:ype" content="website"/>
    <meta property="og:title" content="whitehot robot email - communication for the masses"/>
    <meta property="og:descro[topm" content="whitehot robot email - communication for the masses"/>
    <meta property="og:image" content="https://lookie.jsbot.net/uploads/1HVS37.png"/>
    <link rel="icon" href="https://lookie.jsbot.net/uploads/1HVS37.png">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
      body,html{
        margin: 0;
        background: linear-gradient(-45deg, #100, #010, #103);
        color: #ffc;
        font-family: 'Play';
        height: 100vh;
        width: 100%;
      }
      .processingDiv{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        display: none;
        background: #012e;
      }
      .processingInner{
        width: 100px;
        position: absolute;
        top:45%;
        left: calc(50% - 50px);
        transform: translate(-50%, -50%);
        text-align: left;
        color: #0ff;
        font-size: 2em;
      }
      .main{
        position: absolute;
        width: 500px;
        left: 50%;
        transform: translate(-50%,-50%);
        top: 45%;
        padding: 50px;
        box-shadow: 0px 0px 150px 150px #0585;
        border-radius: 50%;
        background: #0585;
        text-align: center;
        font-size: 16px;
      }
      .regInput:focus{
        outline: none;
      }
      .regInput{
        display: inline-block;
        background: #012;
        color: #8ff;
        border: none;
        text-align: right;
        font-size: 18px;
        width: 300px;
        border-bottom: 1px solid #4fb8
      }
      .supplemental{
        display: inline-block;
        line-height: .9em;
        color: #688;
      }
      hr{
        border: none;
        border: 2px solid #4688;
      }
      td{
      }
      button{
        border: none;
        color: #aaa;
        background: #333;
        font-size: 24px;
        font-family: 'Play';
        min-width: 120px;
        box-shadow: 5px 5px 20px 1px #000;
        padding: 10px;
        padding-top: 5px;
        border-radius: 10px;
        text-shadow: 1px 1px 2px #000;
      }
      #userNameAvailable, #passwordsMatch{
        width: 100%;
        display: none;
        padding-bottom: 5px;
        padding-right: 5px;
        border-radius: 4px;
        width: calc(100% - 10px);
      }
      .statusTD{
        font-size: 1em;
        text-align: right;
        color: #8fd;
        text-shadow: 2px 2px 2px #000;
        font-weight; 900;
        height: 20px;
        margin: 0;
        padding: 0;
        padding-bottom: 5px;
        padding-right: 5px;
      }
      .leftTD{
        text-align: right;
        padding-top: 10px;
      }
      .rightTD{
        text-align: left;
        padding-top: 10px;
      }
      .inputTable{
        width: 100%;
        border-collapse: collapse;
      }
      .logo{
        background-image: url(https://lookie.jsbot.net/uploads/1bfnku.png);
        background-size: 400px 90px;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: #0000;
        width: 400px;
        height: 90px;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <div class="processingDiv">
      <div class="processingInner">
        processing...
      </div>
    </div>
    <div class="main">
      <a href="/">
        <div class="logo">
        </div>
      </a>
      <br><span style="font-size: 2em;">registration form</span>
      <hr><br>
      <input id="username" style="position: absolute;opacity: 0;" type="text" name="fakeusernameremembered" tabindex="-1">
      <input id="password" style="position: absolute; opacity: 0;" type="password" name="fakepasswordremembered" tabindex="-1">
      <table class="inputTable">
        <tr>
          <td class="leftTD">
            <input type="url" placeholder="your full name" class="regInput" oninput="validate(1)" id="name" autocomplete="off" value="" autofocus>
          </td>
          <td class="rightTD">
            <span class="supplemental">
              Your full name you want to show to recipients
            </span>
          </td>
        </tr>
        <tr>
          <td class="leftTD">
            <input type="url" placeholder="user name" class="regInput" oninput="validate()" id="unm" autocomplete="off" value="">
            <input id="username2" style="position: absolute;opacity: 0;" type="text" name="fakeusernameremembered9" tabindex="-1">
          </td>
          <td class="rightTD">
            <span class="supplemental">
              @whitehotrobot.com
            </span>
          </td>
        </tr>
        <tr>
          <td class="statusTD">
          <span id="userNameAvailable">available</span>
          </td>
        </tr>
        <tr><td>&nbsp;</td></tr>
        <tr>
          <td class="leftTD">
            <input id="password2" style="position: absolute; opacity: 0;" type="password" name="fakepasswordremembered2" tabindex="-1">
            <input type="password" class="regInput pwd" oninput="validate(1)" autocomplete="off" value="" id="pwd">
          </td>
          <td class="rightTD">
            <span class="supplemental" style="margin-left: 10px;">
              password
            </span>
          </td>
        </tr>
        <tr>
          <td class="leftTD">
            <input id="password3" style="position: absolute; opacity: 0;" type="password" name="fakepasswordremembered3" tabindex="-1">
            <input type="password" class="regInput pwd" id="confirm" oninput="validate(1)" autocomplete="off" value="">
          </td>
          <td class="rightTD">
            <span class="supplemental" style="margin-left: 10px;">
              confirm password
            </span>
          </td>
        </tr>
        <tr>
          <td class="statusTD" id="passwordsMatch">
            passwords match
          </td>
        </tr>
        <tr>
          <td class="leftTD">
            <input type="url" placeholder="recovery email (optional)" class="regInput" id="otherEmail" autocomplete="off" value="" autofocus>
          </td>
          <td class="rightTD">
            <span class="supplemental">
              In case you forget your password...
            </span>
          </td>
        </tr>
      </table>
      <br><br><br>
      <button onclick="submit()" id="submit" disabled="true">sign up</button>
    </div>
    <script>
      var processingTimer = 0
      var showProcessing = false
      var emailCreated = false
      var redirectTimer = 0
      setInterval(()=>{
        if(showProcessing) {
          let el = document.querySelector('.processingDiv')
          el.style.display = 'block'
          el.tabIndex = 100
          el.focus()
          el.addEventListener('keypress',e=>{
            e.preventDefault()
            e.stopPropagation()
            return null
          })
        } else {
          document.querySelector('.processingDiv').style.display = 'none'
        }
        if(showProcessing){
           let el = document.querySelector('.processingInner')
          if(emailCreated && emailCreated != -1){
             processingTimer++
             el.style.width = '500px'
             el.style.fontSize = '20px'
             el.style.textAlign = 'left'
             el.innerHTML = 'SUCCESS!<br><br>created account:<br><span style="font-size: 32px;color: #0f4;">' + emailCreated + '</span><br><br>you will be redirected to the login page<br>in ' + (((redirectTimer - (new Date()).getTime())/1000|0)+1) + ' seconds' + '.'.repeat((processingTimer|0)%8)
          } else if(emailCreated == -1) {
             el.innerHTML = 'there was an error processing your request... :('
          } else {
            processingTimer++
            el.innerHTML = 'processing' + '.'.repeat((processingTimer|0)%8) 
          }
        }
      }, 100)
      submit = () => {
        let userName = document.querySelector('#unm').value
        let password = document.querySelector('#pwd').value
        let name = document.querySelector('#name').value
        let otherEmail = document.querySelector('#otherEmail').value
        let sendData = {userName, password, name, otherEmail}
        showProcessing = true
        fetch('submit.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        }).then(res=>res.json()).then(data=>{
          if(data[0]){
            emailCreated = -1
            setTimeout(()=>{
              window.location.reload()
            }, 5000)
          } else {
            setTimeout(()=>{
              window.open(window.location.origin + '/?_task=login&_user=' + userName, '_self')
            }, 8000)
            redirectTimer = (new Date()).getTime() + 8000
            emailCreated = userName + '@whitehotrobot.com'
          }
        })        
      }
      var pass1 = pass2 = false
      enableButton = () => {
        let el = document.querySelector('#submit')
        //el.setAttribute('disabled', false)
        el.disabled = false
        el.style.background = '#2fc'
        el.style.color = '#123'
        el.style.cursor = 'pointer'
      }
      userNameFail = (el, reason) =>{
        el.style.background = 'linear-gradient(90deg, #8000, #800)'
        el.style.color = '#f88'
        switch(reason){
          case 1: el.innerHTML = 'this name is taken!!!!'
          break
          case 2: el.innerHTML = 'not a valid email address!'
          break
        }
      }
      function validateEmail(value) {
        var input = document.createElement('input');
        input.type = 'email';
        input.required = true;
        input.value = value;
        return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(value);
      }
      validate = (m) =>{
        let password = document.querySelector('#pwd')
        let passwordConfirm = document.querySelector('#confirm')
        let userName = document.querySelector('#unm')
        let name = document.querySelector('#name').value
        let userNameAvailable = document.querySelector('#userNameAvailable')
        let passwordsMatch = document.querySelector('#passwordsMatch')
        let pass = false
        let btn = document.querySelector('#submit')
        btn.style.background = '#333'
        btn.disabled = true
        btn.style.color = '#aaa'
        btn.style.cursor = 'initial'
        if(m==1){
          pass2 = false
          passwordsMatch.style.background = 'none'
          passwordsMatch.innerHTML = ''
          if(password.value && passwordConfirm.value){
            passwordsMatch.style.display = 'inline-block'
            if(password.value == passwordConfirm.value){
              passwordsMatch.innerHTML = 'passwords match!'
              passwordsMatch.style.color = '#8fd'
              passwordsMatch.style.background = 'linear-gradient(90deg, #2860, #286)'
              pass2 = true
              if(pass1 && pass2 && name) enableButton()
            }else{
              passwordsMatch.innerHTML = 'passwords DO NOT match!'
              passwordsMatch.style.color = '#f88'
              passwordsMatch.style.background = 'linear-gradient(90deg, #8000, #800)'
            }
          }
        }
        if(!m){
          pass1 = false
          userNameAvailable.style.background = 'none'
          userNameAvailable.innerHTML = ''
          userNameAvailable.style.display = 'inline-block'
          valid = true
          if(userName.value && !validateEmail(userName.value.toLowerCase() + '@whitehotrobot.com')) {
            valid = false
            userNameFail(userNameAvailable, 2)
          }
          if(valid && userName.value){
            userNameAvailable.innerHTML = 'checking availability...'
            let sendData = {userName: userName.value}
            fetch('checkUserNameAvailability.php',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sendData),
            }).then(res=>res.json()).then(data=>{
              if(JSON.parse(data)){
                if(userName.value){
                  userNameAvailable.style.background = 'linear-gradient(90deg, #2860, #286)'
                  userNameAvailable.style.color = '#8fd'
                  userNameAvailable.innerHTML = 'available'
                  pass1 = true
                  if(pass1 && pass2 && name) enableButton()
                }
              } else {
                userNameFail(userNameAvailable, 1)
              }
            })
          }
        }
      }
    </script>
  </body>
</html>
