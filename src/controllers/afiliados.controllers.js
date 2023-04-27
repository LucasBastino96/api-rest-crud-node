import { AfiliadoModel, FamiliarModel } from '../pruebaDBModels.js';


export const renderPaginaPrincipal = (req, res) =>{
  res.render('paginaPrincipal.ejs')
}

export const renderForm = async (req, res) => {
  try {
    const afiliados = await AfiliadoModel.find().lean(); // el lean hace que en vez de devolver documentos de mongodb devuelve objetos de js para que funcionen mejor con funciones (en este caso igual anda si se lo sacas)
    res.render('formDePrueba.ejs', { afiliados, titulo : 'Formulario de prueba' });
  } catch (error) {
    console.log(error);
  }
};

export const renderBuscadorRealTime = (req, res) =>{
  res.render('buscadorRealTime.ejs');
}

export const buscadorRealTime = async (req, res) => { 
  const key = req.body.key.trim() // trim elimina los espacios en blanco que hay al principio y al final
  const page = req.body.page
  console.log(page)
  const resultadosBusqueda = await AfiliadoModel.paginate({
    $or:[
      {nombre: new RegExp(key, "i")},  
      {apellido: new RegExp(key, "i")},
      {edad : new RegExp(key)}    
      // {apellido: {$regex: '.*' + key + '.*' }} otra forma de hacerlo pero no se como agregarle el case insensitive
    ]},
    { limit : 10, page : page})
  console.log(resultadosBusqueda)
  let condicion = (key == '') ? res.send('No hay coincidencias') : res.send({resultadosBusqueda, key})
};

export const creadorDeData = async (req, res) => {
  for (let i = 26; i < 400; i++){
    await AfiliadoModel.create({
      nombre: "asdasdasd",
      apellido: "bbbsjdbsdjbsj",
      edad: i
    })
  }
res.send('listo')
}

export const renderFormAgregarAfiliado = (req, res) =>{
  res.render('formAgregarAfiliado.ejs', { titulo : 'Formulario de agregar afiliado'})
}

export const eliminarAfiliado = async (req, res) => {
  const afiliado = await AfiliadoModel.findById(req.params.id);
  await AfiliadoModel.findByIdAndDelete(req.params.id);
  console.log(`afiliado ${afiliado.nombre} eliminado`)
  res.redirect('/')
}

export const eliminarFamiliar = async (req, res) => {
  const familiar = await FamiliarModel.findById(req.params.id);
  await FamiliarModel.findByIdAndDelete(req.params.id);
  console.log(`familiar ${familiar.nombre} eliminado`)
  res.redirect('/')
}

export const rechazo = (req,res) =>{
  res.send('rechazo')
}

export const renderFamiliaresAfiliado = async(req,res) =>{
  const afiliado = await AfiliadoModel.findById(req.params.id);
  console.log(`el afiliado es ${afiliado}`)
  const familiares = await FamiliarModel.find({ dni_original : afiliado.dni })
  console.log(familiares)
  res.render('familiaresAfiliado.ejs', { familiares })
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

export const editarFamiliarForm = async (req, res) =>{
  const id = req.params.id;
  const familiar = await FamiliarModel.findById(id).lean();
  res.render('editarFamiliar.ejs', { familiar });
}

export const editarFamiliar = async (req, res) => {
  await FamiliarModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
}

export const editarAfiliadoForm = async (req, res) => {
  const id = req.params.id;
  const afiliado = await AfiliadoModel.findById(id).lean();
  res.render('editarAfiliado.ejs', { afiliado });
};

export const editarAfiliado = async (req, res) => {
  await AfiliadoModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
  // let afiliado = await AfiliadoModel.findById(id);
  // afiliado = { ...afiliado, req.body }; no funciona, revisar como  seria la forma
};
