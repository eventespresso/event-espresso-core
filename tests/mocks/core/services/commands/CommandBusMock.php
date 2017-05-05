<?php

namespace EventEspresso\tests\mocks\core\services\commands;

use EventEspresso\core\services\commands\CommandBusInterface;
use EventEspresso\core\services\commands\CommandHandlerManagerInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CommandBusMock
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CommandBusMock implements CommandBusInterface
{

    public $results;

    public $command_handler;



    /**
     * @return CommandHandlerManagerInterface
     */
    public function getCommandHandlerManager()
    {
        return $this->command_handler;
    }



    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    public function execute($command)
    {
        return $this->results;
    }

}
// End of file CommandBusMock.php
// Location: EventEspresso\tests\mocks\core\services\commands/CommandBusMock.php