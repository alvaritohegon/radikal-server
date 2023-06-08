const router = require("express").Router();

const Product = require("../models/Product.model");

// POST "/api/product" => ruta post para crear un nuevo producto
router.post("/", async (req, res, next) => {

  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);

  } catch (error) {
    res.status(400).json({ errorMessage: "Error al crear el producto  :(" });
  }

});

// GET "/api/product" => ruta get para obtener todos los productos
router.get("/", async (req, res, next) => {

  try {
    const products = await Product.find();
    res.json(products);

  } catch (error) {
    res.status(500).json({ errorMessage: "Error al obtener los productos :(" });
  }

});

// GET "/api/product/:id" => ruta get para obtener un producto por su ID
router.get("/:id", async (req, res, next) => {

  try {

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ errorMessage: "Producto no encontrado :(" });
    }
    res.json(product);

  } catch (error) {
    res.status(500).json({ errorMessage: "Error al obtener el producto :(" });
  }

});

// PUT "/api/product/:id" => ruta put para actualizar un producto por su ID
router.put("/:id", async (req, res, next) => {

  try {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({ errorMessage: "Producto no encontrado :(" });
    }
    res.json(product);
    console.log("producto actualizado", product);

  } catch (error) {
    res.status(400).json({ errorMessage: "Error al actualizar el producto :(" });
  }
});

// DELETE "/api/product/:id" ruta delete para eliminar un producto por su ID
router.delete("/:id", async (req, res, next) => {
    
  try {

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado :(" });
    }
    res.json({ message: "Producto eliminado correctamente :)" });

  } catch (error) {
    res.status(500).json({ errorMessage: "Error al eliminar el producto :(" });
  }
});

module.exports = router;
