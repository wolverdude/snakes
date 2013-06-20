Snake = (function() {

	function Game(rows, cols) {
		this.board = new Board(rows, cols)
		this.snake = new Snake({row: 6, col: 6}, "north")
	}

	Game.prototype.step = function() {
		this.snake.updateVel()
		return this.snake.move()
	}

	function Board(rows, cols) {
		this.rows = rows
		this.cols = cols
	}

	function Snake(pos, dir) {
		this.body = [pos]
		this.growths = 2
		this.dir = dir
		this.vel = {row: 2, col: 2} //this ensures that any new direction will work
		this.updateVel()
	}

	Snake.prototype.turn = function(dir) {
		this.dir = dir
	}

	Snake.prototype.updateVel = function() {
		var newVel = { row: 0, col: 0 }

		if (this.dir == "north") { newVel.row -= 1 }
		else if (this.dir == "south") { newVel.row += 1 }
		else if (this.dir == "east") { newVel.col += 1 }
		else if (this.dir == "west") { newVel.col -= 1 }

		// can only make right turns
		if ((this.vel.row + newVel.row !== 0) && (this.vel.col + newVel.col !== 0)){
			this.vel = newVel
		}
		// else vel not updated.
	}

	Snake.prototype.move = function() {
		var headPos = this.body[this.body.length - 1]
		var newHeadPos = {
			row: headPos.row + this.vel.row,
			col: headPos.col + this.vel.col
		}

		this.body.push(newHeadPos)

		if (this.growths) {
			this.growths--
		} else {
			var oldTailPos = this.body.shift()
		}

		return {newHead: newHeadPos, oldTail: oldTailPos }
	}

	return {
		Game: Game
	}
})();