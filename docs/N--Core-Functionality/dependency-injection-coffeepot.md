# Dependency Injection and The Event Espresso CoffeeShop

As programmers, we love coffee. You could say we are dependent on coffee.
If we could, we would probably inject that dependency right into our blood streams!
Well we can't do that with coffee... but we **can** do it with our classes.

[Dependency Injection](http://www.phptherightway.com/#dependency_injection), is the practice of taking the objects that an entity depends on, and passing them into that entity, as opposed to creating them from within. This means that the objects being passed into the entity can be substituted at runtime for alternatives. This has many useful benefits such as decreasing coupling, increasing flexibility, and improving testability, among others.

So instead of :

```
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

```
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

###CoffeeShop Dependency Injection (DI) Container

Now the only "shortcoming" with injecting your dependencies like this, is that any code that wants to use ` MyClass ` is responsible for providing an instance of ` Thing ` when creating ` MyClass `. And this can be tedious. Thankfully, Dependency Injection (DI) containers can manage this responsibility for you. A DI container is an object (or group of objects working together) that knows how to instantiate classes and provide them with the dependencies they require. And because we love coffee so much at Event Espresso, our DI container is called **CoffeeShop**.

We'll take care of the initial setup of the **CoffeeShop**, as well as making sure that it's available to all Event Espresso Modules, Payment Methods, Addons, etc. So we'll skip that part and get right to showing you how it works.

So let's assume the following for our example:

 - that the **CoffeeShop** DI container is accessible in your controller via ` $this->CoffeeShop() `
 - you want to load a class named ` MyClass ` that requires the ` EEM_Attendee ` model in order to retrieve some data from the database
 - you are using PSR-4 compatible namespaces, and ` MyClass ` is located in the ` \Vendor\Namespace\Folder\ ` directory

You would first have to add the ` EEM_Attendee ` model as a constructor param for the ` MyClass ` class like this:

```
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

```
$my_class = $this->CoffeeShop()->brew( 'Vendor\Namespace\Folder\MyClass' );
```

and... uhh... **THAT'S IT!!!**

Because you were using PSR-4 compatible namespaces, and because we had already instructed the **CoffeeShop** DI container on how to inject our models into other classes, ` MyClass ` automatically received an instance of the ` EEM_Attendee ` model as a constructor param.

###Passing Additional Arguments to your Constructors

> That's cool, but what if ` MyClass ` required some other constructor parameters, like an integer and a string ?

No problem, first you'll need to add those parameters to your class constructor:

```
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

```
$my_class = $this->CoffeeShop()->brew(
    'Vendor\Namespace\Folder\MyClass',
    array( 123, 'yada yada yada' )
);
```

Add as many parameters as you want, **CoffeeShop** will automatically resolve your class's dependencies. But remember if you need to pass an argument **AFTER** an injected dependency, then you need to leave space for it:

```
$my_class = $this->CoffeeShop()->brew(
    'Vendor\Namespace\Folder\MyClass',
    array( 123, 'yada yada yada', null, 'another string' )
);
// where null will get replaced by the EEM_Attendee model
```

###CoffeeShop Recipes - Configuring New Dependencies

> what if I want to inject some other class of my own that CoffeeShop doesn't already know about ?

Well before that new dependency can be injected, we need to tell **CoffeeShop** about that class, where to find it, and exactly how to load it. We do this with **Recipes**, which are a set of instructions, that tell **CoffeeShop** about your class.

So let's create that other class and add it as a parameter to ` MyClass `.

file: Vendor\Namespace\OtherFolder\OtherClass.php
```
namepace Vendor\Namespace\OtherFolder;

class OtherClass
{
    public function __construct()
    {
    }
}
```

file: Vendor\Namespace\Folder\MyClass.php
```
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

Now to tell **CoffeeShop** about this other class, we need to create a **Recipe** for it

```
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        'Vendor\Namespace\OtherFolder\OtherClass'
    )
);
```

and... uhh... **THAT'S IT!!!**

**CoffeeShop** will now inject your ` OtherClass ` anywhere that you type hint for it.

**Note: By default, anytime you call ` CoffeeShop::brew() ` you will receive a new unique instantiation of the requested class. So calling ` CoffeeShop::brew() ` multiple times in a row with the same parameters will result in multiple instantiations of the same class. These are separate unique objects.**

> What if I don't want a new instantiation, but instead want a cached copy of an existing object that doesn't need to be unique?

###CoffeeMakers and Recipe Types

Internally, **CoffeeShop** uses a series of **CoffeeMaker** classes which determine how and when your objects are constructed and returned. When creating a **Recipe** you can set which **CoffeeMaker** to use for your brew.

There are currently three types:

 - **NewCoffeeMaker** - this is the default **CoffeeMaker** and as already explained, will return a newly instantiated object every time one is requested. After performing all of the logic for determining how to build your object and resolve it's dependencies, the results are placed in a Closure and stored in the "reservoir" Collection so that the next time the class is required, we simply call the Closure.

 - **SharedCoffeeMaker** - instead of returning a newly instantiated object every time, this **CoffeeMaker** builds an object **once** and then stores that object in the "carafe" Collection so that the next time the class is required, we simply return that previously built object. Therefore the exact same instance is returned every time it is requested.

 - **LoadOnlyCoffeeMaker** - sometimes we only need to load a file that contains a class that another class depends on. Examples are abstract parent classes, interfaces, etc. and we don't and/or can not actually instantiate anything for these classes anyways. This **CoffeeMaker** doesn't do anything other than ensure the class files are loaded.

To specify which **CoffeeMaker** should be used by your **Recipe**, you need to pass one of the following class constants as the second argument:

  - EventEspresso\core\services\container\CoffeeMaker::BREW_NEW
  - EventEspresso\core\services\container\CoffeeMaker::BREW_SHARED
  - EventEspresso\core\services\container\CoffeeMaker::BREW_LOAD_ONLY

like so:

```
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        'Vendor\Namespace\OtherFolder\OtherClass',
        EventEspresso\core\services\container\CoffeeMaker::BREW_SHARED
    )
);
```

This would result in the exact instance of ` OtherClass` being returned every time it was requested.

###Type Hinting for Interfaces and Filters (Aliases)

> To do Dependency Inversion properly you shouldn't type hint for concrete classes like that, but instead type hint for interfaces. How does CoffeeShop know what concrete class to use if I'm not specifying that in my type hinting ?

The third parameter for your **Recipe** allows you to pass an array of class "aliases", that (keeping with the Coffee analogy) we will refer to as **Filters**. **Filters** allow you to specify alternative names that you want **CoffeeShop** to recognize as referencing the class your **Recipe** is for.

If you wanted to type hint for an interface that is implemented by ` OtherClass`, you would first need to change your class declaration and constructor for the class injecting it:


file: Vendor\Namespace\OtherFolder\OtherClass.php
```
namepace Vendor\Namespace\OtherFolder;

class OtherClass implements OtherInterface
{
    public function __construct()
    {
    }
}
```

file: Vendor\Namespace\Folder\MyClass.php
```
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
        OtherInterface $another_class
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

```
$this->CoffeeShop->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        'Vendor\Namespace\OtherFolder\OtherClass',
        EventEspresso\core\services\container\CoffeeMaker::BREW_SHARED,
        array( 'Vendor\Namespace\OtherFolder\OtherInterface' )
    )
);
```

Now anytime **CoffeeShop** encounters a class that type hints for ` OtherInterface ` it will inject the cached instance of ` OtherClass `.


###WILDCARD * Recipes

Building Recipes for EVERY single class would be really tedious, so CoffeeShop supports Wildcards in both the class names and filepaths.
Here's a Recipe that handles ALL of the standard core EE db model classes:

```
$coffee_pot->addRecipe(
    new EventEspresso\core\services\container\Recipe(
        'EEM_*', // targets any class using the "EEM_" prefix
        CoffeeMaker::BREW_SHARED, // we want shared services (like singletons)
        array(),	// no filters (aliases)
        EE_MODELS . '*.model.php' // replaces wildcard with full class name
    )
);
$attendee_model = $coffee_pot->brew( 'EEM_Attendee' );
$registration_model = $coffee_pot->brew( 'EEM_Registration' );
$transaction_model = $coffee_pot->brew( 'EEM_Transaction' );
```
all of the returned objects are correct and are all handled by one Recipe