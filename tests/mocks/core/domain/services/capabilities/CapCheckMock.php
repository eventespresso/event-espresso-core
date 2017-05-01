<?php

namespace EventEspresso\tests\mocks\core\domain\services\capabilities;

use EventEspresso\core\domain\services\capabilities\CapCheckInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CapCheckMock
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CapCheckMock implements CapCheckInterface
{

    public $capability = 'mock_capability';
    public $context = 'unit testing capability checks';
    public $ID = 1234;

    /**
     * @return string
     */
    public function capability()
    {
        return $this->capability;
    }



    /**
     * @return string
     */
    public function context()
    {
        return $this->context;
    }



    /**
     * @return int|string
     */
    public function ID()
    {
        return $this->ID;
    }
}
// End of file CapCheckMock.php
// Location: EventEspresso\tests\mocks\core\domain\services\capabilities/CapCheckMock.php