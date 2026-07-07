<?php

namespace EventEspresso\core\services\commands;

/**
 * Class CompositeCommandHandler
 * abstract parent class for CommandHandlers
 * that can create additional Command objects
 * and pass them to the Command Bus for processing
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.38
 */
abstract class CompositeCommandHandler extends CommandHandler
{
    private CommandBusInterface $command_bus;

    private CommandFactoryInterface $command_factory;


    public function __construct(CommandBusInterface $command_bus, CommandFactoryInterface $command_factory)
    {
        $this->command_bus     = $command_bus;
        $this->command_factory = $command_factory;
    }


    public function setCommandBus(CommandBusInterface $command_bus)
    {
        $this->command_bus = $command_bus;
    }


    public function commandBus(): CommandBusInterface
    {
        return $this->command_bus;
    }


    public function commandFactory(): CommandFactoryInterface
    {
        return $this->command_factory;
    }
}
