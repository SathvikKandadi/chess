import { Chess } from "chess.js";

export default function ChessBoard() {

    const game = new Chess();
    const chessBoard = game.board();

    return (
        <div className="my-16 mx-16 border-2 border-white">
            {
                chessBoard.map((row, i) => (
                    <div className="grid grid-cols-8" key={i}>
                        {
                            row.map((square, j) => (
                                <div key={j} className={(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-white'}>
                                    <div className="flex items-center justify-center h-full">
                                        {square ? `${square.color}${square.type}` : 'a'}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}
