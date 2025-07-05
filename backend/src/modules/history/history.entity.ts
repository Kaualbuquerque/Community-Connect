import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Service } from "../services/service.entity";

@Entity("history")
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date" })
    usedAt: string;

    @ManyToOne(() => User, user => user.history, { onDelete: 'CASCADE', eager: true })
    consumer: User;

    @ManyToOne(() => Service, service => service.history, { onDelete: 'CASCADE', eager: true })
    service: Service;
}