var Maze = window.Maze = function(width, height) {
    if (!(this instanceof Maze)) {
        return new Maze(options);
    }
    this.width = width;
    this.height = height;
    this.initGrid();
};

Maze.prototype.initGrid = function() {
    // Genererate maze data structure 
    var width = this.width,
        height = this.height,
        grid = this.grid = new Array(height);
    for (var y = 0; y < height; y++) {
        grid[y] = new Array(width);
        for (var x = 0; x < width; x++) {
            grid[y][x] = 0;
        }
    }
};

Maze.prototype.generate = function() {
    console.log('Maze:generate:start');
    this.carvePassageFrom(0, 0);
    this.grid[0][0] |= Maze.W;
    this.grid[this.height - 1][this.width - 1] |= Maze.E;
    console.log('Maze:generate:end');
};

Maze.prototype.carvePassageFrom = function(x, y) {
    var directions = _.shuffle(Maze.List);
    _.each(directions, function(direction) {
        var nx = x + Maze.dx[direction],
            ny = y + Maze.dy[direction];

        if (ny >= 0 && ny < this.grid.length &&
            nx >= 0 && nx < this.grid[ny].length &&
            this.grid[ny][nx] === 0) {
            this.grid[y][x] |= direction;
            this.grid[ny][nx] |= Maze.opposite[direction];
            this.carvePassageFrom(nx, ny);
        }
    }, this);
};

Maze.N = 1;
Maze.S = 2;
Maze.E = 4;
Maze.W = 8;
Maze.List = [1, 2, 4, 8];
Maze.dx = {
    1: 0,
    2: 0,
    4: 1,
    8: -1
};
Maze.dy = {
    1: -1,
    2: 1,
    4: 0,
    8: 0
};
Maze.opposite = {
    1: 2,
    2: 1,
    4: 8,
    8: 4
};
Maze.prototype.isNorth = function(x, y) {
    return (this.grid[y][x] & Maze.N) === Maze.N;
};
Maze.prototype.isSouth = function(x, y) {
    return (this.grid[y][x] & Maze.S) === Maze.S;
};
Maze.prototype.isEast = function(x, y) {
    return (this.grid[y][x] & Maze.E) === Maze.E;
};
Maze.prototype.isWest = function(x, y) {
    return (this.grid[y][x] & Maze.W) === Maze.W;
};
Maze.prototype.isOpenSide = function(cell, direction) {
    return (cell & direction) === direction;
};





Maze.prototype.createCell = function(cell) {
    var cellEl = $('<div>').addClass('cell');
    if (this.isOpenSide(cell, Maze.N)) {
        cellEl.addClass('n');
    }
    if (this.isOpenSide(cell, Maze.S)) {
        cellEl.addClass('s');
    }
    if (this.isOpenSide(cell, Maze.E)) {
        cellEl.addClass('e');
    }
    if (this.isOpenSide(cell, Maze.W)) {
        cellEl.addClass('w');
    }
    return cellEl.get(0);
};

Maze.prototype.createRow = function(row) {
    var rowEl = $('<div>').addClass('row');
    var cells = _.map(row, this.createCell, this);
    return rowEl.append(cells).get(0);
};

Maze.prototype.render = function() {
    var gridEl = $('<div>').attr('id', 'grid');
    var elements = _.map(this.grid, this.createRow, this);
    this.el = gridEl.append(elements).get(0);
};




