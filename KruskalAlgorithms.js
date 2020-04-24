function algo() {
    if ((currentWall.initPoint.x == 0 && currentWall.desPoint.x == 0) || (currentWall.initPoint.y == 0 && currentWall.desPoint.y == 0))
        return;

    currentWall.status = 'CHECKING';
    currentX = currentWall.initPoint.x / cellSize;
    currentY = currentWall.initPoint.y / cellSize;
    var neighbor1;
    var neighbor2;
    if (currentWall.initPoint.x == currentWall.desPoint.x) {
        neighbor1 = cells[cellCountRow * currentY + currentX];
        neighbor2 = cells[cellCountRow * currentY + currentX - 1];
    } else {
        neighbor1 = cells[cellCountRow * (currentY - 1) + currentX];
        neighbor2 = cells[cellCountRow * currentY + currentX];
    }

    neighbor1.status = 'VISITED';
    neighbor2.status = 'VISITED';

    if (neighbor1.getRoot() != neighbor2.getRoot()) {
        neighbor1.getRoot().parent = neighbor2.getRoot();
        currentWall.status = 'CLEAR';
    } else currentWall.status = 'VISITED';
    currentWall = walls[index];
}
