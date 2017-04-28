# Dependency Injection Using the EE_Registry and EE_Dependency_Map

Currently Event Espresso is still using the legacy classes EE_Registry and EE_Dependency_Map for injecting dependencies into classes upon instantiation.

If you are using **\Fully\Qualified\ClassNames** then you can use `EE_Registry::create()` for generating your client code classes and their dependencies will get automatically injected:

```php
$my_class = EE_Registry::instance()->create('\Vendor\namespace\ClientCode');

```

But first, you need to register those dependencies with EE_Dependency_Map:

```php
EE_Dependency_Map::register_dependencies(
    '\Vendor\namespace\ClientCode', //  <== your class name
    array(''\Vendor\namespace\Dependency'' => EE_Dependency_Map::load_from_cache)   <== array of dependencies
);
```

The array of dependencies uses the Fully Qualified Class Name of the dependency for the key and a class constant for the value. The two options for the latter are:

 * `EE_Dependency_Map::load_new_object` - This instructs class loaders to ALWAYS return a newly instantiated object for the requested class.
 * `EE_Dependency_Map::load_from_cache` - This instructs class loaders to return a previously instantiated and cached object for the requested class. IF a previously instantiated object does not exist, a new one will be created and added to the cache.

