import { Check, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Favorite } from "../favorites/favorite.entity";
import { History } from "../history/history.entity";

@Entity("services")
@Check(`"price" >= 1`)
export class Service {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 300 })
    description: string;

    @Column({
        type: "decimal", precision: 10, scale: 2, default: 1, transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    price: number;

    @Column({ length: 2})
    state: string;
    
    @Column({ length: 50})
    city: string;

    @Column()
    category: string;

    @Column("bytea", { array: true, nullable: true })
    images: Buffer[];

    @ManyToOne(() => User, user => user.services, { onDelete: 'CASCADE', eager: true })
    provider: User;

    @OneToMany(() => Favorite, favorite => favorite.service)
    favorites: Favorite[];

    @OneToMany(() => History, history => history.service)
    history: History[];
}