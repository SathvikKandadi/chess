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
    <div className='h-screen w-screen grid grid-cols-3'>
            <div className='grid col-span-3 md:col-span-2  flex justify-center items-center'>
                <ChessBoard />
            </div>
            <div className='grid col-span-3 md:col-span-1 flex justify-center items-center'>
                <button className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
                    Start
                </button>
            </div>
        </div>
  )
}
