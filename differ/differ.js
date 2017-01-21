var leftText='';
var rightText='';
var leftShowText='';
var rightShowText='';
var diffLines=[];



function start(){
	var leftTextArr = [];
var rightTextArr = [];
var leftShowTextArr = [];
var rightShowTextArr = [];
var leftTextdiffArr = [];
var rightTextdiffArr = [];
	var newLineText = '';
	var curLineIndex = 0;
	leftText = $('#leftInp').val();
	rightText = $('#rightInp').val();
	for (var i = 0; i < leftText.length; i++) {
		if(leftText[i] === '\n' || i === leftText.length-1){
			newLineText = leftText.slice(curLineIndex,i+1);
			console.log(newLineText);
			curLineIndex = i+1;
			leftTextArr.push(newLineText);
		}
	}
	for (var i = 0; i < rightText.length; i++) {
		if(rightText[i] === '\n' || i === rightText.length-1){
			newLineText = rightText.slice(curLineIndex,i+1);
			console.log(newLineText);
			curLineIndex = i+1;
			rightTextArr.push(newLineText);
		}
	}

	var lineNum = Math.max(leftTextArr.length,rightTextArr.length);
	console.log(lineNum);

	var start =0;
	var end=0;

	var i=0;

	while(i<lineNum){
		if(leftTextArr[i] ===rightTextArr[i]){
			leftShowTextArr.push(leftTextArr[i]);
			rightShowTextArr.push(rightTextArr[i]);
			i++;
		}else{
			start = i;
			for(var j = i;j<lineNum;j++){
				if(leftTextArr[i] === rightTextArr[j]){
					end = j;
					
					break;
				}
				leftShowTextArr.push('');
				rightShowTextArr.push(rightTextArr[j]);
			}
			i+=(start-end);
		}
	}

	console.log(leftShowTextArr + 'leftShowText');
	console.log(rightShowTextArr + 'rightShowText');



	console.log(JSON.stringify(leftText));
	console.log(JSON.stringify(rightText));

}




$('#btnStart').click(function () {
	start()
})