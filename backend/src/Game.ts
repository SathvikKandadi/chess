import { Chess  } from "chess.js";
import { WebSocket } from "ws";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type: "game_started",
            payload: {
                color: "white"
            }
        }));

        this.player2.send(JSON.stringify({
            type: "game_started",
            payload: {
                color: "black"
            }
        }));
    }

    makeMove(move: { from: string, to: string }) {
        console.log("Make move function called");
        console.log(move);
        const result = this.board.move(move);
        if (!result) {
            console.error("Invalid Move");
            this.notifyInvalidMove();
            return;
        }
        if (this.board.isGameOver()) {
            this.endGame();
            return;
        }

        // this.broadcastGameState();
        console.log(this.board.ascii());
        this.updatePlayers(move);
    }

    notifyInvalidMove() {
        const invalidMoveMessage = JSON.stringify({
            type: "move",
            payload: "Invalid Move"
        });

        if (this.board.turn() === "w") {
            this.player1.send(invalidMoveMessage);
        } else {
            this.player2.send(invalidMoveMessage);
        }
    }

    endGame() {
        const winner = this.board.turn() === "w" ? "black" : "white";
        const gameOverMessage = JSON.stringify({
            type: "game_over",
            payload: { winner }
        });

        this.player1.send(gameOverMessage);
        this.player2.send(gameOverMessage);
    }

    updatePlayers(move: { from: string, to: string }) {
        const updateMoveMessage = JSON.stringify({
            type: "update_move",
            payload: move
        });

        if (this.board.turn() === "w") {
            console.log('sending update to white');
            this.player1.send(updateMoveMessage);
        } else {
            console.log('sending update to black');
            this.player2.send(updateMoveMessage);
        }
    }

    broadcastGameState() {
        const gameState = JSON.stringify({
            type: "update_game_state",
            payload: this.board.fen()
        });

        this.player1.send(gameState);
        this.player2.send(gameState);
    }

    getMoves() {
        return this.board.history();
    }
}
