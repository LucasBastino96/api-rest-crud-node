import mongoose from 'mongoose';
const { Schema } = mongoose;

const AfiliadoSchema = new Schema(
  {
    nombre: { type: String },
    apellido: String,
    edad: String,
    dni: String,
    done: Boolean
  },
  {
    timestamps: true // permite crear un createdAt y un updatedAt
  }
);

const FamiliarAfiliadoSchema = new Schema({
  nombre: String,
  apellido: String,
  edad: String,
  dni: String,
  dni_original: String
});



export const AfiliadoModel = mongoose.model('afiliados4', AfiliadoSchema); // afiliados1 es el nombre de la base de datos, si no existe se crea

export const FamiliarModel = mongoose.model('familiaresAfiliados5', FamiliarAfiliadoSchema);
