import React from 'react'

function ProfileDetails() {
  return (
    <div className='flex flex-row text-white gap-14'>
        <div className='flex flex-row items-end justify-center gap-6'>
            <div className='rounded-full w-28 h-28 bg-purple-400'></div>
            <div className='flex flex-col gap-2'>
                <div className='italic'>@Profile</div>
                <div className='text-2xl font-bold'>John</div>
                <div className='border border-1 py-1 px-10 rounded-md border-gray-400'>
                    <span>Edit profile</span>
                </div>
            </div>
        </div>
        <div className='flex flex-row items-end justify-center gap-5'>
            <div className='flex flex-col items-center justify-center border-e-2 border-e-white-200 pe-5'>
                <div className='text-xl font-bold'>5</div>
                <div className='text-xl text-gray-400'>Ratings</div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='text-xl font-bold'>5</div>
                <div className='text-xl text-gray-400'>Saved</div>
            </div>
        </div>
    </div>
  )
}

export default ProfileDetails