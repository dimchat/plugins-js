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

//! require <dimp.js>
//! require 'btc.js'
//! require 'eth.js'

/**
 *  Default Meta to build ID with 'name@address'
 *
 *  version:
 *      0x01 - MKM
 *
 *  algorithm:
 *      CT      = fingerprint = sKey.sign(seed);
 *      hash    = ripemd160(sha256(CT));
 *      code    = sha256(sha256(network + hash)).prefix(4);
 *      address = base58_encode(network + hash + code);
 */

    /**
     *  Create default meta
     *
     *  Usages:
     *      1. new DefaultMeta(map);
     *      2. new DefaultMeta(type, key, seed, fingerprint);
     */
    mkm.mkm.DefaultMeta = function () {
        if (arguments.length === 1) {
            // new DefaultMeta(map);
            BaseMeta.call(this, arguments[0]);
        } else if (arguments.length === 4) {
            // new DefaultMeta(type, key, seed, fingerprint);
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3]);
        } else {
            throw new SyntaxError('Default meta arguments error: ' + arguments);
        }
        // memory cache
        this.__addresses = {};  // uint -> Address
    };
    var DefaultMeta = mkm.mkm.DefaultMeta;

    Class(DefaultMeta, BaseMeta, null, {

        // Override
        hasSeed: function () {
            return true;
        },

        // Override
        generateAddress: function (network) {
            // check cache
            var cached = this.__addresses[network];
            if (!cached) {
                // generate and cache it
                var data = this.getFingerprint();
                cached = BTCAddress.generate(data, network);
                this.__addresses[network] = cached;
            }
            return cached;
        }
    });


/**
 *  Meta to build BTC address for ID
 *
 *  version:
 *      0x02 - BTC
 *
 *  algorithm:
 *      CT      = key.data;
 *      hash    = ripemd160(sha256(CT));
 *      code    = sha256(sha256(network + hash)).prefix(4);
 *      address = base58_encode(network + hash + code);
 */

    /**
     *  Create meta for BTC address
     *
     *  Usages:
     *      1. new BTCMeta(map);
     *      2. new BTCMeta(type, key);
     *      3. new BTCMeta(type, key, seed, fingerprint);
     */
    mkm.mkm.BTCMeta = function () {
        if (arguments.length === 1) {
            // new BTCMeta(map);
            BaseMeta.call(this, arguments[0]);
        } else if (arguments.length === 2) {
            // new BTCMeta(type, key);
            BaseMeta.call(this, arguments[0], arguments[1]);
        } else if (arguments.length === 4) {
            // new BTCMeta(type, key, seed, fingerprint);
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3]);
        } else {
            throw new SyntaxError('BTC meta arguments error: ' + arguments);
        }
        // memory cache
        this.__addresses = {};  // uint -> Address
    };
    var BTCMeta = mkm.mkm.BTCMeta;

    Class(BTCMeta, BaseMeta, null, {

        // Override
        hasSeed: function () {
            return false;
        },

        // Override
        generateAddress: function (network) {
            // check cache
            var cached = this.__addresses[network];
            if (!cached) {
                // TODO: compress public key?
                var key = this.getPublicKey();
                var data = key.getData();
                // generate and cache it
                cached = BTCAddress.generate(data, network);
                this.__addresses[network] = cached;
            }
            return cached;
        }
    });


/**
 *  Meta to build ETH address for ID
 *
 *  version:
 *      0x04 - ETH
 *
 *  algorithm:
 *      CT      = key.data;  // without prefix byte
 *      digest  = keccak256(CT);
 *      address = hex_encode(digest.suffix(20));
 */

    /**
     *  Create meta for ETH address
     *
     *  Usages:
     *      1. new ETHMeta(map);
     *      2. new BTCMeta(type, key);
     *      3. new BTCMeta(type, key, seed, fingerprint);
     */
    mkm.mkm.ETHMeta = function () {
        if (arguments.length === 1) {
            // new ETHMeta(map);
            BaseMeta.call(this, arguments[0]);
        } else if (arguments.length === 2) {
            // new ETHMeta(type, key);
            BaseMeta.call(this, arguments[0], arguments[1]);
        } else if (arguments.length === 4) {
            // new ETHMeta(type, key, seed, fingerprint);
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3]);
        } else {
            throw new SyntaxError('ETH meta arguments error: ' + arguments);
        }
        // memory cache
        this.__address = null;  // cached address
    };
    var ETHMeta = mkm.mkm.ETHMeta;

    Class(ETHMeta, BaseMeta, null, {

        // Override
        hasSeed: function () {
            return false;
        },

        // Override
        generateAddress: function (network) {
            // check cache
            var cached = this.__address;
            if (!cached/* || cached.getType() !== network*/) {
                // 64 bytes key data without prefix 0x04
                var key = this.getPublicKey();
                var data = key.getData();
                // generate and cache it
                cached = ETHAddress.generate(data);
                this.__address = cached;
            }
            return cached;
        }
    });


    /**
     *  Base Meta Factory
     *  ~~~~~~~~~~~~~~~~~
     */
    mkm.mkm.BaseMetaFactory = function (algorithm) {
        BaseObject.call(this);
        this.__type = algorithm;
    };
    var BaseMetaFactory = mkm.mkm.BaseMetaFactory;

    Class(BaseMetaFactory, BaseObject, [MetaFactory], null);

    // protected
    BaseMetaFactory.prototype.getType = function () {
        return this.__type;
    };

    // Override
    BaseMetaFactory.prototype.generateMeta = function(sKey, seed) {
        var fingerprint = null;  // TransportableData
        if (seed && seed.length > 0) {
            var data = UTF8.encode(seed);
            var sig = sKey.sign(data);
            fingerprint = TransportableData.create(sig);
        }
        var pKey = sKey.getPublicKey();
        return this.createMeta(pKey, seed, fingerprint);
    };

    // Override
    BaseMetaFactory.prototype.createMeta = function(pKey, seed, fingerprint) {
        var out;
        var type = this.getType();
        switch (type) {

            case MetaType.MKM:
            case 'mkm':
                out = new DefaultMeta(type, pKey, seed, fingerprint);
                break;

            case MetaType.BTC:
            case 'btc':
                out = new BTCMeta(type, pKey);
                break;

            case MetaType.ETH:
            case 'eth':
                out = new ETHMeta(type, pKey);
                break;

            default:
                throw new TypeError('unknown meta type: ' + type);
        }
        return out;
    };

    // Override
    BaseMetaFactory.prototype.parseMeta = function(meta) {
        // // check 'type', 'key', 'seed', 'fingerprint'
        // if (meta['type'] == null || meta['key'] == null) {
        //   // meta.type should not be empty
        //   // meta.key should not be empty
        //   return null;
        // } else if (meta['seed'] == null) {
        //   if (meta['fingerprint'] != null) {
        //     return null;
        //   }
        // } else if (meta['fingerprint'] == null) {
        //   return null;
        // }
        var out;
        var helper = SharedAccountExtensions.getHelper();
        var type = helper.getMetaType(meta, '');
        switch (type) {

            case MetaType.MKM:
            case 'mkm':
                out = new DefaultMeta(meta);
                break;

            case MetaType.BTC:
            case 'btc':
                out = new BTCMeta(meta);
                break;

            case MetaType.ETH:
            case 'eth':
                out = new ETHMeta(meta);
                break;

            default:
                throw new TypeError('unknown meta type: ' + type);
        }
        return out.isValid() ? out : null;
    };
