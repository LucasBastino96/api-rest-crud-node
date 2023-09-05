import mongoose from 'mongoose';
const { Schema } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcryptjs';

const AfiliadoSchema = new Schema(
  {
    nombre: { type: String },
    apellido: String,
    edad: String,
    dni: String,
    empresa: String,
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

const EmpresaSchema = new Schema({
  nombre: String,
  cuit: Number,
  domicilio: String
});

const UserSchema = new Schema({
  nombre: String,
  password: String
})

AfiliadoSchema.plugin(mongoosePaginate);
EmpresaSchema.plugin(mongoosePaginate);

UserSchema.methods.encriptarPassword = async (password) =>{
  console.log('entro a encriptar')
  const salt = await bcrypt.genSalt(10);
  console.log('salt', salt)
  const passAct = await bcrypt.hash(password, salt)
  console.log('contraseña encriptada: ', passAct)
  return passAct;
}

UserSchema.methods.compararPassword = async function (password){
  return await bcrypt.compare(password, this.password) // aca el this no se refiere al UserSchema, sino a la instancia de User usada en el momento, porque es un metodo que va a usar el User
}

UserSchema.methods.imprimir = () =>{
  console.log('method imprimir')
}

export const Afiliado = mongoose.model('afiliados4', AfiliadoSchema); // afiliados1 es el nombre de la coleccion, si no existe se crea

export const Familiar = mongoose.model('familiaresAfiliados5', FamiliarAfiliadoSchema);

export const Empresa = mongoose.model('empresas', EmpresaSchema);

export const User = mongoose.model('users', UserSchema);