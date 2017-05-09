# Dependency Injection Using the EE_Registry and EE_Dependency_Map

Currently Event Espresso is still using the legacy classes EE_Registry and EE_Dependency_Map for injecting dependencies into classes upon instantiation.

If you are using **Fully\Qualified\ClassNames** (FQCN) then you can use `EE_Registry::create()` for generating your client code classes and their dependencies will get automatically injected:

```php
$my_class = EE_Registry::instance()->create('Vendor\namespace\ClientCode');

```

But first, you need to register those dependencies with EE_Dependency_Map:

```php
EE_Dependency_Map::register_dependencies(
    'Vendor\namespace\ClientCode', //  <== FQCN for your class
    array('Vendor\namespace\Dependency' => EE_Dependency_Map::load_from_cache)   <== array of dependencies
);
```

The array of dependencies uses the Fully Qualified Class Name (FQCN) of the dependency for the key and a class constant for the value. The two options for the latter are:

 * `EE_Dependency_Map::load_new_object` - This instructs class loaders to ALWAYS return a newly instantiated object for the requested class.
 * `EE_Dependency_Map::load_from_cache` - This instructs class loaders to return a previously instantiated and cached object for the requested class. IF a previously instantiated object does not exist, a new one will be created and added to the cache.
 
 If a class constructor type hints for an interface, you will need to register that interface as an alias
 
 ```php
 EE_Dependency_Map::instance()->add_alias(
     'Vendor\namespace\ClientCode', //  <== FQCN for your class
     'Vendor\namespace\ClientCodeInterface', //  <== FQCN for your interface
 );
 ```

However, sometimes multiple classes will type hint for a generic class or interface in their constructors, but ultimately require a more specific concretion. For example, several classes might all type hint for a ` Collection ` class of some sort. However one class really wants an ` EventCollection ` and another wants a ` TicketCollection `, etc, etc.

In this situation, you can specify the FQCN for the class that is type hinting for the dependency as a third parameter for the ` add_alias() ` method.

 
 ```php
 // for a class that requires an instance of EventCollection
 EE_Dependency_Map::instance()->add_alias(
     'Vendor\namespace\EventCollection', //  <== FQCN for your concrete class
     'EventEspresso\core\services\collections\Collection', //  <== FQCN for generic class or interface
     'Vendor\namespace\ClientCode', //  <== FQCN for your class that requires EventCollection
 );
 
 // for a class that requires an instance of TicketCollection
 EE_Dependency_Map::instance()->add_alias(
     'Vendor\namespace\TicketCollection', //  <== FQCN for your concrete class
     'EventEspresso\core\services\collections\Collection', //  <== FQCN for generic class or interface
     'Vendor\namespace\OtherClientCode', //  <== FQCN for your class that requires TicketCollection
 );
 ```
