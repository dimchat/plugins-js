/**
 *  DIM-Plugins (v2.0.0)
 *  (DIMP: Decentralized Instant Messaging Protocol)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Aug. 19, 2025
 * @copyright (c) 2020-2025 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
(function (dimp, dkd, mkm, mk) {
    if (typeof dimp.ext !== 'object') {
        dimp.ext = {}
    }
    var Interface = mk.type.Interface;
    var Class = mk.type.Class;
    var Converter = mk.type.Converter;
    var Wrapper = mk.type.Wrapper;
    var Mapper = mk.type.Mapper;
    var Stringer = mk.type.Stringer;
    var IObject = mk.type.Object;
    var BaseObject = mk.type.BaseObject;
    var ConstantString = mk.type.ConstantString;
    var Dictionary = mk.type.Dictionary;
    var Arrays = mk.type.Arrays;
    var StringCoder = mk.format.StringCoder;
    var UTF8 = mk.format.UTF8;
    var ObjectCoder = mk.format.ObjectCoder;
    var JSONMap = mk.format.JSONMap;
    var JSONList = mk.format.JSONList;
    var DataCoder = mk.format.DataCoder;
    var Base58 = mk.format.Base58;
    var Base64 = mk.format.Base64;
    var Hex = mk.format.Hex;
    var BaseDataWrapper = mk.format.BaseDataWrapper;
    var BaseFileWrapper = mk.format.BaseFileWrapper;
    var DataDigester = mk.digest.DataDigester;
    var MD5 = mk.digest.MD5;
    var SHA1 = mk.digest.SHA1;
    var SHA256 = mk.digest.SHA256;
    var RIPEMD160 = mk.digest.RIPEMD160;
    var Keccak256 = mk.digest.Keccak256;
    var EncodeAlgorithms = mk.protocol.EncodeAlgorithms;
    var TransportableData = mk.protocol.TransportableData;
    var PortableNetworkFile = mk.protocol.PortableNetworkFile;
    var SymmetricAlgorithms = mk.protocol.SymmetricAlgorithms;
    var AsymmetricAlgorithms = mk.protocol.AsymmetricAlgorithms;
    var EncryptKey = mk.protocol.EncryptKey;
    var DecryptKey = mk.protocol.DecryptKey;
    var SymmetricKey = mk.protocol.SymmetricKey;
    var SymmetricKeyFactory = mk.protocol.SymmetricKey.Factory;
    var AsymmetricKey = mk.protocol.AsymmetricKey;
    var PublicKey = mk.protocol.PublicKey;
    var PublicKeyFactory = mk.protocol.PublicKey.Factory;
    var PrivateKey = mk.protocol.PrivateKey;
    var PrivateKeyFactory = mk.protocol.PrivateKey.Factory;
    var BaseSymmetricKey = mk.crypto.BaseSymmetricKey;
    var BasePublicKey = mk.crypto.BasePublicKey;
    var BasePrivateKey = mk.crypto.BasePrivateKey;
    var GeneralCryptoHelper = mk.ext.GeneralCryptoHelper;
    var SymmetricKeyHelper = mk.ext.SymmetricKeyHelper;
    var PrivateKeyHelper = mk.ext.PrivateKeyHelper;
    var PublicKeyHelper = mk.ext.PublicKeyHelper;
    var GeneralFormatHelper = mk.ext.GeneralFormatHelper;
    var PortableNetworkFileHelper = mk.ext.PortableNetworkFileHelper;
    var TransportableDataHelper = mk.ext.TransportableDataHelper;
    var SharedCryptoExtensions = mk.ext.SharedCryptoExtensions;
    var SharedFormatExtensions = mk.ext.SharedFormatExtensions;
    var EntityType = mkm.protocol.EntityType;
    var Address = mkm.protocol.Address;
    var AddressFactory = mkm.protocol.Address.Factory;
    var ID = mkm.protocol.ID;
    var IDFactory = mkm.protocol.ID.Factory;
    var Meta = mkm.protocol.Meta;
    var MetaFactory = mkm.protocol.Meta.Factory;
    var Document = mkm.protocol.Document;
    var DocumentFactory = mkm.protocol.Document.Factory;
    var MetaType = mkm.protocol.MetaType;
    var DocumentType = mkm.protocol.DocumentType;
    var Identifier = mkm.mkm.Identifier;
    var BaseMeta = mkm.mkm.BaseMeta;
    var BaseDocument = mkm.mkm.BaseDocument;
    var BaseBulletin = mkm.mkm.BaseBulletin;
    var BaseVisa = mkm.mkm.BaseVisa;
    var GeneralAccountHelper = mkm.ext.GeneralAccountHelper;
    var AddressHelper = mkm.ext.AddressHelper;
    var IdentifierHelper = mkm.ext.IdentifierHelper;
    var MetaHelper = mkm.ext.MetaHelper;
    var DocumentHelper = mkm.ext.DocumentHelper;
    var SharedAccountExtensions = mkm.ext.SharedAccountExtensions;
    var InstantMessage = dkd.protocol.InstantMessage;
    var InstantMessageFactory = dkd.protocol.InstantMessage.Factory;
    var SecureMessage = dkd.protocol.SecureMessage;
    var SecureMessageFactory = dkd.protocol.SecureMessage.Factory;
    var ReliableMessage = dkd.protocol.ReliableMessage;
    var ReliableMessageFactory = dkd.protocol.ReliableMessage.Factory;
    var Envelope = dkd.protocol.Envelope;
    var EnvelopeFactory = dkd.protocol.Envelope.Factory;
    var Content = dkd.protocol.Content;
    var ContentFactory = dkd.protocol.Content.Factory;
    var Command = dkd.protocol.Command;
    var CommandFactory = dkd.protocol.Command.Factory;
    var ContentType = dkd.protocol.ContentType;
    var GroupCommand = dkd.protocol.GroupCommand;
    var MessageEnvelope = dkd.msg.MessageEnvelope;
    var PlainMessage = dkd.msg.PlainMessage;
    var EncryptedMessage = dkd.msg.EncryptedMessage;
    var NetworkMessage = dkd.msg.NetworkMessage;
    var BaseContent = dkd.dkd.BaseContent;
    var BaseTextContent = dkd.dkd.BaseTextContent;
    var BaseFileContent = dkd.dkd.BaseFileContent;
    var ImageFileContent = dkd.dkd.ImageFileContent;
    var AudioFileContent = dkd.dkd.AudioFileContent;
    var VideoFileContent = dkd.dkd.VideoFileContent;
    var WebPageContent = dkd.dkd.WebPageContent;
    var NameCardContent = dkd.dkd.NameCardContent;
    var BaseQuoteContent = dkd.dkd.BaseQuoteContent;
    var BaseMoneyContent = dkd.dkd.BaseMoneyContent;
    var TransferMoneyContent = dkd.dkd.TransferMoneyContent;
    var ListContent = dkd.dkd.ListContent;
    var CombineForwardContent = dkd.dkd.CombineForwardContent;
    var SecretContent = dkd.dkd.SecretContent;
    var AppCustomizedContent = dkd.dkd.AppCustomizedContent;
    var BaseCommand = dkd.dkd.BaseCommand;
    var BaseMetaCommand = dkd.dkd.BaseMetaCommand;
    var BaseDocumentCommand = dkd.dkd.BaseDocumentCommand;
    var BaseReceiptCommand = dkd.dkd.BaseReceiptCommand;
    var BaseHistoryCommand = dkd.dkd.BaseHistoryCommand;
    var BaseGroupCommand = dkd.dkd.BaseGroupCommand;
    var InviteGroupCommand = dkd.dkd.InviteGroupCommand;
    var ExpelGroupCommand = dkd.dkd.ExpelGroupCommand;
    var JoinGroupCommand = dkd.dkd.JoinGroupCommand;
    var QuitGroupCommand = dkd.dkd.QuitGroupCommand;
    var ResetGroupCommand = dkd.dkd.ResetGroupCommand;
    var HireGroupCommand = dkd.dkd.HireGroupCommand;
    var FireGroupCommand = dkd.dkd.FireGroupCommand;
    var ResignGroupCommand = dkd.dkd.ResignGroupCommand;
    var GeneralMessageHelper = dkd.ext.GeneralMessageHelper;
    var ContentHelper = dkd.ext.ContentHelper;
    var EnvelopeHelper = dkd.ext.EnvelopeHelper;
    var InstantMessageHelper = dkd.ext.InstantMessageHelper;
    var SecureMessageHelper = dkd.ext.SecureMessageHelper;
    var ReliableMessageHelper = dkd.ext.ReliableMessageHelper;
    var GeneralCommandHelper = dkd.ext.GeneralCommandHelper;
    var CommandHelper = dkd.ext.CommandHelper;
    var SharedCommandExtensions = dkd.ext.SharedCommandExtensions;
    var SharedMessageExtensions = dkd.ext.SharedMessageExtensions;
    var string_repeat = function (count) {
        var text = '';
        for (var i = 0; i < count; ++i) {
            text += this
        }
        return text
    };

    function base_chars(ALPHABET) {
        if (ALPHABET.length >= 255) {
            throw new TypeError("Alphabet too long")
        }
        var BASE_MAP = new Uint8Array(256);
        for (var j = 0; j < BASE_MAP.length; j++) {
            BASE_MAP[j] = 255
        }
        for (var i = 0; i < ALPHABET.length; i++) {
            var x = ALPHABET.charAt(i);
            var xc = x.charCodeAt(0);
            if (BASE_MAP[xc] !== 255) {
                throw new TypeError(x + " is ambiguous")
            }
            BASE_MAP[xc] = i
        }
        var BASE = ALPHABET.length;
        var LEADER = ALPHABET.charAt(0);
        var FACTOR = Math.log(BASE) / Math.log(256);
        var iFACTOR = Math.log(256) / Math.log(BASE);

        function encode(source) {
            if (source.length === 0) {
                return ""
            }
            var zeroes = 0;
            var length = 0;
            var pbegin = 0;
            var pend = source.length;
            while (pbegin !== pend && source[pbegin] === 0) {
                pbegin++;
                zeroes++
            }
            var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
            var b58 = new Uint8Array(size);
            while (pbegin !== pend) {
                var carry = source[pbegin];
                var i = 0;
                for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
                    carry += (256 * b58[it1]) >>> 0;
                    b58[it1] = (carry % BASE) >>> 0;
                    carry = (carry / BASE) >>> 0
                }
                if (carry !== 0) {
                    throw new Error("Non-zero carry")
                }
                length = i;
                pbegin++
            }
            var it2 = size - length;
            while (it2 !== size && b58[it2] === 0) {
                it2++
            }
            var str = string_repeat.call(LEADER, zeroes);
            for (; it2 < size; ++it2) {
                str += ALPHABET.charAt(b58[it2])
            }
            return str
        }

        function decodeUnsafe(source) {
            if (typeof source !== "string") {
                throw new TypeError("Expected String")
            }
            if (source.length === 0) {
                return []
            }
            var psz = 0;
            if (source[psz] === " ") {
                return
            }
            var zeroes = 0;
            var length = 0;
            while (source[psz] === LEADER) {
                zeroes++;
                psz++
            }
            var size = (((source.length - psz) * FACTOR) + 1) >>> 0;
            var b256 = new Uint8Array(size);
            while (source[psz]) {
                var carry = BASE_MAP[source.charCodeAt(psz)];
                if (carry === 255) {
                    return
                }
                var i = 0;
                for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
                    carry += (BASE * b256[it3]) >>> 0;
                    b256[it3] = (carry % 256) >>> 0;
                    carry = (carry / 256) >>> 0
                }
                if (carry !== 0) {
                    throw new Error("Non-zero carry")
                }
                length = i;
                psz++
            }
            if (source[psz] === " ") {
                return
            }
            var it4 = size - length;
            while (it4 !== size && b256[it4] === 0) {
                it4++
            }
            var vch = [];
            var j = 0;
            for (; j < zeroes; ++j) {
                vch[j] = 0
            }
            while (it4 !== size) {
                vch[j++] = b256[it4++]
            }
            return vch
        }

        function decode(string) {
            var buffer = decodeUnsafe(string);
            if (buffer) {
                return new Uint8Array(buffer)
            }
            throw new Error("Non-base" + BASE + " character")
        }

        return {encode: encode, decodeUnsafe: decodeUnsafe, decode: decode}
    }

    var bs58 = base_chars('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
    mk.format.Base58Coder = function () {
        BaseObject.call(this)
    };
    var Base58Coder = mk.format.Base58Coder;
    Class(Base58Coder, BaseObject, [DataCoder], {
        encode: function (data) {
            return bs58.encode(data)
        }, decode: function (string) {
            return bs58.decode(string)
        }
    });
    var base64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var base64_values = new Int8Array(128);
    (function (chars, values) {
        for (var i = 0; i < chars.length; ++i) {
            values[chars.charCodeAt(i)] = i
        }
    })(base64_chars, base64_values);
    var base64_encode = function (data) {
        var base64 = '';
        var length = data.length;
        var remainder = length % 3;
        length -= remainder;
        var x1, x2, x3;
        var i;
        for (i = 0; i < length; i += 3) {
            x1 = data[i];
            x2 = data[i + 1];
            x3 = data[i + 2];
            base64 += base64_chars.charAt((x1 & 0xFC) >> 2);
            base64 += base64_chars.charAt(((x1 & 0x03) << 4) | ((x2 & 0xF0) >> 4));
            base64 += base64_chars.charAt(((x2 & 0x0F) << 2) | ((x3 & 0xC0) >> 6));
            base64 += base64_chars.charAt(x3 & 0x3F)
        }
        if (remainder === 1) {
            x1 = data[i];
            base64 += base64_chars.charAt((x1 & 0xFC) >> 2);
            base64 += base64_chars.charAt((x1 & 0x03) << 4);
            base64 += '=='
        } else if (remainder === 2) {
            x1 = data[i];
            x2 = data[i + 1];
            base64 += base64_chars.charAt((x1 & 0xFC) >> 2);
            base64 += base64_chars.charAt(((x1 & 0x03) << 4) | ((x2 & 0xF0) >> 4));
            base64 += base64_chars.charAt((x2 & 0x0F) << 2);
            base64 += '='
        }
        return base64
    };
    var base64_decode = function (string) {
        var str = string.replace(/[^A-Za-z0-9+\/=]/g, '');
        var length = str.length;
        if ((length % 4) !== 0 || !/^[A-Za-z0-9+\/]+={0,2}$/.test(str)) {
            throw new Error('base64 string error: ' + string)
        }
        var array = [];
        var ch1, ch2, ch3, ch4;
        var i;
        for (i = 0; i < length; i += 4) {
            ch1 = base64_values[str.charCodeAt(i)];
            ch2 = base64_values[str.charCodeAt(i + 1)];
            ch3 = base64_values[str.charCodeAt(i + 2)];
            ch4 = base64_values[str.charCodeAt(i + 3)];
            array.push(((ch1 & 0x3F) << 2) | ((ch2 & 0x30) >> 4));
            array.push(((ch2 & 0x0F) << 4) | ((ch3 & 0x3C) >> 2));
            array.push(((ch3 & 0x03) << 6) | ((ch4 & 0x3F) >> 0))
        }
        while (str[--i] === '=') {
            array.pop()
        }
        return Uint8Array.from(array)
    };
    mk.format.Base64Coder = function () {
        BaseObject.call(this)
    };
    var Base64Coder = mk.format.Base64Coder;
    Class(Base64Coder, BaseObject, [DataCoder], {
        encode: function (data) {
            return base64_encode(data)
        }, decode: function (string) {
            return base64_decode(string)
        }
    });
    var hex_chars = '0123456789abcdef';
    var hex_values = new Int8Array(128);
    (function (chars, values) {
        for (var i = 0; i < chars.length; ++i) {
            values[chars.charCodeAt(i)] = i
        }
        values['A'.charCodeAt(0)] = 0x0A;
        values['B'.charCodeAt(0)] = 0x0B;
        values['C'.charCodeAt(0)] = 0x0C;
        values['D'.charCodeAt(0)] = 0x0D;
        values['E'.charCodeAt(0)] = 0x0E;
        values['F'.charCodeAt(0)] = 0x0F
    })(hex_chars, hex_values);
    var hex_encode = function (data) {
        var len = data.length;
        var str = '';
        var byt;
        for (var i = 0; i < len; ++i) {
            byt = data[i];
            str += hex_chars[byt >> 4];
            str += hex_chars[byt & 0x0F]
        }
        return str
    };
    var hex_decode = function (string) {
        var len = string.length;
        if (len > 2) {
            if (string[0] === '0') {
                if (string[1] === 'x' || string[1] === 'X') {
                    string = string.substring(2);
                    len -= 2
                }
            }
        }
        if (len % 2 === 1) {
            string = '0' + string;
            len += 1
        }
        var cnt = len >> 1;
        var hi, lo;
        var data = new Uint8Array(cnt);
        for (var i = 0, j = 0; i < cnt; ++i, j += 2) {
            hi = hex_values[string.charCodeAt(j)];
            lo = hex_values[string.charCodeAt(j + 1)];
            data[i] = (hi << 4) | lo
        }
        return data
    };
    mk.format.HexCoder = function () {
        BaseObject.call(this)
    };
    var HexCoder = mk.format.HexCoder;
    Class(HexCoder, BaseObject, [DataCoder], {
        encode: function (data) {
            return hex_encode(data)
        }, decode: function (string) {
            return hex_decode(string)
        }
    });
    mk.format.JSONCoder = function () {
        BaseObject.call(this)
    };
    var JSONCoder = mk.format.JSONCoder;
    Class(JSONCoder, BaseObject, [ObjectCoder], {
        encode: function (object) {
            return JSON.stringify(object)
        }, decode: function (string) {
            return JSON.parse(string)
        }
    });
    mk.format.BaseNetworkFile = function () {
        var ted = null, filename = null, url = null, password = null;
        if (arguments.length === 1) {
            Dictionary.call(this, arguments[0])
        } else if (arguments.length === 4) {
            Dictionary.call(this);
            ted = arguments[0];
            filename = arguments[1];
            url = arguments[2];
            password = arguments[3]
        } else {
            throw new SyntaxError('PNF arguments error: ' + arguments);
        }
        var wrapper = new BaseFileWrapper(this.toMap());
        if (ted) {
            wrapper.setData(ted)
        }
        if (filename) {
            wrapper.setFilename(filename)
        }
        if (url) {
            wrapper.setURL(url)
        }
        if (password) {
            wrapper.setPassword(password)
        }
        this.__wrapper = wrapper
    };
    var BaseNetworkFile = mk.format.BaseNetworkFile;
    Class(BaseNetworkFile, Dictionary, [PortableNetworkFile], {
        getData: function () {
            var ted = this.__wrapper.getData();
            return !ted ? null : ted.getData()
        }, setData: function (binary) {
            this.__wrapper.setBinaryData(binary)
        }, getFilename: function () {
            return this.__wrapper.getFilename()
        }, setFilename: function (filename) {
            this.__wrapper.setFilename(filename)
        }, getURL: function () {
            return this.__wrapper.getURL()
        }, setURL: function (url) {
            this.__wrapper.setURL(url)
        }, getPassword: function () {
            return this.__wrapper.getPassword()
        }, setPassword: function (key) {
            this.__wrapper.setPassword(key)
        }, toString: function () {
            var url = this.getURLString();
            if (url) {
                return url
            }
            return JSONMap.encode(this.toMap())
        }, toObject: function () {
            var url = this.getURLString();
            if (url) {
                return url
            }
            return this.toMap()
        }, getURLString: function () {
            var url = this.getString('URL', '');
            var len = url.length;
            if (len === 0) {
                return null
            } else if (len > 5 && url.substring(0, 5) === 'data:') {
                return url
            }
            var count = this.getLength();
            if (count === 1) {
                return url
            } else if (count === 2 && this.getValue('filename')) {
                return url
            } else {
                return null
            }
        }
    });
    mk.format.BaseNetworkFileFactory = function () {
        BaseObject.call(this)
    };
    var BaseNetworkFileFactory = mk.format.BaseNetworkFileFactory;
    Class(BaseNetworkFileFactory, BaseObject, [PortableNetworkFile.Factory], {
        createPortableNetworkFile: function (ted, filename, url, password) {
            return new BaseNetworkFile(ted, filename, url, password)
        }, parsePortableNetworkFile: function (pnf) {
            if (pnf['data'] || pnf['URL'] || pnf['filename']) {
            } else {
                return null
            }
            return new BaseNetworkFile(pnf)
        }
    });
    mk.format.Base64Data = function (info) {
        var binary = null;
        if (info instanceof Uint8Array) {
            binary = info;
            info = null
        }
        Dictionary.call(this, info);
        var wrapper = new BaseDataWrapper(this.toMap());
        if (binary) {
            wrapper.setAlgorithm(EncodeAlgorithms.BASE_64);
            if (binary.length > 0) {
                wrapper.setData(binary)
            }
        }
        this.__wrapper = wrapper
    };
    var Base64Data = mk.format.Base64Data;
    Class(Base64Data, Dictionary, [TransportableData], {
        getAlgorithm: function () {
            return this.__wrapper.getAlgorithm()
        }, getData: function () {
            return this.__wrapper.getData()
        }, toObject: function () {
            return this.toString()
        }, toString: function () {
            return this.__wrapper.toString()
        }, encode: function (mimeType) {
            return this.__wrapper.encode(mimeType)
        }
    });
    mk.format.Base64DataFactory = function () {
        BaseObject.call(this)
    };
    var Base64DataFactory = mk.format.Base64DataFactory;
    Class(Base64DataFactory, BaseObject, [TransportableData.Factory], {
        createTransportableData: function (data) {
            return new Base64Data(data)
        }, parseTransportableData: function (ted) {
            if (ted['data']) {
            } else {
                return null
            }
            return new Base64Data(ted)
        }
    });
    var utf8_encode = function (string) {
        var len = string.length;
        var array = [];
        var c, l;
        for (var i = 0; i < len; ++i) {
            c = string.charCodeAt(i);
            if (0xD800 <= c && c <= 0xDBFF) {
                l = string.charCodeAt(++i);
                c = ((c - 0xD800) << 10) + 0x10000 + l - 0xDC00
            }
            if (c <= 0) {
                break
            } else if (c < 0x0080) {
                array.push(c)
            } else if (c < 0x0800) {
                array.push(0xC0 | ((c >> 6) & 0x1F));
                array.push(0x80 | ((c >> 0) & 0x3F))
            } else if (c < 0x10000) {
                array.push(0xE0 | ((c >> 12) & 0x0F));
                array.push(0x80 | ((c >> 6) & 0x3F));
                array.push(0x80 | ((c >> 0) & 0x3F))
            } else {
                array.push(0xF0 | ((c >> 18) & 0x07));
                array.push(0x80 | ((c >> 12) & 0x3F));
                array.push(0x80 | ((c >> 6) & 0x3F));
                array.push(0x80 | ((c >> 0) & 0x3F))
            }
        }
        return Uint8Array.from(array)
    };
    var utf8_decode = function (array) {
        var string = '';
        var len = array.length;
        var c, c2, c3, c4;
        for (var i = 0; i < len; ++i) {
            c = array[i];
            switch (c >> 4) {
                case 12:
                case 13:
                    c2 = array[++i];
                    c = ((c & 0x1F) << 6) | (c2 & 0x3F);
                    break;
                case 14:
                    c2 = array[++i];
                    c3 = array[++i];
                    c = ((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
                    break;
                case 15:
                    c2 = array[++i];
                    c3 = array[++i];
                    c4 = array[++i];
                    c = ((c & 0x07) << 18) | ((c2 & 0x3F) << 12) | ((c3 & 0x3F) << 6) | (c4 & 0x3F);
                    break
            }
            if (c < 0x10000) {
                string += String.fromCharCode(c)
            } else {
                c -= 0x10000;
                string += String.fromCharCode((c >> 10) + 0xD800);
                string += String.fromCharCode((c & 0x03FF) + 0xDC00)
            }
        }
        return string
    };
    mk.format.UTF8Coder = function () {
        BaseObject.call(this)
    };
    var UTF8Coder = mk.format.UTF8Coder;
    Class(UTF8Coder, BaseObject, [StringCoder], {
        encode: function (string) {
            return utf8_encode(string)
        }, decode: function (data) {
            return utf8_decode(data)
        }
    })
    mk.digest.MD5Digester = function () {
        BaseObject.call(this)
    };
    var MD5Digester = mk.digest.MD5Digester;
    Class(MD5Digester, BaseObject, [DataDigester], {
        digest: function (data) {
            var hex = Hex.encode(data);
            var array = CryptoJS.enc.Hex.parse(hex);
            var result = CryptoJS.MD5(array);
            return Hex.decode(result.toString())
        }
    });
    mk.digest.SHA256Digester = function () {
        BaseObject.call(this)
    };
    var SHA256Digester = mk.digest.SHA256Digester;
    Class(SHA256Digester, BaseObject, [DataDigester], {
        digest: function (data) {
            var hex = Hex.encode(data);
            var array = CryptoJS.enc.Hex.parse(hex);
            var result = CryptoJS.SHA256(array);
            return Hex.decode(result.toString())
        }
    });
    mk.digest.RIPEMD160Digester = function () {
        BaseObject.call(this)
    };
    var RIPEMD160Digester = mk.digest.RIPEMD160Digester;
    Class(RIPEMD160Digester, BaseObject, [DataDigester], {
        digest: function (data) {
            var hex = Hex.encode(data);
            var array = CryptoJS.enc.Hex.parse(hex);
            var result = CryptoJS.RIPEMD160(array);
            return Hex.decode(result.toString())
        }
    });
    mk.digest.Keccak256Digester = function () {
        BaseObject.call(this)
    };
    var Keccak256Digester = mk.digest.Keccak256Digester;
    Class(Keccak256Digester, BaseObject, [DataDigester], {
        digest: function (data) {
            var array = window.keccak256.update(data).digest();
            return new Uint8Array(array)
        }
    });
    var bytes2words = function (data) {
        var string = Hex.encode(data);
        return CryptoJS.enc.Hex.parse(string)
    };
    var words2bytes = function (array) {
        var result = array.toString();
        return Hex.decode(result)
    };
    var random_data = function (size) {
        var data = new Uint8Array(size);
        for (var i = 0; i < size; ++i) {
            data[i] = Math.floor(Math.random() * 256)
        }
        return data
    };
    var zero_data = function (size) {
        return new Uint8Array(size)
    };
    mk.crypto.AESKey = function (key) {
        BaseSymmetricKey.call(this, key);
        var base64 = this.getValue('data');
        if (base64) {
            this.__tedKey = null
        } else {
            this.__tedKey = this.generateKeyData()
        }
    };
    var AESKey = mk.crypto.AESKey;
    AESKey.AES_CBC_PKCS7 = 'AES/CBC/PKCS7Padding';
    Class(AESKey, BaseSymmetricKey, null, {
        generateKeyData: function () {
            var keySize = this.getKeySize();
            var pwd = random_data(keySize);
            var ted = TransportableData.create(pwd);
            this.setValue('data', ted.toObject());
            return ted
        }, getKeySize: function () {
            return this.getInt('keySize', 32)
        }, getBlockSize: function () {
            return this.getInt('blockSize', 16)
        }, getData: function () {
            var ted = this.__tedKey;
            if (!ted) {
                var base64 = this.getValue('data');
                ted = TransportableData.parse(base64);
                this.__tedKey = ted
            }
            return !ted ? null : ted.getData()
        }, getInitVector: function (params) {
            if (!params) {
                throw new SyntaxError('params must provided to fetch IV for AES');
            }
            var base64 = params['IV'];
            if (!base64) {
                base64 = params['iv']
            }
            var ted = TransportableData.parse(base64);
            if (ted) {
                return ted.getData()
            } else if (base64) {
                throw new TypeError('IV data error: ' + base64);
            } else {
                return null
            }
        }, zeroInitVector: function () {
            var blockSize = this.getBlockSize();
            return zero_data(blockSize)
        }, newInitVector: function (extra) {
            if (!extra) {
                throw new SyntaxError('extra dict must provided to store IV for AES');
            }
            var blockSize = this.getBlockSize();
            var ivData = random_data(blockSize);
            var ted = TransportableData.create(ivData, null);
            extra['IV'] = ted.toObject();
            return ivData
        }, encrypt: function (plaintext, extra) {
            var iv = this.getInitVector(extra);
            if (!iv) {
                iv = this.newInitVector(extra)
            }
            var ivWordArray = bytes2words(iv);
            var key = this.getData();
            var keyWordArray = bytes2words(key);
            var message = bytes2words(plaintext);
            var cipher = CryptoJS.AES.encrypt(message, keyWordArray, {iv: ivWordArray});
            if (cipher.hasOwnProperty('ciphertext')) {
                return words2bytes(cipher.ciphertext)
            }
            return null
        }, decrypt: function (ciphertext, params) {
            var iv = this.getInitVector(params);
            if (!iv) {
                iv = this.zeroInitVector()
            }
            var ivWordArray = bytes2words(iv);
            var key = this.getData();
            var keyWordArray = bytes2words(key);
            var message = bytes2words(ciphertext);
            var cipher = {ciphertext: message};
            var plaintext = CryptoJS.AES.decrypt(cipher, keyWordArray, {iv: ivWordArray});
            return words2bytes(plaintext)
        }
    });
    mk.crypto.AESKeyFactory = function () {
        BaseObject.call(this)
    };
    var AESKeyFactory = mk.crypto.AESKeyFactory;
    Class(AESKeyFactory, BaseObject, [SymmetricKeyFactory], null);
    AESKeyFactory.prototype.generateSymmetricKey = function () {
        return new AESKey({'algorithm': SymmetricAlgorithms.AES})
    };
    AESKeyFactory.prototype.parseSymmetricKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new AESKey(key)
    };
    var mem_cpy = function (dst, dst_offset, src, src_offset, src_len) {
        for (var i = 0; i < src_len; ++i) {
            dst[dst_offset + i] = src[src_offset + i]
        }
    };
    var trim_to_32_bytes = function (src, src_offset, src_len, dst) {
        var pos = src_offset;
        while (src[pos] === 0 && src_len > 0) {
            ++pos;
            --src_len
        }
        if (src_len > 32 || src_len < 1) {
            return false
        }
        var dst_offset = 32 - src_len;
        mem_cpy(dst, dst_offset, src, pos, src_len);
        return true
    };
    var ecc_der_to_sig = function (der, der_len) {
        var seq_len;
        var r_len;
        var s_len;
        if (der_len < 8 || der[0] !== 0x30 || der[2] !== 0x02) {
            return null
        }
        seq_len = der[1];
        if ((seq_len <= 0) || (seq_len + 2 !== der_len)) {
            return null
        }
        r_len = der[3];
        if ((r_len < 1) || (r_len > seq_len - 5) || (der[4 + r_len] !== 0x02)) {
            return null
        }
        s_len = der[5 + r_len];
        if ((s_len < 1) || (s_len !== seq_len - 4 - r_len)) {
            return null
        }
        var sig_r = new Uint8Array(32);
        var sig_s = new Uint8Array(32);
        if (trim_to_32_bytes(der, 4, r_len, sig_r) && trim_to_32_bytes(der, 6 + r_len, s_len, sig_s)) {
            return {r: sig_r, s: sig_s}
        } else {
            return null
        }
    };
    var ecc_sig_to_der = function (sig_r, sig_s, der) {
        var i;
        var p = 0, len, len1, len2;
        der[p] = 0x30;
        p++;
        der[p] = 0x00;
        len = p;
        p++;
        der[p] = 0x02;
        p++;
        der[p] = 0x00;
        len1 = p;
        p++;
        i = 0;
        while (sig_r[i] === 0 && i < 32) {
            i++
        }
        if (sig_r[i] >= 0x80) {
            der[p] = 0x00;
            p++;
            der[len1] = der[len1] + 1
        }
        while (i < 32) {
            der[p] = sig_r[i];
            p++;
            der[len1] = der[len1] + 1;
            i++
        }
        der[p] = 0x02;
        p++;
        der[p] = 0x00;
        len2 = p;
        p++;
        i = 0;
        while (sig_s[i] === 0 && i < 32) {
            i++
        }
        if (sig_s[i] >= 0x80) {
            der[p] = 0x00;
            p++;
            der[len2] = der[len2] + 1
        }
        while (i < 32) {
            der[p] = sig_s[i];
            p++;
            der[len2] = der[len2] + 1;
            i++
        }
        der[len] = der[len1] + der[len2] + 4;
        return der[len] + 2
    };
    var decode_points = function (data) {
        var x, y;
        if (data.length === 65) {
            if (data[0] === 4) {
                x = Secp256k1.uint256(data.subarray(1, 33), 16);
                y = Secp256k1.uint256(data.subarray(33, 65), 16)
            } else {
                throw new EvalError('key data head error: ' + data);
            }
        } else if (data.length === 33) {
            if (data[0] === 4) {
                x = Secp256k1.uint256(data.subarray(1, 33), 16);
                y = Secp256k1.decompressKey(x, 0)
            } else {
                throw new EvalError('key data head error: ' + data);
            }
        } else {
            throw new EvalError('key data length error: ' + data);
        }
        return {x: x, y: y}
    };
    var ecc_generate_private_key = function (bits) {
        var key = window.crypto.getRandomValues(new Uint8Array(bits / 8))
        var hex = Hex.encode(key);
        this.setValue('data', hex);
        this.setValue('curve', 'secp256k1');
        this.setValue('digest', 'SHA256');
        return key
    };
    mk.crypto.ECCPublicKey = function (key) {
        BasePublicKey.call(this, key)
    };
    var ECCPublicKey = mk.crypto.ECCPublicKey;
    Class(ECCPublicKey, BasePublicKey, null, {
        getData: function () {
            var pem = this.getValue('data');
            if (!pem || pem.length === 0) {
                throw new ReferenceError('ECC public key data not found');
            } else if (pem.length === 66) {
                return Hex.decode(pem)
            } else if (pem.length === 130) {
                return Hex.decode(pem)
            } else {
                var pos1 = pem.indexOf('-----BEGIN PUBLIC KEY-----');
                if (pos1 >= 0) {
                    pos1 += '-----BEGIN PUBLIC KEY-----'.length;
                    var pos2 = pem.indexOf('-----END PUBLIC KEY-----', pos1);
                    if (pos2 > 0) {
                        var base64 = pem.substr(pos1, pos2 - pos1);
                        var data = Base64.decode(base64);
                        return data.subarray(data.length - 65)
                    }
                }
            }
            throw new EvalError('key data error: ' + pem);
        }, getKeySize: function () {
            var size = this.getInt('keySize', null);
            if (size) {
                return size
            } else {
                return this.getData().length / 8
            }
        }, verify: function (data, signature) {
            var hash = SHA256.digest(data);
            var z = Secp256k1.uint256(hash, 16);
            var sig = ecc_der_to_sig(signature, signature.length);
            if (!sig) {
                throw new EvalError('signature error: ' + signature);
            }
            var sig_r = Secp256k1.uint256(sig.r, 16);
            var sig_s = Secp256k1.uint256(sig.s, 16);
            var pub = decode_points(this.getData());
            return Secp256k1.ecverify(pub.x, pub.y, sig_r, sig_s, z)
        }
    });
    mk.crypto.ECCPrivateKey = function (key) {
        BasePrivateKey.call(this, key);
        var keyPair = this.keyPair();
        this.__privateKey = keyPair.privateKey;
        this.__publicKey = keyPair.publicKey
    };
    var ECCPrivateKey = mk.crypto.ECCPrivateKey;
    Class(ECCPrivateKey, BasePrivateKey, null, {
        getData: function () {
            var data = this.getValue('data');
            if (data && data.length > 0) {
                return Hex.decode(data)
            } else {
                throw new ReferenceError('ECC private key data not found');
            }
        }, keyPair: function () {
            var sKey;
            var data = this.getData();
            if (!data || data.length === 0) {
                sKey = ecc_generate_private_key(256)
            } else if (data.length === 32) {
                sKey = Secp256k1.uint256(data, 16)
            } else {
                throw new EvalError('key data length error: ' + data);
            }
            var pKey = Secp256k1.generatePublicKeyFromPrivateKeyData(sKey);
            return {privateKey: sKey, publicKey: pKey}
        }, getKeySize: function () {
            var size = this.getInt('keySize', null);
            if (size) {
                return size
            } else {
                return this.getData().length / 8
            }
        }, getPublicKey: function () {
            var pub = this.__publicKey;
            var data = '04' + pub.x + pub.y;
            var info = {
                'algorithm': this.getValue('algorithm'),
                'data': data,
                'curve': 'secp256k1',
                'digest': 'SHA256'
            };
            return PublicKey.parse(info)
        }, sign: function (data) {
            var hash = SHA256.digest(data);
            var z = Secp256k1.uint256(hash, 16);
            var sig = Secp256k1.ecsign(this.__privateKey, z);
            var sig_r = Hex.decode(sig.r);
            var sig_s = Hex.decode(sig.s);
            var der = new Uint8Array(72);
            var sig_len = ecc_sig_to_der(sig_r, sig_s, der);
            if (sig_len === der.length) {
                return der
            } else {
                return der.subarray(0, sig_len)
            }
        }
    });
    mk.crypto.ECCPrivateKeyFactory = function () {
        BaseObject.call(this)
    };
    var ECCPrivateKeyFactory = mk.crypto.ECCPrivateKeyFactory;
    Class(ECCPrivateKeyFactory, BaseObject, [PrivateKeyFactory], null);
    ECCPrivateKeyFactory.prototype.generatePrivateKey = function () {
        return new ECCPrivateKey({'algorithm': AsymmetricAlgorithms.ECC})
    };
    ECCPrivateKeyFactory.prototype.parsePrivateKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new ECCPrivateKey(key)
    };
    mk.crypto.ECCPublicKeyFactory = function () {
        BaseObject.call(this)
    };
    var ECCPublicKeyFactory = mk.crypto.ECCPublicKeyFactory;
    Class(ECCPublicKeyFactory, BaseObject, [PublicKeyFactory], null);
    ECCPublicKeyFactory.prototype.parsePublicKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new ECCPublicKey(key)
    };
    var MIME_LINE_MAX_LEN = 76;
    var CR_LF = '\r\n';
    var rfc2045 = function (data) {
        var base64 = Base64.encode(data);
        var length = base64.length;
        if (length > MIME_LINE_MAX_LEN && base64.indexOf(CR_LF) < 0) {
            var sb = '';
            var start = 0, end;
            for (; start < length; start += MIME_LINE_MAX_LEN) {
                end = start + MIME_LINE_MAX_LEN;
                if (end < length) {
                    sb += base64.substring(start, end);
                    sb += CR_LF
                } else {
                    sb += base64.substring(start, length);
                    break
                }
            }
            base64 = sb
        }
        return base64
    };
    var encode_key = function (key, left, right) {
        var content = rfc2045(key);
        return left + CR_LF + content + CR_LF + right
    };
    var decode_key = function (pem, left, right) {
        var start = pem.indexOf(left);
        if (start < 0) {
            return null
        }
        start += left.length;
        var end = pem.indexOf(right, start);
        if (end < start) {
            return null
        }
        return Base64.decode(pem.substring(start, end))
    };
    var encode_public = function (key) {
        return encode_key(key, '-----BEGIN PUBLIC KEY-----', '-----END PUBLIC KEY-----')
    };
    var encode_rsa_private = function (key) {
        return encode_key(key, '-----BEGIN RSA PRIVATE KEY-----', '-----END RSA PRIVATE KEY-----')
    };
    var decode_public = function (pem) {
        var data = decode_key(pem, '-----BEGIN PUBLIC KEY-----', '-----END PUBLIC KEY-----');
        if (!data) {
            data = decode_key(pem, "-----BEGIN RSA PUBLIC KEY-----", "-----END RSA PUBLIC KEY-----")
        }
        if (data) {
            return data
        }
        if (pem.indexOf('PRIVATE KEY') > 0) {
            throw new TypeError('this is a private key content');
        } else {
            return Base64.decode(pem)
        }
    };
    var decode_rsa_private = function (pem) {
        var data = decode_key(pem, '-----BEGIN RSA PRIVATE KEY-----', '-----END RSA PRIVATE KEY-----');
        if (data) {
            return data
        }
        if (pem.indexOf('PUBLIC KEY') > 0) {
            throw new TypeError('this is not a RSA private key content');
        } else {
            return Base64.decode(pem)
        }
    };
    mk.format.PEM = {
        encodePublicKey: encode_public,
        encodePrivateKey: encode_rsa_private,
        decodePublicKey: decode_public,
        decodePrivateKey: decode_rsa_private
    };
    var PEM = mk.format.PEM;
    mk.crypto.PlainKey = function (key) {
        BaseSymmetricKey.call(this, key)
    };
    var PlainKey = mk.crypto.PlainKey;
    Class(PlainKey, BaseSymmetricKey, null, {
        getData: function () {
            return null
        }, encrypt: function (data, extra) {
            return data
        }, decrypt: function (data, params) {
            return data
        }
    });
    PlainKey.getInstance = function () {
        if (!plain_key) {
            var key = {'algorithm': SymmetricAlgorithms.PLAIN};
            plain_key = new PlainKey(key)
        }
        return plain_key
    };
    var plain_key = null;
    mk.crypto.PlainKeyFactory = function () {
        BaseObject.call(this)
    };
    var PlainKeyFactory = mk.crypto.PlainKeyFactory;
    Class(PlainKeyFactory, BaseObject, [SymmetricKey.Factory], null);
    PlainKeyFactory.prototype.generateSymmetricKey = function () {
        return PlainKey.getInstance()
    };
    PlainKeyFactory.prototype.parseSymmetricKey = function (key) {
        return PlainKey.getInstance()
    };
    var x509_header = new Uint8Array([48, -127, -97, 48, 13, 6, 9, 42, -122, 72, -122, -9, 13, 1, 1, 1, 5, 0, 3, -127, -115, 0]);
    var rsa_public_key = function (der) {
        var key = Base64.encode(der);
        var cipher = new JSEncrypt();
        cipher.setPublicKey(key);
        if (cipher.key.e === 0 || cipher.key.n === null) {
            var fixed = new Uint8Array(x509_header.length + der.length);
            fixed.set(x509_header);
            fixed.set(der, x509_header.length);
            key = Base64.encode(fixed);
            cipher.setPublicKey(key)
        }
        return cipher
    };
    var rsa_private_key = function (der) {
        var key = Base64.encode(der);
        var cipher = new JSEncrypt();
        cipher.setPrivateKey(key);
        return cipher
    };
    var rsa_generate_keys = function (bits) {
        var cipher = new JSEncrypt({default_key_size: bits});
        var key = cipher.getKey();
        return key.getPublicKey() + '\r\n' + key.getPrivateKey()
    }
    mk.crypto.RSAPublicKey = function (key) {
        BasePublicKey.call(this, key)
    };
    var RSAPublicKey = mk.crypto.RSAPublicKey;
    Class(RSAPublicKey, BasePublicKey, [EncryptKey], {
        getData: function () {
            var data = this.getValue('data');
            if (data) {
                return PEM.decodePublicKey(data)
            } else {
                throw new ReferenceError('RSA public key data not found');
            }
        }, getKeySize: function () {
            return this.getInt('keySize', 1024 / 8)
        }, verify: function (data, signature) {
            data = CryptoJS.enc.Hex.parse(Hex.encode(data));
            signature = Base64.encode(signature);
            var cipher = rsa_public_key(this.getData());
            return cipher.verify(data, signature, CryptoJS.SHA256)
        }, encrypt: function (plaintext, extra) {
            plaintext = UTF8.decode(plaintext);
            var cipher = rsa_public_key(this.getData());
            var base64 = cipher.encrypt(plaintext);
            if (base64) {
                var keySize = this.getKeySize();
                var res = Base64.decode(base64);
                if (res.length === keySize) {
                    return res
                }
                var pad = new Uint8Array(keySize);
                pad.set(res, keySize - res.length);
                return pad
            }
            throw new ReferenceError('RSA encrypt error: ' + plaintext);
        }
    });
    mk.crypto.RSAPrivateKey = function (key) {
        BasePrivateKey.call(this, key);
        var pem = this.getValue('data');
        if (!pem) {
            this.generateKeys()
        }
    };
    var RSAPrivateKey = mk.crypto.RSAPrivateKey;
    Class(RSAPrivateKey, BasePrivateKey, [DecryptKey], {
        getData: function () {
            var data = this.getValue('data');
            if (data) {
                return PEM.decodePrivateKey(data)
            } else {
                throw new ReferenceError('RSA private key data not found');
            }
        }, generateKeys: function () {
            var bits = this.getKeySize() * 8;
            var pem = rsa_generate_keys(bits);
            this.setValue('data', pem);
            this.setValue('mode', 'ECB');
            this.setValue('padding', 'PKCS1');
            this.setValue('digest', 'SHA256');
            return pem
        }, getKeySize: function () {
            return this.getInt('keySize', 1024 / 8)
        }, getPublicKey: function () {
            var cipher = rsa_private_key(this.getData());
            var pem = cipher.getPublicKey();
            var info = {
                'algorithm': this.getValue('algorithm'),
                'data': pem,
                'mode': 'ECB',
                'padding': 'PKCS1',
                'digest': 'SHA256'
            };
            return PublicKey.parse(info)
        }, sign: function (data) {
            data = CryptoJS.enc.Hex.parse(Hex.encode(data));
            var cipher = rsa_private_key(this.getData());
            var base64 = cipher.sign(data, CryptoJS.SHA256, 'sha256');
            if (base64) {
                return Base64.decode(base64)
            } else {
                throw new ReferenceError('RSA sign error: ' + data);
            }
        }, decrypt: function (data, params) {
            data = Base64.encode(data);
            var cipher = rsa_private_key(this.getData());
            var string = cipher.decrypt(data);
            if (string) {
                return UTF8.encode(string)
            } else {
                throw new ReferenceError('RSA decrypt error: ' + data);
            }
        }
    });
    mk.crypto.RSAPrivateKeyFactory = function () {
        BaseObject.call(this)
    };
    var RSAPrivateKeyFactory = mk.crypto.RSAPrivateKeyFactory;
    Class(RSAPrivateKeyFactory, BaseObject, [PrivateKeyFactory], null);
    RSAPrivateKeyFactory.prototype.generatePrivateKey = function () {
        return new RSAPrivateKey({'algorithm': AsymmetricAlgorithms.RSA})
    };
    RSAPrivateKeyFactory.prototype.parsePrivateKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new RSAPrivateKey(key)
    };
    mk.crypto.RSAPublicKeyFactory = function () {
        BaseObject.call(this)
    };
    var RSAPublicKeyFactory = mk.crypto.RSAPublicKeyFactory;
    Class(RSAPublicKeyFactory, BaseObject, [PublicKeyFactory], null);
    RSAPublicKeyFactory.prototype.parsePublicKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new RSAPublicKey(key)
    };
    mkm.mkm.BaseAddressFactory = function () {
        BaseObject.call(this);
        this._addresses = {}
    };
    var BaseAddressFactory = mkm.mkm.BaseAddressFactory;
    Class(BaseAddressFactory, BaseObject, [AddressFactory], null);
    BaseAddressFactory.prototype.generateAddress = function (meta, network) {
        var address = meta.generateAddress(network);
        if (address) {
            this._addresses[address.toString()] = address
        }
        return address
    };
    BaseAddressFactory.prototype.parseAddress = function (string) {
        var address = this._addresses[string];
        if (!address) {
            address = this.parse(string);
            if (address) {
                this._addresses[string] = address
            }
        }
        return address
    };
    BaseAddressFactory.prototype.parse = function (string) {
        if (!string) {
            return null
        }
        var len = string.length;
        if (len === 8) {
            if (string.toLowerCase() === 'anywhere') {
                return Address.ANYWHERE
            }
        } else if (len === 10) {
            if (string.toLowerCase() === 'everywhere') {
                return Address.EVERYWHERE
            }
        }
        var res;
        if (26 <= len && len <= 35) {
            res = BTCAddress.parse(string)
        } else if (len === 42) {
            res = ETHAddress.parse(string)
        } else {
            res = null
        }
        return res
    };
    mkm.mkm.BTCAddress = function (string, network) {
        ConstantString.call(this, string);
        this.__type = network
    };
    var BTCAddress = mkm.mkm.BTCAddress;
    Class(BTCAddress, ConstantString, [Address], {
        getType: function () {
            return this.__type
        }
    });
    BTCAddress.generate = function (fingerprint, network) {
        var digest = RIPEMD160.digest(SHA256.digest(fingerprint));
        var head = [];
        head.push(network);
        for (var i = 0; i < digest.length; ++i) {
            head.push(digest[i])
        }
        var cc = check_code(Uint8Array.from(head));
        var data = [];
        for (var j = 0; j < head.length; ++j) {
            data.push(head[j])
        }
        for (var k = 0; k < cc.length; ++k) {
            data.push(cc[k])
        }
        return new BTCAddress(Base58.encode(Uint8Array.from(data)), network)
    };
    BTCAddress.parse = function (string) {
        var len = string.length;
        if (len < 26 || len > 35) {
            return null
        }
        var data = Base58.decode(string);
        if (!data || data.length !== 25) {
            return null
        }
        var prefix = data.subarray(0, 21);
        var suffix = data.subarray(21, 25);
        var cc = check_code(prefix);
        if (Arrays.equals(cc, suffix)) {
            return new BTCAddress(string, data[0])
        } else {
            return null
        }
    };
    var check_code = function (data) {
        var sha256d = SHA256.digest(SHA256.digest(data));
        return sha256d.subarray(0, 4)
    };
    mkm.mkm.GeneralDocumentFactory = function (type) {
        BaseObject.call(this);
        this.__type = type
    };
    var GeneralDocumentFactory = mkm.mkm.GeneralDocumentFactory;
    Class(GeneralDocumentFactory, BaseObject, [DocumentFactory], null);
    GeneralDocumentFactory.prototype.getType = function (docType, identifier) {
        if (!identifier) {
            return this.__type
        } else if (docType !== null && docType !== '' && docType !== '*') {
            return docType
        } else if (identifier.isGroup()) {
            return DocumentType.BULLETIN
        } else if (identifier.isUser()) {
            return DocumentType.VISA
        } else {
            return DocumentType.PROFILE
        }
    };
    GeneralDocumentFactory.prototype.createDocument = function (identifier, data, signature) {
        var type = this.getType(this.__type, identifier);
        if (data && signature) {
            if (type === DocumentType.VISA) {
                return new BaseVisa(identifier, data, signature)
            } else if (type === DocumentType.BULLETIN) {
                return new BaseBulletin(identifier, data, signature)
            } else {
                return new BaseDocument(type, identifier, data, signature)
            }
        } else {
            if (type === DocumentType.VISA) {
                return new BaseVisa(identifier)
            } else if (type === DocumentType.BULLETIN) {
                return new BaseBulletin(identifier)
            } else {
                return new BaseDocument(type, identifier)
            }
        }
    };
    GeneralDocumentFactory.prototype.parseDocument = function (doc) {
        var identifier = ID.parse(doc['did']);
        if (!identifier) {
            return null
        } else if (doc['data'] && doc['signature']) {
        } else {
            return null
        }
        var helper = SharedAccountExtensions.getHelper();
        var type = helper.getDocumentType(doc, null);
        if (!type) {
            type = this.getType('*', identifier)
        }
        if (type === DocumentType.VISA) {
            return new BaseVisa(doc)
        } else if (type === DocumentType.BULLETIN) {
            return new BaseBulletin(doc)
        } else {
            return new BaseDocument(doc)
        }
    };
    mkm.mkm.ETHAddress = function (string) {
        ConstantString.call(this, string)
    };
    var ETHAddress = mkm.mkm.ETHAddress;
    Class(ETHAddress, ConstantString, [Address], {
        getType: function () {
            return EntityType.USER.getValue()
        }
    });
    ETHAddress.getValidateAddress = function (address) {
        if (!is_eth(address)) {
            return null
        }
        var lower = address.substr(2).toLowerCase();
        return '0x' + eip55(lower)
    };
    ETHAddress.isValidate = function (address) {
        return address === this.getValidateAddress(address)
    };
    ETHAddress.generate = function (fingerprint) {
        if (fingerprint.length === 65) {
            fingerprint = fingerprint.subarray(1)
        } else if (fingerprint.length !== 64) {
            throw new TypeError('ECC key data error: ' + fingerprint);
        }
        var digest = Keccak256.digest(fingerprint);
        var tail = digest.subarray(digest.length - 20);
        var address = Hex.encode(tail);
        return new ETHAddress('0x' + eip55(address))
    };
    ETHAddress.parse = function (address) {
        if (!is_eth(address)) {
            return null
        }
        return new ETHAddress(address)
    };
    var eip55 = function (hex) {
        var sb = new Uint8Array(40);
        var hash = Keccak256.digest(UTF8.encode(hex));
        var ch;
        var _9 = '9'.charCodeAt(0);
        for (var i = 0; i < 40; ++i) {
            ch = hex.charCodeAt(i);
            if (ch > _9) {
                ch -= (hash[i >> 1] << (i << 2 & 4) & 0x80) >> 2
            }
            sb[i] = ch
        }
        return UTF8.decode(sb)
    };
    var is_eth = function (address) {
        if (address.length !== 42) {
            return false
        } else if (address.charAt(0) !== '0' || address.charAt(1) !== 'x') {
            return false
        }
        var ch;
        for (var i = 2; i < 42; ++i) {
            ch = address.charCodeAt(i);
            if (ch >= _0 && ch <= _9) {
                continue
            }
            if (ch >= _A && ch <= _Z) {
                continue
            }
            if (ch >= _a && ch <= _z) {
                continue
            }
            return false
        }
        return true
    };
    var _0 = '0'.charCodeAt(0);
    var _9 = '9'.charCodeAt(0);
    var _A = 'A'.charCodeAt(0);
    var _Z = 'Z'.charCodeAt(0);
    var _a = 'a'.charCodeAt(0);
    var _z = 'z'.charCodeAt(0);
    mkm.mkm.IdentifierFactory = function () {
        BaseObject.call(this);
        this._identifiers = {}
    };
    var IdentifierFactory = mkm.mkm.IdentifierFactory;
    Class(IdentifierFactory, BaseObject, [IDFactory], null);
    IdentifierFactory.prototype.generateIdentifier = function (meta, network, terminal) {
        var address = Address.generate(meta, network);
        return ID.create(meta.getSeed(), address, terminal)
    };
    IdentifierFactory.prototype.createIdentifier = function (name, address, terminal) {
        var string = Identifier.concat(name, address, terminal);
        var did = this._identifiers[string];
        if (!did) {
            did = this.newID(string, name, address, terminal);
            this._identifiers[string] = did
        }
        return did
    }
    IdentifierFactory.prototype.parseIdentifier = function (identifier) {
        var did = this._identifiers[identifier];
        if (!did) {
            did = this.parse(identifier);
            if (did) {
                this._identifiers[identifier] = did
            }
        }
        return did
    };
    IdentifierFactory.prototype.newID = function (string, name, address, terminal) {
        return new Identifier(string, name, address, terminal)
    };
    IdentifierFactory.prototype.parse = function (string) {
        var name, address, terminal;
        var pair = string.split('/');
        if (pair.length === 1) {
            terminal = null
        } else {
            terminal = pair[1]
        }
        pair = pair[0].split('@');
        if (pair.length === 1) {
            name = null;
            address = Address.parse(pair[0])
        } else {
            name = pair[0];
            address = Address.parse(pair[1])
        }
        if (!address) {
            return null
        }
        return this.newID(string, name, address, terminal)
    };
    mkm.mkm.DefaultMeta = function () {
        if (arguments.length === 1) {
            BaseMeta.call(this, arguments[0])
        } else if (arguments.length === 4) {
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3])
        } else {
            throw new SyntaxError('Default meta arguments error: ' + arguments);
        }
        this.__addresses = {}
    };
    var DefaultMeta = mkm.mkm.DefaultMeta;
    Class(DefaultMeta, BaseMeta, null, {
        hasSeed: function () {
            return true
        }, generateAddress: function (network) {
            var cached = this.__addresses[network];
            if (!cached) {
                var data = this.getFingerprint();
                cached = BTCAddress.generate(data, network);
                this.__addresses[network] = cached
            }
            return cached
        }
    });
    mkm.mkm.BTCMeta = function () {
        if (arguments.length === 1) {
            BaseMeta.call(this, arguments[0])
        } else if (arguments.length === 2) {
            BaseMeta.call(this, arguments[0], arguments[1])
        } else if (arguments.length === 4) {
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3])
        } else {
            throw new SyntaxError('BTC meta arguments error: ' + arguments);
        }
        this.__addresses = {}
    };
    var BTCMeta = mkm.mkm.BTCMeta;
    Class(BTCMeta, BaseMeta, null, {
        hasSeed: function () {
            return false
        }, generateAddress: function (network) {
            var cached = this.__addresses[network];
            if (!cached) {
                var key = this.getPublicKey();
                var data = key.getData();
                cached = BTCAddress.generate(data, network);
                this.__addresses[network] = cached
            }
            return cached
        }
    });
    mkm.mkm.ETHMeta = function () {
        if (arguments.length === 1) {
            BaseMeta.call(this, arguments[0])
        } else if (arguments.length === 2) {
            BaseMeta.call(this, arguments[0], arguments[1])
        } else if (arguments.length === 4) {
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3])
        } else {
            throw new SyntaxError('ETH meta arguments error: ' + arguments);
        }
        this.__address = null
    };
    var ETHMeta = mkm.mkm.ETHMeta;
    Class(ETHMeta, BaseMeta, null, {
        hasSeed: function () {
            return false
        }, generateAddress: function (network) {
            var cached = this.__address;
            if (!cached) {
                var key = this.getPublicKey();
                var data = key.getData();
                cached = ETHAddress.generate(data);
                this.__address = cached
            }
            return cached
        }
    });
    mkm.mkm.BaseMetaFactory = function (algorithm) {
        BaseObject.call(this);
        this.__type = algorithm
    };
    var BaseMetaFactory = mkm.mkm.BaseMetaFactory;
    Class(BaseMetaFactory, BaseObject, [MetaFactory], null);
    BaseMetaFactory.prototype.getType = function () {
        return this.__type
    };
    BaseMetaFactory.prototype.generateMeta = function (sKey, seed) {
        var fingerprint = null;
        if (seed && seed.length > 0) {
            var data = UTF8.encode(seed);
            var sig = sKey.sign(data);
            fingerprint = TransportableData.create(sig)
        }
        var pKey = sKey.getPublicKey();
        return this.createMeta(pKey, seed, fingerprint)
    };
    BaseMetaFactory.prototype.createMeta = function (pKey, seed, fingerprint) {
        var out;
        var type = this.getType();
        if (type === MetaType.MKM || 'mkm' === type) {
            out = new DefaultMeta(type, pKey, seed, fingerprint)
        } else if (type === MetaType.BTC || 'btc' === type) {
            out = new BTCMeta(type, pKey)
        } else if (type === MetaType.ETH || 'eth' === type) {
            out = new ETHMeta(type, pKey)
        } else {
            throw new TypeError('unknown meta type: ' + type);
        }
        return out
    };
    BaseMetaFactory.prototype.parseMeta = function (meta) {
        var out;
        var helper = SharedAccountExtensions.getHelper();
        var type = helper.getMetaType(meta, '');
        if (type === MetaType.MKM || 'mkm' === type) {
            out = new DefaultMeta(meta)
        } else if (type === MetaType.BTC || 'btc' === type) {
            out = new BTCMeta(meta)
        } else if (type === MetaType.ETH || 'eth' === type) {
            out = new ETHMeta(meta)
        } else {
            throw new TypeError('unknown meta type: ' + type);
        }
        return out.isValid() ? out : null
    };
    dkd.dkd.GeneralCommandFactory = function () {
        BaseObject.call(this)
    };
    var GeneralCommandFactory = dkd.dkd.GeneralCommandFactory;
    Class(GeneralCommandFactory, BaseObject, [ContentFactory, CommandFactory], null);
    GeneralCommandFactory.prototype.parseContent = function (content) {
        var helper = SharedCommandExtensions.getHelper();
        var cmdHelper = SharedCommandExtensions.getCommandHelper();
        var cmd = helper.getCmd(content, null);
        var factory = !cmd ? null : cmdHelper.getCommandFactory(cmd);
        if (!factory) {
            if (content['group']) {
                factory = cmdHelper.getCommandFactory('group')
            }
            if (!factory) {
                factory = this
            }
        }
        return factory.parseCommand(content)
    };
    GeneralCommandFactory.prototype.parseCommand = function (content) {
        if (!content['sn'] || !content['command']) {
            return null
        }
        return new BaseCommand(content)
    };
    dkd.dkd.HistoryCommandFactory = function () {
        GeneralCommandFactory.call(this)
    };
    var HistoryCommandFactory = dkd.dkd.HistoryCommandFactory;
    Class(HistoryCommandFactory, GeneralCommandFactory, null, null);
    HistoryCommandFactory.prototype.parseCommand = function (content) {
        if (!content['sn'] || !content['command'] || !content['time']) {
            return null
        }
        return new BaseHistoryCommand(content)
    };
    dkd.dkd.GroupCommandFactory = function () {
        HistoryCommandFactory.call(this)
    };
    var GroupCommandFactory = dkd.dkd.GroupCommandFactory;
    Class(GroupCommandFactory, HistoryCommandFactory, null, null);
    GroupCommandFactory.prototype.parseContent = function (content) {
        var helper = SharedCommandExtensions.getHelper();
        var cmdHelper = SharedCommandExtensions.getCommandHelper();
        var cmd = helper.getCmd(content, null);
        var factory = !cmd ? null : cmdHelper.getCommandFactory(cmd);
        if (!factory) {
            factory = this
        }
        return factory.parseCommand(content)
    };
    GroupCommandFactory.prototype.parseCommand = function (content) {
        if (!content['sn'] || !content['command'] || !content['group']) {
            return null
        }
        return new BaseGroupCommand(content)
    };
    var random_int = function (max) {
        return Math.floor(Math.random() * max)
    };
    dkd.msg.MessageFactory = function () {
        BaseObject.call(this);
        this.__sn = random_int(0x7fffffff)
    };
    var MessageFactory = dkd.msg.MessageFactory;
    Class(MessageFactory, BaseObject, [EnvelopeFactory, InstantMessageFactory, SecureMessageFactory, ReliableMessageFactory], null);
    MessageFactory.prototype.next = function () {
        var sn = this.__sn;
        if (sn < 0x7fffffff) {
            sn += 1
        } else {
            sn = 1
        }
        this.__sn = sn;
        return sn
    };
    MessageFactory.prototype.createEnvelope = function (from, to, when) {
        return new MessageEnvelope(from, to, when)
    };
    MessageFactory.prototype.parseEnvelope = function (env) {
        if (!env['sender']) {
            return null
        }
        return new MessageEnvelope(env)
    };
    MessageFactory.prototype.generateSerialNumber = function (msgType, now) {
        return this.next()
    };
    MessageFactory.prototype.createInstantMessage = function (head, body) {
        return new PlainMessage(head, body)
    };
    MessageFactory.prototype.parseInstantMessage = function (msg) {
        if (!msg["sender"] || !msg["content"]) {
            return null
        }
        return new PlainMessage(msg)
    };
    MessageFactory.prototype.parseSecureMessage = function (msg) {
        if (!msg["sender"] || !msg["data"]) {
            return null
        }
        if (msg['signature']) {
            return new NetworkMessage(msg)
        }
        return new EncryptedMessage(msg)
    };
    MessageFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg['sender'] || !msg['data'] || !msg['signature']) {
            return null
        }
        return new NetworkMessage(msg)
    };
    mk.ext.CryptoKeyGeneralFactory = function () {
        BaseObject.call(this);
        this.__symmetricKeyFactories = {};
        this.__privateKeyFactories = {};
        this.__publicKeyFactories = {}
    };
    var CryptoKeyGeneralFactory = mk.ext.CryptoKeyGeneralFactory;
    Class(CryptoKeyGeneralFactory, BaseObject, [GeneralCryptoHelper, SymmetricKeyHelper, PrivateKeyHelper, PublicKeyHelper], null);
    CryptoKeyGeneralFactory.prototype.getKeyAlgorithm = function (key, defaultValue) {
        var algorithm = key['algorithm'];
        return Converter.getString(algorithm, defaultValue)
    };
    CryptoKeyGeneralFactory.prototype.setSymmetricKeyFactory = function (algorithm, factory) {
        this.__symmetricKeyFactories[algorithm] = factory
    };
    CryptoKeyGeneralFactory.prototype.getSymmetricKeyFactory = function (algorithm) {
        return this.__symmetricKeyFactories[algorithm]
    };
    CryptoKeyGeneralFactory.prototype.generateSymmetricKey = function (algorithm) {
        var factory = this.getSymmetricKeyFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('key algorithm not supported: ' + algorithm);
        }
        return factory.generateSymmetricKey(algorithm)
    };
    CryptoKeyGeneralFactory.prototype.parseSymmetricKey = function (key) {
        if (!key) {
            return null
        } else if (Interface.conforms(key, SymmetricKey)) {
            return key
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getSymmetricKeyFactory(algorithm);
        if (!factory) {
            factory = this.getSymmetricKeyFactory('*');
            if (!factory) {
                throw new ReferenceError('default symmetric key factory not found');
            }
        }
        return factory.parseSymmetricKey(info)
    };
    CryptoKeyGeneralFactory.prototype.setPrivateKeyFactory = function (algorithm, factory) {
        this.__privateKeyFactories[algorithm] = factory
    };
    CryptoKeyGeneralFactory.prototype.getPrivateKeyFactory = function (algorithm) {
        return this.__privateKeyFactories[algorithm]
    };
    CryptoKeyGeneralFactory.prototype.generatePrivateKey = function (algorithm) {
        var factory = this.getPrivateKeyFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('key algorithm not supported: ' + algorithm);
        }
        return factory.generatePrivateKey(algorithm)
    };
    CryptoKeyGeneralFactory.prototype.parsePrivateKey = function (key) {
        if (!key) {
            return null
        } else if (Interface.conforms(key, PrivateKey)) {
            return key
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getPrivateKeyFactory(algorithm);
        if (!factory) {
            factory = this.getPrivateKeyFactory('*');
            if (!factory) {
                throw new ReferenceError('default private key factory not found');
            }
        }
        return factory.parsePrivateKey(info)
    };
    CryptoKeyGeneralFactory.prototype.setPublicKeyFactory = function (algorithm, factory) {
        this.__publicKeyFactories[algorithm] = factory
    };
    CryptoKeyGeneralFactory.prototype.getPublicKeyFactory = function (algorithm) {
        return this.__publicKeyFactories[algorithm]
    };
    CryptoKeyGeneralFactory.prototype.parsePublicKey = function (key) {
        if (!key) {
            return null
        } else if (Interface.conforms(key, PublicKey)) {
            return key
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getPublicKeyFactory(algorithm);
        if (!factory) {
            factory = this.getPublicKeyFactory('*');
            if (!factory) {
                throw new ReferenceError('default public key factory not found');
            }
        }
        return factory.parsePublicKey(info)
    };
    mk.ext.FormatGeneralFactory = function () {
        BaseObject.call(this);
        this.__tedFactories = {};
        this.__pnfFactory = null
    };
    var FormatGeneralFactory = mk.ext.FormatGeneralFactory;
    Class(FormatGeneralFactory, BaseObject, [GeneralFormatHelper, PortableNetworkFileHelper, TransportableDataHelper], null);
    FormatGeneralFactory.prototype.split = function (text) {
        var pos1 = text.indexOf('://');
        if (pos1 > 0) {
            return [text]
        } else {
            pos1 = text.indexOf(':') + 1
        }
        var array = [];
        var pos2 = text.indexOf(';', pos1);
        if (pos2 > pos1) {
            array.push(text.substring(pos1, pos2));
            pos1 = pos2 + 1
        }
        pos2 = text.indexOf(',', pos1);
        if (pos2 > pos1) {
            array.unshift(text.substring(pos1, pos2));
            pos1 = pos2 + 1
        }
        if (pos1 === 0) {
            array.unshift(text)
        } else {
            array.unshift(text.substring(pos1))
        }
        return array
    };
    FormatGeneralFactory.prototype.decode = function (data, defaultKey) {
        var text;
        if (Interface.conforms(data, Mapper)) {
            return data.toMap()
        } else if (Interface.conforms(data, Stringer)) {
            text = data.toString()
        } else if (IObject.isString(data)) {
            text = data
        } else {
            return data
        }
        if (text.length === 0) {
            return null
        } else if (text.charAt(0) === '{' && text.charAt(text.length - 1) === '}') {
            return JSONMap.decode(text)
        }
        var info = {};
        var array = this.split(text);
        var size = array.length;
        if (size === 1) {
            info[defaultKey] = array[0]
        } else {
            info['data'] = array[0];
            info['algorithm'] = array[1];
            if (size > 2) {
                info['content-type'] = array[2];
                if (text.length > 5 && text.substring(0, 5) === 'data:') {
                    info['URL'] = text
                }
            }
        }
        return info
    };
    FormatGeneralFactory.prototype.getFormatAlgorithm = function (ted, defaultValue) {
        var algorithm = ted['algorithm'];
        return Converter.getString(algorithm, defaultValue)
    };
    FormatGeneralFactory.prototype.setTransportableDataFactory = function (algorithm, factory) {
        this.__tedFactories[algorithm] = factory
    };
    FormatGeneralFactory.prototype.getTransportableDataFactory = function (algorithm) {
        return this.__tedFactories[algorithm]
    };
    FormatGeneralFactory.prototype.createTransportableData = function (data, algorithm) {
        if (!algorithm || algorithm === '' || algorithm === '*') {
            algorithm = EncodeAlgorithms.DEFAULT
        }
        var factory = this.getTransportableDataFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('TED algorithm not support: ' + algorithm);
        }
        return factory.createTransportableData(data)
    };
    FormatGeneralFactory.prototype.parseTransportableData = function (ted) {
        if (!ted) {
            return null
        } else if (Interface.conforms(ted, TransportableData)) {
            return ted
        }
        var info = this.decode(ted, 'data');
        if (!info) {
            return null
        }
        var algo = this.getFormatAlgorithm(info);
        var factory = !algo ? null : this.getTransportableDataFactory(algo);
        if (!factory) {
            factory = this.getTransportableDataFactory('*');
            if (!factory) {
                throw new ReferenceError('default TED factory not found');
            }
        }
        return factory.parseTransportableData(info)
    };
    FormatGeneralFactory.prototype.setPortableNetworkFileFactory = function (factory) {
        this.__pnfFactory = factory
    };
    FormatGeneralFactory.prototype.getPortableNetworkFileFactory = function () {
        return this.__pnfFactory
    };
    FormatGeneralFactory.prototype.createPortableNetworkFile = function (data, filename, url, password) {
        var factory = this.getPortableNetworkFileFactory();
        if (!factory) {
            throw new ReferenceError('PNF factory not ready');
        }
        return factory.createPortableNetworkFile(data, filename, url, password)
    };
    FormatGeneralFactory.prototype.parsePortableNetworkFile = function (pnf) {
        if (!pnf) {
            return null
        } else if (Interface.conforms(pnf, PortableNetworkFile)) {
            return pnf
        }
        var info = this.decode(pnf, 'URL');
        if (!info) {
            return null
        }
        var factory = this.getPortableNetworkFileFactory();
        if (!factory) {
            throw new ReferenceError('PNF factory not ready');
        }
        return factory.parsePortableNetworkFile(info)
    };
    mkm.ext.AccountGeneralFactory = function () {
        BaseObject.call(this);
        this.__addressFactory = null;
        this.__idFactory = null;
        this.__metaFactories = {};
        this.__docsFactories = {}
    };
    var AccountGeneralFactory = mkm.ext.AccountGeneralFactory;
    Class(AccountGeneralFactory, BaseObject, [GeneralAccountHelper, AddressHelper, IdentifierHelper, MetaHelper, DocumentHelper], null);
    AccountGeneralFactory.prototype.getMetaType = function (meta, defaultValue) {
        var type = meta['type'];
        return Converter.getString(type, defaultValue)
    };
    AccountGeneralFactory.prototype.getDocumentType = function (doc, defaultValue) {
        var type = doc['type'];
        if (type) {
            return Converter.getString(type, defaultValue)
        } else if (defaultValue) {
            return defaultValue
        }
        var did = ID.parse(doc['did']);
        if (!did) {
            return null
        } else if (did.isUser()) {
            return DocumentType.VISA
        } else if (did.isUser()) {
            return DocumentType.BULLETIN
        } else {
            return DocumentType.PROFILE
        }
    };
    AccountGeneralFactory.prototype.setAddressFactory = function (factory) {
        this.__addressFactory = factory
    };
    AccountGeneralFactory.prototype.getAddressFactory = function () {
        return this.__addressFactory
    };
    AccountGeneralFactory.prototype.parseAddress = function (address) {
        if (!address) {
            return null
        } else if (Interface.conforms(address, Address)) {
            return address
        }
        var str = Wrapper.fetchString(address);
        if (!str) {
            return null
        }
        var factory = this.getAddressFactory();
        if (!factory) {
            throw new ReferenceError('address factory not ready');
        }
        return factory.parseAddress(address)
    };
    AccountGeneralFactory.prototype.generateAddress = function (meta, network) {
        var factory = this.getAddressFactory();
        if (!factory) {
            throw new ReferenceError('address factory not ready');
        }
        return factory.generateAddress(meta, network)
    };
    AccountGeneralFactory.prototype.setIdentifierFactory = function (factory) {
        this.__idFactory = factory
    };
    AccountGeneralFactory.prototype.getIdentifierFactory = function () {
        return this.__idFactory
    };
    AccountGeneralFactory.prototype.parseIdentifier = function (identifier) {
        if (!identifier) {
            return null
        } else if (Interface.conforms(identifier, ID)) {
            return identifier
        }
        var str = Wrapper.fetchString(identifier);
        if (!str) {
            return null
        }
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.parseIdentifier(identifier)
    };
    AccountGeneralFactory.prototype.createIdentifier = function (name, address, terminal) {
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.createIdentifier(name, address, terminal)
    };
    AccountGeneralFactory.prototype.generateIdentifier = function (meta, network, terminal) {
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.createIdentifier(meta, network, terminal)
    };
    AccountGeneralFactory.prototype.setMetaFactory = function (type, factory) {
        this.__metaFactories[type] = factory
    };
    AccountGeneralFactory.prototype.getMetaFactory = function (type) {
        return this.__metaFactories[type]
    };
    AccountGeneralFactory.prototype.createMeta = function (type, pKey, seed, fingerprint) {
        var factory = this.getMetaFactory(type);
        if (!factory) {
            throw new ReferenceError('meta type not supported: ' + type);
        }
        return factory.createMeta(pKey, seed, fingerprint)
    };
    AccountGeneralFactory.prototype.generateMeta = function (type, sKey, seed) {
        var factory = this.getMetaFactory(type);
        if (!factory) {
            throw new ReferenceError('meta type not supported: ' + type);
        }
        return factory.generateMeta(sKey, seed)
    };
    AccountGeneralFactory.prototype.parseMeta = function (meta) {
        if (!meta) {
            return null
        } else if (Interface.conforms(meta, Meta)) {
            return meta
        }
        var info = Wrapper.fetchMap(meta);
        if (!info) {
            return null
        }
        var type = this.getMetaType(info, null);
        var factory = !type ? null : this.getMetaFactory(type);
        if (!factory) {
            factory = this.getMetaFactory('*');
            if (!factory) {
                throw new ReferenceError('default meta factory not found');
            }
        }
        return factory.parseMeta(info)
    };
    AccountGeneralFactory.prototype.setDocumentFactory = function (type, factory) {
        this.__docsFactories[type] = factory
    };
    AccountGeneralFactory.prototype.getDocumentFactory = function (type) {
        return this.__docsFactories[type]
    };
    AccountGeneralFactory.prototype.createDocument = function (type, identifier, data, signature) {
        var factory = this.getDocumentFactory(type);
        if (!factory) {
            throw new ReferenceError('document type not supported: ' + type);
        }
        return factory.createDocument(identifier, data, signature)
    };
    AccountGeneralFactory.prototype.parseDocument = function (doc) {
        if (!doc) {
            return null
        } else if (Interface.conforms(doc, Document)) {
            return doc
        }
        var info = Wrapper.fetchMap(doc);
        if (!info) {
            return null
        }
        var type = this.getDocumentType(info, null);
        var factory = !type ? null : this.getDocumentFactory(type);
        if (!factory) {
            factory = this.getDocumentFactory('*');
            if (!factory) {
                throw new ReferenceError('default document factory not found');
            }
        }
        return factory.parseDocument(info)
    };
    dkd.ext.MessageGeneralFactory = function () {
        BaseObject.call(this);
        this.__contentFactories = {};
        this.__envelopeFactory = null;
        this.__instantMessageFactory = null;
        this.__secureMessageFactory = null;
        this.__reliableMessageFactory = null
    };
    var MessageGeneralFactory = dkd.ext.MessageGeneralFactory
    Class(MessageGeneralFactory, BaseObject, [GeneralMessageHelper, ContentHelper, EnvelopeHelper, InstantMessageHelper, SecureMessageHelper, ReliableMessageHelper], null);
    MessageGeneralFactory.prototype.getContentType = function (content, defaultValue) {
        var type = content['type'];
        return Converter.getString(type, defaultValue)
    };
    MessageGeneralFactory.prototype.setContentFactory = function (type, factory) {
        this.__contentFactories[type] = factory
    };
    MessageGeneralFactory.prototype.getContentFactory = function (type) {
        return this.__contentFactories[type]
    };
    MessageGeneralFactory.prototype.parseContent = function (content) {
        if (!content) {
            return null
        } else if (Interface.conforms(content, Content)) {
            return content
        }
        var info = Wrapper.fetchMap(content);
        if (!info) {
            return null
        }
        var type = this.getContentType(info, null);
        var factory = !type ? null : this.getContentFactory(type);
        if (!factory) {
            factory = this.getContentFactory('*');
            if (!factory) {
                throw new ReferenceError('default content factory not found');
            }
        }
        return factory.parseContent(info)
    };
    MessageGeneralFactory.prototype.setEnvelopeFactory = function (factory) {
        this.__envelopeFactory = factory
    };
    MessageGeneralFactory.prototype.getEnvelopeFactory = function () {
        return this.__envelopeFactory
    };
    MessageGeneralFactory.prototype.createEnvelope = function (sender, receiver, time) {
        var factory = this.getEnvelopeFactory();
        if (!factory) {
            throw new ReferenceError('envelope factory not ready');
        }
        return factory.createEnvelope(sender, receiver, time)
    };
    MessageGeneralFactory.prototype.parseEnvelope = function (env) {
        if (!env) {
            return null
        } else if (Interface.conforms(env, Envelope)) {
            return env
        }
        var info = Wrapper.fetchMap(env);
        if (!info) {
            return null
        }
        var factory = this.getEnvelopeFactory();
        if (!factory) {
            throw new ReferenceError('envelope factory not ready');
        }
        return factory.parseEnvelope(info)
    };
    MessageGeneralFactory.prototype.setInstantMessageFactory = function (factory) {
        this.__instantMessageFactory = factory
    };
    MessageGeneralFactory.prototype.getInstantMessageFactory = function () {
        return this.__instantMessageFactory
    };
    MessageGeneralFactory.prototype.createInstantMessage = function (head, body) {
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.createInstantMessage(head, body)
    };
    MessageGeneralFactory.prototype.parseInstantMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, InstantMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.parseInstantMessage(info)
    };
    MessageGeneralFactory.prototype.generateSerialNumber = function (type, when) {
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.generateSerialNumber(type, when)
    };
    MessageGeneralFactory.prototype.setSecureMessageFactory = function (factory) {
        this.__secureMessageFactory = factory
    };
    MessageGeneralFactory.prototype.getSecureMessageFactory = function () {
        return this.__secureMessageFactory
    };
    MessageGeneralFactory.prototype.parseSecureMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, SecureMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getSecureMessageFactory();
        if (!factory) {
            throw new ReferenceError('secure message factory not ready');
        }
        return factory.parseSecureMessage(info)
    };
    MessageGeneralFactory.prototype.setReliableMessageFactory = function (factory) {
        this.__reliableMessageFactory = factory
    };
    MessageGeneralFactory.prototype.getReliableMessageFactory = function () {
        return this.__reliableMessageFactory
    };
    MessageGeneralFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, ReliableMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getReliableMessageFactory();
        if (!factory) {
            throw new ReferenceError('reliable message factory not ready');
        }
        return factory.parseReliableMessage(info)
    };
    dkd.ext.CommandGeneralFactory = function () {
        BaseObject.call(this);
        this.__commandFactories = {}
    };
    var CommandGeneralFactory = dkd.ext.CommandGeneralFactory
    Class(CommandGeneralFactory, BaseObject, [GeneralCommandHelper, CommandHelper], null);
    CommandGeneralFactory.prototype.getCmd = function (content, defaultValue) {
        var cmd = content['command'];
        return Converter.getString(cmd, defaultValue)
    };
    CommandGeneralFactory.prototype.setCommandFactory = function (cmd, factory) {
        this.__commandFactories[cmd] = factory
    };
    CommandGeneralFactory.prototype.getCommandFactory = function (cmd) {
        return this.__commandFactories[cmd]
    };
    CommandGeneralFactory.prototype.parseCommand = function (content) {
        if (!content) {
            return null
        } else if (Interface.conforms(content, Command)) {
            return content
        }
        var info = Wrapper.fetchMap(content);
        if (!info) {
            return null
        }
        var cmd = this.getCmd(info, null);
        var factory = !cmd ? null : this.getCommandFactory(cmd);
        if (!factory) {
            factory = default_command_factory(info);
            if (!factory) {
                throw new ReferenceError('default document factory not found');
            }
        }
        return factory.parseCommand(info)
    };
    var default_command_factory = function (info) {
        var helper = SharedMessageExtensions.getHelper();
        var contentHelper = SharedMessageExtensions.getContentHelper();
        var type = helper.getContentType(info);
        if (!type) {
            return null
        }
        var factory = contentHelper.getContentFactory(type);
        if (!factory) {
            return null
        } else if (Interface.conforms(factory, CommandFactory)) {
            return factory
        } else {
            return null
        }
    };
    dimp.ext.ExtensionLoader = function () {
        BaseObject.call(this)
    };
    var ExtensionLoader = dimp.ext.ExtensionLoader;
    Class(ExtensionLoader, BaseObject, null, {
        load: function () {
            this.registerCoreHelpers();
            this.registerMessageFactories();
            this.registerContentFactories();
            this.registerCommandFactories()
        }, registerCoreHelpers: function () {
            this.registerCryptoHelpers();
            this.registerFormatHelpers();
            this.registerAccountHelpers();
            this.registerMessageHelpers();
            this.registerCommandHelpers()
        }, registerCryptoHelpers: function () {
            var helper = new CryptoKeyGeneralFactory();
            var ext = SharedCryptoExtensions;
            ext.setSymmetricHelper(helper);
            ext.setPrivateHelper(helper);
            ext.setPublicHelper(helper);
            ext.setHelper(helper)
        }, registerFormatHelpers: function () {
            var helper = new FormatGeneralFactory();
            var ext = SharedFormatExtensions;
            ext.setPNFHelper(helper);
            ext.setTEDHelper(helper);
            ext.setHelper(helper)
        }, registerAccountHelpers: function () {
            var helper = new AccountGeneralFactory();
            var ext = SharedAccountExtensions;
            ext.setAddressHelper(helper);
            ext.setIdentifierHelper(helper);
            ext.setMetaHelper(helper);
            ext.setDocumentHelper(helper);
            ext.setHelper(helper)
        }, registerMessageHelpers: function () {
            var helper = new MessageGeneralFactory();
            var ext = SharedMessageExtensions;
            ext.setContentHelper(helper);
            ext.setEnvelopeHelper(helper);
            ext.setInstantHelper(helper);
            ext.setSecureHelper(helper);
            ext.setReliableHelper(helper);
            ext.setHelper(helper)
        }, registerCommandHelpers: function () {
            var helper = new CommandGeneralFactory();
            var ext = SharedCommandExtensions;
            ext.setCommandHelper(helper);
            ext.setHelper(helper)
        }, registerMessageFactories: function () {
            var factory = new MessageFactory();
            Envelope.setFactory(factory);
            InstantMessage.setFactory(factory);
            SecureMessage.setFactory(factory);
            ReliableMessage.setFactory(factory)
        }, registerContentFactories: function () {
            this.setContentFactory(ContentType.TEXT, 'text', null, BaseTextContent);
            this.setContentFactory(ContentType.FILE, 'file', null, BaseFileContent);
            this.setContentFactory(ContentType.IMAGE, 'image', null, ImageFileContent);
            this.setContentFactory(ContentType.AUDIO, 'audio', null, AudioFileContent);
            this.setContentFactory(ContentType.VIDEO, 'video', null, VideoFileContent);
            this.setContentFactory(ContentType.PAGE, 'page', null, WebPageContent);
            this.setContentFactory(ContentType.NAME_CARD, 'card', null, NameCardContent);
            this.setContentFactory(ContentType.QUOTE, 'quote', null, BaseQuoteContent);
            this.setContentFactory(ContentType.MONEY, 'money', null, BaseMoneyContent);
            this.setContentFactory(ContentType.TRANSFER, 'transfer', null, TransferMoneyContent);
            this.setContentFactory(ContentType.COMMAND, 'command', new GeneralCommandFactory(), null);
            this.setContentFactory(ContentType.HISTORY, 'history', new HistoryCommandFactory(), null);
            this.setContentFactory(ContentType.ARRAY, 'array', null, ListContent);
            this.setContentFactory(ContentType.COMBINE_FORWARD, 'combine', null, CombineForwardContent);
            this.setContentFactory(ContentType.FORWARD, 'forward', null, SecretContent);
            this.setContentFactory(ContentType.ANY, '*', null, BaseContent);
            this.registerCustomizedFactories()
        }, registerCustomizedFactories: function () {
            this.setContentFactory(ContentType.CUSTOMIZED, 'customized', null, AppCustomizedContent)
        }, setContentFactory: function (type, alias, factory, clazz) {
            if (factory) {
                Content.setFactory(type, factory);
                Content.setFactory(alias, factory)
            }
            if (clazz) {
                factory = new ContentParser(clazz);
                Content.setFactory(type, factory);
                Content.setFactory(alias, factory)
            }
        }, setCommandFactory: function (cmd, factory, clazz) {
            if (factory) {
                Command.setFactory(cmd, factory)
            }
            if (clazz) {
                factory = new CommandParser(clazz);
                Command.setFactory(cmd, factory)
            }
        }, registerCommandFactories: function () {
            this.setCommandFactory(Command.META, null, BaseMetaCommand);
            this.setCommandFactory(Command.DOCUMENTS, null, BaseDocumentCommand);
            this.setCommandFactory(Command.RECEIPT, null, BaseReceiptCommand);
            this.setCommandFactory('group', new GroupCommandFactory(), null);
            this.setCommandFactory(GroupCommand.INVITE, null, InviteGroupCommand);
            this.setCommandFactory(GroupCommand.EXPEL, null, ExpelGroupCommand);
            this.setCommandFactory(GroupCommand.JOIN, null, JoinGroupCommand);
            this.setCommandFactory(GroupCommand.QUIT, null, QuitGroupCommand);
            this.setCommandFactory(GroupCommand.RESET, null, ResetGroupCommand);
            this.setCommandFactory(GroupCommand.HIRE, null, HireGroupCommand);
            this.setCommandFactory(GroupCommand.FIRE, null, FireGroupCommand);
            this.setCommandFactory(GroupCommand.RESIGN, null, ResignGroupCommand)
        }
    });
    dkd.dkd.ContentParser = function (clazz) {
        BaseObject.call(this);
        this.__class = clazz
    };
    var ContentParser = dkd.dkd.ContentParser;
    Class(ContentParser, BaseObject, [ContentFactory], null);
    ContentParser.prototype.parseContent = function (content) {
        return new this.__class(content)
    };
    dkd.dkd.CommandParser = function (clazz) {
        BaseObject.call(this);
        this.__class = clazz
    };
    var CommandParser = dkd.dkd.CommandParser;
    Class(CommandParser, BaseObject, [CommandFactory], null);
    CommandParser.prototype.parseCommand = function (content) {
        return new this.__class(content)
    };
    dimp.ext.PluginLoader = function () {
        BaseObject.call(this)
    };
    var PluginLoader = dimp.ext.PluginLoader;
    Class(PluginLoader, BaseObject, null, {
        load: function () {
            this.registerDataCoders();
            this.registerDataDigesters();
            this.registerSymmetricKeyFactories();
            this.registerAsymmetricKeyFactories();
            this.registerEntityFactories()
        }, registerDataCoders: function () {
            this.registerBase58Coder();
            this.registerBase64Coder();
            this.registerHexCoder();
            this.registerUTF8Coder();
            this.registerJSONCoder();
            this.registerPNFFactory();
            this.registerTEDFactory()
        }, registerBase58Coder: function () {
            Base58.setCoder(new Base58Coder())
        }, registerBase64Coder: function () {
            Base64.setCoder(new Base64Coder())
        }, registerHexCoder: function () {
            Hex.setCoder(new HexCoder())
        }, registerUTF8Coder: function () {
            UTF8.setCoder(new UTF8Coder())
        }, registerJSONCoder: function () {
            var coder = new JSONCoder();
            JSONMap.setCoder(coder);
            JSONList.setCoder(coder)
        }, registerPNFFactory: function () {
            PortableNetworkFile.setFactory(new BaseNetworkFileFactory())
        }, registerTEDFactory: function () {
            var tedFactory = new Base64DataFactory();
            TransportableData.setFactory(EncodeAlgorithms.BASE_64, tedFactory);
            TransportableData.setFactory('*', tedFactory)
        }, registerDataDigesters: function () {
            this.registerMD5Digester();
            this.registerSHA1Digester();
            this.registerSHA256Digester();
            this.registerKeccak256Digester();
            this.registerRIPEMD160Digester()
        }, registerMD5Digester: function () {
            MD5.setDigester(new MD5Digester())
        }, registerSHA1Digester: function () {
        }, registerSHA256Digester: function () {
            SHA256.setDigester(new SHA256Digester())
        }, registerKeccak256Digester: function () {
            Keccak256.setDigester(new Keccak256Digester())
        }, registerRIPEMD160Digester: function () {
            RIPEMD160.setDigester(new RIPEMD160Digester())
        }, registerSymmetricKeyFactories: function () {
            this.registerAESKeyFactory();
            this.registerPlainKeyFactory()
        }, registerAESKeyFactory: function () {
            var aes = new AESKeyFactory();
            SymmetricKey.setFactory(SymmetricAlgorithms.AES, aes);
            SymmetricKey.setFactory(AESKey.AES_CBC_PKCS7, aes)
        }, registerPlainKeyFactory: function () {
            var fact = new PlainKeyFactory();
            SymmetricKey.setFactory(SymmetricAlgorithms.PLAIN, fact)
        }, registerAsymmetricKeyFactories: function () {
            this.registerRSAKeyFactories();
            this.registerECCKeyFactories()
        }, registerRSAKeyFactories: function () {
            var rsaPub = new RSAPublicKeyFactory();
            PublicKey.setFactory(AsymmetricAlgorithms.RSA, rsaPub);
            PublicKey.setFactory('SHA256withRSA', rsaPub);
            PublicKey.setFactory('RSA/ECB/PKCS1Padding', rsaPub);
            var rsaPri = new RSAPrivateKeyFactory();
            PrivateKey.setFactory(AsymmetricAlgorithms.RSA, rsaPri);
            PrivateKey.setFactory('SHA256withRSA', rsaPri);
            PrivateKey.setFactory('RSA/ECB/PKCS1Padding', rsaPri)
        }, registerECCKeyFactories: function () {
            var eccPub = new ECCPublicKeyFactory();
            PublicKey.setFactory(AsymmetricAlgorithms.ECC, eccPub);
            PublicKey.setFactory('SHA256withECDSA', eccPub);
            var eccPri = new ECCPrivateKeyFactory();
            PrivateKey.setFactory(AsymmetricAlgorithms.ECC, eccPri);
            PrivateKey.setFactory('SHA256withECDSA', eccPri)
        }, registerEntityFactories: function () {
            this.registerIDFactory();
            this.registerAddressFactory();
            this.registerMetaFactories();
            this.registerDocumentFactories()
        }, registerIDFactory: function () {
            ID.setFactory(new IdentifierFactory())
        }, registerAddressFactory: function () {
            Address.setFactory(new BaseAddressFactory())
        }, registerMetaFactories: function () {
            this.setMetaFactory(MetaType.MKM, 'mkm', null);
            this.setMetaFactory(MetaType.BTC, 'btc', null);
            this.setMetaFactory(MetaType.ETH, 'eth', null)
        }, setMetaFactory: function (type, alias, factory) {
            if (!factory) {
                factory = new BaseMetaFactory(type)
            }
            Meta.setFactory(type, factory);
            Meta.setFactory(alias, factory)
        }, registerDocumentFactories: function () {
            this.setDocumentFactory('*', null);
            this.setDocumentFactory(DocumentType.VISA, null);
            this.setDocumentFactory(DocumentType.PROFILE, null);
            this.setDocumentFactory(DocumentType.BULLETIN, null)
        }, setDocumentFactory: function (type, factory) {
            if (!factory) {
                factory = new GeneralDocumentFactory(type)
            }
            Document.setFactory(type, factory)
        }
    })
})(DIMP, DIMP, DIMP, DIMP);
