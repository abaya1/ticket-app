import mongoose from "mongoose";
import { Password } from "../services/password";

//interface that describes a user
interface IUser {
    email: string,
    password: string
}

//interface tht describes a user model
interface IUserModel extends mongoose.Model<IUserDocument> {
    build(user : IUser) : IUserDocument,
}

//interface that describes user document properties
interface IUserDocument extends mongoose.Document {
    email: string, 
    password: string
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc , ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});
userSchema.pre('save' , async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done();
});

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

const buildUser = (user : IUser) => {
    return new User(user)
}

userSchema.statics.build = buildUser

export { User, buildUser };