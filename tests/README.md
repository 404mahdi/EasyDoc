# Unit Tests for MERN Project

This directory contains unit tests for the backend controllers of the MERN project.

## Test Files

1. **orderController.test.js**: Tests for the order controller functions
   - `placeOrder`: Creating new orders
   - `userOrders`: Retrieving a user's orders

2. **cartController.test.js**: Tests for the cart controller functions
   - `addToCart`: Adding items to the cart
   - `removeFromCart`: Removing items from the cart
   - `getCart`: Retrieving cart data

## Running Tests

To run the tests, first make sure you have installed the required dependencies:

```bash
npm install
```

Then you can run the tests with:

```bash
npm test
```

Or run tests in watch mode (which will rerun tests when files change):

```bash
npm run test:watch
```

## Test Coverage

The tests are configured to generate coverage reports. After running the tests, you can find the coverage report in the `coverage` directory.

## Writing More Tests

To add more tests:

1. Create a new test file in the `tests` directory with a `.test.js` extension
2. Import the functions you want to test
3. Mock any dependencies
4. Write your test cases

Example:

```javascript
import { jest } from '@jest/globals';
import { yourFunction } from '../path/to/your/file.js';
import yourModel from '../path/to/your/model.js';

// Mock dependencies
jest.mock('../path/to/your/model.js', () => ({
  someMethod: jest.fn()
}));

describe('Your Function Tests', () => {
  let req;
  let res;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup request and response
    req = { body: { /* test data */ } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('should do something successfully', async () => {
    // Setup mocks
    yourModel.someMethod.mockResolvedValue(/* mock return value */);
    
    // Call the function
    await yourFunction(req, res);
    
    // Assertions
    expect(yourModel.someMethod).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      // other expected properties
    });
  });
});
```
