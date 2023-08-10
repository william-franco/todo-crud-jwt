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
