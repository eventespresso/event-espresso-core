## Asset Caching by Filename

As a part of our new [build process](build-process.md) for Event Espresso, we are switching away from using version strings to signal changes within an asset file for various asset caching mechanisms. Historically the go-to method for cache-busting assets stored by browser clients is to use the query argument method which WordPress facilitates.  While somewhat reliable, this is can be problematic because depending on how a server is setup, query arguments _can_ be ignored in some environments.

We also briefly considered using `filemtime` as the "version" generator for our assets.  However besides having the same issues regarding usage of query arguments, the use of filemtime can cause unnecessary server load for servers that don't cache filesystem stats.  It also means with our build process that _every_ build will bust browser caches!

So we've decided to [switch to filenames containing a hash](https://github.com/eventespresso/event-espresso-core/pull/287) generated from the content of the files.  This means if the content of a built file does not change, then the filename remains the same, if the content of a built bundle file changes, then the filename will as well.

Switching to this new process requires some tweaks to how our assets are registered with `wp_register_script` however.

## Registering a Event Espresso Core asset with a hash in its name.

As a part of our build process, all bundles will be registered within a json file named `build-manifest.json`. This file is a map of chunk names (chunk names are just the slugs given to represent the name for a built bundle) to built files for that chunk indexed by asset type.  So for example, if a bundle is being created containing react libraries and its chunk name is `reactVendor` then the `build-manifest.json` will have this in it.


```json
{
    "reactVendor": {
        "js": "ee-reactVendor.83c902271dfaf7c14e74.dist.js",
        "css": "ee-reactVendor.83c902271dfaf7d54e74.dist.css"
    }
}
```

Our php based [asset registry](https://github.com/eventespresso/event-espresso-core/blob/master/core/services/assets/Registry.php) then provides a helper method for using to get the correct url when registering a built asset:
 
 ```php
 $asset_url = EventEspresso\core\services\assets\Registry::getAssetUrl($namespace, $chunk_name, $asset_type)
 ```
  
 There are also three constants available to use for asset type:  `EventEspresso\core\services\assets\Registry::ASSET_TYPE_JS`, `EventEspresso\core\services\assets\Registry::ASSET_NAMESPACE`, and `EventEspresso\core\services\assets\Registry::ASSET_TYPE_CSS`.  So for example, you could register the above assets by doing something like:


```
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Note: Registry should be injected as a dependency on any class you are using, but for this example we're using the
 * EE loader factory to make sure we're getting the already constructed Registry instance.
 **/
$registry = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\assets\Registry');

wp_register_script(
    'ee-vendor-react',
    $registry->getAssetUrl(Registry::ASSET_NAMESPACE, 'vendorReact', Registry::ASSET_TYPE_JS),
    array('eejs-core'),
    null,
    true
);
```

### Registering additional manifest files.

If you want to take advantage of using this api for handling your own built asset manifest.json files you can use the `EventEspresso\core\services\assets\Registry::registerManifestFile` method.  You just need to provide it three arguments:

- `$namespace`:  This is an arbitrary string representing the namespace for your manifest file.  It's to help keep collisions from happening with chunk names that are the same in different manifest files. So for instance an EE add-on might use the slug of that add-on as its "namespace".
- `$url_base`:  This should be the url path up to the location of your assets.  So if your assets all live in the a url like `https://mysitedomain.com/assets/dist/somejsfile.js`, then your url base would be `https://mysitedomain.com/assets/dist`.  
- `$manifest_file`: This should be the full absolute path to your manifest file, eg. `/home/user/path/to/manifest.json`

Your manifest file should be registered before any calls are made to `Registry::getAssetUrl` for your registered namespace. An example of registering a manifest file might look like this:

```php
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Note: Registry should be injected as a dependency on any class you are using, but for this example we're using the
 * EE loader factory to make sure we're getting the already constructed Registry instance.
 **/
$registry = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\assets\Registry');

$registry->registerManifestFile(
    'my-addon',
    'https://mydomain.com/assets',
    plugin_dir_path(__FILE__) . '/assets/build/manifest.json'
);
```

### Further Reading:

Related documents that should be read are:

- [`eejs-core` dependency](eejs-core-dependency.md)
- [The `eejs.data` api](eejs-data-api.md)