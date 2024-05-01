import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ordered, restocked } from "./cakeSlice";
const CakeView = () => {

    const numberOfCakes = useSelector(state => state.cake.numberOfCakes);
    const dispatch = useDispatch();

    const [counter, setCounter] = useState(0)

    return (
        <div className='flex flex-col justify-center items-center p-5 gap-5'>
            <h1 className='text-3xl font-bold '>Number Of Cakes : {numberOfCakes}</h1>

            <div className='flex gap-5 items-center'>
                <button className='bg-white drop-shadow-sm border border-black p-2 rounded-full' onClick={() => setCounter(counter == 0 ? 0 : counter - 1)}>-</button>
                <h1>{counter}</h1>
                <button className='bg-white drop-shadow-sm border border-black p-2 rounded-full' onClick={() => setCounter(counter + 1)}>+</button>
            </div>


            <div className='flex gap-5 items-center'>
                <button className=' bg-green-700 border-2 border-black rounded-full text-white py-2 px-8' onClick={() => dispatch(restocked(counter))}>Restock Cake</button>
                <button className=' bg-red-700 border-2 border-black rounded-full text-white py-2 px-8' onClick={() => dispatch(ordered(counter))}>Ordered Cake</button>
            </div>

            <div className='text-center'>
                <h1 className='text-xl font-light my-5'>===: Offer Zone :===</h1>
                <div className='text-2xl font-semibold'>
                    <p>🍧 Buy a cakes, get an icecream free 🥶</p>
                </div>
            </div>
        </div>
    )
}

export default CakeView