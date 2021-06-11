function initVars(){

	pi=Math.PI;
	canvas=$("#canvas")[0];
	ctx=canvas.getContext("2d");
	canvas.width=1360;
	canvas.height=768;
	cx=canvas.width/2;
	cy=canvas.height/2;	
	playerX=0;
	playerY=-12;
	playerZ=0;
	pitch=.2,yaw=1;
	scale=500;
	point=new Object();
	$("#canvas").show();
}

function rasterizePoint(x,y,z){
	var p,d;
	x-=playerX;
	y-=playerY;
	z-=playerZ;
	p=Math.atan2(x,z);
	d=Math.sqrt(x*x+z*z);
	x=Math.sin(p-yaw)*d;
	z=Math.cos(p-yaw)*d;
	p=Math.atan2(y,z);
	d=Math.sqrt(y*y+z*z);
	y=Math.sin(p-pitch)*d;
	z=Math.cos(p-pitch)*d;
	var rx1=-10,ry1=1,rx2=10,ry2=1,rx3=0,ry3=0,rx4=x,ry4=z,uc=(ry4-ry3)*(rx2-rx1)-(rx4-rx3)*(ry2-ry1);
	if(!uc) return {x:0,y:0,d:-1};
	var ua=((rx4-rx3)*(ry1-ry3)-(ry4-ry3)*(rx1-rx3))/uc;
	var ub=((rx2-rx1)*(ry1-ry3)-(ry2-ry1)*(rx1-rx3))/uc;
	if(!z)z=.000000001;
	if(ua>0&&ua<1&&ub>0&&ub<1){
		return {
			x:cx+(rx1+ua*(rx2-rx1))*scale,
			y:cy+y/z*scale,
			d:Math.sqrt(x*x+y*y+z*z)
		};
	}else{
		return {
			x:cx+(rx1+ua*(rx2-rx1))*scale,
			y:cy+y/z*scale,
			d:-1
		};
	}
}


function draw(){

	ctx.clearRect(0,0,cx*2,cy*2);
	for(i=-200;i<200;++i){
		for(j=-200;j<200;++j){
			point1=rasterizePoint(i*10,0,j*10);
			if(point1.d!=-1){
				x1=point1.x;
				y1=point1.y;
				point2=rasterizePoint((i+1)*10,0,j*10);
				if(point2.d!=-1){
					x2=point2.x;
					y2=point2.y;
					ctx.beginPath();
					ctx.strokeStyle="#fff";
					ctx.lineWidth=600/(1+point2.d);
					ctx.globalAlpha=.1;
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
					ctx.beginPath();
					ctx.strokeStyle="#4ff";
					ctx.lineWidth=250/(1+point2.d);
					ctx.globalAlpha=.35;
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
					ctx.beginPath();
					ctx.strokeStyle="#ff8";
					ctx.lineWidth=50/(1+point2.d);
					ctx.globalAlpha=1;
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
				point2=rasterizePoint(i*10,0,(j+1)*10);
				if(point2.d!=-1){
					x2=point2.x;
					y2=point2.y;
					ctx.beginPath();
					ctx.strokeStyle="#fff";
					ctx.lineWidth=600/(1+point2.d);
					ctx.globalAlpha=.1;
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
					ctx.beginPath();
					ctx.strokeStyle="#4ff";
					ctx.lineWidth=250/(1+point2.d);
					ctx.globalAlpha=.35;
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
					ctx.beginPath();
					ctx.strokeStyle="#ff8";
					ctx.lineWidth=50/(1+point2.d);
					ctx.globalAlpha=1;
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
				}
			}
		}
	}
}

initVars();
draw();