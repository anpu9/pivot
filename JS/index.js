let time = 0,
  wordTime = 0,
  keysIn = 0,
  keysRight = 0,
  index = 0,
  timer,
  wordTimer,
  updateTimer;
const start = function start(e) {
  type();
  //使start提示消失,初始化开始和暂停按钮
  e.style.display = "none";
  let btn = document.getElementById("update");
  btn.style.display = "inline-block";
  btn.innerHTML = "❚ ❚";
  btn.setAttribute("isPlay", true);
  timer = setInterval(getForward, 1000);
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
          "programming,",
        ],
      },
      {
        words: ["and ", "stay ", "hungry ", "forever."],
      },
    ],
  };
  return data;
};
const updateBtn = function updateBtn() {
  let btn = document.getElementById("update");
  (flag = btn.getAttribute("isPlay")), (icon = "");
  if (flag === "true") {
    flag = "false";
    icon = "►";
    clearInterval(timer);
  } else {
    flag = "true";
    icon = "❚ ❚";
    timer = setInterval(getForward, 1000);
  }
  flag = btn.setAttribute("isPlay", flag);
  btn.innerHTML = icon;
};

const getForward = function getForward() {
  time++;
};
//渲染
const load = (num) => {
  for (let i = 0; i < num; i++) {
    render(i);
  }
  let process = document.createElement("div"),
    container = document.getElementById("container");
  process.setAttribute("class", "process");
  process.innerHTML = '<div class="process-filled"><div>';
  container.appendChild(process);
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
      letterString += `<span class='letter' id='letter-${letterNum}'>${letter}</span>`;
    }
    document.getElementById(`word-${wordNum}`).innerHTML = letterString;
  }
};
let num = loadData()["lines"].length,
  wordNum = 0,
  letterNum = 0;
load(num);
//检查键值
const type = function type() {
  window.onkeydown = (e, i) => {
    let btn = document.getElementById("update");
    flag = btn.getAttribute("isPlay");
    if (flag == "false") {
      updateBtn();
    }
    i = index;
    index++;

    if (index >= letterNum - 1) {
      if (index < letterNum) {
        setResult();
      }
      return;
    }
    setProgress(index);
    checkKey(e, i);
    loadCheer(index);
    updateAccuracy(index);
    updateSpeed();
  };
};
const setProgress = function (index) {
  let rate = Math.ceil((index / letterNum) * 100),
    processBar = document.getElementsByClassName("process-filled")[0];
  processBar.style.flexBasis = `${rate}%`;
};
const checkKey = function checkKey(e, i) {
  letters = document.getElementsByClassName("letter");

  if (i >= letterNum) return;
  keysIn++;

  if (letters[i].innerHTML.toLowerCase() == e.key) {
    letters[i].classList.add("on");
    keysRight++;
    playAudio(0);
  } else {
    letters[i].classList.add("off");
    playAudio(1);

  }
};
const updateSpeed = function updateSpeed() {
  let nowWord = isCompleted(keysIn)[1].substr(5), //完整输入单词的个数
    speedBox = document.getElementById("speed"),
    speed = Math.ceil((nowWord / time) * 60);
  if (speed === Infinity) {
    return;
  }
  if (nowWord > 1) {
    speedBox.style.visibility = "visible";
  }
  let speedString = `<div class='title'>Speed</div><div class='data'><span>${speed}</span><span class='wpm'>WPM</span></div>`;
  speedBox.innerHTML = speedString;
};
const isCompleted = function isCompleted(i) {
  let letter = document.getElementsByClassName("letter")[i - 1],
    word = letter.parentNode,
    letters = word.childNodes,
    lettersArr = Array.from(letters),
    wordId = word.getAttribute("id");

  //更新每个单词的输入速度
  if (word.firstChild === letter) {
    setTime();
  }
  if (word.lastChild === letter) {
    clearInterval(wordTimer);
    loadSpeed(wordTime, word);

    wordTime = 0; //再次初始化
  }
  let flag = lettersArr.every((letter) => {
    let flag =
      letter.classList.contains("off") || letter.classList.contains("on");
    return flag;
  });

  return [flag, wordId];
};

const setTime = function setWordTime() {
  clearInterval(wordTimer);
  wordTimer = setInterval(() => {
    wordTime += 0.1;
  }, 100);
};
const loadSpeed = function loadWordSpeed(t, parent) {
  let wordSpeed = Math.ceil(60 / t);
  if (wordSpeed === Infinity) {
    return;
  }
  let wordSpeedBox = document.createElement("div");
  wordSpeedBox.setAttribute("class", "speed-box");
  let speedString = `${wordSpeed}<span>wpm</span>`;
  wordSpeedBox.innerHTML = speedString;
  parent.appendChild(wordSpeedBox);
};
const loadCheer = function cheerMessages(i) {
  let letter = document.getElementsByClassName("letter")[i - 1],
    p = letter.parentNode;
  childs = Array.from(p.childNodes);
  let flag = childs.every((child) => {
    let flag = child.classList.contains("on");
    return flag;
  });
  if (flag) {
    let messageBox = document.createElement("div");
    messageBox.setAttribute("class", "message-box");
    messageBox.innerHTML = "nice!";
    p.appendChild(messageBox);
  }
};
const updateAccuracy = function updateAccuracy() {
  let accuracy = Math.round((keysRight / keysIn) * 100),
    container = document.getElementById("accuracy");
  accuracyString = `<div class='title'>Accuracy</div><div class='data'><span>${accuracy}</span><span>%</span></div>`;
  container.innerHTML = accuracyString;
  if (keysIn > 5) {
    container.style.visibility = "visible";
  }
};
const playAudio = function playAudio(index) {
  let audio = document.getElementsByTagName("audio")[index];
  let duration = 0.5;
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, duration * 1000);
  audio.currentTime = 0;
};