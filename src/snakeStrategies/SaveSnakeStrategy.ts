import { TargetSnakeStrategy } from "./TargetSnakeStrategy";

export class SaveSnakeStrategy extends TargetSnakeStrategy {
    isDone(): string | undefined {
        // We're never done walking to our home, until
        // our snake gets removed from the game by the server.
        return undefined;
    }
}
