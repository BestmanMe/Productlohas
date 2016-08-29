/*通过立即执行函数封装jQuery方法*/ ;
(function($) {
	/*定义getJSONP方法，用于通过jsonp方式请求跨域接口,参数（接口地址，提交的参数，回调函数）*/
	$.getJSONP = function(url, data, fn) {
		var cfn = null;
		var thisdata = null;
		/*判断第二个参数是否传入*/
		if (typeof(data) == "function") {
			cfn = data;
		} else if (typeof(fn) == "function") {
			cfn = fn;
			thisdata = data;
		} else {
			thisdata = data;
		}
		/*调用jquery原生ajax方法*/
		$.ajax({
			url: url,
			data: thisdata,
			dataType: "jsonp",
			success: function(data) {
				if (cfn) {
					cfn(data);
				}
			}
		})
	}
})(jQuery)

var userName = document.getElementById("registerTxt");
var oPassword = document.getElementById("registerPass");
var showPass = document.getElementById("showPass");
var rememberPass = document.getElementById("rememberPass");
var registerSub = document.getElementById("registerSub");

window.onload = function() {
	$(userName).bind('blur',testUserName);
	$(userName).bind('focus',userNameFocus1);
	$(oPassword).bind('focus',userNameFocus2);
	$(oPassword).bind('blur',passTest1);
	$(registerSub).bind('click',formTest2);
	$(showPass).bind('click',showPassword);
//	$(rememberPass).bind('click',rememberPassWord);
}

function testUserName() {
	var re = /^([1]{1}[3|4|5|7|8]{1}[0-9]{9})|([0-9a-z]{1}\w+@[163|qq]{2,3}\.[com]{3})$/;
	if (userName.value == '') {
		userName.parentNode.style.background = '#E4366B';
		userName.parentNode.style.color = 'white';
		userName.value = '请输入账户名！'
		userName.style.color = 'white';
	} else {
		if (re.test(userName.value)) {
			return true;
		} else {
			userName.parentNode.style.background = '#E4366B';
			userName.parentNode.style.color = 'white';
			userName.value = '帐户名有错！'
			userName.style.color = 'white';
			return false;
		}
	}
}

function userNameFocus1() {
	userName.parentNode.style.background = '';
	userName.parentNode.style.color = '';
	userName.value = '';
	userName.style.color = '';
}

function userNameFocus2() {
	oPassword.parentNode.style.background = '';
	oPassword.parentNode.style.color = '';
	oPassword.type = 'password';
	oPassword.value = ''
	oPassword.style.color = '';
}

function passTest1() {
	var re = /^[0-9a-z]{6,16}$/;
	if (oPassword.value == '') {
		oPassword.parentNode.style.background = '#E4366B';
		oPassword.parentNode.style.color = 'white';
		oPassword.style.color = 'white';
		oPassword.type = 'text';
		oPassword.value = '不能为空！'
	} else {
		if (re.test(oPassword.value)) {
			return true;
		} else {
			oPassword.parentNode.style.background = '#E4366B';
			oPassword.parentNode.style.color = 'white';
			oPassword.type = 'text';
			oPassword.value = '请输入密码！'
			oPassword.style.color = 'white';
			return false;
		}
	}
}

function getUserInfor() {
	var obj = {
		status: "login",
		userID: $(userName).val(),
		password: $(oPassword).val()
	}
	return obj;
}

function formTest2() {
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",getUserInfor(), function(data) {
		if (data == 0) {
		    userName.parentNode.style.background = '#E4366B';
			userName.parentNode.style.color = 'white';
			userName.value = '用户名不存在！';
			userName.style.color = 'white';
		}
		else if(data == 2){
			oPassword.parentNode.style.background = '#E4366B';
			oPassword.parentNode.style.color = 'white';
			oPassword.type = 'text';
			oPassword.value = '用户名密码不符！'
			oPassword.style.color = 'white';
		}
		else if (testUserName()&&passTest1()&&((data != 0)&&(data != 2))) {
			localStorage.setItem('userName',userName.value);
		    window.location = 'scene.html';
		}
	})
}
function showPassword(){
	if (oPassword.type == 'password') {
	    oPassword.type = 'text';
	}
	else{
		oPassword.type = 'password';
	}
}






