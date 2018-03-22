<?php

namespace EventEspresso\tests\mocks\core\services\activation;

use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\ActivationTypeDetector;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ActivationTypeDetectorMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\activation
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ActivationTypeDetectorMock extends ActivationTypeDetector
{

    /**
     * Detects if the current version is higher or lower than the most recent version in the $activation_history.
     * Returns results of version_compare() as follows:
     *      -1 if current version is LOWER (downgrade);
     *       0 if current version MATCHES (reactivation or normal request);
     *       1 if current version is HIGHER (upgrade) ;
     *
     * @param ActivationHistory $activation_history
     * @return int
     */
    public function versionChange(ActivationHistory $activation_history)
    {
        return parent::versionChange($activation_history);
    }

}
// Location: ActivationTypeDetectorMock.php
