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

    describe('#fromJSON', () => {
      it('should parse a given transaction from JSON', () => {
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

        const parsed = Transaction.fromJSON(JSON.stringify(transaction)); // Parse tx

        assert.deepEqual(transaction.hash, parsed.hash); // Ensure equal hashes
        assert.deepEqual(transaction.signature, parsed.signature); // Ensure equal signatures
        assert.deepEqual(transaction.amount, parsed.amount); // Ensure equal amounts
        assert.deepEqual(transaction.sender, parsed.sender); // Ensure equal senders
        assert.deepEqual(transaction.recipient, parsed.recipient); // Ensure equal recipients
        assert.deepEqual(transaction.nonce, parsed.nonce); // Ensure equal nonces
        assert.deepEqual(transaction.parentHash, parsed.parentHash); // Ensure equal hashes
        assert.deepEqual(transaction.timestamp, parsed.timestamp); // Ensure equal timestamps
        assert.deepEqual(transaction.payload, parsed.payload); // Ensure equal payloads
        assert.deepEqual(transaction.contractCreation, parsed.contractCreation); // Ensure equal contract creation status
      });
    });
  });
});
