
window.onload = function(){
	addList2();
	showOrHide();
	$('#text2').keyup(function(){
		$('#clasiUl2').css('display','block');
		$('#clasiUl2').click(function(event){
			window.event?window.event.cancelBubble=true:event.stopPropagation();
		})
		addSearchList2();//搜索框信息
	})
	$('body').click(function(){
		$('#clasiUl2').css('display', 'none');	
	})
}

//点击列表改变搜索框内容
function content(ul){
	$(ul).find('li').each(function(index){
		$(this).click(function(){
			$('#text2').val($(this).html());
			$(ul).css('display','none');
		})
	})
	$('#text2').focus(function(){
		$(this).val('');
	})
}

//获取商品分类列表数据
function addList2() {
	$.get("http://datainfo.duapp.com/shopdata/getclass.php", function(data) {
		var ul = document.getElementById("ul5");
		var con = '';
		var arr = JSON.parse(data);
		for (var j = 0;j < arr.length;j++) {
			console.log(data[j].classID)
			
			con += '<li classID="'+arr[j].classID+'" className="'+arr[j].className+'">' + arr[j].className + '<i>&#xea42</i></li>';
		}		
		ul.innerHTML = con;
		singleList(ul);//获取单项分类下的数据
	});
}

//商品列表展开或折叠
function showOrHide(){
	$('.all').click(function(){
		if ($('#ul5').get(0).style.display == 'none') {
		    $('#ul5').slideDown(300);
		    $(this).find('i').html('&#xea43');
		}
		else{
			 $('#ul5').slideUp(300);
			 $(this).find('i').html('&#xea41');
		}
	})
}

//获取搜索框数据
function getUserInfor1() {
	var obj = {
		selectText: $('#text2').val(),
		pageCode:"0",
		linenumber:"10"
	}
	return obj;
}

function addSearchList2() {
	$.getJSONP("http://datainfo.duapp.com/shopdata/selectGoodes.php",getUserInfor1(), function(data) {
		var ul = document.getElementById("clasiUl2");
		var con = '';
		for (var i in data) {
			con += '<li>'+data[i].goodsName+'</li>';
		}
		ul.innerHTML = con;
		content(ul)
	});
}

//获取单项分类下的数据
function singleList(ul){
	$(ul).find('li').each(function(index){
		$(this).click(function(){
			window.location = 'classList.html?classID='+$(this).attr('classID')+'&className='+$(this).attr('className');
		})
	})
}


