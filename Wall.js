function Wall(initPoint, desPoint) {
    this.initPoint = initPoint;
    this.desPoint = desPoint;
    this.status = 'UNVISITED';

    this.show = () => {
        if (this.status == 'UNVISITED') drawLine(this, unvisitedBorderColor);
        else if (this.status == 'VISITED') drawLine(this, visitedBorderColor);
        else if (this.status == 'CHECKING') drawLine(this, checkingBorderColor);
        else if (this.status == 'CLEAR') drawLine(this, visitedColor);
    };
}
