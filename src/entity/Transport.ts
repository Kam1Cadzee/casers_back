import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum Status {
  WAY = 'way',
  ARRIVED = 'arrived',
  COLLISION = 'collision'
}

interface IDevice {
  number: string;
  damaged: boolean;
}

@Entity()
export class Transport {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({nullable: true})
  collisionId?: string;

  @Column({
    type: 'enum',
    enum: Status
  })
  status: Status;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  number_transport: string;

  @Column()
  number_trailer: string;

  @Column()
  driver: string;

  @Column('simple-json')
  devices: IDevice[];
}
