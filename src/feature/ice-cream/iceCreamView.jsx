import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ordered, restock } from "./iceCreamSlice";

const IceCreamView = () => {

    const [counter, setCounter] = useState(0)

    const numberOfIceCream = useSelector(state => state.icecream.numberOfIceCream)
    const dispatch = useDispatch();
    return (
        <div className='flex flex-col justify-center items-center p-5 gap-5'>
            <h1 className='text-3xl font-bold '>Number Of Ice cream : {numberOfIceCream}</h1>

            <div className='flex gap-5 items-center'>
                <button className='bg-white drop-shadow-sm border border-black p-2 rounded-full' onClick={() => setCounter(counter == 0 ? 0 : counter - 1)}>-</button>
                <h1>{counter}</h1>
                <button className='bg-white drop-shadow-sm border border-black p-2 rounded-full' onClick={() => setCounter(counter + 1)}>+</button>
            </div>

            <div className='flex gap-5 items-center'>
                <button className=' bg-green-700 border-2 border-black rounded-full text-white py-2 px-8' onClick={() => dispatch(restock(counter))}>Restock Ice Cream</button>
                <button className=' bg-red-700 border-2 border-black rounded-full text-white py-2 px-8' onClick={() => dispatch(ordered(counter))}>Ordered Ice Cream</button>
            </div>
        </div>
    )
}

export default IceCreamView;