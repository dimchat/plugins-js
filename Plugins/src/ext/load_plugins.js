'use strict';
// license: https://mit-license.org
//
//  Ming-Ke-Ming : Decentralized User Identity Authentication
//
//                               Written in 2025 by Moky <albert.moky@gmail.com>
//
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

//! require 'crypto/*.js'
//! require 'digest/*.js'
//! require 'format/*.js'
//! require 'mkm/*.js'


    dimp.ext.PluginLoader = function () {
        BaseObject.call(this);
    };
    var PluginLoader = dimp.ext.PluginLoader;

    Class(PluginLoader, BaseObject, null);

    Implementation(PluginLoader, {

        /**
         *  Register plugins
         */
        load: function () {

            this.registerCoders();
            this.registerDigesters();

            this.registerSymmetricKeyFactories();
            this.registerAsymmetricKeyFactories();

            this.registerEntityFactories();

        },

        /**
         *  Data coders
         */
        // protected
        registerCoders: function () {

            this.registerBase58Coder();
            this.registerBase64Coder();
            this.registerHexCoder();

            this.registerUTF8Coder();
            this.registerJSONCoder();

            this.registerPNFFactory();
            this.registerTEDFactory();

        },
        // protected
        registerBase58Coder: function () {

            /// Base58 coding
            Base58.setCoder(new Base58Coder());

        },
        // protected
        registerBase64Coder: function () {

            /// Base64 coding
            Base64.setCoder(new Base64Coder());

        },
        // protected
        registerHexCoder: function () {

            /// HEX coding
            Hex.setCoder(new HexCoder());

        },
        // protected
        registerUTF8Coder: function () {

            /// UTF8
            UTF8.setCoder(new UTF8Coder());

        },
        // protected
        registerJSONCoder: function () {

            /// JSON
            var coder = new JSONCoder();
            JSONMap.setCoder(coder);

        },
        // protected
        registerPNFFactory: function () {

            /// PNF
            PortableNetworkFile.setFactory(new BaseNetworkFileFactory());

        },
        // protected
        registerTEDFactory: function () {

            /// TED
            var tedFactory = new Base64DataFactory();
            TransportableData.setFactory(EncodeAlgorithms.BASE_64, tedFactory);
            // TransportableData.setFactory(EncodeAlgorithms.DEFAULT, tedFactory);
            TransportableData.setFactory('*', tedFactory);

        },

        /**
         *  Message digesters
         */
        // protected
        registerDigesters: function () {

            this.registerSHA256Digester();
            this.registerKeccak256Digester();
            this.registerRIPEMD160Digester();

        },
        // protected
        registerSHA256Digester: function () {

            /// SHA256
            SHA256.setDigester(new SHA256Digester());

        },
        // protected
        registerKeccak256Digester: function () {

            /// Keccak256
            KECCAK256.setDigester(new KECCAK256Digester());

        },
        // protected
        registerRIPEMD160Digester: function () {

            /// RIPEMD160
            RIPEMD160.setDigester(new RIPEMD160Digester());

        },

        /**
         *  Symmetric key parsers
         */
        // protected
        registerSymmetricKeyFactories: function () {

            this.registerAESKeyFactory();
            this.registerPlainKeyFactory();

        },
        // protected
        registerAESKeyFactory: function () {

            /// AES
            var aes = new AESKeyFactory();
            SymmetricKey.setFactory(SymmetricAlgorithms.AES, aes);
            SymmetricKey.setFactory(AESKey.AES_CBC_PKCS7, aes);
            // SymmetricKey.setFactory('AES/CBC/PKCS7Padding', aes);

        },
        // protected
        registerPlainKeyFactory: function () {

            /// Plain
            var fact = new PlainKeyFactory();
            SymmetricKey.setFactory(SymmetricAlgorithms.PLAIN, fact);

        },

        /**
         *  Asymmetric key parsers
         */
        // protected
        registerAsymmetricKeyFactories: function () {

            this.registerRSAKeyFactories();
            this.registerECCKeyFactories();

        },
        // protected
        registerRSAKeyFactories: function () {

            /// RSA
            var rsaPub = new RSAPublicKeyFactory();
            PublicKey.setFactory(AsymmetricAlgorithms.RSA, rsaPub);
            PublicKey.setFactory('SHA256withRSA', rsaPub);
            PublicKey.setFactory('RSA/ECB/PKCS1Padding', rsaPub);

            var rsaPri = new RSAPrivateKeyFactory();
            PrivateKey.setFactory(AsymmetricAlgorithms.RSA, rsaPri);
            PrivateKey.setFactory('SHA256withRSA', rsaPri);
            PrivateKey.setFactory('RSA/ECB/PKCS1Padding', rsaPri);

        },
        // protected
        registerECCKeyFactories: function () {

            /// ECC
            var eccPub = new ECCPublicKeyFactory();
            PublicKey.setFactory(AsymmetricAlgorithms.ECC, eccPub);
            PublicKey.setFactory('SHA256withECDSA', eccPub);

            var eccPri = new ECCPrivateKeyFactory();
            PrivateKey.setFactory(AsymmetricAlgorithms.ECC, eccPri);
            PrivateKey.setFactory('SHA256withECDSA', eccPri);

        },

        /**
         *  ID, Address, Meta, Document parsers
         */
        // protected
        registerEntityFactories: function () {

            this.registerIDFactory();
            this.registerAddressFactory();
            this.registerMetaFactories();
            this.registerDocumentFactories();

        },
        // protected
        registerIDFactory: function () {

            ID.setFactory(new IdentifierFactory());

        },
        // protected
        registerAddressFactory: function () {

            Address.setFactory(new BaseAddressFactory());

        },
        // protected
        registerMetaFactories: function () {

            this.setMetaFactory(MetaType.MKM, 'mkm', null);
            this.setMetaFactory(MetaType.BTC, 'btc', null);
            this.setMetaFactory(MetaType.ETH, 'eth', null);

        },
        // protected
        setMetaFactory: function (type, alias, factory) {
            if (!factory) {
                factory = new BaseMetaFactory(type);
            }
            Meta.setFactory(type, factory);
            Meta.setFactory(alias, factory);
        },
        // protected
        registerDocumentFactories: function () {

            this.setDocumentFactory('*', null);
            this.setDocumentFactory(DocumentType.VISA, null);
            this.setDocumentFactory(DocumentType.PROFILE, null);
            this.setDocumentFactory(DocumentType.BULLETIN, null);

        },
        // protected
        setDocumentFactory: function (type, factory) {
            if (!factory) {
                factory = new GeneralDocumentFactory(type);
            }
            Document.setFactory(type, factory);
        }

    });
