import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTaskFilteredDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskController');
    constructor(private taskservice: TasksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilteredDto,
        @GetUser() user: User,
        ) {
        this.logger.verbose(`User "${user.username}" retrieving all tasts`);
        return this.taskservice.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
        ): Promise <Task> {
        return this.taskservice.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)

    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
    return this.taskservice.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
      return  this.taskservice.DeleteTask(id, user);
    }

    @Patch('/:id/status')

    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
        ): Promise<Task> {
        return this.taskservice.updateTaskStatus(id, status, user);
    }
}
