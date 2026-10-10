import Persona from "../models/Persona.js"
import Libro from "../models/libros.js"
import Venta from "../models/venta.js"
// Asociaciones
Persona.hasMany(Venta, { foreignKey: 'personaId', as: 'venta' });
Venta.belongsTo(Persona, { foreignKey: 'personaId', as: 'persona' });
Libro.hasMany(Venta, { foreignKey: 'libroId', as: 'venta' });
Venta.belongsTo(Libro, { foreignKey: 'libroId', as: 'libro' });
export { Persona, Libro, Venta }