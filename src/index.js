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
// for save to localstorage
penKey = "PENDING";
finKey = "FINISHED";

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  penPrint(currentValue);
}

function penPrint(text){
  const penLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const toFinBtn = document.createElement("button");
  // initial id = 1
  const id = penList.length + 1;
  delBtn.innerText = "❌"
  toFinBtn.innerText = "✅"
  penLi.innerText = text;
  penLi.id = id;
  penLi.append(delBtn);
  penLi.append(toFinBtn);
  jsPenList.append(penLi);
  const penObj = {
    id,
    text
  };
  penList.push(penObj);
  save(penKey, penList);
  delBtn.addEventListener("click",penDelItem);
  toFinBtn.addEventListener("click", toFinItem);
}
function finPrint(text){
  const finLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const toPenBtn = document.createElement("button");
  // initial id = 1
  const id = finList.length + 1;
  delBtn.innerText = "❌"
  toPenBtn.innerText = "⏪"
  finLi.innerText = text;
  finLi.id = id;
  finLi.append(delBtn);
  finLi.append(toPenBtn);
  jsFinList.append(finLi);
  const finObj = {
    id,
    text
  };
  finList.push(finObj);
}
function toFinItem(event){
  penDelItem(event);
  const text = event.target.parentNode.firstChild.textContent;
  const id = event.target.parentNode.id;
  const finLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const toFinBtn = document.createElement("button");
  const finObj = {
    id, text
  };
  finList.push(finObj);
  save(finKey, finList);
  delBtn.innerText = "❌"
  toFinBtn.innerText = "⏪"
  finLi.innerText = text;
  finLi.id = id;
  finLi.append(delBtn);
  finLi.append(toPenBtn);
  jsFinList.append(finLi);
  toFinBtn.addEventListener("click", toPenItem);
  delBtn.addEventListener("click", finDelItem);
}
function toPenItem(event){
  finDelItem(event)
  const text = event.target.parentNode.firstChild.textContent;
  const id = event.target.parentNode.id;
  const penLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const toPenBtn = document.createElement("button");
  const penObj = {
    id, text
  };
  penList.push(penObj);
  save(penKey, penList);
  delBtn.innerText = "❌"
  toPenBtn.innerText = "⏪"
  penLi.innerText = text;
  penLi.id = id;
  penLi.append(delBtn);
  penLi.append(toPenBtn);
  jsPenList.append(penLi);
}
function penDelItem(event){
  const li = event.target.parentElement;
  jsPenList.removeChild(li);
  // true is keep, false is discard : for discard btn li
  const modifiedLi = penList.filter((value => value.id !== parseInt(li.id)));
  penList = modifiedLi;
  save(penKey, penList);
}
function finDelItem(event){
  penDelItem(event);
  const li = event.target.parentElement;
  jsFinList.removeChild(li);
  // true is keep, false is discard : for discard btn li
  const modifiedLi = finList.filter(function(value){
    console.log(value.id);
    console.log(li.id);
    return value.id !== parseInt(li.id);
  });
  // const modifiedLi = finList.filter((value => value.id !== parseInt(li.id)));
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
    LSValue.forEach(value => {
        if(key===penKey){
          penPrint(value.text);
        }else{
          finPrint(value.text);
        }
      });
    }
}

load(penKey);
load(finKey);
form.addEventListener("submit", handleSubmit);

