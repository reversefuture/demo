// 提示
function toast(toastStr,duration) {
	var toastDiv = $('<div class = "toast"><p></p></div>');
	toastDiv.find('p').text(toastStr);

	var $body = $('body');
	$body.append(toastDiv);
	toastDiv.show();
	setTimeout(function(){
		toastDiv.hide();
		toastDiv.remove();
	},duration);
	
}
	