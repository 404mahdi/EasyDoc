import { jest } from '@jest/globals';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import userModel from '../models/userModel.js';

// Mock the userModel
jest.mock('../models/userModel.js', () => ({
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn()
}));

describe('Cart Controller Tests', () => {
  let req;
  let res;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup request and response objects
    req = {
      body: {
        userId: 'testUserId',
        itemId: 'testItemId'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('addToCart', () => {
    test('should add an item to the cart successfully', async () => {
      // Mock user data
      const mockUser = {
        _id: 'testUserId',
        cartData: {}
      };

      // Mock the findById method
      userModel.findById = jest.fn().mockResolvedValue(mockUser);

      // Mock the findByIdAndUpdate method
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue({});

      // Call the function
      await addToCart(req, res);

      // Assertions
      expect(userModel.findById).toHaveBeenCalledWith('testUserId');
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('testUserId', { cartData: { testItemId: 1 } });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Added to Cart'
      });
    });

    test('should increment item quantity if already in cart', async () => {
      // Mock user data with existing item in cart
      const mockUser = {
        _id: 'testUserId',
        cartData: { testItemId: 1 }
      };

      // Mock the findById method
      userModel.findById = jest.fn().mockResolvedValue(mockUser);

      // Mock the findByIdAndUpdate method
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue({});

      // Call the function
      await addToCart(req, res);

      // Assertions
      expect(userModel.findById).toHaveBeenCalledWith('testUserId');
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('testUserId', { cartData: { testItemId: 2 } });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Added to Cart'
      });
    });

    test('should handle errors', async () => {
      // Mock the findById method to throw an error
      const mockError = new Error('Database error');
      userModel.findById = jest.fn().mockRejectedValue(mockError);

      // Call the function
      await addToCart(req, res);

      // Assertions
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error'
      });
    });
  });

  describe('removeFromCart', () => {
    test('should decrease item quantity in cart', async () => {
      // Mock user data with existing item in cart
      const mockUser = {
        _id: 'testUserId',
        cartData: { testItemId: 2 }
      };

      // Mock the findById method
      userModel.findById = jest.fn().mockResolvedValue(mockUser);

      // Mock the findByIdAndUpdate method
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue({});

      // Call the function
      await removeFromCart(req, res);

      // Assertions
      expect(userModel.findById).toHaveBeenCalledWith('testUserId');
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('testUserId', { cartData: { testItemId: 1 } });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Removed from Cart'
      });
    });

    test('should remove item from cart if quantity becomes 0', async () => {
      // Mock user data with existing item in cart with quantity 1
      const mockUser = {
        _id: 'testUserId',
        cartData: { testItemId: 1 }
      };

      // Mock the findById method
      userModel.findById = jest.fn().mockResolvedValue(mockUser);

      // Mock the findByIdAndUpdate method
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue({});

      // Call the function
      await removeFromCart(req, res);

      // Assertions
      expect(userModel.findById).toHaveBeenCalledWith('testUserId');
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('testUserId', { cartData: {} });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Removed from Cart'
      });
    });

    test('should handle errors', async () => {
      // Mock the findById method to throw an error
      const mockError = new Error('Database error');
      userModel.findById = jest.fn().mockRejectedValue(mockError);

      // Call the function
      await removeFromCart(req, res);

      // Assertions
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error'
      });
    });
  });

  describe('getCart', () => {
    test('should return cart data successfully', async () => {
      // Mock user data
      const mockUser = {
        _id: 'testUserId',
        cartData: {
          item1: 2,
          item2: 1
        }
      };

      // Mock the findById method
      userModel.findById = jest.fn().mockResolvedValue(mockUser);

      // Call the function
      await getCart(req, res);

      // Assertions
      expect(userModel.findById).toHaveBeenCalledWith('testUserId');
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        cartData: { item1: 2, item2: 1 }
      });
    });

    test('should handle errors', async () => {
      // Mock the findById method to throw an error
      const mockError = new Error('Database error');
      userModel.findById = jest.fn().mockRejectedValue(mockError);

      // Call the function
      await getCart(req, res);

      // Assertions
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error'
      });
    });
  });
});
