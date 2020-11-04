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
const setResult = function setResult() {
  let Resultage = document.getElementsByClassName("progress")[0],
  wordPage=document.getElementById('container'),
    accaracyCircle = document.getElementsByClassName("accaracy-circle")[0],
    speedCircle = document.getElementsByClassName("speed-circle")[0],
    accaracyBox = accaracyCircle.getElementsByTagName('p')[0],
    speedBox = speedCircle.getElementsByTagName('p')[0];
    wordPage.style.display='none';
    Resultage.style.visibility='visible';

};
if(index===letterNum){
    setResult();
}
console.log(index)