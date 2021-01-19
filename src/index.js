// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const jsPenList = document.querySelector(".js-pendingList");
const jsFinList = document.querySelector(".js-finishList");
// for display list
let penList = [];
let finList = [];
// for saving localstorage
const penKey = "PENDING";
const finKey = "FINISHED";

function handleSubmit(event){
  event.preventDefault();
  const inputString = input.value;
  penPrint(inputString);
  input.value = "";
}
function penPrint(obj){
  console.log(penList);
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌"
  const Li = document.createElement("li");
  // display and save input data
  if(typeof(obj)==="string"){
    // creat id for 'int' -> 'string'
    const id = JSON.stringify(penList.length + finList.length + 1);
    const toFinBtn = document.createElement("button");
    toFinBtn.innerText = "✅"
    Li.id = id;
    Li.innerText = obj;
    Li.append(delBtn);
    Li.append(toFinBtn);
    jsPenList.append(Li);
    const penObj = {
      id,
      text : obj
    };
    penList.push(penObj);
    save(penKey, penList);
    delBtn.addEventListener("click",DeletePen);
    toFinBtn.addEventListener("click", MoveToFin);
  }else { // display localstorage pending data
    const id = obj.id;
    const toFinBtn = document.createElement("button");
    toFinBtn.innerText = "✅"
    Li.id = id;
    Li.innerText = obj.text;
    Li.append(delBtn);
    Li.append(toFinBtn);
    jsPenList.append(Li);
    delBtn.addEventListener("click",DeletePen);
    toFinBtn.addEventListener("click", MoveToFin);
  }
}
function finPrint(obj){
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌"
  const toPenBtn = document.createElement("button");
  toPenBtn.innerText = "⏪"
  const id = obj.id;
  const Li = document.createElement("li");
  Li.id = id;
  Li.innerText = obj.text;
  Li.append(delBtn);
  Li.append(toPenBtn);
  jsFinList.append(Li);
  delBtn.addEventListener("click",DeleteFin);
  toPenBtn.addEventListener("click", MoveToPen);
}

function MoveToFin(event){
  DeletePen(event);
  const text = event.target.parentNode.firstChild.textContent;
  // crearting id for 'string'
  const id = event.target.parentNode.id;
  const obj = {
    id, text
  };
  finList.push(obj);
  save(finKey, finList);
  finPrint(obj);
}
function MoveToPen(event){
  DeleteFin(event) //working
  const text = event.target.parentNode.firstChild.textContent;
  // crearting id for 'string'
  const id = event.target.parentNode.id;
  const obj = {
    id, text
  };
  penList.push(obj);
  save(penKey, penList);
  penPrint(obj);
}

function DeletePen(event){ 
  const li = event.target.parentElement;
  jsPenList.removeChild(li);
  // true is keep, false is discard : for discard btn li
  // crearting id for 'string'
  const modifiedLi = penList.filter((value => value.id !== li.id));
  penList = modifiedLi;
  save(penKey, penList);
}
function DeleteFin(event){
  const li = event.target.parentElement;
  jsFinList.removeChild(li);
  // true is keep, false is discard : for discard btn li
  const modifiedLi = finList.filter((value => value.id !== li.id));
  console.log("새 오브젝트 완성");
  console.log(modifiedLi);
  finList = modifiedLi;
  save(finKey, finList);
}

function save(key, obj){
  localStorage.setItem(key, JSON.stringify(obj));
}
function load(key){
  const loadedObj = localStorage.getItem(key);
  if(loadedObj !== null){
    const LSValue = JSON.parse(loadedObj);
    LSValue.forEach(obj => {
        if(key===penKey){
          penList.push(obj); // prevent to creat new obj when you load
          penPrint(obj);
        }else{
          finList.push(obj);
          finPrint(obj);
        }
    });
  }
}

function init(){
  load(penKey);
  load(finKey);
  form.addEventListener("submit", handleSubmit);
}
init();