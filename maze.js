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

Maze.N = 1;
Maze.S = 2;
Maze.E = 4;
Maze.W = 8;
Maze.opposite = {
  1: 2,
  2: 1,
  4: 8,
  8: 4
};
Maze.prototype.isNorth = function(x, y, z) {
    return (this.grid[y][x] & Maze.N) === Maze.N;
};
Maze.prototype.isSouth = function(x, y, z) {
    return (this.grid[y][x] & Maze.S) === Maze.S;
};
Maze.prototype.isEast = function(x, y, z) {
    return (this.grid[y][x] & Maze.E) === Maze.E;
};
Maze.prototype.isWest = function(x, y, z) {
    return (this.grid[y][x] & Maze.W) === Maze.W;
};
Maze.prototype.rand = function(n) {
    return Math.floor(Math.random() * n);
};




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
