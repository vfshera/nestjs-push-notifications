import {Entity ,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from 'typeorm'


@Entity()
export class Subscriber{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar",length: 1000, unique: true})
    endpoint: string;

    @Column({type: "varchar", length: 1000})
    authkey: string;

    @Column({type: "varchar", length: 1000})
    p256dhkey: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}