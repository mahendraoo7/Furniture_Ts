import express from 'express';
import { showAllProduct, specificProduct } from '../../controller/user/product_controller';
import { verifyToken } from '../../helpers/tokenUser';
const productRoute = express.Router();

productRoute.get('/showall-product', verifyToken, showAllProduct);
productRoute.get('/show-product', verifyToken, specificProduct)

export default productRoute