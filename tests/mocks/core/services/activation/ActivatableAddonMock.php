<?php

namespace EventEspresso\tests\mocks\core\services\activation;

use EventEspresso\core\services\activation\ActivatableInterface;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\RequestType;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class ActivatableAddonMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\activation
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ActivatableAddonMock implements ActivatableInterface
{

    /**
     * Gets the ActivationHistory object for this addon
     *
     * @return ActivationHistory
     */
    public function getActivationHistory()
    {
        // TODO: Implement getActivationHistory() method.
    }



    /**
     * @param ActivationHistory $activation_history
     */
    public function setActivationHistory(ActivationHistory $activation_history)
    {
        // TODO: Implement setActivationHistory() method.
    }



    /**
     * @return RequestType
     */
    public function getRequestType()
    {
        // TODO: Implement getRequestType() method.
    }



    /**
     * @param RequestType $request_type
     */
    public function setRequestType(RequestType $request_type)
    {
        // TODO: Implement setRequestType() method.
    }
}
// Location: ActivatableAddonMock.php
