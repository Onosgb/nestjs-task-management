import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
export class GetTaskFilteredDto {
@IsOptional()
@IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
status: TaskStatus;
@IsOptional()
@IsNotEmpty()
search: string;
}