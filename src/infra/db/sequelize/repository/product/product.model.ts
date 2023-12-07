import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @Column({ allowNull: false, type: DataType.NUMBER })
  declare price: number;
}
