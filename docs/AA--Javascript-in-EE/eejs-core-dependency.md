## The `eejs-core` dependency.

> Update from Mike, September 11 2019:
>
> The information in this doc seems to be incorrect or out-of-date. 
> 
> I've used the build process successfully (on PayPal Smart Buttons and Stripe Elements) without depending on `eejs-core`. 
> In fact, adding that dependency may be a bad idea because it doesn't work on WP 4.9 or lower unless the Gutenberg plugin is active.
>
> So if your code requires WP 5.0 or Gutenberg anyway, it's fine. Otherwise, avoid adding `eejs-core` as a dependency!   

Every js bundle built using the event-espresso core [build process](build-process.md) _must_ declare as a dependency the `eejs-core` registered script (or indirectly through another dependency).  For example: say we have a built file that ends up as something like `ee-blocks-07a088b9a2f510393f8f.dist.js` after building.  It would need to be registered like so (see [Asset Caching by Filename](asset-caching-by-filename.md) for information about the `$assets_registry->getAssetUrl()` call made in this example):

```js
wp_register_script(
    'ee-blocks',
    $assets_registry->getAssetUrl(Registry::ASSET_NAMESPACE, 'blocks', Registry::ASSET_TYPE_JS),
    array('eejs-core'),
    null,
    true
);
```

You may be wondering, **why?**.  

With hash based caching (which is what we are using for [cache control over assets](asset-caching-by-filename.md)), in order to keep changes in a file to a minimum, the build process [extracts webpack boilerplate and manifest](https://webpack.js.org/guides/caching/#extracting-boilerplate) into its own file.  However, this extracted base bundle _must_ be loaded on a page _before_ any other built bundles.  Hence the importance of it being a dependency.

Along with this, the Event Espresso build process includes a php asset registry helper for transferring arbitrary data from php to js and exposed via a global `eejs` object.  In order for that to be of any use, it too, must be loaded before any built file.

For convenience, the needs of both the above are handled by doing this via `EventEspresso\core\servicesassets\Registry::scripts`:

```php
wp_register_script(
    'ee-manifest',
    $this->getAssetUrl(self::ASSET_NAMESPACE, 'manifest', self::ASSET_TYPE_JS),
    array(),
    null,
    true
);
wp_register_script(
    'eejs-core',
    $this->getAssetUrl(self::ASSET_NAMESPACE, 'eejs', self::ASSET_TYPE_JS),
    array('ee-manifest'),
    null,
    true
); 
```

So, when you list `eejs-core` as a dependency for a registered built js bundle, you are inherently ensuring the webpack manifest and the eejs global are loaded before your bundle.

Of course, if you know for sure you're not going to need `eejs`, you can simply make `ee-manifest` a dependency for your script.

Related reading:

- [Asset Caching By Filename](./asset-caching-by-filename.md)
- [The `eejs.data` api](./eejs-data-api.md)
