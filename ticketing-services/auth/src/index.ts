import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import 'express-async-errors'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'

import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/notFoundError'


const app = express()
app.use(json())

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*' , () => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    try {
        console.log('connecting to mongo... ')
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectOptions).then(() => {
            console.log('connected to mongo')
          })
    }catch(err) {
        console.log(err)
    }
}

app.listen(4000 , () => {
    console.log('listening on port 4000!')
})

start()