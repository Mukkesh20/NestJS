import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from "class-validator";


export class SignUpCredentialsDto{

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

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(25)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    @MaxLength(10)
    phoneNumber: string              

    @IsString()
    @IsNotEmpty()
    gender: string

    @IsNumber()
    @IsNotEmpty()
    age: number
}