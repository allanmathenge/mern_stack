import { store } from '../../app/store'
import { notesApiSlice } from "../notes/notesApiSlice"
import { usersApiSlice } from "../users/usersApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate()) //manual subscription
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
        console.log('unsubscribing')
        notes.unsubscribe()
        users.unsubscribe()
    } //unmounts when you leave the protected pages
  }, []) //run when the component mounts

  return <Outlet />

}

export default Prefetch