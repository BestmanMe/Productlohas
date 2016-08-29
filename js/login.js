var oUserName = document.getElementById("txt");
var oPass1 = document.getElementById("pass1");
var oPass2 = document.getElementById("pass2");
var oBtn = document.getElementById("btn");
window.onload = function() {
	$(oUserName).bind('blur',testUserName);
	$(oUserName).bind('focus',userNameFocus1);
	$(oPass1).bind('focus',userNameFocus2);
	$(oPass2).bind('focus',userNameFocus3);
	$(oPass1).bind('blur',passTest1);
	$(oPass2).bind('blur',passTest2);
	$(oBtn).bind('click',formTest1);
}

function userNameFocus1() {
	oUserName.parentNode.style.background = '';
	oUserName.parentNode.style.color = '';
	oUserName.value = '';
	oUserName.style.color = '';

}

function userNameFocus2() {
	oPass1.parentNode.style.background = '';
	oPass1.parentNode.style.color = '';
	oPass1.type = 'password';
	oPass1.value = ''
	oPass1.style.color = '';

}

function userNameFocus3() {
	oPass2.parentNode.style.background = '';
	oPass2.parentNode.style.color = '';
	oPass2.type = 'password';
	oPass2.value = ''
	oPass2.style.color = '';
}

function testUserName() {
	var re = /^([1]{1}[3|4|5|7|8]{1}[0-9]{9})|([0-9a-z]{1}\w+@[163|qq]{2,3}\.[com]{3})$/;
	if (oUserName.value == '') {
		oUserName.parentNode.style.background = '#E4366B';
		oUserName.parentNode.style.color = 'white';
		oUserName.value = '请输入账户名！'
		oUserName.style.color = 'white';
	} else {
		if (re.test(oUserName.value)) {
			return true;
		} else {
			oUserName.parentNode.style.background = '#E4366B';
			oUserName.parentNode.style.color = 'white';
			oUserName.value = '帐户名有错！'
			oUserName.style.color = 'white';
			return false;
		}
	}
}

function passTest1() {
	var re = /^[0-9a-z]{6,16}$/;
	if (oPass1.value == '') {
		oPass1.parentNode.style.background = '#E4366B';
		oPass1.parentNode.style.color = 'white';
		oPass1.style.color = 'white';
		oPass1.type = 'text';
		oPass1.value = '不能为空！'
	} else {
		if (re.test(oPass1.value)) {
			return true;
		} else {
			oPass1.parentNode.style.background = '#E4366B';
			oPass1.parentNode.style.color = 'white';
			oPass1.type = 'text';
			oPass1.value = '请输入密码！'

			oPass1.style.color = 'white';
			return false;
		}
	}
}

function passTest2() {
	if (oPass2.value == '') {
		oPass2.parentNode.style.background = '#E4366B';
		oPass2.parentNode.style.color = 'white';
		oPass2.style.color = 'white';
		oPass2.type = 'text';
		oPass2.value = '不能为空！'
	} else {
		if (oPass2.value == oPass1.value) {
			return true;
		} else {
			oPass2.parentNode.style.background = '#E4366B';
			oPass2.parentNode.style.color = 'white';
			oPass2.type = 'text';
			oPass2.value = '与密码保持一致！'
			oPass2.style.color = 'white';
			return false;
		}
	}
}

function getUserInfor() {
	var obj = {
		status: "register",
		userID: $(oUserName).val(),
		password: $(oPass1).val()
	}
	return obj;
}

function formTest1() {
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php", getUserInfor(), function(data){
		console.log(data);
		if (data == 0) {
		    oUserName.parentNode.style.background = '#E4366B';
			oUserName.parentNode.style.color = 'white';
			oUserName.value = '用户名重名！'
			oUserName.style.color = 'white';
		}
		else if (testUserName() && passTest1() && passTest2()&&(data == 1)) {
			window.location = 'register.html';
			return true;
		}else{
			return false;
		}
	})
}
