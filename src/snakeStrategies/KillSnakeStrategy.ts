import { GameState } from "../GameState";
import { Snake } from "../Snake";
import { Action } from "../action";
import { distance, toFlat } from "../address";
import { TargetSnakeStrategy } from "./TargetSnakeStrategy";

export class KillSnakeStrategy extends TargetSnakeStrategy {
    public targetPlayerName: string | undefined;

    constructor(public gameState: GameState, public snake: Snake) {
        const target = [-1, -1, -1];
        super(gameState, snake, target);
    }

    private _pickTargetPlayer(): string | undefined {
        const highestEnemies = [...this.gameState.enemyCellCounts.entries()];
        highestEnemies.sort((e1, e2) => e2[1] - e1[1]);
        return highestEnemies[0]?.[0];
    }

    private _pickTarget(): void {
        const targetName = this._pickTargetPlayer();
        if (!targetName || targetName === this.gameState.playerName) {
            this.targetPlayerName = undefined;
            this.target = [-1, -1, -1];
            this.snake.log("no target available");
            return;
        }
        this.targetPlayerName = targetName;
        const playerCells = [...this.gameState.grid.cells.values()].filter(
            (cell) => cell.player === this.targetPlayerName
        );
        playerCells.sort((c1, c2) => {
            return (
                distance(c1.address, this.snake.head) -
                distance(c2.address, this.snake.head)
            );
        });
        this.target = playerCells[0]?.address ?? [-1, -1, -1];
        this.snake.log(`selected ${this.targetPlayerName} ${this.target}`);
    }

    isDone(): string | undefined {
        return undefined;
    }

    update(): Action[] {
        if (this.target[0] !== -1) {
            if (
                this.gameState.getCell(this.target).player !==
                this.targetPlayerName
            ) {
                this.snake.log("target lost, finding new one");
                this.target = [-1, -1, -1];
            }
        }
        if (this.target[0] === -1) {
            this._pickTarget();
        }
        if (this.target[0] === -1) {
            return [];
        }
        return super.update();
    }

    inspect(): string {
        return `[${this.constructor.name} target=${toFlat(this.target)} enemy=${
            this.targetPlayerName
        }]`;
    }
}
