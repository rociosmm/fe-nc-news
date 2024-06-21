import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const Topics = () => {
  const {username} = useContext(UserContext)
  return (
    <div>Topics</div>
  )
}
