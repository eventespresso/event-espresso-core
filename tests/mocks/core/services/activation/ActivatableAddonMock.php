<?php

namespace EventEspresso\tests\mocks\core\services\activation;

use EventEspresso\core\services\activation\ActivatableInterface;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\ActivationType;

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
     * @return ActivationType
     */
    public function getActivationType()
    {
        // TODO: Implement getActivationType() method.
    }



    /**
     * @param ActivationType $activation_type
     */
    public function setActivationType(ActivationType $activation_type)
    {
        // TODO: Implement setActivationType() method.
    }
}
// Location: ActivatableAddonMock.php
