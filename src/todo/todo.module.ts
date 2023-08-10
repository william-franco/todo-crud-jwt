import { Module } from '@nestjs/common';
import { TodoServiceImpl } from './services/todo.service';
import { TodoControllerImpl } from './controllers/todo.controller';

@Module({
    providers: [TodoServiceImpl],
    controllers: [TodoControllerImpl],
    exports: [TodoServiceImpl],
})
export class TodoModule { }
