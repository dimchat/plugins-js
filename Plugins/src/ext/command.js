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

//!require <dimp.js>

    /**
     *  Command GeneralFactory
     *  ~~~~~~~~~~~~~~~~~~~~~~
     */
    dkd.ext.CommandGeneralFactory = function () {
        BaseObject.call(this);
        this.__commandFactories = {};
    };
    var CommandGeneralFactory = dkd.ext.CommandGeneralFactory

    Class(CommandGeneralFactory, BaseObject, [
        GeneralCommandHelper,
        CommandHelper
    ], null);

    // Override
    CommandGeneralFactory.prototype.getCmd = function (content, defaultValue) {
        var cmd = content['command'];
        return Converter.getString(cmd, defaultValue);
    };

    //
    //  Command
    //

    // Override
    CommandGeneralFactory.prototype.setCommandFactory = function (cmd, factory) {
        this.__commandFactories[cmd] = factory;
    };

    // Override
    CommandGeneralFactory.prototype.getCommandFactory = function (cmd) {
        return this.__commandFactories[cmd];
    };

    // Override
    CommandGeneralFactory.prototype.parseCommand = function (content) {
        if (!content) {
            return null;
        } else if (Interface.conforms(content, Command)) {
            return content;
        }
        var info = Wrapper.fetchMap(content);
        if (!info) {
            return null;
        }
        var cmd = this.getCmd(info, null);
        var factory = !cmd ? null : this.getCommandFactory(cmd);
        if (!factory) {
            // unknown command name, get base command factory
            factory = default_command_factory(info);
            if (!factory) {
                throw new ReferenceError('default document factory not found');
            }
        }
        return factory.parseCommand(info);
    };

    var default_command_factory = function (info) {
        var helper = SharedMessageExtensions.getHelper();
        var contentHelper = SharedMessageExtensions.getContentHelper();
        // get factory by content type
        var type = helper.getContentType(info);
        if (!type) {
            return null;
        }
        var factory = contentHelper.getContentFactory(type);
        if (!factory) {
            return null;
        } else if (Interface.conforms(factory, CommandFactory)) {
            return factory;
        } else {
            return null;
        }
    };
