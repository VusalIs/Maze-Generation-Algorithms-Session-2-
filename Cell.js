function Cell(beginPoint) {
    this.beginPoint = beginPoint;
    this.status = 'UNVISITED';
    this.parent = null;

    this.show = () => {
        if (this.status == 'UNVISITED') drawRect(this.beginPoint, unvisitedColor);
        else if (this.status == 'VISITED') drawRect(this.beginPoint, visitedColor);
    };

    this.getRoot = () => {
        var root = this;
        while (root.parent != null) {
            root = root.parent;
        }
        return root;
    };

    this.setRoot = newRoot => {
        this.root = newRoot;
        this.children.map(child => {
            child.root = newRoot;
            child.setRoot(newRoot);
        });
    };
}
