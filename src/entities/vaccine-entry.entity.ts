import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vaccine_entry')
export class VaccineEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: new Date().getDate()})
  txnDay: number;

  @Column({default: new Date().getMonth()})
  txnMonth: number;

  @Column({default: new Date().getFullYear()})
  txnYear: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  existinghealthproblems: string;

  @Column()
  email: string;

  @Column()
  hospitalname: string;

  @Column()
  productname: string
}