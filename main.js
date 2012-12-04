(function(document) {

    var maze;

    $('#generate').click(function() {
        var width  = parseInt($('#width').val(), 10);
        var height = parseInt($('#height').val(), 10);
        maze = new Maze({ width: size*2, height: size });
        maze.render();
        $('#content').html(maze.el);
    });

})(document);