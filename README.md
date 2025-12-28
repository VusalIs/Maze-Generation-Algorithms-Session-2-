# Maze Generation Algorithms

<table>
  <tr>
    <td align="center"><strong>Depth First Search</strong></td>
    <td align="center"><strong>Kruskal's Algorithm</strong></td>
  </tr>
  <tr>
    <td><img src="demos/demo 1.gif" alt="DFS Demo" width="400"/></td>
    <td><img src="demos/demo 2.gif" alt="Kruskal Demo" width="400"/></td>
  </tr>
</table>

# Description

This repository combines two maze generation algorithms from the [Maze Generation Algorithms series](https://github.com/VusalIs/Maze-Generation-Algorithms-Session-0-):

- **Session 1**: Depth First Search with Backtracking
- **Session 2**: Randomized Kruskal's Algorithm

You can see live demos here: https://vusalis.github.io/Maze-Generation-Algorithms-Session-2-/

---

## Table of Contents

- [Depth First Search with Backtracking](#depth-first-search-with-backtracking)
  - [What is Depth First Search?](#what-is-depth-first-search)
  - [How to implement DFS with Backtracking?](#how-to-implement-dfs-with-backtracking)
  - [DFS Code Implementation](#dfs-code-implementation)
- [Randomized Kruskal's Algorithm](#randomized-kruskals-algorithm)
  - [What is Kruskal Algorithm?](#what-is-kruskal-algorithm)
  - [How to implement Randomized Kruskal?](#how-to-implement-randomized-kruskal)
  - [Kruskal Code Implementation](#kruskal-code-implementation)
- [Thanks for your attention](#thanks-for-your-attention)

---

# Depth First Search with Backtracking

## What is Depth First Search?

Depth First Search is algorithm to search or traverse in a tree or graph data structures. For finding two nodes are connected or not, the algorithm asks its left/right node if it is the second node or not. This process recursively continues till you reach the left/right most leaf(last element). After that, If the second node is not found, it goes one step back and try to find second node right/left child. This process continues till finding the second node. You can find detailed information in the following link(https://brilliant.org/wiki/depth-first-search-dfs/). As you see, this algorithm is not so useful for maze generation because we will get the same results if we start from the same point. That is why, we will change this algorithm slightly.

## How to implement DFS with Backtracking?

As you see, Depth First Search has many disadvantages for maze generation, that is why we will slightly change algorithm. The first problem is randomness. In depth first search we start from left or right node, but if we want to create a complex maze, we have to add a randomness. Because of that, instead of choosing next node in the static direction, we will randomly choose the next node. Another problem is recursion. If we want to create large maze, the algorithm will reach large depth of recursion. Avoiding this problem, we will use stack and store all path in this stack instead of recursion. Our algorithm will work based on following order:

1. Choose the initial cell, mark it as visited and push it to the stack
1. While the stack is not empty
   1. Pop a cell from the stack and make it a current cell
   1. If the current cell has any neighbors which have not been visited
      1. Push the current cell to the stack
      1. Choose one of the unvisited neighbors
      1. Remove the wall between the current cell and the chosen cell
      1. Mark the chosen cell as visited and push it to the stack

## DFS Code Implementation

I have already talk about basic file structure in the [session 0](https://github.com/VusalIs/Maze-Generation-Algorithms-Session-0-). Now It is time to code implementation of the algorithm.

```javascript
function algo() {
  var unvisitedNeighbors = currentCell.getUnvisitedNeighbors();
  var next =
    unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
  if (next) {
    stack.push(currentCell);
    next.visited = true;
    removeWalls(currentCell, next);
    currentCell = next;
  } else if (stack.length > 0) {
    currentCell = stack.pop();
  }
}
```

As you see, code implementation of this algorithm is so short. Firstly, we find all unvisited neighbors of current cell and choose random neighbor. If there are no unvisited neighbors, that means we have visited all neighbors and have to move one step back in our stack. If there are unvisited neighbors, we add current cell to the stack and move to new cell.

---

# Randomized Kruskal's Algorithm

## What is Kruskal Algorithm?

Kruskal's Algorithm originally used to find a minimum spanning tree for a given tree. The minimum spanning tree is a subtree of the given tree with the minimum possible total edge weight and does not have any cycle. I will upload the visualization and explanation of this algorithm soon.

## How to implement Randomized Kruskal?

Randomized Kruskal's Algorithm is a little bit changed version of Kruskal's Algorithm. In this visualization, I have created 2 arrays (walls, cells). We can assume that every wall is a tree node which root equals to null. After initiate everything, I shuffle the walls array and start from the first wall. If the wall has neighbor cells with the same root that means they are already connected and we don't have to do anything(except changing its color). If the wall has neighbor cells with different roots that means we have to connect them (It means we just make the root of one cell to children of another cell). The program does it for every wall. The steps are described below:

1. Create a list of all walls, and create a list of all cells, each containing just that one cell with null root.
1. Shuffle all walls:
1. Start from the first wall and follow below instruction:
   1. If the cells divided by this wall have the same root:
      1. Remove the current wall.
      1. Make one cell subtree of another cell.

## Kruskal Code Implementation

I have already talk about basic file structure in the [session 0](https://github.com/VusalIs/Maze-Generation-Algorithms-Session-0-). Now It is time to code implementation of the algorithm.

```javascript
function algo() {
  if (
    (currentWall.initPoint.x == 0 && currentWall.desPoint.x == 0) ||
    (currentWall.initPoint.y == 0 && currentWall.desPoint.y == 0)
  ) {
    currentWall.status = "CLEAR";
    return;
  }

  currentWall.status = "CHECKING";
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

  neighbor1.status = "VISITED";
  neighbor2.status = "VISITED";

  if (neighbor1.getRoot() != neighbor2.getRoot()) {
    neighbor1.getRoot().parent = neighbor2.getRoot();
    currentWall.status = "CLEAR";
  } else currentWall.status = "VISITED";
  currentWall = walls[index];
}
```

First, we check that our wall if it is on the edge or not, and if it is not we have to find which cells are divided by this wall. We can do that based on the x and y coordinates. Remember that every cell is also a node, that is why we check neighbor cells' roots, and if they are not the same, that means they are not connected. To connect those two cells, we make the root of one cell to children of another cell. This process is the concatenation of the trees. If the cells are already connected, we don't do anything and skip this wall(except changing its color).

---

# Thanks for your attention

Thanks for your attention! See you 👋
