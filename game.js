function startGame () {
    for (let i = 0; i < 10; i ++) {
        globs.push(new Glob());
    }

    for (let i = 0; i < 3; i ++) {
        globs.push(new Glob(random(6, 15)));
    }
}

function reset () {
    two.remove(layerTwo, layerOne);
    layerTwo = two.makeGroup();
    layerOne = two.makeGroup();

    globs = [];

    cursor = new Cursor();

    startGame();
}