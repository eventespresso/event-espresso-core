<?php
namespace EventEspresso\core\services\commands\middleware;

use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Interface CommandBusMiddlewareInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandBusMiddlewareInterface
{

    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return mixed
     */
    public function handle(CommandInterface $command);

}
// End of file CommandBusMiddlewareInterface.php
// Location: /CommandBusMiddlewareInterface.php