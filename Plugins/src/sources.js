'use strict';

var plugins_sources = [
    //
    //  Format
    //
    'src/format/base58.js',
    'src/format/base64.js',
    'src/format/hex.js',
    'src/format/json.js',
    'src/format/pnf.js',
    'src/format/ted.js',
    'src/format/utf8.js',

    //
    //  Digest
    //
    'src/digest/md5.js',
    'src/digest/sha256.js',
    'src/digest/ripemd160.js',
    'src/digest/keccak256.js',

    //
    //  Crypto keys
    //
    'src/crypto/aes.js',
    'src/crypto/ecc.js',
    'src/crypto/pem.js',
    'src/crypto/plain.js',
    'src/crypto/rsa.js',

    //
    //  MingKeMing
    //
    'src/mkm/address.js',
    'src/mkm/btc.js',
    'src/mkm/document.js',
    'src/mkm/eth.js',
    'src/mkm/identifier.js',
    'src/mkm/meta.js',

    //
    //  DaoKeDao
    //
    'src/dkd/cmd_fact.js',
    'src/dkd/factory.js',

    //
    //  Extensions
    //
    'src/ext/crypto.js',
    'src/ext/format.js',
    'src/ext/account.js',
    'src/ext/message.js',
    'src/ext/command.js',
    'src/ext/load_extensions.js',
    'src/ext/load_plugins.js',

    null
];
