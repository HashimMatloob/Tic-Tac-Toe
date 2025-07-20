let box=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let playerO=true;
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
box.forEach((box)=>{
    box.addEventListener("click",()=>{
       if(playerO){
        box.innerText="O";
        playerO=false;
       }
       else{
        box.innerText="X";
        playerO=true;
       }
       box.disabled="true";
    })
})