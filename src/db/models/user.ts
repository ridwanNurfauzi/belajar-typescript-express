import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';

type UserAttributes = {
  id?: number,
  email: string,
  firstname: string,
  lastname: string | null,
  password: string,
  photo: string | null,

  createdAt?: Date,
  updatedAt?: Date
};

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public email!: string;
  public firstname!: string;
  public lastname!: string | null;
  public password!: string;
  public photo!: string | null;

  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  firstname: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastname: {
    allowNull: true,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  photo: {
    allowNull: true,
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: 'Users'
});

export default User;
