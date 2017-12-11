/* !Date: 14.11.2017 Copyright ©2017 JavaScript Code by Cătălin Anghel-Ursu @Madness2aMaze (https://codepen.io/Madness2aMaze)
- All Rights Reserved!

MIT License

Copyright (c) 2017 Cătălin Anghel-Ursu (https://github.com/Madness2aMaze/Tic-Tac-Toe-Web-Game)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

$(document).ready(function() {
  var onBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8],
      uiScoreBoard = $(".score-board"),
      uiSwoosh = $("<audio></audio>"),
      uiCheckers = $(".checkers"),
      uiWinnerX = $(".winner-x"),
      uiWinnerO = $(".winner-o"),
      uiHuman = $(".player-hum"),
      uiAi = $(".player-ai"),
      uiGameOver = $("#g-over"),
      uiEndGame = $(".endgame"),
      uiPlayers = $(".players"),
      uiCurtain = $(".curtain"),
      uiXColor = $(".x-color"),
      uiOColor = $(".o-color"),
      uiWinner = $(".win-bg"),
      uiSymbol = $(".symbol"),
      uiScreen = $("#screen"),
      uiChoose = $(".choose"),
      uiOturn = $("#o-turn"),
      uiXturn = $("#x-turn"),
      uiHumScore = $("#hum"),
      uiAiScore = $("#ai"),
      uiCross = $(".cross"),
      uiZero = $(".zero"),
      uiDraw = $(".draw"),
      uiPlay = $(".play"),
      uiCell = $(".cell"),
      cell = {
        "0": "#0",
        "1": "#1",
        "2": "#2",
        "3": "#3",
        "4": "#4",
        "5": "#5",
        "6": "#6",
        "7": "#7",
        "8": "#8"
      },
      uiScore = 0,
      timeoutID,
      round = 0,
      human,
      ai;

  //starting the game
  uiPlay.click(function() {
    uiCurtain.css("display", "none");
    uiPlay.css("display", "none");
    uiScreen.removeClass("invisible");
    uiChoose.removeClass("invisible");
    uiCross.addClass("left-slide-in");
    uiZero.addClass("right-slide-in");
    uiDraw.hide();
  });

  //choosing to play with "X"
  uiCross.click(function() {
    human = "X";
    ai = "O";
    uiCross.addClass("player-color");
    uiCross.addClass("left-slide-out");
    uiZero.addClass("right-slide-out");
    uiScreen.addClass("invisible");
    uiScreen.css("height", "0px");
    uiCell.addClass("visible");
    uiGameOver.hide();
    uiOturn.hide();
    uiXturn.addClass("fade-in");
    uiSymbol.addClass("blink");
    uiScoreBoard.removeClass("invisible");
    uiPlayers.addClass("sink");
  });

  //choosing to play with "O"
  uiZero.click(function() {
    human = "O";
    ai = "X";
    uiCross.addClass("left-slide-out");
    uiZero.addClass("player-color");
    uiZero.addClass("right-slide-out");
    uiScreen.addClass("invisible");
    uiScreen.css("height", "0px");
    uiCell.addClass("visible");
    uiGameOver.hide();
    uiXturn.hide();
    uiOturn.addClass("fade-in");
    uiSymbol.addClass("blink");
    uiScoreBoard.removeClass("invisible");
    uiPlayers.addClass("sink");
  });

  // looping through cells based on id
  $.each(onBoard, function(i) {
    var uiCells = $(cell[i]);

    uiCells.click(function() {
      if (uiCells.html() === "X" || uiCells.html() === "O") {
        //do nothing
      } else {
        if (human === "X" || human === "O") uiCells.addClass("player-color");
      }
      if (uiCells.html() === "X" || uiCells.html() === "O") {
        //do nothing
      } else {
        move(this, human);
        if (human === "X") {
          uiXturn.hide();
          uiOturn.addClass("fade-in");
          uiOturn.show();
        } else if (human === "O") {
          uiXturn.show();
          uiOturn.addClass("fade-in");
          uiOturn.hide();
        }
      }
    });
  });

  //winning combos function
  function winning(offBoard, player) {
    if (
      (offBoard[0] === player &&
       offBoard[1] === player &&
       offBoard[2] === player) ||
      (offBoard[3] === player &&
       offBoard[4] === player &&
       offBoard[5] === player) ||
      (offBoard[6] === player &&
       offBoard[7] === player &&
       offBoard[8] === player) ||
      (offBoard[0] === player &&
       offBoard[4] === player &&
       offBoard[8] === player) ||
      (offBoard[2] === player &&
       offBoard[4] === player &&
       offBoard[6] === player) ||
      (offBoard[0] === player &&
       offBoard[3] === player &&
       offBoard[6] === player) ||
      (offBoard[1] === player &&
       offBoard[4] === player &&
       offBoard[7] === player) ||
      (offBoard[2] === player &&
       offBoard[5] === player &&
       offBoard[8] === player)
    )
      return true;
    else return false;
  }

  //resets the game
  function reset() {
    round = 0;
    onBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    uiCell.html("");
    uiCurtain.css("display", "block");
    uiCurtain.addClass("reboot");
    uiPlay.css("display", "block");
    uiScreen.addClass("invisible");
    uiScreen.css("height", "450px");
    uiChoose.addClass("invisible");
    uiCross.removeClass("left-slide-in");
    uiZero.removeClass("right-slide-in");
    uiCross.removeClass("left-slide-out");
    uiZero.removeClass("right-slide-out");
    uiCell.removeClass("visible");
    uiCell.removeClass("invisible");
    uiCell.removeClass("player-color");
    uiCell.css("display", "");
    uiCheckers.css("display", "");
    uiZero.removeClass("player-color");
    uiCross.removeClass("player-color");
    uiEndGame.addClass("invisible");
    uiWinner.removeClass("fade-in");
  }

  function move(el, player) {
    var id = el.id;
    //console.log(id);

    if (onBoard[id] != human && onBoard[id] != ai) {
      round++;
      onBoard[id] = player;
      $(el).html(player);

      if (winning(onBoard, player)) {
        setTimeout(function() {
          alert("This time You Won");
          reset();
        }, 600);
        return;
      } else if (round > 8) {
        setTimeout(function() {
          //alert("Hey at least is was a Draw :)");
          uiCheckers.css("display", "none");
          uiChoose.addClass("invisible");
          uiScreen.addClass("invisible");
          uiScreen.css("height", "0px");
          uiCell.css("display", "none");
          uiEndGame.removeClass("invisible");
          uiWinner.addClass("fade-in");
          uiXturn.hide();
          uiOturn.hide();
          uiGameOver.show();
          uiGameOver.addClass("fade-in");
          uiWinnerX.hide();
          uiWinnerO.hide();
          uiDraw.show();
        }, 600);
        setTimeout(function() {
          reset();
        }, 3000);
        return;
      } else {
        round++;
        var index = minimax(onBoard, ai).index;
        function aiMove() {
          var selector = "#" + index;
          $(selector).html(ai);
          if (ai === "X") {
            uiXturn.hide();
            uiOturn.show();
          } else if (ai === "O") {
            uiXturn.show();
            uiOturn.hide();
          }
        }
        timeoutID = window.setTimeout(aiMove, 300);
        onBoard[index] = ai;
        if (winning(onBoard, ai)) {
          setTimeout(function() {
            //alert("This time You Lost");
            uiCheckers.css("display", "none");
            uiChoose.addClass("invisible");
            uiScreen.addClass("invisible");
            uiScreen.css("height", "0px");
            uiCell.css("display", "none");
            uiEndGame.removeClass("invisible");
            uiWinner.addClass("fade-in");
            uiXturn.hide();
            uiOturn.hide();
            uiGameOver.show();
            uiGameOver.addClass("fade-in");
            if (ai === "X") {
              uiWinnerO.hide();
              uiWinnerX.show();
            } else if (ai === "O") {
              uiWinnerX.hide();
              uiWinnerO.show();
            }
            uiScore++;
            uiAiScore.text(uiScore);
          }, 600);
          setTimeout(function() {
            reset();
          }, 3000);
          return;
        }
      }
    }
  }

  function empty(offBoard) {
    return offBoard.filter(c => c != human && c != ai);
  }

  function minimax(offBoard, player) {
    var clear = empty(offBoard);

    if (winning(offBoard, human)) {
      return {
        score: -10
      };
    } else if (winning(offBoard, ai)) {
      return {
        score: 10
      };
    } else if (clear.length == 0) {
      return {
        score: 0
      };
    }

    var moves = [];
    $.each(clear, function(i) {
      var move = {
        index: offBoard[clear[i]]
      };
      offBoard[clear[i]] = player;
      var mix;
      if (player == ai) {
        mix = minimax(offBoard, human);
      } else {
        mix = minimax(offBoard, ai);
      }
      move.score = mix.score;
      offBoard[clear[i]] = move.index;
      moves.push(move);
    });

    var bestMove, bestScore;
    if (player == ai) {
      bestScore = -100000;
      $.each(moves, function(i) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      });
    } else {
      bestScore = 100000;
      $.each(moves, function(i) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      });
    }
    return moves[bestMove];
  }
});
