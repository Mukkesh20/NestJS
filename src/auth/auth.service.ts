import { Injectable, NotFoundException, ForbiddenException, ConflictException, InternalServerErrorException, UnauthorizedException, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { SignInCredentialsDto } from './dto/signinCredentials.dto';
import { SignUpCredentialsDto } from './dto/signupCredentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwtpayload.interface';



@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                private jwtService: JwtService){}

    

    async signinUser(signInCredentialsDto : SignInCredentialsDto): Promise<any | {status : number}>{
    const {username , password} = signInCredentialsDto;

        const user =await this.userModel    
            .find( { username:{$regex: '^' + username +'$',$options:'i'}} );
          if(user != ''){
            const passwordEntered = await this.hashPassword(password, user[0].salt)
            if(user && (passwordEntered === user[0].password)){
                const payload: JwtPayload = {username}
                //const accessToken = await this.jwtService.sign(payload)
                return this.createJwtPayload(user)
            }else{
                throw new UnauthorizedException('Invalid Password')
            }
        }else{
            throw new NotFoundException('Username Not Found')
        }

        
    }

    async signupUser(signUpCredentialsDto: SignUpCredentialsDto): Promise<User>{

        const {username, password, phoneNumber, email, gender,age} = signUpCredentialsDto;
        try{
                const newUser = new this.userModel(signUpCredentialsDto)
                newUser.username = username
                newUser.salt = await bcrypt.genSalt();
                newUser.password = await this.hashPassword(password, newUser.salt)
                newUser.phoneNumber = phoneNumber
                newUser.email = email
                newUser.gender = gender
                newUser.age = age
               return await newUser.save();
        }catch(err){
            
            if(err.code === 11000){
                throw new ConflictException('Duplicate Username/Email')
            }
            else{
                throw new InternalServerErrorException()
            }
        }

        
    }

    private async hashPassword(password: string, salt: string):Promise<string> {
        return bcrypt.hash(password, salt)
    }

    async createJwtPayload(user : User){

        let data: JwtPayload = {
            username: user.username,
        };

        let jwt = await this.jwtService.sign(data);

        return {
            username: user.username,
            expiresIn: 3600,
            token: jwt            
        }

    }

}
