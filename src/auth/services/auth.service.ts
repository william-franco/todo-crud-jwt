import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginModel } from '../models/auth-login.model';
import { AuthSuccessModel } from '../models/auth-success.model';

@Injectable()
export class AuthService {
    private users: Array<AuthLoginModel> = [];
    private readonly logger = new Logger(AuthService.name);

    constructor(private jwtService: JwtService) { }

    async signIn(user: AuthLoginModel): Promise<AuthSuccessModel> {
        const person: AuthLoginModel = this.findUser(user);

        const payload = { sub: person.id, username: person.name };

        const token: string = await this.jwtService.signAsync(payload);

        const authSuccessModel = new AuthSuccessModel();

        authSuccessModel.access_token = token;

        return authSuccessModel;
    }

    async signUp(user: AuthLoginModel): Promise<AuthSuccessModel> {
        const person = this.createUser(user);

        const payload = { sub: person.id, username: person.name };

        const token: string = await this.jwtService.signAsync(payload);

        const authSuccessModel = new AuthSuccessModel();

        authSuccessModel.access_token = token;

        return authSuccessModel;
    }

    public findUser(user: AuthLoginModel): AuthLoginModel {
        this.logger.log(`Returning user with email: ${user.email}`);

        const person: AuthLoginModel = this.users.find((user) => user.email === user.email);

        if (!person) {
            throw new NotFoundException('User not found.');
        }

        return person;
    }

    public createUser(user: AuthLoginModel): AuthLoginModel {
        this.logger.log(`Creating user with email: ${user.email}`);

        // check if the email is already in use
        const emailExists: boolean = this.users.some(
            (item) => item.email === user.email,
        );
        if (emailExists) {
            throw new UnprocessableEntityException('User email already exists.');
        }

        // find the next id for a new blog post
        const maxId: number = Math.max(...this.users.map((user) => user.id), 0);
        const id: number = maxId + 1;

        const blogUser: AuthLoginModel = {
            ...user,
            id,
        };

        this.users.push(blogUser);

        return blogUser;
    }
}
