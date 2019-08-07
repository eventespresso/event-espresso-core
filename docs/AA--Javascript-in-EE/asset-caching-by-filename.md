## Asset Caching by Filename

As a part of our new [build process](build-process.md) for Event Espresso, we are switching away from using version strings to signal changes within an asset file for various asset caching mechanisms. Historically the go-to method for cache-busting assets stored by browser clients is to use the query argument method which WordPress facilitates.  While somewhat reliable, this is can be problematic because depending on how a server is setup, query arguments _can_ be ignored in some environments.

We also briefly considered using `filemtime` as the "version" generator for our assets.  However besides having the same issues regarding usage of query arguments, the use of filemtime can cause unnecessary server load for servers that don't cache filesystem stats.  It also means with our build process that _every_ build will bust browser caches!

So we've decided to [switch to filenames containing a hash](https://github.com/eventespresso/event-espresso-core/pull/287) generated from the content of the files.  This means if the content of a built file does not change, then the filename remains the same, if the content of a built bundle file changes, then the filename will as well.

Switching to this new process requires some tweaks to where assets are located, and how they are registered with `wp_register_script`.

## Where Javascript and CSS Assets Should be Located

In Event Espresso core, new Javascript and CSS files should be located somewhere under `assets/src` (previously they were placed in `core/templates/global_assets`, or beside the PHP files they corresponded to.)
Put the files in whatever folder/subfolder is logical, like `assets/src/empire/stardestroyer.js`
Then add an new entry to `webpack.common.js`' `config` const. Use whatever string you like for the entry slug/chunk name.
Like the following

```javascript
...
{
		entry: {
			'eventespresso-core-star-destroyer-chunkname' /* <!-- entry slug/chunk name! */: [
				assets + 'empire/stardestroyer.js',
			],
		},
		output: {
			filename: '[name].[chunkhash].dist.js',
			path: path.resolve( __dirname, 'assets/dist' ),
		},
		module: moduleConfigWithJsAndCssRules,
		watchOptions: {
			poll: 1000,
		},
	},
...
```
You've now informed webpack where the new assets are located, and what their chunk name is.

Don't forget to run the build process with `npm run watch` to build the files. 

After that, the server-side PHP Registry code will know how to find them given the chunk name. 

## Registering an Event Espresso Core asset with a hash in its name.

As a part of our build process, all bundles will be registered within a json file named `build-manifest.json`. This file is a map of chunk names (chunk names are just the slugs given to represent the name for a built bundle) to built files for that chunk. For example, there will now be an entry for "star-destroyer" like this:


```json
...
    "eventespresso-core-star-destroyer.js": "eventespresso-core-star-destroyer.83c902271dfaf7c14e74.dist.js",
...
}
```

Our php based [asset registry](https://github.com/eventespresso/event-espresso-core/blob/master/core/services/assets/Registry.php) provides helper methods for getting the correct url when registering a built asset:
 
 ```php
 $asset_url = EventEspresso\core\services\assets\Registry::getAssetUrl($namespace, $chunk_name, $asset_type);
 ```
 
 Also, there are two simplified methods: one just for Javascript files...
 
 ```php
 $js_url = EventEspresso\core\services\assets\Registry::getJsUrl($namespace, $chunk_name);
 ```
 
 ...and one for CSS files:
 
  ```php
  $css_url = EventEspresso\core\services\assets\Registry::getCssUrl($namespace, $chunk_name);
  ```  
 
These utilize the constants `EventEspresso\core\domain\values\assets\Asset::TYPE_JS` and `EventEspresso\core\domain\values\assets\Asset::TYPE_CSS` for you.
 
The namespace for your assets can be obtained from the plugin's `\domain\Domain` class `assetNamespace()` method.
  
So for example, you could register the above assets by doing something like:

```
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Note: Registry should be injected as a dependency on any class you are using, but for this example we're using the
 * EE loader factory to make sure we're getting the already constructed Registry instance.
 **/
$registry = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\assets\Registry');
$domain = LoaderFactory::getLoader()->getShared('EventEspresso\core\domain\Domain');

wp_register_script(
    'ee-star-destroyer-script-handle',
    $registry->getJsUrl($domain->assetNamespace(), 'eventespresso-core-star-destroyer-chunkname'),
    array('eejs-core'),
    null,
    true
);
```

Important: make sure your call to `$registry->getJsUrl()` occurs *after* `wp_enqueue_scripts` priority 1 (when the asset's manifest file is parsed).

The script should now be enqueued on the pages you requested.

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

- [`eejs-core` dependency](./eejs-core-dependency.md)
- [The `eejs.data` api](./eejs-data-api.md)