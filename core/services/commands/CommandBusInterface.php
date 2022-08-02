<?php

namespace EventEspresso\core\services\commands;

use EventEspresso\core\interfaces\InterminableInterface;

/**
 * Interface CommandBusInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandBusInterface extends InterminableInterface
{
    /**
     * @return CommandHandlerManagerInterface
     */
    public function getCommandHandlerManager();

    /**
     * @param CommandInterface $command
     * @return mixed
     */
    public function execute($command);
}
