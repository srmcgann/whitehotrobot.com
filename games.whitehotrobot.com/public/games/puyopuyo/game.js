function initVars(){

	pi=Math.PI;
	canvas=$("#canvas")[0];
	ctx=canvas.getContext("2d");
	puyoA = new Image();
	puyoA.src="puyoA.png";
	puyoB = new Image();
	puyoB.src="puyoB.png";
	puyoC = new Image();
	puyoC.src="puyoC.png";
	puyoD = new Image();
	puyoD.src="puyoD.png";
	puyoE = new Image();
	puyoE.src="puyoE.png";
	leftArrow = new Image();
	leftArrow.src="leftArrow.png";
	rightArrow = new Image();
	rightArrow.src="rightArrow.png";
	ctx.font = '68px Square721';
	canvas.width=1360;
	canvas.height=768;
	cx=canvas.width/2;
	cy=canvas.height/2;
	leftkey=rightkey=upkey=downkey=spacekey=0;
	moveTimer=0;moveInterval=5,moveDownTimer=0,moveDownInterval=1,rotateTimer=0,rotateInterval=10;
	dropTimer=25;dropInterval=30;
	settling=false, deletePending=false, collapsing=0, deleteGrid=emptyGrid(), offsetGrid=emptyGrid();
	width=cx/2;
	height=width*2;
	pieces = new Array();
	ojamas = new Array();
	ojamaDropSpeed=height/12/2;
	deletions=0;
	box = emptyGrid();
	frames = 0;
	ctx.clearRect(0,0,cx*2,cy*2);
	x=cx/8; y=cy/8;
	gameover=false;
}

function drawRules(){
	
	for(i=25;i>0;--i){
		ctx.globalAlpha=.5/i;
		size=i;
		ctx.fillStyle="#fff";
		ctx.fillRect(x-size,y,size,height);
		ctx.fillRect(x+width,y,size,height);
		ctx.fillRect(x-size,y+height,width+size*2,size);
		ctx.fillRect(x-size,y-size,width+size*2,size);
	}
	x=cx*2-cx/2-cx/8; y=cy/8;
	for(i=25;i>0;--i){
		ctx.globalAlpha=.5/i;
		size=i;
		ctx.fillStyle="#fff";
		ctx.fillRect(x-size,y,size,height);
		ctx.fillRect(x+width,y,size,height);
		ctx.fillRect(x-size,y+height,width+size*2,size);
		ctx.fillRect(x-size,y-size,width+size*2,size);
	}
	ctx.globalAlpha=1;
	ctx.fillStyle = "#0f8";
	ctx.strokeStyle = "#006";
	ctx.font = '100 42px Square721';
	ctx.lineWidth=1;
	ctx.fillText("Connect 4 or more",cx-225,cy-300);
	ctx.strokeText("Connect 4 or more",cx-225,cy-300);
	ctx.fillText("puyos of the same ",cx-225,cy-250);
	ctx.strokeText("puyos of the same",cx-225,cy-250);
	ctx.fillText("color to make a",cx-225,cy-200);
	ctx.strokeText("color to make a",cx-225,cy-200);
	ctx.fillText("rensa.",cx-225,cy-150);
	ctx.strokeText("rensa.",cx-225,cy-150);
	ctx.fillText("With each rensa, your",cx-225,cy+200);
	ctx.strokeText("With each rensa, your",cx-225,cy+200);
	ctx.fillText("opponent is buried",cx-225,cy+250);
	ctx.strokeText("opponent is buried",cx-225,cy+250);
	ctx.fillText("under ojama (clutter).",cx-225,cy+300);
	ctx.strokeText("under ojama (clutter).",cx-225,cy+300);
	
	ctx.drawImage(leftArrow,cx-250,cy-120);
	ctx.fillStyle = "#ff8";
	ctx.strokeStyle = "#000";
	ctx.font = '100 72px Square721';
	ctx.lineWidth=2;
	ctx.fillText("YOU",cx-125,cy-31);
	ctx.strokeText("YOU",cx-125,cy-31);

	ctx.drawImage(rightArrow,cx+115,cy+25);
	ctx.fillStyle = "#8ff";
	ctx.strokeStyle = "#000";
	ctx.font = '100 72px Square721';
	ctx.lineWidth=2;
	ctx.fillText("CPU",cx-25,cy+115);
	ctx.strokeText("CPU",cx-25,cy+115);
	$("#pauseButton").blur();
	$("#pauseButton").show();
}

function spawnPieces(){

	if(box[2][1]){
		gameover=1;
		$("#pauseButton").hide();
	}else{
		for(i=1;i<3;++i){
			piece=new Object();
			piece.x=cx/8+width/6*2;
			piece.y=cy/8-i*height/12;
			piece.ix=piece.x;
			piece.iy=piece.y;
			switch(parseInt(Math.random()*4)){
				case 0: piece.img=puyoA; break;
				case 1: piece.img=puyoB; break;
				case 2: piece.img=puyoC; break;
				case 3: piece.img=puyoD; break;
			}
			pieces.push(piece);
		}
	}
}

function clearLeft(){
	
	if(pieces[0].bx>0 && pieces[1].bx>0 && box[pieces[0].bx-1][pieces[0].by]==0 && box[pieces[1].bx-1][pieces[1].by]==0) return 1;
	return 0;
}

function clearRight(){
	
	if(pieces[0].bx<5 && pieces[1].bx<5 && box[pieces[0].bx+1][pieces[0].by]==0 && box[pieces[1].bx+1][pieces[1].by]==0) return 1;
	return 0;
}

function rotate(){
	
	p=Math.atan2(pieces[1].x-pieces[0].x,pieces[1].y-pieces[0].y);
	x=pieces[0].x+Math.sin(p-pi/2)*width/6;
	y=pieces[0].y+Math.cos(p-pi/2)*width/6;
	bx=Math.round((x-cx/8)/width*6);
	by=Math.round((y-cy/8)/height*12+1);
	if(bx<0 || bx>5 || by>12 || box[bx][by]) return 0;
	pieces[1].x=x;
	pieces[1].y=y;
	return 1;
}

function checkComplete(x,y,img){
	
	if(x<0 || x>5 || y<0 || y>11 || checkGrid[x][y])return;
	if(box[x][y+1]==img){
		rensa++;
		checkGrid[x][y]=1;
		checkComplete(x+1,y,img);
		checkComplete(x-1,y,img);
		checkComplete(x,y+1,img);
		checkComplete(x,y-1,img);
	}
}

function emptyGrid(){
	
	grid=new Array(6);
	for(i2=0;i2<6;++i2){
		grid[i2]=new Array(13);
		for(j2=0;j2<13;++j2)grid[i2][j2]=0;
	}
	return grid;
}

function dropCells(){
	
	if(collapsing<.9){
		if(collapsing==0){
			for(i=0;i<6;++i){
				for(j=1;j<13;++j){
					if(box[i][j])offsetGrid[i][j]=.00001;
				}
			}
		}
		collapsing+=.1;
		
		for(i=0;i<6;++i){
			for(j=1;j<13;++j){
				if(offsetGrid[i][j]==0){
					for(k=j-1;k>0;--k){
						if(offsetGrid[i][k]){
							for(k2=k;k2>0;--k2){
								if(offsetGrid[i][k2])offsetGrid[i][k2]=(j-k)*collapsing;
							}
							break;
						}
					}
				}
			}
		}
	}else{
		for(i=0;i<6;++i){
			for(j=12;j>0;--j){
				if(box[i][j]==0){
					for(k=j-1;k>0;--k){
						if(box[i][k]){
							box[i][j]=box[i][k];
							box[i][k]=0;
							break;
						}
					}
				}
			}
		}
		collapsing=0;
		deleteGrid=emptyGrid();
		offsetGrid=emptyGrid();
		deletePending=false;
	}
}

function recurseBoard(){

	deleteGrid=emptyGrid();
	for(i=0;i<6;++i){
		for(j=1;j<13;++j){
			if(box[i][j] && box[i][j]!=puyoE){
				checkGrid=emptyGrid();
				rensa=0;
				checkComplete(i,j-1,box[i][j]);
				if(rensa>3){
					for(i2=0;i2<6;++i2){
						for(j2=0;j2<12;++j2){
							if(checkGrid[i2][j2])deleteGrid[i2][j2]=2;
						}
					}
					fade=1;
					deletePending=true;
				}
			}
		}
	}
}

function syncPieces(){
	
	pieces[0].bx=Math.round((pieces[0].x-cx/8)/width*6);
	pieces[0].by=Math.round((pieces[0].y-cy/8)/height*12+1);
	pieces[1].bx=Math.round((pieces[1].x-cx/8)/width*6);
	pieces[1].by=Math.round((pieces[1].y-cy/8)/height*12+1);
}

function doOjamas(){
	
	ctx.globalAlpha=1;
	for(i=0;i<ojamas.length;++i){
		x=ojamas[i].x;
		y=ojamas[i].y;
		if(y<cy/8){
			y2=cy/8-y;
			ctx.drawImage(ojamas[i].img,0,y2,55,55,x,cy/8,55,55);
		}else{
			ctx.drawImage(ojamas[i].img,x,y);
		}
		ojamas[i].bx=Math.round((ojamas[i].x-cx/8)/width*6);
		ojamas[i].by=Math.round((ojamas[i].y-cy/8)/height*12+1);
		if(ojamas[i].by<0)ojamas[i].by=0;
		if(ojamas[i].by<12 && box[ojamas[i].bx][ojamas[i].by+1]==0){
			ojamas[i].y+=ojamaDropSpeed;
		}else{
			box[ojamas[i].bx][ojamas[i].by]=ojamas[i].img;
			ojamas.splice(i,1);
		}
	}
}

function sendOjamas(){
	
	for(i=0;i<(deletions/4)*(1+deletions/6)*(1+deletions/8)-2;++i){
		piece=new Object();
		y=AIy-parseInt(AIojamas.length/6+1)*height/12;
		do{
			x=AIx+width/6*(parseInt(Math.random()*6));
			empty=1;
			for(j=0;j<AIojamas.length;++j)if(AIojamas[j].x==x && AIojamas[j].y==y)empty=0;			
		}while(!empty);
		piece.x=x;
		piece.y=y;
		piece.ix=piece.x;
		piece.iy=piece.y;
		piece.img=puyoE;
		AIojamas.push(piece);
	}
}

function doLogic(){
	
	if(pieces.length){
		deletions=0;
		pieces[0].ix=pieces[0].ix+(pieces[0].x-pieces[0].ix)/3;
		pieces[0].iy=pieces[0].iy+(pieces[0].y-pieces[0].iy)/3;
		pieces[1].ix=pieces[1].ix+(pieces[1].x-pieces[1].ix)/3;
		pieces[1].iy=pieces[1].iy+(pieces[1].y-pieces[1].iy)/3;
		syncPieces();
		if(!settling){
			if(leftkey && moveTimer<frames && clearLeft()){
				moveTimer=frames+moveInterval;
				pieces[0].x-=width/6;
				pieces[1].x-=width/6;
			}
			if(rightkey && moveTimer<frames && clearRight()){
				moveTimer=frames+moveInterval;
				pieces[0].x+=width/6;
				pieces[1].x+=width/6;
			}
			if(upkey && rotateTimer<frames && rotate()){
				rotateTimer=frames+rotateInterval;
			}
			syncPieces();
			if(downkey && moveDownTimer<frames){
				moveDownTimer=frames+moveDownInterval;
				if(pieces[0].by<12 && pieces[1].by<12 && 
				   box[pieces[0].bx][pieces[0].by+1]==0 &&
				   box[pieces[1].bx][pieces[1].by+1]==0){
					pieces[0].y+=height/12;
					pieces[1].y+=height/12;
					dropTimer=frames+dropInterval;
				}else{
					settling=true;
				}
			}
			if(dropTimer<frames){
				if(pieces[0].by<12 && pieces[1].by<12 &&
				   box[pieces[0].bx][pieces[0].by+1]==0 &&
				   box[pieces[1].bx][pieces[1].by+1]==0){
					pieces[0].y+=height/12;
					pieces[1].y+=height/12;
					dropTimer=frames+dropInterval;
				}else{
					settling=true;
				}
			}
		}else{
			if(pieces[0].by==pieces[1].by){
				pieces[0].y=cy/8+height-height/12;
				pieces[1].y=cy/8+height-height/12;
				for(i=12;i>=0;--i){
					if(box[pieces[0].bx][i+1])pieces[0].y=cy/8+(i-1)*height/12;
					if(box[pieces[1].bx][i+1])pieces[1].y=cy/8+(i-1)*height/12;
				}
			}
			if(Math.abs(pieces[0].y-pieces[0].iy)<5 && Math.abs(pieces[1].y-pieces[1].iy)<5){
				box[pieces[0].bx][pieces[0].by]=pieces[0].img;
				box[pieces[1].bx][pieces[1].by]=pieces[1].img;
				recurseBoard();
				pieces.splice(0,1);
				pieces.splice(0,1);
			}
		}
	}else{
		if(deletePending){
			if(fade>.1){
				fade-=.1;
			}else{
				if(collapsing==0){
					for(i=0;i<6;++i){
						for(j=0;j<12;++j){
							if(deleteGrid[i][j]){
								deletions++;
								box[i][j+1]=0;
								if(i>0&&box[i-1][j+1]==puyoE)box[i-1][j+1]=0;
								if(i<5&&box[i+1][j+1]==puyoE)box[i+1][j+1]=0;
								if(j<11&&box[i][j+2]==puyoE)box[i][j+2]=0;
								if(box[i][j]==puyoE)box[i][j]=0;
							}
						}
					}
				}
				dropCells();
				recurseBoard();
			}
		}else{
			if(ojamas.length){
				doOjamas();
			}else{
				if(deletions)sendOjamas();
				spawnPieces();
				settling=false;				
			}
		}
	}
}


function drawContainers(){
	
	x=cx/8; y=cy/8;
	ctx.globalAlpha=.8;
	ctx.fillStyle="#001";
	ctx.fillRect(x,y,width,height);
	ctx.globalAlpha=.1;
	ctx.lineWidth=2;
	ctx.strokeStyle="#fff";
	ctx.beginPath();
	for(i=0;i<12;++i){
		ctx.moveTo(x,y+height/12*i);
		ctx.lineTo(x+width,y+height/12*i);
	}
	for(i=0;i<6;++i){
		ctx.moveTo(x+width/6*i,y);
		ctx.lineTo(x+width/6*i,y+height);
	}
	ctx.stroke();
	ctx.closePath();
	
	x=cx*2-cx/2-cx/8; y=cy/8;
	ctx.globalAlpha=.8;
	ctx.fillStyle="#001";
	ctx.fillRect(x,y,width,height);
	ctx.globalAlpha=.1;
	ctx.lineWidth=2;
	ctx.strokeStyle="#fff";
	ctx.beginPath();
	for(i=0;i<12;++i){
		ctx.moveTo(x,y+height/12*i);
		ctx.lineTo(x+width,y+height/12*i);
	}
	for(i=0;i<6;++i){
		ctx.moveTo(x+width/6*i,y);
		ctx.lineTo(x+width/6*i,y+height);
	}
	ctx.stroke();
	ctx.closePath();
}

function drawPieces(){
	
	ctx.globalAlpha=1;
	for(i=0;i<pieces.length;++i){
		x=pieces[i].ix;
		y=pieces[i].iy;
		if(y<cy/8){
			y2=cy/8-y;
			ctx.drawImage(pieces[i].img,0,y2,55,55,x,cy/8,55,55);
		}else{
			ctx.drawImage(pieces[i].img,x,y);
		}
	}
}

function drawBoards(){
	
	for(i=0;i<6;++i){
		for(j=1;j<13;++j){
			if(deleteGrid[i][j-1]){
				ctx.globalAlpha=fade;
			}else{
				ctx.globalAlpha=1;
			}
			if(box[i][j]) ctx.drawImage(box[i][j],cx/8+width/6*i,cy/8+height/12*j-height/12+offsetGrid[i][j]*height/12);

			if(AIdeleteGrid[i][j-1]){
				ctx.globalAlpha=AIfade;
			}else{
				ctx.globalAlpha=1;
			}
			if(AIbox[i][j]) ctx.drawImage(AIbox[i][j],AIx+width/6*i,AIy+height/12*j-height/12+AIoffsetGrid[i][j]*height/12);
		}
	}
}

function draw(){
	
	x=cx/8; y=cy/8;
	ctx.clearRect(x,y,width,height);
	x=cx*2-cx/2-cx/8; y=cy/8;
	ctx.clearRect(x,y,width,height);

	drawContainers();
	drawBoards();
	drawPieces();
	AIdrawAIpieces();
}

window.addEventListener("keydown", function(e){

	chr=e.keyCode || e.charCode;
	switch(chr){
		case 37:leftkey=1;break;
		case 38:upkey=1;break;
		case 39:rightkey=1;break;
		case 40:downkey=1;break;
		case 32:spacekey=1;break;
	}
});

window.addEventListener("keyup", function(e){

	chr=e.keyCode || e.charCode;
	switch(chr){
		case 37:leftkey=0;moveTimer=0;break;
		case 38:upkey=0;rotateTimer=0;break;
		case 39:rightkey=0;moveTimer=0;break;
		case 40:downkey=0;break;
		case 32:spacekey=0;break;
	}
});

function AIinitVars(){

	AIleftkey=AIrightkey=AIupkey=AIdownkey=0;
	AImoveTimer=0, AImoveDownTimer=0, AIrotateTimer=0;
	AIdropTimer=30;
	AImoveInterval=10,AImoveDownInterval=1,AIrotateInterval=5,AIdropInterval=25;
	AIsettling=false, AIdeletePending=false, AIcollapsing=0, AIdeleteGrid=emptyGrid(), AIoffsetGrid=emptyGrid();
	AIpieces = new Array();
	AIojamas = new Array();
	AIdeletions=0;
	AIbox = emptyGrid();
	AIx=cx*2-cx/2-cx/8;
	AIy=cy/8;
}

function spawnAIpieces(){

	if(AIbox[2][1]){
		gameover=2;
		$("#pauseButton").hide();
	}else{
		for(i=0;i<2;++i){
			piece=new Object();
			piece.x=AIx+width/6*2;
			piece.y=AIy-i*height/12;
			piece.ix=piece.x;
			piece.iy=piece.y;
			switch(parseInt(Math.random()*4)){
				case 0: piece.img=puyoA; break;
				case 1: piece.img=puyoB; break;
				case 2: piece.img=puyoC; break;
				case 3: piece.img=puyoD; break;
			}
			AIpieces.push(piece);
		}
			
		gridAnalysis=emptyGrid();
		for(i=0;i<6;++i){
			for(j=1;j<13;++j){
				gridAnalysis[i][j]=new Array();
				if(!AIbox[i][j]){
					if(i>0 && AIbox[i-1][j]) gridAnalysis[i][j].push(AIbox[i-1][j]);
					if(i<5 && AIbox[i+1][j]) gridAnalysis[i][j].push(AIbox[i+1][j]);
					if(j<12 && AIbox[i][j+1]) gridAnalysis[i][j].push(AIbox[i][j+1]);
				}
			}
		}
		target=new Array(4);
		for(i=0;i<4;++i){
			target[i]=new Array(6);
			for(j=0;j<6;++j)target[i][j]=0;
		}
		for(i=0;i<4;++i){
			switch(i){
				case 0:
					for(j=0;j<6;++j){
						k=0;while(k<12 && !AIbox[j][k+1])k++;
						for(m=0;m<gridAnalysis[j][k].length;++m){
							if(gridAnalysis[j][k][m]==AIpieces[0].img) target[i][j]++;
							if(gridAnalysis[j][k-1][m]==AIpieces[1].img) target[i][j]++;
						}
					}
				break;
				case 1:
					for(j=0;j<5;++j){
						k=0;while(k<12 && !AIbox[j][k+1])k++;
						for(m=0;m<gridAnalysis[j][k].length;++m){
							if(gridAnalysis[j][k][m]==AIpieces[0].img) target[i][j]++;
						}
						k=0;while(k<12 && !AIbox[j+1][k+1])k++;
						for(m=0;m<gridAnalysis[j+1][k].length;++m){
							if(gridAnalysis[j+1][k][m]==AIpieces[1].img) target[i][j]++;
						}
					}
				break;
				case 2:
					for(j=0;j<6;++j){
						k=0;while(k<12 && !AIbox[j][k+1])k++;
						for(m=0;m<gridAnalysis[j][k].length;++m){
							if(gridAnalysis[j][k][m]==AIpieces[1].img) target[i][j]++;
							if(gridAnalysis[j][k-1][m]==AIpieces[0].img) target[i][j]++;
						}
					}
				break;
				case 3:
					for(j=1;j<6;++j){
						k=0;while(k<12 && !AIbox[j][k+1])k++;
						for(m=0;m<gridAnalysis[j][k].length;++m){
							if(gridAnalysis[j][k][m]==AIpieces[0].img) target[i][j]++;
						}
						k=0;while(k<12 && !AIbox[j-1][k+1])k++;
						for(m=0;m<gridAnalysis[j-1][k].length;++m){
							if(gridAnalysis[j-1][k][m]==AIpieces[1].img) target[i][j]++;
						}
					}
				break;			
			}
		}
			
		t=0;
		for(i=0;i<4;++i){
			for(j=0;j<6;++j){
				if(t<target[i][j]){
					t=target[i][j];
					targetR=i;
					targetX=j;
				}
			}
		}
		if(!t){
			targetR=parseInt(Math.random()*4);
			targetX=parseInt(Math.random()*6);
		}
		rotationCounter=0;
	}
}

function AIclearLeft(){
	
	if(AIpieces[0].bx>0 && AIpieces[1].bx>0 && AIbox[AIpieces[0].bx-1][AIpieces[0].by]==0 && AIbox[AIpieces[1].bx-1][AIpieces[1].by]==0) return 1;
	return 0;
}

function AIclearRight(){
	
	if(AIpieces[0].bx<5 && AIpieces[1].bx<5 && AIbox[AIpieces[0].bx+1][AIpieces[0].by]==0 && AIbox[AIpieces[1].bx+1][AIpieces[1].by]==0) return 1;
	return 0;
}

function AIrotate(){
	
	p=Math.atan2(AIpieces[1].x-AIpieces[0].x,AIpieces[1].y-AIpieces[0].y);
	x=AIpieces[0].x+Math.sin(p-pi/2)*width/6;
	y=AIpieces[0].y+Math.cos(p-pi/2)*width/6;
	bx=Math.round((x-AIx)/width*6);
	by=Math.round((y-AIy)/height*12+1);
	if(bx<0 || bx>5 || by>12 || AIbox[bx][by]) return 0;
	AIpieces[1].x=x;
	AIpieces[1].y=y;
	return 1;
}

function AIcheckComplete(x,y,img){
	
	if(x<0 || x>5 || y<0 || y>11 || AIcheckGrid[x][y])return;
	if(AIbox[x][y+1]==img){
		rensa++;
		AIcheckGrid[x][y]=1;
		AIcheckComplete(x+1,y,img);
		AIcheckComplete(x-1,y,img);
		AIcheckComplete(x,y+1,img);
		AIcheckComplete(x,y-1,img);
	}
}

function AIdropCells(){
	
	if(AIcollapsing<.9){
		if(AIcollapsing==0){
			for(i=0;i<6;++i){
				for(j=1;j<13;++j){
					if(AIbox[i][j])AIoffsetGrid[i][j]=.00001;
				}
			}
		}
		AIcollapsing+=.1;
		
		for(i=0;i<6;++i){
			for(j=1;j<13;++j){
				if(AIoffsetGrid[i][j]==0){
					for(k=j-1;k>0;--k){
						if(AIoffsetGrid[i][k]){
							for(k2=k;k2>0;--k2){
								if(AIoffsetGrid[i][k2])AIoffsetGrid[i][k2]=(j-k)*AIcollapsing;
							}
							break;
						}
					}
				}
			}
		}
	}else{
		for(i=0;i<6;++i){
			for(j=12;j>0;--j){
				if(AIbox[i][j]==0){
					for(k=j-1;k>0;--k){
						if(AIbox[i][k]){
							AIbox[i][j]=AIbox[i][k];
							AIbox[i][k]=0;
							break;
						}
					}
				}
			}
		}
		AIcollapsing=0;
		AIdeleteGrid=emptyGrid();
		AIoffsetGrid=emptyGrid();
		AIdeletePending=false;
	}
}

function AIrecurseBoard(){

	AIdeleteGrid=emptyGrid();
	for(i=0;i<6;++i){
		for(j=1;j<13;++j){
			if(AIbox[i][j] && AIbox[i][j]!=puyoE){
				AIcheckGrid=emptyGrid();
				rensa=0;
				AIcheckComplete(i,j-1,AIbox[i][j]);
				if(rensa>3){
					for(i2=0;i2<6;++i2){
						for(j2=0;j2<12;++j2){
							if(AIcheckGrid[i2][j2])AIdeleteGrid[i2][j2]=2;
						}
					}
					AIfade=1;
					AIdeletePending=true;
				}
			}
		}
	}
}

function AIsyncPieces(){
	AIpieces[0].bx=Math.round((AIpieces[0].x-AIx)/width*6);
	AIpieces[0].by=Math.round((AIpieces[0].y-AIy)/height*12+1);
	AIpieces[1].bx=Math.round((AIpieces[1].x-AIx)/width*6);
	AIpieces[1].by=Math.round((AIpieces[1].y-AIy)/height*12+1);	
}

function AIdoOjamas(){
	
	ctx.globalAlpha=1;
	for(i=0;i<AIojamas.length;++i){
		x=AIojamas[i].x;
		y=AIojamas[i].y;
		if(y<AIy){
			y2=AIy-y;
			ctx.drawImage(AIojamas[i].img,0,y2,55,55,x,AIy,55,55);
		}else{
			ctx.drawImage(AIojamas[i].img,x,y);
		}
		AIojamas[i].bx=Math.round((AIojamas[i].x-AIx)/width*6);
		AIojamas[i].by=Math.round((AIojamas[i].y-AIy)/height*12+1);
		if(AIojamas[i].by<0)AIojamas[i].by=0;
		if(AIojamas[i].by<12 && AIbox[AIojamas[i].bx][AIojamas[i].by+1]==0){
			AIojamas[i].y+=ojamaDropSpeed;
		}else{
			AIbox[AIojamas[i].bx][AIojamas[i].by]=AIojamas[i].img;
			AIojamas.splice(i,1);
		}
	}
}

function AIsendOjamas(){
	
	for(i=0;i<(AIdeletions/4)*(1+AIdeletions/6)*(1+AIdeletions/8)-2;++i){
		piece=new Object();
		y=cy/8-parseInt(ojamas.length/6+1)*height/12;
		do{
			x=cx/8+width/6*(parseInt(Math.random()*6));
			empty=1;
			for(j=0;j<ojamas.length;++j)if(ojamas[j].x==x && ojamas[j].y==y)empty=0;			
		}while(!empty);
		piece.x=x;
		piece.y=y;
		piece.ix=piece.x;
		piece.iy=piece.y;
		piece.img=puyoE;
		ojamas.push(piece);
	}
}

function AIdoLogic(){

	if(AIpieces.length){
		AIdeletions=0;
		AIpieces[0].ix=AIpieces[0].ix+(AIpieces[0].x-AIpieces[0].ix)/3;
		AIpieces[0].iy=AIpieces[0].iy+(AIpieces[0].y-AIpieces[0].iy)/3;
		AIpieces[1].ix=AIpieces[1].ix+(AIpieces[1].x-AIpieces[1].ix)/3;
		AIpieces[1].iy=AIpieces[1].iy+(AIpieces[1].y-AIpieces[1].iy)/3;
		AIsyncPieces();
		if(AIpieces[0].bx<targetX){
			AIrightkey=true;
			AIleftkey=false;
		}
		if(AIpieces[0].bx>targetX){
			AIrightkey=false;
			AIleftkey=true;
		}
		if(AIpieces[0].bx==targetX){
			AIrightkey=false;
			AIleftkey=false;			
		}
		if(rotationCounter<targetR){
			AIupkey=true;
		}else{
			AIupkey=false;
		}
		if(Math.random()<.075){
			AIdownkey=true;
		}else{
			AIdownkey=false;
		}
		
		if(!AIsettling){
			if(AIleftkey && AImoveTimer<frames && AIclearLeft()){
				AImoveTimer=frames+AImoveInterval;
				AIpieces[0].x-=width/6;
				AIpieces[1].x-=width/6;
			}
			if(AIrightkey && AImoveTimer<frames && AIclearRight()){
				AImoveTimer=frames+AImoveInterval;
				AIpieces[0].x+=width/6;
				AIpieces[1].x+=width/6;
			}
			if(AIupkey && AIrotateTimer<frames && AIrotate()){
				rotationCounter++;
				AIrotateTimer=frames+AIrotateInterval;
			}
			AIsyncPieces();
			if(AIdownkey && AImoveDownTimer<frames){
				AImoveDownTimer=frames+AImoveDownInterval;
				if(AIpieces[0].by<12 && AIpieces[1].by<12 && 
				   AIbox[AIpieces[0].bx][AIpieces[0].by+1]==0 &&
				   AIbox[AIpieces[1].bx][AIpieces[1].by+1]==0){
					AIpieces[0].y+=height/12;
					AIpieces[1].y+=height/12;
					AIdropTimer=frames+AIdropInterval;
				}else{
					AIsettling=true;
				}
			}
			if(AIdropTimer<frames){
				if(AIpieces[0].by<12 && AIpieces[1].by<12 &&
				   AIbox[AIpieces[0].bx][AIpieces[0].by+1]==0 &&
				   AIbox[AIpieces[1].bx][AIpieces[1].by+1]==0){
					AIpieces[0].y+=height/12;
					AIpieces[1].y+=height/12;
					AIdropTimer=frames+AIdropInterval;
				}else{
					AIsettling=true;
				}
			}
		}else{
			if(AIpieces[0].by==AIpieces[1].by){
				AIpieces[0].y=cy/8+height-height/12;
				AIpieces[1].y=cy/8+height-height/12;
				for(i=12;i>=0;--i){
					if(AIbox[AIpieces[0].bx][i+1])AIpieces[0].y=cy/8+(i-1)*height/12;
					if(AIbox[AIpieces[1].bx][i+1])AIpieces[1].y=cy/8+(i-1)*height/12;
				}
			}
			if(Math.abs(AIpieces[0].y-AIpieces[0].iy)<5 && Math.abs(AIpieces[1].y-AIpieces[1].iy)<5){
				AIbox[AIpieces[0].bx][AIpieces[0].by]=AIpieces[0].img;
				AIbox[AIpieces[1].bx][AIpieces[1].by]=AIpieces[1].img;
				AIrecurseBoard();
				AIpieces.splice(0,1);
				AIpieces.splice(0,1);
			}
		}
	}else{
		if(AIdeletePending){
			if(AIfade>.1){
				AIfade-=.1;
			}else{
				if(AIcollapsing==0){
					for(i=0;i<6;++i){
						for(j=0;j<12;++j){
							if(AIdeleteGrid[i][j]){
								AIdeletions++;
								AIbox[i][j+1]=0;
								if(i>0&&AIbox[i-1][j+1]==puyoE)AIbox[i-1][j+1]=0;
								if(i<5&&AIbox[i+1][j+1]==puyoE)AIbox[i+1][j+1]=0;
								if(j<11&&AIbox[i][j+2]==puyoE)AIbox[i][j+2]=0;
								if(AIbox[i][j]==puyoE)AIbox[i][j]=0;
							}
						}
					}
				}
				AIdropCells();
				AIrecurseBoard();
			}
		}else{
			if(AIojamas.length){
				AIdoOjamas();
			}else{
				if(AIdeletions)AIsendOjamas();
				spawnAIpieces();
				AIsettling=false;
			}
		}
	}
}

function AIdrawAIpieces(){
	
	ctx.globalAlpha=1;
	for(i=0;i<AIpieces.length;++i){
		x=AIpieces[i].ix;
		y=AIpieces[i].iy;
		if(y<cy/8){
			y2=cy/8-y;
			ctx.drawImage(AIpieces[i].img,0,y2,55,55,x,cy/8,55,55);
		}else{
			ctx.drawImage(AIpieces[i].img,x,y);
		}
	}
}

function doGameOver(){
	
	ctx.globalAlpha=.04;
	switch(gameover){
		case 1:
			ctx.fillStyle="#300";
			ctx.fillRect(0,0,cx*2,cy*2);
			ctx.fillStyle = "#f00";
			ctx.strokeStyle = "#ff0";
			ctx.font = '200px Square721';
			ctx.fillText("YOU LOST",cx-500,cy-100);
			ctx.strokeText("YOU LOST",cx-500,cy-100);
			ctx.font = '64px Square721';
			ctx.fillText("CONTINUE?",cx-180,cy+150);
			ctx.strokeText("CONTINUE?",cx-180,cy+150);
			ctx.strokeStyle = "#f00";
			ctx.font = '32px Square721';
			ctx.strokeText("HIT THE SPACEBAR",cx-150,cy+200);
			break;
		case 2:
			ctx.fillStyle="#024";
			ctx.fillRect(0,0,cx*2,cy*2);
			ctx.fillStyle = "#0f8";
			ctx.strokeStyle = "#0f8";
			ctx.font = '200px Square721';
			ctx.fillText("YOU WON!",cx-500,cy-100);
			ctx.strokeText("YOU WON!",cx-500,cy-100);
			ctx.font = '64px Square721';
			ctx.fillText("CONTINUE?",cx-180,cy+150);
			ctx.strokeText("CONTINUE?",cx-180,cy+150);
			ctx.strokeStyle = "#0ff";
			ctx.font = '32px Square721';
			ctx.strokeText("HIT THE SPACEBAR",cx-150,cy+200);
			break;
	}
	if(spacekey){
		initVars();
		AIinitVars();
		drawRules();
	}
}

function frame(){

	frames++;
	if(!gameover){
		draw();
		if(!paused){
			doLogic();
			AIdoLogic();
		}
	}else{
		doGameOver();
	}
}

function togglePause(){
	paused=!paused;
	if(paused){
		$("#pauseScreen").show();
		$("#pauseButton").html("UNPAUSE");
	}else{
		$("#pauseScreen").hide();
		$("#pauseButton").html("PAUSE");
	}
}

function kickoff(){

	$("#loadingOuter").hide();
	drawRules();
	paused=true;
	setInterval(frame,30);
}

initVars();
AIinitVars();
setTimeout(kickoff,1000);