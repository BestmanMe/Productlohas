/*碰撞检测函数,参数为带有坐标及宽高属性的对象{top:"",left:"",width:"",height:""}*/
var boff = true;
var i = 0;
function crashListener(obj1, obj2, fn) {
	var obj1C = {
		x: obj1.left + obj1.width / 2,
		y: obj1.top + obj1.height / 2,
		rw: obj1.width / 2,
		rh: obj1.height / 2
	};
	var obj2C = {
		x: obj2.left + obj2.width / 2,
		y: obj2.top + obj2.height / 2,
		rw: obj2.width / 2,
		rh: obj2.height / 2
	};
	/*计算中心点坐标横向与纵向的距离，两个元素的宽高半径只和*/
	var crashM = {
		w: Math.abs(obj2C.x - obj1C.x),
		h: Math.abs(obj2C.y - obj1C.y),
		rw: obj1C.rw + obj2C.rw,
		rh: obj1C.rh + obj2C.rh
	};
	/*判断是否碰撞*/

	if (crashM.w < crashM.rw && crashM.h < crashM.rh) {
		if (typeof(fn) == "function") {
			fn();
			i+=10;
			$('.score').html(i);
		} else {
			return true;
		}

	}
	return false;
}

/*获取随机ID*/
function getrandomID(){
	var arr1="qwertyuiopasdfghjklzxcvbnm";
	var id=arr1[Math.floor(Math.random()*26)]+Math.floor(Math.random()*1000)+arr1[Math.floor(Math.random()*26)]+arr1[Math.floor(Math.random()*26)]+Math.floor(Math.random()*1000)+arr1[Math.floor(Math.random()*26)]+Math.floor(Math.random()*1000);
	return id;
}

