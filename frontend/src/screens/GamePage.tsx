import ChessBoard from '../components/ChessBoard';

export default function GamePage() {
    const socket = new WebSocket("ws://localhost:8080")

    // Connection opened
    socket.addEventListener("open", event => {
        console.log("Connection established");
        socket.send("Connection established")
    });

    // Listen for messages
    socket.addEventListener("message", event => {
        console.log("Message from server ", event.data)
    })
  return (
    <div className='h-full w-full grid grid-cols-2'>
        <ChessBoard/>
        <div>Start</div>
    </div>
  )
}
