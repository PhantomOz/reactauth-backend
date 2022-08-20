import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import AccountinfoForm from '../components/AccountinfoForm'
import AccountinfoItem from '../components/AccountinfoItem'
import Spinner from '../components/Spinner'
import {getAccountinfos, reset} from '../features/accountinfos/accountinfoSlice'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {accountinfos, isLoading, isError, message} = useSelector((state) => state.accountinfos)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getAccountinfos())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
   <section className='heading'>
    <h1>Welcome {user && user.name}</h1>
    <p>AcccountInfos Dashboard</p>
   </section>

  <AccountinfoForm />

  <section className='content'>
    {accountinfos.length > 0 ? (
      <div className = 'accountinfos'>
        {accountinfos.map((accountinfo) => (
          <AccountinfoItem key={accountinfo._id} accountinfo={accountinfo} /> 
        ))}
      </div>
    ) : (
      <h3>No Account Information</h3>
    )}
  </section>
   </>
  )
}

export default Dashboard