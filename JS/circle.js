window.onload = function () {
  setSize("setsize");
};
window.onresize = function () {
  setSize("setsize");
};
const setSize = function setSize(className) {
  let obj = document.getElementsByClassName(className);
  Array.from(obj).forEach((item) => {
    item.style.height = window.getComputedStyle(item).width;
  });
};

const getData = function getData(className) {
  let item = document
    .getElementById(className)
    .getElementsByClassName("data")[0]
    .getElementsByTagName("span")[0];
  return item.innerHTML;
};
const setResult = function setResult() {
  let Resultage = document.getElementsByClassName("progress")[0],
    wordPage = document.getElementById("container"),
    accaracyCircle = document.getElementsByClassName("accaracy-circle")[0],
    speedCircle = document.getElementsByClassName("speed-circle")[0],
    accaracyBox = accaracyCircle.getElementsByTagName("p")[0],
    speedBox = speedCircle.getElementsByTagName("p")[0],
    accaracy = getData("accuracy"),
    speed = getData("speed");

  //加入数据
  accaracyBox.innerHTML = accaracy + "%";
  speedBox.innerHTML = speed + "wpm";

  //设置角度
  setAngle(accaracyCircle, accaracy);
  setAngle(speedCircle, speed);
  //设置星级
  setRank(speed, accaracy);
  //显示页面
  wordPage.style.display = "none";
  Resultage.style.visibility = "visible";
};
const setAngle = function setAngle(item, index) { 
  item.index = index>=50?50:0;
  item.timer = setInterval(() => {
    item.index++;
    if (item.index >= index) {
      clearInterval(item.timer);
    }
    item.style.backgroundImage = getAngle(item, index);
  }, 30);
};
const getAngle = function getAngle(item, index) {
  let func = "";
  if (index > 100) {
    index = 100;
  }
  func =
    index <= 50
      ? `linear-gradient(
        90deg,
        #f0f0f0 50%,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0)
      ),
      linear-gradient(${
        3.6 * item.index + 90
      }deg, #38b16b 50%, #f0f0f0 50%, #f0f0f0)`
      : `linear-gradient(90deg,rgba(0, 0, 0, 0) 50%, rgb(56, 177, 107) 50%,rgb(56, 177, 107) 50%), linear-gradient(${
          3.6 * (item.index-50) +90
        }deg, rgb(240, 240, 240) 50% ,rgb(56, 177, 107) 50%, rgb(56, 177, 107))`;
  return func;
};

const setRank = function setRank(speed, accaracy) {
  let starsBox = [],
    speedBox = [],
    accaracyBox = [],
    stars,
    speedIndex = 0,
    accaracyIndex = 0;
  //初始化标准
  for (let i = 0; i < 5; i++) {
    starsBox[i] = 0.5 * (i + 1);
    speedBox[i] = 12 * (i + 1);
    accaracyBox[i] = 18 * (i + 1);
  }
  //检查符合哪档标准
  for (let j = 0; j < 5; j++) {
    if (j + 1 < 5) {
      if (speed > speedBox[j]) {
        speedIndex = j + 1;
      }
      if (accaracy > accaracyBox[j]) {
        accaracyIndex = j + 1;
      }
    }
  }
  stars = starsBox[speedIndex] + starsBox[accaracyIndex];
  let container = document.getElementsByClassName("star-container")[0];
  container.innerHTML = stars;
};
