import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class SuperheroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  real_name: string;

  @Column()
  origin_description: string;

  @Column("simple-array")
  superpowers: string[];

  @Column()
  catch_phrase: string;

  @Column("simple-array")
  heroimages: string[];
}
