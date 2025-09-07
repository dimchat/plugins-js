# DIM Plugins (JavaScript)


[![License](https://img.shields.io/github/license/dimchat/plugins-js)](https://github.com/dimchat/plugins-js/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/dimchat/plugins-js/pulls)
[![Platform](https://img.shields.io/badge/Platform-ECMAScript%205.1-brightgreen.svg)](https://github.com/dimchat/plugins-js/wiki)
[![Issues](https://img.shields.io/github/issues/dimchat/plugins-js)](https://github.com/dimchat/plugins-js/issues)
[![Repo Size](https://img.shields.io/github/repo-size/dimchat/plugins-js)](https://github.com/dimchat/plugins-js/archive/refs/heads/main.zip)
[![Tags](https://img.shields.io/github/tag/dimchat/plugins-js)](https://github.com/dimchat/plugins-js/tags)

[![Watchers](https://img.shields.io/github/watchers/dimchat/plugins-js)](https://github.com/dimchat/plugins-js/watchers)
[![Forks](https://img.shields.io/github/forks/dimchat/plugins-js)](https://github.com/dimchat/plugins-js/forks)
[![Stars](https://img.shields.io/github/stars/dimchat/plugins-js)](https://github.com/dimchat/plugins-js/stargazers)
[![Followers](https://img.shields.io/github/followers/dimchat)](https://github.com/orgs/dimchat/followers)

## Plugins

1. Data Coding
   * Base-58
   * Base-64
   * Hex
   * UTF-8
   * JsON
   * PNF _(Portable Network File)_
   * TED _(Transportable Encoded Data)_
2. Digest Digest
   * MD-5
   * SHA-1
   * SHA-256
   * Keccak-256
   * RipeMD-160
3. Cryptography
   * AES-256 _(AES/CBC/PKCS7Padding)_
   * RSA-1024 _(RSA/ECB/PKCS1Padding)_, _(SHA256withRSA)_
   * ECC _(Secp256k1)_
4. Address
   * BTC
   * ETH
5. Meta
   * MKM _(Default)_
   * BTC
   * ETH
6. Document
   * Visa _(User)_
   * Profile
   * Bulletin _(Group)_

## Extends

### Address

```javascript
/**
 *  Unsupported Address
 *  ~~~~~~~~~~~~~~~~~~~
 */
app.compat.UnknownAddress = function (string) {
    ConstantString.call(this, string);
};
var UnknownAddress = app.compat.UnknownAddress;

Class(UnknownAddress, ConstantString, [Address]);

Implementation(UnknownAddress, {
    // Override
    getType: function () {
        return 0;  // EntityType.USER;
    }
});

/**
 *  Compatible Address Factory
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
app.compat.CompatibleAddressFactory = function () {
    BaseAddressFactory.call(this);
};
var CompatibleAddressFactory = app.compat.CompatibleAddressFactory;

Class(CompatibleAddressFactory, BaseAddressFactory, null);

/**
 *  Call it when received 'UIApplicationDidReceiveMemoryWarningNotification',
 *  this will remove 50% of cached objects
 *
 * @return {uint} number of survivors
 */
CompatibleAddressFactory.prototype.reduceMemory = function () {
    var finger = 0;
    finger = thanos(this._addresses, finger);
    return finger >> 1;
};

// Override
CompatibleAddressFactory.prototype.parse = function(address) {
    if (!address) {
        //throw new ReferenceError('address empty');
        return null;
    }
    var len = address.length;
    if (len === 8) {
        // "anywhere"
        if (address.toLowerCase() === 'anywhere') {
            return Address.ANYWHERE;
        }
    } else if (len === 10) {
        // "everywhere"
        if (address.toLowerCase() === 'everywhere') {
            return Address.EVERYWHERE;
        }
    }
    var res;
    if (26 <= len && len <= 35) {
        res = BTCAddress.parse(address);
    } else if (len === 42) {
        res = ETHAddress.parse(address);
    } else {
        //throw new TypeError('invalid address: ' + address);
        res = null;
    }
    // TODO: other types of address
    if (!res && 4 <= len && len <= 64) {
        res = new UnknownAddress(address);
    }
    return res;
};
```

### Meta

```javascript
/**
 *  Compatible Meta factory
 *  ~~~~~~~~~~~~~~~~~~~~~~~
 */
app.compat.CompatibleMetaFactory = function (type) {
    BaseMetaFactory.call(this, type);
};
var CompatibleMetaFactory = app.compat.CompatibleMetaFactory;

Class(CompatibleMetaFactory, BaseMetaFactory, null);

Implementation(CompatibleMetaFactory, {

    // Override
    parseMeta: function(meta) {
        var out;
        var helper = SharedAccountExtensions.getHelper();
        var type = helper.getMetaType(meta, '');
        switch (type) {

            case 'MKM':
            case 'mkm':
            case '1':
                out = new DefaultMeta(meta);
                break;

            case 'BTC':
            case 'btc':
            case '2':
                out = new BTCMeta(meta);
                break;

            case 'ETH':
            case 'eth':
            case '4':
                out = new ETHMeta(meta);
                break;

            default:
                throw new TypeError('unknown meta type: ' + type);
        }
        return out.isValid() ? out : null
    }
});
```

### Plugin Loader

```javascript
app.compat.CommonPluginLoader = function () {
    PluginLoader.call(this);
};
var CommonPluginLoader = app.compat.CommonPluginLoader;

Class(CommonPluginLoader, PluginLoader, null);

Implementation(CommonPluginLoader, {

    // Override
    registerIDFactory: function () {
        ID.setFactory(new EntityIDFactory());
    },
    
    // Override
    registerAddressFactory: function () {
        Address.setFactory(new CompatibleAddressFactory());
    },
    
    // Override
    registerMetaFactories: function () {
        var mkm = new CompatibleMetaFactory(MetaType.MKM);
        var btc = new CompatibleMetaFactory(MetaType.BTC);
        var eth = new CompatibleMetaFactory(MetaType.ETH);

        Meta.setFactory('1', mkm);
        Meta.setFactory('2', btc);
        Meta.setFactory('4', eth);

        Meta.setFactory('mkm', mkm);
        Meta.setFactory('btc', btc);
        Meta.setFactory('eth', eth);

        Meta.setFactory('MKM', mkm);
        Meta.setFactory('BTC', btc);
        Meta.setFactory('ETH', eth);
    }
});
```

## Usage

You must load all plugins before your business run:

```javascript
ns.compat.LibraryLoader = function (extensionLoader, pluginLoader) {
    this.__extensions = extensionLoader || new ExtensionLoader();
    this.__plugins = pluginLoader || new CommonPluginLoader();
};
var LibraryLoader = ns.compat.LibraryLoader;

LibraryLoader.prototype.run = function () {
    this.__extensions.load();
    this.__plugins.load();
};
```

```javascript
var loader = new LibraryLoader(null, null);
loader.run();

// do your jobs after all extensions & plugins loaded
```

You must ensure that every ```Address``` you extend has a ```Meta``` type that can correspond to it one by one.

----

Copyright &copy; 2018-2025 Albert Moky
[![Followers](https://img.shields.io/github/followers/moky)](https://github.com/moky?tab=followers)
