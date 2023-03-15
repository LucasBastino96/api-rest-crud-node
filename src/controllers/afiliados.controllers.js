import { Afiliado, Familiar } from '../pruebaDBModels.js';


export const renderForm = async (req, res) => {
  try {
    const afiliados = await Afiliado.find().lean(); // el lean hace que en vez de devolver documentos de mongodb devuelve objetos de js para que funcionen mejor con funciones (en este caso igual anda si se lo sacas)
    res.render('formDePrueba.ejs', { afiliados });
  } catch (error) {
    console.log(error);
  }
};

export const agregarAfiliado = async(req) => {
  console.log(req.body);
  console.log('node ejecutado')
  const nuevoAfiliado = Afiliado(req.body);
  await nuevoAfiliado.save();
  // res.redirect('formDePrueba');
}


export const agregarFamiliar = async (req) => {
  const nuevoFamiliar = Familiar(req.body);
  await nuevoFamiliar.save();
  // res.redirect('formDePrueba');
}

export const editarAfiliadoForm = async (req, res) => {
  const id = req.params.id;
  const afiliado = await Afiliado.findById(id).lean();
  res.render('editarAfiliado.ejs', { afiliado });
}

export const editarAfiliado = async (req, res) => {
  await Afiliado.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/formDePrueba');
  // let afiliado = await Afiliado.findById(id);
  // afiliado = { ...afiliado, req.body }; no funciona, revisar como  seria la forma
}

export const toggleDone = async (req, res) => {
  const afiliado = await Afiliado.findById(req.params.id);
  afiliado.done = !afiliado.done
  await afiliado.save();
  res.redirect('/formDePrueba');
  // Otra manera de resolverlo:  (el findByIdAndUpdate sirve mas para formularios, para req.body)
  // const afi = await Afiliado.findById(req.params.id).lean();
  // await Afiliado.findByIdAndUpdate(req.params.id, { done : !afi.done} );
}

export const eliminarAfiliado = async (req, res) => {
  await Afiliado.findByIdAndDelete(req.params.id);
  res.redirect('/formDePrueba');
}