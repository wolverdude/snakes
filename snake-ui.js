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

	game = new Snake.Game()

	$("#init").click(function() {
		$(".message").html("You pressed the button!")


		window.setInterval(function() {
			var diffs = game.step()

			$GAME_SPACE.find(".head").removeClass('head')

			var newHeadId = "#" + diffs.newHead.row + "-" + diffs.newHead.col
			$GAME_SPACE.find(newHeadId).addClass('snake head')

			if (diffs.oldTail) {
				var oldTailId = "#" + diffs.oldTail.row + "-" + diffs.oldTail.col
				$GAME_SPACE.find(oldTailId).removeClass('snake')
			}
		}, STEP_TIME_MSEC);

		key('up', function() { game.snake.turn("north") });
		key('down', function() { game.snake.turn("south") });
		key('right', function() { game.snake.turn("east") });
		key('left', function() { game.snake.turn("west") });

	});

	generateBoard(ROWS, COLS)
	var space = $GAME_SPACE.find("#5-5")
	console.log(space)
	space.addClass('apple')
	$GAME_SPACE.find("#7-7").addClass('wall')
}

$(Snake.init)
