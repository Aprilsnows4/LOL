/*周期性定时器*/
//1.定义任务函数
function task(){
//查找class为show 的当前img
var img=document.getElementsByClassName("show")[0];
//将当前img的class为show清除
img.className="";
//如果当img有下一个兄弟元素
if(img.nextElementSibling!=null)
//才设置当前img的下一个兄弟class为show
    img.nextElementSibling.className="show";
//否则
else
//设置当前img的元素为第一个class为show
    img.parentNode.children[0].className="show";
}
//2.启动定时器
    var n=setInterval(task,1000);
//3.停止定时间
    clearInterval(n);
//查找id为carusel的div容器元素
    var car=document.getElementById("carousel");
//当鼠标进入div时
  car.onmouseover=function(){
 //定时器停止    
    clearInterval(n);
  }
 //当鼠标一处div时候 
  car.onmouseout=function(){
 //重新启动定时器       
   n=setInterval(task,3000);
  }
//先写两个按钮
var left=document.getElementsByClassName("btn-left")[0];
var right=document.getElementsByClassName("btn-right")[0];
 left.onclick=function(){
     var sel=this;
     var img=document.getElementsByClassName("show")[0];
     img.className="";
    if(img.previousElementSibling!=null)
     img.previousElementSibling.className="show";
     else
     img.parentNode.lastElementChild.className="show";
 }
 right.onclick=function(){
     task();
 }

