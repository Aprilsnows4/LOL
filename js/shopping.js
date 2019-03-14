//查找ul元素class为shop-top1
var btns=document.querySelectorAll("ul.shop-top1>li.shop-li4>button")
//console.log(btns);
//查找ul元素shop-top1下的所有按钮
//console.log(btns);
//遍历btns中每个按钮，为其绑定单击事件的处理函数
for(var btn of btns ){
//为当前按钮绑定单击事件的处理函数:当 单击时 ...
    btn.onclick=function(){
//this->.前的 当前触发事件的btn
//局部变量btn是this的别名
        var btn=this;
//内部用btn等于用this等于当前单击的按钮+
//btn.style.background="red";
//获得按钮旁边的span
        var span=btn.parentNode.children[1];
//span.style.background="red";
//获得span的内容，转为整数:
        var n=parseInt(span.innerHTML)
//如果btn的内容是+
        if(btn.innerHTML=="+"){
        n++;
//否则 如果n>1
        }else if(n>1){
        n--;
//将n放回span的内容中
        }
        span.innerHTML=n;
//修改小计：
//获得当前btn的父元素的前一个兄弟元素的内容
//再选取1位置到结尾的剩余字符串，转为浮点型
        var price=parseFloat(btn.parentNode.previousElementSibling.innerHTML.slice(1));
//小计sub=数量n*单价price
var sub=price*n;
console.log(sub);
//设置当前的btn的父元素的下一个兄弟元素的内容为//￥sub.00
        btn.parentNode.nextElementSibling.innerHTML=`￥${sub.toFixed(2)}`;
// 计算总计：
//获取 每个数量的小计
var xiaoji=document.querySelectorAll("ul.shop-top1>li.shop-li5")
       // console.log(xiaoji);
//遍历xiaoji下的每个xiao 取其内容 累加 保存到 total中
        var total=0;
        for(var xiao of xiaoji){
                total+=parseFloat(xiao.innerHTML.slice(1));
        }
//总计获得div 的class 为buy_jine
        var div=document.getElementsByClassName("buy_jine")[1];
        console.log(div);
//总计获得 div下的第二个孩子
       var zongji=div.children[1];
       zongji.innerHTML=`￥${total.toFixed(2)}`; 
        
    }	
}