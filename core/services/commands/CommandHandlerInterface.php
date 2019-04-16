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
     * verifies that the supplied command is the correct class for the handler.
     *
     * !!! IMPORTANT !!!
     * Must return $this (ie: the handler itself)
     * as the CommandBus utilizes method chaining
     *
     * @param CommandInterface $command
     * @return CommandHandlerInterface
     * @since $VID:$
     */
    public function verify(CommandInterface $command);

    /**
     * Performs the command handler's logic.
     *
     * @param CommandInterface $command
     * @return mixed
     */
    public function handle(CommandInterface $command);
}
