import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

@Table
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  mobileNumber: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
}
