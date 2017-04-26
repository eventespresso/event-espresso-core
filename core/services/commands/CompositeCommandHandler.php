<?php

namespace EventEspresso\core\services\commands;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CompositeCommandHandler
 * abstract parent class for CommandHandlers
 * that can create additional Command objects
 * and pass them to the Command Bus for processing
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.38
 */
abstract class CompositeCommandHandler extends CommandHandler
{

    /**
     * @type CommandBus $command_bus
     */
    private $command_bus;



    /**
     * @param CommandBus $command_bus
     */
    public function setCommandBus(CommandBus $command_bus)
    {
        $this->command_bus = $command_bus;
    }



    /**
     * @return CommandBus
     */
    public function commandBus()
    {
        return $this->command_bus;
    }



}
// End of file CompositeCommandHandler.php
// Location: core/services/commands/CompositeCommandHandler.php