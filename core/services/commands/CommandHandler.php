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
     * Verifies the Command class matches the Handler class
     * by simply removing "Handler" from the Command class and then comparing.
     * IF the Command Handler has been changed via CommandHandlerManager::addCommandHandler,
     * or via the filter in CommandHandlerManager::getCommandHandler(),
     * then this method MUST be overridden in the new Command Handler class.
     * PLZ NOTE: that it also needs to return itself ($this)
     * because the CommandBus utilizes method chaining.
     *
     * @param CommandInterface $command
     * @return CommandHandler
     * @throws InvalidEntityException
     * @since 4.9.80.p
     */
    public function verify(CommandInterface $command)
    {
        $expected = str_replace('CommandHandler', 'Command', get_class($this));
        if (! $command instanceof $expected) {
            throw new InvalidEntityException($command, $expected);
        }
        return $this;
    }
}
