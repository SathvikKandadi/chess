import { useEffect, useState } from 'react';
import ChessBoard from '../components/ChessBoard';
import { useSocket } from '../hooks/useSocket';
import { Chess, Color, PieceSymbol, Square } from 'chess.js';

export default function GamePage() {
    const socket = useSocket();
    const [game, setGame] = useState<Chess>(new Chess());
    const [board,setBoard] = useState<({square: Square;type:PieceSymbol;color:Color; } | null)[][] >(game.board());

    useEffect(() => {
        if (!socket)
            return;

        socket.onmessage = (message) => {
            const msg = JSON.parse(message.data);
            if (msg.type === "init_game") {
                console.log(msg.payload);
            }
            else if (msg.type === "update_move") {
                console.log(msg.payload);
                game.move(msg.payload);
                setGame(new Chess(game.fen()));
                setBoard(game.board());
            }
        }

    }, [socket]);

    if (!socket) return <div>Connecting...</div>

    return (
        <div className='h-screen w-screen grid grid-cols-3'>
            <div className='grid col-span-3 md:col-span-2  flex justify-center items-center'>
                <ChessBoard socket={socket} game={game} board={board} setBoard={setBoard} />
            </div>
            <div className='grid col-span-3 md:col-span-1 flex justify-center items-center'>
                <button className="bg-green-500 text-white p-4 rounded hover:bg-green-600" onClick={() => socket.send(JSON.stringify({
                    type: "init_game"
                }))}>
                    Start
                </button>
            </div>
        </div>
    )
}
