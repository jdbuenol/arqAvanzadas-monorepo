import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";
import {Order} from "./order.entity";

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: string;

    @Column()
    user: string;

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'link_products',
        joinColumn: {name: 'link_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'product_id', referencedColumnName: 'id'}
    })
    products: Product[];

    @OneToMany(() => Order, order => order.link, {
        createForeignKeyConstraints: false
    })
    @JoinColumn({
        referencedColumnName: 'code',
        name: 'code'
    })
    orders: Order[];
}
