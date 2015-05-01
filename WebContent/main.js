


var M = 4;
//var intarr = [[16, 4, 2, 0], [8, 64, 16, 32], [32, 2, 128, 2], [2, 4, 2, 2]];
var intarr = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var arrStack = [];
var scoreStack = [];

//存储当前状态
function restoreState()
{
	var arr = getEmptyIntArr();
	for(var i = 0 ; i < M ; i++)
	{
		for(var j = 0 ; j< M ;j++)
		{
			arr[i][j] = intarr[i][j];
		}
		
	}
	arrStack.push(arr);
}
//回复栈顶元素到数组中
function undoState()
{
	var arr = arrStack.pop();
	intarr = arr;
}

//获取一个新的数组
function getEmptyIntArr()
{
	var arr = new Array();
	arr[0] = [0,0,0,0];
	arr[1] = [0,0,0,0];
	arr[2] = [0,0,0,0];
	arr[3] = [0,0,0,0];
	return arr;
}

//在div中输出内容
function print() {
    for (var i = 0; i < M ; i++)
        for (var j = 0; j < M ; j++) {
            if (intarr[i][j] > 0) {
                $("#" + i + "_" + j).html(intarr[i][j]);
                var b = Math.abs(255 - intarr[i][j]*10);
                if (b < 200) {
                    $("#" + i + "_" + j).css({"color":"white"});
                } else {
                    $("#" + i + "_" + j).css({ "color": "black" });
                }
                $("#" + i + "_" + j).css({ "background-color": "rgb(220," + b + "," + b + ")" });
            } else {
                $("#" + i + "_" + j).html("");
                $("#" + i + "_" + j).css({ "background-color": "#EEEEEE" });
            }
        }
}

//合并两个相同的单元格内容
function combine(dir)
{
    var move = false;
    if (dir == 40){//向下运动
        for (var i = 0 ; i < M ; i++) {
            for (var j = M - 1 ; j > 0 ; j--) {
                if (intarr[j][i] != 0 && intarr[j - 1][i] == intarr[j][i])
                {
                    intarr[j][i] += intarr[j - 1][i];
                    intarr[j - 1][i] = 0;
                    move = true;
                }
            }
        }
    }
    if (dir == 39) {//向右
        for (var i = 0 ; i < M ; i++) {
            for (var j = M - 1 ; j > 0 ; j--) {
                if (intarr[i][j] != 0 && intarr[i][j - 1] == intarr[i][j]) {
                    intarr[i][j] += intarr[i][j - 1];
                    intarr[i][j - 1] = 0;
                    move = true;
                }
            }
        }
    }
    if (dir == 38) { //上 keyCode 38
        for (var i = 0 ; i < M ; i++) {
            for (var j = 0 ; j < M-1 ; j++) {
                if (intarr[j][i] != 0 && intarr[j + 1][i] == intarr[j][i]) {
                    intarr[j][i] += intarr[j + 1][i];
                    intarr[j + 1][i] = 0;
                    move = true;
                }
            }
        }
    }
    if (dir == 37) { //37 左
        for (var i = 0 ; i < M ; i++) {
            for (var j = 0 ; j < M-1 ; j++) {
                if (intarr[i][j] != 0 && intarr[i][j + 1] == intarr[i][j]) {
                    intarr[i][j] += intarr[i][j + 1];
                    intarr[i][j + 1] = 0;
                    move = true;
                }
            }
        }
    }
    return move;
}

//压缩
function press(dir) {
    var move = false;
    if (dir == 40) {///向下运动 40
        for (var i = 0 ; i < M ; i++) {
            for (var j = M - 1 ; j > 0 ; j--) {
                if (intarr[j][i] == 0) {
                    for (var k = j - 1 ; k >= 0 ; k--) {
                        if (intarr[k][i] != 0) {
                            var t = intarr[j][i];
                            intarr[j][i] = intarr[k][i];
                            intarr[k][i] = t;
                            move = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    if (dir == 39) {///向右运动 坐标增大，从下向上 39
        for (var i = 0 ; i < M ; i++) {
            for (var j = M - 1 ; j > 0 ; j--) {
                if (intarr[i][j] == 0) {
                    for (var k = j - 1 ; k >= 0 ; k--) {
                        if (intarr[i][k] != 0) {
                            var t = intarr[i][j];
                            intarr[i][j] = intarr[i][k];
                            intarr[i][k] = t;
                            move = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    if (dir == 38) { //上 keyCode 38
        for (var i = 0 ; i < M ; i++) {
            for (var j = 0 ; j < M ; j++) {
                if (intarr[j][i] == 0) {
                    for (var k = j + 1 ; k < M ; k++) {
                        if (intarr[k][i] != 0) {
                            var t = intarr[j][i];
                            intarr[j][i] = intarr[k][i];
                            intarr[k][i] = t;
                            move = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    if (dir == 37) { //37 左
        for (var i = 0 ; i < M ; i++) {
            for (var j = 0 ; j < M ; j++) {
                if (intarr[i][j] == 0) {
                    for (var k = j + 1 ; k < M ; k++) {
                        if (intarr[i][k] != 0) {
                            var t = intarr[i][j];
                            intarr[i][j] = intarr[i][k];
                            intarr[i][k] = t;
                            move = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    return move;
}

function generate()
{
    var mayLose = false;
    var arr = [];
    for (var i = 0; i < M; i++) {
        for (var j = 0 ; j < M ; j++) {
            if (intarr[i][j] == 0) {
                arr.push({x:i,y:j});
            }
        }
    }
    if (arr.length == 1)
    {
        mayLose = true;
    }
    var ran = Math.floor(Math.random() * 100) % arr.length;
    intarr[arr[ran].x][arr[ran].y] = 2;
    return mayLose;
}

function isLose()
{
    var lose = true;
    for (var i = 0 ; i < M-1 ; i++)
    {
        for (var j = 0 ; j < M-1 ; j++)
        {
            if (intarr[i][j] != 0) {
                if (intarr[i][j] == intarr[i][j + 1] || intarr[j][i] == intarr[j + 1][i]) {
                    lose = false;
                    return lose;
                }
            } else {
                lose = false;
                return lose;
            }
              
            
        }
    }

    for (var i = 0; i < M-1 ; i++) {
        if (intarr[i][M - 1] == intarr[i + 1][M - 1]){
            lose = false;
        }
        if (intarr[M - 1][i] == intarr[M - 1][i + 1]) {
            lose = false;
        }
    }
    return lose;
    
}