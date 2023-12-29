import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/requestValidationError';
import { DatabaseConnectionError } from '../errors/databaseConnectionError';
import { User, buildUser } from '../models/user';
import { BadRequestError } from '../errors/badRequestError';

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
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            console.log('incorrect values');
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({email: email})
        if(existingUser) {
            console.log('email in use');
            throw new BadRequestError('email in use');
        }
        else {
            try{
            //hash password
            //@ts-ignore
            const user = buildUser({ email, password});
            await user.save();

            
            const userJwt = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY!)
            req.session = {
                jwt: userJwt
            }
            res.status(201).send({message: 'user created', user: user})
            }
            catch(err) {
                console.log(err)
                throw new DatabaseConnectionError();
            }
        }
    }
);

export {router as signupRouter};