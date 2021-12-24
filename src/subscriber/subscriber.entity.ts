import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscriber{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "longtext"})
    endpoint: string

    @Column({type: "longtext"})
    authkey: string

    @Column({type: "longtext"})
    p256dhkey: string

}