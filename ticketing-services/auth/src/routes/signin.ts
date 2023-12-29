import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken';
import { RequestValidationError } from '../errors/requestValidationError';
import { User } from '../models/user';
import { BadRequestError } from '../errors/badRequestError';
import { Password } from '../services/password';

const router = express.Router()

router.post('/api/users/signin',[
    body('email')
        .isEmail()
        .withMessage('email must be valid format'),
    body('password')
        .trim()
        .isLength({min: 4 , max: 20})
        .withMessage('password must be valid format')
],
 async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log('incorrect values');
        throw new RequestValidationError(errors.array());
    } else {
        const { email , password } = req.body
        const existingUser = await User.findOne({email: email})

        if(!existingUser) {
            throw new BadRequestError('user does not exist');
        }
        else {
            if(await Password.compare(existingUser.password, password)) {
                const userJwt = jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_KEY!)
                req.session = {
                    jwt: userJwt
                }
                res.status(200).send({message: "login succesful", user: existingUser})
            }
            else {
                throw new BadRequestError('incorrect password for user');
            }
        }

    }

    
})

export {router as signinRouter};