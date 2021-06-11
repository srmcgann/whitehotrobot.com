function initVars(){
	
	pi=Math.PI;
	canvas=$("#canvas")[0];
	ctx=canvas.getContext("2d");
	canvas.width=1360;
	canvas.height=768;
	cx=canvas.width/2;
	cy=canvas.height/2;
	leftkey=rightkey=upkey=downkey=spacekey=skey=0;
	mx=my=leftButton=rightButton=0;
	rows=9*2;
	cols=16*2;
	size=cx*2/cols;
	drawingMode=0;
	generateMap=0;
	board=new Array(cols);
	for(i=0;i<cols;++i){
		board[i]=new Array(rows);
		for(j=0;j<rows;++j)board[i][j]=1;
	}
	canvas.addEventListener("mousemove", mouse, true);
	canvas.addEventListener("mousedown", function(event) {
		switch (event.which) {
			case 1: leftButton=true; break;
			case 3: rightButton=true; break;
		}
		for(i=0;i<cols;++i){
			for(j=0;j<rows;++j){
				x=cx-cols/2*size+i*size;
				y=cy-rows/2*size+j*size;
				if(mx>=x&&my>=y&&mx<x+size&&my<y+size){
					if(board[i][j]>1){
						drawingMode=0;
					}else{
						drawingMode=board[i][j]+1;
					}
				}
			}
		}
	});
	canvas.addEventListener("mouseup", function(event) {
		switch (event.which) {
			case 1: leftButton=false; break;
			case 3: rightButton=false; break;
		}
		drawing=false;
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
		case 37:leftkey=1;break;
		case 38:upkey=1;break;
		case 39:rightkey=1;break;
		case 40:downkey=1;break;
		case 32:
			spacekey=1;
			generateMap=!generateMap;
			if(generateMap){
				$("#canvas").hide();
				$("#output").show();
				$("#output").html(JSON.stringify(board));
			}else{
				$("#canvas").show();
				$("#output").hide();
			}
			
		break;
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

function doLogic(){

}

function draw(){
	
	ctx.clearRect(0,0,cx*2,cy*2);
	ctx.strokeStyle="#fff";
	ctx.lineWidth=10;
	for(i=0;i<cols;++i){
		for(j=0;j<rows;++j){
			x=cx-cols/2*size+i*size;
			y=cy-rows/2*size+j*size;
			if(board[i][j]){
				switch(board[i][j]){
					case 1:ctx.fillStyle="#0f8";break;
					case 2:ctx.fillStyle="#ff0";break;
				}
				ctx.fillRect(x,y,size,size);
			}
			if(mx>=x&&my>=y&&mx<x+size&&my<y+size){
				if(leftButton){
					board[i][j]=drawingMode;
				}
				ctx.strokeRect(x+5,y+5,size-10,size-10);
			}
		}
	}
	ctx.strokeStyle="#666";
	ctx.lineWidth=1;
	for(i=0;i<cols;++i){
		ctx.beginPath();
		ctx.moveTo(i*size,0);
		ctx.lineTo(i*size,cy*2);
		ctx.stroke();
	}
	for(i=0;i<rows;++i){
		ctx.beginPath();
		ctx.moveTo(0,i*size);
		ctx.lineTo(cx*2,i*size);
		ctx.stroke();
	}
}

function frame(){

	if(!generateMap){
		doLogic();
		draw();
	}
}

function kickoff(){
	
	designTimer=setInterval(frame,30);
}

initVars();