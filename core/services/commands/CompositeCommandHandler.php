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

    /**
     * @type CommandBusInterface $command_bus
     */
    private $command_bus;

    /**
     * @type CommandFactoryInterface $command_factory
     */
    private $command_factory;


    /**
     * CompositeCommandHandler constructor.
     *
     * @param CommandBusInterface     $command_bus
     * @param CommandFactoryInterface $command_factory
     */
    public function __construct(CommandBusInterface $command_bus, CommandFactoryInterface $command_factory)
    {
        $this->command_bus = $command_bus;
        $this->command_factory = $command_factory;
    }


    /**
     * @param CommandBusInterface $command_bus
     */
    public function setCommandBus(CommandBusInterface $command_bus)
    {
        $this->command_bus = $command_bus;
    }


    /**
     * @return CommandBusInterface
     */
    public function commandBus()
    {
        return $this->command_bus;
    }


    /**
     * @return CommandFactoryInterface
     */
    public function commandFactory()
    {
        return $this->command_factory;
    }
}
