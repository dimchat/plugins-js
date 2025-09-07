'use strict';
// license: https://mit-license.org
// =============================================================================
// The MIT License (MIT)
//
// Copyright (c) 2025 Albert Moky
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

//!require <crypto.js>

    /**
     *  CryptographyKey GeneralFactory
     *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    mk.ext.CryptoKeyGeneralFactory = function () {
        BaseObject.call(this);
        this.__symmetricKeyFactories = {};
        this.__privateKeyFactories = {};
        this.__publicKeyFactories = {};
    };
    var CryptoKeyGeneralFactory = mk.ext.CryptoKeyGeneralFactory;

    Class(CryptoKeyGeneralFactory, BaseObject, [
        GeneralCryptoHelper,
        SymmetricKeyHelper,
        PrivateKeyHelper, PublicKeyHelper
    ]);

    // Override
    CryptoKeyGeneralFactory.prototype.getKeyAlgorithm = function (key, defaultValue) {
        var algorithm = key['algorithm'];
        return Converter.getString(algorithm, defaultValue);
    };

    ///
    ///   SymmetricKey
    ///

    // Override
    CryptoKeyGeneralFactory.prototype.setSymmetricKeyFactory = function (algorithm, factory) {
        this.__symmetricKeyFactories[algorithm] = factory;
    };

    // Override
    CryptoKeyGeneralFactory.prototype.getSymmetricKeyFactory = function (algorithm) {
        return this.__symmetricKeyFactories[algorithm];
    };

    // Override
    CryptoKeyGeneralFactory.prototype.generateSymmetricKey = function (algorithm) {
        var factory = this.getSymmetricKeyFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('key algorithm not supported: ' + algorithm);
        }
        return factory.generateSymmetricKey(algorithm);
    };

    // Override
    CryptoKeyGeneralFactory.prototype.parseSymmetricKey = function (key) {
        if (!key) {
            return null;
        } else if (Interface.conforms(key, SymmetricKey)) {
            return key;
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null;
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getSymmetricKeyFactory(algorithm);
        if (!factory) {
            // unknown algorithm, get default key factory
            factory = this.getSymmetricKeyFactory('*');  // unknown
            if (!factory) {
                throw new ReferenceError('default symmetric key factory not found');
            }
        }
        return factory.parseSymmetricKey(info);
    };

    ///
    ///   PrivateKey
    ///

    // Override
    CryptoKeyGeneralFactory.prototype.setPrivateKeyFactory = function (algorithm, factory) {
        this.__privateKeyFactories[algorithm] = factory;
    };

    // Override
    CryptoKeyGeneralFactory.prototype.getPrivateKeyFactory = function (algorithm) {
        return this.__privateKeyFactories[algorithm];
    };

    // Override
    CryptoKeyGeneralFactory.prototype.generatePrivateKey = function (algorithm) {
        var factory = this.getPrivateKeyFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('key algorithm not supported: ' + algorithm);
        }
        return factory.generatePrivateKey(algorithm);
    };

    // Override
    CryptoKeyGeneralFactory.prototype.parsePrivateKey = function (key) {
        if (!key) {
            return null;
        } else if (Interface.conforms(key, PrivateKey)) {
            return key;
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null;
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getPrivateKeyFactory(algorithm);
        if (!factory) {
            // unknown algorithm, get default key factory
            factory = this.getPrivateKeyFactory('*');  // unknown
            if (!factory) {
                throw new ReferenceError('default private key factory not found');
            }
        }
        return factory.parsePrivateKey(info);
    };

    ///
    ///   PublicKey
    ///

    // Override
    CryptoKeyGeneralFactory.prototype.setPublicKeyFactory = function (algorithm, factory) {
        this.__publicKeyFactories[algorithm] = factory;
    };

    // Override
    CryptoKeyGeneralFactory.prototype.getPublicKeyFactory = function (algorithm) {
        return this.__publicKeyFactories[algorithm];
    };

    // Override
    CryptoKeyGeneralFactory.prototype.parsePublicKey = function (key) {
        if (!key) {
            return null;
        } else if (Interface.conforms(key, PublicKey)) {
            return key;
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null;
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getPublicKeyFactory(algorithm);
        if (!factory) {
            // unknown algorithm, get default key factory
            factory = this.getPublicKeyFactory('*');  // unknown
            if (!factory) {
                throw new ReferenceError('default public key factory not found');
            }
        }
        return factory.parsePublicKey(info);
    };
