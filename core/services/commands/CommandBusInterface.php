<?php
namespace EventEspresso\core\services\commands;

/**
 * Interface CommandBusInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandBusInterface
{

    /**
     * @return CommandHandlerManagerInterface
     */
    public function getCommandHandlerManager();

    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    public function execute($command);
}
