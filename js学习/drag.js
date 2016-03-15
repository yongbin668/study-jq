//在html的head中，加入<script src="js/drag.js"></script>

//首先封装一个通过class获取元素的方法，否则IE10以前的浏览器是不支持的。
function getByClass(clsName,parent){	
	var oParent=parent?document.getElementById(parent):document;
	       eles=[];
	       elements=oParent.getElementsByTagName('*');

	       for(var i=0,l=elements.length;i<l；i++){
	       	if(elements[i].className==clsName){
	       		eles.push(elements[i]);
	       	}
	       }
	       return eles;
}

//页面加载 [在标题栏按下--在页面中移动--释放鼠标时停止移动]
window.onload=drag；//调用drag函数

function drag(){
	varf oTitle=getByClass('login_logo_webqq','loginPanel')[0];	//loginPanel指的是弹出框

	//拖拽【按下鼠标时调用fnDown事件】
	oTitle.onmousedown=fnDown;

	//关闭
	var oClose=document.getElementById('ui_boxyClose');

	oClose.onclick=function (){
		document.getElementById('loginPanel').style.display='none';
	}
}

//封装fnDown函数【按下时移动,根据光标clientX和clientY坐标属性】
function fnDown (event)
		{
		event=event||window.event;
		var oDrag=document.getElementById('loginPanel');
		
		//找到光标按下时光标和面板之间的距离
		disX=event.clientX-oDrag.offsetLeft;
		disY=event.clientY-oDrag.offsetTop;

		//移动
		document.onmousemove=function (event){
			event=event||window.event;
			fnMove(event,disX,disY);
			}
		
		//释放鼠标  【mouseup】
		document.onmouseup=function(){
			document.onmouseover=null;
			document.onmouseup=null;
			}
		}

//封装fnMove函数
function fnMove(e,posX,posY){
	var l=e.clientX-posX;
	      t=e.clientY-posY;
	      winW=document.documentElement.clientWidth||document.body.clientWidth;//获取窗口宽
	      winH=document.documentElement.clientHeight||document.body.clientHeight;
	      maxW=winW-oDrag.offsetWidth-10;	//防止关闭按钮超出界面
	      maxH=winH-oDrag.offsetHeight;

	      //处理宽度和高度超出界面bug
	      if(l<0){
	      	l=0;
	      }else if(l>maxW){
	      	l=maxW;
	      }

	       if(t<0){
	      	t=10;	//防止关闭按钮超出界面
	      }else if(t>maxH){
	      	t=maxH;
	      }
	oDrag.style.left=l+'px';
	oDrag.style.top=t+'px';
}
