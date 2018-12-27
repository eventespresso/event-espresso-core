<?php
namespace EventEspresso\core\services\commands\middleware;

use Closure;
use EventEspresso\core\services\commands\CommandInterface;

/**
 * Interface CommandBusMiddlewareInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandBusMiddlewareInterface
{

    /**
     * @param CommandInterface $command
     * @param Closure         $next
     * @return mixed
     */
    public function handle(CommandInterface $command, Closure $next);
}
