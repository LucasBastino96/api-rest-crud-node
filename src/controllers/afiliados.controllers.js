import { Afiliado, Familiar, Empresa, User } from "../pruebaDBModels.js";
import fs from 'fs';
import { spawn } from 'child_process';
import passport from 'passport';

export const renderPaginaPrincipal = (req, res) => {
  let data = fs.readFileSync('src/data/afiliadosRecientes.json')
  let afiliadosRecientes = JSON.parse(data)
  res.render("paginaPrincipal.ejs", {afiliadosRecientes});
};

export const renderLogin = (req, res) =>{
  res.render('login.ejs')
}

export const registrarAdmin = async (req, res)=>{
  const nuevoAdmin = await User(req.body)
  // nuevoAdmin.imprimir();
  console.log(nuevoAdmin)
  nuevoAdmin.password = await nuevoAdmin.encriptarPassword(nuevoAdmin.password)
  // console.log(contra)
  // console.log('en controllers pre encriptar')
  // const contra = await nuevoAdmin.encriptarPassword(nuevoAdmin.password);
  // console.log('en controllers post encriptar')
  console.log('contra nueva: ', nuevoAdmin.password)
  // nuevoAdmin.password = '$2a$10$tnKWxNxU9u1Vpg7Vb4B09O4165rHfTBCT2fiQfBA4FOWNlDyTV0yu'
  await nuevoAdmin.save();
  res.send('admin ingresado')
}

export const login =  passport.authenticate('local', {
      failureRedirect: '/renderLogin',
      succesRedirect: '/',
      failureFlash: true
    });

export const renderForm = async (req, res) => {
  try {
    const afiliados = await Afiliado.find().lean(); // el lean hace que en vez de devolver documentos de mongodb devuelve objetos de js para que funcionen mejor con funciones (en este caso igual anda si se lo sacas)
    res.render("formDePrueba.ejs", {
      afiliados,
      titulo: "Formulario de prueba",
    });
  } catch (error) {
    console.log(error);
  }
};

export const renderBuscadorRealTime = (req, res) => {
  res.render("buscadorRealTime.ejs");
};

export const buscadorRealTime = async (req, res) => {
  const key = req.body.key.trim(); // trim elimina los espacios en blanco que hay al principio y al final
  const page = req.body.page;
  console.log(page);
  const resultadosBusqueda = await Afiliado.paginate(
    {
      $or: [
        { nombre: new RegExp(key, "i") },
        { apellido: new RegExp(key, "i") },
        { edad: new RegExp(key) },
        // {apellido: {$regex: '.*' + key + '.*' }} otra forma de hacerlo pero no se como agregarle el case insensitive
      ],
    },
    { limit: 10, page: page }
  );
  let condicion =
    key == ""
      ? res.send("No hay coincidencias")
      : res.send({ resultadosBusqueda, key });
};

export const buscadorEmpresas = async (req, res) =>{
  const key = req.body.key.trim();
  console.log('key: ', key);
  const resultadosBusqueda = await Empresa.paginate({ nombre: new RegExp(key, "i")}, { limit:10 });
  console.log('resultados: ', resultadosBusqueda)
  res.send({ resultadosBusqueda })
}

export const creadorDeData = async (req, res) => {
  for (let i = 26; i < 400; i++) {
    await Afiliado.create({
      nombre: "asdasdasd",
      apellido: "bbbsjdbsdjbsj",
      edad: i,
    });
  }
  res.send("listo");
};

export const renderFormAgregarAfiliado = async(req, res) => {
  const empresas = await Empresa.find();
  res.render("formAgregarAfiliado.ejs", { empresas });
};

export const renderFormAgregarEmpresa = (req, res) => {
  res.render("formAgregarEmpresa.ejs", {
    titulo: "Formulario de agregar empresa",
  });
};

export const eliminarAfiliado = async (req, res) => {
  const afiliado = await Afiliado.findById(req.params.id);
  await Afiliado.findByIdAndDelete(req.params.id);
  console.log(`afiliado ${afiliado.nombre} eliminado`);
  res.redirect("/");
};

export const eliminarFamiliar = async (req, res) => {
  const familiar = await Familiar.findById(req.params.id);
  await Familiar.findByIdAndDelete(req.params.id);
  console.log(`familiar ${familiar.nombre} eliminado`);
  res.redirect("/");
};

export const agregarAfiliado = async (req, res) => {
  console.log(req.body);
  console.log("agregarAfiliado POST ejecutado");
  const nuevoAfiliado = await Afiliado(req.body);
  await nuevoAfiliado.save();
  res.send({ nuevoAfiliado })
};

export const agregarFamiliar = async (req) => {
  console.log(req.body);
  console.log("agregarFamiliar POST ejecutado");
  const nuevoFamiliar = await Familiar(req.body);
  await nuevoFamiliar.save();
  // res.redirect('formDePrueba');
};

export const agregarEmpresa = async (req, res)=>{
  console.log(req.body)
  console.log('agregar empresa ejecutado')
  const nuevaEmpresa = await Empresa(req.body);
  await nuevaEmpresa.save();
  res.render('empresaAgregada.ejs', {nuevaEmpresa})
}

export const mostrarEmpresas = async (req, res)=>{
  const empresas = await Empresa.find();
  res.render('mostrarEmpresas.ejs', {empresas})
}

export const fichaEmpresa = async(req, res)=>{
  const empresa = await Empresa.findById(req.params.id);
  res.render('fichaEmpresa.ejs', {empresa})
}

export const editarFamiliar = async (req, res) => {
  await Familiar.findByIdAndUpdate(req.params.id, req.body);
  const familiar = await Familiar.findById(req.params.id);
  const afiliado = await Afiliado.findOne({ dni: familiar.dni_original }); // findOne porque sino hace un array
  res.redirect(`/fichaAfiliado/${afiliado._id}`);
};

export const editarAfiliado = async (req, res) => {
  await Afiliado.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/fichaAfiliado/${req.params.id}`);
  // let afiliado = await Afiliado.findById(id);
  // afiliado = { ...afiliado, req.body }; no funciona, revisar como seria la forma
};

export const fichaAfiliado = async (req, res) => {
  const afiliado = await Afiliado.findById(req.params.id);
  const familiares = await Familiar.find({ dni_original: afiliado.dni });

  // lee los datos del archivo
  let data = fs.readFileSync('src/data/afiliadosRecientes.json')
  let afiliadosRecientes = JSON.parse(data)

  // hace un nuevo array filtrando sin repetidos
  let listaAfiliados = afiliadosRecientes.lista;
  listaAfiliados = listaAfiliados.filter(a => a._id != afiliado._id )

  // revisa si hay mas de 10 afiliados
  if (listaAfiliados.length > 11){
      listaAfiliados.pop();
    }
    
  listaAfiliados.unshift(afiliado);
  afiliadosRecientes.lista = listaAfiliados;

  let afiliadosRecientesString = JSON.stringify(afiliadosRecientes)
  fs.writeFileSync('src/data/afiliadosRecientes.json', afiliadosRecientesString)


  res.render("fichaAfiliado.ejs", { afiliado, familiares });
};

export const hacerBackup = (req, res)=>{
  spawn('cmd.exe', ['/c','C:/Users/cuent/Desktop/backups/backup.bat']);
  res.render('backup.ejs')
}

export const imprimirPadron = async (req, res) =>{
  const afiliados = await Afiliado.find()
  res.render('padronAfiliados.ejs', {afiliados})
}