import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { TodoModel } from '../models/todo.model';

@Injectable()
export class TodoService {
    private todos: Array<TodoModel> = [];
    private readonly logger = new Logger(TodoService.name);

    public findAll(): Array<TodoModel> {
        this.logger.log('Returning all todos');

        return this.todos;
    }

    public findOne(id: number): TodoModel {
        this.logger.log(`Returning todo with id: ${id}`);

        const todo: TodoModel = this.todos.find((todo) => todo.id === id);

        if (!todo) {
            throw new NotFoundException('Todo not found.');
        }

        return todo;
    }

    public create(todo: TodoModel): TodoModel {
        this.logger.log(`Creating todo with title: ${todo.title}`);

        // if the title is already in use by another post
        const titleExists: boolean = this.todos.some(
            (item) => item.title === todo.title,
        );
        if (titleExists) {
            throw new UnprocessableEntityException('Todo title already exists.');
        }

        // find the next id for a new blog post
        const maxId: number = Math.max(...this.todos.map((todo) => todo.id), 0);
        const id: number = maxId + 1;

        const blogTodo: TodoModel = {
            ...todo,
            id,
        };

        this.todos.push(blogTodo);

        return blogTodo;
    }

    public delete(id: number): void {
        this.logger.log(`Deleting todo with id: ${id}`);

        const index: number = this.todos.findIndex((post) => post.id === id);

        // -1 is returned when no findIndex() match is found
        if (index === -1) {
            throw new NotFoundException('Todo not found.');
        }

        this.todos.splice(index, 1);
    }

    public update(id: number, todo: TodoModel): TodoModel {
        this.logger.log(`Updating todo with id: ${id}`);

        const index: number = this.todos.findIndex((todo) => todo.id === id);

        // -1 is returned when no findIndex() match is found
        if (index === -1) {
            throw new NotFoundException('Todo not found.');
        }

        // if the title is already in use by another post
        const titleExists: boolean = this.todos.some(
            (item) => item.title === todo.title && item.id !== id,
        );
        if (titleExists) {
            throw new UnprocessableEntityException('Post title already exists.');
        }

        const blogPost: TodoModel = {
            ...todo,
            id,
        };

        this.todos[index] = blogPost;

        return blogPost;
    }
}
