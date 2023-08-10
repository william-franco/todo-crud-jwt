import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TodoModel } from '../models/todo.model';
import { TodoServiceImpl } from '../services/todo.service';

@Controller('api/todos')
@ApiTags('todos')
@UseFilters(HttpExceptionFilter)
export class TodoControllerImpl {
    constructor(private readonly todoService: TodoServiceImpl) { }

    @UseGuards(AuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Todos retrieved successfully.' })
    public findAll(): Array<TodoModel> {
        return this.todoService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiOkResponse({ description: 'Todo retrieved successfully.' })
    @ApiNotFoundResponse({ description: 'Todo not found.' })
    public findOne(@Param('id', ParseIntPipe) id: number): TodoModel {
        return this.todoService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    @ApiCreatedResponse({ description: 'Todo created successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'Todo title already exists.' })
    public create(@Body() post: TodoModel): TodoModel {
        return this.todoService.create(post);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiOkResponse({ description: 'Todo deleted successfully.' })
    @ApiNotFoundResponse({ description: 'Todo not found.' })
    public delete(@Param('id', ParseIntPipe) id: number): void {
        this.todoService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiOkResponse({ description: 'Todo updated successfully.' })
    @ApiNotFoundResponse({ description: 'Todo not found.' })
    @ApiUnprocessableEntityResponse({ description: 'Todo title already exists.' })
    public update(
        @Param('id', ParseIntPipe) id: number,
        @Body() post: TodoModel,
    ): TodoModel {
        return this.todoService.update(id, post);
    }
}
