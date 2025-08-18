'use strict';
// license: https://mit-license.org
//
//  DIMP : Decentralized Instant Messaging Protocol
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

//!require <dimp.js>

    /**
     *  General Command Factory
     *  ~~~~~~~~~~~~~~~~~~~~~~~
     */
    dkd.dkd.GeneralCommandFactory = function () {
        BaseObject.call(this);
    };
    var GeneralCommandFactory = dkd.dkd.GeneralCommandFactory;

    Class(GeneralCommandFactory, BaseObject, [ContentFactory, CommandFactory], null);

    // Override
    GeneralCommandFactory.prototype.parseContent = function (content) {
        var helper = SharedCommandExtensions.getHelper();
        var cmdHelper = SharedCommandExtensions.getCommandHelper();
        // get factory by command name
        var cmd = helper.getCmd(content, null);
        var factory = !cmd ? null : cmdHelper.getCommandFactory(cmd);
        if (!factory) {
            // check for group command
            if (content['group']/* && cmd !== 'group'*/) {
                factory = cmdHelper.getCommandFactory('group');
            }
            if (!factory) {
                factory = this;
            }
        }
        return factory.parseCommand(content);
    };

    // Override
    GeneralCommandFactory.prototype.parseCommand = function (content) {
        // check 'sn', 'command'
        if (!content['sn'] || !content['command']) {
            // content.sn should not be empty
            // content.command should not be empty
            return null;
        }
        return new BaseCommand(content);
    };

    /**
     *  History Command Factory
     *  ~~~~~~~~~~~~~~~~~~~~~~~
     */
    dkd.dkd.HistoryCommandFactory = function () {
        GeneralCommandFactory.call(this);
    };
    var HistoryCommandFactory = dkd.dkd.HistoryCommandFactory;

    Class(HistoryCommandFactory, GeneralCommandFactory, null, null);

    // Override
    HistoryCommandFactory.prototype.parseCommand = function (content) {
        // check 'sn', 'command', 'time'
        if (!content['sn'] || !content['command'] || !content['time']) {
            // content.sn should not be empty
            // content.command should not be empty
            // content.time should not be empty
            return null;
        }
        return new BaseHistoryCommand(content);
    };

    /**
     *  Group Command Factory
     *  ~~~~~~~~~~~~~~~~~~~~~~~
     */
    dkd.dkd.GroupCommandFactory = function () {
        HistoryCommandFactory.call(this);
    };
    var GroupCommandFactory = dkd.dkd.GroupCommandFactory;

    Class(GroupCommandFactory, HistoryCommandFactory, null, null);

    // Override
    GroupCommandFactory.prototype.parseContent = function (content) {
        var helper = SharedCommandExtensions.getHelper();
        var cmdHelper = SharedCommandExtensions.getCommandHelper();
        // get factory by command name
        var cmd = helper.getCmd(content, null);
        var factory = !cmd ? null : cmdHelper.getCommandFactory(cmd);
        if (!factory) {
            factory = this;
        }
        return factory.parseCommand(content);
    };

    // Override
    GroupCommandFactory.prototype.parseCommand = function (content) {
        // check 'sn', 'command', 'group'
        if (!content['sn'] || !content['command'] || !content['group']) {
            // content.sn should not be empty
            // content.command should not be empty
            // content.group should not be empty
            return null;
        }
        return new BaseGroupCommand(content);
    };
