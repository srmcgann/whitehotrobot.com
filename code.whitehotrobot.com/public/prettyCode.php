<?
  header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap');
      html, body{
        width: 100%;
        min-height: 100vh;
        margin: 0;
        background: linear-gradient(45deg, #000, #2468);
        font-family: 'Source Code Pro';
        color: #afdc;
        font-size: 16px;
        overflow: hidden;
      }
      .demoTitle{
        color: #f06;
        font-weight: 900;
      }
      a{
        text-decoration: none;
        color: #fff8;
        background: #40f;
        font-weight: 900;
        border-radius: 10px;
        padding: 20px;
        padding-top: 2px;
        margin: 5px;
        font-size: .75em;
        padding-bottom: 2px;
        display: inline-block;
      }
      .main{
        margin: 0;
        word-wrap: break-word;
        padding: 10px;
        top: 0;
        position: absolute;
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        background: #0006;
        overflow: hidden;
        overflow-y: auto;
      }
      pre{
        background: linear-gradient(90deg, #1665, #0000);
        margin: 0;
        font-family: 'Source Code Pro';
        padding: 10px;
        white-space: pre-wrap;
      }
      .bumpUp{
        margin: -26px;
        display: block;
        position: absolute;
        padding: 7px;
        font-style: oblique;
        font-weight: 600;
        float: left;
        transform: scale(1.5, 1);
        margin-left: 60px;
        margin-top: 0px;
        margin-bottom: 20px;
      }
      .divider{
        color: #fd2d;
        font-size: 1.3em;
        margin-top: 20px;
        text-align: center;
        min-height: 40px;
        background: linear-gradient(90deg, #1669, #0000);
      }
      .copyButton{
        width: 30px;
        height: 30px;
        background-image: url(/video/clippy.c6b23471.svg);
        cursor: pointer;
        z-index: 500;
        background-size: 90% 90%;
        position: absolute;
        left: 10px;
        background-position: center center;
        background-repeat: no-repeat;
        border: none;
        background-color: #8fcc;
        margin: 5px;
        border-radius: 5px;
      }
      #copyConfirmation{
        display: none;
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: #012d;
        color: #8ff;
        opacity: 1;
        text-shadow: 0 0 5px #fff; 
        font-size: 46px;
        text-align: center;
        z-index: 1000;
      }
      .header{
        background: #2468;
        color: #fff;
        padding-left: 10px;
      }
      .headerItem{
        font-size: 24px;
      }
      #innerCopied{
        position: absolute;
        top: 50%;
        width: 100%;
        z-index: 1020;
        text-align: center;
        transform: translate(0, -50%) scale(2.0, 1);
      }
    </style>
  </head>
  <body>
    <script>
      copy = src => {
        var range = document.createRange()
        switch(src){
          case 'html':  range.selectNode(document.querySelector('#html')); break
          case 'css':  range.selectNode(document.querySelector('#css')); break
          case 'js':  range.selectNode(document.querySelector('#js')); break
        }
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand("copy")
        window.getSelection().removeAllRanges()
        let el = document.querySelector('#copyConfirmation')
        el.style.display = 'block';
        el.style.opacity = 1.5
        reduceOpacity = () => {
          if(+el.style.opacity > 0){
            el.style.opacity -= .02
            setTimeout(()=>{
              reduceOpacity()
            }, 10)
          }
        }
        reduceOpacity()
        setTimeout(()=>{
          el.style.opacity = 1
          el.style.display = 'none'
        }, 750)
      }
    </script>
    <div id="copyConfirmation"><div id="innerCopied">COPIED!</div></div>
    <div class="main">
      <div class="header">
        <div class="title">
        
        </div>
      </div>
      <?  require('db.php');
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
        function alphaToDec($val){
          $pow=0;
          $res=0;
          while($val!=""){
            $cur=$val[strlen($val)-1];
            $val=substr($val,0,strlen($val)-1);
            $mul=ord($cur)<58?$cur:ord($cur)-(ord($cur)>96?87:29);
            $res+=$mul*pow(62,$pow);
            $pow++;
          }
          return $res;
        }

        if(isset($_GET['demoid']) || isset($_GET['slug'])){
          if(isset($_GET['slug'])){
            $slug = $_GET['slug'];
            $demoid = alphaToDec(mysqli_real_escape_string($link, $_GET['slug']));
          } else {
            $slug = decToAlpha($_GET['demoid']);
            $demoid = mysqli_real_escape_string($link, $_GET['demoid']);
          }
          $sql = 'SELECT * FROM items WHERE id = ' . $demoid;
          if($res = mysqli_query($link, $sql)){
            $row = mysqli_fetch_assoc($res);
            ?>
            <div class="header">
              <div class="headerItem">
                <?='demo title: <span class="demoTitle">'.$row['title'].'</span>'?>
                <a href="<?='https://code.whitehotrobot.com/d/'.$slug?>" target="_blank">demo link</a>
              </div>
            </div>
            <div class="divider">
              <button onclick="copy('html')" class="copyButton"></button>
              <span class="bumpUp">HTML</span>
            </div>
            <pre id="html"><?=str_replace('<','&lt;',$row['demoHTML'])?></pre>

            <div class="divider">
              <button onclick="copy('css')" class="copyButton"></button>
              <span class="bumpUp">CSS</span>
            </div>
            <pre id="css"><?=str_replace('<','&lt;',$row['demoCSS'])?></pre>

            <div class="divider">
              <button onclick="copy('js')" class="copyButton"></button>
              <span class="bumpUp">&nbsp;JavaScript</span>
            </div>
            <pre id="js"><?=str_replace('<','&lt;',$row['demoJS'])?></pre>
            <?
          } else {
            echo '404';
          }
        } else {
          echo '404';
        }
      ?>
    </div>
  </body>
</html>

