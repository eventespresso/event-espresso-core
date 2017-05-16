<?php

namespace EventEspresso\tests\mocks\core\services\commands;

use EventEspresso\core\services\commands\CommandBusInterface;
use EventEspresso\core\services\commands\CommandHandlerInterface;
use EventEspresso\core\services\commands\CommandHandlerManagerInterface;
use EventEspresso\core\services\commands\CommandInterface;
use EventEspresso\core\services\commands\CompositeCommandHandler;
use EventEspresso\core\services\commands\InvalidCommandHandlerException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CommandHandlerManagerMock
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CommandHandlerManagerMock implements CommandHandlerManagerInterface
{

    public $command_handler = array();

    /**
     * @param CommandHandlerInterface $command_handler
     * @param string                  $fqcn_for_command Fully Qualified ClassName for Command
     * @return void
     * @throws InvalidCommandHandlerException
     */
    public function addCommandHandler(CommandHandlerInterface $command_handler, $fqcn_for_command = '')
    {
        $this->command_handler[$fqcn_for_command] = $command_handler;
    }



    /**
     * @param CommandInterface    $command
     * @param CommandBusInterface $command_bus
     * @return mixed
     */
    public function getCommandHandler(CommandInterface $command, CommandBusInterface $command_bus = null)
    {
        $command_name = get_class($command);
        $handler = $this->command_handler[$command_name];
        if ($handler instanceof CompositeCommandHandler) {
            $handler->setCommandBus($command_bus);
        }
        return $handler;
    }
}
// End of file CommandHandlerManagerMock.php
// Location: EventEspresso\core\services\commands/CommandHandlerManagerMock.php