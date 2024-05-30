class Agent {
    constructor(gameManager) {}

    selectMove() {
        var brain = new AgentBrain(gameManager);
        let maxScore = 0;
        let bestMove = -1;

        for (let direction = 0; direction < 4; direciton++) {
            let newBrain = brain.clone();
            if (newBrain.move(direction)) {
                let score = this.expectiMax(newBrain, 3);
                if (score > maxScore) {
                    maxScore = score;
                    bestMove = direction;
                }
            }
        }
        return bestMove;

        // Use the brain to simulate moves
        // brain.move(i)
        // i = 0: up, 1: right, 2: down, 3: left
        // brain.reset() resets the brain to the current game board

        // if (brain.move(0)) return 0;
        // if (brain.move(1)) return 1;
        // if (brain.move(3)) return 3;
        // if (brain.move(2)) return 2;
    }

    evaluateGrid(gameManager) {
        // calculate a score for the current grid configuration
        let maxTile = 0;
        gameManager.grid.eachCell((x, y, tile) => {
            if (tile && tile.value > maxTile) {
                maxTile = tile.value;
            }
        });
        return maxTile;
    }

    expectiMax(brain, depth) {
        if (depth === 0) {
            return this.evaluateGrid(brain.gameManager);
        }

        let maxScore = 0;
        for (let direction = 0; direction < 4; direction++) {
            let newBrain = brain.clone();
            if (newBrain.move(direction)) {
                let score = this.expectiMax(newBrain, depth - 1);
                if (score > maxScore) {
                    maxScore = score;
                }
            }
        }

        return maxScore;
    }
}
