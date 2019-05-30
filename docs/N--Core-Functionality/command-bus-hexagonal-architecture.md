# Command Bus and Hexagonal Architecture

As Event Espresso grows in complexity, it has become more and more important to have an easy, efficient, and secure way to access the plugin's business logic regardless of the request type and/or client being used. For example, one might need to create a Registration during the frontend registration checkout process, or via the admin, or via the REST API, or via an addon such as the Attendee Mover. In order to achieve this, we have implemented a simple Command Bus that consists of three main components:

 * **Commands** which are simple Data Transfer Objects (DTOs) for validating and holding data
 * **Command Handlers** which process the data received from the Command objects 
 * **The Command Bus** which delivers the Command objects to the Command Handlers and returns the results 
 
 Commands get created within your client code and passed to the Command Bus, which delivers the Command to it's corresponding Command Handler. The Command Handler executes it's business logic using the data provided by the Command, and then returns it's results to the Command Bus, which returns them to the client code where the Command was first passed to the Command Bus. This composition allows your business logic to be accessed by any kind of request type or client. This is why the Command Bus is a common apparatus in systems utilizing **Hexagonal Architecture**, AKA **Ports and Adapters**. Hexagonal Architecture is simply a way of visualizing multiple request types or clients, as "users" connecting to the different sides of a hexagon, which represents the business logic of a system.
 
> Okay, but what kind of logic should be made into Commands ?

When trying to decide on whether or not some particular business logic should be encapsulated within a Command, or whether it should be part of some other system, a really good metric for making that decision is whether or not the logic modifies the domain in any way.
In other words, any logic that adds/edits/deletes data, or changes a domain entity in any way, should be converted into a Command. Even if that change is temporary, such as logging a user into a system.
Logic that simply gathers data, and/or "couriers" it around within the system, and/or has no persisted changes, does not need to be encapsulated within a Command.
 
### Anatomy of a Command
 
 As stated above, Commands are simple DTOs where the only requirement is that they extend the ` \EventEspresso\core\services\commands\Command ` class and remain immutable by keeping all properties private and not providing any mechanism for changing any of the data they contain. Because of this, all data should be added via the constructor:
 
```php
use EventEspresso\core\services\commands\Command;

class CreateThingCommand extends Command
{

    /**
     * @var ClassA $object_A
     */
    private $object_A;


    /**
     * @var ClassB $object_B
     */
    private $object_B;


    /**
     * CreateThingCommand constructor.
     *
     * @param ClassA $object_A
     * @param ClassB $object_B
     */
    public function __construct($object_A, $object_B)
    {
        $this->object_A = $object_A;
        $this->object_B = $object_B;
    }

}
```

Data is therefore accessed via getters:


```php

    /**
     * @return ClassA
     */
    public function getObjectA()
    {
        return $this->object_A;
    }


    /**
     * @return ClassB
     */
    public function getObjectB()
    {
        return $this->object_B;
    }

```

now that said, private setters are still recommended as a way to encapsulate validation logic:

```php

    /**
     * CreateThingCommand constructor.
     *
     * @param ObjectA $object_A
     * @param ObjectB $object_B
     * @throws InvalidArgumentException
     */
    public function __construct($object_A, $object_B)
    {
        $this->setObjectA($object_A);
        $this->setObjectB($object_B);
    }
    

    /**
     * @param ClassA $object_A
     */
    private function setObjectA($object_A)
    {
         if(! $object_A instanceof ClassA){
             throw new InvalidArgumentException();
         }
       $this->object_A = $object_A;
    }


    /**
     * @param ClassB $object_B
     * @throws InvalidArgumentException
     */
    private function setObjectB($object_B)
    {
        if(! $object_B instanceof ClassB){
            throw new InvalidArgumentException();
        }
        $this->object_B = $object_B;
    }
    
```

Although, if passing objects, you can also just type hint for them in the constructor:

```php
   /**
     * CreateThingCommand constructor.
     *
     * @param $object_A
     * @param $object_B
     * @throws InvalidArgumentException
     */
    public function __construct(ObjectA $object_A, ObjectB $object_B)
    {
        $this->setObjectA($object_A);
        $this->setObjectB($object_B);
    }
```

And that's all there is to creating a basic Command DTO. 

### Get on the Bus

> so... how do you use a Command once you have created it?

Simple, just pass it to the Command Bus, which should be injected into the constructors for any of your client code classes that need it:

```php

use \EventEspresso\core\services\commands\CommandBus;

class ClientCode {

    /**
     * @var CommandBus $command_bus
     */
    private $command_bus;


    /**
     * ClientCode constructor.
     *
     * @param CommandBus $command_bus
     */
    public function __construct(CommandBus $command_bus)
    {
        $this->command_bus = $command_bus;
    }


    /**
     * @return Thing
     */
    public function getThing()
    {
        $object_model = get_object_model();
        $object_A = $object_model->find_by_id($GET['object_a_id']);
        $object_B = $object_model->find_by_id($GET['object_b_id']);
        return $this->command_bus->execute(
            new CreateThingCommand($object_A, $object_B)
        );
    }

}

```

EZ PZ. The CommandBus class will take care of delivering the Command to the corresponding Command Handler and capture any results that are returned.

> uh... ya ok... but how do I get an instance of CommandBus in the first place to pass to my client code class constructor?

Currently we are still using the EE_Registry legacy class for loading throughout most of core, but will eventually be switching over to using the CoffeeShop DI container. Both classes are capable of automatically injecting dependencies into your classes. If you are using **\Fully\Qualified\ClassNames** then you can use `EE_Registry::create()` for generating your client code classes and their dependencies will get automatically injected:

```php
$my_class = EE_Registry::instance()->create('\Vendor\namespace\ClientCode');

```

For more information, plz see :
- [Legacy Dependency Injection](legacy-dependency-injection.md)
- [Dependency Injection and the CoffeeShop DI container](dependency-injection-coffeepot.md)

### Anatomy of a Command Handler

Command Handlers should be located in the same location as their Command objects, and have exactly the same class name, except that "Handler" is appended to it. 

So in our example, the `CreateThingCommand` would have an accompanying `CreateThingCommandHandler` class located in the same folder. 

(If you want to deviate from this standard, be sure to also override `CommandHandler::verify()`, or else an Exception will be thrown when the CommandBus
attempts to verify that the incoming Command matches the Handler.) 

Command Handlers need to extend the `CommandHandler ` class and have one public method required by their interface:

```php

 use EventEspresso\core\services\commands\CommandHandler;
 use EventEspresso\core\services\commands\CommandInterface;
 
 class CreateThingCommandHandler extends CommandHandler
 {

   /**
     * @param  CommandInterface $command
     * @return mixed
     */
    public function handle(CommandInterface $command)
    {
        // logic for processing command
        // return result   
    }
    
}
    
```

Any data returned from the ` handle() ` method will be returned to the client code that passed the Command to the Command Bus.

```php

    /**
     * @param  CommandInterface $command
     * @return mixed
     * @throws InvalidArgumentException
     */
    public function handle(CommandInterface $command)
    {
        /** @var CreateThingCommand $command */
        if (! $command instanceof CreateThingCommand) {
            throw new InvalidArgumentException();
        }
        $object_A = $command->getObjectA();
        $object_B = $command->getObjectB();
        return new Thing($object_A, $object_B);
    }
    
```

> What if my Command Handler is dependent on some other classes to do it's job? Do I need to pass those along inside the Command?

No, the Command objects themselves should only transmit data and not be a "courier" for other services. Any class dependencies for your Command Handler can simply be added as constructor parameters and the Command Bus will automagically inject those dependencies for you when instantiating your Handler.

```php

class CreateThingCommandHandler extends CommandHandler
{


    /**
     * @var ThingModel $thing_model
     */
    private $thing_model;



    /**
     * CreateThingCommandHandler constructor.
     *
     * @param ThingModel $thing_model
     */
    public function __construct(ThingModel $thing_model)
    {
        $this->thing_model = $thing_model;
    }


    /**
     * @param  CommandInterface $command
     * @return mixed
     * @throws InvalidArgumentException
     */
    public function handle(CommandInterface $command)
    {
        /** @var CreateThingCommand $command */
        if (! $command instanceof CreateThingCommand) {
            throw new InvalidArgumentException();
        }
        $object_A = $command->getObjectA();
        $object_B = $command->getObjectB();
        // in the weird world of this example, the ID for Thing objects 
        // is created by combining the IDs from object A and object B
        $existing_thing = $this->thing_model->find_by_id($object_A->ID . '.' . $object_B->ID);
        if ($existing_thing instanceof Thing) {
            $existing_thing->setObjectA($object_A);
            $existing_thing->setObjectB($object_B);
            return $existing_thing;
        }
        return new Thing($object_A, $object_B);
    }

}    

```

> ya ok, although I'll likely want to inject some class for checking capabilities because I don't want any ol' Joe being able to create a Thing!!!

### Capabilities Checks

One of the benefits of using the Command Bus is that Commands can be run through a series of "middleware" services before being passed to the their respective Command Handlers. One of these middleware services (actually the only one at the moment) checks that the current user executing the request has the correct capabilities to do so.

This is setup by implementing the CommandRequiresCapCheckInterface on your Command. This will require your Command to include a method named ` getCapCheck() ` that returns an instance of ` EventEspresso\core\domain\services\capabilities\CapCheck `

```php

    /**
     * @return \EventEspresso\core\domain\services\capabilities\CapCheckInterface
     */
    public function getCapCheck()
    {
         if ( ! $this->cap_check instanceof CapCheckInterface) {
             $this->cap_check = new CapCheck('ee_create_thing', 'create_new_thing');
         }
         return $this->cap_check;
   }

```

The CapCheck object requires two parameters with an optional third:

 * $capability (string|array) - the capability to be checked, like: 'ee_edit_thing', or an array of capability strings
 * $context (string)          - what the user is attempting to do, like: 'create_new_thing'
 * $ID (int)                  - (optional) ID for item where current_user_can() is being called from


The CapCheck object can also be set after the Command is created via a setter:

```php

    /**
     * @return Thing
     */
    public function getThing()
    {
        $object_model = get_object_model();
        $object_A = $object_model->find_by_id($GET['object_a_id']);
        $object_B = $object_model->find_by_id($GET['object_b_id']);

        $create_thing_command = new CreateThingCommand($object_A, $object_B);
        $create_thing_command->setCapCheck(
            new CapCheck('ee_create_thing', 'create_new_thing')
        );
        return $this->command_bus->execute($create_thing_command);
    }

```

Using the setter is especially handy if you need to use the third parameter on the CapCheck class to check whether the user has the correct capabilities for an object with a specific ID.

### Hexagonal Architecture

> So wait... why don't I just create my new Thing object directly in my client code and bypass all of this fancy razzle dazzle nonsense?!?!

Well you could, but you would have to do all of the following:

 * inject any dependencies that your Command Handler has into your client code class (as well as the dependencies for any other Command Handlers you may have also be indirectly utilizing)
 * validate ALL of the data that was being validated by the Command DTO
 * perform any capabilities checks required
 * perform any other functionality that could get added in the future as additional Command Bus middleware classes, such as logging, or triggering actions, or initiating transactional queries, etc, etc
 
 and that's all fine, but what if you need to then access all of that same logic... via the REST API ? or via an AJAX request? or via the admin? or via CLI? etc, etc, etc...
 You would need to duplicate ALL of the above logic for every request type or client that you wanted to support. The Command Bus allows you to place all of your business logic in one easy to access place that can be used from virtually anywhere. To support this even further, it is not uncommon to add static factory methods to your Commands to facilitate their creation using specific source data. So for example, you may have a static method for generating a Command using data from an HTTP GET request:
 
 ```php
    
    /**
    * @param  int $object_a_id
    * @param  int $object_b_id
    * @return CreateThingCommand
    * @throws InvalidArgumentException
    */
    public static function fromObjectIds($object_a_id, $object_b_id)
    {
        $object_model = get_object_model();
        $object_A = $object_model->find_by_id($object_a_id);
        $object_B = $object_model->find_by_id($object_b_id);
        return new self($object_A, $object_B);
    }

```

then in client code:

```php
    
    /**
    * @return Thing
    */
    public function getThingFromHttpGetRequest()
    {
        return $this->command_bus->execute(
            CreateThingCommand::fromObjectIds(
                isset($_GET['object_a_id']) ? $GET['object_a_id'] : 0,
                isset($_GET['object_b_id']) ? $GET['object_b_id'] : 0
            )
        );
    }

```

As you can see, as long as valid IDs are provided, this Command could be created from anywhere, which helps to reduce code duplication. 

> Ya okay, I can see how that would be helpful, but... what if I wanted to use an existing Command, but needed to implement some different logic in the Command Handler? Cuz I like to do things MY WAY!!!

The Command Bus actually uses a class called ` \EventEspresso\core\services\commands\CommandHandlerManager ` which has a method called ` addCommandHandler() `. THis method can be used for overriding the default Command Handler employed to resolve a Command. 	 

By default, Commands and CommandHandlers would normally reside in the same folder under the same namespace, and the names of the two classes would only differ in that one ends in "Command" and the other ends in "CommandHandler". However, if you wanted to utilize a CommandHandler from somewhere else, then this method allows you to add that CommandHandler and specify the FQCN (Fully Qualified ClassName) for the Command class that it should be used for.

For example: 
by default the 

    "Vendor\some\namespace\DoSomethingCommand" 
      
would resolve to using 

    "Vendor\some\namespace\DoSomethingCommandHandler"
    
but if you wanted to instead process that command using:

"Vendor\a\totally\different\namespace\for\DoSomethingCommandHandler"

then the following code:

```php

$CommandHandlerManager = EE_Registry::instance()->create(
    'CommandHandlerManagerInterface'
);
$CommandHandlerManager->addCommandHandler(
    new Vendor\a\totally\different\namespace\for\DoSomethingCommandHandler(),
    'Vendor\some\namespace\DoSomethingCommand'
);

```

would result in the alternate CommandHandler being used to process that Command.

This can be used to provide additional behaviour to an existing Command Handler by extending the existing class:

```php

class DoSomethingCommandHandler extends CreateThingCommandHandler
{

    /**
     * @param  CommandInterface $command
     * @return mixed
     * @throws InvalidArgumentException
     */
    public function handle(CommandInterface $command)
    {
       $thing = parent::handle($command);
       doSomething($thing);
       return thing ;
    }

}    

```