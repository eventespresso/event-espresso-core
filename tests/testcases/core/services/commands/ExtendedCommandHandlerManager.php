<?php

namespace EventEspresso\tests\testcases\core\services\commands;

use EventEspresso\core\services\commands\CommandHandlerInterface;
use EventEspresso\core\services\commands\CommandHandlerManager;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ExtendedCommandHandlerManager
 * Adds a getter for the $command_handlers property to the CommandHandlerManager class
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ExtendedCommandHandlerManager extends CommandHandlerManager
{

    /**
     * @return CommandHandlerInterface[]
     */
    public function getCommandHandlers()
    {
        return $this->command_handlers;
    }



}
// End of file ExtendedCommandHandlerManager.php
// Location: EventEspresso\core\services\commands/ExtendedCommandHandlerManager.php