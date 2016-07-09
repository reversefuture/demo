/**
 * Created by Administrator on 2016/04/03.
 */
function showNumberAnimation(i,j,randNumber) {
    var numberCell = $('#number-' + i + '-' + j);
    numberCell.css('background-color', getNumberBackColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width: gridLength,
        height: gridLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 80);

}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell=$("#number-"+fromx+"-"+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function updateScore(score){
    $("#score").text(score);
}