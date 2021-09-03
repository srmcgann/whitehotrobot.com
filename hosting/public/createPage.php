<?
  require('db.php');

  function decToAlpha($val){
    $alphabet="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $ret="";
    while($val){
      $r=floor($val/62);
      $frac=$val/62-$r;
      $ind=(int)round($frac*62);
      $ret=$alphabet[$ind].$ret;
      $val=$r;
    }
    return $ret==""?"0":$ret;
  }

  function escapeUserName($userName, $id){
    return str_replace('\\', '', str_replace(';', '', str_replace("'", '', escapeshellarg(str_replace(' ', '', str_replace("\t", '', str_replace(';', '', str_replace("\n", '', str_replace('&', '', str_replace('|', '', str_replace('@', '', str_replace('#', '', str_replace('$', '', str_replace('%', '', str_replace('^', '', str_replace('(', '', str_replace(')', '', str_replace('?','', str_replace('!', '', str_replace('_', '', str_replace('`', '', str_replace("'", '', str_replace( '~', '', str_replace('"', '', $userName))))))))))))))))))))))).decToAlpha($id));
  }



  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $author = $userName;
  $title = str_replace('\\', '', mysqli_real_escape_string($link, $userName)) . "'s page";
  $favicon = 'https://jsbot.cantelope.org/uploads/1GY3GM.png';

$HTML=
'<div class="main">
  <div class="mainInner">
    <div class="demoPageText">
      <span style="font-size: 1.5em;">
        ' . $title . '
      </span><br><hr>
      this is a sample page<br>
      edit the code to customize it!<br><br>
      the changes you make<br>
      are effective immediately!<br>
      ...so use care!
    </div>
    <canvas id=c></canvas>
  </div>
</div>';

$CSS=
'html,body{
  background: linear-gradient(-45deg, #024, #000);
  margin: 0;
  font-family: arial, tahoma;
  font-size: 24px;
  color: #ff0;
  min-height: 100%;
  overflow: hidden;
}
#c{
  width: 800px;
  height: 800px;
}
.demoPageText{
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  text-shadow: 2px 2px 2px #000;
}
.mainInner{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.main{
  position: absolute;
  width: 700px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}';

$JS=
'var c = document.querySelector(\'#c\')
c.width = 1e3
c.height = 1e3
var x = c.getContext(\'2d\')
var S = Math.sin
var C = Math.cos
var t=0, oX=0, oY=0, oZ=12

var R=(Rl,Pt,Yw,o)=>{
  X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y))
  Y=C(p)*d
  Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z))
  Z=C(p)*d
  X=S(p=A(X,Z)+Yw)*(d=H(X,Z))
  Z=C(p)*d
  if(o)X+=oX,Y+=oY,Z+=oZ
}

var Q=()=>[c.width/2+X/Z*600,c.height/2+Y/Z*600]


Draw = () => {

  x.globalAlpha=.5
  x.clearRect(0,0,w=c.width,w)

  Rl=-t*1.5
  Pt=0
  Yw=S(t/2)*4

  let P=Array(6).fill().map((v,i)=>{
    X=S(p=Math.PI*2/6*i+Math.PI/6)
    Y=C(p)
    Z=0
    return [X,Y,Z]
  })
  let ls=1.6
  let B=Array(6).fill().map((v,i)=>{
    let q=Math.PI*2/6*i-t*8
    s=ls*(1+(1+S(q)/2)*(1+S(t*1.5))/3)
    X=S(p=Math.PI*2/6*i)*s
    Y=C(p)*s
    Z=0
    return [X,Y,Z,[...P]]
  })
  B=[...B,[0,0,0,[...P]]]

  x.lineJoin=x.lineCap=\'round\'

  B.map(v=>{
    tx=v[0]
    ty=v[1]
    tz=v[2]
    x.beginPath()
    v[3].map(q=>{
      X=tx+q[0]
      Y=ty+q[1]
      Z=tz+q[2]
      R(Rl,Pt,Yw,1)
      x.lineTo(...Q())
    })

    x.closePath()
    x.lineWidth=140/Z
    x.strokeStyle=\'#4bc8\'
    x.fillStyle=\'#2cf8\'
    x.fill()
    x.stroke()
  })

  this.t += 1/60
  requestAnimationFrame(Draw)
}

Draw()';

  $HTML = mysqli_real_escape_string($link, $HTML);
  $CSS = mysqli_real_escape_string($link, $CSS);
  $JS = mysqli_real_escape_string($link, $JS);
  $insert_id = -1;
  if($userName && $passhash){
    $sql='SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "' .$passhash. '"';
    if($res = mysqli_query($link, $sql)){
      $row=mysqli_fetch_assoc($res);
      $escaped_name = escapeUserName($userName, $row['id']);
      $userID = $row['id'];
      if($row['enabled']){
        $sql = 'INSERT INTO pages (pageHTML, 
                                   pageCSS,
                                   pageJS, 
                                   title, 
                                   userID, 
                                   author, 
                                   escaped_name,
                                   favicon)
                            VALUES("' . $HTML . '", 
                                   "' . $CSS . '", 
                                   "' . $JS . '", 
                                   "' . $title . '", 
                                   ' . $userID . ', 
                                   "' . $author . '", 
                                   "' . $escaped_name . '",
                                   "' . $favicon . '")';
        mysqli_query($link, $sql);
        $insert_id = mysqli_insert_id($link);
        if($insert_id && !$row['has_hosting']){
          exec('sudo /home/cantelope/hosting/createUser.sh ' . $escaped_name . ' ' . $passhash . ' ' . $insert_id);
        }
      }
    }
  }
  echo json_encode($insert_id);
?>
