const start = function start() {
  type();
};
const loadData = function loadData() {
  let data = {
    lines: [
      {
        words: ["Let ", "me ", "introduce ", "myself ", "first. ", "My ", "name ", "is ",],
      },
      {
        words: [
          "Tian ",
          "Yuyang. ",
          "I ",
          "like ",
          "front-end ", "programming. ",
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
    wordString = "";

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
    newWord.setAttribute("id", `word-${wordNum}`)
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
let num = loadData()["lines"].length, wordNum = 0, letterNum = 0;
load(num);
const type = function type() {
  console.log('调用type');
  let index = 0;
   window.onkeydown = (e, i) => {
    i = index;
    index++;
    checkKey(e, i)
    console.log('传过去的i:' + i)
    return i;
  }

};
const getString = function getString() {
  let wholeString = "",
    data = loadData()["lines"];
  for (let i = 0; i < num; i++) {
    data[i]["words"].forEach((word) => {
      wholeString += word;
    });
  }
  return wholeString.toLowerCase();
};
const checkKey = function checkKey(e,i) {
 
  console.log(e);
  letters = document.getElementsByClassName("letter");
  console.log('传过来的i:' + i);
  if(i>=letterNum) return;
  console.log(letters[i].innerHTML.toLowerCase())
  if(letters[i].innerHTML.toLowerCase()==e.key){
    letters[i].classList.add('on');
  }else{
    letters[i].classList.add('off');
  }

}
