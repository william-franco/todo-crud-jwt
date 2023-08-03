import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TodoModel {
    @ApiPropertyOptional({ type: Number })
    id?: number;
    @ApiProperty({ type: String, format: 'date-time' })
    created: Date;
    @ApiProperty({ type: String })
    title: string;
    @ApiProperty({ type: String })
    description: string;
    @ApiProperty({ type: Boolean })
    completed: boolean;
}

// {
//     "id": 1,
//     "created": "2021-08-16",
//     "title": "Intro to NestJS",
//     "description": "This blog post is about NestJS",
//     "completed": false
// }
