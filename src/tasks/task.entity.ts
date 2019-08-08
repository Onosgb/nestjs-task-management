
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { IsNotEmpty } from 'class-validator';
import { User } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    @IsNotEmpty()
    status: TaskStatus;
    @ManyToOne(type => User, user => user.tasks, {eager: false})
    user: User;

    @Column()
    userId: number;
}
