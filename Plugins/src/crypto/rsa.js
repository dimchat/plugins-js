'use strict';
// license: https://mit-license.org
// =============================================================================
// The MIT License (MIT)
//
// Copyright (c) 2020 Albert Moky
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// =============================================================================
//

//! require <crypto-js/core.js> (https://github.com/brix/crypto-js)
//! require <crypto-js/sha256.js>
//! require <jsencrypt.js> (https://github.com/travist/jsencrypt)

//! require <dimp.js>

    var x509_header = new Uint8Array([48, -127, -97, 48, 13, 6, 9, 42, -122, 72, -122, -9, 13, 1, 1, 1, 5, 0, 3, -127, -115, 0]);
    var rsa_public_key = function (der) {
        var key = Base64.encode(der);
        var cipher = new JSEncrypt();
        cipher.setPublicKey(key);
        if (cipher.key.e === 0 || cipher.key.n === null) {
            // FIXME: PKCS#1 -> X.509
            var fixed = new Uint8Array(x509_header.length + der.length);
            fixed.set(x509_header);
            fixed.set(der, x509_header.length);
            key = Base64.encode(fixed);
            cipher.setPublicKey(key);
        }
        return cipher;
    };

    var rsa_private_key = function (der) {
        var key = Base64.encode(der);
        var cipher = new JSEncrypt();
        cipher.setPrivateKey(key);
        return cipher;
    };

    var rsa_generate_keys = function (bits) {
        var cipher = new JSEncrypt({default_key_size: bits});
        // create a new private key
        var key = cipher.getKey();
        return key.getPublicKey() + '\r\n' + key.getPrivateKey();
    }


    /**
     *  RSA Public Key
     *
     *      keyInfo format: {
     *          algorithm: "RSA",
     *          data: "..."       // base64
     *      }
     */
    mk.crypto.RSAPublicKey = function (key) {
        BasePublicKey.call(this, key);
    };
    var RSAPublicKey = mk.crypto.RSAPublicKey;

    Class(RSAPublicKey, BasePublicKey, [EncryptKey]);

    Implementation(RSAPublicKey, {

        // Override
        getData: function () {
            var data = this.getValue('data');
            if (data) {
                return PEM.decodePublicKey(data);
            } else {
                throw new ReferenceError('RSA public key data not found');
            }
        },

        // protected
        getKeySize: function () {
            // TODO: get from key
            return this.getInt('keySize', 1024 / 8); // 128
        },

        // Override
        verify: function (data, signature) {
            // convert Uint8Array to WordArray
            data = CryptoJS.enc.Hex.parse(Hex.encode(data));
            // convert Uint8Array to Base64
            signature = Base64.encode(signature);
            // create signer
            var cipher = rsa_public_key(this.getData());
            //
            //  verify(data, signature):
            //    param  WordArray
            //    param  Base64
            //    return boolean
            //
            return cipher.verify(data, signature, CryptoJS.SHA256);
        },

        // Override
        encrypt: function (plaintext, extra) {
            // convert Uint8Array to String
            plaintext = UTF8.decode(plaintext);
            // create cipher
            var cipher = rsa_public_key(this.getData());
            //
            //  encrypt(data):
            //    param  String
            //    return Base64|false
            //
            var base64 = cipher.encrypt(plaintext);
            if (base64) {
                var keySize = this.getKeySize();
                // convert Base64 to Uint8Array
                var res = Base64.decode(base64);
                if (res.length === keySize) {
                    return res;
                }
                // FIXME: There is a bug in JSEncrypt
                //        see https://github.com/travist/jsencrypt/issues/158
                var pad = new Uint8Array(keySize);
                pad.set(res, keySize - res.length);
                return pad;
            }
            throw new ReferenceError('RSA encrypt error: ' + plaintext);
        }
    });

    /**
     *  RSA Private Key
     *
     *      keyInfo format: {
     *          algorithm    : "RSA",
     *          keySizeInBits: 1024, // optional
     *          data         : "..." // base64_encode()
     *      }
     */
    mk.crypto.RSAPrivateKey = function (key) {
        BasePrivateKey.call(this, key);
        // check key data
        var pem = this.getValue('data');
        if (!pem) {
            this.generateKeys();
        }
    };
    var RSAPrivateKey = mk.crypto.RSAPrivateKey;

    Class(RSAPrivateKey, BasePrivateKey, [DecryptKey]);

    Implementation(RSAPrivateKey, {

        // Override
        getData: function () {
            var data = this.getValue('data');
            if (data) {
                return PEM.decodePrivateKey(data);
            } else {
                throw new ReferenceError('RSA private key data not found');
            }
        },

        // protected
        generateKeys: function () {
            var bits = this.getKeySize() * 8;
            var pem = rsa_generate_keys(bits);
            this.setValue('data', pem);
            this.setValue('mode', 'ECB');
            this.setValue('padding', 'PKCS1');
            this.setValue('digest', 'SHA256');
            return pem;
        },

        // protected
        getKeySize: function () {
            // TODO: get from key data
            return this.getInt('keySize', 1024 / 8); // 128
        },

        // Override
        getPublicKey: function () {
            // create cipher
            var cipher = rsa_private_key(this.getData());
            var pem = cipher.getPublicKey();
            var info = {
                'algorithm': this.getValue('algorithm'),
                'data': pem,
                'mode': 'ECB',
                'padding': 'PKCS1',
                'digest': 'SHA256'
            };
            return PublicKey.parse(info);
        },

        // Override
        sign: function (data) {
            // convert Uint8Array to WordArray
            data = CryptoJS.enc.Hex.parse(Hex.encode(data));
            // create signer
            var cipher = rsa_private_key(this.getData());
            //
            //  sign(data):
            //    param  WordArray
            //    return Base64|false
            //
            var base64 = cipher.sign(data, CryptoJS.SHA256, 'sha256');
            if (base64) {
                // convert Base64 to Uint8Array
                return Base64.decode(base64);
            } else {
                throw new ReferenceError('RSA sign error: ' + data);
            }
        },

        // Override
        decrypt: function (data, params) {
            // convert Uint8Array to Base64
            data = Base64.encode(data);
            // create cipher
            var cipher = rsa_private_key(this.getData());
            //
            //  decrypt(data):
            //    param  Base64;
            //    return String|false
            //
            var string = cipher.decrypt(data);
            if (string) {
                // convert String to Uint8Array
                return UTF8.encode(string);
            } else {
                throw new ReferenceError('RSA decrypt error: ' + data);
            }
        }
    });


    /**
     *  RSA private key factory
     *  ~~~~~~~~~~~~~~~~~~~~~~~
     */
    mk.crypto.RSAPrivateKeyFactory = function () {
        BaseObject.call(this);
    };
    var RSAPrivateKeyFactory = mk.crypto.RSAPrivateKeyFactory;

    Class(RSAPrivateKeyFactory, BaseObject, [PrivateKeyFactory]);

    // Override
    RSAPrivateKeyFactory.prototype.generatePrivateKey = function() {
        return new RSAPrivateKey({
            'algorithm': AsymmetricAlgorithms.RSA
        });
    };

    // Override
    RSAPrivateKeyFactory.prototype.parsePrivateKey = function(key) {
        // check 'data'
        if (key['data'] === null) {
            // key.data should not be empty
            return null;
        }
        return new RSAPrivateKey(key);
    };

    /**
     *  RSA public key factory
     *  ~~~~~~~~~~~~~~~~~~~~~~~
     */
    mk.crypto.RSAPublicKeyFactory = function () {
        BaseObject.call(this);
    };
    var RSAPublicKeyFactory = mk.crypto.RSAPublicKeyFactory;

    Class(RSAPublicKeyFactory, BaseObject, [PublicKeyFactory]);

    // Override
    RSAPublicKeyFactory.prototype.parsePublicKey = function(key) {
        // check 'data'
        if (key['data'] === null) {
            // key.data should not be empty
            return null;
        }
        return new RSAPublicKey(key);
    };
