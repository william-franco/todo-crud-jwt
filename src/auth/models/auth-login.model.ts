import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthLoginModel {
    @ApiPropertyOptional({ type: Number })
    id?: number;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    email: string;
    @ApiProperty({ type: String })
    password: string;
}

// {
//     "id": 1,
//     "name": "William Franco",
//     "email": "william@gmail.com",
//     "password": "flutter"
// }
