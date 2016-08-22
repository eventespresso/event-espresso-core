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
     * @param CommandInterface $command
     * @param \Closure         $next
     * @return mixed
     */
    public function handle(CommandInterface $command, \Closure $next);

}
// End of file CommandBusMiddlewareInterface.php
// Location: /CommandBusMiddlewareInterface.php