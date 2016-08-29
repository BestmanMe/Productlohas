/*
<div class="dialog">
	<span class="closeBtn">x</span>
	<span class="content"></span>
</div>

*/


/*创建弹出窗窗体，参数为一个配置对象{
		width:300,
		height:200,
		top:0,
		left:0,
		text:"弹出框!",
		boxClass:"dialog-base",
		timer:500
	}
	*/
function dialog(opt){
	this.config={
		width:300,
		height:200,
		top:0,
		left:0,
		text:"弹出框!",
		boxClass:"dialog",
		timer:500,
	};
	/*通过for in循环遍历用户参数对象，并覆盖给似有配置对象config*/
	for(var i in opt){
		//console.log(i);
		this.config[i]=opt[i];
	}
	/*定义属性box，用于保存创建的窗体DOM*/
	this.box=null;
	/*定义属性closeBut，用于保存创建的关闭按钮DOM*/
	this.closeBut=null;
	/*调用初始化函数*/
	this.init();
}

dialog.prototype={
	/*定义初始化函数*/
	init:function(){
		var that=this;
		this.create();
//		this.show();
		this.closeBut.onclick=function(){
			that._delete();
		}
	},
	/*定义显示函数*/
	show:function(){
		this.box.style.cssText="display:block;width:"+this.config.width+"px;height:"+this.config.height+"px;top:"+this.config.top+"px;left:"+this.config.left+"px";
	},
	hide:function(){
		
	},
	/*定义创建元素函数*/
	create:function(){
		var dBox=document.createElement("div");
//		dBox.className="dialog "+this.config.boxClass;
		dBox.className="dialog";
		var closeBut=document.createElement("span");
		closeBut.className="closeBtn";
		closeBut.innerHTML="x";
		var contentBox=document.createElement("a");
		contentBox.href = "register.html";
		contentBox.className="content";
		
		contentBox.innerHTML=this.config.text;
		dBox.appendChild(closeBut);
		dBox.appendChild(contentBox);
		document.getElementsByTagName("body")[0].appendChild(dBox);
		
		this.box=dBox;
		this.closeBut=closeBut;
	},
	/*定义删除元素函数*/
	_delete:function(){
		document.getElementsByTagName("body")[0].removeChild(this.box);
	}
}

