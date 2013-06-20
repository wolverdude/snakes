Snake.init = function() {

	var gameSpace = $("#gameSpace");

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

		gameSpace.css("height", gameSpaceHeight);
		gameSpace.css("width", gameSpaceWidth);

		_.times(rows, function(rowNum) {
			var rowDiv = $("<div>");
			rowDiv.css("height", height)

			_.times(cols, function(colNum) {
				var colDiv = $("<div>")
				colDiv.css("width", gameSquareSide)
				colDiv.css("height", gameSquareSide)
				colDiv.attr("class", "gameSquare")
				colDiv.attr("id", rowNum + "-" + colNum)

				rowDiv.append(colDiv)
			});

			gameSpace.append(rowDiv)
		});
	}

	$("#init").click(function() {
		$(".message").html("You pressed the button!")
	});

	generateBoard(15, 25)
	var space = gameSpace.find("#5-5")
	console.log(space)
	space.addClass('snake')
}

$(Snake.init)
