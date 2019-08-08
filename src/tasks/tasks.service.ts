import { TaskRepository } from './task.repository';
import { GetTaskFilteredDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        ) {}

        getTasks(
            filterDto: GetTaskFilteredDto,
            user: User,
            ) {
            return this.taskRepository.getTasks(filterDto, user);
        }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({where: {id, userId: user.id}});

        if (!found) {
        throw new NotFoundException(`Task with '${id} not found`);
        }

        return found;
    }

   async DeleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({id, userId: user.id});

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }
    // // tslint:disable-next-line: no-shadowed-variable

   async createTask(
       createTaskDto: CreateTaskDto,
       user: User,
    ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
    }

   async updateTaskStatus(
       id: number,
       status: TaskStatus,
       user: User,
    ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
    }
}
