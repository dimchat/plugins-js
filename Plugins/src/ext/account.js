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

//!require <mkm.js>

    /**
     *  Account GeneralFactory
     *  ~~~~~~~~~~~~~~~~~~~~~~
     */
    mkm.ext.AccountGeneralFactory = function () {
        BaseObject.call(this);
        this.__addressFactory = null;
        this.__idFactory = null;
        this.__metaFactories = {};
        this.__docsFactories = {};
    };
    var AccountGeneralFactory = mkm.ext.AccountGeneralFactory;

    Class(AccountGeneralFactory, BaseObject, [
        GeneralAccountHelper,
        AddressHelper, IdentifierHelper,
        MetaHelper, DocumentHelper
    ]);

    // Override
    AccountGeneralFactory.prototype.getMetaType = function (meta, defaultValue) {
        var type = meta['type'];
        return Converter.getString(type, defaultValue);
    };

    // Override
    AccountGeneralFactory.prototype.getDocumentType = function (doc, defaultValue) {
        var type = doc['type'];
        if (type) {
            return Converter.getString(type, defaultValue);
        } else if (defaultValue) {
            return defaultValue;
        }
        // get type for did
        var did = ID.parse(doc['did']);
        if (!did) {
            // throw new ReferenceError('document error: ' + doc);
            return null;
        } else if (did.isUser()) {
            return DocumentType.VISA;
        } else if (did.isUser()) {
            return DocumentType.BULLETIN;
        } else {
            return DocumentType.PROFILE;
        }
    };

    ///
    ///   Address
    ///

    // Override
    AccountGeneralFactory.prototype.setAddressFactory = function (factory) {
        this.__addressFactory = factory;
    };

    // Override
    AccountGeneralFactory.prototype.getAddressFactory = function () {
        return this.__addressFactory;
    };

    // Override
    AccountGeneralFactory.prototype.parseAddress = function (address) {
        if (!address) {
            return null;
        } else if (Interface.conforms(address, Address)) {
            return address;
        }
        var str = Wrapper.fetchString(address);
        if (!str) {
            return null;
        }
        var factory = this.getAddressFactory();
        if (!factory) {
            throw new ReferenceError('address factory not ready');
        }
        return factory.parseAddress(address);
    };

    // Override
    AccountGeneralFactory.prototype.generateAddress = function (meta, network) {
        var factory = this.getAddressFactory();
        if (!factory) {
            throw new ReferenceError('address factory not ready');
        }
        return factory.generateAddress(meta, network);
    };

    ///
    ///   ID
    ///

    // Override
    AccountGeneralFactory.prototype.setIdentifierFactory = function (factory) {
        this.__idFactory = factory;
    };

    // Override
    AccountGeneralFactory.prototype.getIdentifierFactory = function () {
        return this.__idFactory;
    };

    // Override
    AccountGeneralFactory.prototype.parseIdentifier = function (identifier) {
        if (!identifier) {
            return null;
        } else if (Interface.conforms(identifier, ID)) {
            return identifier;
        }
        var str = Wrapper.fetchString(identifier);
        if (!str) {
            return null;
        }
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.parseIdentifier(identifier);
    };

    // Override
    AccountGeneralFactory.prototype.createIdentifier = function (name, address, terminal) {
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.createIdentifier(name, address, terminal);
    };

    // Override
    AccountGeneralFactory.prototype.generateIdentifier = function (meta, network, terminal) {
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.generateIdentifier(meta, network, terminal);
    };

    ///
    ///   Meta
    ///

    // Override
    AccountGeneralFactory.prototype.setMetaFactory = function (type, factory) {
        this.__metaFactories[type] = factory;
    };

    // Override
    AccountGeneralFactory.prototype.getMetaFactory = function (type) {
        return this.__metaFactories[type];
    };

    // Override
    AccountGeneralFactory.prototype.createMeta = function (type, pKey, seed, fingerprint) {
        var factory = this.getMetaFactory(type);
        if (!factory) {
            throw new ReferenceError('meta type not supported: ' + type);
        }
        return factory.createMeta(pKey, seed, fingerprint);
    };

    // Override
    AccountGeneralFactory.prototype.generateMeta = function (type, sKey, seed) {
        var factory = this.getMetaFactory(type);
        if (!factory) {
            throw new ReferenceError('meta type not supported: ' + type);
        }
        return factory.generateMeta(sKey, seed);
    };

    // Override
    AccountGeneralFactory.prototype.parseMeta = function (meta) {
        if (!meta) {
            return null;
        } else if (Interface.conforms(meta, Meta)) {
            return meta;
        }
        var info = Wrapper.fetchMap(meta);
        if (!info) {
            return null;
        }
        var type = this.getMetaType(info, null);
        var factory = !type ? null : this.getMetaFactory(type);
        if (!factory) {
            // unknown meta type, get default meta factory
            factory = this.getMetaFactory('*');  // unknown
            if (!factory) {
                throw new ReferenceError('default meta factory not found');
            }
        }
        return factory.parseMeta(info);
    };

    //
    //  Document
    //

    // Override
    AccountGeneralFactory.prototype.setDocumentFactory = function (type, factory) {
        this.__docsFactories[type] = factory;
    };

    // Override
    AccountGeneralFactory.prototype.getDocumentFactory = function (type) {
        return this.__docsFactories[type];
    };

    // Override
    AccountGeneralFactory.prototype.createDocument = function (type, identifier, data, signature) {
        var factory = this.getDocumentFactory(type);
        if (!factory) {
            throw new ReferenceError('document type not supported: ' + type);
        }
        return factory.createDocument(identifier, data, signature);
    };

    // Override
    AccountGeneralFactory.prototype.parseDocument = function (doc) {
        if (!doc) {
            return null;
        } else if (Interface.conforms(doc, Document)) {
            return doc;
        }
        var info = Wrapper.fetchMap(doc);
        if (!info) {
            return null;
        }
        var type = this.getDocumentType(info, null);
        var factory = !type ? null : this.getDocumentFactory(type);
        if (!factory) {
            // unknown document type, get default document factory
            factory = this.getDocumentFactory('*');  // unknown
            if (!factory) {
                throw new ReferenceError('default document factory not found');
            }
        }
        return factory.parseDocument(info);
    };
