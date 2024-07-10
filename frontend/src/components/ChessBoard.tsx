import { Chess } from "chess.js";

export default function ChessBoard() {
    const game = new Chess();
    const chessBoard = game.board();

    return (
        <div className="">
            {
                chessBoard.map((row, i) => (
                    <div className="grid grid-cols-8" key={i}>
                        {
                            row.map((square, j) => (
                                <div 
                                    key={j} 
                                    className={`${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-white'} h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 flex items-center justify-center`}
                                >
                                    <div className="flex items-center justify-center h-full">
                                        {square ? `${square.color}${square.type}` : ''}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}
