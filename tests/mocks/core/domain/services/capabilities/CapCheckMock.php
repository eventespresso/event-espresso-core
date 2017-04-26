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



    /**
     * @return string
     */
    public function capability()
    {
        return 'mock_capability';
    }



    /**
     * @return string
     */
    public function context()
    {
        return 'unit testing capability checks';
    }



    /**
     * @return int|string
     */
    public function ID()
    {
        return 1234;
    }
}
// End of file CapCheckMock.php
// Location: EventEspresso\tests\mocks\core\domain\services\capabilities/CapCheckMock.php