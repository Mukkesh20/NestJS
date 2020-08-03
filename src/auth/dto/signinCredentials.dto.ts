import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class SignInCredentialsDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    username: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    password: string;
}