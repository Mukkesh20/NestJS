import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwtpayload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.entity";
import { Model } from 'mongoose';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectModel('User') private readonly userModel: Model<User>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey : 'deepblueison@t0psecretm!ss!onworking0natopsecretproject',
            

        });
    }

    async validate(payload: JwtPayload):Promise<User>{
        const {username} = payload
        const user = await this.userModel
        .find( { username:{$regex: '^' + username +'$',$options:'i'}} );

        if(user[0] === ''){
            throw new UnauthorizedException()
        }

        return user;
    }
}