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
     * Wrapper for handle, except it verifies the command is of the correct type.
     * @since $VID:$
     * @param CommandInterface $command
     * @return mixed
     */
    public function invokeHandle(CommandInterface $command);
    /**
     * Performs the command handler's logic.
     * Note: the command bus directly calls invokeCommand, which will verify the command is of the correct type.
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    public function handle(CommandInterface $command);
}
