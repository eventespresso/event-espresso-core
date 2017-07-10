<?php

namespace EventEspresso\core\services\activation;

use InvalidArgumentException;

/**
 * Class DetectRequestType
 * Detects if the current EE Core or Addon version has existed in the list of previously-installed versions
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class RequestTypeDetector
{


    /**
     * Determines the request type for EE core or any EE addon, given three pieces of info:
     * the current array of activation histories
     *  (for core that' 'espresso_db_update' wp option);
     * the name of the WordPress option which is temporarily set upon activation of the plugin
     *  (for core it's 'ee_espresso_activation');
     * and the version that this plugin was just activated to
     *  (for core that will always be espresso_version())
     *
     * @param ActivationHistory $activation_history
     * @return RequestType
     * @throws InvalidArgumentException
     */
    public function resolveRequestTypeFromActivationHistory(ActivationHistory $activation_history)
    {
        $version_history = $activation_history->getVersionHistory();
        // if $version_history does NOT exist, then this is a completely NEW install
        if (empty($version_history)) {
            return $this->newActivation($activation_history);
        }
        // NOT a new install, so check for a version change
        $version_change = $this->versionChange($activation_history);
        if ($version_change !== 0) {
            return $this->upgradeOrDowngrade($activation_history, $version_change);
        }
        // we've seen this version before, but its not an upgrade or downgrade, so maybe a reactivation?
        if ($activation_history->getActivationIndicator()) {
            return $this->reactivation($activation_history);
        }
        // not an activation. just a normal request
        return new RequestType(
            RequestType::NORMAL,
            $this->detectMajorVersionChange($activation_history)
        );
    }



    /**
     * @param ActivationHistory $activation_history
     * @return RequestType
     * @throws InvalidArgumentException
     */
    private function newActivation(ActivationHistory $activation_history)
    {
        $request_type = new RequestType(
            RequestType::NEW_ACTIVATION,
            $this->detectMajorVersionChange($activation_history)
        );
        $activation_history->deleteActivationIndicator();
        return $request_type;
    }



    /**
     * @param ActivationHistory $activation_history
     * @param int               $version_change
     * @return RequestType
     * @throws InvalidArgumentException
     */
    private function upgradeOrDowngrade(ActivationHistory $activation_history, $version_change)
    {
        // version change indicates an upgrade or downgrade
        $request_type = new RequestType(
            $version_change === 1
                ? RequestType::UPGRADE
                : RequestType::DOWNGRADE,
            $this->detectMajorVersionChange($activation_history)
        );
        $activation_history->deleteActivationIndicator();
        return $request_type;
    }



    /**
     * @param ActivationHistory $activation_history
     * @return RequestType
     * @throws InvalidArgumentException
     */
    private function reactivation(ActivationHistory $activation_history)
    {
        // it's an activation. must be a reactivation
        $request_type = new RequestType(
            RequestType::REACTIVATION,
            $this->detectMajorVersionChange($activation_history)
        );
        $activation_history->deleteActivationIndicator();
        return $request_type;
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
    private function versionChange(ActivationHistory $activation_history)
    {
        return version_compare(
            $activation_history->getCurrentVersion(),
            $activation_history->getMostRecentActiveVersion()
        );
    }



    /**
     * Returns whether or not there was a non-micro version change (ie, change in either
     * the first or second number in the version. Eg 4.9.0.rc.001 to 4.10.0.rc.000,
     * but not 4.9.0.rc.0001 to 4.9.1.rc.0001
     *
     * @param ActivationHistory $activation_history
     * @return bool
     */
    private function detectMajorVersionChange(ActivationHistory $activation_history)
    {
        $previous_version = $activation_history->getMostRecentActiveVersion();
        $previous_version_parts = explode('.', $previous_version);
        $current_version_parts = explode('.', $activation_history->getCurrentVersion());
        return isset(
                   $previous_version_parts[0],
                   $previous_version_parts[1],
                   $current_version_parts[0],
                   $current_version_parts[1]
               )
               && (
                   $previous_version_parts[0] !== $current_version_parts[0]
                   || $previous_version_parts[1] !== $current_version_parts[1]
               );
    }



}
