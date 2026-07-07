<?php

namespace EventEspresso\core\services\commands;

/**
 * Interface CommandBusInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandBusInterface
{
    public function getCommandHandlerManager(): CommandHandlerManagerInterface;

    /**
     * @param CommandInterface $command
     * @return mixed
     */
    public function execute(CommandInterface $command);
}
