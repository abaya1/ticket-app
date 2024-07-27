import { useEffect } from "react";
import axios from "axios";
import Router from 'next/router'

export default () => {

    useEffect(() => {
        axios.post('/api/users/signout').then(() => {Router.push('/')})
    }, [])

    return <h1>Signing out...</h1>
}