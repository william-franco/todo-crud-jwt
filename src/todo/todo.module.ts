import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';

@Module({
    providers: [TodoService],
    controllers: [TodoController],
    exports: [TodoService],
})
export class TodoModule { }
