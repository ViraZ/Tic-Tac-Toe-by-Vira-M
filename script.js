(function () {

    var squares = [],
        _empty = " ",
        _player_turn = "X",
        _computer_turn = "O",
        boardArray = [],
        turnsCount;

    var startNewGame = function () {
            var i,k;
            turnsCount = 0;

            for (i=0;i<3;i++){
                for (k=0;k<3;k++){
                    boardArray[i][k] = _empty;
                    squares[i][k].firstChild.nodeValue = _empty;
                }
            }
        },

        //Returns whether the given score is a winning score.
        checkWin = function (score) {
            var inRow = 0;

            //Check horizontal and vertical
            for (var i=0; i<3; i++){
                inRow = 0;
                for(var k=0; k<3; k++){
                    if (boardArray[i][k]==score){
                        inRow++;
                    }
                }
                if (inRow == 3){
                    return true;
                }
                inRow = 0;

                for(k=0; k<3; k++){
                    if (boardArray[k][i]==score){
                        inRow++;
                    }
                }
                if (inRow == 3){
                    return true;
                }
            }
            //Check main diagonal
            inRow = 0;
            for (i=0;i<3;i++){
                if (boardArray[i][i] == score){
                    inRow++;
                }
            }
              if (inRow == 3){
                return true
            }
            //Check second diagonal
            inRow = 0;
            for (i=0; i<3; i++){
                if (boardArray[i][2-i] == score){
                    inRow++;
                }
            }
            return inRow == 3;
        },
        //cell click event handler - process user turn
        setPlayerMark = function () {
            if (this.firstChild.nodeValue != _empty) {
                return;
            }

            this.firstChild.nodeValue = _player_turn;
            turnsCount += 1;
            boardArray[this.X][this.Y] = _player_turn;
            if (checkWin(_player_turn)) {
                alert("You won!");
                startNewGame();
            } else if (turnsCount === 9) {
                alert("Stalemate!");
                startNewGame();
            } else {
                computerTurns();
                if (checkWin(_computer_turn)){
                    alert("Computer wins");
                    startNewGame();
                }
            }
        };

    var computerTurns = function () {
        var putY = -1;
        var putX = -1;

        if (boardArray[1][1] == _empty){
            putY = 1; putX = 1;
        } else
        if (boardArray[1][1] == _computer_turn){
            for (i=0;i<3;i++){
                if (boardArray[i][0] == _empty){
                    putY = i;
                    putX = 0;
                }
            }

            if (boardArray[0][1]==_computer_turn && boardArray[2][1] == _empty) {
                putY = 2; putX = 1;
            }
            else if (boardArray[2][1]==_computer_turn && boardArray[0][1] == _empty){
                putY = 0; putX = 1;
            }
            else if (boardArray[1][0]==_computer_turn && boardArray[1][2] == _empty){
                putY = 1; putX = 2;
            }
            else if (boardArray[1][2]==_computer_turn && boardArray[1][0] == _empty){
                putY = 1; putX = 0;
            }
            else if (boardArray[0][0]==_computer_turn && boardArray[2][2] == _empty){
                putY = 2; putX = 2;
            }
            else if (boardArray[0][0]==_empty && boardArray[2][2] == _computer_turn){
                putY = 0; putX = 0;
            }
            else if (boardArray[0][2]==_computer_turn && boardArray[2][0] == _empty){
                putY = 2; putX = 0;
            }
            else if (boardArray[0][2]==_empty && boardArray[2][0] == _computer_turn){
                putY = 0; putX = 2;
            }
        }

        else{
            for (var i=2; i>=0; i--){
                for (var k=2; k>=0; k--){
                    if (boardArray[i][k] == _empty){
                        putY = i;
                        putX = k;
                        break;
                    }
                }
                if (putY != -1){
                    break;
                }
            }
        }

        squares[putY][putX].firstChild.nodeValue = _computer_turn;
        boardArray[putY][putX] = _computer_turn;
        turnsCount++;
    };

   var gameInit = function () {
        var board = document.createElement("table"),
            i, j,
            row, rowCell;
        for (i = 0; i < 3; i += 1) {
            //Logical board
            boardArray[i] = [];
            //Real board - array of TD
            squares[i] = [];
            row = document.createElement("tr");
            board.appendChild(row);
            for (j = 0; j < 3; j += 1) {
                rowCell = document.createElement("td");
                boardArray[i][j] = _empty;
                rowCell.onclick = setPlayerMark;
                rowCell.appendChild(document.createTextNode(_empty));
                rowCell.X = i;
                rowCell.Y = j;
                row.appendChild(rowCell);
                squares[i][j] = rowCell;
            }
        }

       var parent = document.getElementById("myGame");
        parent.appendChild(board);
        startNewGame();
    };
    window.onload = gameInit;
}());


