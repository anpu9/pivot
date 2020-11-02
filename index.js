let time = 0,
  timer;
const start = function start() {
  type(); 
  let btn = document.getElementById("btn");
  btn.innerHTML='❚ ❚';
  btn.setAttribute('isPlay',true);
  timer = setInterval(getForward, 1000);
};
const updateBtn = function updateBtn() {
  console.log('调用update')
  let btn = document.getElementById("btn");
  flag=btn.getAttribute('isPlay'),
  icon='';
  if(flag==='true'){
    flag='false';
    icon='►';
  }else{
    flag='true';
    icon='❚ ❚' ;
  }
  flag=btn.setAttribute('isPlay',flag)
  btn.innerHTML=icon;
};
const pause = function pause() {
  clearInterval(timer);
};
const getForward = function getForward() {
  time++;
};
const loadData = function loadData() {
  let data = {
    lines: [
      {
        words: [
          "Let ",
          "me ",
          "introduce ",
          "myself ",
          "first. ",
          "My ",
          "name ",
          "is ",
        ],
      },
      {
        words: [
          "Tian ",
          "Yuyang. ",
          "I ",
          "like ",
          "front-end ",
          "programming. ",
        ],
      },
      {
        words: ["and ", "stay ", "hungry ", "forever."],
      },
    ],
  };
  return data;
};
const render = (index) => {
  let line = loadData()["lines"][index];
  //将每一行的盒子建出来
  let container = document.getElementById("container"),
    lineString = `<span  id='line-${index}'></span>`,
    newLine = document.createElement("div");
  newLine.setAttribute("class", "line-box");
  newLine.setAttribute("id", `line-box-${index}`);
  newLine.innerHTML = lineString;
  container.appendChild(newLine);
  //每一行每一个单词
  for (let i = 0; i < line["words"].length; i++) {
    //每一个单词一个盒子
    wordNum++;
    newWord = document.createElement("span");
    newWord.setAttribute("class", "word");
    newWord.setAttribute("id", `word-${wordNum}`);
    let currentLine = document.getElementById(`line-${index}`);
    currentLine.appendChild(newWord);

    //用字母填充单词盒子
    let letterString = "";
    for (let j = 0; j < line["words"][i].length; j++) {
      letterNum++;
      let letter = line["words"][i][j];
      letterString += `<span class='letter'>${letter}</span>`;
    }
    document.getElementById(`word-${wordNum}`).innerHTML = letterString;
  }
};

const load = (num) => {
  for (let i = 0; i < num; i++) {
    render(i);
  }
};
let num = loadData()["lines"].length,
  wordNum = 0,
  letterNum = 0;
load(num);
const type = function type() {
  let index = 0;
  window.onkeydown = (e, i) => {
    i = index;
    index++;
    checkKey(e, i);
  };
};

const checkKey = function checkKey(e, i) {
  letters = document.getElementsByClassName("letter");

  if (i >= letterNum) return;
  console.log(letters[i].innerHTML.toLowerCase());
  if (letters[i].innerHTML.toLowerCase() == e.key) {
    letters[i].classList.add("on");
  } else {
    letters[i].classList.add("off");
  }
};
