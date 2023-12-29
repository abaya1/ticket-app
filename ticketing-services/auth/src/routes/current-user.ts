import express from 'express'
import { BadRequestError } from '../errors/badRequestError'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
    if( !req.session || !req.session.jwt) {
        res.status(200).send({currentUser: null})
    }
    else {
        try{
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
        res.status(200).send({currentUser: payload})
        }catch(e) {
            console.log(e);
            res.status(200).send({currentUser: null})
        }
    }
})

export {router as currentUserRouter};