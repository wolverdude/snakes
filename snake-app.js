Snake = (function() {

	function Game(rows, cols) {
		this.board = new Board(rows, cols, 2);
		this.snake = new Snake({row: 0, col: 10}, "south", 3);
	}

	Game.prototype.step = function() {
		this.snake.updateVel();
		return this.snake.move(this.board);
	}

	function Board(rows, cols, numApples) {
		this.rows = rows;
		this.cols = cols;
		this.walls = this.edges()
		this.apples = this.randomApples(numApples);
	}

	Board.prototype.edges = function() {
		var that = this
		var edges = []

		_.each([0, that.rows - 1], function(row) {
			_.times(that.cols, function(col) {
				edges.push({row: row, col: col});
			});
		});
		_.each([0, that.cols - 1], function(col) {
			_.times(that.rows, function(row) {
				edges.push({row: row, col: col});
			});
		});

		return edges
	}

	Board.prototype.randomApples = function(numApples) {
		var that = this
		var apples = [];
		_.times(numApples, function() {
			apples.push({
				row: Math.floor((that.rows - 2) * Math.random() + 1),
				col: Math.floor((that.cols - 2) * Math.random() + 1)
		  });
		});

		return apples
	}

	Board.prototype.isWall = function(pos) {
		return _.any(this.walls, function(wallPos) {
			return (wallPos.row === pos.row && wallPos.col === pos.col);
		});
	}

	Board.prototype.eatApple = function(pos) {
		var apples = _.select(this.apples, function(wallPos) {
			return (wallPos.row !== pos.row || wallPos.col !== pos.col);
		});
		if (apples.length !== this.apples.length) {
			this.apples = apples.concat(this.randomApples(1))
			return true
		}
	}

	function Snake(pos, dir, size) {
		this.body = [pos];
		this.growths = size - 1;
		this.dir = dir;
		this.vel = {row: 2, col: 2}; //this ensures that any new direction will work
		this.updateVel();
	}

	Snake.prototype.turn = function(dir) {
		this.dir = dir;
	}

	Snake.prototype.updateVel = function() {
		var newVel = { row: 0, col: 0 };

		if (this.dir == "north") { newVel.row -= 1 }
		else if (this.dir == "south") { newVel.row += 1 }
		else if (this.dir == "east") { newVel.col += 1 }
		else if (this.dir == "west") { newVel.col -= 1 }

		// can only make right turns
		if ((this.vel.row + newVel.row !== 0) && (this.vel.col + newVel.col !== 0)){
			this.vel = newVel;
		}
		// else vel not updated.
	}

	Snake.prototype.move = function(board) {
		var headPos = this.body[this.body.length - 1]
		var newHeadPos = {
			row: headPos.row + this.vel.row,
			col: headPos.col + this.vel.col
		}

		if (board.isWall(newHeadPos) || this.isSnake(newHeadPos)) {
			return "FAIL";
		}

		this.body.push(newHeadPos);

		if (this.growths) {
			this.growths--;
		} else {
			var oldTailPos = this.body.shift();
		}

		if (board.eatApple(newHeadPos)) { this.growths++; }

		return {newHead: newHeadPos, oldTail: oldTailPos }
	}

	Snake.prototype.isSnake = function(pos) {
		return _.any(this.body, function(bodyPos) {
			return (bodyPos.row === pos.row && bodyPos.col === pos.col);
		});
	}

	return {
		Game: Game
	}
})();