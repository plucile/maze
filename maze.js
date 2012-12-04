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
Maze.prototype.isDirection = function(x, y, direction) {
    return (this.grid[y][x] & direction) === direction;
}





Maze.prototype.createCell = function(index) {
    var el = document.createElement('div');
    el.setAttribute('id', 'cell_' + index);
    return el;
};

Maze.prototype.createRow = function(size, index) {
    var row = document.createElement('div');
    row.setAttribute('id', 'row_' + index);
    _(size).times(function(index) {
        var cell = createCell(index);
        row.appendChild(cell);
    });
    return row;
};

Maze.prototype.createGrid = function(size) {
    var grid = document.createElement('div');
    grid.setAttribute('id', 'grid');
    _(size).times(function(index) {
        var row = createRow(size, index);
        grid.appendChild(row);
    });
    return grid;
};

Maze.prototype.render = function() {
    console.log('Maze:render');
};
