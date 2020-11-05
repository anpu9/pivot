window.onload = function () {
  let obj = document.getElementsByClassName("setsize");

  Array.from(obj).forEach((item) => {
    item.style.height = window.getComputedStyle(item).width;
  });
};
window.onresize = function () {
  let obj = document.getElementsByClassName("setsize");
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
    speedBox = speedCircle.getElementsByTagName("p")[0];

  //加入数据
  accaracyBox.innerHTML = getData("accuracy") + "%";
  speedBox.innerHTML = getData("speed") + "wpm";

  //设置角度
  setAngle(accaracyCircle, getData("accuracy"));
  setAngle(speedCircle, getData("speed"));
  //设置星级
  setRank(getData("speed"), getData("accuracy"));
  //显示页面
  wordPage.style.display = "none";
  Resultage.style.visibility = "visible";
};
const setAngle = function setAngle(item, index) {
  let deg = 3.6;
  if (index > 100) {
    index = 100;
  }
  item.style.backgroundImage =
    index <= 50
      ? `linear-gradient(
    90deg,
    #f0f0f0 50%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0)
  ),
  linear-gradient(${deg * index + 90}deg, #38b16b 50%, #f0f0f0 50%, #f0f0f0)`
      : `linear-gradient(-90deg, rgb(56, 177, 107) 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(${
          deg * index - 270
        }deg, rgb(56, 177, 107) 50%, rgb(240, 240, 240) 50%, rgb(240, 240, 240))`;
};
const setRank = function setRank(speed, accaracy) {
  let starsBox = [],
    speedBox = [],
    accaracyBox = [],
    stars,
    speedIndex = 0,
    accaracyIndex = 0;
  for (let i = 0; i < 5; i++) {
    starsBox[i] = 0.5 * (i + 1);
    speedBox[i] = 12 * (i + 1);
    accaracyBox[i] = 18 * (i + 1);
  }
  for (let j = 0; j < 5; j++) {
    if (speed > speedBox[j]) {
      if (j + 1 < 5) {
        speedIndex = j + 1;
      }
    }
    if (accaracy > accaracyBox[j]) {
      if (j + 1 < 5) {
        accaracyIndex = j + 1;
      }
    }
  }
  stars = starsBox[speedIndex] + starsBox[accaracyIndex];
  let container = document.getElementsByClassName("star-container")[0];
  container.innerHTML = stars;
};
