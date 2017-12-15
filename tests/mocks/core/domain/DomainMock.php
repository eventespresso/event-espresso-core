<?php

namespace EventEspresso\tests\mocks\core\domain;

use EventEspresso\core\domain\DomainBase;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class DomainMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\domain
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DomainMock extends DomainBase
{

    public function returnOhYeah()
    {
        return 'Oh Yeah';
    }

}
// Location: DomainMock.php
