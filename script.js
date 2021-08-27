//alert("Js connected");
let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let leftPaddle=document.querySelector(".left");
let rightPaddle=document.querySelector(".right");
let boardBounds=board.getBoundingClientRect();
let x=true;
let y=true;
let leftPlayerLife=3;
let rightPlayerLife=3;


//user input
document.addEventListener("keydown",function(e){
    console.log("koi to key hai");
    console.log(e);
    if(e.key=="w"|| e.key=="W"){
        movePaddle(leftPaddle,-window.innerHeight*0.1); 
    }
    else if(e.key=="s"|| e.key=="S"){
        movePaddle(leftPaddle,window.innerHeight*0.1); 
    }
    else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.1); 
    }
    else if(e.key=="ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.1); 
    }
})

function setColor(idx){
    let allicons=document.querySelectorAll(".fas.fa-circle");
    allicons[idx] .style.color="#686ded";
}
function movePaddle(cPaddle,change){
    let cPaddleBounds= cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change>=boardBounds.top &&cPaddleBounds.bottom+change<=boardBounds.bottom){
        cPaddle.style.top=cPaddleBounds.top+change+"px";
    }
}

function moveBall(){
    let ballcord=ball.getBoundingClientRect();
    let ballTop=ballcord.top;
    let ballLeft=ballcord.left;
    let ballBottom=ballcord.bottom;
    let ballRight=ballcord.right;


    let hasTouchedLeft=ballLeft<boardBounds.left;
    let hasTouchedRight=ballRight>boardBounds.right;
    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLife--;
            setColor(leftPlayerLife);
            if(leftPlayerLife==0){
                alert("✨Game Over ⚡Player B won⚡ 🎉🎉");
                document.location.reload();

            }
            else {
                return resetGame();
            }
        }
        else {
            rightPlayerLife--;
            setColor(3+rightPlayerLife);
            if(rightPlayerLife==0){
                alert("✨Game Over ⚡Player A won⚡ 🎉🎉");
                document.location.reload();
            }
            else {
                return resetGame();
            }
        }
    }
    function resetGame(){
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.45+"px";
        requestAnimationFrame(moveBall)
        

    }

    //vertical bound
    if(ballTop<=boardBounds.top||ballBottom>=boardBounds.bottom){
        y=!y;
    }

    //collision
    let leftPaddleBounds=leftPaddle.getBoundingClientRect();
    let rightPaddleBounds=rightPaddle.getBoundingClientRect();

    if(ballLeft<=leftPaddleBounds.right && ballRight>=leftPaddleBounds.left && 
        ballTop+30>=leftPaddleBounds.top &&ballBottom-30<=leftPaddleBounds.bottom){
            x=!x;
        }
    if(ballLeft<=rightPaddleBounds.right && ballRight>=rightPaddleBounds.left && 
        ballTop+30>=rightPaddleBounds.top &&ballBottom-30<=rightPaddleBounds.bottom){
            x=!x;
        }
    ball.style.top= y==true?ballTop+4+"px":ballTop-4+"px";
    ball.style.left= x==true?ballLeft+4+"px":ballLeft-4+"px";
    requestAnimationFrame(moveBall);
    
}
requestAnimationFrame(moveBall);