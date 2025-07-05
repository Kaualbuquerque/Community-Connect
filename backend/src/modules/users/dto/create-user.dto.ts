import { IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$/, {
        message: 'Phone number must be a valid Brazilian format (e.g. (81) 91234-5678)',
    })
    phone: string;

    @IsIn(["consumer", "provider"])
    role: "consumer" | "provider"
}