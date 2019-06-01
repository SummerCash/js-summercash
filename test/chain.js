const assert = require('assert'); // Tests
const {Account} = require('../src/accounts/account'); // Account
const {Chain} = require('../src/types/chain'); // Chain

describe('Chain', () => {
  describe('#constructor()', () => {
    it('should initialize a new chain instance', () => {
      const account = new Account(); // Init new account

      assert.ok(account.address.toString().includes('0x')); // Ensure has 0x
      assert.strictEqual(account.address.toString().length, 38); // Ensure valid address

      const chain = new Chain(account.address); // Initialize chain

      assert.ok(chain !== null); // Ensure is not null
      assert.strictEqual(
        chain.account.address.toString(),
        account.address.address.toString(),
      ); // Ensure equal addresses
    });
  });

  describe('#writeToMemory()', () => {
    it('should write the given chain to persistent memory', () => {
      const account = new Account(); // Init new account

      assert.ok(account.address.toString().includes('0x')); // Ensure has 0x
      assert.strictEqual(account.address.toString().length, 38); // Ensure valid address

      const chain = new Chain(account.address); // Initialize chain

      assert.ok(chain !== null); // Ensure is not null
      assert.strictEqual(
        chain.account.address.toString(),
        account.address.address.toString(),
      ); // Ensure equal addresses

      chain.writeToMemory(); // Write to memory
    });
  });

  describe('#readFromMemory()', () => {
    it('should read a chain from persistent memory', () => {
      const account = new Account(); // Init new account

      assert.ok(account.address.toString().includes('0x')); // Ensure has 0x
      assert.strictEqual(account.address.toString().length, 38); // Ensure valid address

      const chain = new Chain(account.address); // Initialize chain

      assert.ok(chain !== null); // Ensure is not null
      assert.strictEqual(
        chain.account.address.toString(),
        account.address.address.toString(),
      ); // Ensure equal addresses

      chain.writeToMemory(); // Write to memory

      const readChain = Chain.readFromMemory(account.address); // Read chain

      assert.strictEqual(JSON.stringify(chain), JSON.stringify(readChain)); // Ensure equal chains
    });
  });
});
