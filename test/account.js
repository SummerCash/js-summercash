const assert = require('assert'); // Tests
const {Account} = require('../src/accounts/account'); // Account

describe('Account', () => {
  describe('#constructor', () => {
    it('should initialize a new account instance', () => {
      const account = new Account(); // Init new account

      assert.ok(account.address.toString().includes('0x')); // Ensure has 0x
      assert.strictEqual(account.address.toString().length, 38); // Ensure valid hash
    });
  });

  describe('#writeToMemory()', () => {
    it('should write an account to persistent memory', () => {
      const account = new Account(); // Init new account

      account.writeToMemory(); // Write account to persistent memory
    });
  });
});
