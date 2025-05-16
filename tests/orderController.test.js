import { jest } from '@jest/globals';
import { placeOrder, userOrders } from '../controllers/orderController.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Mock the models
jest.mock('../models/orderModel.js', () => {
  function OrderModel(data) {
    this.data = data;
    this._id = 'newOrderId';
    this.save = jest.fn().mockResolvedValue({ _id: 'newOrderId' });
  }
  OrderModel.find = jest.fn();
  return OrderModel;
});

jest.mock('../models/userModel.js', () => ({
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn()
}));

describe('Order Controller Tests', () => {
  let req;
  let res;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup request and response objects
    req = {
      body: {
        userId: 'testUserId',
        items: [
          { _id: 'item1', name: 'Test Medicine', price: 10, quantity: 2 },
          { _id: 'item2', name: 'Another Medicine', price: 15, quantity: 1 }
        ],
        amount: 35,
        address: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          street: '123 Main St',
          city: 'Anytown',
          state: 'State',
          zipcode: '12345',
          phone: '123-456-7890'
        }
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('placeOrder', () => {
    test('should create a new order successfully', async () => {
      // Mock the findByIdAndUpdate method of userModel
      userModel.findByIdAndUpdate.mockResolvedValue({});

      // Call the function
      await placeOrder(req, res);

      // Assertions
      expect(orderModel).toHaveBeenCalledWith({
        userId: 'testUserId',
        items: req.body.items,
        amount: 35,
        address: req.body.address,
        payment: 'Pending'
      });

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('testUserId', { cartData: {} });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Order placed successfully',
        orderId: 'newOrderId'
      });
    });

    test('should return error when required fields are missing', async () => {
      // Remove required fields
      req.body.items = undefined;

      // Call the function
      await placeOrder(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Missing required fields'
      });
    });

    test('should handle database errors', async () => {
      // Mock the save method to throw an error
      const mockError = new Error('Database error');
      orderModel.prototype.save = jest.fn().mockRejectedValue(mockError);

      // Call the function
      await placeOrder(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error placing order',
        error: 'Database error'
      });
    });
  });

  describe('userOrders', () => {
    test('should return user orders successfully', async () => {
      // Mock data
      const mockOrders = [
        { _id: 'order1', items: [], amount: 25 },
        { _id: 'order2', items: [], amount: 30 }
      ];

      // Mock the find method
      orderModel.find = jest.fn().mockResolvedValue(mockOrders);

      // Call the function
      await userOrders(req, res);

      // Assertions
      expect(orderModel.find).toHaveBeenCalledWith({ userId: 'testUserId' });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockOrders
      });
    });

    test('should handle errors when fetching orders', async () => {
      // Mock the find method to throw an error
      const mockError = new Error('Database error');
      orderModel.find = jest.fn().mockRejectedValue(mockError);

      // Call the function
      await userOrders(req, res);

      // Assertions
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error'
      });
    });
  });
});
