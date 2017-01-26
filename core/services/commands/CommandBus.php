<?php
namespace EventEspresso\core\services\commands;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\commands\middleware\CommandBusMiddlewareInterface;
use EventEspresso\core\services\commands\middleware\InvalidCommandBusMiddlewareException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CommandBus
 * Routes Command objects to their respective CommandHandlers,
 * which can then utilize services within the core domain to complete the requested command.
 * Normally the CommandBus would be injected into the constructors of classes using it's interface
 *      public function __construct( CommandBusInterface $command_bus )
 * and then used something like this:
 *      $result = $this->command_bus->execute(
 *          new Vendor\some\namespace\to\MyCommand(
 *              new SomeEntity( $_GET['data_from_HTTP_request'] )
 *          )
 *      );
 * the benefit of using the CommandBus is that it allows other request types,
 * such as the API, or CLI, to route data to the same services,
 * with less duplication within the client code:
 *      $result = $this->command_bus->execute(
 *          new Vendor\some\namespace\to\MyCommand(
 *              new SomeEntity( $data_from_API_request )
 *          )
 *      );
 * Event Espresso CommandBus Commands, however, are self executing,
 * meaning they are capable of routing themselves to the CommandBus,
 * because they possess their own internal reference to it.
 * So as long as your client code has a reference to the EE_Registry,
 * it can use the create() method to generate the required Command objects,
 * which will automatically handle resolving their dependency on the CommandBus.
 * This means you can simply do the following in your client code:
 *      $result = $this->registry
 *          ->create(
 *              'Vendor\some\namespace\to\MyCommand',
 *              array( $request_data )
 *          )
 *          ->execute();
 * without having to inject the CommandBus,
 * because you will likely have a reference to EE_Registry
 * (or DI container) in your client code already
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CommandBus implements CommandBusInterface
{

    /**
     * @type CommandHandlerManagerInterface $command_handler_manager
     */
    private $command_handler_manager;

    /**
     * @type CommandBusMiddlewareInterface[] $command_bus_middleware
     */
    private $command_bus_middleware;



    /**
     * CommandBus constructor
     *
     * @param CommandHandlerManagerInterface  $command_handler_manager
     * @param CommandBusMiddlewareInterface[] $command_bus_middleware
     */
    public function __construct(
        CommandHandlerManagerInterface $command_handler_manager,
        $command_bus_middleware = array()
    ) {
        $this->command_handler_manager = $command_handler_manager;
        $this->command_bus_middleware = is_array($command_bus_middleware)
            ? $command_bus_middleware
            : array($command_bus_middleware);
    }



    /**
     * @return CommandHandlerManagerInterface
     */
    public function getCommandHandlerManager()
    {
        return $this->command_handler_manager;
    }



    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    public function execute($command)
    {
        if ( ! $command instanceof CommandInterface) {
            throw new InvalidDataTypeException(__METHOD__ . '( $command )', $command, 'CommandInterface');
        }
        // expose the command to any CommandBus middleware classes
        // so that they can execute their logic on the command
        $middleware = function ($command) {
            // do nothing, just need an empty shell to pass along as the last middleware
        };
        while ($command_bus_middleware = array_pop($this->command_bus_middleware)) {
            if ( ! $command_bus_middleware instanceof CommandBusMiddlewareInterface) {
                throw new InvalidCommandBusMiddlewareException($command_bus_middleware);
            }
            $middleware = function ($command) use ($command_bus_middleware, $middleware) {
                return $command_bus_middleware->handle($command, $middleware);
            };
            $middleware($command, $middleware);
        }
        return $this->command_handler_manager
            ->getCommandHandler($command)
            ->handle($command);
    }


}
// End of file CommandBus.php
// Location: core/services/commands/CommandBus.php