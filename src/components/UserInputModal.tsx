import React, { useRef, useState } from 'react'
import Modal from './Modal'
import { verify_user } from '@/utils/account'
import { add_user_account } from '@/utils/local_storage'

function UserInputModal({ isUserExists, onClose }: { isUserExists?: React.Dispatch<React.SetStateAction<boolean>>, onClose?: any }) {
    const userInput = useRef(null)
    const passInput = useRef(null)
    const [invalidClient, setInvalidClient] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    function onAccountSubmit(e: MouseEvent){
        e.preventDefault()
        setIsLoading(true)

        if(userInput == null || passInput == null){
            console.log("Input fields required")
            return
        }

        const user = userInput.current.value;
        const pass = passInput.current.value;
        verify_user(user, pass).then((res) => {
            if(res.success){
                add_user_account(user, pass)
                onClose(true)
                
                if(isUserExists != null){
                    isUserExists(true)
                }
            }else{
                setInvalidClient(true)
            }
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            setInvalidClient(true)
        })

    }

    return (
        <Modal>
            <div className='text-center mb-6'>
                <h1 className='text-3xl font-semibold mb-4'>Welcome</h1>
                <p className='text-sm tracking-wide text-gray-300'>Fill the credentials to fetch your account emails</p>
            </div>
            { invalidClient && <span className='text-alert-error text-sm mb-4'>Credentials are invalid</span>}
            <form action="" onSubmit={onAccountSubmit}>
                <div className='mb-4'>
                    <label htmlFor="user" className='input-label  mb-2'>User</label>
                    <input type="text" name='user' id='user' className='input' ref={userInput} />
                    {/* <p className='text-alert-error mt-2 text-sm'>This field is required</p> */}
                </div>
                <div className='mb-4'>
                    <label htmlFor="pass" className='input-label font-medium mb-2'>Password</label>
                    <input type="password" name='pass' id='pass' className='input' ref={passInput} />
                    {/* <p className='text-alert-error mt-2 text-sm'>This field is required</p> */}
                </div>
                <button type='submit' className='button w-full mt-2'>{ isLoading ? "Verifying..." : "Add Account"  }</button>
                {isUserExists == undefined && <button type='button' className='button bg-dark-dp4 w-full mt-2' onClick={onClose}>Cancel</button>}
            </form>
        </Modal>
    )
}

export default UserInputModal