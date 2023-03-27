import { AfiliadoModel, FamiliarModel } from '../pruebaDBModels.js';

export const renderForm = async (req, res) => {
  try {
    const afiliados = await AfiliadoModel.find().lean(); // el lean hace que en vez de devolver documentos de mongodb devuelve objetos de js para que funcionen mejor con funciones (en este caso igual anda si se lo sacas)
    res.render('formDePrueba.ejs', { afiliados });
  } catch (error) {
    console.log(error);
  }
};

export const renderBuscadorRealTime = (req, res) =>{
  res.render('buscadorRealTime.ejs');
}

export const buscadorRealTime = async (req, res) => { 
  const key = req.body.key.trim() // trim elimina los espacios en blanco que hay al principio y al final
  const resultadosBusqueda = await AfiliadoModel.find({
    $or:[
      {nombre: {$regex: '.*' + key + '.*' }},
      {apellido: {$regex: '.*' + key + '.*' }},
      {edad: {$regex: '.*' + key + '.*' }}
    ]
  })
  // console.log(resultadosBusqueda)
  let condicion = (key == '') ? res.send('No hay coincidencias') : res.send(resultadosBusqueda);
};

export const renderFormAgregarAfiliado = (req, res) =>{
  res.render('formAgregarAfiliado.ejs')
}

export const eliminarAfiliado = async (req, res) => {
  const afiliado = await AfiliadoModel.findById(req.params.id);
  await AfiliadoModel.findByIdAndDelete(req.params.id);
  console.log(`afiliado ${afiliado.nombre} eliminado`)
  res.redirect('/buscadorRealTime')
}

export const rechazo = (req,res) =>{
  res.send('rechazo')
}

export const renderFamiliaresAfiliado = async(req,res) =>{
  const afiliado = await AfiliadoModel.findById(req.params.id);
  const familiares = await FamiliarModel.find({ dni_original : afiliado.dni })
  res.render('familiaresAfiliados.ejs', { familiares })
}

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
