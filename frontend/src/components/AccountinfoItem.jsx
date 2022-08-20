import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteAccountinfo} from '../features/accountinfos/accountinfoSlice'

const AccountinfoItem = ({accountinfo}) => {
    const dispatch = useDispatch()
  return (
    <div className='accountinfo'>
        <div>{new Date(accountinfo.createdAt).toLocaleString('en-US')}</div>
        <h2>{accountinfo.text}</h2>
        <button onClick={() => dispatch(deleteAccountinfo(accountinfo._id))} className='close'>
            X
        </button>
    </div>
  )
}

export default AccountinfoItem