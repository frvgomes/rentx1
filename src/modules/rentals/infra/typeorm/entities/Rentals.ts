import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/Users";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  readonly id?: string; // readonly defini que somente essa classe pode atribuir valor à esse campo

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" }) // é como um combobox
  car: Car;
  @Column()
  car_id?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" }) // é como um combobox
  user: User;
  @Column()
  user_id?: string;

  @CreateDateColumn()
  start_date?: Date;

  @CreateDateColumn()
  end_date?: Date;

  @CreateDateColumn()
  expected_return_date?: Date;

  @Column()
  total?: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
