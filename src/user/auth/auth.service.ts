import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserType } from 'src/schemas/user.schema';
import { SignupDto } from '../dtos/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { generateJWT } from 'src/utils/jwt-generator';

interface SignupParams {
  name: string;
  phone: string;
  email: string;
  password: string;
}
interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signup({ name, phone, email, password }: SignupParams) {
    const isUserExist = await this.userModel.findOne({ email });
    if (isUserExist) {
      throw new BadRequestException({ message: 'Email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      userType: UserType.BUYER,
    });

    const token = await generateJWT({ name, id: newUser._id });
    return token;
  }

  async signin({ email, password }: SigninParams) {
    const isUserExist = await this.userModel.findOne({ email });
    if (!isUserExist) {
      throw new BadRequestException({ message: 'Invalid Credentials.' });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException({ message: 'Invalid Credentials.' });
    }
    const token = await generateJWT({
      name: isUserExist.name,
      id: isUserExist._id,
    });
    return token;
  }
}
