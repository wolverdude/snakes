Snake.init = function() {

	var STEP_TIME_MSEC = 250
	var $GAME_SPACE = $("#gameSpace");
	var ROWS = 15
	var COLS = 25

	function generateBoard(rows, cols) {
		var gameSpaceHeight = $(window).height() - 100;
		var gameSpaceWidth = $(window).width() - 100;

		var height = Math.floor(gameSpaceHeight / rows);
		var width = Math.floor(gameSpaceWidth / cols);

		if (height < width) {
			width = height
			gameSpaceWidth = width * cols
		} else {
			height = width
			gameSpaceHeight = height * rows
		}

		var gameSquareSide = height - 2

		$GAME_SPACE.css("height", gameSpaceHeight);
		$GAME_SPACE.css("width", gameSpaceWidth);

		_.times(rows, function(rowNum) {
			var $rowDiv = $("<div>");
			$rowDiv.css("height", height)

			_.times(cols, function(colNum) {
				var $colDiv = $("<div>")
				$colDiv.css("width", gameSquareSide)
				$colDiv.css("height", gameSquareSide)
				$colDiv.attr("class", "gameSquare")
				$colDiv.attr("id", rowNum + "-" + colNum)

				$rowDiv.append($colDiv)
			});

			$GAME_SPACE.append($rowDiv)
		});
	}

	var game
	var playLoop

	$("#init").click(function() {
		$(".message").html("You pressed the button!")

		if (playLoop) {
			window.clearInterval(playLoop);
			$GAME_SPACE.find('.snake').removeClass('snake');
			$GAME_SPACE.find('.head').removeClass('head');
			$GAME_SPACE.find('.apple').removeClass('apple');
		}
		game = new Snake.Game(ROWS, COLS)

		_.each(game.board.walls, function(pos) {
			id = "#" + pos.row + "-" + pos.col
			$GAME_SPACE.find(id).addClass('wall');
		});

		playLoop = window.setInterval(function() {
			var diffs = game.step()

			if (diffs === "FAIL") {
				window.clearInterval(playLoop)
				$(".message").html("Snaking FAIL!")
				return
			}

			$GAME_SPACE.find(".head").removeClass('head')

			var newHeadId = "#" + diffs.newHead.row + "-" + diffs.newHead.col
			$GAME_SPACE.find(newHeadId).addClass('snake head')

			if (diffs.oldTail) {
				var oldTailId = "#" + diffs.oldTail.row + "-" + diffs.oldTail.col
				$GAME_SPACE.find(oldTailId).removeClass('snake')
			}

			$GAME_SPACE.find(".apple").removeClass('apple')
			_.each(game.board.apples, function(pos) {
				id = "#" + pos.row + "-" + pos.col
				$GAME_SPACE.find(id).addClass('apple');
			});
		}, STEP_TIME_MSEC);

		key('up', function() { game.snake.turn("north") });
		key('down', function() { game.snake.turn("south") });
		key('right', function() { game.snake.turn("east") });
		key('left', function() { game.snake.turn("west") });

	});

	generateBoard(ROWS, COLS)
}

$(Snake.init)
