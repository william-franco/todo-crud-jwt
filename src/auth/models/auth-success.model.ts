import { ApiProperty } from '@nestjs/swagger';

export class AuthSuccessModel {
    @ApiProperty({ type: String })
    access_token: string;
}
