import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class ErrorLog extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  logId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  controllerName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  routeName: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  inputParameter: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  errorMessage: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;
}
