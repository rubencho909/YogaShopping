const express = require("express");
const router = express.Router();

// Trae la respuesta JSON desde el controlador
const {getProducts, 
       newProduct, 
       getProductById, 
       updateProduct, 
       deleteProduct, 
       createProductReview, 
       getProductReviews, 
       deleteReview, 
       getAdminProducts
} = require("../controllers/productsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Verificar Autenticacion
router.route('/productos').get(getProducts)    // Establece la ruta donde queremos ver el getProducts
router.route('/producto/:id').get(getProductById);      // Ruta para consultar un producto por Id
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route("/review").delete(isAuthenticatedUser, deleteReview)

// Rutas Admin
router.route('/producto/nuevo').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);       // Establecemos la ruta para crear un nuevo producto
router.route('/producto/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);       // Creacion de la ruta de actualizacion
router.route('/producto/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);    // Creacion de la ruta para eliminacion por ID
router.route('/admin/productos').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);    // Creacion de la ruta para eliminacion por ID



module.exports = router;