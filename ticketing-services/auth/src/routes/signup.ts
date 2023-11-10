import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.post('/api/users/signup', 
    [
        body('email')
            .isEmail()
            .withMessage('Email nust be valid'),
        body('password')
            .trim()
            .isLength({min: 4 , max: 20})
            .withMessage('password must be valid')
    ], 
    (req: Request, res: Response) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            console.log('incorrect values')
            res.status(400).send({message: 'invalid email or password', errors: errors.array()});

        }
        else {
            console.log('creating user now')
            res.status(200).send('user created now')
        }
    }
);

export {router as signupRouter};