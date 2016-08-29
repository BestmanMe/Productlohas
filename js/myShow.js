window.onload = function(){
	$('section').css('min-height',$(window).height()-80);
	var name = localStorage.getItem('userName');
	if (name == null) {
	    $('#userName').html('未知')
	}
	else{
		$('#userName').html(name);
	}
}