let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let newgame=document.querySelector(".newgame");
let message=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");
let game=document.querySelector(".container");
let playerO=true;
let count=0;
let resetBtn=()=>{
    playerO=true;
    enablebtn();
    game.classList.remove("hide");
    message.classList.add("msg-container");
    count=0;
}
const enablebtn = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        reset.classList.remove("hide");
    }
}
const disablebtn = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const winPatterns=[
[0,1,2],
[0,3,6],
[1,4,7],
[2,5,8],
[3,4,5],
[6,7,8],
[0,4,8],
[2,4,6]
]
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{     
        console.log(count);
       if(playerO){
        box.innerText="O";
        playerO=false;
       }
       else{
        box.innerText="X";
        playerO=true;
       }
       box.disabled = true;
       checkWinner();
    });
});
const checkWinner=()=>{
    count++;
   for(let pattern of winPatterns){
let pos1=boxes[pattern[0]].innerText;
let pos2=boxes[pattern[1]].innerText;
let pos3=boxes[pattern[2]].innerText;
if(pos1!="" &&  pos2!="" && pos3 !=""){
    if(pos1 == pos2 && pos2 == pos3){
        showWinner(pos1);
        game.classList.add("hide");
        disablebtn();
        reset.classList.add("hide");
        count=0;
    }
}
if (count === 9) {
    msg.innerText = "It's a Draw!";
    message.classList.remove("msg-container");
    game.classList.add("hide");
    reset.classList.add("hide");
}
   }
}
const showWinner = (winner)=>{
msg.innerText=`${winner} is Winner!`
message.classList.remove("msg-container");
count=0;
}
newgame.addEventListener("click",resetBtn);
reset.addEventListener("click",resetBtn);