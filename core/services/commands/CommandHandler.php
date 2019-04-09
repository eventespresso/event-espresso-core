<?php

namespace EventEspresso\core\services\commands;

use EventEspresso\core\exceptions\InvalidEntityException;

/**
 * Class CommandHandler
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
abstract class CommandHandler implements CommandHandlerInterface
{
    /**
     * Verifies the inputted command is of the correct type.
     * @since $VID:$
     * @param CommandInterface $inputted_command
     * @throws InvalidEntityException
     */
    protected function verifyCommand(CommandInterface $inputted_command)
    {
        $expected_classname = str_replace('CommandHandler', 'Command', get_class($this));
        if (!is_a($inputted_command, $expected_classname, true)) {
            throw new InvalidEntityException(
                $inputted_command,
                $expected_classname
            );
        }
    }

    /**
     * Wrapper for handle method, just first verifies the command is of the correct type.
     * @since $VID:$
     * @param CommandInterface $command
     * @return mixed
     * @throws InvalidEntityException
     */
    public function invokeHandle(CommandInterface $command)
    {
        $this->verifyCommand($command);
        return $this->handle($command);
    }
}
