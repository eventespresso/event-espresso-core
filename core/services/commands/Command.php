<?php
namespace EventEspresso\core\services\commands;


use EventEspresso\core\domain\services\capabilities\CapCheckInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Command
 * Abstract parent class for Command DTOs (Data Transfer Object)
 * that route specific data from client code to a specific CommandHandler.
 * Data is set upon construction, and then passed to the CommandBus
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class Command implements CommandInterface
{

    /*
     * @var CapCheckInterface $cap_check
     */
    protected $cap_check;



    /**
     * @return mixed
     */
    public function getCapCheck()
    {
        return $this->cap_check;
    }



    /**
     * @param CapCheckInterface $cap_check
     */
    public function setCapCheck(CapCheckInterface $cap_check)
    {
        $this->cap_check = $cap_check;
    }

}
// End of file Command.php
// Location: /Command.php