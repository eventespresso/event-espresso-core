<?php

namespace EventEspresso\tests\mocks\core\services\activation;

use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\ActivationType;
use EventEspresso\core\services\activation\ActivationTypeDetector;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


class ActivationTypeDetectorExtendedMock extends ActivationTypeDetector
{

    /**
     * @param ActivationType $activation_type
     */
    // public function setActivationType(ActivationType $activation_type)
    // {
    //     $this->activation_type = $activation_type;
    // }


    /**
     * @param ActivationHistory $activation_history
     * @return ActivationType
     * @throws InvalidArgumentException
     */
    public function newActivation(ActivationHistory $activation_history)
    {
        return parent::newActivation( $activation_history);
    }


    /**
     * @param ActivationHistory $activation_history
     * @param int               $version_change
     * @return ActivationType
     * @throws InvalidArgumentException
     */
    public function upgradeOrDowngrade(ActivationHistory $activation_history, $version_change)
    {
        return parent::upgradeOrDowngrade($activation_history, $version_change);
    }


    /**
     * @param ActivationHistory $activation_history
     * @return ActivationType
     * @throws InvalidArgumentException
     */
    public function reactivation(ActivationHistory $activation_history)
    {
        return parent::reactivation($activation_history);
    }


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


    /**
     * Returns whether or not there was a non-micro version change (ie, change in either
     * the first or second number in the version. Eg 4.9.0.rc.001 to 4.10.0.rc.000,
     * but not 4.9.0.rc.0001 to 4.9.1.rc.0001
     *
     * @param ActivationHistory $activation_history
     * @return bool
     */
    public function detectMajorVersionChange(ActivationHistory $activation_history)
    {
        return parent::detectMajorVersionChange($activation_history);
    }

}
