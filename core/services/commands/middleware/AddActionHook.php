<?php

namespace EventEspresso\core\services\commands\middleware;

use Closure;
use EventEspresso\core\services\commands\CommandInterface;

/**
 * Class AddActionHook
 * Triggers a WordPress do_action() hook before each Command is executed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class AddActionHook implements CommandBusMiddlewareInterface
{

    /**
     * @param CommandInterface $command
     * @param Closure          $next
     * @return mixed
     */
    public function handle(CommandInterface $command, Closure $next)
    {
        do_action(
            'AHEE__EventEspresso_core_services_commands_middleware_AddActionHook__handle__before',
            $command
        );
        $results = $next($command);
        do_action(
            'AHEE__EventEspresso_core_services_commands_middleware_AddActionHook__handle__after',
            $command
        );
        return $results;
    }
}
