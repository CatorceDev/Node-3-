import Sequelize from "sequelize";
import { DataTypes } from 'sequelize';
import db from '../config/db.js';
const Persona = db.define('Persona', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },

    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0, max: 120 },
    }
}, {
    tableName: 'persona',
    timestamps: false,
});
export default Persona;