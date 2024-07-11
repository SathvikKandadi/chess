import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";


interface chessBoardProps {
    socket: WebSocket;
    game:Chess;
    board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
    setBoard:React.Dispatch<React.SetStateAction<({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>>

}


export default function ChessBoard({ socket , game , board ,setBoard }: chessBoardProps) {
    // const [board,setBoard] = useState<({square: Square;type:PieceSymbol;color:Color; } | null)[][] >(game.board());
    const [from, setFrom] = useState<Square | null>(null);

    function getSquare(i: number, j: number) {
        const positions: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const rank = 8 - i;
        const position = positions[j];
        const to = position + rank;
        return to;
    }

    if(!board)
        return;
    return (
        <div className="">
            {
                board.map((row, i) => (
                    <div className="grid grid-cols-8" key={i}>
                        {
                            row.map((square, j) => (
                                <div
                                    key={j}
                                    className={`${(i + j) % 2 === 0 ? 'bg-green-600' : 'bg-lime-50'} h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 flex items-center justify-center`}
                                    onClick={() => {
                                        if (!from) {
                                            setFrom(square?.square ?? null);
                                        }
                                        else {
                                            const to = getSquare(i, j);
                                            console.log(from);
                                            console.log(to);

                                            try {
                                                game.move({ from, to });
                                                setBoard(game.board());
                                                socket.send(JSON.stringify({
                                                    type: "move",
                                                    payload:{from , to}
                                                }));
                                            }
                                            catch (error) {
                                                console.error("Invalid Move");
                                            }
                                            setFrom(null);
                                        }
                                    }}
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
