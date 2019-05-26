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

  describe('#readFromMemory()', () => {
    it('should read an account from persistent memory', () => {
      const account = new Account(); // Init new account

      account.writeToMemory(); // Write account to persistent memory

      const readAccount = Account.readFromMemory(account.address); // Read account

      assert.strictEqual(
        account.privateKey.toString(),
        readAccount.privateKey.toString(),
      ); // Ensure private keys equal
      assert.strictEqual(
        account.publicKey.encode('hex'),
        readAccount.publicKey.encode('hex'),
      ); // Ensure public keys equal
      assert.strictEqual(
        account.address.toString(),
        readAccount.address.toString(),
      ); // Ensure addresses equal
    });
  });
});
