import React from 'react'
import { GoogleAuthProvider, getAuth, } from 'firebase/auth'
import { app } from '../../firebase'
export default function Oauth() {
    return (
        <button
            // onClick={handleGoogleClick}
            type='button'
            className='bg-red-700 text-white p-3 w-full rounded-lg uppercase hover:opacity-95'
        >
            Continue with google
        </button>
    )
}
