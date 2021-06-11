function loadLevel(showIntro){

	alive=true;
	deathScreenAlpha=0;
	moveTimer=0;
	playerTrail=new Array();
	enemies=new Array();
	splosionRadius=0;
	if(showIntro)introScreenAlpha=1;
	switch(level){
		case 1:
			theta=pi/2;
			point=new Object();
			point.x=2*size;
			point.y=10*size;
			playerTrail.push(point);
			point=new Object();
			point.x=2*size;
			point.y=10*size;
			playerTrail.push(point);
			playerSpeed=8;
			enemyPlayerSpeed=8;
			enemyTurnInterval=5;
			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=9*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=9*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);
			break;
		case 2:
			theta=pi/2;
			point=new Object();
			point.x=2*size;
			point.y=10*size;
			playerTrail.push(point);
			point=new Object();
			point.x=2*size;
			point.y=10*size;
			playerTrail.push(point);
			playerSpeed=12;
			enemyPlayerSpeed=12;
			enemyTurnInterval=2;
			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=9*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=9*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);
			break;
		case 3:
			theta=pi/2;
			point=new Object();
			point.x=2*size;
			point.y=9*size;
			playerTrail.push(point);
			point=new Object();
			point.x=2*size;
			point.y=9*size;
			playerTrail.push(point);
			playerSpeed=8;
			enemyPlayerSpeed=8;
			enemyTurnInterval=2;
			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=4.5*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=4.5*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);

			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=13.5*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=13.5*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);
			break;
		case 4:
			theta=pi/2;
			point=new Object();
			point.x=2*size;
			point.y=9*size;
			playerTrail.push(point);
			point=new Object();
			point.x=2*size;
			point.y=9*size;
			playerTrail.push(point);
			playerSpeed=12;
			enemyPlayerSpeed=12;
			enemyTurnInterval=1;
			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=4.5*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=4.5*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);

			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=13.5*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=13.5*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);
			break;
		case 5:
			theta=pi/2;
			point=new Object();
			point.x=2*size;
			point.y=9*size;
			playerTrail.push(point);
			point=new Object();
			point.x=2*size;
			point.y=9*size;
			playerTrail.push(point);
			playerSpeed=10;
			enemyPlayerSpeed=10;
			enemyTurnInterval=1;
			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=4.5*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=4.5*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);

			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=13.5*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=13.5*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);

			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=9*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=9*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);
			break;
		case 6:
			theta=pi/2;
			point=new Object();
			point.x=2*size;
			point.y=9*size;
			playerTrail.push(point);
			point=new Object();
			point.x=2*size;
			point.y=9*size;
			playerTrail.push(point);
			playerSpeed=13;
			enemyPlayerSpeed=13;
			enemyTurnInterval=1;
			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=4.5*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=4.5*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);

			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=13.5*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=13.5*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);

			enemy=new Object();
			enemy.trail=new Array();
			enemy.dists=new Array(4);
			point=new Object();
			point.x=30*size;
			point.y=9*size;
			enemy.trail.push(point);
			point=new Object();
			point.x=30*size;
			point.y=9*size;
			enemy.trail.push(point);
			enemy.theta=pi*1.5;
			enemy.turnTimer=0;
			enemy.oldTheta=enemy.theta;
			enemy.alive=true;
			enemy.alpha=1;
			enemy.splosionAlpha=1;
			enemy.splosionRadius=0;
			enemies.push(enemy);
			break;
		case 7:
			break;
		case 8:
			break;
		case 9:
			break;
		case 10:
			break;
	}
}

function initVars(){
	
	pi=Math.PI;
	canvas=$("#canvas")[0];
	ctx=canvas.getContext("2d");
	frames=0;
	canvas.width=1360;
	canvas.height=768;
	cx=canvas.width/2;
	cy=canvas.height/2;
	size=cx*2/32;
	startScreen=new Image();
	startScreen.src="startScreen.jpg";
	deathScreen=new Image();
	deathScreen.src="deathScreen.jpg";
	victoryScreen=new Image();
	victoryScreen.src="winScreen.jpg";
	bike_green=new Image();
	bike_green.src="bike_green.png";
	bike_orange=new Image();
	bike_orange.src="bike_orange.png";
	splodePic=new Image();
	splodePic.src="splode.png";
	splodeSound=new Audio("splode.ogg");
	splodeSound.volume=.75;
	turnTimer=0;
	turnInterval=1;
	victoryScreenAlpha=0;
	soundtrack=new Audio();
	soundtrack.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	deathSound=new Audio("death.ogg");
	deathSound.volume=.3;
	leftkey=rightkey=upkey=downkey=spacekey=enterkey=wkey=akey=skey=dkey=0;
	mx=my=leftButton=rightButton=0;
	level=1;
	score=0;
	canvas.addEventListener("mousemove", mouse, true);
	canvas.onmousedown=function(event){event.preventDefault();}
	canvas.addEventListener("mousedown", function(event) {
		switch (event.which) {
			case 1: leftButton=true; break;
			case 3: rightButton=true; break;
		}
	});
	canvas.addEventListener("mouseup", function(event) {
		switch (event.which) {
			case 1: leftButton=false; break;
			case 3: rightButton=false; break;
		}
	});
}

function mouse(e) {

    var rect = canvas.getBoundingClientRect();
	mx = Math.round((e.clientX-rect.left)/(rect.right-rect.left)*canvas.width);
	my = Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);
}

window.addEventListener("keydown", function(e){
	
	chr=e.keyCode || e.charCode;
	switch(chr){
		case 37:
			leftkey=1;
			break;
		case 38:
			upkey=1;
			break;
		case 39:
			rightkey=1;
			break;
		case 40:
			downkey=1;
			break;
		case 32:spacekey=1;break;
		case 13:enterkey=1;break;
	}
});

window.addEventListener("keyup", function(e){
	
	chr=e.keyCode || e.charCode;
	switch(chr){
		case 37:leftkey=0;break;
		case 38:upkey=0;break;
		case 39:rightkey=0;break;
		case 40:downkey=0;break;
		case 32:spacekey=0;break;
		case 13:enterkey=0;break;
	}
});

function rgb(col){
	
	var r = parseInt((.5+Math.sin(col)*.5)*16);
	var g = parseInt((.5+Math.cos(col)*.5)*16);
	var b = parseInt((.5-Math.sin(col)*.5)*16);
	return "#"+r.toString(16)+g.toString(16)+b.toString(16);
}

function intersects(x1,y1,x2,y2,x3,y3,x4,y4){
	
	uc=(y4-y3)*(x2-x1)-(x4-x3)*(y2-y1);
	ua=((x4-x3)*(y1-y3)-(y4-y3)*(x1-x3))/uc;
	ub=((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/uc;
	return (ua>=0&&ua<=1&&ub>=0&&ub<=1);
}

function splode(){
	
	splodeSound=new Audio("splode.ogg");
	splodeSound.volume=.75;
	splodeSound.play()	
}

function doLogic(){

	oldTheta=theta;
	if(downkey&&theta!=pi&&turnTimer<frames){
		theta=0;
		turnTimer=frames+turnInterval;
	}
	if(upkey&&theta!=0&&turnTimer<frames){
		theta=pi;
		turnTimer=frames+turnInterval;
	}
	if(leftkey&&theta!=pi/2&&turnTimer<frames){
		theta=pi*1.5;
		turnTimer=frames+turnInterval;
	}
	if(rightkey&&theta!=pi*1.5&&turnTimer<frames){
		theta=pi/2;
		turnTimer=frames+turnInterval;
	}
	point=new Object();
	point.x=playerTrail[playerTrail.length-1].x+Math.sin(theta)*playerSpeed;
	point.y=playerTrail[playerTrail.length-1].y+Math.cos(theta)*playerSpeed;
	x1=point.x; y1=point.y; x2=playerTrail[playerTrail.length-1].x; y2=playerTrail[playerTrail.length-1].y; 
	for(i=0;i<playerTrail.length-2;++i){
		x3=playerTrail[i].x; y3=playerTrail[i].y; x4=playerTrail[i+1].x; y4=playerTrail[i+1].y;
		if(intersects(x1,y1,x2,y2,x3,y3,x4,y4)){
			if(alive)splode();
			alive=false;
		}
		dx1=x3; dy1=y3; dx2=x4; dy2=y4; dx3=x1; dy3=y1;
		d=(dx2-dx1)*(dx2-dx1)+(dy2-dy1)*(dy2-dy1);
		u=((dx3-dx1)*(dx2-dx1)+(dy3-dy1)*(dy2-dy1))/d;
		x=dx1+u*(dx2-dx1); y=dy1+u*(dy2-dy1);
		d=Math.sqrt((x-dx3)*(x-dx3)+(y-dy3)*(y-dy3));
		if(u>0&&u<1&&d<10){
			if(alive)splode();
			alive=false;								
		}
		for(j=0;j<enemies.length;++j){
			if(enemies[j].alive){
				for(k=0;k<enemies[j].trail.length-1;++k){
					x3=enemies[j].trail[k].x; y3=enemies[j].trail[k].y; x4=enemies[j].trail[k+1].x; y4=enemies[j].trail[k+1].y;
					if(intersects(x1,y1,x2,y2,x3,y3,x4,y4)){
						if(alive)splode();
						alive=false;
					}
					dx1=x3; dy1=y3; dx2=x4; dy2=y4; dx3=x1; dy3=y1;
					d=(dx2-dx1)*(dx2-dx1)+(dy2-dy1)*(dy2-dy1);
					u=((dx3-dx1)*(dx2-dx1)+(dy3-dy1)*(dy2-dy1))/d;
					x=dx1+u*(dx2-dx1); y=dy1+u*(dy2-dy1);
					d=Math.sqrt((x-dx3)*(x-dx3)+(y-dy3)*(y-dy3));
					if(u>0&&u<1&&d<10){
						if(alive)splode();
						alive=false;								
					}
				}
			}
		}
	}
	if(point.x>cx*2||point.x<0||point.y>cy*2||point.y<0){
		if(alive)splode();
		alive=false;
	}
	if(alive){
		if(oldTheta!=theta){
			playerTrail.push(point);
		}else{
			playerTrail[playerTrail.length-1].x=point.x;
			playerTrail[playerTrail.length-1].y=point.y;
		}
		enemiesAlive=0;
		for(i=0;i<enemies.length;++i){
			if(enemies[i].alive){
				point=new Object();
				point.x=enemies[i].trail[enemies[i].trail.length-1].x+Math.sin(enemies[i].theta)*enemyPlayerSpeed;
				point.y=enemies[i].trail[enemies[i].trail.length-1].y+Math.cos(enemies[i].theta)*enemyPlayerSpeed;
				x1=point.x; y1=point.y; x2=enemies[i].trail[enemies[i].trail.length-1].x; y2=enemies[i].trail[enemies[i].trail.length-1].y; 
				x1b=x1; y1b=y1;
				enemies[i].dists[0]=y1b;
				enemies[i].dists[1]=cx*2-x1b;
				enemies[i].dists[2]=cy*2-y1b;
				enemies[i].dists[3]=x1b;
				for(k=0;k<enemies.length;++k){
					if(enemies[k].alive){
						for(j=0;j<enemies[k].trail.length-2;++j){
							x3=enemies[k].trail[j].x; y3=enemies[k].trail[j].y; x4=enemies[k].trail[j+1].x; y4=enemies[k].trail[j+1].y;
							if(intersects(x1,y1,x2,y2,x3,y3,x4,y4)){
								if(enemies[i].alive)splode();
								enemies[i].alive=false;
							}
							dx1=x3; dy1=y3; dx2=x4; dy2=y4; dx3=x1; dy3=y1;
							d=(dx2-dx1)*(dx2-dx1)+(dy2-dy1)*(dy2-dy1);
							u=((dx3-dx1)*(dx2-dx1)+(dy3-dy1)*(dy2-dy1))/d;
							x=dx1+u*(dx2-dx1); y=dy1+u*(dy2-dy1);
							d=Math.sqrt((x-dx3)*(x-dx3)+(y-dy3)*(y-dy3));
							if(u>0&&u<1&&d<10){
								if(enemies[i].alive)splode();
								enemies[i].alive=false;								
							}
							for(m=0;m<4;++m){
								switch(m){
									case 0: x2b=x1b; y2b=y1b-cy*2; break;
									case 1: x2b=x1b+cx*2; y2b=y1b; break;
									case 2: x2b=x1b; y2b=y1b+cy*2; break;
									case 3: x2b=x1b-cx*2; y2b=y1b; break;
								}
								if(intersects(x1b,y1b,x2b,y2b,x3,y3,x4,y4)){
									x=x1b+ua*(x2b-x1b);
									y=y1b+ua*(y2b-y1b);
									d=Math.sqrt((x-x1b)*(x-x1b)+(y-y1b)*(y-y1b));
									if(d<enemies[i].dists[m]) enemies[i].dists[m]=d;
								}
							}
						}
					}
				}
				for(j=0;j<playerTrail.length-1;++j){
					x3=playerTrail[j].x; y3=playerTrail[j].y; x4=playerTrail[j+1].x; y4=playerTrail[j+1].y;
					if(intersects(x1,y1,x2,y2,x3,y3,x4,y4)){
						if(enemies[i].alive)splode();
						enemies[i].alive=false;
					}
					dx1=x3; dy1=y3; dx2=x4; dy2=y4; dx3=x1; dy3=y1;
					d=(dx2-dx1)*(dx2-dx1)+(dy2-dy1)*(dy2-dy1);
					u=((dx3-dx1)*(dx2-dx1)+(dy3-dy1)*(dy2-dy1))/d;
					x=dx1+u*(dx2-dx1); y=dy1+u*(dy2-dy1);
					d=Math.sqrt((x-dx3)*(x-dx3)+(y-dy3)*(y-dy3));
					if(u>0&&u<1&&d<10){
						if(enemies[i].alive)splode();
						enemies[i].alive=false;								
					}
					for(m=0;m<4;++m){
						switch(m){
							case 0: x2b=x1b; y2b=y1b-cy*2; break;
							case 1: x2b=x1b+cx*2; y2b=y1b; break;
							case 2: x2b=x1b; y2b=y1b+cy*2; break;
							case 3: x2b=x1b-cx*2; y2b=y1b; break;
						}
						if(intersects(x1b,y1b,x2b,y2b,x3,y3,x4,y4)){
							x=x1b+ua*(x2b-x1b);
							y=y1b+ua*(y2b-y1b);
							d=Math.sqrt((x-x1b)*(x-x1b)+(y-y1b)*(y-y1b));
							if(d<enemies[i].dists[m]) enemies[i].dists[m]=d;
						}
					}
				}
				if(point.x>cx*2||point.x<0||point.y>cy*2||point.y<0){
					if(enemies[i].alive)splode();
					enemies[i].alive=false;
				}
				if(!victoryScreenAlpha){
					if(enemies[i].theta==0) enemies[i].dists[0]=0;
					if(enemies[i].theta==pi/2) enemies[i].dists[3]=0;
					if(enemies[i].theta==pi) enemies[i].dists[2]=0;
					if(enemies[i].theta==pi*1.5) enemies[i].dists[1]=0;
					if(enemies[i].turnTimer<frames){
						enemies[i].turnTimer=frames+enemyTurnInterval;
						enemies[i].oldTheta=enemies[i].theta;
						if(enemies[i].dists[0]>=enemies[i].dists[1] &&
						   enemies[i].dists[0]>=enemies[i].dists[2] &&
						   enemies[i].dists[0]>=enemies[i].dists[3] &&
						   enemies[i].theta!=pi) enemies[i].theta=pi;
						if(enemies[i].dists[1]>=enemies[i].dists[0] &&
						   enemies[i].dists[1]>=enemies[i].dists[2] &&
						   enemies[i].dists[1]>=enemies[i].dists[3] &&
						   enemies[i].theta!=pi*1.5) enemies[i].theta=pi/2;
						if(enemies[i].dists[2]>=enemies[i].dists[0] &&
						   enemies[i].dists[2]>=enemies[i].dists[1] &&
						   enemies[i].dists[2]>=enemies[i].dists[3] &&
						   enemies[i].theta!=0) enemies[i].theta=0;
						if(enemies[i].dists[3]>=enemies[i].dists[0] &&
						   enemies[i].dists[3]>=enemies[i].dists[1] &&
						   enemies[i].dists[3]>=enemies[i].dists[2] &&
						   enemies[i].theta!=pi/2) enemies[i].theta=pi*1.5;
					}
					if(enemies[i].oldTheta!=enemies[i].theta){
						enemies[i].trail.push(point);
					}else{
						enemies[i].trail[enemies[i].trail.length-1].x=point.x;
						enemies[i].trail[enemies[i].trail.length-1].y=point.y;
					}
					/*
					ctx.fillStyle="#fff";
					ctx.fillRect(enemies[i].trail[enemies[i].trail.length-1].x-10,enemies[i].trail[enemies[i].trail.length-1].y-enemies[i].dists[0]-10,20,20);
					ctx.fillRect(enemies[i].trail[enemies[i].trail.length-1].x+enemies[i].dists[1]-10,enemies[i].trail[enemies[i].trail.length-1].y-10,20,20);
					ctx.fillRect(enemies[i].trail[enemies[i].trail.length-1].x-10,enemies[i].trail[enemies[i].trail.length-1].y+enemies[i].dists[2]-10,20,20);
					ctx.fillRect(enemies[i].trail[enemies[i].trail.length-1].x-enemies[i].dists[3]-10,enemies[i].trail[enemies[i].trail.length-1].y-10,20,20);
					*/
				}
				if(enemies[i].alive)enemiesAlive++;
			}
		}
	}
	if(!enemiesAlive){
		victoryScreenAlpha=.05;
		victoryUp=true;		
	}
}

function drawRotatedImage(image, x, y, width, height, angle) { 

	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.drawImage(image, -width/2, -height/2, width, height);
	ctx.restore();
}

function addCommas(intNum) {

  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function draw(){
	
	ctx.clearRect(0,0,cx*2,cy*2);
	
	ctx.strokeStyle="#0f8";
	for(i=0;i<=32;++i){
		ctx.lineWidth=10;
		ctx.globalAlpha=.08;
		ctx.beginPath();
		ctx.moveTo(i*size,0);
		ctx.lineTo(i*size,cy*2);
		ctx.stroke();
		ctx.lineWidth=2;
		ctx.globalAlpha=.16;
		ctx.beginPath();
		ctx.moveTo(i*size,0);
		ctx.lineTo(i*size,cy*2);
		ctx.stroke();
	}
	for(i=0;i<=18;++i){
		ctx.lineWidth=10;
		ctx.globalAlpha=.08;
		ctx.beginPath();
		ctx.moveTo(0,i*size);
		ctx.lineTo(cx*2,i*size);
		ctx.stroke();
		ctx.lineWidth=2;
		ctx.globalAlpha=.16;
		ctx.beginPath();
		ctx.moveTo(0,i*size);
		ctx.lineTo(cx*2,i*size);
		ctx.stroke();
	}
	ctx.globalAlpha=1;
	ctx.lineWidth=5;
	ctx.beginPath();
	ctx.strokeStyle="#4ff";
	ctx.moveTo(playerTrail[0].x,playerTrail[0].y);
	for(i=1;i<playerTrail.length;++i) ctx.lineTo(playerTrail[i].x,playerTrail[i].y);
	ctx.stroke();
	
	if(alive){
		drawRotatedImage(bike_green,playerTrail[playerTrail.length-1].x,playerTrail[playerTrail.length-1].y,bike_green.width/10,bike_green.height/10,theta);
	}else{
		ctx.drawImage(splodePic,playerTrail[playerTrail.length-1].x-splosionRadius/2,playerTrail[playerTrail.length-1].y-splosionRadius/2,splosionRadius,splosionRadius);
		if(splosionRadius<10000)splosionRadius+=100;
	}
	for(i=0;i<enemies.length;++i){
		ctx.lineWidth=5;
		ctx.beginPath();
		ctx.strokeStyle="#fa2";
		ctx.globalAlpha=enemies[i].alpha;
		ctx.moveTo(enemies[i].trail[0].x,enemies[i].trail[0].y);
		for(j=1;j<enemies[i].trail.length;++j) ctx.lineTo(enemies[i].trail[j].x,enemies[i].trail[j].y);
		ctx.stroke();
		if(enemies[i].alive){
			drawRotatedImage(bike_orange,enemies[i].trail[enemies[i].trail.length-1].x,enemies[i].trail[enemies[i].trail.length-1].y,bike_orange.width/10,bike_orange.height/10,enemies[i].theta);
		}else{
			ctx.globalAlpha=enemies[i].splosionAlpha;
			ctx.drawImage(splodePic,enemies[i].trail[enemies[i].trail.length-1].x-enemies[i].splosionRadius/2,enemies[i].trail[enemies[i].trail.length-1].y-enemies[i].splosionRadius/2,enemies[i].splosionRadius,enemies[i].splosionRadius);
			enemies[i].alpha=0;
			if(enemies[i].splosionRadius<20000){
				enemies[i].splosionRadius+=100;
				if(enemies[i].splosionAlpha>0)enemies[i].splosionAlpha-=.01;
			}else{
				enemies.splice(i,1);
			}
		}
	}
	
	ctx.globalAlpha=.5;
	ctx.fillStyle="#8ff";
	ctx.font="80px tahoma";
	ctx.fillText("Level:"+level,10,80);

	
	if(introScreenAlpha){
		ctx.globalAlpha=introScreenAlpha;
		ctx.drawImage(startScreen,0,0,cx*2,cy*2);
		ctx.fillStyle="#0a8";
		ctx.strokeStyle="#fff";
		ctx.lineWidth=2;
		ctx.font="80px tahoma";
		ctx.fillText("HIT ENTER",cx+230,cy-125);
		ctx.strokeText("HIT ENTER",cx+230,cy-125);
		ctx.lineWidth=1;
		ctx.font="36px tahoma";
		ctx.fillStyle="#fff";
		ctx.strokeStyle="#fff";
		ctx.fillText("PROGRAMMING &",20,180);
		ctx.strokeText("PROGRAMMING &",20,180);
		ctx.fillText("MUSIC: cantelope",20,215);
		ctx.strokeText("MUSIC: cantelope",20,215);
		ctx.fillStyle="#00f";
		ctx.strokeStyle="#fff";
		ctx.fillText("http://cantelope.org",20,250);
		ctx.strokeText("http://cantelope.org",20,250);
	}
	if(deathScreenAlpha){
		ctx.globalAlpha=deathScreenAlpha;
		ctx.drawImage(deathScreen,0,0,cx*2,cy*2);
		ctx.fillStyle="#f44";
		ctx.strokeStyle="#fff";
		ctx.font="46px tahoma";
		ctx.lineWidth=1;
		ctx.fillText("HIT THE SPACEBAR",cx-210,cy-150);
		ctx.strokeText("HIT THE SPACEBAR",cx-210,cy-150);
		if(spacekey){
			score=0;
			loadLevel(false);
		}
	}
	if(victoryScreenAlpha){
		ctx.globalAlpha=victoryScreenAlpha;
		ctx.drawImage(victoryScreen,0,0,cx*2,cy*2);
		ctx.fillStyle="#0ff";
		ctx.strokeStyle="#000";
		if(level<7){
			ctx.font="52px tahoma";
			ctx.lineWidth=1;
			ctx.fillText("HIT THE SPACEBAR",cx-210,cy-150);
			ctx.strokeText("HIT THE SPACEBAR",cx-210,cy-150);
		}else{
			ctx.font="52px tahoma";
			ctx.lineWidth=1;
			ctx.fillText("*** GAME OVER ***",cx-230,cy-150);
			ctx.strokeText("*** GAME OVER ***",cx-230,cy-150);
		}
	}
}

function frame(){

	frames++;
	if(frames>10000000)frames=0;
	draw();
	if(introScreenAlpha){
		if(introScreenAlpha==1&&enterkey)introScreenAlpha-=.05;
		if(introScreenAlpha<1) introScreenAlpha-=.05;
		if(introScreenAlpha<=0)introScreenAlpha=0;
	}else{
		if(victoryScreenAlpha){
			if(victoryScreenAlpha<1){
				victoryScreenAlpha+=.02*(victoryUp?1:-5);
				if(victoryScreenAlpha>1)victoryScreenAlpha=1;
				if(victoryScreenAlpha<0)victoryScreenAlpha=0;
				if(victoryScreenAlpha && spacekey){
					level++;
					if(level<7){
						loadLevel(false);
						victoryScreenAlpha=0;
						victoryUp=false;
					}
				}
			}else{
				if(spacekey){
					//level++;
					if(level<7){
						loadLevel(false);
						victoryScreenAlpha=.95;
						victoryUp=false;
					}
				}
			}
		}else{
			if(alive){
				doLogic();
			}else{
				if(deathScreenAlpha<1){
					deathScreenAlpha+=.01;
				}else{
					deathScreenAlpha=1;
				}
			}			
		}
	}
}

function kickoff(){
	
	loadLevel(true);
	clearInterval(loadTimer);
	$("body").css("background","#000");
	$("#canvas").show();
	introScreenAlpha=1;
	draw();
	$("#loadingOuter").hide();
	soundtrack.src="bigness.mp3";
	soundtrack.volume=.1;
	soundtrack.play();
	setInterval(frame,30);
}

function load(){

	$("#loading").html("LOADING");
	for(i=0;i<frames%4;++i) $("#loading").html($("#loading").html()+".");
	frames++;
}

initVars();
loadTimer=setInterval(load,100);
$(window).load(function(){
	kickoff();
});