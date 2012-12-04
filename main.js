(function(document) {

    var maze;

    $('#generate').click(function() {
        var width  = parseInt($('#width').val(), 10);
        var height = parseInt($('#height').val(), 10);
        maze = new Maze(width, height);
        maze.generate();
        // render();
        // $('#content').html(maze.el);
    });

})(document);