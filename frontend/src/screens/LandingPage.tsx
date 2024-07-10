import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    
    const navigate = useNavigate();
    

    return (
        <div className='w-full  h-screen '>
            <div className='py-16 mx-16 md:grid grid-cols-2  gap-4'>
                <div className='grid col-span-1  md:max-w-[659px] md:max-h-[659px] max-w-[300px] max-h-[300px] border-2 border-white'>
                    <img src={'/chessboard.jpeg'} alt='Image of a chess board' ></img>
                </div>
                <div className='grid col-span-1 flex justify-center'>
                    <div className='flex flex-col justify-center'>
                    <h1 className='text-5xl text-white font-bold my-2'>Play Chess</h1>
                    <h1 className='text-5xl text-white font-bold my-4 mx-8'>Online</h1>
                    <button onClick={() => navigate('/game')} className="w-full bg-green-500 rounded my-8 text-white p-2 text-md font-bold hover:bg-green-600">Begin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
