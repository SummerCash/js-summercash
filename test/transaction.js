const assert = require('assert'); // Tests
const {Transaction} = require('../src/types/transaction'); // Tx class
const {Address, Hash} = require('../src/common/common_types'); // Common types
const {Account} = require('../src/accounts/account'); // Account
const BigNumber = require('bn.js'); // Big number

describe('Transaction', () => {
  describe('#bytes()', () => {
    it('should serialize the given transaction to a Uint8Array', () => {
      const transaction = new Transaction(
        0,
        Hash.fromString(
          '0x307836f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5',
        ),
        Address,
        Address,
        new BigNumber(0),
        null,
      );

      assert.equal(transaction.hash.hash.length, 34); // Ensure valid hash
    });

    describe('#sign()', () => {
      it('should sign a given transaction via ECDSA', () => {
        const account = new Account(); // Initialize new account

        const transaction = new Transaction(
          0,
          Hash.fromString(
            '0x307836f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5',
          ),
          account.address,
          account.address,
          new BigNumber(0),
          null,
        ); // Initialize transaction

        transaction.sign(account.privateKey); // Sign transaction

        assert.ok(
          transaction.signature !== undefined && transaction.signature !== null,
        ); // Ensure has been signed
      });
    });

    describe('#verifySignature()', () => {
      it('should verify the signature of a given transaction', () => {
        const account = new Account(); // Initialize new account

        const transaction = new Transaction(
          0,
          Hash.fromString(
            '0x307836f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5',
          ),
          account.address,
          account.address,
          new BigNumber(0),
          null,
        ); // Initialize transaction

        transaction.sign(account.privateKey); // Sign transaction

        assert.ok(transaction.verifySignature()); // Verify signature
      });
    });
  });
});
