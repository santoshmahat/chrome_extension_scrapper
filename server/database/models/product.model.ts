import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model<Product> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  source!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  entity!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image_url?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  price?: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
