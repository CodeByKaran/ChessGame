import {
  checkIsPawnAtEnd
} from "./newPeice.js"


const root = document.getElementById("root")
const Undo_Btn=document.getElementById("Undo")
const d = document;
let Board_Array = [];

function MakeBoard(id) {
  return { id }
}

function init_board() {
  for (let i = 0; i < 64; ++i) {
    Board_Array.push(MakeBoard(i + 1))
  }
}

let c1 = 0,
  c2 = 8,
  c3 = 0;
let E_O_box = {
  9: 16,
  17: 24,
  25: 32,
  33: 40,
  41: 48,
  49: 56,
  57: 64
}

let b_peice_array = ["./asests/b_rook.png", "./asests/b_knight.png", "./asests/b_bishop.png", "./asests/b_king.png", "./asests/b_queen.png", "./asests/b_bishop.png", "./asests/b_knight.png", "./asests/b_rook.png", "./asests/b_pawn.png", "./asests/b_pawn.png", "./asests/b_pawn.png", "./asests/b_pawn.png", "./asests/b_pawn.png", "./asests/b_pawn.png", "./asests/b_pawn.png", "./asests/b_pawn.png"]

let w_peice_array = ["./asests/w_pawn.png", "./asests/w_pawn.png", "./asests/w_pawn.png", "./asests/w_pawn.png", "./asests/w_pawn.png", "./asests/w_pawn.png", "./asests/w_pawn.png", "./asests/w_pawn.png", "./asests/w_rook.png", "./asests/w_knight.png", "./asests/w_bishop.png", "./asests/w_king.png", "./asests/w_queen.png", "./asests/w_bishop.png", "./asests/w_knight.png", "./asests/w_rook.png"]

let count = 0;

//id a1,b1,c1,d1,e1,f1,g1,h1
//id a2,b2,c2,d2,e2,f2,g2,h2
let id = ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"]

let p_id = {
  48: "wpawn",
  49: "wpawn",
  50: "wpawn",
  51: "wpawn",
  52: "wpawn",
  53: "wpawn",
  54: "wpawn",
  55: "wpawn",
  8: "bpawn",
  9: "bpawn",
  10: "bpawn",
  11: "bpawn",
  12: "bpawn",
  13: "bpawn",
  14: "bpawn",
  15: "bpawn",
  0: "brook",
  7: "brook",
  56: "wrook",
  63: "wrook",
  1: "bhorse",
  6: "bhorse",
  57: "whorse",
  62: "whorse",
  2: "bbishop",
  5: "bbishop",
  58: "wbishop",
  61: "wbishop",
  3: "bqueen",
  4: "bking",
  59: "wqueen",
  60: "wking"
}



window.onload = () => {
  init_board();
  Board_Array.forEach((b, i) => {
    let span = document.createElement("span")
    let sub_span = document.createElement("span");
    span.classList.add("boxes")
    let ids = id[i]
    span.setAttribute("id", ids)
    //preview 
    //span.innerText = id[i]
    if (E_O_box[b.id]) {
      if (b.id == 9 || b.id == 25 || b.id == 41 || b.id == 57) {
        c3 = 1;
      }
      else {
        c3 = 0;
      }
      c2 = E_O_box[b.id]
    }
    if (b.id >= c1 && b.id <= c2) {
      if (b.id % 2 === c3) {
        span.classList.add("Even_Boxes")
      }
      else {
        span.classList.add("Odd_Boxes")
      }
    }

    span.addEventListener("click", MovePeice)

    if (b_peice_array[i]) {
      let image = document.createElement("img")
      image.src = b_peice_array[i]
      image.classList.add("images")
      image.classList.add(p_id[i])
      image.id = id[i]
      span.appendChild(image)
    }
    if (i >= 48) {
      let image = document.createElement("img")
      image.src = w_peice_array[count]
      image.classList.add("images")
      image.classList.add(p_id[i])
      image.id = id[i]
      span.appendChild(image)
      count++;
    }
    root.appendChild(span)
  })
}



let prev_block = {
  id: null,
  img_inf: null,
  image: null,
}


let HighLighted_Box=[]
function HighLight(blocks) {
  HighLighted_Box=[]
  blocks.forEach((id) => {
    let block = document.getElementById(id);
    let span = document.createElement("span")
    span.id = id;
    span.classList.add("highlight")
    block.appendChild(span)
    HighLighted_Box.push(block)
  })
  let square = document.querySelectorAll("span")
  square.forEach((e) => {
    if (e.className === "highlight") {
      e.addEventListener("click", () => Make_Peice_Move(e.id, prev_block.image))
    }
  })
}

// Doing SelfHighLight
let prevId=null;
let Box=[]
let toggle=true;
function SelfHighLight(id,lighted){
  try{
  let elm=d.getElementById(id)
  if(prevId!=null){
    d.getElementById(prevId).classList.remove("selfhighlight")
  }
  if(prevId==id){
    Box.push(id)
    if(Box.length<=1)
    toggle=false;
    if(Box.length>1){
    toggle=true;
    Box=[]
    prevId=null
    }
    if(toggle){
    elm.classList.add("selfhighlight")
    }
    else{
    lighted.forEach(e=>{
      e.removeChild(e.firstElementChild)
    })
    ClearHighLight()
    elm.classList.remove("selfhighlight")
  }
  }
  else{
  Box=[]
  elm.classList.add("selfhighlight")
  }
  prevId=id;
  if(!elm.hasChildNodes()){
    Box=[]
    prevId=null
    elm.classList.remove("selfhighlight")
  }
  }catch{}
  //Ending Self HighLight
}

let Tog_Move=false;

function ToggleMove(T_F){
  let Square=d.querySelectorAll("span")
  if(T_F){
  //console.log("blackEnd")
  Square.forEach(e=>{
    if(e.hasChildNodes()){
      //console.log("child")
      if((e.children[0].classList[1][0])==="b"){
      e.removeEventListener("click",MovePeice)
      }
    else if ((e.children[0].classList[1][0])==="w") {
      e.addEventListener("click",MovePeice)
    }
    }
  })
  //BlackEnd
  }
  else{ 
  //console.log("Whiteend")
  Square.forEach(e=>{
    if(e.hasChildNodes()){
      if((e.children[0].classList[1][0])==="w"){
        // console.log("white wlA")
        // console.log(e.childElementCount)
        //console.log(e.id)
        //console.log(e.children[0].id)
      e.removeEventListener("click",MovePeice)
      }
    else if ((e.children[0].classList[1][0])==="b") {
      e.addEventListener("click",MovePeice)
    }
    }
  })
  //White end
  }
}

// Undo Object
let Undo={
  Id:[],
  Img:[],
  cls:[],
  is_caught:false,
  Is_Elim_Id:[],
}


Undo_Btn.addEventListener("click",UndoMove)




function UndoKilledPeice(id1,img1)
{
  //console.log("Eliminated Undoing")
//  console.log(Undo.Id,Undo.Img)
  let l=Undo.Id.length;
  let Rev_id=Undo.Id.slice(l-2,)
  let Rev_Img=Undo.Img.slice(l-2,)
  let cls=null;
  Rev_id.forEach((e,i)=>{
    //console.log("rev wla hai")
   // console.log(Rev_Img[i])
    let block=d.getElementById(e)
    let image=d.createElement("img")
    image.src=Rev_Img[i]
    image.classList.add("images")
    //cls=`${(Rev_Img[i][29]+prev_block.img_inf.slice(1,))}`
    let cls_L=Undo.cls.length;
    cls=Undo.cls[cls_L-(i+1)]
    //console.log(cls)
    image.id=Rev_id[i]
    image.classList.add(cls)
    block.appendChild(image)
    block.addEventListener("click", MovePeice)
  })
  prev_block.id=Rev_id[1]
  Clear_Prev_Peice()
  Undo.is_caught=false;
  if(cls[0]==="b"){
    Tog_Move=true;
    }
    else {
    Tog_Move=false;
    }
   ToggleMove(Tog_Move)
  //console.log("after eliminated undo")
 // console.log(Undo.Id,Undo.Img)
  // let i=2
  // while(i--){
  //   Undo.Id.pop()
  //   Undo.Img.pop()
  // }
}

async function LimitUndo(){
  let L=Undo.Id.length;
  if (L > 8) {
    Undo_Btn.innerText="Refreshing"
    setTimeout(()=>{
    Undo_Btn.innerText="Undo"
    },1000)
    Undo.Id = []
    Undo.Img = []
    Undo.cls = []
    Undo.is_caught = false;
    Undo.Is_Elim_Id = []
    return
  }
}

function UndoMove(){
  let L=Undo.Id.length;
  if(L<2) return;
  //console.log("undoing")
 // console.log(Undo.Id,Undo.Img)
  ClearHighLight();
  let id=Undo.Id[L-2];
  let img=Undo.Img[L-2];
  //console.log(Undo.Img)
  //console.log("img")
  //console.log(img)
  //console.log(id,img)
  // if(id==Undo.Is_Elim_Id[0]&&img==Undo.Is_Elim_Id[0])
  // Undo.is_caught=true;
  //console.log(Undo.Is_Elim_Id[0]==id)
 // console.log(Undo.Is_Elim_Id,id)
  //let l=Search(Undo.Is_Elim_Id,id)
  //console.log(Undo.Is_Elim_Id[l])
  if(Undo.Is_Elim_Id.includes(id)){
  Undo.is_caught=true;
  if(img==Undo.Img[L-1])
  Undo.is_caught=false
  let Index=Search(Undo.Is_Elim_Id,id)
  Undo.Is_Elim_Id.splice(Index,2)
 // console.log(Undo.Is_Elim_Id)
  }
  else {
    Undo.is_caught=false;
  }
  if(Undo.is_caught){
    //console.log("Del undo run")
    //console.log(Undo.Is_Elim_Id)
    //console.log(id,Undo.Is_Elim_Id[0])
    UndoKilledPeice(id,img)
    let i=2
  while(i--){
    Undo.Id.pop()
    Undo.Img.pop()
    Undo.cls.pop()
  }
    return
  }
  //console.log("jisko htana hai")
  //console.log(id,img)
  //console.log("Normal Undo run")
 let block = document.getElementById(id);
  let image = document.createElement("img")
  let img_src=("."+img.slice(21,))
  image.src = img_src;
  image.classList.add("images")
  let cls_L=Undo.cls.length;
  //console.log(Undo.cls[cls_L-1])
  //let cls=`${img[29]+prev_block.img_inf.slice(1,)}`
  let cls=Undo.cls[cls_L-1]
  //console.log(cls)
  image.classList.add(cls)
  image.id = id;
  block.appendChild(image)
  block.addEventListener("click", MovePeice)
  prev_block.id=Undo.Id[L-1]
  if(img[29]==="b")
  Tog_Move=false;
  else 
    Tog_Move=true
  ToggleMove(Tog_Move)
  Clear_Prev_Peice()
 ClearHighLight()
  let i=2;
  while(i--){
  Undo.Id.pop();
  Undo.Img.pop()
  }
  Undo.cls.pop();
}

function Undo_Eliminate(P1,Img1,P2,Img2){
  //console.log(P1,Img1,P2,Img2)
  Undo.Id.push(P1)
  Undo.Img.push(Img1)
  Undo.Id.push(P2)
  Undo.Img.push(Img2)
  //console.log("eliminated Undo")
  //console.log(Undo.Id,Undo.Img,Undo.cls)
  Undo.is_caught=true;
  let L=Undo.Id.length;
  let El_Id=Undo.Id.slice(L-2,)
  El_Id.forEach((e,i)=>{
    Undo.Is_Elim_Id.push(e)
  })
  //console.log(Undo.Is_Elim_Id)
  //console.log(Undo.Is_Elim_Id)
}


function FillUndo(Ids){
 /* if(!Undo.Id.includes(Ids)){
  Undo.Id.push(Ids)
  Undo.Img.push(prev_block.image)
  }*/
  Undo.Id.push(Ids)
  Undo.Img.push(prev_block.image)
  //console.log("filling")
  //console.log(Undo.Id,Undo.Img)
 // console.log(Undo.cls)
}


let prev_Peice=null;

function MovePeice(e) {
  if(Queen_Catched.stop_game) return;
  
  LimitUndo()
  // Changing Moves
  //console.log(Tog_Move)
  //let L=Undo.Id.length;
  Undo.is_caught=false;
  let c=null;
  try{
   c=e.target.classList[1][0];
  }catch{}
  if(c==undefined){
      c=prev_Peice
    }
  if(e.target.className!="highlight"){
   let B_W_Chnc=c
   //console.log(B_W_Chnc)
  if(B_W_Chnc==="b")
  Tog_Move=true;
  if(B_W_Chnc==="w")
  Tog_Move=false;
  prev_Peice=B_W_Chnc;
  }
  
  //Starting MovePeice
  let Next_Block = [];
  let peice_Name = e.target.className
  //console.log("MovePeice wla")
  //console.log(peice_Name)
  //Pawn Move
  if (peice_Name === "images wpawn" || peice_Name === "images bpawn") {
    
    //console.log("pawn Clicked")
    ClearHighLight()
    Next_Block = []
    let First_Step = ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]
    let Move_A = ["a", "b", "c", "d", "e", "f", "g", "h"]
    let Move_I = [1, 2, 3, 4, 5, 6, 7, 8]
    let c1 = 1,
      c2 = 2,
      c3 = 1;
    prev_block.image = e.target.src;
    let Sec_Id=[];
    //Changing Value
    if (peice_Name === "images bpawn") {
      c1 = -1;
      c2 = -2;
      c3 = -1;
    }
    else {
      c1 = 1;
      c2 = 2;
      c3 = 1;
    }
    let Ids = e.target.id;
    prev_block.id = Ids;
    prev_block.img_inf = peice_Name.slice(7, );
    Sec_Id = [`${Ids[0]}${Number(Ids[1])-c1}`, `${Ids[0]}${Number(Ids[1])-c2}`]
    
    if (Ids[1] != 7 && Ids[1] != 2) {
      Sec_Id = Sec_Id.slice(0, 1)
    }
    for (let i = 0; i < Sec_Id.length; i++) {
      let e=Sec_Id[i]
      if(e[1]==0||e[1]==9) continue
      if(d.getElementById(e).hasChildNodes())
      break
      Next_Block.push(e)
    }
    let IA = Search(Move_A, Ids[0])
    let IN = Search(Move_I, Number(Ids[1]))
    let Peice_Caught = [`${Move_A[IA+1]}${Move_I[IN-c3]}`, `${Move_A[IA-1]}${Move_I[IN-c3]}`]
    PeiceCaught(Peice_Caught)
    HighLight(Next_Block)
    SelfHighLight(Ids,HighLighted_Box)
    //Ending Pawn Move
  }

  // Rook Move
  else if (peice_Name === "images wrook" || peice_Name === "images brook") {
    ClearHighLight()
    let Ids = e.target.id;
    let Pc_Caught=[]
    Next_Block = [];
    //Updating Objects
    prev_block.id = Ids;
    prev_block.img_inf = peice_Name.slice(7, );;
    prev_block.image = e.target.src;
    //Adding Ids
    let Char_id = ["a", "b", "c", "d", "e", "f", "g", "h"]
    let Int_id = ["8", "7", "6", "5", "4", "3", "2", "1"]
    let Sample_ids_V = []
    let Sample_ids_V_D = []
    let Sample_ids_H = []
    let Sample_ids_H_L = []
    let index = 0;
    let c = 1;
    //Vertical Up Ids
    for (let i = 1; i <= Ids[1]; ++i) {
      let Vert_Ids = `${Ids[0]}${Ids[1]-i}`
      if (id.includes(Vert_Ids))
        Sample_ids_V.push(Vert_Ids)
    }
    //Vertical Low Ids
    for (let i = 1; i <= 8; ++i) {
      let Vert_Ids = `${Ids[0]}${Number(Ids[1])+i}`
      if (id.includes(Vert_Ids))
        Sample_ids_V_D.push(Vert_Ids)
    }
    // checking Columns Alpha
    for (let i = 1; i <= 8; ++i) {
      if (Char_id.includes(e.target.id[0])) {
        index = Char_id.indexOf(e.target.id[0])
      }
    }
    //Horziontal Right Ids
    for (let i = 1; i <= 8; ++i) {
      if (index > 7) continue
      let Horzt_ids = `${Char_id[index]}${Ids[1]}`
      Sample_ids_H.push(Horzt_ids)
      index++;
    }
    //Horziontal Left Ids
    index = Char_id.indexOf(e.target.id[0]) - 1
    for (let i = 1; i <= 8; ++i) {
      if (index < 0) continue
      let Horzt_ids = `${Char_id[index]}${Ids[1]}`
      Sample_ids_H_L.push(Horzt_ids)
      index--;
    }
    //Vertical check
    Sample_ids_V.forEach((e, i) => {
      if (e == Ids) {
        Sample_ids_V.splice(i, 1)
      }
    })
    //Highlighting Columns of rook
    for (let i = 0; i < Sample_ids_V.length; ++i) {
      let e = Sample_ids_V[i];
      if (d.getElementById(e).hasChildNodes()){
        Pc_Caught.push(e)
        break;
      }
      Next_Block.push(e)
    }
    for (let i = 0; i < Sample_ids_V_D.length; ++i) {
      let e = Sample_ids_V_D[i];
      if (d.getElementById(e).hasChildNodes()){
      Pc_Caught.push(e)
        break;
      }
      Next_Block.push(e)
    }
    //Popping Target Element 
    Sample_ids_H.forEach((e, i) => {
      if (e == Ids) {
        Sample_ids_H.splice(i, 1)
      }
    })
    //Highlight Rows of Rook
    for (let i = 0; i < Sample_ids_H.length; ++i) {
      let e = Sample_ids_H[i];
      if (d.getElementById(e).hasChildNodes()){
        Pc_Caught.push(e)
        break;
      }
      Next_Block.push(e)
    }
    //Highlight Rows of Rook
    for (let i = 0; i < Sample_ids_H_L.length; ++i) {
      let e = Sample_ids_H_L[i];
      if (d.getElementById(e).hasChildNodes()){
        Pc_Caught.push(e)
        break;
      }
      Next_Block.push(e)
    }
    PeiceCaught(Pc_Caught)
    //calling HighLight 
    HighLight(Next_Block)
    SelfHighLight(Ids,HighLighted_Box)
    //Ending Rook Function  
  }
  //Moving Horse
  else if (peice_Name === "images whorse" || peice_Name === "images bhorse") {
    ClearHighLight()
    let Ids = e.target.id;
    let Pc_Caught=[]
    Next_Block = [];
    //Updating Objects
    prev_block.id = Ids;
    prev_block.img_inf = peice_Name.slice(7, );
    prev_block.image = e.target.src;
    let Moves = ["a", "b", "c", "d", "e", "f", "g", "h"]

    // Direction right,ledt,top,down
    let Dir = {
      "rt": { x: 2, y: 1 },
      "tr": { x: 1, y: 2 },
      "lt": { x: -2, y: 1 },
      "tl": { x: -1, y: 2 },
      "rd": { x: 2, y: -1 },
      "dr": { x: 1, y: -2 },
      "ld": { x: -2, y: -1 },
      "dl": { x: -1, y: -2 },
    }
    let Move_Dir = Object.keys(Dir)
    for (let i = 0; i < Move_Dir.length; ++i) {
      let e = Move_Dir[i]
      let N_S = GetHorseId(Moves, Ids, Dir[e].x, Dir[e].y)
      if (id.includes(N_S)) {
        if (d.getElementById(N_S).hasChildNodes()){
        Pc_Caught.push(N_S)
          continue;
        }
        Next_Block.push(N_S)
      }
    }
    PeiceCaught(Pc_Caught)
    HighLight(Next_Block)
    SelfHighLight(Ids,HighLighted_Box)
    //Ending Horse Function
  }
  // Bishop Move
  else if (peice_Name === "images wbishop" || peice_Name === "images bbishop") {
    ClearHighLight()
    let Ids = e.target.id;
    let Pc_Caught=[]
    Next_Block = [];
    //Updating Objects
    prev_block.id = Ids;
    prev_block.img_inf = peice_Name.slice(7, );;
    prev_block.image = e.target.src;
    let Moves_A = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let Moves_I = [1, 2, 3, 4, 5, 6, 7, 8];
    // getting Ids Of Next Block
    // x,y,dx,dy
    let Dir = {
      "rt": { x: -1, y: 1, dx: -1, dy: 1 },
      "lt": { x: 1, y: 1, dx: 1, dy: 1 },
      "rb": { x: -1, y: -1, dx: -1, dy: -1 },
      "lb": { x: 1, y: -1, dx: 1, dy: -1 },
    }
    let R_t = [] // Right Top
    let L_t = []
    let R_B = [] // Right Bottom
    let L_B = []
    //Right Top Ids
    R_t = GetBishopId(Moves_A, Moves_I, Ids, Dir.rt.x, Dir.rt.y, Dir.rt.dx, Dir.rt.dy)
    //Left Top Ids
    L_t = GetBishopId(Moves_A, Moves_I, Ids, Dir.lt.x, Dir.lt.y, Dir.lt.dx, Dir.lt.dy)
    //Right Bottom Ids
    R_B = GetBishopId(Moves_A, Moves_I, Ids, Dir.rb.x, Dir.rb.y, Dir.rb.dx, Dir.rb.dy)
    // Left Bottom Ids
    L_B = GetBishopId(Moves_A, Moves_I, Ids, Dir.lb.x, Dir.lb.y, Dir.lb.dx, Dir.lb.dy)
    //Looping Right Top Ids
    for (let i = 0; i < R_t.length; ++i) {
      let e = R_t[i]
      if (d.getElementById(e).hasChildNodes()){
        Pc_Caught.push(e)
        break
      }
      Next_Block.push(e)
    }
    //Looping Left Top Ids
    for (let i = 0; i < L_t.length; ++i) {
      let e = L_t[i]
      if (d.getElementById(e).hasChildNodes()){
        Pc_Caught.push(e)
        break
      }
      Next_Block.push(e)
    }
    //Looping Right Bottom Ids
    for (let i = 0; i < R_B.length; ++i) {
      let e = R_B[i]
      if (d.getElementById(e).hasChildNodes()){
        Pc_Caught.push(e)
        break
      }
      Next_Block.push(e)
    }
    //Looping Left Bottom Ids
    for (let i = 0; i < L_B.length; ++i) {
      let e = L_B[i]
      if (d.getElementById(e).hasChildNodes()){
        Pc_Caught.push(e)
        break
      }
      Next_Block.push(e)
    }
    PeiceCaught(Pc_Caught)
    HighLight(Next_Block)
    SelfHighLight(Ids,HighLighted_Box)
    //Ending of Bishop function
  }
  // Queen Move Function
  else if (peice_Name === "images wqueen" || peice_Name === "images bqueen") {
    ClearHighLight()
    let Ids = e.target.id;
    let Pc_Caught=[]
    Next_Block = [];
    //Updating Objects
    prev_block.id = Ids;
    prev_block.img_inf = peice_Name.slice(7, );;
    prev_block.image = e.target.src;
    let Moves_A = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let Moves_I = [1, 2, 3, 4, 5, 6, 7, 8];
    // Directions
    let Dir = {
      "t": { x: 0, y: -1 },
      "rt": { x: 1, y: -1 },
      "r": { x: 1, y: 0 },
      "rb": { x: 1, y: 1 },
      "b": { x: 0, y: 1 },
      "lb": { x: -1, y: 1 },
      "l": { x: -1, y: 0 },
      "lt": { x: -1, y: -1 },
    }
    let Keys = Object.keys(Dir);
    // Looping All Directions Queen
    for (let i = 0; i < Keys.length; ++i) {
      let e = Keys[i];
      let Moves_Id = GetQueenId(Moves_A, Moves_I, Ids, Dir[e].x, Dir[e].y)
      if (Moves_Id) {
        if (!d.getElementById(Moves_Id).hasChildNodes())
          Next_Block.push(Moves_Id)
        else Pc_Caught.push(Moves_Id)
      }
    }
    PeiceCaught(Pc_Caught)
    HighLight(Next_Block)
    SelfHighLight(Ids,HighLighted_Box)
    //End Of Queen Function
  }
  //King Move Function
  else if (peice_Name === "images wking" || peice_Name === "images bking") {
    ClearHighLight()
    let Ids = e.target.id;
    let Pc_Caught=[]
    Next_Block = [];
    //Updating Objects
    prev_block.id = Ids;
    prev_block.img_inf = peice_Name.slice(7, );;
    prev_block.image = e.target.src
    let Moves_A = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let Moves_I = [1, 2, 3, 4, 5, 6, 7, 8];
    let Dir = {
      "t": { x: 0, y: -1 },
      "rt": { x: 1, y: -1 },
      "r": { x: 1, y: 0 },
      "rb": { x: 1, y: 1 },
      "b": { x: 0, y: 1 },
      "lb": { x: -1, y: 1 },
      "l": { x: -1, y: 0 },
      "lt": { x: -1, y: -1 },
    }
    let Keys = Object.keys(Dir);

    for (let i = 0; i < Keys.length; ++i) {
      let e = Keys[i]
      let Moves_Id = GetKingId(Moves_A, Moves_I, Ids, Dir[e].x, Dir[e].y)
      for (let i = 0; i < Moves_Id.length; ++i) {
        let e = Moves_Id[i]
        if (d.getElementById(e).hasChildNodes()){
          Pc_Caught.push(e)
          break;
        }
        Next_Block.push(e)
      }
    }
    PeiceCaught(Pc_Caught)
    HighLight(Next_Block)
    SelfHighLight(Ids,HighLighted_Box)
    //End of King Function
  }
  // ClearHighLight On Empty Boxes
  else if (peice_Name === "boxes Odd_Boxes" || peice_Name === "boxes Even_Boxes" && (d.getElementById(e.target.id).childElementCount) != 1) {
    ClearHighLight()
    SelfHighLight(e.target.id,HighLighted_Box)
   // prevId=prevId;
  //  Box=[]
  }
  //End Of Main Function 
}


// Searching Element in Array
function Search(Moves, id) {
  let index = null;
  Moves.forEach((e, i) => {
    if (e === id)
      index = i;
  })
  return index;
}


// Getting King Ids
function GetKingId(Moves_A, Moves_I, Ids, x, y) {
  let IA = Search(Moves_A, Ids[0]) //index of Alphabet array
  let IN = Search(Moves_I, Number(Ids[1])) //index of Number array
  let Id = []
  for (let i = 0; i < 8; ++i) {
    let Next_Id = `${Moves_A[IA+x]}${Moves_I[IN+y]}`
    if (id.includes(Next_Id))
      Id.push(Next_Id)
    IA += x
    IN += y
  }
  return Id
}


//Getting Queen Ids
function GetQueenId(Moves_A, Moves_I, Ids, x, y) {
  let IA = Search(Moves_A, Ids[0]) //index of Alphabet array
  let IN = Search(Moves_I, Number(Ids[1])) //index of Number array
  let Next_Id = `${Moves_A[IA+x]}${Moves_I[IN+y]}`
  if (id.includes(Next_Id))
    return Next_Id;
  return false
}


// Getting Bishop Moves Id
function GetBishopId(Moves_A, Moves_I, Ids, x, y, dx, dy) {
  let iA = Search(Moves_A, Ids[0])
  let iN = Search(Moves_I, Number(Ids[1]))
  let Id = []
  for (let i = 0; i < 8; ++i) {
    let Next_block = `${Moves_A[iA-x]}${Moves_I[iN-y]}`
    if (id.includes(Next_block))
      Id.push(Next_block)
    iA -= dx;
    iN -= dy;
    // for Loop End
  }
  return Id
}

// getting Horse Moves Id
function GetHorseId(Moves, Ids, arg1, arg2) {
  let index = Search(Moves, Ids[0])
  let new_id = `${Moves[index+arg1]}${Number(Ids[1])-arg2}`
  return new_id;
}


let isPawnHome=false;

function ClearHighLight() {
  //console.log("run")
  let block = document.querySelectorAll("span");
  block.forEach((e) => {
    if(e.classList[2]!=undefined)
    e.classList.remove("selfhighlight")
    //console.log(e.children[0].classList)
    if(e.children[1] && isPawnHome){
    //console.log(prev_block.img_inf)
    e.removeChild(e.children[1])
    e.classList.remove("PeiceCaught")
    }
    if (e.childElementCount > 1) {
      if (e.children[1].className === prev_block.img_inf) {
        
        e.removeChild(e.children[1])
        e.classList.remove("PeiceCaught")
      }
    }
    if (e.hasChildNodes())
    {
      if (e.children[0].className === "highlight") {
        e.removeChild(e.firstElementChild)
      }
    }
  })
  isPawnHome=false
}


function Clear_Prev_Peice() {
  let Block = document.getElementById(prev_block.id);
  Block.removeChild(Block.firstElementChild)
}


function Make_Peice_Move(id, img_src) {
  //console.log(id,img_src)
  let isNew = img_src.split("/")[4].split(".")[0].split("_")
 let imgObj =  checkIsPawnAtEnd(isNew,id)
 if(imgObj){
   img_src=imgObj.imgSrc;
   prev_block.img_inf=imgObj.className;
   isPawnHome=true;
 }
  let prev_cls=(d.getElementById(prev_block.id).children[0].classList[1])
  Undo.cls.push(prev_cls)
  Undo.is_caught=false
  let block = document.getElementById(id);
  let image = document.createElement("img")
  image.src = img_src;
  image.classList.add("images")
  image.classList.add(prev_block.img_inf)
  image.id = id;
  ClearHighLight()
  block.appendChild(image)
  block.addEventListener("click", MovePeice)
  Clear_Prev_Peice()
  ToggleMove(Tog_Move)
  FillUndo(prev_block.id)
  FillUndo(block.id)
}


let Queen_Catched={
  id:null,
  stop_game:false
}
// last Function Loop
function CheckWin(){
  let e=Queen_Catched.id
  Queen_Catched.id=null
  let QueenId=d.getElementById(e).children[0].classList[1]
  if(QueenId==="bqueen"){
  console.log("whites Win")
  Queen_Catched.stop_game=true;
  }
  if(QueenId==="wqueen"){
  console.log("blacks Win")
  Queen_Catched.stop_game=true;
  }
  
  //Ending Of CheckWin
}


function EliminatePeice(block,src){
  if(Queen_Catched.id==block.id)
  CheckWin()
  ClearHighLight();
  Undo_Eliminate(prev_block.id,d.getElementById(prev_block.id).children[0].src,block.id,d.getElementById(block.id).children[0].src)
  //console.log("eliminated classes")
  Undo.cls.push(block.children[0].classList[1])
  Undo.cls.push(d.getElementById(prev_block.id).children[0].classList[1])
 // console.log(Undo.Id,Undo.Img)
  block.removeChild(block.children[0])
  block.classList.remove("PeiceCaught")
  let image = document.createElement("img")
  //console.log("run1")
  image.src = src;
  image.classList.add("images")
  image.classList.add(prev_block.img_inf)
  image.id = block.id;
  block.appendChild(image)
 // block.removeChild(block.children[0])
  block.addEventListener("click", MovePeice)
  ClearHighLight()
  Clear_Prev_Peice()
  ToggleMove(Tog_Move)
 // Undo.Id.push(block.id)
  //Undo.Img.push(prev_block.image)
}

//Checking Is PeiceCaught
function PeiceCaught(Ids) {
  for (let i = 0; i < Ids.length; ++i) {
    console.log(i)
    let e = Ids[i]
    console.log(id.includes(e))
    console.log(d.getElementById(e).hasChildNodes())
    if(!id.includes(e)) continue;
    if (!d.getElementById(e).hasChildNodes()) continue;
    let src = d.getElementById(e).children[0].src
    if (src[29] == prev_block.image[29]) continue;
    let block = document.getElementById(e);
    let span = document.createElement("span")
    //console.log(src)
    span.id = e;
    //console.log(prev_block.img_inf)
    span.classList.add(prev_block.img_inf)
    block.classList.add("PeiceCaught")
    block.appendChild(span)
    console.log(span)
    console.log("run")
    // Passing Queens Ids
   // console.log("run")
    if(((block.children[0].classList[1]).slice(1,))==="queen")
    Queen_Catched.id=block.id
    // Passing Here
    span.addEventListener("click",()=>EliminatePeice(block,prev_block.image))
  }
  return
}
