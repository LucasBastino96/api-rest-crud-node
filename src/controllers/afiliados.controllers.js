import { AfiliadoModel, FamiliarModel } from '../pruebaDBModels.js';
export const renderForm = async (req, res) => {
  try {
    const afiliados = await AfiliadoModel.find().lean(); // el lean hace que en vez de devolver documentos de mongodb devuelve objetos de js para que funcionen mejor con funciones (en este caso igual anda si se lo sacas)
    res.render('formDePrueba.ejs', { afiliados });
  } catch (error) {
    console.log(error);
  }
};

export const buscador = async (req, res) => { 
  res.render('buscador.ejs', {afiliados});
};

export const converter = async (req, res) =>{

  const afiliados = await AfiliadoModel.find()
  
  // await AfiliadoModel.updateMany({},            // convierte todos los campos "edad" a un string con el mismo valor
  //   [{$set: {edad: {$toString: "$edad" } } }])


// afiliados.forEach( afi =>{                       // le pone edades random a los afiliados
//   afi.edad = Math.floor(Math.random() * 99)
//   afi.save()
//   })

// await AfiliadoModel.updateMany({},               // convierte todos los campos "edad" a un entero con el mismo valor
//     [{$set: {edad: {$toInt: "$edad" } } }])

res.render('buscador.ejs', {afiliados});
}

export const buscar = async (req, res) => {
  const key = req.body.key;
  // const afiliados = await AfiliadoModel.find({"nombre" : new RegExp(key)})   FUNCIONA DE LAS 2 MANERAS
  const afiliados = await AfiliadoModel.find({
    $or:[
    {nombre: {$regex: '.*' + key + '.*' }},
    {apellido: {$regex: '.*' + key + '.*' }},
    {edad: {$regex: '.*' + key + '.*' }}
    //{empresa: {$regex: '.*' + key + '.*' }}
    //{numeroAfiliado: {$regex: '.*' + key + '.*' }}
  ]});
  res.render('resultadoBusqueda.ejs', { afiliados });
};

export const buscarFamiliares = async (req, res) => {
  const key = req.body.key;
  console.log(key);
  const famiTodos = await FamiliarModel.find();
  const familiares = await FamiliarModel.find({ dni_original: key})
  res.render('resultadoBusquedaFamiliares.ejs', { familiares, famiTodos })
};

export const agregarAfiliado = async (req) => {
  console.log(req.body);
  console.log('agregarAfiliado POST ejecutado');
  const nuevoAfiliado = await AfiliadoModel(req.body);
  await nuevoAfiliado.save();
  // res.redirect('formDePrueba');
};

export const agregarFamiliar = async (req) => {
  console.log(req.body);
  console.log('agregarFamiliar POST ejecutado');
  const nuevoFamiliar = await FamiliarModel(req.body);
  await nuevoFamiliar.save();
  // res.redirect('formDePrueba');
};

export const editarAfiliadoForm = async (req, res) => {
  const id = req.params.id;
  const afiliado = await AfiliadoModel.findById(id).lean();
  res.render('editarAfiliado.ejs', { afiliado });
};

export const editarAfiliado = async (req, res) => {
  await AfiliadoModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/formDePrueba');
  // let afiliado = await AfiliadoModel.findById(id);
  // afiliado = { ...afiliado, req.body }; no funciona, revisar como  seria la forma
};

export const toggleDone = async (req, res) => {
  const afiliado = await Afiliado.ModelfindById(req.params.id);
  afiliado.done = !afiliado.done;
  await afiliado.save();
  res.redirect('/formDePrueba');
  // Otra manera de resolverlo:  (el findByIdAndUpdate sirve mas para formularios, para req.body)
  // const afi = await AfiliadoModel.findById(req.params.id).lean();
  // await Afiliado.findByIdAndUpdate(req.params.id, { done : !afi.done} );
};

export const eliminarAfiliado = async (req, res) => {
  await AfiliadoModel.findByIdAndDelete(req.params.id);
  res.redirect('/formDePrueba');
};
