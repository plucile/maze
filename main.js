(function(document) {

    var maze;

    $('#generate').click(function() {
        var width  = parseInt($('#width').val(), 10);
        var height = parseInt($('#height').val(), 10);
        maze = new Maze(width, height, '#content');
        maze.generate();
        window.maze = maze;
    });

    $('#solve').click(function() {
        maze.solve();
    });

})(document);