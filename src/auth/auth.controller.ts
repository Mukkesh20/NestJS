import { Controller, Get, Body, Post, ValidationPipe, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signinCredentials.dto';
import { SignUpCredentialsDto } from './dto/signupCredentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService ){}

    @Post('/signin')
    signIn(@Body(ValidationPipe)  signInCredentialsDto : SignInCredentialsDto): Promise<string>{
        return this.authService.signinUser(signInCredentialsDto)
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) signUpCredentialsDto : SignUpCredentialsDto){
        return this.authService.signupUser(signUpCredentialsDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user)
    }
}
