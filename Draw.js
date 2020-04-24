function draw() {
    if (index < walls.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        currentWall = walls[index];
        algo();

        cells.forEach(cell => cell.show());
        walls.forEach(wall => wall.show());
        index++;
    }
}

function removeWalls(current, next) {
    if (current.y < next.y) {
        current.walls[2] = false; // remove bottom wall
        next.walls[0] = false; // remove top wall
    }
    if (current.x < next.x) {
        current.walls[1] = false; // remove right wall
        next.walls[3] = false; // remove left wall
    }
    if (current.y > next.y) {
        current.walls[0] = false; // remove top wall
        next.walls[2] = false; // remove bottom wall
    }
    if (current.x > next.x) {
        current.walls[3] = false; // remove left wall
        next.walls[1] = false; // remove right wall
    }
}

function drawRect(point, color) {
    ctx.fillStyle = color;
    ctx.fillRect(point.x, point.y, cellSize, cellSize);
}

function drawLine(wall, color) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(wall.initPoint.x, wall.initPoint.y);
    ctx.lineTo(wall.desPoint.x, wall.desPoint.y);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function Point(x, y) {
    var obj = {};
    obj.x = x;
    obj.y = y;
    return obj;
}
