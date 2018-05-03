<?php

namespace EventEspresso\core\services\commands;

use DomainException;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * Class CommandHandlerManager
 * Connects a Command with its corresponding Command Handler
 * Command Handlers can be specified explicitly using addCommandHandler()
 * or determined dynamically if the Command and Command Handler share the exact same namespace
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CommandHandlerManager implements CommandHandlerManagerInterface
{

    /**
     * @var CommandHandlerInterface[] $command_handlers
     */
    protected $command_handlers;

    /**
     * @type LoaderInterface $loader
     */
    private $loader;


    /**
     * CommandHandlerManager constructor
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    /**
     * By default, Commands and CommandHandlers would normally
     * reside in the same folder under the same namespace,
     * and the names of the two classes would only differ in that
     * one ends in "Command" and the other ends in "CommandHandler".
     * However, if you wanted to utilize a CommandHandler from somewhere else,
     * then this method allows you to add that CommandHandler and specify the FQCN
     * (Fully Qualified ClassName) for the Command class that it should be used for.
     * For example:
     *      by default the "Vendor\some\namespace\DoSomethingCommand"
     *      would resolve to using "Vendor\some\namespace\DoSomethingCommandHandler"
     *      but if you wanted to instead process that commend using:
     *      "Vendor\a\totally\different\namespace\for\DoSomethingCommandHandler"
     *      then the following code:
     *      $CommandHandlerManager = $this->loader->getShared( 'CommandHandlerManagerInterface' );
     *      $CommandHandlerManager->addCommandHandler(
     *          new Vendor\a\totally\different\namespace\for\DoSomethingCommandHandler(),
     *          'Vendor\some\namespace\DoSomethingCommand'
     *      );
     *      would result in the alternate CommandHandler being used to process that Command
     *
     * @param CommandHandlerInterface $command_handler
     * @param string                  $fqcn_for_command Fully Qualified ClassName for Command
     * @return void
     * @throws InvalidCommandHandlerException
     */
    public function addCommandHandler(CommandHandlerInterface $command_handler, $fqcn_for_command = '')
    {
        $command = ! empty($fqcn_for_command)
            ? $fqcn_for_command
            : str_replace('CommandHandler', 'Command', get_class($command_handler));
        if (empty($command)) {
            throw new InvalidCommandHandlerException($command);
        }
        $this->command_handlers[ $command ] = $command_handler;
    }


    /**
     * @param CommandInterface    $command
     * @param CommandBusInterface $command_bus
     * @return mixed
     * @throws DomainException
     * @throws CommandHandlerNotFoundException
     */
    public function getCommandHandler(CommandInterface $command, CommandBusInterface $command_bus = null)
    {
        $command_name = get_class($command);
        $command_handler = apply_filters(
            'FHEE__EventEspresso_core_services_commands_CommandHandlerManager__getCommandHandler__command_handler',
            str_replace('Command', 'CommandHandler', $command_name),
            $command
        );
        $handler = null;
        // has a command handler already been set for this class ?
        // if not, can we find one via the FQCN ?
        if (isset($this->command_handlers[ $command_name ])) {
            $handler = $this->command_handlers[ $command_name ];
        } elseif (class_exists($command_handler)) {
            $handler = $this->loader->getShared($command_handler);
        }
        // if Handler requires an instance of the CommandBus, but that has not yet been set
        if ($handler instanceof CompositeCommandHandler && ! $handler->commandBus() instanceof CommandBusInterface) {
            if (! $command_bus instanceof CommandBusInterface) {
                throw new DomainException(
                    esc_html__(
                        'CompositeCommandHandler classes require an instance of the CommandBus.',
                        'event_espresso'
                    )
                );
            }
            $handler->setCommandBus($command_bus);
        }
        if ($handler instanceof CommandHandlerInterface) {
            return $handler;
        }
        throw new CommandHandlerNotFoundException($command_handler);
    }
}
