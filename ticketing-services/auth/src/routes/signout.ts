import express, {Request, Response} from 'express'

const router = express.Router()

router.post('/api/users/signout', (req: Request, res: Response) => {
    req.session = null;
    res.status(200).send({message: "successfully logged out"});
})

export {router as signoutRouter};