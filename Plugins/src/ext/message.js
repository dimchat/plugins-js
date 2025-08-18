'use strict';
// license: https://mit-license.org
//
//  Dao-Ke-Dao: Universal Message Module
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

//!require <dkd.js>

    /**
     *  Command GeneralFactory
     *  ~~~~~~~~~~~~~~~~~~~~~~
     */
    dkd.ext.MessageGeneralFactory = function () {
        BaseObject.call(this);
        this.__contentFactories = {};
        this.__envelopeFactory = null;
        this.__instantMessageFactory = null;
        this.__secureMessageFactory = null;
        this.__reliableMessageFactory = null;
    };
    var MessageGeneralFactory = dkd.ext.MessageGeneralFactory

    Class(MessageGeneralFactory, BaseObject, [
        GeneralMessageHelper,
        ContentHelper, EnvelopeHelper,
        InstantMessageHelper, SecureMessageHelper, ReliableMessageHelper
    ], null);

    // Override
    MessageGeneralFactory.prototype.getContentType = function (content, defaultValue) {
        var type = content['type'];
        return Converter.getString(type, defaultValue);
    };

    //
    //  Content
    //

    // Override
    MessageGeneralFactory.prototype.setContentFactory = function (type, factory) {
        this.__contentFactories[type] = factory;
    };

    // Override
    MessageGeneralFactory.prototype.getContentFactory = function (type) {
        return this.__contentFactories[type];
    };

    // Override
    MessageGeneralFactory.prototype.parseContent = function (content) {
        if (!content) {
            return null;
        } else if (Interface.conforms(content, Content)) {
            return content;
        }
        var info = Wrapper.fetchMap(content);
        if (!info) {
            return null;
        }
        var type = this.getContentType(info, null);
        var factory = !type ? null : this.getContentFactory(type);
        if (!factory) {
            // unknown meta type, get default meta factory
            factory = this.getContentFactory('*');  // unknown
            if (!factory) {
                throw new ReferenceError('default content factory not found');
            }
        }
        return factory.parseContent(info);
    };

    //
    //  Envelope
    //

    // Override
    MessageGeneralFactory.prototype.setEnvelopeFactory = function (factory) {
        this.__envelopeFactory = factory;
    };

    // Override
    MessageGeneralFactory.prototype.getEnvelopeFactory = function () {
        return this.__envelopeFactory;
    };

    // Override
    MessageGeneralFactory.prototype.createEnvelope = function (sender, receiver, time) {
        var factory = this.getEnvelopeFactory();
        if (!factory) {
            throw new ReferenceError('envelope factory not ready');
        }
        return factory.createEnvelope(sender, receiver, time);
    };

    // Override
    MessageGeneralFactory.prototype.parseEnvelope = function (env) {
        if (!env) {
            return null;
        } else if (Interface.conforms(env, Envelope)) {
            return env;
        }
        var info = Wrapper.fetchMap(env);
        if (!info) {
            return null;
        }
        var factory = this.getEnvelopeFactory();
        if (!factory) {
            throw new ReferenceError('envelope factory not ready');
        }
        return factory.parseEnvelope(info);
    };

    //
    //  InstantMessage
    //

    // Override
    MessageGeneralFactory.prototype.setInstantMessageFactory = function (factory) {
        this.__instantMessageFactory = factory;
    };

    // Override
    MessageGeneralFactory.prototype.getInstantMessageFactory = function () {
        return this.__instantMessageFactory;
    };

    // Override
    MessageGeneralFactory.prototype.createInstantMessage = function (head, body) {
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.createInstantMessage(head, body);
    };

    // Override
    MessageGeneralFactory.prototype.parseInstantMessage = function (msg) {
        if (!msg) {
            return null;
        } else if (Interface.conforms(msg, InstantMessage)) {
            return msg;
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null;
        }
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.parseInstantMessage(info);
    };

    // Override
    MessageGeneralFactory.prototype.generateSerialNumber = function (type, when) {
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.generateSerialNumber(type, when);
    };

    //
    //  SecureMessage
    //

    // Override
    MessageGeneralFactory.prototype.setSecureMessageFactory = function (factory) {
        this.__secureMessageFactory = factory;
    };

    // Override
    MessageGeneralFactory.prototype.getSecureMessageFactory = function () {
        return this.__secureMessageFactory;
    };

    // Override
    MessageGeneralFactory.prototype.parseSecureMessage = function (msg) {
        if (!msg) {
            return null;
        } else if (Interface.conforms(msg, SecureMessage)) {
            return msg;
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null;
        }
        var factory = this.getSecureMessageFactory();
        if (!factory) {
            throw new ReferenceError('secure message factory not ready');
        }
        return factory.parseSecureMessage(info);
    };

    //
    //  ReliableMessage
    //

    // Override
    MessageGeneralFactory.prototype.setReliableMessageFactory = function (factory) {
        this.__reliableMessageFactory = factory;
    };

    // Override
    MessageGeneralFactory.prototype.getReliableMessageFactory = function () {
        return this.__reliableMessageFactory;
    };

    // Override
    MessageGeneralFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg) {
            return null;
        } else if (Interface.conforms(msg, ReliableMessage)) {
            return msg;
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null;
        }
        var factory = this.getReliableMessageFactory();
        if (!factory) {
            throw new ReferenceError('reliable message factory not ready');
        }
        return factory.parseReliableMessage(info);
    };
