# Dependency Injection and The Event Espresso CoffeeShop

As programmers, we love coffee. You could say we are dependent on coffee.
If we could, we would probably inject that dependency right into our blood streams!
Well we can't do that with coffee... but we **can** do it with our classes.

[Dependency Injection](http://www.phptherightway.com/#dependency_injection), is the practice of taking the objects that an entity depends on, and passing them into that entity, as opposed to creating them from within. This means that the objects being passed into the entity can be substituted at runtime for alternatives. This has many useful benefits such as decreasing coupling, increasing flexibility, and improving testability, among others.

So instead of :

```php
class MyClass
{

    private $thing_my_class_needs;

    public function __construct()
    {
        $this->thing_my_class_needs = new Thing();
    }

}
$my_class = new MyClass();
```

you inject the dependency into the class that needs it:

```php
class MyClass
{

    private $thing_my_class_needs;

    public function __construct( Thing $thing )
    {
        $this->thing_my_class_needs = $thing;
    }

}
$my_class = new MyClass( new Thing() );
```

Now that you've injected your dependency into your class, you can freely manipulate the incoming dependency at run time. Ideally you should type hint for interfaces instead of concrete classes, because then you can substitute the incoming dependency for any other class that implements that interface, giving you tons of flexibility, especially when unit testing.

### CoffeeShop Dependency Injection (DI) Container

Now the only "shortcoming" with injecting your dependencies like this, is that any code that wants to use ` MyClass ` is responsible for providing an instance of ` Thing ` when creating ` MyClass `. And this can be tedious. Thankfully, Dependency Injection (DI) containers can manage this responsibility for you. A DI container is an object (or group of objects working together) that knows how to instantiate classes and provide them with the dependencies they require. And because we love coffee so much at Event Espresso, our DI container is called **CoffeeShop**.

We'll take care of the initial setup of the **CoffeeShop**, as well as making sure that it's available to all Event Espresso Modules, Payment Methods, Addons, etc. So we'll skip that part and get right to showing you how it works.

So let's assume the following for our example:

 - that the **CoffeeShop** DI container is accessible in your controller via ` $this->CoffeeShop() `
 - you want to load a class named ` MyClass ` that requires the ` EEM_Attendee ` model in order to retrieve some data from the database
 - you are using PSR-4 compatible namespaces, and ` MyClass ` is located in the ` \Vendor\Namespace\Folder\ ` directory

You would first have to add the ` EEM_Attendee ` model as a constructor param for the ` MyClass ` class like this:

```php
class MyClass
{
    private $attendee_model;

    public function __construct( EEM_Attendee $attendee_model )
    {
        $this->attendee_model = $attendee_model;
    }

}
```

then your controller could load the ` MyClass ` class like this:

```php
$my_class = $this->CoffeeShop()->brew( 'Vendor\Namespace\Folder\MyClass' );
```

and... uhh... **THAT'S IT!!!**

Because you were using PSR-4 compatible namespaces, and because we had already instructed the **CoffeeShop** DI container on how to inject our models into other classes, ` MyClass ` automatically received an instance of the ` EEM_Attendee ` model as a constructor param.

### Passing Additional Arguments to your Constructors

> That's cool, but what if ` MyClass ` required some other constructor parameters, like an integer and a string ?

No problem, first you'll need to add those parameters to your class constructor:

```php
class MyClass
{
    private $an_integer;
    private $a_string;
    private $attendee_model;

    public function __construct( $an_integer = 1, $a_string = 'blahblah', EEM_Attendee $attendee_model )
    {
        $this->an_integer = $an_integer;
        $this->a_string = $a_string;
        $this->attendee_model = $attendee_model;
    }

}
```

**Note: It's best to leave your injected dependencies as the last parameters for your constructor, so that you can simply ignore them when passing arguments to your classes during instantiation. If you put the injected dependencies first, then you would have to always leave an empty value when passing arguments.**

How do you pass arguments to your constructor you ask?

Easily, through the second parameter of the ` CoffeeShop::brew() ` method we showed you earlier.

```php
$my_class = $this->CoffeeShop()->brew(
    'Vendor\Namespace\Folder\MyClass',
    array( 123, 'yada yada yada' )
);
```

Add as many parameters as you want, **CoffeeShop** will automatically resolve your class's dependencies. But remember if you need to pass an argument **AFTER** an injected dependency, then you need to leave space for it:

```php
$my_class = $this->CoffeeShop()->brew(
    'Vendor\Namespace\Folder\MyClass',
    array( 123, 'yada yada yada', null, 'another string' )
);
// where null will get replaced by the EEM_Attendee model
```

### CoffeeShop Recipes - Configuring New Dependencies

> what if I want to inject some other class of my own that CoffeeShop doesn't already know about ?

Well before that new dependency can be injected, we need to tell **CoffeeShop** about that class, where to find it, and exactly how to load it. We do this with **Recipes**, which are a set of instructions, that tell **CoffeeShop** about your class.

So let's create that other class and add it as a parameter to ` MyClass `.

file: Vendor\Namespace\OtherFolder\OtherClass.php
```php
namepace Vendor\Namespace\OtherFolder;

class OtherClass
{
    public function __construct()
    {
    }
}
```

file: Vendor\Namespace\Folder\MyClass.php
```php
namepace Vendor\Namespace\Folder;

class MyClass
{
    private $an_integer;
    private $a_string;
    private $attendee_model;
    private $another_class;

    public function __construct(
        $an_integer = 1,
        $a_string = 'blahblah',
        EEM_Attendee $attendee_model,
        OtherClass $another_class
    )
    {
        $this->an_integer = $an_integer;
        $this->a_string = $a_string;
        $this->attendee_model = $attendee_model;
        $this->another_class = $another_class;
    }

}
```

Now to tell **CoffeeShop** about this other class, we need to create a **Recipe** for it. The first parameter will be some sort of unique identifier that is used internally for referencing the Recipe, and the second parameter is the Fully Qualified Class Name.

```php
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        // identifier
        'OtherClass',
        // Fully Qualified Class Name
        'Vendor\Namespace\OtherFolder\OtherClass' 
    )
);
```

and... uhh... **THAT'S IT!!!**

**CoffeeShop** will now inject your ` OtherClass ` anywhere that you type hint for it.

### Type Hinting for Interfaces and Filters (Aliases)

> To do Dependency Inversion properly, you shouldn't type hint for concrete classes in your constructor, but instead type hint for interfaces. How does CoffeeShop know what concrete class to use if I'm not specifying that in my type hinting ?

The third parameter for your **Recipe** allows you to pass an array of class interfaces or "aliases", that (keeping with the Coffee analogy) we will refer to as **Filters**. **Filters** allow you to specify alternate names that you want **CoffeeShop** to recognize as referencing the class your **Recipe** is for.

If you wanted to type hint for an interface that is implemented by ` OtherClass`, you would first need to change your class declaration and constructor for the class injecting it:


file: Vendor\Namespace\OtherFolder\OtherClass.php
```php
namepace Vendor\Namespace\OtherFolder;

class OtherClass implements OtherInterface
{
    public function __construct()
    {
    }
}
```

file: Vendor\Namespace\Folder\MyClass.php
```php
namepace Vendor\Namespace\Folder;

class MyClass
{
    private $an_integer;
    private $a_string;
    private $attendee_model;
    private $another_class;

    public function __construct(
        $an_integer = 1,
        $a_string = 'blahblah',
        EEM_Attendee $attendee_model,
        Vendor\Namespace\OtherFolder\OtherInterface $another_class
    )
    {
        $this->an_integer = $an_integer;
        $this->a_string = $a_string;
        $this->attendee_model = $attendee_model;
        $this->another_class = $another_class;
    }

}
```

then specify that interface in the **Filters** array passed to your **Recipe**:

```php
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        // identifier
        'OtherClass',
        // Fully Qualified Class Name
        'Vendor\Namespace\OtherFolder\OtherClass', 
        // filters (interface or aliases for 'OtherClass')
        array( 'Vendor\Namespace\OtherFolder\OtherInterface' )
    )
);
```

Now anytime **CoffeeShop** encounters a class that type hints for ` OtherInterface ` it will inject an instance of ` OtherClass `.


### Recipe Ingredients

> Ok, so now because there is a Recipe for 'OtherClass' that uses 'OtherInterface' as a filter (alias), anytime I type hint for  'OtherInterface' in a class constructor, I will receive an instance of 'OtherClass'.  
> That's great, but what if I have a different class (ADifferentClass) that also type hints for 'OtherInterface', but I actually want to pass it an instance of 'SomeOtherClass' instead of 'OtherClass'?

The next parameter for the Recipe class allows you to pass an array of "ingredients" that define specific dependencies for the class that your Recipe is for. In other words, for parameter A, use B.

First let's define 'SomeOtherClass':
 
 ```php
namepace Vendor\Namespace\OtherFolder;
 
class SomeOtherClass implements OtherInterface
{
    public function __construct()
    {
    }

}
 ```
 
 and  'ADifferentClass':
 
 ```php
namepace Vendor\Namespace\ADifferentFolder;
  
class ADifferentClass
{
   private $some_other_class;

   public function __construct(
       Vendor\Namespace\OtherFolder\OtherInterface $some_other_class
   )
   {
       $this->some_other_class = $some_other_class;
   }

}
 ```
 
At this point, if you brewed an instance of 'ADifferentClass', it would receive an instance of 'OtherClass' because it type hints for 'OtherInterface' and the existing Recipe for 'OtherClass' filters all of the class names passed to the CoffeeShop that use 'OtherInterface'.
  
In order to correctly pass an instance of 'SomeOtherClass' to 'ADifferentClass', **WITHOUT** effecting the existing classes that type hint for 'OtherInterface', we need to create a new Recipe for 'ADifferentClass', and specify 'SomeOtherClass' as an ingredient to be used where 'OtherInterface' is requested. 
  
```php
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        // identifier
        'ADifferentClass',
        // Fully Qualified Class Name
        'Vendor\Namespace\OtherFolder\ADifferentClass',
        // filters
        array(),
        // ingredients
        array(
            'Vendor\Namespace\OtherFolder\OtherInterface' => 'Vendor\Namespace\OtherFolder\SomeOtherClass'
        )
    )
);
```

So the ingredients array means this Recipe says:
 - when instantiating Vendor\Namespace\OtherFolder\ADifferentClass'
 - where 'Vendor\Namespace\OtherFolder\OtherInterface' is specified
 - use 'Vendor\Namespace\OtherFolder\SomeOtherClass'


### CoffeeMakers and Recipe Types

**By default, anytime you call ` CoffeeShop::brew() ` you will receive a NEW unique instantiation of the requested class. So calling ` CoffeeShop::brew() ` multiple times in a row with the same parameters, will result in multiple instantiations of the same class. These are separate unique objects.**

> What if I don't want a new instantiation, but instead want to receive the exact same instance of an existing object that has already been brewed?

Internally, **CoffeeShop** uses a series of **CoffeeMaker** classes which determine how and when your objects are constructed and returned. When creating a **Recipe** you can set which **CoffeeMaker** to use for your brew.

There are currently three types:

 - **NewCoffeeMaker** - this is the default **CoffeeMaker** and as already explained, will return a newly instantiated object every time one is requested. After performing all of the logic for determining how to build your object and resolve it's dependencies, the results are placed in a Closure and stored in the "reservoir" Collection so that the next time the class is required, we simply call the Closure.

 - **SharedCoffeeMaker** - instead of returning a newly instantiated object every time, this **CoffeeMaker** builds an object **once** and then stores that object in the "carafe" Collection so that the next time the class is required, we simply return that previously built object. Therefore the exact same instance is returned every time it is requested.

 - **LoadOnlyCoffeeMaker** - sometimes we only need to load a file that contains a class that another class depends on. Examples are abstract parent classes, interfaces, etc. and we don't and/or can not actually instantiate anything for these classes anyways. This **CoffeeMaker** doesn't do anything other than ensure the class files are loaded.

To specify which **CoffeeMaker** should be used by your **Recipe**, you need to pass one of the following class constants as the forth argument:

  - EventEspresso\core\services\container\CoffeeMaker::BREW_NEW
  - EventEspresso\core\services\container\CoffeeMaker::BREW_SHARED
  - EventEspresso\core\services\container\CoffeeMaker::BREW_LOAD_ONLY

like so:

```php
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        // identifier
        'OtherClass',
        // Fully Qualified Class Name
        'Vendor\Namespace\OtherFolder\OtherClass',
        // filters
        array(),
        // ingredients
        array(),
        // brew type (coffeemaker)
        EventEspresso\core\services\container\CoffeeMaker::BREW_SHARED
    )
);
```

This would result in the exact same instance of ` OtherClass` being returned every time it was requested. This effectively produces the same result that is achieved by utilizing the Singleton design pattern. A single class instance that is shared amongst all classes.


### Paths

Since the CoffeeSop primarily depends on PSR-4 compatible namespacing to find and load classes, if you have a class that does not follow this best practice, then you will need to manually specify the path to your class file.

The final parameter for the Recipe class allows you to do this. Consider the following example:

file: \some\PSR_4_incompatible\file_path\TO\old-school-legacy.class.php
```php
// NO namepace

class MY_Old_School_Legacy_Class_Name {
    public function __construct()
    {
    }
}
```

Unless you have registered an SPL Autoloader that can somehow manage to resolve that filepath when encountering that classname, we need to tell the CoffeeShop where to find that class by specifying the exact server path to use:

```php
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        // identifier
        'Old_School_Legacy_Class',
        // Not so Fully Qualified Class Name
        'MY_Old_School_Legacy_Class_Name', 
        // filters
        array(),
        // ingredients
        array(),
        // brew type
        CoffeeMaker::BREW_NEW,
        // paths array
        '\some\PSR_4_incompatible\file_path\TO\old-school-legacy.class.php'
    )
);
```

Now any class that type hints for 'MY_Old_School_Legacy_Class_Name', will receive the proper instance, because the CoffeeShop now knows what file to find that class in.

### WILDCARD * Recipes

If you have a LOT of classes that do not follow PSR-4 compatible namespacing, then building Recipes for EVERY single class could be really tedious. So CoffeeShop supports Wildcards in both the class names and filepaths.
Here's a Recipe that handles ALL of the standard core EE db model classes:

```php
$this->CoffeeShop()->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        // identifier
        'EE_Models',
        // Fully Qualified Class Name
        'EEM_*', // targets any class using the "EEM_" prefix
        // filters
        array(),
        // ingredients
        array(),
        // brew type
        CoffeeMaker::BREW_SHARED, // we want shared services (like singletons)
        // paths array
        EE_MODELS . '*.model.php' // replaces wildcard with full class name
    )
);    
$attendee_model = $this->CoffeeShop()->brew( 'EEM_Attendee' );
$registration_model = $this->CoffeeShop()->brew( 'EEM_Registration' );
$transaction_model = $this->CoffeeShop()->brew( 'EEM_Transaction' );
```
all of the returned objects are correct and are all handled by one Recipe


### Dependency Injection vs Service Location

> Oh hey, this is great, but injecting all of those dependencies looks like a lot of work, so I'm going to be really clever and just inject the CoffeeShop DI container into all of my classes, and then get my classes directly from the DI container when I need them.

This might initially look like a great idea:

 ```php
namepace Vendor\Namespace\Folder;
  
class CleverClass
{
   private $dependency_1;
   private $dependency_2;

   public function __construct(CoffeeShop $coffee_shop)
   {
       $this->dependency_1 = $coffee_shop->get('DependencyOne');
       $this->dependency_2 = $coffee_shop->get('DependencyTwo');
   }

}
 ```

because later on down the road, if you need to add another dependency, you can just grab it from the CoffeeShop DI container without having to do anything else, or touch any other classes:

 ```php
namepace Vendor\Namespace\Folder;
  
class CleverClass
{
   private $dependency_1;
   private $dependency_2;
   private $dependency_3;

   public function __construct(CoffeeShop $coffee_shop)
   {
       $this->dependency_1 = $coffee_shop->get('DependencyOne');
       $this->dependency_2 = $coffee_shop->get('DependencyTwo');
       $this->dependency_3 = $coffee_shop->get('DependencyThree');
   }

}
 ```

> ya exactly... pretty clever eh?

ummm... no!

This is commonly called Service Location and is bad because we are right back where we started from with hard coded dependencies. The above is not much different than the following:

 ```php
namepace Vendor\Namespace\Folder;
  
class CleverClass
{
   private $dependency_1;
   private $dependency_2;
   private $dependency_3;

   public function __construct()
   {
       $this->dependency_1 = new DependencyOne();
       $this->dependency_2 = new DependencyTwo();
       $this->dependency_3 = new DependencyThree();
   }

}
 ```

If we want to modify ANY of those dependencies at runtime, we are unable to do so, because the dependencies are controlled by the class that requires the dependencies, whereas when the dependencies are injected, the class neither knows how those objects were created, nor does it know their exact type. It only knows that they satisfy the contract specified by the type hinted interface (which is the ideal way to be doing things). 

Another issue is that Service Location hides dependencies. If you have an intelligent IDE that can report on the parameters required by a class constructor, then seeing  nothing but ` CoffeeShop ` does not tell you very much considering it could represent ANY class in your codebase. Whereas using true Dependency Injection will specify the exact requirements that the class needs: ` DependencyOne, DependencyTwo, DependencyThree `.

> but... I can't possibly inject EVERY dependency!!! What about when I need to create a new class based on the results of some business logic that's inside one of my classes?

You're right!!! There are times when you will need to create a new instance of a class from within another, possibly using newly acquired data, and there will simply be no way of injecting an instance of the required class.

In these kinds of cases, you're best bet is to create a factory class that can handle instantiation for you. Then you can pass the factory class any newly acquired data from your main class, and if need be, the factory class can have all of the dependencies required by the class it creates, injected into the factory's constructor. 

In other words, if class A needs to create a new instance of class B using arguments assembled from request data and/or business logic, but class B ALSO has some other dependencies that need to be injected, like classes C and D, then inject classes C and D into the factory's constructor prior to injecting the factory into class A. Then class A just needs to pass it's newly acquired data to the factory's "create()" method, which will take care of instantiating class B using both the supplied arguments, plus classes C and D which were previously injected.

Let's do an example:

Here's the class that we ultimately need to create based on the results of some business logic:

```php
namepace Vendor\Namespace\Folder;
  
class TrickyToBuild
{
    private $some_string = '';
    private $an_integer = 0;
    private $dependency_1;
    private $dependency_2;
    
    public function __construct(
        $some_string,
        $an_integer,
        DependencyOne $dependency_1,
        DependencyTwo $dependency_2,
    )
    {
        $this->some_string  = $some_string;
        $this->an_integer   = $an_integer;
        $this->dependency_1 = $dependency_1;
        $this->dependency_2 = $dependency_2;
    }

}
```
 
 And here's our Factory class:
 
 ```php
 namepace Vendor\Namespace\Folder;
   
 class TrickyToBuildFactory
 {
     private $dependency_1;
     private $dependency_2;
     
     public function __construct(
         DependencyOne $dependency_1,
         DependencyTwo $dependency_2,
     )
     {
         $this->dependency_1 = $dependency_1;
         $this->dependency_2 = $dependency_2;
     }
     
     public function create( $some_string = '', $an_integer = 0 ) 
     {
        return new TrickyToBuild(
            $some_string,
            $an_integer,
            $this->dependency_1,
            $this->dependency_2
        );
     }
 
 }
```

and an interface to define our Factory class:

```php
namepace Vendor\Namespace\Folder;
  
interface TrickyFactoryInterface
{
    public function create( $some_string = '', $an_integer = 0 );
}
```

and here's our main class that will eventually need to create an instance of TrickyToBuild using the TrickyToBuildFactory that we will inject into it's constructor:

```php
namepace Vendor\Namespace\Folder;

class MainClass
{
    private $factory;
    
    public function __construct(TrickyFactoryInterface $factory)
    {
        $this->factory = $factory;
    }
    
    public function createTrickyToBuild($arguments = array())
    {
        if( $arguments blah blah blah ) {
            // do some stuff
        } else if ( $_GET['bank_password']){
            // ummm.. is this safe ?
        }
        // maybe some other logic ???
        // finally, let's create an instance of TrickyToBuild
        $tricky2build = $this->factory->create(
            'John Travolta',
            1234567890
        );
    }

}
```

and there ya have it... object instantiation using newly acquired data and dependency injection. Now during runtime, you are free to swap out the TrickyToBuildFactory with any other class that satisfies the TrickyFactoryInterface interface. This can be extremely helpful for unit testing.

> So how do we do all of that using CoffeeShop ?

well using the above example as is, the only thing that needs to be done is to create a Recipe that tells the CoffeeShop what to build when it encounters TrickyFactoryInterface. Let's make a shared instance:

```php
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        // identifier
        'TrickyFactory',
        // Fully Qualified Class Name
        'Vendor\Namespace\Folder\TrickyToBuildFactory',
        // filters
        array(
            'Vendor\Namespace\Folder\TrickyFactoryInterface'
        ),
        // ingredients
        array(), 
        // brew type (coffeemaker)
        EventEspresso\core\services\container\CoffeeMaker::BREW_SHARED
    )
);
```

Assuming that the DependencyOne and DependencyTwo classes are not themselves complicated to instantiate, and use PSR-4 compatible namespacing, then we don't even need to specify those in the Recipe, and they will still get injected correctly.

And... uhhhh... **THAT'S IT!!!**

If we **REALLY** want to get fancy though, we can move the logic within our dedicated TrickyToBuildFactory class directly into the CoffeeShop as a Closure (sorry... no coffee related term for that one).

```php
// can't pass properties directly to a Closure
$coffee_shop = $this->CoffeeShop;
// create a Closure called "TrickyToBuildFactory"
$this->CoffeeShop->addClosure(
    'TrickyToBuildFactory',
    function($some_string, $an_integer) use ($coffee_shop) {
        return new TrickyToBuild(
            $some_string,
            $an_integer,
            $coffee_shop->brew('DependencyOne'),
            $coffee_shop->brew('DependencyTwo')
        );
    }
);
```

now instead of type hinting for TrickyFactoryInterface, our MainClass would type hint for TrickyToBuildFactory (or you could also create a Recipe that specifies TrickyFactoryInterface as a filter for TrickyToBuildFactory and keep main class as is). At run time, such as in unit testing, instead of creating a mock class of the TrickyToBuildFactory, you would simply change the above Closure.
