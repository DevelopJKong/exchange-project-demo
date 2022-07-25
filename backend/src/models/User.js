import SQ from 'sequelize';
import { sequelize } from '../db.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username: {
        type:DataTypes.STRING(45),
        allowNull:false,
    },
    password: {
        
    }
})