<template>
  <div class="header">
    <a href="javascript:window.location.href = window.location.origin"><div class="headerText">TETRIS<br>THE NEXT GENERATION</div></a>
    <canvas ref="headerCanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: [ 'state' ],
  data(){
    return {
      t: 0,
      S: Math.sin,
      C: Math.cos,
      x: null,
      c: null
    }
  },
  computed:{
  },
  methods:{
    Draw(){
      let t = this.t
      let S = this.S
      let C = this.C
      let x = this.x
      let c = this.c
      
      let G, j, i, p, a, l, B, w, Rn, R, Q, Rl, Pt, Yw, oX, oY, oZ, tx, ty, tz, X, Y, Z, M, A, H, d
      
      R=(Rl,Pt,Yw,o)=>{
        X=S(p=(A=(M=Math).atan2)(X,Y)+Rl)*(d=(H=M.hypot)(X,Y)),Y=C(p)*d,Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z)),Z=C(p)*d,X=S(p=A(X,Z)+Yw)*(d=H(X,Z)),Z=C(p)*d
        if(o)X+=oX,Y+=oY,Z+=oZ
      }

      for(G=[],j=6;j--;)for(i=4;i--;)G=[...G,[(a=[S(p=Math.PI*2/4*i+Math.PI/4)*(2**.5)/2,C(p)*(2**.5)/2,.5])[j%3]*(l=j<3?1:-1),a[(j+1)%3]*l,a[(j+2)%3]*l]]
      B = [
        [[-.5,-1,0],[-.5,0,0],[-.5,1,0],[.5,1,0]],
        [[.5,-1,0],[.5,0,0],[.5,1,0],[-.5,1,0]],
        [[-1,0,0],[0,0,0],[1,0,0],[0,1,0]],
        [[-1.5,0,0],[-.5,0,0],[.5,0,0],[1.5,0,0]],
        [[-.5,-1,0],[-.5,0,0],[.5,0,0],[.5,1,0]],
        [[.5,-1,0],[.5,0,0],[-.5,0,0],[-.5,1,0]],
        [[-.5,-.5,0],[.5,-.5,0],[.5,.5,0],[-.5,.5,0]]
      ]
      
      c.width = c.clientWidth
      x.fillStyle='#000', x.clearRect(0,0,w=c.width,w)
      x.lineJoin=x.lineCap='round'
      
      Rl=t, Pt=-t/2, Yw=t
      oX=0, oY=0, oZ=5
      
      B.map((v, j)=>{
        v.map(v=>{
          tx=v[0]
          ty=v[1]
          tz=v[2]
          G.map((q, i)=>{
            X = q[0] + tx
            Y = q[1] + ty
            Z = q[2] + tz
            R(Rl*(j%2?1:-1),Pt*(j%2?1:-1.5),Yw,1)
            if(!(i%4)) x.beginPath()
            x.lineTo(X/Z*100 + ((-3+j)*c.width/7 - C(t/3) * 1000 + c.width/2*99)%c.width, c.height/2+Y/Z*100)
            if(i%4==3){
              switch(this.state.colorMode){
                case 'cyberpunk':
                  x.strokeStyle=`hsla(${170},75%,${50}%,.8)`
                  x.fillStyle=`hsla(${170},75%,${50}%,.3)`
                  break
                case 'rainbows':
                  x.strokeStyle=`hsla(${360/7*(j-1)},75%,50%,.8)`
                  x.fillStyle=`hsla(${360/7*(j-1)},75%,50%,.3)`
                  break
              }
              x.closePath()
              x.lineWidth=4/Z
              //x.strokeStyle=`hsla(${360/7*j},99%,80%,.8)`
              x.stroke()
              //x.fillStyle=`hsla(${360/7*j},99%,50%,.3)`
              x.fill()
            }
          })
        })
      })
      
      this.t += 1/60
      requestAnimationFrame(this.Draw)
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.c = this.$refs.headerCanvas
      this.x = this.c.getContext('2d')
      this.t = 0
      this.c.width = this.c.clientWidth
      this.c.height = this.c.clientHeight
      this.Draw()
    })
  }
}
</script>

<style scoped>
canvas{
  width: 100%;
  height: 100px;
  vertical-align: top;
}
.header{
  position: relative;
  z-index: 10;
  width: 100vw;
  font-size: 32px;
  text-align: center;
}
.headerText{
  font-size: 28px;
  color: #fff8;
  position: absolute;
  min-width: 450px;
	left: 50%;
  top: 15px;
  transform: translatex(-50%) scalex(2.0);
  font-style: oblique;
  text-shadow: 0px 0px 10px #0f4;
}
</style>
