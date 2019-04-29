<?php

namespace EventEspresso\core\services\commands;

/**
 * Interface CommandHandlerManagerInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandHandlerManagerInterface
{

    /**
     * !!! IMPORTANT !!!
     * If overriding the default CommandHandler for a Command,
     * be sure to also override CommandHandler::verify(),
     * or else an Exception will be thrown when the CommandBus
     * attempts to verify that the incoming Command matches the Handler
     *
     * @param CommandHandlerInterface $command_handler
     * @param string $fqcn_for_command Fully Qualified ClassName for Command
     * @return void
     * @throws InvalidCommandHandlerException
     */
    public function addCommandHandler(CommandHandlerInterface $command_handler, $fqcn_for_command = '');



    /**
     * @param CommandInterface    $command
     * @param CommandBusInterface $command_bus
     * @return mixed
     */
    public function getCommandHandler(CommandInterface $command, CommandBusInterface $command_bus = null);
}
