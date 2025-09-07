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
//! require <crypto-js/cipher-core.js>
//! require <crypto-js/aes.js>

//! require <dimp.js>

    var bytes2words = function (data) {
        var string = Hex.encode(data);
        return CryptoJS.enc.Hex.parse(string);
    };
    var words2bytes = function (array) {
        var result = array.toString();
        return Hex.decode(result);
    };

    var random_data = function (size) {
        var data = new Uint8Array(size);
        for (var i = 0; i < size; ++i) {
            data[i] = Math.floor(Math.random()*256);
        }
        return data;
    };

    var zero_data = function (size) {
        return new Uint8Array(size);
    };

    /**
     *  AES Key
     *
     *      keyInfo format: {
     *          algorithm: "AES",
     *          keySize  : 32,                // optional
     *          data     : "{BASE64_ENCODE}}" // password data
     *      }
     */
    mk.crypto.AESKey = function (key) {
        BaseSymmetricKey.call(this, key);
        // TODO: check algorithm parameters
        // 1. check mode = 'CBC'
        // 2. check padding = 'PKCS7Padding'

        // check key data
        var base64 = this.getValue('data');
        if (base64) {
            // lazy load
            this.__tedKey = null;
        } else {
            // new key
            this.__tedKey = this.generateKeyData();
        }
    };
    var AESKey = mk.crypto.AESKey;

    AESKey.AES_CBC_PKCS7 = 'AES/CBC/PKCS7Padding';

    Class(AESKey, BaseSymmetricKey, null);

    Implementation(AESKey, {

        // protected
        generateKeyData: function () {
            // random key data
            var keySize = this.getKeySize();
            var pwd = random_data(keySize);
            var ted = TransportableData.create(pwd);

            this.setValue('data', ted.toObject());
            // this.setValue('mod', 'CBC');
            // this.setValue('padding', 'PKCS7');

            return ted;
        },

        // protected
        getKeySize: function () {
            // TODO: get from key data
            return this.getInt('keySize', 32);
        },

        // protected
        getBlockSize: function () {
            // TODO: get from iv data
            return this.getInt('blockSize', 16);  // cipher.getBlockSize();
        },

        // Override
        getData: function () {
            var ted = this.__tedKey;
            if (!ted) {
                var base64 = this.getValue('data');
                ted = TransportableData.parse(base64);
                this.__tedKey = ted;
            }
            return !ted ? null : ted.getData();
        },

        // protected
        getInitVector: function (params) {
            if (!params) {
                throw new SyntaxError('params must provided to fetch IV for AES');
            }
            var base64 = params['IV'];
            if (!base64) {
                base64 = params['iv'];
                // if (!base64) {
                //     // compatible with old version
                //     base64 = this.getString('iv', null);
                //     if (!base64) {
                //         base64 = this.getString('IV', null);
                //     }
                // }
            }
            // decode IV data
            var ted = TransportableData.parse(base64);
            if (ted) {
                return ted.getData();
            } else if (base64) {
                throw new TypeError('IV data error: ' + base64);
            } else {
                return null;
            }
        },

        // protected
        zeroInitVector: function () {
            // zero IV
            var blockSize = this.getBlockSize();
            return zero_data(blockSize);
        },

        // protected
        newInitVector: function (extra) {
            if (!extra) {
                throw new SyntaxError('extra dict must provided to store IV for AES');
            }
            // random IV data
            var blockSize = this.getBlockSize();
            var ivData = random_data(blockSize);
            // put encoded IV into extra
            var ted = TransportableData.create(ivData, null);
            extra['IV'] = ted.toObject();
            // OK
            return ivData; // ted.getData();
        },

        // Override
        encrypt: function (plaintext, extra) {
            // 1. if 'IV' not found in extra params, new a random 'IV'
            var iv = this.getInitVector(extra);
            if (!iv) {
                iv = this.newInitVector(extra);
            }
            var ivWordArray = bytes2words(iv);
            // 2. get cipher key
            var key = this.getData();
            var keyWordArray = bytes2words(key);
            // 3. try to encrypt
            var message = bytes2words(plaintext);
            var cipher = CryptoJS.AES.encrypt(message, keyWordArray, { iv: ivWordArray });
            if (cipher.hasOwnProperty('ciphertext')) {
                return words2bytes(cipher.ciphertext);
            }
            //throw new TypeError('failed to encrypt message with key: ' + this);
            return null;
        },

        // Override
        decrypt: function (ciphertext, params) {
            // 1. if 'IV' not found in extra params, use an empty 'IV'
            var iv = this.getInitVector(params);
            if (!iv) {
                iv = this.zeroInitVector();
            }
            var ivWordArray = bytes2words(iv);
            // 2. get cipher key
            var key = this.getData();
            var keyWordArray = bytes2words(key);
            // 3. try to decrypt
            var message = bytes2words(ciphertext);
            var cipher = {
                ciphertext: message
            };
            var plaintext = CryptoJS.AES.decrypt(cipher, keyWordArray, { iv: ivWordArray });
            return words2bytes(plaintext);
        }
    });


    /**
     *  AES key factory
     *  ~~~~~~~~~~~~~~~
     */
    mk.crypto.AESKeyFactory = function () {
        BaseObject.call(this);
    };
    var AESKeyFactory = mk.crypto.AESKeyFactory;

    Class(AESKeyFactory, BaseObject, [SymmetricKeyFactory]);

    // Override
    AESKeyFactory.prototype.generateSymmetricKey = function() {
        return new AESKey({
            'algorithm': SymmetricAlgorithms.AES
        });
    };

    // Override
    AESKeyFactory.prototype.parseSymmetricKey = function(key) {
        // check 'data'
        if (key['data'] === null) {
            // key.data should not be empty
            return null;
        }
        return new AESKey(key);
    };
