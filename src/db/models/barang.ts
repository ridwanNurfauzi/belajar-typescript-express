import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';

type BarangAttributes = {
  id?: number,
  nama: string | null,
  harga: number | null,

  createdAt?: Date,
  updatedAt?: Date
};

export interface BarangInput extends Optional<BarangAttributes, 'id'>{ }
export interface BarangOutput extends Required<BarangAttributes>{ }

class Barang extends Model<BarangAttributes, BarangInput> implements BarangAttributes {
  public id!: number;
  public nama!: string | null;
  public harga!: number;
  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

Barang.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  nama: {
    allowNull: true,
    type: DataTypes.STRING
  },
  harga: {
    allowNull: true,
    type: DataTypes.DOUBLE
  }
},{
  timestamps: true,
  sequelize: connection,
  tableName: 'Barang'
}
);

export default Barang;
