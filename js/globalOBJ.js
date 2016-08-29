/*创建公共对象*/
var globalOBJ={
	timer:null,
	FBS:20,
	/*参与动画对象数组*/
	joinobj:{},
	ppl:$(".ppl"),
	targetTime:20,
	timeAll:0,
	/*计分盒子*/
	$scoreBox:$(".score"),
	timerAction:function(){
		var that=this;
		var fbs=1000/that.FBS;
		that.timer=setInterval(function(){
			that.timeAll+=fbs;
			//if(that.joinobj.length){
				$.each(that.joinobj,function(i){
					this.move();
				})
			//}
				
		},fbs);
	},
	/*定时器清除*/
	timerClear:function(){
		clearInterval(this.timer);
	},
	/*参与动画对象添加*/
	addjoin:function(obj){
		this.joinobj[obj.id]=obj;
		
	},
	/*在数组中删除相应对象*/
	removejoin:function(id){
		delete this.joinobj[id];
	}
}