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
     *  Base Address Factory
     *  ~~~~~~~~~~~~~~~~~~~~
     */
    mkm.mkm.BaseAddressFactory = function () {
        BaseObject.call(this);
        this._addresses = {};  // string -> Address
    };
    var BaseAddressFactory = mkm.mkm.BaseAddressFactory;

    Class(BaseAddressFactory, BaseObject, [AddressFactory], null);

    // Override
    BaseAddressFactory.prototype.generateAddress = function (meta, network) {
        var address = meta.generateAddress(network);
        if (address) {
            this._addresses[address.toString()] = address;
        }
        return address;
    };

    // Override
    BaseAddressFactory.prototype.parseAddress = function (string) {
        var address = this._addresses[string];
        if (!address) {
            address = this.parse(string);
            if (address) {
                this._addresses[string] = address;
            }
        }
        return address;
    };

    /**
     *  Create address from string
     *
     * @param {string} string
     * @return {Address}
     */
    // protected
    BaseAddressFactory.prototype.parse = function (string) {
        if (!string) {
            //throw new ReferenceError('address empty');
            return null;
        }
        var len = string.length;
        if (len === 8) {
            // "anywhere"
            if (string.toLowerCase() === 'anywhere') {
                return Address.ANYWHERE;
            }
        } else if (len === 10) {
            // "everywhere"
            if (string.toLowerCase() === 'everywhere') {
                return Address.EVERYWHERE;
            }
        }
        var res;
        if (26 <= len && len <= 35) {
            res = BTCAddress.parse(string);
        } else if (len === 42) {
            res = ETHAddress.parse(string);
        } else {
            //throw new TypeError('invalid address: ' + address);
            res = null;
        }
        // TODO: other types of address
        return res;
    };
