
let buttons = document.querySelectorAll('.button')
let reset_btn = document.querySelector('.btn')
let reset = document.querySelector('.reset-btn')
let first_to_play = "";
let logic = "";
let win_positions = ["123","456","789","147","258","369","159","357"]

reset_btn.onclick = function(){
  resetBoard();
  first_to_play = prompt("Choose a character x or o to begin.");
  if(first_to_play == null) first_to_play = "";
}


buttons.forEach(function(button,i){
  let index = i + 1
  button.onclick = function(){
   
    if(logic === "x"){ logic = "o"
    button.style.color = 'Red';
  }else if(logic === "o"){ logic = "x"
  button.style.color = 'black';
}

    
   if(first_to_play === ""){
     alert("Choose a character x or o to begin.");
   }else{
     if(button.innerHTML === ""){       
       if(logic === "")logic = first_to_play;       
       button.innerHTML = logic;  
       let res =  checkForWinner(buttons,win_positions,logic);
       if(res === false){
         
       }else{
         if(res.stale === false){
           colorWinner(buttons,res)
         }
       }
     }      
   }
  }
})


function resetBoard(){
  buttons.forEach(function(button){
    button.innerHTML = "";
  })
}


reset.onclick = function(){
    resetBoard();
    // first_to_play = prompt("Choose a character x or o to begin.");
    if(first_to_play == null) first_to_play = "";
  }
  

function checkForWinner(btns,wins,char){
  let text ="";
  let win_pos;
  let count = 0;
  let has_won = false;
  
  for(let i=0;i<wins.length;i++){
    let win = wins[i];
    let counter = 0;
    for(let j=0;j<win.length;j++){
      let index = win[j];
      let position = index - 1;
      text = btns[position].innerHTML;
   
      if(char == text)counter++;
      if(counter === 3){
          has_won = true;
          win_pos = win;
          break;
      }
      
    }
     counter = 0;
  }
   
  if(has_won === true){
    return {text:char,win_pos,stale:false};  
  }
  
  btns.forEach(function(button){
     if(button.innerHTML !== ""){
       count++
     }
  });
  if(count === btns.length){
    return {text:"",win_pos:"",stale:true}
  }
  return false;
}


function colorWinner(btns,res){ 
  let arr = res.win_pos;
  for(let i = 0;i<arr.length;i++){
    let index = (parseInt(arr[i]) - 1)
    btns[index].style.color = "Green";
  }
  
}

