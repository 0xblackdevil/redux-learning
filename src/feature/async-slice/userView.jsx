import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from './userSlice';

const UserView = () => {

    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);
    return (
        <div className='flex flex-col justify-center items-center p-5 gap-10'>
            <h1 className='text-3xl font-bold '>List of Previous Coustomer</h1>
            <div className='flex flex-wrap gap-10'>
                {userState.loading && <h1 className='text-2xl font-bold'>Loading...</h1>}
                {!userState.loading && userState.error ? <h1 className='text-2xl font-bold'>{userState.error}</h1> : null}
                {!userState.loading && userState.users.length > 0 ? userState.users.map(user => <div key={user.id} className='p-3 rounded-10 bg-white shadow-lg'>
                    <h3 className='text-xl font-bold'>{user.username}</h3>
                    <h4 className='text-lg font-light'>{user.name}</h4>
                    <p className='mt-2'>{user.address.street}, {user.address.suite}</p>
                </div>) : null}
            </div>
        </div>
    )
}

export default UserView