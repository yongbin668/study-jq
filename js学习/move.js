function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, json, fn)
{	
	flag=true;	//定义标杆，假设所有运动都到达目标值
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		for(var attr in json)
		{
		//1.取当前的值
		var iCur=0;
		
		if(attr=='opacity')
		{
			iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		//2.算速度
		var iSpeed=(json[attr]-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		//3.检测停止
		if(iCur!=json[attr])
		{
			flag=false;			
		}		
		if(attr=='opacity')
		{
			obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
			obj.style.opacity=(iCur+iSpeed)/100;
		}
		else
		{
			obj.style[attr]=iCur+iSpeed+'px';
		}		
	     }
	     if(flag)
	     {
	     	clearInterval(obj.timer);
	     	if(fn)
	     	{
	     		fn();
	     	}
	     }
	}, 10)
}