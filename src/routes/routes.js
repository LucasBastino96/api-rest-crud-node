import { Router } from 'express';
export const router = Router();
import { connection } from '../databaseConnection.js';
import * as c from '../controllers/afiliados.controllers.js'


await connection();

router.get('/', (req, res) => { res.send('pagina principal'); });

router.get('/formDePrueba', c.renderForm);

router.get('/formAgregarAfiliado', c.renderFormAgregarAfiliado);

router.post('/agregarAfiliado', c.agregarAfiliado);

router.get('/editarAfiliado/:id', c.editarAfiliadoForm);

router.post('/editarAfiliado/:id', c.editarAfiliado);

router.get('/eliminarAfiliado/:id', c.eliminarAfiliado);

router.post('/agregarFamiliar', c.agregarFamiliar)

router.get('/buscadorRealTime', c.renderBuscadorRealTime)

router.post('/buscadorRealTime', c.buscadorRealTime)

router.get('/familiaresAfiliado/:id', c.renderFamiliaresAfiliado)

router.get('/eliminar/:id', c.eliminarAfiliado)

router.get('/rechazo', c.rechazo)

router.get('/creadorDeData', c.creadorDeData)




















router.get('/pruebaDB', async (req, res) => {
  try {
    const allProducts = await Afiliado.find({ price: 50 });
    res.json(allProducts);
  } catch (error) {
    res.send('no andaaaaaaa');
  }
});

const checkProduct = (products, req) => {
  let productFound = products.find((p) => p.id == req.params.id);
  return productFound;
};

router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/users', (req, res) => {
  const users = [
    { name: 'lucas', age: 26 },
    { name: 'marcos', age: 41 }
  ];
  res.render('index.ejs', { users });
});

router.get('/posts', async (req, res) => {
  const datos = await axios.get('https://jsonplaceholder.typicode.com/posts'); // cuando lees algo de otro lugar siempre es async
  res.render('posts.ejs', { posteos: datos.data });
});

router.get('/productsdb', async (req, res) => {});

router.post('/products', (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

router.put('/products/:id', (req, res) => {
  // para el ejemplo, le pasaria el dato a actualizar mediante el body
  const newData = req.body;
  if (!checkProduct(products, req)) {
    return res.status(404).send('Producto no encontrado');
  }
  products = products.map((p) =>
    p.id == req.params.id ? { ...p, ...newData } : p
  );
  res.send(`Actualizando productos`);
});

router.delete('/products/:id', (req, res) => {
  if (!checkProduct(products, req)) {
    return res.status(404).send('Producto no encontrado');
  }
  products = products.filter((product) => product.id != req.params.id); // filtro dejando los que NO quiero borrar y reemplazo el array products por el array nuevo
  res.json(products);
});

router.get('/products/:id', (req, res) => {
  if (!checkProduct(products, req)) {
    return res.status(404).send('Producto no encontrado');
  }
  res.json(checkProduct(products, req));
});

router.patch('/products/:id', (req, res) => {
  res.send(`Actualizando un producto`);
});
