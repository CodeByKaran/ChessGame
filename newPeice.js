
const checkOption={
  pawn:{
    w:1,
    b:8
  },
  r:"rook",
  k:"knight",
  b:"bishop",
  q:"queen"
}


const getImg=(ch,id,type)=>{
  let className;
  let elm = document.getElementById(id)
  let imgSrc = `./asests/${type}_${checkOption[ch]}.png`
  if(checkOption[ch]==="knight"){
  className=type+"horse"
  }
  else if (checkOption[ch]==="queen"){
    className=type+"king"
  }
  else{
  className = type+checkOption[ch];
  }
  return {imgSrc,className};
}


const popup=()=>{
const choice =  prompt("Enter r,b,q,k")
 return choice;
}


const checkIsPawnAtEnd=([type,name],id)=>{
  let imgInfo;
  if(checkOption[name]){
  if(id[1]==checkOption[name][type]){
    const choice = popup()
    imgInfo = getImg(choice,id,type)
    return imgInfo
   }
  }
  return null;
}


export {
  checkIsPawnAtEnd
}