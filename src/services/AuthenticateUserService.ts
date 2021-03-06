import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authconfig from '../config/auth';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService{
    public async execute ({ email, password}: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne( {where: { email } });

        if(!user) {
            throw new Error('incorrect email/password combination.');
        }

        //user.password - senha criptografada
        //password sendo pasada como parametro - nao criptografada
        //compare - metodo para comparar senhas no Bcrypt
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error('incorrect email/password combination.');
        }

        //Usuario autenticado
        const token = sign({}, authconfig.jwt.secret, {
            subject: user.id,
            expiresIn: authconfig.jwt.expiresIn,
            
        });

        return {
            user,
            token
        };
        
    }
}

export default AuthenticateUserService;