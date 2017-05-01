<?php
namespace EventEspresso\core\services\commands\middleware;

use Closure;
use EventEspresso\core\domain\services\capabilities\CapabilitiesCheckerInterface;
use EventEspresso\core\exceptions\InsufficientPermissionsException;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\commands\CommandInterface;
use EventEspresso\core\services\commands\CommandRequiresCapCheckInterface;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class CapChecker
 * Any command being executed by the CommandBus that implements CommandRequiresCapCheckInterface
 * will have its CapCheck object retrieved (via the getCapCheck() method ),
 * which will then be passed to the CapabilitiesChecker class for processing.
 * If the user does not have the permissions to perform the command
 * then an exception will be thrown
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class CapChecker implements CommandBusMiddlewareInterface
{

    /**
     * @type CapabilitiesCheckerInterface $capabilities_checker
     */
    private $capabilities_checker;



    /**
     * CapChecker constructor
     *
     * @param CapabilitiesCheckerInterface $capabilities_checker
     */
    public function __construct(CapabilitiesCheckerInterface $capabilities_checker)
    {
        $this->capabilities_checker = $capabilities_checker;
    }



    /**
     * @param CommandInterface $command
     * @param Closure         $next
     * @return mixed
     * @throws InvalidClassException
     * @throws InsufficientPermissionsException
     */
    public function handle(CommandInterface $command, Closure $next)
    {
        if ($command instanceof CommandRequiresCapCheckInterface) {
            $this->capabilities_checker->processCapCheck(
                $command->getCapCheck()
            );
        }
        return $next($command);
    }


}
// End of file CapChecker.php
// Location: core/services/commands/middleware/CapChecker.php