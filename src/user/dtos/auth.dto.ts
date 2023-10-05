import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Matches(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
    message: 'invalid phone number. Should be 10 characters.',
  })
  phone: string;

  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'password cannot be less than 6 characters.' })
  password: string;
}

export class SigninDto {
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
