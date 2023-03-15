import mongoose from 'mongoose';
const { Schema } = mongoose;

const AfiliadoSchema = new Schema(
  {
    nombre: { type: String },
    apellido: String,
    edad: Number,
    dni: Number,
    done: Boolean
  },
  {
    timestamps: true // permite crear un createdAt y un updatedAt
  }
);

const FamiliarAfiliadoSchema = new Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  dni: Number,
  dni_original: Number
});



export const Afiliado = mongoose.model('afiliados4', AfiliadoSchema); // afiliados1 es el nombre de la base de datos, si no existe se crea

export const Familiar = mongoose.model('familiares_afiliados', FamiliarAfiliadoSchema);
