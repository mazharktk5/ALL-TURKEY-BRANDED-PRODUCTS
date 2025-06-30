import express from 'express'

import { PlaceOrder, PlaceOrderStrip, PlaceOrderRazorPay, userOrders, allOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/updateStatus', adminAuth, updateStatus)
orderRouter.post('/list', adminAuth, allOrders)

orderRouter.post('/placeOrder', authUser, PlaceOrder)
orderRouter.post('/placeOrderStripe', authUser, PlaceOrderStrip)
orderRouter.post('/placeOrderRazorPay', authUser, PlaceOrderRazorPay)

orderRouter.post('/userOrders', authUser, userOrders)

orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter;

