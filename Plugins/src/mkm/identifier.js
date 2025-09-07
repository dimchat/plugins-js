'use strict';
// license: https://mit-license.org
//
//  Ming-Ke-Ming : Decentralized User Identity Authentication
//
//                               Written in 2020 by Moky <albert.moky@gmail.com>
//
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

//! require <mkm.js>

    /**
     *  General Identifier Factory
     *  ~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    mkm.mkm.IdentifierFactory = function () {
        BaseObject.call(this);
        this._identifiers = {};  // string -> ID
    };
    var IdentifierFactory = mkm.mkm.IdentifierFactory;

    Class(IdentifierFactory, BaseObject, [IDFactory]);

    // Override
    IdentifierFactory.prototype.generateIdentifier = function (meta, network, terminal) {
        var address = Address.generate(meta, network);
        return ID.create(meta.getSeed(), address, terminal);
    };

    // Override
    IdentifierFactory.prototype.createIdentifier = function (name, address, terminal) {
        var string = Identifier.concat(name, address, terminal);
        var did = this._identifiers[string];
        if (!did) {
            did = this.newID(string, name, address, terminal);
            this._identifiers[string] = did;
        }
        return did;
    }

    // Override
    IdentifierFactory.prototype.parseIdentifier = function (identifier) {
        var did = this._identifiers[identifier];
        if (!did) {
            did = this.parse(identifier);
            if (did) {
                this._identifiers[identifier] = did;
            }
        }
        return did;
    };

    // protected
    IdentifierFactory.prototype.newID = function (string, name, address, terminal) {
        // override for customized ID
        return new Identifier(string, name, address, terminal);
    };

    // protected
    /**
     *  Parse ID from string
     *
     * @param {string} string
     * @return {Identifier}
     */
    IdentifierFactory.prototype.parse = function (string) {
        var name, address, terminal;
        // split ID string for terminal
        var pair = string.split('/');
        if (pair.length === 1) {
            // no terminal
            terminal = null;
        } else {
            // got terminal
            terminal = pair[1];
        }
        // name @ address
        pair = pair[0].split('@');
        if (pair.length === 1) {
            // got address without name
            name = null;
            address = Address.parse(pair[0]);
        } else {
            name = pair[0];
            address = Address.parse(pair[1]);
        }
        if (!address) {
            return null;
        }
        return this.newID(string, name, address, terminal);
    };
