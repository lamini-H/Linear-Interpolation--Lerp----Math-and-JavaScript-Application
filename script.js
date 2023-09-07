
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;
const A={x:100,y:200}
const B={x:400,y:200}

const orange={r:230,g:150, b:0};
const blue={r:0,g:70,b:160};

const lowFreq=200;
const highFreq = 600;

const ctx=myCanvas.getContext("2d");

let osc = null;
let audioCtx = null;
myCanvas.onClick=function(){
    if(audioCtx ==null){
        audioCtx=new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
        osc = audioCtx.createOscillator();
        osc.frequency.value=200;
        osc.start();

        const node = audioCtx.createGain();
        node.gain.value=0.1;

        osc.connect(node);
        node.connect(audioCtx.destination);
    }
}

animate();

function animate(){
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

    const sec= new Date().getTime()/1000;
   
    const t=(Math.sin(sec) +1)/2 ;

    const C=vLerp(A,B,t);
    drawDot(C,"");

    drawDot(A,"A")
    drawDot(B, "B")

    const {r,g,b} = vLerp(orange,blue,t);
    myCanvas.style.backgroundColor=
        `rgb(${r},${g},${b})`;


    if(osc){
        osc.frequency.value=
        lerp(lowFreq,highFreq,t);
    } 

    ctx.strokeStyle ="white";
    ctx.textAlign="center";
    ctx.textBaseline="top";
    ctx.font ="bold 40px Arial";
    ctx.setLineDash([lerp[50,130,t],130]);
    ctx.strokeText("Click for Sound", myCanvas.width/2,10);
    ctx.setLineDash([]);
    ctx.fillStyle="rgba(255,255,255,0.2)";
    ctx.fillText("Click for Sound", myCanvas.width/2,10);

    requestAnimationFrame(animate);
}



// const n =10;
// for (let i=0;i<=n-1;i++){
//     const t=i/(n-1);
//        const C=vLerp(A,B,t);
//        drawDot(C,"."+i);
  
// }
// drawDot(A,"A")
// drawDot(B, "B")


function vLerp(A,B,t){

    const res={};
    for(let attr in A){
        res[attr]=lerp(A[attr],B[attr],t);
    }
    return res;
    // return{
    //     x:lerp(A.x,B.x,t),
    //     y:lerp(A.y, B.y,t)
    // };
}

function lerp(a,b,t){
    return a+(b-a)*t;
}

function drawDot(pos,label){
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.strokeStyle ="black";
    ctx.arc(pos.x,pos.y,10,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.textBaseline = "middle";
    ctx.font ="bold 14px Arial";
    ctx.fillText(label,pos.x,pos.y);
}

//drawDot(A, "A");
//drawDot(B, "B");


    

