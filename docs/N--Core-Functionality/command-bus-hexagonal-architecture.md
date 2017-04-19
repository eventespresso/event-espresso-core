# Command Bus and Hexagonal Architecture

As Event Espresso grows in complexity, it has become more and more important to have an easy, efficient, and secure way to access the plugin's business logic regardless of the request type and/or client being used. For example, one might need to create a Registration during the frontend registration checkout process, or via the admin, or via the REST API, or via an addon such as the Attendee Mover. In order to achieve this, we have implemented a simple Command Bus that consists of three main components:

 * **Commands** which are simple Data Transfer Objects (DTOs) for validating and holding data
 * **Command Handlers** which process the data received from the Command objects 
 * **The Command Bus** which delivers the Command objects to the Command Handlers and returns the results 
 
 Commands get created within your client code and passed to the Command Bus, which delivers the Command to it's corresponding Command Handler. The Command Handler executes it's business logic using the data provided by the Command, and then returns it's results to the Command Bus, which returns them to the client code where the Command was first passed to the Command Bus. This composition allows your business logic to be accessed by any kind of request type or client. This is why the Command Bus is a common apparatus in systems utilizing **Hexagonal Architecture**, AKA **Ports and Adapters**. Hexagonal Architecture is simply a way of visualizing multiple request types or clients, as "users" connecting to the different sides of a hexagon, which represents the business logic of a system.
 
### Anatomy of a Command
 
 As stated above, Commands are simple DTOs where the only requirement is that they extend the ` \EventEspresso\core\services\commands\Command ` class and remain immutable by keeping all properties private and not providing any mechanism for changing any of the data they contain. Because of this, all data should be added via the constructor:
 
```php
use EventEspresso\core\services\commands\Command;

class CreateThingCommand extends Command
{

    /**
     * @var int $int_property
     */
    private $int_property;


    /**
     * @var string $int_property
     */
    private $string_property;


    /**
     * CreateThingCommand constructor.
     *
     * @param $int_property
     * @param $string_property
     */
    public function __construct($int_property, $string_property)
    {
        $this->int_property = $int_property;
        $this->string_property = $string_property;
    }

}
```

Data is therefore accessed via getters:


```php

    /**
     * @return int
     */
    public function getIntProperty()
    {
        return $this->int_property;
    }


    /**
     * @return string
     */
    public function getStringProperty()
    {
        return $this->string_property;
    }

```

now that said, private setters are still recommended as a way to encapsulate validation logic:

```php

    /**
     * CreateThingCommand constructor.
     *
     * @param $int_property
     * @param $string_property
     * @throws InvalidArgumentException
     */
    public function __construct($int_property, $string_property)
    {
        $this->setIntProperty($int_property);
        $this->setStringProperty($string_property);
    }
    

    /**
     * @param int $int_property
     */
    private function setIntProperty($int_property)
    {
        $this->int_property = absint($int_property);
    }


    /**
     * @param string $string_property
     * @throws InvalidArgumentException
     */
    private function setStringProperty($string_property)
    {
        if(! is_string($string_property)){
            throw new InvalidArgumentException();
        }
        $this->string_property = $string_property;
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
        return $this->command_bus->execute(
            new CreateThingCommand(1, 'string')
        );
    }

}

```

EZ PZ. The CommandBus class will take care of delivering the Command to the corresponding Command Handler and capture any results that are returned.

### Anatomy of a Command Handler

Command Handlers are typically located in the same location as their Command objects, and are named exactly the same, except that "Handler" is appended to the class name. So in our example, the CreateThingCommand would have an accompanying CreateThingCommandHandler class located in the same folder. 

Command Handlers need to extend the ` CommandHandler ` class and have one public method required by their interface:

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
    }
    
}
    
```

It's a good idea to verify that the incoming Command is of the **correct** instance:

```php

    /**
     * @param  CommandInterface $command
     * @return mixed
     * @throws InvalidArgumentException
     */
    public function handle(CommandInterface $command)
    {
        /** @var CreateThingCommand $command */
        if ( ! $command instanceof CreateThingCommand) {
            throw new InvalidArgumentException();
        }
    }
    
```

from there, it's simply a matter of retrieving data from the Command DTO using it's getter methods and doing whatever needs to be done. Any data returned from the ` handle() ` method will be returned to the client code that passed the Command to the Command Bus.

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
        $int = $command->getIntProperty();
        $string = $command->getStringProperty();
        return New Thing($int, $string);
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
        $int = $command->getIntProperty();
        $string = $command->getStringProperty();
        $existing_thing = $this->thing_model->find_by_id($int);
        if ($existing_thing instanceof Thing) {
            $existing_thing->setString($string);
            return $existing_thing;
        }
        return New Thing($int, $string);
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
        $create_thing_command = new CreateThingCommand(1, 'string');
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
     * @return CreateThingCommand
     * @throws InvalidArgumentException
     */
    public static function fromHttpGetRequest()
    {
        return new self(
            isset($_GET['int']) ? $_GET['int'] : 0,
            isset($_GET['string']) ? $_GET['string'] : ''
        );
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
            CreateThingCommand::fromHttpGetRequest()
        );
    }

```

As you can see, as long as the correct parameters were present in the $_GET super global, this Command could be created from anywhere, which helps to reduce code duplication. 

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


