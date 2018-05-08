<?php
namespace EventEspresso\core\services\commands;

/**
 * Interface CommandHandlerInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandHandlerInterface
{

    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    public function handle(CommandInterface $command);
}
