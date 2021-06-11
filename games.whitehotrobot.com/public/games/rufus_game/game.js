(function(){ 

	
	function Turkey(x,y){
		this.x=x;
		this.y=y;
		this.vx=0;
		this.vy=0;
	}
	

	function Flower(x,y){
		this.x=x;
		this.y=y;
	}
	

	function rand(vars){
		vars.seed+=.1234;
		return parseFloat('0.'+Math.sin(vars.seed).toString().substr(6));
	}
	

    function doLogic(vars){

		if(vars.phaseTimer<vars.frameNo){
			vars.phaseTimer=vars.frameNo+vars.phaseInterval;
			vars.phase=!vars.phase;
		}
		
		var p,v,d,t,mind;
		
		if(!(vars.frameNo%1000))spawnFlower(vars);
		
		if(vars.leftButton){
			vars.rufus.targetX=vars.mx;
			vars.rufus.targetY=vars.my;
		}
		vars.rufus.dist=Math.sqrt((vars.rufus.targetX-vars.rufus.x)*(vars.rufus.targetX-vars.rufus.x)+
								(vars.rufus.targetY-vars.rufus.y)*(vars.rufus.targetY-vars.rufus.y));
		if(vars.rufus.dist){
			p=Math.atan2(vars.rufus.targetX-vars.rufus.x,vars.rufus.targetY-vars.rufus.y);
			if(p<-Math.PI/1.5 || p>=Math.PI/1.5)vars.rufus.direction=0;
			if(p>=-Math.PI/1.5 && p<-Math.PI/4)vars.rufus.direction=3;
			if(p<Math.PI/4 && p>=-Math.PI/4)vars.rufus.direction=2;
			if(p<Math.PI/1.5 && p>=Math.PI/4)vars.rufus.direction=1;
			v=vars.rufus.speed*vars.rufus.dist/300;
			vars.rufus.vx=Math.sin(p)*Math.min(v,vars.rufus.dist);
			vars.rufus.vy=Math.cos(p)*Math.min(v,vars.rufus.dist);
			vars.rufus.x+=vars.rufus.vx;
			vars.rufus.y+=vars.rufus.vy;
		}
		
		for(var i=0;i<vars.skunks.length;++i){
			mind=1000000;
			t=-1;
			for(var j=0;j<vars.flowers.length;++j){
				d=Math.sqrt((vars.skunks[i].x-vars.flowers[j].x)*(vars.skunks[i].x-vars.flowers[j].x)+
							(vars.skunks[i].y-vars.flowers[j].y)*(vars.skunks[i].y-vars.flowers[j].y));
				if(d<mind){
					mind=d;
					t=j;
				}
			}
			if(mind<vars.skunks[i].up.height){
				vars.flowers.splice(t,1);
				vars.skunkScore++;
				vars.chomp=new Audio("chomp.ogg");
				vars.chomp.volume=.5;
				vars.chomp.play();
				if(!vars.flowers.length)spawnFlower(vars);
			}else if(t!=-1){
				vars.skunks[i].targetX=vars.flowers[t].x;
				vars.skunks[i].targetY=vars.flowers[t].y;
				
				vars.skunks[i].dist=Math.sqrt((vars.skunks[i].targetX-vars.skunks[i].x)*(vars.skunks[i].targetX-vars.skunks[i].x)+
											   (vars.skunks[i].targetY-vars.skunks[i].y)*(vars.skunks[i].targetY-vars.skunks[i].y));
				if(vars.skunks[i].dist){
					p=Math.atan2(vars.skunks[i].targetX-vars.skunks[i].x,vars.skunks[i].targetY-vars.skunks[i].y);
					v=vars.skunks[i].speed;
					vars.skunks[i].vx=Math.sin(p)*Math.min(v,vars.skunks[i].dist);
					vars.skunks[i].vy=Math.cos(p)*Math.min(v,vars.skunks[i].dist);
					p=Math.atan2(vars.rufus.x-vars.skunks[i].x,vars.rufus.y-vars.skunks[i].y);
					d=Math.sqrt((vars.skunks[i].x-vars.rufus.x)*(vars.skunks[i].x-vars.rufus.x)+
								(vars.skunks[i].y-vars.rufus.y)*(vars.skunks[i].y-vars.rufus.y));
					v=vars.skunks[i].speed*vars.skunks[i].speed*50/d;
					vars.skunks[i].vx-=Math.sin(p)*v;
					vars.skunks[i].vy-=Math.cos(p)*v;
					p=Math.atan2(vars.skunks[i].vx,vars.skunks[i].vy);
					if(p<-Math.PI/1.5 || p>=Math.PI/1.5)vars.skunks[i].direction=0;
					if(p>=-Math.PI/1.5 && p<-Math.PI/4)vars.skunks[i].direction=3;
					if(p<Math.PI/4 && p>=-Math.PI/4)vars.skunks[i].direction=2;
					if(p<Math.PI/1.5 && p>=Math.PI/4)vars.skunks[i].direction=1;
					vars.skunks[i].x+=vars.skunks[i].vx;
					vars.skunks[i].y+=vars.skunks[i].vy;
				}			
			}
			d=Math.sqrt((vars.skunks[i].x-vars.rufus.x)*(vars.skunks[i].x-vars.rufus.x)+
						(vars.skunks[i].y-vars.rufus.y)*(vars.skunks[i].y-vars.rufus.y));
			if(d<vars.skunks[i].up.height){
				vars.skunks.splice(i,1);
				vars.rufusScore++;
				spawnTurkey(vars);
				vars.rufusSound=new Audio("cat_sound.mp3");
				vars.rufusSound.volume=.5;
				vars.rufusSound.play();
				vars.chomp=new Audio("chomp.ogg");
				vars.chomp.volume=.5;
				vars.chomp.play();
			}
		}
	}


    function draw(vars){

        //vars.ctx.clearRect(0, 0, canvas.width, canvas.height);
		vars.ctx.globalAlpha=.3;
		vars.ctx.drawImage(vars.grass,0,0,vars.canvas.width,vars.canvas.height);

		vars.ctx.globalAlpha=1;
		
		for(var i=0;i<vars.flowers.length;++i){
			vars.ctx.drawImage(vars.flower,vars.flowers[i].x-vars.flower.width/2,vars.flowers[i].y-vars.flower.height/2,vars.flower.width,vars.flower.height);
		}
		
		var sx,sy,sWidth,sHeight,x,y,width,height;
		
		for(var i=0;i<vars.skunks.length;++i){
			switch(vars.skunks[i].direction%4){
				case 0:
					width=vars.skunks[i].up.width;
					height=vars.skunks[i].up.height;
					x=vars.skunks[i].x-width/2;
					y=vars.skunks[i].y-height/2;
					vars.ctx.drawImage(vars.skunks[i].up,x,y);
				break;
				case 1:
					width=vars.skunks[i].right.width;
					height=vars.skunks[i].right.height;
					x=vars.skunks[i].x-width/2;
					y=vars.skunks[i].y-height/2;
					vars.ctx.drawImage(vars.skunks[i].right,x,y);
				break;
				case 2:
					width=vars.skunks[i].down.width;
					height=vars.skunks[i].down.height;
					x=vars.skunks[i].x-width/2;
					y=vars.skunks[i].y-height/2;
					vars.ctx.drawImage(vars.skunks[i].down,x,y);
				break;
				case 3:
					width=vars.skunks[i].left.width;
					height=vars.skunks[i].left.height;
					x=vars.skunks[i].x-width/2;
					y=vars.skunks[i].y-height/2;
					vars.ctx.drawImage(vars.skunks[i].left,x,y);
				break;
			}
		}
		switch(vars.rufus.direction%4){
			case 0:
				sx=0;
				sy=vars.phase?vars.rufus.up.height/2:0;
				sWidth=vars.rufus.up.width;
				sHeight=vars.rufus.up.height/2;
				width=vars.rufus.up.width;
				height=vars.rufus.up.height/2;
				x=vars.rufus.x-width/2;
				y=vars.rufus.y-height/2;
				vars.ctx.drawImage(vars.rufus.up,sx,sy,sWidth,sHeight,x,y,width,height);
			break;
			case 1:
				sx=0;
				sy=vars.phase?vars.rufus.right.height/2:0;
				sWidth=vars.rufus.right.width;
				sHeight=vars.rufus.right.height/2;
				width=vars.rufus.right.width/1.5;
				height=vars.rufus.right.height/2/1.5;
				x=vars.rufus.x+vars.rufus.right.width/6-width/1.5;
				y=vars.rufus.y+vars.rufus.right.height/2/6-height/1.5;
				vars.ctx.drawImage(vars.rufus.right,sx,sy,sWidth,sHeight,x,y,width,height);
			break;
			case 2:
				sx=0;
				sy=vars.phase?vars.rufus.down.height/2:0;
				sWidth=vars.rufus.down.width;
				sHeight=vars.rufus.down.height/2;
				width=vars.rufus.down.width;
				height=vars.rufus.down.height/2;
				x=vars.rufus.x-width/2;
				y=vars.rufus.y-height/2;
				vars.ctx.drawImage(vars.rufus.down,sx,sy,sWidth,sHeight,x,y,width,height);
			break;
			case 3:
				sx=0;
				sy=vars.phase?vars.rufus.left.height/2:0;
				sWidth=vars.rufus.left.width;
				sHeight=vars.rufus.left.height/2;
				width=vars.rufus.left.width/1.5;
				height=vars.rufus.left.height/2/1.5;
				x=vars.rufus.x+vars.rufus.left.width/6-width/1.5;
				y=vars.rufus.y+vars.rufus.left.height/2/6-height/1.5;
				vars.ctx.drawImage(vars.rufus.left,sx,sy,sWidth,sHeight,x,y,width,height);
			break;
		}

		vars.ctx.font="96px Square721";
		
		vars.ctx.fillStyle="#a00";
		vars.ctx.fillText("SKUNKS: "+vars.skunkScore,vars.cx*2-770,100);
		vars.ctx.strokeStyle="#f6a";
		vars.ctx.strokeText("SKUNKS: "+vars.skunkScore,vars.cx*2-770,100);

		vars.ctx.fillStyle="#38c";
		vars.ctx.fillText("RUFUS: "+vars.rufusScore,120,100);
		vars.ctx.strokeStyle="#fff";
		vars.ctx.strokeText("RUFUS: "+vars.rufusScore,120,100);

	}
	
	
	function spawnTurkey(vars){
		
		var x,y;
		if(Math.random()>=0.5){
			x=Math.random()*vars.canvas.width;
			y=Math.random()>=0.5?-vars.skunkSize:vars.canvas.height+vars.skunkSize;
		}else{
			x=Math.random()>=0.5?-vars.skunkSize:vars.canvas.width+vars.skunkSize;
			y=Math.random()*vars.canvas.height;
		}
		vars.skunks.push(new Turkey(x,y));
		
		vars.skunks[vars.skunks.length-1].left=vars.skunk.left;
		vars.skunks[vars.skunks.length-1].right=vars.skunk.right;
		vars.skunks[vars.skunks.length-1].up=vars.skunk.up;
		vars.skunks[vars.skunks.length-1].down=vars.skunk.down;
		vars.skunks[vars.skunks.length-1].targetX=x;
		vars.skunks[vars.skunks.length-1].targetY=y;
		vars.skunks[vars.skunks.length-1].speed=9.5;
		vars.skunks[vars.skunks.length-1].direction=0;
	}
	
	
	function spawnFlower(vars){
		
		var x,y;
		x=vars.flower.width/2+Math.random()*(vars.canvas.width-vars.flower.width);
		y=vars.flower.height/2+Math.random()*(vars.canvas.height-vars.flower.height);
		vars.flowers.push(new Flower(x,y));
		vars.skunkGobble=new Audio("skunk_sound.mp3");
		vars.skunkGobble.volume=.5;
		vars.skunkGobble.play();
	}
	
	
    function loadScene(vars){

		vars.grass=new Image();
		vars.grass.src="grass.jpg";

		vars.rufus={};
		vars.rufus.up=new Image();
		vars.rufus.up.src="rufus_up.png";
		vars.rufus.right=new Image();
		vars.rufus.right.src="rufus_right.png";
		vars.rufus.down=new Image();
		vars.rufus.down.src="rufus_down.png";
		vars.rufus.left=new Image();
		vars.rufus.left.src="rufus_left.png";
		vars.rufus.x=vars.cx;
		vars.rufus.y=vars.cy;
		vars.rufus.vx=0;
		vars.rufus.vy=0;
		vars.rufus.targetX=vars.cx;
		vars.rufus.targetY=vars.cy;
		vars.rufus.speed=10;
		vars.rufus.direction=0;
		vars.rufus.dist=0;
		
		vars.skunk={};
		vars.skunk.up=new Image();
		vars.skunk.up.src="skunk_up.png";
		vars.skunk.right=new Image();
		vars.skunk.right.src="skunk_right.png";
		vars.skunk.down=new Image();
		vars.skunk.down.src="skunk_down.png";
		vars.skunk.left=new Image();
		vars.skunk.left.src="skunk_left.png";
		vars.skunks=[];
		
		vars.flower=new Image();
		vars.flower.src="flower.png";
		vars.flowers=[];
		
		spawnFlower(vars);
		spawnTurkey(vars);
    }


    function frame(vars) {

        if(vars === undefined){
            var vars={};
            vars.canvas = document.querySelector("#canvas");
            vars.ctx = vars.canvas.getContext("2d");
            vars.canvas.width = 1366*1.6;
            vars.canvas.height = 768*1.6;
            window.addEventListener("resize", function(){
                //vars.canvas.width = document.body.clientWidth;
                //vars.canvas.height = document.body.clientHeight;
                //vars.cx=vars.canvas.width/2;
                //vars.cy=vars.canvas.height/2;
            }, true);
			vars.canvas.oncontextmenu = function (e) { e.preventDefault(); };
            vars.canvas.addEventListener("mousemove", function(e){
                var rect = vars.canvas.getBoundingClientRect();
				vars.omx=vars.mx;
				vars.omy=vars.my;
                vars.mx = Math.round((e.clientX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
                vars.my = Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
            }, true);
            vars.canvas.addEventListener("mousedown", function(e){
                switch(e.which){
					case 1: vars.leftButton=1; break;
					case 3: vars.rightButton=1; break;
				}
            }, true);
            vars.canvas.addEventListener("mouseup", function(e){
                switch(e.which){
					case 1: vars.leftButton=0; break;
					case 3: vars.rightButton=0; break;
				}
            }, true);
            vars.canvas.addEventListener("mousewheel", function(e){
				var e = window.event || e; // old IE support
				vars.wheelDelta = Math.max(-1, Math.min(1, (e.wheelDelta/120 || -e.detail)));
            }, true);
            vars.canvas.addEventListener("touchstart", function(e){
                vars.leftButton=1;
                e.preventDefault();
                var rect = vars.canvas.getBoundingClientRect();
				vars.omx=vars.mx;
				vars.omy=vars.my;
                vars.mx = Math.round((e.changedTouches[0].pageX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
                vars.my = Math.round((e.changedTouches[0].pageY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
            }, true);
            vars.canvas.addEventListener("touchend", function(e){
                vars.leftButton=0;
            }, true);
            vars.canvas.addEventListener("touchmove", function(e){
                e.preventDefault();
                var rect = vars.canvas.getBoundingClientRect();
				vars.omx=vars.mx;
				vars.omy=vars.my;
                vars.mx = Math.round((e.changedTouches[0].pageX-rect.left)/(rect.right-rect.left)*vars.canvas.width);
                vars.my = Math.round((e.changedTouches[0].pageY-rect.top)/(rect.bottom-rect.top)*vars.canvas.height);
            }, true);
			
            vars.frameNo=0;
			
            vars.mx=0;
            vars.my=0;
			vars.wheelDelta=0;
            vars.cx=vars.canvas.width/2;
            vars.cy=vars.canvas.height/2;
			vars.seed=0;
			vars.phase=0;
			vars.phaseTimer=0;
			vars.phaseInterval=20;
			vars.turnTimer=0;
			vars.turnInterval=80;
			vars.skunkSize=250;
			vars.skunkScore=0;
			vars.rufusScore=0;
 			vars.soundtrack=new Audio("soundtrack.mp3");
			vars.soundtrack.volume=0.25;
			vars.soundtrack.play();
			vars.soundtrack.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
           loadScene(vars);
        }

        vars.frameNo++;
        requestAnimationFrame(function() {
          frame(vars);
        });

        doLogic(vars);
        draw(vars);
    }

	frame();
})();