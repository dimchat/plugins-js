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
     *  Format GeneralFactory
     *  ~~~~~~~~~~~~~~~~~~~~~
     */
    mk.ext.FormatGeneralFactory = function () {
        BaseObject.call(this);
        this.__tedFactories = {};
        this.__pnfFactory = null;
    };
    var FormatGeneralFactory = mk.ext.FormatGeneralFactory;

    Class(FormatGeneralFactory, BaseObject, [
        GeneralFormatHelper,
        PortableNetworkFileHelper,
        TransportableDataHelper
    ], null);

    /**
     *  Split text string to array: ["{TEXT}", "{algorithm}", "{content-type}"]
     */
    FormatGeneralFactory.prototype.split = function (text) {
        // "{TEXT}", or
        // "base64,{BASE64_ENCODE}", or
        // "data:image/png;base64,{BASE64_ENCODE}"
        var pos1 = text.indexOf('://');
        if (pos1 > 0) {
            // [URL]
            return [text];
        } else {
            // skip 'data:'
            pos1 = text.indexOf(':') + 1;
        }
        var array = [];
        // seeking for 'content-type'
        var pos2 = text.indexOf(';', pos1);
        if (pos2 > pos1) {
            array.push(text.substring(pos1, pos2));
            pos1 = pos2 + 1;
        }
        // seeking for 'algorithm'
        pos2 = text.indexOf(',', pos1);
        if (pos2 > pos1) {
            array.unshift(text.substring(pos1, pos2));
            pos1 = pos2 + 1;
        }
        if (pos1 === 0) {
            // [data]
            array.unshift(text);
        } else {
            // [data, algorithm, type]
            array.unshift(text.substring(pos1));
        }
        return array;
    };

    FormatGeneralFactory.prototype.decode = function (data, defaultKey) {
        var text;
        if (Interface.conforms(data, Mapper)) {
            return data.toMap();
        } else if (Interface.conforms(data, Stringer)) {
            text = data.toString();
        } else if (IObject.isString(data)) {
            text = data;
        } else {
            // Map
            return data;
        }
        if (text.length === 0) {
            return null;
        } else if (text.charAt(0) === '{'
            && text.charAt(text.length - 1) === '}') {
            return JSONMap.decode(text);
        }
        var info = {};
        var array = this.split(text);
        var size = array.length;
        if (size === 1) {
            info[defaultKey] = array[0];
        } else {
            info['data'] = array[0];
            info['algorithm'] = array[1];
            if (size > 2) {
                // 'data:...;...,...'
                info['content-type'] = array[2];
                if (text.length > 5 && text.substring(0, 5) === 'data:') {
                    info['URL'] = text;
                }
            }
        }
        return info;
    };

    // Override
    FormatGeneralFactory.prototype.getFormatAlgorithm = function (ted, defaultValue) {
        var algorithm = ted['algorithm'];
        return Converter.getString(algorithm, defaultValue);
    };

    ///
    ///   TED - Transportable Encoded Data
    ///

    // Override
    FormatGeneralFactory.prototype.setTransportableDataFactory = function (algorithm, factory) {
        this.__tedFactories[algorithm] = factory;
    };

    // Override
    FormatGeneralFactory.prototype.getTransportableDataFactory = function (algorithm) {
        return this.__tedFactories[algorithm];
    };

    // Override
    FormatGeneralFactory.prototype.createTransportableData = function (data, algorithm) {
        if (!algorithm || algorithm === '' || algorithm === '*') {
            algorithm = EncodeAlgorithms.DEFAULT;
        }
        var factory = this.getTransportableDataFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('TED algorithm not support: ' + algorithm);
        }
        return factory.createTransportableData(data);
    };

    // Override
    FormatGeneralFactory.prototype.parseTransportableData = function (ted) {
        if (!ted) {
            return null;
        } else if (Interface.conforms(ted, TransportableData)) {
            return ted;
        }
        // unwrap
        var info = this.decode(ted, 'data');
        if (!info) {
            return null;
        }
        var algo = this.getFormatAlgorithm(info);
        var factory = !algo ? null : this.getTransportableDataFactory(algo);
        if (!factory) {
            // unknown algorithm, get default factory
            factory = this.getTransportableDataFactory('*');  // unknown
            if (!factory) {
                throw new ReferenceError('default TED factory not found');
            }
        }
        return factory.parseTransportableData(info);
    };

    ///
    ///   PNF - Portable Network File
    ///

    // Override
    FormatGeneralFactory.prototype.setPortableNetworkFileFactory = function (factory) {
        this.__pnfFactory = factory;
    };

    // Override
    FormatGeneralFactory.prototype.getPortableNetworkFileFactory = function () {
        return this.__pnfFactory;
    };

    // Override
    FormatGeneralFactory.prototype.createPortableNetworkFile = function (data, filename, url, password) {
        var factory = this.getPortableNetworkFileFactory();
        if (!factory) {
            throw new ReferenceError('PNF factory not ready');
        }
        return factory.createPortableNetworkFile(data, filename, url, password);
    };

    // Override
    FormatGeneralFactory.prototype.parsePortableNetworkFile = function (pnf) {
        if (!pnf) {
            return null;
        } else if (Interface.conforms(pnf, PortableNetworkFile)) {
            return pnf;
        }
        // unwrap
        var info = this.decode(pnf, 'URL');
        if (!info) {
            return null;
        }
        var factory = this.getPortableNetworkFileFactory();
        if (!factory) {
            throw new ReferenceError('PNF factory not ready');
        }
        return factory.parsePortableNetworkFile(info);
    };
