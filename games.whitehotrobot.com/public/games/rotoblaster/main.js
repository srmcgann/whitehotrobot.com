(()=>{

  var score = 0,
  level=1,
  highScores=[],bullets = [],splosions = [],
  bubbles = [],enemies = [],gunsActive=[],retractSpoke=[],bumps=[],powerups=[],coins=[],LHS=[],
  spritesheet,gameOverPal,enemyPal,last = 0,sides, snd = {}, muted = false, paused = false, brightness = 0,
  depth,LUT = [],w,h,v,s,gp,
  OPZ=playerZ=5,playerTheta=0,
  ctrlkey=spacekey=upkey=downkey=leftkey=rightkey=xkey=ckey=rkey=wkey=ekey=0,shotTimer=0,
  bumpsAmount = 1,bumpVar=0,powerUpGet = false,squeeze=1,score=0,
  lastSpokeScore=0,spokePowerup=50000,spokeLose=spokeGet=horz=vert=0,retractSpeed=20;

  function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}
    throw new Error("Could not create HTTP request object.");
  }

  function getHighScores(){
    let request = makeHttpObject();
    request.open("GET", "https://rotoblaster.tk/scores.php", true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4) highScores=JSON.parse(request.responseText);
    };
  }

  postHighScore=()=>{
    let request = request2 = makeHttpObject();
    request.open("GET", "https://rotoblaster.tk/scores.php", true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4){
        let highScores=JSON.parse(request.responseText);
        if(highScores.length<11 || score>=highScores[highScores.length-2].score){
          switch(Math.random()*321|0){
            case 0: d = "Adam Baum"; break;
            case 1: d = "Adam Zapel"; break;
            case 2: d = "Al Bino"; break;
            case 3: d = "Al Dente"; break;
            case 4: d = "Al Fresco"; break;
            case 5: d = "Al K. Seltzer"; break;
            case 6: d = "Alf A. Romeo"; break;
            case 7: d = "Ali Gaither"; break;
            case 8: d = "Ali Katt"; break;
            case 9: d = "Amanda Lynn"; break;
            case 10: d = "Amber Green"; break;
            case 11: d = "Andy Friese"; break;
            case 12: d = "Anita Bathe"; break;
            case 13: d = "Anita Job"; break;
            case 14: d = "Anna Conda"; break;
            case 15: d = "Anna Fender"; break;
            case 16: d = "Anna Graham"; break;
            case 17: d = "Anna Prentice"; break;
            case 18: d = "Anna Recksiek"; break;
            case 19: d = "Anna Sasin"; break;
            case 20: d = "Annette Curtain"; break;
            case 21: d = "Annie Howe"; break;
            case 22: d = "Annie Matter"; break;
            case 23: d = "Aretha Holly"; break;
            case 24: d = "Armand Hammer"; break;
            case 25: d = "Art Major"; break;
            case 26: d = "Art Painter"; break;
            case 27: d = "Art Sellers"; break;
            case 28: d = "B.A. Ware"; break;
            case 29: d = "Barb Dwyer"; break;
            case 30: d = "Barb E. Dahl"; break;
            case 31: d = "Barbara Seville"; break;
            case 32: d = "Barry Cade"; break;
            case 33: d = "Bea Minor"; break;
            case 34: d = "Dee Major"; break;
            case 35: d = "Beau Archer"; break;
            case 36: d = "Beau Tye"; break;
            case 37: d = "Ben Dover"; break;
            case 38: d = "Eileen Dover"; break;
            case 39: d = "Biff Wellington"; break;
            case 40: d = "Bill Board"; break;
            case 41: d = "Bill Ding"; break;
            case 42: d = "Bill Foldes"; break;
            case 43: d = "Bill Loney"; break;
            case 44: d = "Billy Rubin"; break;
            case 45: d = "Bob Apple"; break;
            case 46: d = "Bob Katz"; break;
            case 47: d = "Tom Katz"; break;
            case 48: d = "Kitty Katz"; break;
            case 49: d = "Bonnie Ann Clyde"; break;
            case 50: d = "Brad Hammer"; break;
            case 51: d = "Brandon Cattell"; break;
            case 52: d = "Brandon Irons"; break;
            case 53: d = "Brighton Early"; break;
            case 54: d = "Brock Lee"; break;
            case 55: d = "Brooke Trout"; break;
            case 56: d = "Bud Light"; break;
            case 57: d = "Bud Wieser"; break;
            case 58: d = "Cam Payne"; break;
            case 59: d = "Candace Spencer"; break;
            case 60: d = "Candy Barr"; break;
            case 61: d = "Candy Baskett"; break;
            case 62: d = "Candy Kane"; break;
            case 63: d = "Candy Sweet"; break;
            case 64: d = "Cara Sterio"; break;
            case 65: d = "Cara Van"; break;
            case 66: d = "Carrie Dababi"; break;
            case 67: d = "Carrie Oakey"; break;
            case 68: d = "Casey Macy"; break;
            case 69: d = "Charity Case"; break;
            case 70: d = "Cheri Pitts"; break;
            case 71: d = "Harry Pitts"; break;
            case 72: d = "Chip Munk"; break;
            case 73: d = "Chip Stone"; break;
            case 74: d = "Chris Coe"; break;
            case 75: d = "Chris Cross"; break;
            case 76: d = "Chris P. Bacon"; break;
            case 77: d = "Chuck U. Farley"; break;
            case 78: d = "Chuck Waggon"; break;
            case 79: d = "Claire Annette"; break;
            case 80: d = "Corey Ander"; break;
            case 81: d = "Corey O. Graff"; break;
            case 82: d = "Count Dunn"; break;
            case 83: d = "Count Orff"; break;
            case 84: d = "Craven Moorehead"; break;
            case 85: d = "Crystal Ball"; break;
            case 86: d = "Crystal Waters"; break;
            case 87: d = "Crystal Glass"; break;
            case 88: d = "D. Liver"; break;
            case 89: d = "Dan D. Lyons"; break;
            case 90: d = "Dan Deline"; break;
            case 91: d = "Dan Druff"; break;
            case 92: d = "Dan Saul Knight"; break;
            case 93: d = "Darren Deeds"; break;
            case 94: d = "Dilbert Pickles"; break;
            case 95: d = "Dinah Soares"; break;
            case 96: d = "Don Key"; break;
            case 97: d = "Donald Duck"; break;
            case 98: d = "Donny Brook"; break;
            case 99: d = "Doris Schutt"; break;
            case 100: d = "Doug Graves"; break;
            case 101: d = "Doug Hole"; break;
            case 102: d = "Doug Witherspoon"; break;
            case 103: d = "Douglas Furr"; break;
            case 104: d = "Duane Pipe"; break;
            case 105: d = "Dusty Carr"; break;
            case 106: d = "Dusty Rhodes"; break;
            case 107: d = "Edna May"; break;
            case 108: d = "Earl E. Bird"; break;
            case 109: d = "Earl Lee Riser"; break;
            case 110: d = "Easton West"; break;
            case 111: d = "Weston East"; break;
            case 112: d = "Eaton Wright"; break;
            case 113: d = "Ella Vader"; break;
            case 114: d = "Emma Royds"; break;
            case 115: d = "Eric Shinn"; break;
            case 116: d = "Estelle Hertz"; break;
            case 117: d = "Evan Keel"; break;
            case 118: d = "Faith Christian"; break;
            case 119: d = "Fanny Hertz"; break;
            case 120: d = "Ferris Wheeler"; break;
            case 121: d = "Flint Sparks"; break;
            case 122: d = "Ford Parker"; break;
            case 123: d = "Forrest Green"; break;
            case 124: d = "Foster Child"; break;
            case 125: d = "Frank Enstein"; break;
            case 126: d = "Gail Force"; break;
            case 127: d = "Gail Storm"; break;
            case 128: d = "Wendy Storm"; break;
            case 129: d = "Dusty Storm"; break;
            case 130: d = "Gene Poole"; break;
            case 131: d = "Gil Fish"; break;
            case 132: d = "Ginger Rayl"; break;
            case 133: d = "Ginger Snapp"; break;
            case 134: d = "Ginger Vitus"; break;
            case 135: d = "Harry Beard"; break;
            case 136: d = "Harry Potter"; break;
            case 137: d = "Hazle Nutt"; break;
            case 138: d = "Heidi Clare"; break;
            case 139: d = "Helen Back"; break;
            case 140: d = "Herb Farmer"; break;
            case 141: d = "Herb Rice"; break;
            case 142: d = "Holly McRell"; break;
            case 143: d = "Holly Day"; break;
            case 144: d = "Holly Wood"; break;
            case 145: d = "Honey Bee"; break;
            case 146: d = "Howie Doohan"; break;
            case 147: d = "Hugh Jass"; break;
            case 148: d = "Hugh Jorgan"; break;
            case 149: d = "Hugh Morris"; break;
            case 150: d = "Hy Ball"; break;
            case 151: d = "Hy Lowe"; break;
            case 152: d = "Bea Lowe"; break;
            case 153: d = "Hy Marx"; break;
            case 154: d = "Hy Price"; break;
            case 155: d = "Ileane Wright"; break;
            case 156: d = "Ilene South"; break;
            case 157: d = "Ima Hogg"; break;
            case 158: d = "Iona Ford"; break;
            case 159: d = "Iona Frisbee"; break;
            case 160: d = "Isadore Bell"; break;
            case 161: d = "Ivan Oder"; break;
            case 162: d = "Ivy Leage"; break;
            case 163: d = "Jack Hammer"; break;
            case 164: d = "Jack Pott"; break;
            case 165: d = "Jacklyn Hyde"; break;
            case 166: d = "Jasmine Rice"; break;
            case 167: d = "Jay Walker"; break;
            case 168: d = "Jean Poole"; break;
            case 169: d = "Jed Dye"; break;
            case 170: d = "Jenny Tull"; break;
            case 171: d = "Jerry Atrick"; break;
            case 172: d = "Jim Shorts"; break;
            case 173: d = "Jim Shu"; break;
            case 174: d = "Jim Sox"; break;
            case 175: d = "Jo King"; break;
            case 176: d = "Jordan Rivers"; break;
            case 177: d = "Joy Kil"; break;
            case 178: d = "Joy Rider"; break;
            case 179: d = "June Bugg"; break;
            case 180: d = "Justin Case"; break;
            case 181: d = "Kandi Apple"; break;
            case 182: d = "Kay Bull"; break;
            case 183: d = "Kelly Green"; break;
            case 184: d = "Ken Dahl"; break;
            case 185: d = "Kenny Penny"; break;
            case 186: d = "Kenya Dewit"; break;
            case 187: d = "Kerry Oki"; break;
            case 188: d = "King Queene"; break;
            case 189: d = "Lance Boyle"; break;
            case 190: d = "Laura Norder"; break;
            case 191: d = "Laurence Getzoff"; break;
            case 192: d = "Leigh King"; break;
            case 193: d = "Les Moore"; break;
            case 194: d = "Levon Coates"; break;
            case 195: d = "Lewis N. Clark"; break;
            case 196: d = "Lily Pond"; break;
            case 197: d = "Lisa Ford"; break;
            case 198: d = "Lisa Honda"; break;
            case 199: d = "Iona Corolla"; break;
            case 200: d = "Liv Long"; break;
            case 201: d = "Lois Price"; break;
            case 202: d = "Lou Pole"; break;
            case 203: d = "Lucy Fer"; break;
            case 204: d = "Luke Warm"; break;
            case 205: d = "Lynn C. Doyle"; break;
            case 206: d = "Lynn O. Liam"; break;
            case 207: d = "M. Balmer"; break;
            case 208: d = "Manny Kinn"; break;
            case 209: d = "Marlon Fisher"; break;
            case 210: d = "Marsha Dimes"; break;
            case 211: d = "Marsha Mellow"; break;
            case 212: d = "Marshall Law"; break;
            case 213: d = "Marty Graw"; break;
            case 214: d = "Mary A. Richman"; break;
            case 215: d = "Mary Christmas"; break;
            case 216: d = "Matt Tress"; break;
            case 217: d = "Maude L.T. Ford"; break;
            case 218: d = "Max Little"; break;
            case 219: d = "Max Power"; break;
            case 220: d = "May Day"; break;
            case 221: d = "May Furst"; break;
            case 222: d = "Mel Loewe"; break;
            case 223: d = "Melody Music"; break;
            case 224: d = "Mike Easter"; break;
            case 225: d = "Mike Raffone"; break;
            case 226: d = "Milly Graham"; break;
            case 227: d = "Mrs. Sippy"; break;
            case 228: d = "Misty Waters"; break;
            case 229: d = "Moe B. Dick"; break;
            case 230: d = "Molly Kuehl"; break;
            case 231: d = "Mona Lott"; break;
            case 232: d = "Morey Bund"; break;
            case 233: d = "Myles Long"; break;
            case 234: d = "Nancy Ann Cianci"; break;
            case 235: d = "Nat Sass"; break;
            case 236: d = "Neil Down"; break;
            case 237: d = "Nick O. Time"; break;
            case 238: d = "Noah Riddle"; break;
            case 239: d = "Noah Lott"; break;
            case 240: d = "Norma Leigh Lucid"; break;
            case 241: d = "Olive Branch"; break;
            case 242: d = "Olive Green"; break;
            case 243: d = "Olive Hoyl"; break;
            case 244: d = "Olive Yew"; break;
            case 245: d = "Oliver Sutton"; break;
            case 246: d = "Ophelia Payne"; break;
            case 247: d = "Oren Jellow"; break;
            case 248: d = "Orson Carte"; break;
            case 249: d = "Oscar Ruitt"; break;
            case 250: d = "Otto Graf"; break;
            case 251: d = "P. Brain"; break;
            case 252: d = "Paige Turner"; break;
            case 253: d = "Pearl Button"; break;
            case 254: d = "Pearl E. Gates"; break;
            case 255: d = "Pearl E. White"; break;
            case 256: d = "Peg Legge"; break;
            case 257: d = "Penny Dollar"; break;
            case 258: d = "Bill Dollar"; break;
            case 259: d = "Penny Lane"; break;
            case 260: d = "Penny Nichols"; break;
            case 261: d = "Penny Profit"; break;
            case 262: d = "Pepe Roni"; break;
            case 263: d = "Pete Moss"; break;
            case 264: d = "Phil Rupp"; break;
            case 265: d = "Polly Ester"; break;
            case 266: d = "Raney Schauer"; break;
            case 267: d = "Ray Gunn"; break;
            case 268: d = "Ray Zenz"; break;
            case 269: d = "Raynor Schein"; break;
            case 270: d = "Reid Enright"; break;
            case 271: d = "Rhea Curran"; break;
            case 272: d = "Rich Feller"; break;
            case 273: d = "Rich Guy"; break;
            case 274: d = "Rich Kidd"; break;
            case 275: d = "Rich Mann"; break;
            case 276: d = "Rick OShea"; break;
            case 277: d = "Rick Shaw"; break;
            case 278: d = "Rip Torn"; break;
            case 279: d = "Rocky Beach"; break;
            case 280: d = "Sandy Beach"; break;
            case 281: d = "Rocky Mountain"; break;
            case 282: d = "Rocky Rhoades"; break;
            case 283: d = "Rose Bush"; break;
            case 284: d = "Rose Gardner"; break;
            case 285: d = "Rowan Boatman"; break;
            case 286: d = "Royal Payne"; break;
            case 287: d = "Russell Leeves"; break;
            case 288: d = "Russell Sprout"; break;
            case 289: d = "Ryan Carnation"; break;
            case 290: d = "Sal A. Mander"; break;
            case 291: d = "Sal Minella"; break;
            case 292: d = "Sally Forth"; break;
            case 293: d = "Sarah Bellum"; break;
            case 294: d = "Sheila Blige"; break;
            case 295: d = "Skip Roper"; break;
            case 296: d = "Skip Stone"; break;
            case 297: d = "Sonny Day"; break;
            case 298: d = "Stan Still"; break;
            case 299: d = "Sue Flay"; break;
            case 300: d = "Sue Render"; break;
            case 301: d = "Summer Day"; break;
            case 302: d = "Tad Pohl"; break;
            case 303: d = "Ted E. Baer"; break;
            case 304: d = "Terry Bull"; break;
            case 305: d = "Tim Burr"; break;
            case 306: d = "Tish Hughes"; break;
            case 307: d = "Tom A. Toe"; break;
            case 308: d = "Tom Katt"; break;
            case 309: d = "Tom Morrow"; break;
            case 310: d = "Tommy Gunn"; break;
            case 311: d = "Tommy Hawk"; break;
            case 312: d = "Urich Hunt"; break;
            case 313: d = "Viola Solo"; break;
            case 314: d = "Walter Melon"; break;
            case 315: d = "Wanda Rinn"; break;
            case 316: d = "Wanna Hickey"; break;
            case 317: d = "Warren Peace"; break;
            case 318: d = "Will Power"; break;
            case 319: d = "Will Wynn"; break;
            case 320: d = "Woody Forrest"; break;
          }
          let name = prompt("You scored in the top 10!\n\nEnter your name...", d);
          if (name != null || name != "") {
            request2.open("GET", "https://rotoblaster.tk/scores.php", true);
            request2.send(null);
            request2.onreadystatechange = function() {
            if (request2.readyState == 4){
                highScores=JSON.parse(request2.responseText);
                let xhttp = makeHttpObject()
                xhttp.open("POST", "https://rotoblaster.tk/update.php", true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                LHS=[{name:name,score:score}];
                xhttp.send(`n=${name}&s=${score}&v=${highScores[highScores.length-1].t}`);
                xhttp.onreadystatechange = function() {
                  if (xhttp.readyState == 4){
                    getHighScores();
                    reset();
                    firstRun=1;
                  }
                };
              }
            }
          }
        }
      }
    };
  }

  load=()=>{

    //loading screen text/graphic here?
    bufferLoader = new BufferLoader(
    audioCtx,
    [
      'cantelope.mp3',
      'metal1.ogg',
      'metal2.ogg',
      'metal3.ogg',
      'metal4.ogg',
      'metal5.ogg',
      'pew.ogg',
      'powerup.ogg',
      'splode.ogg',
      'coin.ogg'
    ],
    init
    );

    bufferLoader.load();

  }

  nameAudioBuffers=(list)=>{
    snd.song = list[0]
    snd.metal1 = list[1]
    snd.metal2 = list[2]
    snd.metal3 = list[3]
    snd.metal4 = list[4]
    snd.metal5 = list[5]
    snd.pew = list[6]
    snd.powerup = list[7]
    snd.splode = list[8]
    snd.coin = list[9]
  }

  function init(audioBuffers) {

    nameAudioBuffers(audioBuffers);

    spritesheet = new Image();
    spritesheet.src = "assets/sprites.png";
    level=1;
    highScores=[];
    bullets = [];
    splosions = [];
    bubbles = [];
    enemies = [];
    bumps=[];
    powerups=[];
    coins=[];
    score=0;
    getHighScores();

    enemyPal = palDefault.slice();


    t = 0;
    last = 0;

    // lateral facets in tube
    sides=16

    // length-wise segments in tube
    depth=35


    LUT = [];

    //center of screen
    w = WIDTH/2;
    h = HEIGHT/2;

    // a couple of constants
    v=Math.PI*2/sides;
    s=Math.PI*2/depth;

    //initial player position and key inputs
    OPZ=playerZ=5;
    playerTheta=0;
    ctrlkey=spacekey=upkey=downkey=leftkey=rightkey=xkey=ckey=rkey=wkey=ekey=0
    shotTimer=0;
    //amount of random bumps in tunnel sides
    bumpsAmount = 1;
    bumpVar=0
    powerUpGet = false;
    squeeze=1
    score=0
    lastSpokeScore=0;
    spokeLose=spokeGet=0;
    horz=2.5;
    vert=7.13;
    FOV=300;
    spokeColor = 7;

    sprites = {
      lightmap: { x:0, y:0, width: 63, height: 32 },
      purpleBall: { x:64, y:0, width: 30, height: 30},
      laserCannon: { x:96, y:0, width: 29, height: 30},
      coin: {x:126, y:0, width: 30, height: 30},
      star: {x:0, y:30, width: 65, height: 80},
      title: {x:13, y:32, width: 428-13, height: 256-32}
    }

    gameoverPal = [
       0,1,2,3,4,5,6,7,8,9,
      17,17,17,17,17,17,17,17,17,17,
      17,17,17,17,17,17,17,17,17,17,
      17,17,17,17,17,17,17,17,17,17,
      17,17,17,17,17,17,17,17,17,17,
      17,17,17,17,17,17,17,17,17,17,
      17,17,17,17 ]

    enemyPal = palDefault.slice();


    t = 0;
    last = 0;

    // lateral facets in tube
    sides=16

    // length-wise segments in tube
    depth=35
    spritesheet.onload = function(){
      imageToRam(spritesheet, SPRITES);
      for(let i = 0; i < 32; ++i){
        LUT.push(ram.slice(SPRITES+WIDTH*i, SPRITES+WIDTH*i+64))
      }
      playSound(snd.song, 1, 0, .3, 1);
      gameInPlay=0;
      firstRun=1;
      loop();
    }

    fade = true;
    flip = true;
    brightness = 31;
  }

  function startup(){

    if(typeof highScores[0] == "undefined")getHighScores();
    gunsActive = Array(99).fill(1);
    retractSpoke = Array(99).fill(0);
    enemiesKilledThisLevel=0
    levelUpDisplayTimer=t+100;
    gameInPlay=1;
    firstRun=0;
    shotTimer=0;
    postedHighScore=0;
    switch(level){
      case 1:  // no bumps, just enemies
        speed=30;
        //horz=0;
        powerupSpawnFreq=900;
        targetKills=20
        bumpSpawnFreq=700
        ringSpawnFreq=1000
        canalSpawnFreq=200
        enemySpawnFreq=40
        shotInterval=8
        spokes=3
        break;
      case 2:
        speed=33;
        //horz=1;
        powerupSpawnFreq=900;
        targetKills=50
        bumpSpawnFreq=510
        ringSpawnFreq=1000
        enemySpawnFreq=30
        shotInterval=7.5
        if(spokes < 3)spokes=3
        break;
      case 3:
        speed=35;
        powerupSpawnFreq=1000;
        targetKills=70
        bumpSpawnFreq=310
        ringSpawnFreq=1100
        enemySpawnFreq=30
        shotInterval=7
        if(spokes < 3)spokes=3
        break;
      case 4:
        speed=37;
        powerupSpawnFreq=600;
        targetKills=80
        bumpSpawnFreq=170
        ringSpawnFreq=900
        enemySpawnFreq=26
        shotInterval=6.5
        //if(spokes < 4)spokes=4
        break;
      case 5:
        speed=40;
        powerupSpawnFreq=500;
        targetKills=90
        bumpSpawnFreq=140
        ringSpawnFreq=900
        enemySpawnFreq=23
        shotInterval=6
        //if(spokes < 5)spokes=5
        break;
      case 6:
        speed=45;
        powerupSpawnFreq=300;
        targetKills=100
        bumpSpawnFreq=120
        ringSpawnFreq=800
        enemySpawnFreq=18
        shotInterval=5.5
        //if(spokes < 6)spokes=6
        break;
      case 7:
        speed=50;
        powerupSpawnFreq=200;
        targetKills=20
        bumpSpawnFreq=00
        ringSpawnFreq=200
        enemySpawnFreq=90
        shotInterval=5
        //spokes=8
        break;
      case 8:
        speed=55;
        powerupSpawnFreq=100;
        targetKills=50;
        bumpSpawnFreq=100
        ringSpawnFreq=500
        enemySpawnFreq=100
        shotInterval=4.5
        //spokes=8
        break;
      case 9:
        speed=60;
        powerupSpawnFreq=80;
        targetKills=100
        bumpSpawnFreq=120
        ringSpawnFreq=100
        enemySpawnFreq=8
        shotInterval=4
        //spokes=8
        break;
      case 10:
        speed=65;
        powerupSpawnFreq=80;
        targetKills=500
        bumpSpawnFreq=80
        ringSpawnFreq=100
        enemySpawnFreq=3
        shotInterval=3.5
        spokes=16
        break;
      default:
        speed=80;
        powerupSpawnFreq=10;
        targetKills=10000
        bumpSpawnFreq=100
        ringSpawnFreq=400
        enemySpawnFreq=6
        shotInterval=2
        //spokes=8
        break;
    }
  }


  loop=(dt)=>{
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    gp = gamepads[0];
      let now = new Date().getTime();
      dt = Math.min(1, (now - last) / 1000);
      t += dt;
    if(paused){
      drawPause();
    }else{
      if(firstRun){
        flip^=!(t%256)
        if(t%256>220)darker();
        if(t%256<15)brighter();
        flip?drawTitle():drawScores()
      }else{
        step(dt);
        draw(dt);
      }

    }

    render(dt);
    requestAnimationFrame(loop);
  }

  drawPause=()=>{

    pal = LUT[brightness];
    clear(30);
    let i = 1000;
    while(i--){
      pset(Math.random()*WIDTH, Math.random()*HEIGHT, 28);
    }
    text([ 'CONTROLS',
    WIDTH/2, HEIGHT/2, 2, 3, 'center', 'top', 2, 11 ]);
    text([ 'LEFT CTRL OR X TO SHOOT\nARROWS TO ROTATE\nUP ARROW TO SQUEEZE GUNS\nP TO PAUSE, M TO MUTE',
    WIDTH/2, HEIGHT/2+24, 1, 3, 'center', 'top', 1, 22 ]);

    text([ 'PAUSED', WIDTH/2, HEIGHT/2-100, 4, 15, 'center', 'top', 4, t/4%10, 4, 7, 3]);
  }

  drawTitle=()=>{
    renderTarget = SCREEN; clear(30);
    renderTarget = BUFFER; clear(0);
    renderSource = SPRITES;

    spr(sprites.title.x, sprites.title.y, sprites.title.width, sprites.title.height, 16, 8);
    fillRect(sprites.title.x, sprites.title.y-16, sprites.star.width, sprites.star.height, 0) //erase star out of frame
    renderSource = BUFFER;
    renderTarget = SCREEN;
    let i = 3000;
    while(i--){
      pset(Math.random()*WIDTH, Math.random()*HEIGHT, 28)
      pset(Math.random()*WIDTH, Math.random()*HEIGHT, 29)
    }
    spr();
    text([ 'HIT SPACE TO START', WIDTH/2, HEIGHT/2-100+210, 4, 15, 'center', 'top', 2, t/4%10, 4, 7, 3]);
    text([ 'LEFT CTRL OR X TO SHOOT\nARROWS TO ROTATE\nUP ARROW TO SQUEEZE GUNS', WIDTH/2+110, HEIGHT/2+65, 1, 3, 'center', 'top', 1, 22 ]);
    if(spacekey){
      spokes=3;
      level=1;
      t=0;
      startup()
    }
    if(gp){
      if( buttonPressed(gp.buttons[4]) ){
        spokes=3;
        level=1;
        t=0;
        startup()
      }
    }
  }

  drawScores=()=>{
    renderTarget = SCREEN; clear(0);
    renderTarget = BUFFER; clear(0);

    if(highScores.length){
      for(let i=0;i<10;i++){
        if(i<highScores.length-1){
          var score = parseInt(highScores[i].score).pad(8," ") + " " + highScores[i].name.toUpperCase() + '-'
        }else{
          var score = "...";
        }
        if(i< highScores.length-1 && typeof LHS[0] != "undefined" && LHS[0].name.toUpperCase()==highScores[i].name.toUpperCase() && LHS[0].score==highScores[i].score){
          color=12;
        }else{
          color=1;
        }
        text([ score, 5, HEIGHT/2-120+i*20, 6, 15, 'left', 'top', 2, color, 4, 7, 3]);
      }
      outline(BUFFER, SCREEN, 6,9,6,3);
      renderTarget = SCREEN;
      renderSource = BUFFER;
      spr();
      text([ 'HIT SPACE TO START', WIDTH/2, HEIGHT/2-100+210, 4, 15, 'center', 'top', 2, t/4%10, 4, 7, 3]);
    }else{
      clear(0);
      renderTarget = SCREEN;
      text([ 'LOADING\nHIGH SCORES', WIDTH/2, 80, 8, 15, 'center', 'top', 4, 11, ]);
    }
    if(spacekey){
      spokes=3;
      level=1;
      t=0;
      startup()
    }
    if(gp){
      if(buttonPressed(gp.buttons[4]) ){
        spokes=3;
        level=1;
        t=0;
        startup()
      }
    }
  }


  step=(dt)=>{

    //rotate palette index for flashing powerups
    if(t%4<1)enemyPal[9] = 8 + t%7|0
    //rotate palette index for enemy outline, for higher health enemies
    if(t%12<1)enemyPal[2] = 2 + t%7|0


    //check for reset
    //if(rkey)reset();
    //enemies=[];

    // continually spawn enemies
    if(t%enemySpawnFreq<1 && enemies.length<300)spawnEnemy();

    // continually spawn powerups
    if(t%powerupSpawnFreq<1 && powerups.length<3)spawnPowerup();

    // continually spawn bumps
    if(t%bumpSpawnFreq<1)spawnBump();
    if(t%ringSpawnFreq<1)spawnBump(16);

  //  if(t%canalSpawnFreq<1)spawnCoinCanal(4);


    // spawn coins
    if(t%70<1)spawnCoin();
    if(t%735<1)spawnCoin(16);

    // f & g are offsets to recenter the mouth of the tunnel
    // they coincide with the formulas below and should not be changed independently
    f=(j=S(d=t/(1000/horz))/2)*6/FOV*300
    g=C(e=t/(1000/vert))*.5/FOV*300

    //player update
    if(leftkey)playerTheta+=.05
    if(rightkey)playerTheta-=.05
    playerZ+=(OPZ-playerZ)/50
    //squeeze the guns together when C  or up is pressed
    if(ckey || upkey){
      squeeze = (squeeze - .05).clamp(.01, 1)
    }else{
      squeeze = (squeeze + .05).clamp(.01, 1)
    }

    // shoot guns
    if( (xkey || ctrlkey) && shotTimer<t && gameInPlay){
      playSound(snd.pew, 1, 0, .1, false);
      // sound=new Audio("pew.ogg");
      // sound.volume=.1;
      // sound.play();
      shotTimer=t+shotInterval
      for(i=0;i<spokes;i++){
        if(gunsActive[i] && !retractSpoke[i]){
          let t = playerTheta+(Math.PI*2/spokes*((i+.5)-spokes/2))*squeeze;
          bullets.push({
            z:playerZ,
            theta:t
          });
          z=playerZ;
          X=S(t)+S(s*2*j*z+d)*3/FOV*300-f;
          Y=C(t)+C(s*3*j*z+e)*.5/FOV*300-g;
          //spawnBubble(X,Y,z,2);
        }
      }
    }

    if(gp){
      if(buttonPressed(gp.buttons[3]) ) playerTheta-=.05;
      else if(buttonPressed(gp.buttons[2]) ) playerTheta+=.05;

      if(Math.abs(gp.axes[0]) > .1)playerTheta+= .06 * gp.axes[0]; //allow for deadzone
      if(Math.abs(gp.axes[5]) != 0)squeeze = (gp.axes[5]).map(1, -1, .01, 1);
      else squeeze = 1;

      // shoot guns
      if( ( buttonPressed(gp.buttons[13]) || buttonPressed(gp.buttons[11]) ) && shotTimer<t && gameInPlay){
        playSound(snd.pew, 1, 0, .1, false);
        // sound=new Audio("pew.ogg");
        // sound.volume=.1;
        // sound.play();
        shotTimer=t+shotInterval
        for(i=0;i<spokes;i++){
          if(gunsActive[i] && !retractSpoke[i]){
            let t = playerTheta+(Math.PI*2/spokes*((i+.5)-spokes/2))*squeeze;
            bullets.push({
              z:playerZ,
              theta:t
            });
            z=playerZ;
            X=S(t)+S(s*2*j*z+d)*3/FOV*300-f;
            Y=C(t)+C(s*3*j*z+e)*.5/FOV*300-g;
            //spawnBubble(X,Y,z,2);
          }
        }
      }
    }

    if(spokeGet > 0){
      spokeGet = (spokeGet - .05).clamp(0,1);
      for(i=0;i<spokes;i++){
        if(gunsActive[i]){
          let t = playerTheta+(Math.PI*2/spokes*((i+.5)-spokes/2))*squeeze;
          //X+=S(p = squeeze < .02 ? playerTheta : playerTheta+Math.PI*2/spokes*((i+.5)-spokes/2)*squeeze),Y+=C(p);
          z=playerZ;
          X=S(t)+S(s*2*j*z+d)*3/FOV*300-f;
          Y=C(t)+C(s*3*j*z+e)*.5/FOV*300-g;
          spawnBubble(X,Y,z,2);
        }
      }
    }

    if(spokeLose > 0){
      spokeLose = (spokeLose - .05).clamp(0,1);
    }


    enemies.sort(function(a,b){return b.z - a.z});
    enemies.forEach(function(e, eIndex, eArr){
      //move down the tunnel
      e.z-=speed/500;
      //e.theta+=.01;

      //check for collision with player
      if(Math.abs(e.z - playerZ + 1) < 1){
        for(let i = 0; i < spokes; ++i){
          if(gunsActive[i]&&!retractSpoke[i]){
            let p=playerTheta+(Math.PI*2/spokes*((i+.5)-spokes/2))*squeeze
            while(p>Math.PI)p-=Math.PI*2
            while(p<-Math.PI)p+=Math.PI*2
            //check for squeeze to prevent killing all at once from sideways movement
            //if(squeeze > .98 || squeeze < .02){
              if(Math.abs(e.theta - p) < 0.2 ){
                X=S(s*2*j*playerZ+d)*3/FOV*300-f,Y=C(s*3*j*playerZ+t/(1000/vert))*.5/FOV*300-g;
                X+=S(p = squeeze < .02 ? playerTheta : playerTheta+Math.PI*2/spokes*((i+.5)-spokes/2)*squeeze),Y+=C(p);
                spawnSplosion(X,Y,playerZ,150);
                brightness = 1;
                retractSpoke[i]=1;
                spokeLose = 1;
                //spokes--;
                //playerTheta=e.theta+Math.PI
                eArr.splice(eIndex, 1);
                break;
              }
            //}
          }
        }
      }
      //reset position to back of tunnel if behind view
      if(e.z < 1){
        e.z = depth;
        e.theta = Math.random() * (Math.PI*2) - Math.PI;
      }
    })//end enemy check

    powerups.sort(function(a,b){return b.z - a.z});
    powerups.forEach(function(e, eIndex, eArr){
      //move down the tunnel
      e.z-=speed/500;
      //e.theta+=.01;
      //check for collision with player
      if(Math.abs(e.z - playerZ+1) < 1){
        for(let i = spokes; i--; ){
          if(gunsActive[i] && !retractSpoke[i]){
            let p=playerTheta+(Math.PI*2/spokes*((i+.5)-spokes/2))*squeeze
            while(p>Math.PI)p-=Math.PI*2
            while(p<-Math.PI)p+=Math.PI*2
            //check for squeeze to prevent killing all at once from sideways movement
            //if(squeeze > .98 || squeeze < .02){
              if(Math.abs(e.theta - p) < .2 ){
                X=S(s*2*j*playerZ+d)*3/FOV*300-f,Y=C(s*3*j*playerZ+t/(1000/vert))*.5/FOV*300-g;
                X+=S(p = squeeze < .02 ? playerTheta : playerTheta+Math.PI*2/spokes*((i+.5)-spokes/2)*squeeze),Y+=C(p);
                spawnSpoke();
                spawnBubble(X,Y,playerZ,50);
                score+=100*spokes;
                eArr.splice(eIndex, 1);
                break;
              }
            //}
          }
        }
      }
      //reset position to back of tunnel if behind view
      if(e.z < 1){
        eArr.splice(eIndex, 1);
        e.theta = Math.random() * (Math.PI*2) - Math.PI;
      }
    })//end powerup check
    //coins check
    coins.sort(function(a,b){return b.z - a.z});
    coins.forEach(function(e, eIndex, eArr){
      //move down the tunnel
      e.z-=speed/500;
      //e.theta+=.01;

      //check for collision with player
      if(Math.abs(e.z - playerZ+1) < 1){
        for(let i = 0; i < spokes; ++i){
          if(gunsActive[i]){
            let p=playerTheta+(Math.PI*2/spokes*((i+.5)-spokes/2))*squeeze
            while(p>Math.PI)p-=Math.PI*2
            while(p<-Math.PI)p+=Math.PI*2
            if(Math.abs(e.theta - p) < .2 ){
              X=S(s*2*j*playerZ+d)*3/FOV*300-f,Y=C(s*3*j*playerZ+t/(1000/vert))*.5/FOV*300-g;
              X+=S(p = squeeze < .02 ? playerTheta : playerTheta+Math.PI*2/spokes*((i+.5)-spokes/2)*squeeze),Y+=C(p);
              spawnBubble(X,Y,playerZ,10);
              playSound(snd.coin, 1, 0, .2, false);
              // sound = new Audio("coin.ogg?2");
              // sound.volume=.2
              // sound.play();
              score+=50*spokes;
              eArr.splice(eIndex, 1);
              break;
            }
          }
        }
      }
      //kill at back of tunnel
      if(e.z < 1){
        eArr.splice(eIndex, 1);
        e.theta = Math.random() * (Math.PI*2) - Math.PI;
      }
    })//end powerup check

    //check for guns active, gameover if all gone
    gameInPlay = 0
    for(let i = 0; i < spokes; ++i){
      if(gunsActive[i]){
        gameInPlay = 1
      }
    }
    if(!gameInPlay && !postedHighScore){
      postedHighScore=1;
      postHighScore();
   }

    //handle bump collision
    bumps.forEach(function(e, eIndex, eArr){
      //check for collision with player
      if(Math.abs(e.z - playerZ)<.2){
        for(let i = 0; i < spokes; ++i){
          if(gunsActive[i] && !retractSpoke[i]){
            //check for squeeze to prevent killing all at once from sideways movement
            //if(squeeze > .98 || squeeze < .02){
              p=(playerTheta+(Math.PI*2/spokes*((i+.5)-spokes/2))*squeeze)
              while(p>Math.PI)p-=Math.PI*2
              while(p<-Math.PI)p+=Math.PI*2
              pmap = p.map(-Math.PI, Math.PI, 0, sides)|0
              //console.info('spokeTheta: '+pmap+' bumpTheta: '+ e.theta + ' difference: ' +(e.theta-pmap));
              if(Math.abs(e.theta-pmap) == sides/2){
                X=S(s*2*j*playerZ+d)*3/FOV*300-f,Y=C(s*3*j*playerZ+t/(1000/vert))*.5/FOV*300-g;
                X+=S(p = squeeze < .02 ? playerTheta : playerTheta+Math.PI*2/spokes*((i+.5)-spokes/2)*squeeze),Y+=C(p);
                spawnSplosion(X,Y,playerZ,150);
                brightness = 1;
                retractSpoke[i]=1;
                //spokes--;
                //playerTheta=e.theta+Math.PI
                break;
              }
            //}
          }
        }
      }
    })

    if(gameInPlay){
      if (enemiesKilledThisLevel>=targetKills) levelUp()
    }else{
      spawnSplosion(5-Math.random()*10,5-Math.random()*10,1+Math.random()*40,98)
      if(spacekey){
        bullets = [];
        splosions = [];
        enemies = [];
        bumps=[];
        powerups=[];
        score=0;
        level=1;
        t=0;
        startup()
      }
      if(gp){
        if(buttonPressed(gp.buttons[4])){
          bullets = [];
          splosions = [];
          enemies = [];
          bumps=[];
          powerups=[];
          score=0;
          level=1;
          t=0;
          startup()
        }
      }
    }


    //handle bullets
    for(let i=0;i<bullets.length;i++){

      if(bullets[i].z>18){ //bullets should die sooner
        bullets.splice(i,1)
      }
    }
    for(let i=0;i<bullets.length;i++){
      bullets[i].z+=.1
      // blow up enemies
      for(let m=0;m<enemies.length;++m){
        if(i<bullets.length){
          if(Math.abs(bullets[i].z-enemies[m].z)<.2){
            // put bullet thetas into sane range
            while(bullets[i].theta>Math.PI)bullets[i].theta-=Math.PI*2
            while(bullets[i].theta<-Math.PI)bullets[i].theta+=Math.PI*2
            if(Math.abs(bullets[i].theta-enemies[m].theta)<.2){
              Z = enemies[m].z;
              X=S(enemies[m].theta)+S(s*2*j*Z+d)*3/FOV*300-f
              Y=C(enemies[m].theta)+C(s*3*j*Z+e)*.5/FOV*300-g
              enemies[m].health-=1
              score+=15*spokes
              spawnSplosion(X,Y,Z,10)
              if(enemies[m].health < 1){
                spawnSplosion(X,Y,Z)
                enemiesKilledThisLevel++;
                enemies.splice(m,1)
                bullets.splice(i,1)
                score+=25*spokes
              }
            }
          }
        }
      }

      //bullets vs bumps
      for(let m=0;m<bumps.length;++m){
        if(i<bullets.length){
          if(Math.abs(bullets[i].z-bumps[m].z)<.2){
            // put bullet thetas into sane range
            while(bullets[i].theta>Math.PI)bullets[i].theta-=Math.PI*2
            while(bullets[i].theta<-Math.PI)bullets[i].theta+=Math.PI*2
            bmap = bullets[i].theta.map(-Math.PI, Math.PI, 0, 16)|0
            if(Math.abs(bumps[m].theta - bmap) == 8){
              Z = bullets[i].z
              X=S(bullets[i].theta)+S(s*2*j*Z+d)*3/FOV*300-f
              Y=C(bullets[i].theta)+C(s*3*j*Z+e)*.5/FOV*300-g
              spawnSplosion(X,Y,Z,10)
                bullets.splice(i,1)
              }
            }
          }
        }
      }

    //handle splosions
    for(let i=0;i<splosions.length;++i){
      if(splosions[i].s<.05)splosions.splice(i,1)
    }
    for(let i=0;i<splosions.length;++i){
      splosions[i].x+=splosions[i].vx
      splosions[i].y+=splosions[i].vy//+=.003 //gravity pulls particles down like a firework
      splosions[i].z+=splosions[i].vz
      splosions[i].s-=.075 // particle size diminishes
    }

    //handle bubbles
    for(let i=0;i<bubbles.length;++i){
      if(bubbles[i].s<.05)bubbles.splice(i,1)
    }
    for(let i=0;i<bubbles.length;++i){
      bubbles[i].x+=bubbles[i].vx/2+(Math.random()-.5)*.05
      bubbles[i].y+=bubbles[i].vy/2+(Math.random()-.5)*.05
      bubbles[i].z-=bubbles[i].vz/2+(Math.random()-.5)*.05
      bubbles[i].s-=.15 // particle size diminishes
    }

    //handleBumps
    adjust=0
    if(bumpVar>t/(1000/speed)*2%1)adjust=1
    bumpVar=t/(1000/speed)*2%1
    for(let i=0;i<bumps.length;i++)bumps[i].z-=adjust
    for(let i=0;i<bumps.length;i++){
      if(bumps[i].z<0)bumps.splice(i,1);
    }


    // move reticle to last spoke, if there's only 1 remaining...
    let count=tTheta=0;
    for(let i=0;i<spokes;i++){
      if(gunsActive[i]){
        count++;
        tTheta=playerTheta+Math.PI*2/(spokes-spokeGet)*((i+.5)-spokes/2)*squeeze
      }
    }
    if(count==1){
      playerTheta=tTheta;
      spokes=1
      for(let i=0;i<spokes;i++)gunsActive[i]=0
      gunsActive[0]=1
    }
}


  draw=(dt)=>{

    clear(0);

    if(brightness > 15)brighter();
    if(brightness < 15)darker();
    //tunnel draw routine
    if(gameInPlay){
      text([ 'KILLS TO\nNEXT LEVEL', WIDTH/2+160, HEIGHT/2+60 , 2, 3, 'center', 'top', 1, 30])
      text([ (targetKills-enemiesKilledThisLevel).toString(), WIDTH/2+160, HEIGHT/2+80, 8, 15, 'center', 'top', 5, 30,]);
    }
    for(m=depth,bump=1;-1+m--;){
      for(i=sides;i--;){
        // q is the depth (Z) value and is also used to generate curvature of the tunnel

        q=m-t/1000*speed*2%1
        var skip=0
        if(bump!=1)skip=1
        bump = 1
        for(let k=0;k<bumps.length;k++){
          if(m==bumps[k].z|0 && i==bumps[k].theta|0){
            bump=1-bumps[k].b
            //bump=1.5
          }
        }
        O=S(s*2*j*q+d)*3/FOV*300-f
        P=S(s*2*j*(q+1)+d)*3/FOV*300-f
        Q=C(s*3*j*q+e)*.5/FOV*300-g
        R=C(s*3*j*(q+1)+e)*.5/FOV*300-g

        X=S(p=v*i)*bump+O,Y=C(p)*bump+Q,Z=q;
        //modify the color by Z with LUT, first sprite in sheet
        lutcolor = (Z.map(2,13, 15,29)|0).clamp(15, 28);
        cursorColor = LUT[lutcolor][55];
        moveTo3d(X,Y,Z);
        if(bump!=1)cursorColor = 5;
        if(skip){
          q++
        }else{
          X=S(p+=v)*bump+O,Y=C(p)*bump+Q,Z=q, lineTo3d(X,Y,Z);
          X=S(p)*bump+P,Y=C(p)*bump+R,Z=q+=1, lineTo3d(X,Y,Z);
          X=S(p-=v)*bump+P,Y=C(p)*bump+R,Z=q, lineTo3d(X,Y,Z);
        }
        if(bump!=1){
          cursorColor = 5;
          X=S(p=v*i)*bump+O,Y=C(p)*bump+Q,Z=q-=1; lineTo3d(X,Y,Z);
          tx=X,ty=Y,tz=Z
          X=S(p)+O,Y=C(p)+Q,Z=q,                  lineTo3d(X,Y,Z);
          tx1=X,ty1=Y,tz1=Z
          X=S(p+=v)*bump+O,Y=C(p)*bump+Q,Z=q,     moveTo3d(X,Y,Z);
          tx2=X,ty2=Y,tz2=Z
          X=S(p)+O,Y=C(p)+Q,Z=q,                  lineTo3d(X,Y,Z);
          tx3=X,ty3=Y,tz3=Z
          X=S(p)*bump+P,Y=C(p)*bump+R,Z=q+=1,     moveTo3d(X,Y,Z);
          tx4=X,ty4=Y,tz4=Z
          X=S(p)+P,Y=C(p)+R,Z=q,                  lineTo3d(X,Y,Z);
          tx5=X,ty5=Y,tz5=Z
          X=S(p-=v)*bump+P,Y=C(p)*bump+R,Z=q,     moveTo3d(X,Y,Z);
          tx6=X,ty6=Y,tz6=Z
          X=S(p)+P,Y=C(p)+R,Z=q,                  lineTo3d(X,Y,Z);
          tx7=X,ty7=Y,tz7=Z
          X=S(p+=v)+O,Y=C(p)+Q,Z=q-=1;            moveTo3d(X,Y,Z);
          tx8=X,ty8=Y,tz8=Z
          X=S(p)+P,Y=C(p)+R,Z=q+=1;               lineTo3d(X,Y,Z);
          tx9=X,ty9=Y,tz9=Z
          cursorColor=4
          tri3d(tx,ty,tz, tx1,ty1,tz1, tx2,ty2,tz2)
          tri3d(tx3,ty3,tz3, tx2,ty2,tz2, tx1,ty1,tz1)
        }
      }

      //draw splosions
      for(let i=splosions.length;i--;){
        Z=splosions[i].z
        if(m==(Z|0)){

          //black through red and yellow are colors 0-9.
          //we map the size of the particle S to a number that corresponds w the color
          cursorColor = Math.round(splosions[i].s.map(0,1.6,0,9).clamp(0, 9 ))
         // cursorColor = Math.round(splosions[i].s.map(0,1.6,16,21).clamp(16, 21 ))
          X=splosions[i].x
          Y=splosions[i].y
          fcir(X,Y,Z,splosions[i].s*7);
        }
      }

      //draw bubbles
      for(let i=bubbles.length;i--;){
        Z=bubbles[i].z
        if(m==(Z|0)){
          cursorColor = 27;
          cursorColor = Math.round( (4-bubbles[i].s).map(0,4,22,31).clamp(22, 31))
          X=bubbles[i].x
          Y=bubbles[i].y
          cir(X,Y,Z, 6+(1/bubbles[i].s)*5);
        }
      }

      //draw bullets
     // cursorColor = 22;
      for(let i=bullets.length;i--;){
        Z=bullets[i].z
        if(m==(Z|0)){


          let r = 20
          let z = Z-.6
          z+=.1
          X=S(bullets[i].theta)+S(s*2*j*z+d)*3/FOV*300-f
          Y=C(bullets[i].theta)+C(s*3*j*z+e)*.5/FOV*300-g
          fcir(X,Y,z,r,18);
           z+=.1
          X=S(bullets[i].theta)+S(s*2*j*z+d)*3/FOV*300-f
          Y=C(bullets[i].theta)+C(s*3*j*z+e)*.5/FOV*300-g
          fcir(X,Y,z,r,19);
           z+=.1
          X=S(bullets[i].theta)+S(s*2*j*z+d)*3/FOV*300-f
          Y=C(bullets[i].theta)+C(s*3*j*z+e)*.5/FOV*300-g
          fcir(X,Y,z,r,20);
           z+=.1
          X=S(bullets[i].theta)+S(s*2*j*z+d)*3/FOV*300-f
          Y=C(bullets[i].theta)+C(s*3*j*z+e)*.5/FOV*300-g
          fcir(X,Y,z,r,21);
           z+=.1
          X=S(bullets[i].theta)+S(s*2*j*z+d)*3/FOV*300-f
          Y=C(bullets[i].theta)+C(s*3*j*z+e)*.5/FOV*300-g
          fcir(X,Y,z,r, 22);

        }
      }

      //enemy draw routine
      cursorColor = 4;
      for(let i = 0; i < enemies.length; i++){
        en = enemies[i];
        Z=en.z;
        if(m==(Z|0)){ //for proper drawing order ;)
          X=S(en.theta)*.8+S(s*2*j*Z+d)*3/FOV*300-f
          Y=C(en.theta)*.8+C(s*3*j*Z+e)*.5/FOV*300-g
          renderSource = SPRITES;
          rspr3d(X,Y,Z, sprites.purpleBall, 3, en.theta+Math.PI*2, gameInPlay? enemyPal : gameoverPal );
        }
      }
      pal = LUT[brightness];

      //coin draw routine
      cursorColor = 13;
      for(let i = 0; i < coins.length; i++){
        en = coins[i];
        Z=en.z;
        if(m==(Z|0)){ //for proper drawing order ;)
          X=S(en.theta)*.8+S(s*2*j*Z+d)*3/FOV*300-f
          Y=C(en.theta)*.8+C(s*3*j*Z+e)*.5/FOV*300-g
          renderSource = SPRITES;
          rspr3d(X,Y,Z, sprites.coin, 3, en.theta+Math.PI*2+t/2);
        }
      }
      pal = LUT[brightness];


      //powerup draw routine
      for(let i = 0; i < powerups.length; i++){
        en = powerups[i];
        Z=en.z;
        if(m==(Z|0)){ //for proper drawing order ;)
          X=S(en.theta)*.8+S(s*2*j*Z+d)*3/FOV*300-f
          Y=C(en.theta)*.8+C(s*3*j*Z+e)*.5/FOV*300-g
          renderSource = SPRITES;
          rspr3d(X,Y,Z, sprites.star, 3, en.theta+Math.PI*2+t/30, gameInPlay? enemyPal : gameoverPal );
        }
      }
      pal = LUT[brightness];


      //player draw routine
        if(gameInPlay){
        if(m==(playerZ|0)){
            //player position
          Z=playerZ
          X=S(playerTheta)+S(s*2*j*Z+d)*3/FOV*300-f
          Y=C(playerTheta)+C(s*3*j*Z+e)*.5/FOV*300-g
          p=playerTheta+Math.PI*2

          moveTo3d(X,Y,Z)
          for(let i = 0; i < spokes; ++i){
            if(i == spokes-1){
              X=S(s*2*j*Z+d)*3/FOV*300-f,Y=C(s*3*j*Z+e)*.5/FOV*300-g
              p = playerTheta;
              X+=S( p )*1.03,Y+=C(p)*1.03;
              cursorColor=12
              for(let k=0;k<4;k++){
                let V=Math.PI*2/3*k+p+Math.PI
                let s=.15+S(t/8)*.05
                X2=X+S(V)*s
                Y2=Y+C(V)*s
                if(k){
                  lineTo3d(X2,Y2,Z)
                }else{
                  moveTo3d(X2,Y2,Z)
                }
              }
            }
            if(gunsActive[i]){
              V=1-retractSpoke[i]/retractSpeed;
              if(retractSpoke[i]){
                if(retractSpoke[i]<retractSpeed){
                  retractSpoke[i]++
                }else{
                  gunsActive[i]=0;
                  retractSpoke[i]=0;
                }
              }
              cursorColor = (i-spokes/2+.5)|0?spokeColor:22;
              X=S(s*2*j*Z+d)*3/FOV*300-f,Y=C(s*3*j*Z+e)*.5/FOV*300-g,moveTo3d(X,Y,Z)
              p = squeeze < .02 ? playerTheta : playerTheta+Math.PI*2/(spokes-spokeGet)*((i+.5)-spokes/2)*squeeze
              X+=S( p )*V,Y+=C(p)*V, lineTo3d(X,Y,Z)
              rspr3d(X, Y, Z, sprites.laserCannon, 2, p)
            }
          }
        }
      }
    }
    if(!gameInPlay){
      bullets=[];
      pal = gameoverPal
      renderTarget = BUFFER;
      clear(0);
      text([ 'GAME\nOVER', WIDTH/2, 60, 8, 15, 'center', 'top', 9, 1, 10, 10, 5 ]);
      text([ 'HIT THE SPACEBAR: ', WIDTH/2+20, HEIGHT/2+80, 8, 15, 'center', 'top', 3, 1+t/9%10, 3, 10, 3]);
      outline(BUFFER, SCREEN, 6,9,6,3);
      renderTarget = SCREEN; renderSource = BUFFER; spr();
      flip=false;
      brightness=30;
      t=0
   }
    renderTarget = BUFFER;
    clear(0);
    text([ '' + score, WIDTH/2, 10, 3, 15, 'center', 'top', 2, 9, ]);
    renderTarget = SCREEN;
    outline(BUFFER, SCREEN, 12,11,13,14);
    text([ 'LEVEL ' + level, WIDTH/2-200, 10, 2, 15, 'left', 'top', 1, 9, ]);
    if(typeof highScores[0] != "undefined")text([ 'HI SCORE\n' + parseInt(highScores[0].score), WIDTH/2+200, 10, 2, 8, 'right', 'top', 1, 9, ]);
    if(t<=levelUpDisplayTimer && gameInPlay){
      renderTarget = BUFFER; clear(0);
      text([ 'LEVEL: ' + level, WIDTH/2, HEIGHT/2-40, 8, 15, 'center', 'top', 6, 16,  10, 10, 3]);
      outline(BUFFER, SCREEN, 11,10,12,13);
      renderTarget = SCREEN; renderSource = BUFFER; spr();
    }


  }//end draw()

  levelUp=()=>{
    playSound(snd.levelUp, 1, 0, .5, 0);
    // sound = new Audio("levelup.ogg")
    // sound.volume=.5
    // sound.play()
    level++;
    levelUpDisplayTimer=t+100;
    startup()
  }

  //---------Spawners---------------------
  spawnSplosion=(x,y,z,a=99)=>{

    if(a==99){ // enemy died
      playSound(snd.splode, 1, 0, .5/(1+z/8), 0);
      // sound=new Audio("splode.ogg");
      // sound.volume=.5/(1+z/8);
      // sound.play();
    }
    if(a==150){ // player lost gun
      playSound(snd.splode, 1, 0, .2, 0);
      // sound=new Audio("splode.ogg");
      // sound.volume=.2;
      // sound.play();
      playSound(snd[ 'metal' + (1+Math.random()*5|0) ], 1, 0, .175, 0);
      //playSound(snd[ 'metal' + 1+Math.random()*5|0 ], 1, 0, .175, 0);

      // sound=new Audio(`metal${1+Math.random()*5|0}.ogg`);
      // sound.volume=.175;
      // sound.play();
    }
    for(let i=a;i--;){
      let splosionVelocity=Math.random()*.13
      let p1=Math.PI*2*Math.random()
      let p2=Math.PI*Math.random()
      let vx=S(p1)*S(p2)*splosionVelocity
      let vy=C(p1)*S(p2)*splosionVelocity
      let vz=C(p2)*splosionVelocity
      splosions.push({x,y,z,vx,vy,vz,s:2+Math.random()})
    }
  }

  spawnBubble=(x,y,z,a=99)=>{
    for(let i=a;i--;){
      let splosionVelocity=Math.random()*.13
      let p1=Math.PI*2*Math.random();
      let p2=Math.PI*Math.random();
      let vx=S(p1)*S(p2)*splosionVelocity
      let vy=C(p1)*S(p2)*splosionVelocity
      let vz=C(p2)*splosionVelocity
      bubbles.push({x,y,z,vx,vy,vz,s:5+Math.random()})
    }
  }

  spawnBump=(a=1)=>{
    for(let i = 0; i < a; i++){
      bumps.push({z:depth,theta:Math.random()*sides|0,b:.2+Math.random()*.2});
      //bumps.push({z:depth, theta:15, b:.2+Math.random()*.2});
    }
  }
  spawnCoinCanal=(d=1)=>{
    let pos = Math.random()*(sides-2)+1|0;
    let coinPos = pos.map(0, 16, -Math.PI, Math.PI) + Math.PI + Math.PI/32;
    for(let i = 0; i < d; i++){
      bumps.push({z:depth-i,theta:pos-1,b:.2+Math.random()*.2});
      coins.push({z:depth-i,theta:coinPos,b:.2+Math.random()*.2});
      bumps.push({z:depth-i,theta:pos+1,b:.2+Math.random()*.2});
    }
  }
  spawnEnemy=()=>{
    enemies.push({
      z: depth,
      theta: Math.random() * (Math.PI*2) - Math.PI,
      size: 15,
      health: Math.random()>.5 ? 1 : 2,//+score/3000
    })
  }
  spawnCoin=(a=1)=>{
    for(let i = 0; i < a; i++){
      coins.push({z:depth,theta:Math.random()*Math.PI*2-Math.PI,b:.2+Math.random()*.2});
    }
  }
  spawnPowerup=()=>{
    powerups.push({
      z: depth,
      theta: Math.random() * (Math.PI*2) - Math.PI,
      size: 15
    })
  }
  spawnSpoke=()=>{
    playSound(snd.powerup, 1, 0, .8, 0);
    var H=0;
    for(var i=0;i<spokes;i++)if(gunsActive[i])H++;
    spokes=H+1;
    gunsActive = Array(99).fill(1);
    lastSpokeScore = score;
    spokeGet = 1;
  }
  //---------end Spawners---------------------

  //projection helpers
  x3d=(x,z)=>w+x/z*FOV
  y3d=(y,z)=>h+y/z*FOV

  lineTo3d=(x,y,z)=>{
    z=z>.1?z:.1
    lineTo( x3d(x,z), y3d(y,z) )
  }
  moveTo3d=(x,y,z)=>{
    z=z>.1?z:.1
    moveTo( x3d(x,z), y3d(y,z) )
  }
  //draw a circle projected to a 3d coordinate, scaled
  cir=(x,y,z,r)=>{
    z=z>.1?z:.1
    circle( x3d(x,z), y3d(y,z), r/z, cursorColor )
  }

  //draw a filled circle to a 3D coordinate, scaled
  fcir=(x,y,z,r, color=cursorColor)=>{
    r=r<500?r:500
    z=z>.1?z:.1
    fillCircle( x3d(x,z), y3d(y,z), r/z, color)
  }

  spr3d=(x, y, z, sprite, scale=1)=>{
    z=z>.1?z:.1
    dstX = x3d(x,z)-sprite.width*scale/z/70;
    dstY = y3d(y,z)-sprite.height*scale/z/70;
    scaleZ = scale/Z*FOV/300;
    sspr(sprite.x, sprite.y, sprite.width, sprite.height, dstX, dstY, scaleZ, scaleZ);
  }

  rspr3d=(x, y, z, sprite, scale=1, theta, palette=pal)=>{
    z=z>.1?z:.1
    scaleZ = scale/z*FOV/300;
    rspr(sprite.x, sprite.y, sprite.width, sprite.height, x3d(x,z), y3d(y,z), scaleZ, theta, palette);
  }

  pset3d=(x, y, z, color=cursorColor)=>{
    z=z>.1?z:.1
    pset( x3d(x,z), y3d(y,z), color )
  }

  tri3d=(x, y, z, x1, y1, z1, x2, y2, z2)=>{
  z=z>.1?z:.1
    fillTriangle( x3d(x,z), y3d(y,z), x3d(x1,z1), y3d(y1,z1), x3d(x2,z2), y3d(y2,z2) )
  }


  reset=()=>{
    //console.log('reset')
    brightness = 30;
    pal = LUT[brightness];
    level=1;
    spokes = 3;
    shotTimer=0;
    gunsActive = Array(99).fill(1);
    playerTheta = 0;
    gameInPlay=true
    bullets = [];
    splosions = [];
    enemies = [];
    bumps=[];
    powerups=[];
    score=0;
    spacekey=0;
    leftkey=0;
    upkey=0;
    rightkey=0;
    downkey=0;
    xkey=0;
    ckey=0;
    rkey=0;
    ctrlkey=0;
    mkey=0;
    pkey=0;
    startup();
  }

  soundToggle=()=>{
    if(paused)muted=0
    muted = !muted;
    audioMaster.gain.value = muted ? 0 : 1;
  }

  darker=()=>{
    brightness = (brightness + 1).clamp(0,30)
    pal = LUT[brightness];
  }

  brighter=()=>{
    brightness = (brightness - 1).clamp(0,31)
    pal = LUT[brightness];
  }

  buttonPressed=(b)=> {
    if (typeof(b) == "object") {
      return b.pressed;
    }
    return b == 1.0;
  }

  onkeydown=e=>{
    switch(e.which){
      case 32:spacekey=1;break;
      case 37:leftkey=1;break;
      case 38:upkey=1;break;
      case 39:rightkey=1;break;
      case 40:downkey=1;break;
      case 88:xkey=1;break;
      case 67:ckey=1;break;
      case 82:rkey=1;break;
      case 17:ctrlkey=1;break;
      case 77:mkey=1;break;
      case 80:pkey=1;break;
    }
  }

  onkeyup=e=>{
    switch(e.which){
      case 32:spacekey=0;break;
      case 37:leftkey=0;break;
      case 38:upkey=0;break;
      case 39:rightkey=0;break;
      case 40:downkey=0;break;
      case 88:xkey=0;break;
      case 67:ckey=0;brightness=1;break;
      case 82:rkey=0;brightness=30;break;
      case 17:ctrlkey=0;break;
      case 77:mkey=0;soundToggle();break;
      case 80:pkey=0;paused=!paused;soundToggle();break;
    }
  }

  window.addEventListener('blur', function (event) {
    muted = true;
    audioMaster.gain.value = 0;
    paused = true;
  }, false);
  window.addEventListener('focus', function (event) {
    muted = false;
    audioMaster.gain.value = 1;
    paused = false;
  }, false);
  window.addEventListener("gamepadconnected", function(e) {
  gp = navigator.getGamepads()[e.gamepad.index];
  // console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
  //   gp.index, gp.id,
  //   gp.buttons.length, gp.axes.length);
});

  load();
})();
