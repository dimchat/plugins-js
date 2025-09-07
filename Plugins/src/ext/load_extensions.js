'use strict';
// license: https://mit-license.org
//
//  DIMP : Decentralized Instant Messaging Protocol
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

//! require 'dkd/*.js'

    /**
     *  Core Extensions Loader
     *  ~~~~~~~~~~~~~~~~~~~~~~
     */
    dimp.ext.ExtensionLoader = function () {
        BaseObject.call(this);
    };
    var ExtensionLoader = dimp.ext.ExtensionLoader;

    Class(ExtensionLoader, BaseObject, null);

    Implementation(ExtensionLoader, {

        /**
         *  Register core factories
         */
        load: function () {

            this.registerCoreHelpers();

            this.registerMessageFactories();

            this.registerContentFactories();
            this.registerCommandFactories();

        },

        /**
         *  Core extensions
         */
        // protected
        registerCoreHelpers: function () {

            this.registerCryptoHelpers();
            this.registerFormatHelpers();

            this.registerAccountHelpers();

            this.registerMessageHelpers();
            this.registerCommandHelpers();

        },
        // protected
        registerCryptoHelpers: function () {
            // crypto
            var helper = new CryptoKeyGeneralFactory();
            var ext = SharedCryptoExtensions;
            ext.setSymmetricHelper(helper);
            ext.setPrivateHelper(helper);
            ext.setPublicHelper(helper);
            ext.setHelper(helper);
        },
        // protected
        registerFormatHelpers: function () {
            // format
            var helper = new FormatGeneralFactory();
            var ext = SharedFormatExtensions;
            ext.setPNFHelper(helper);
            ext.setTEDHelper(helper);
            ext.setHelper(helper);
        },
        // protected
        registerAccountHelpers: function () {
            // mkm
            var helper = new AccountGeneralFactory();
            var ext = SharedAccountExtensions;
            ext.setAddressHelper(helper);
            ext.setIdentifierHelper(helper);
            ext.setMetaHelper(helper);
            ext.setDocumentHelper(helper);
            ext.setHelper(helper);
        },
        // protected
        registerMessageHelpers: function () {
            // dkd
            var helper = new MessageGeneralFactory();
            var ext = SharedMessageExtensions;
            ext.setContentHelper(helper);
            ext.setEnvelopeHelper(helper);
            ext.setInstantHelper(helper);
            ext.setSecureHelper(helper);
            ext.setReliableHelper(helper);
            ext.setHelper(helper);
        },
        // protected
        registerCommandHelpers: function () {
            // cmd
            var helper = new CommandGeneralFactory();
            var ext = SharedCommandExtensions;
            ext.setCommandHelper(helper);
            ext.setHelper(helper);
        },

        /**
         *  Message factories
         */
        // protected
        registerMessageFactories: function () {

            // Envelope factory
            var factory = new MessageFactory();
            Envelope.setFactory(factory);

            // Message factories
            InstantMessage.setFactory(factory);
            SecureMessage.setFactory(factory);
            ReliableMessage.setFactory(factory);
        },

        /**
         *  Core content factories
         */
        // protected
        registerContentFactories: function () {

            // Text
            this.setContentFactory(ContentType.TEXT, 'text', null, BaseTextContent);

            // File
            this.setContentFactory(ContentType.FILE, 'file', null, BaseFileContent);
            // Image
            this.setContentFactory(ContentType.IMAGE, 'image', null, ImageFileContent);
            // Audio
            this.setContentFactory(ContentType.AUDIO, 'audio', null, AudioFileContent);
            // Video
            this.setContentFactory(ContentType.VIDEO, 'video', null, VideoFileContent);

            // Web Page
            this.setContentFactory(ContentType.PAGE, 'page', null, WebPageContent);

            // Name Card
            this.setContentFactory(ContentType.NAME_CARD, 'card', null, NameCardContent);

            // Quote
            this.setContentFactory(ContentType.QUOTE, 'quote', null, BaseQuoteContent);

            // Money
            this.setContentFactory(ContentType.MONEY, 'money', null, BaseMoneyContent);
            this.setContentFactory(ContentType.TRANSFER, 'transfer', null, TransferMoneyContent);
            // ...

            // Command
            this.setContentFactory(ContentType.COMMAND, 'command', new GeneralCommandFactory(), null);

            // History Command
            this.setContentFactory(ContentType.HISTORY, 'history', new HistoryCommandFactory(), null);

            // Content Array
            this.setContentFactory(ContentType.ARRAY, 'array', null, ListContent);

            // Combine and Forward
            this.setContentFactory(ContentType.COMBINE_FORWARD, 'combine', null, CombineForwardContent);

            // Top-Secret
            this.setContentFactory(ContentType.FORWARD, 'forward', null, SecretContent);

            // unknown content type
            this.setContentFactory(ContentType.ANY, '*', null, BaseContent);

            // Application Customized Content
            this.registerCustomizedFactories();
        },

        /**
         *  Customized content factories
         */
        // protected
        registerCustomizedFactories: function () {

            // Application Customized
            this.setContentFactory(ContentType.CUSTOMIZED, 'customized', null, AppCustomizedContent);
            //this.setContentFactory(ContentType.APPLICATION, 'application', null, AppCustomizedContent);

        },
        
        // protected
        setContentFactory: function (type, alias, factory, clazz) {
            if (factory) {
                Content.setFactory(type, factory);
                Content.setFactory(alias, factory);
            }
            if (clazz) {
                factory = new ContentParser(clazz);
                Content.setFactory(type, factory);
                Content.setFactory(alias, factory);
            }
        },
        // protected
        setCommandFactory: function (cmd, factory, clazz) {
            if (factory) {
                Command.setFactory(cmd, factory);
            }
            if (clazz) {
                factory = new CommandParser(clazz);
                Command.setFactory(cmd, factory);
            }
        },

        /**
         *  Core command factories
         */
        // protected
        registerCommandFactories: function () {

            // Meta Command
            this.setCommandFactory(Command.META, null, BaseMetaCommand);

            // Document Command
            this.setCommandFactory(Command.DOCUMENTS, null, BaseDocumentCommand);

            // Receipt Command
            this.setCommandFactory(Command.RECEIPT, null, BaseReceiptCommand);

            // Group Commands
            this.setCommandFactory('group', new GroupCommandFactory(), null);
            this.setCommandFactory(GroupCommand.INVITE,  null, InviteGroupCommand);
            /// 'expel' is deprecated (use 'reset' instead)
            this.setCommandFactory(GroupCommand.EXPEL,   null, ExpelGroupCommand);
            this.setCommandFactory(GroupCommand.JOIN,    null, JoinGroupCommand);
            this.setCommandFactory(GroupCommand.QUIT,    null, QuitGroupCommand);
            /// 'query' is deprecated
            //this.setCommandFactory(GroupCommand.QUERY, null, QueryGroupCommand);
            this.setCommandFactory(GroupCommand.RESET,   null, ResetGroupCommand);
            // Group Admin Commands
            this.setCommandFactory(GroupCommand.HIRE,    null, HireGroupCommand);
            this.setCommandFactory(GroupCommand.FIRE,    null, FireGroupCommand);
            this.setCommandFactory(GroupCommand.RESIGN,  null, ResignGroupCommand);

        }

    });

    /**
     *  Content Factory
     *  ~~~~~~~~~~~~~~~
     */
    dkd.dkd.ContentParser = function (clazz) {
        BaseObject.call(this);
        this.__class = clazz;
    };
    var ContentParser = dkd.dkd.ContentParser;

    Class(ContentParser, BaseObject, [ContentFactory]);

    // Override
    ContentParser.prototype.parseContent = function (content) {
        return new this.__class(content);
    };

    /**
     *  Command Factory
     *  ~~~~~~~~~~~~~~~
     */
    dkd.dkd.CommandParser = function (clazz) {
        BaseObject.call(this);
        this.__class = clazz;
    };
    var CommandParser = dkd.dkd.CommandParser;

    Class(CommandParser, BaseObject, [CommandFactory]);

    // Override
    CommandParser.prototype.parseCommand = function (content) {
        return new this.__class(content);
    };
