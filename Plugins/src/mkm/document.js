'use strict';
// license: https://mit-license.org
//
//  Ming-Ke-Ming : Decentralized User Identity Authentication
//
//                               Written in 2021 by Moky <albert.moky@gmail.com>
//
// =============================================================================
// The MIT License (MIT)
//
// Copyright (c) 2021 Albert Moky
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

//! require <dimp.js>

    /**
     *  General Document Factory
     *  ~~~~~~~~~~~~~~~~~~~~~~~~
     */
    mkm.mkm.GeneralDocumentFactory = function (type) {
        BaseObject.call(this);
        this.__type = type;
    };
    var GeneralDocumentFactory = mkm.mkm.GeneralDocumentFactory;

    Class(GeneralDocumentFactory, BaseObject, [DocumentFactory]);

    // protected
    GeneralDocumentFactory.prototype.getType = function (docType, identifier) {
        if (!identifier) {
            return this.__type;
        } else if (docType !== null && docType !== '' && docType !== '*') {
            return docType;
        } else if (identifier.isGroup()) {
            return DocumentType.BULLETIN;
        } else if (identifier.isUser()) {
            return DocumentType.VISA;
        } else {
            return DocumentType.PROFILE;
        }
    };

    // Override
    GeneralDocumentFactory.prototype.createDocument = function(identifier, data, signature) {
        var type = this.getType(this.__type, identifier);
        if (data && signature) {
            // create document with data & signature from local storage
            if (type === DocumentType.VISA) {
                return new BaseVisa(identifier, data, signature)
            } else if (type === DocumentType.BULLETIN) {
                return new BaseBulletin(identifier, data, signature)
            } else {
                return new BaseDocument(type, identifier, data, signature)
            }
        } else {
            // create empty document
            if (type === DocumentType.VISA) {
                return new BaseVisa(identifier)
            } else if (type === DocumentType.BULLETIN) {
                return new BaseBulletin(identifier)
            } else {
                return new BaseDocument(type, identifier)
            }
        }
    };

    // Override
    GeneralDocumentFactory.prototype.parseDocument = function(doc) {
        var identifier = ID.parse(doc['did']);
        if (!identifier) {
            return null;
        } else if (doc['data'] && doc['signature']) {
            // OK
        } else {
            // doc.data should not be empty
            // doc.signature should not be empty
            return null;
        }
        var helper = SharedAccountExtensions.getHelper();
        var type = helper.getDocumentType(doc, null);
        if (!type) {
            type = this.getType('*', identifier);
        }
        if (type === DocumentType.VISA) {
            return new BaseVisa(doc);
        } else if (type === DocumentType.BULLETIN) {
            return new BaseBulletin(doc);
        } else {
            return new BaseDocument(doc);
        }
    };
