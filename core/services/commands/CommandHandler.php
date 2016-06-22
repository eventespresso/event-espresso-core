<?php
namespace EventEspresso\core\services\commands;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



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
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    abstract public function handle(CommandInterface $command);

}
// End of file CommandHandler.php
// Location: /CommandHandler.php