<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=720">
    <meta property="og:url" content="https://whitehotrobot.com/about"/>
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="about whitehot robot"/>
    <meta property="og:description" content="about whitehot robot"/>
    <meta property="og:image" content="https://lookie.jsbot.net/uploads/1GY3GM.png"/>
    <meta property="og:image:secure_url" content="https://lookie.jsbot.net/uploads/1GY3GM.png"/>
    <link rel="icon" href="https://lookie.jsbot.net/uploads/tBgps.png">

    <style>
      
      @import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
      body, html{
        width: 100%;
        min-height: 100%;
        margin: 0;
        background: linear-gradient(45deg,#000,#024);
        font-family: 'Play', arial, tahoma;
        color: #ff0;
        font-size: 24px;
        overflow-x: hidden;
      }
      .newDiv{
        text-align: center;
      }
      .imgThumb{
        width: calc(100% - 50px);
        margin:25px;
      }
      canvas{ 
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        position: fixed;
        display: block;
      }
      .main{
        position: absolute;
        width: 100vw;
        z-index: 100;
        height: 100%;
        background:#1020;
      }
      .maintext{
        position: absolute;
        left: 50%;
        top: 10px;
        width: calc(100% - 200px);
        transform: translate(-50%);
        display: inline-block;
        background: #1239;
        padding: 20px;
        color: #4f8;
        text-align: center;
        text-shadow: 2px 2px 3px #001;
        padding-left: 50px;
        padding-right: 50px;
        border-radius: 5px;
        font-size: 36px;
        padding-bottom: 40px;
      }
      .smallertext{
        width: 100%;
        text-align: justify;
        font-size: .55em;
        display: inline-block;
      }
      a{
        display: inline-block;
        color: #ff0;
        text-decoration: none;
        font-size: 18px;
        background: #4068;
        padding: 2px;
        border: 1px solid #246;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: 4px;
        margin-top: 6px;
      }
      .linkbox{
        display: inline-block;
        text-align: left;
      }
      .logo{
        background-image: url(https://lookie.jsbot.net/uploads/1GY3GM.png);
        background-size: 70px 70px;
        background-position: center center;
        background-repeat: no-repeat;
        width: 70px;
        height: 70px;
        position: absolute;
        left: 50%;
        margin-left: -300px;
        margin-top: -5px;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="maintext">
        <div class="logo"></div>
        about whitehot robot
        <div class="smallertext"><br>
          whitehot robot is an umbrella moniker for the band, art, and suite of free online tools (listed below), which are made by and for artists, with emphasis on music, computer graphics, and literature. This project has grown, beginning in 2015 as small collection of audio tracks on youtube, into a repository of public domain artwork, music, and social platforms for artists to share and demo their work.
          <br><br>
          Registration is free and all contributions are understood to be available for free download, modification, reproduction and possible inclusion in projects at any user's discretion - on the condition that the spirit of art development remain at the heart of every derivative of artwork submitted here AND that the net effect of any artwork or its derivative is deemed by the community and the administrators (of whitehot robot) to be reasonably positive and healthy to the community as a whole. Obscene, profane, or otherwise inappropriate work may be removed at the administrator's discretion, however this project's primary mission is to always exemplify extreme tolerance and foster artistic open-mindedness, so the removal of any music or artwork will never be done lightly - per this mission statement.<br><br>click the links below to explore...<br><br>
        
        <div class="linkbox">
          <a href="https://whitehotrobot.com" target="_blank">jukebox (playlists & compiled videos)</a><br>
          <a href="https://code.whitehotrobot.com" target="_blank">demos / code with videos</a><br>
          <a href="https://audiocloud.whitehotrobot.com" target="_blank">audiocloud (music library)</a><br>
          <a href="https://mail.whitehotrobot.com" target="_blank">free email - communication for the masses!</a><br>
          <a href="https://hosting.whitehotrobot.com" target="_blank">static page hosting with code playground</a><br>
          <a href="https://words.whitehotrobot.com" target="_blank">blog / literature</a><br>
        </div>
        </div>
      </div>
    </div>
    <canvas id="c"></canvas>
  </body>
  <script>

    c = document.querySelector('#c')
    x = c.getContext('2d')
    c.width=c.clientWidth
    c.height=c.clientHeight
    window.onresize=()=>{
      c.width=c.clientWidth
      c.height=c.clientHeight
    }
    C = Math.cos
    S = Math.sin
    T = Math.tan
    t = 0

    Draw = () => {

      if(!t){
        bgimg = new Image()
        go=false
        bgimg.addEventListener('load',()=>{
          go=true
        })
        bgimg.src = 'https://lookie.jsbot.net/uploads/5wvV7.jpg'
      }
      
      oX=oY=0,oZ=180,pX=0,pY=0,pZ=0,O=8
      cl=16,Br=20,Pr=3,BV=5,spc=2
      El=q=>Math.acos(Z/Math.hypot(X,Z,Y))
      W=q=>[X=S(p=Math.random()*Math.PI*2)*S(q=Math.random()*Math.PI)*199,Y=C(p)*S(q)*199,Z=C(q)*199];
      (t*60|0)%120||(BV=3+Math.random()*8,Br=15+Math.random()*25,B=[...W(),-X/(d=Math.hypot(X,Y,Z))*BV,-Y/d*BV,-Z/d*BV],P=Array(cl**2*2).fill().map((v,i)=>[((i%cl)-(l=cl/2-.5))*Pr*spc,(((i/cl|0)%cl)-l)*Pr*spc,((i/cl/cl)|0)*spc*Pr-(spc*Pr/2),0,0,0]))
      R=q=>{X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d}
      Q=q=>[c.width/2+X/Z*h,c.height/2+Y/Z*h]
      if(go){
        x.globalAlpha=.2
        if(bgimg.width/c.width > bgimg.height/c.height){
          s=c.height/bgimg.height
        }else{
          s=c.width/bgimg.width
        }
        x.drawImage(bgimg,c.width/2-bgimg.width/2*s,c.height/2-bgimg.height/2*s,bgimg.width*s,bgimg.height*s)
        x.globalAlpha=1
        x.fillStyle='#0003',x.fillRect(0,0,w=c.width,c.height),h=540

        Rl=0,Pt=Math.PI/2-.2+t/4,Yw=t/4

        X=(B[0]+=B[3])+pX
        Y=(B[1]+=B[4])+pY
        Z=(B[2]+=B[5])+pZ
        R()
        X+=oX
        Y+=oY
        Z+=oZ
        if(Z>1){
          x.beginPath()
          x.arc(...Q(),Br*270/Z,0,7)
          x.fillStyle='#28f8'
          x.fill()
        }
        P.map((v,i)=>{
          X=(v[0]+=v[3]/=1.02)+pX
          Y=(v[1]+=v[4]/=1.02)+pY
          Z=(v[2]+=v[5]/=1.02)+pZ
          R()
          X+=oX
          Y+=oY
          Z+=oZ
          if(Z>1){
            x.beginPath()
            x.arc(...Q(),Pr*270/Z,0,7)
            x.fillStyle='#0f46'
            x.fill()
          }
          if(H(v[0]-B[0],v[1]-B[1],v[2]-B[2])<(Pr+Br)/2){
            v[3]+=(v[0]-B[0])/O+B[3]/O
            v[4]+=(v[1]-B[1])/O+B[4]/O
            v[5]+=(v[2]-B[2])/O+B[5]/O
            B[3]-=(v[0]-B[0])/199+v[3]/199
            B[4]-=(v[1]-B[1])/199+v[4]/199
            B[5]-=(v[2]-B[2])/199+v[5]/199
          }
          P.map((q,j)=>{
            if(i!==j&&H(v[0]-q[0],v[1]-q[1],v[2]-q[2])<Pr){
              v[3]+=(v[0]-q[0])/O+q[3]/O
              v[4]+=(v[1]-q[1])/O+q[4]/O
              v[5]+=(v[2]-q[2])/O+q[5]/O
              q[3]-=(v[0]-q[0])/O+v[3]/O
              q[4]-=(v[1]-q[1])/O+v[4]/O
              q[5]-=(v[2]-q[2])/O+v[5]/O
            }
          })
        })
      }
      t+= 1/60
      requestAnimationFrame(Draw)
    }

    Draw()
  </script>
</html>
