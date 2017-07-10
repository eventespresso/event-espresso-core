<?php

namespace EventEspresso\core\services\activation;

use InvalidArgumentException;

/**
 * Class ActivationTypeDetector
 * Detects if the current EE Core or Addon version has existed in the list of previously-installed versions
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class ActivationTypeDetector
{
    /**
     * Determines the activation type for EE core or any EE addon, given three pieces of info:
     * the current array of activation histories
     *  (for core that' 'espresso_db_update' wp option);
     * the name of the WordPress option which is temporarily set upon activation of the plugin
     *  (for core it's 'ee_espresso_activation');
     * and the version that this plugin was just activated to
     *  (for core that will always be espresso_version())
     *
     * @param ActivationHistory $activation_history
     * @return ActivationType
     * @throws InvalidArgumentException
     */
    public function resolveActivationTypeFromActivationHistory(ActivationHistory $activation_history): ActivationType
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
        return new ActivationType(
            ActivationType::NOT_ACTIVATION,
            $this->detectMajorVersionChange($activation_history)
        );
    }


    /**
     * @param ActivationHistory $activation_history
     * @return ActivationType
     * @throws InvalidArgumentException
     */
    protected function newActivation(ActivationHistory $activation_history): ActivationType
    {
        $request_type = new ActivationType(
            ActivationType::NEW_ACTIVATION,
            $this->detectMajorVersionChange($activation_history)
        );
        $activation_history->deleteActivationIndicator();
        return $request_type;
    }


    /**
     * @param ActivationHistory $activation_history
     * @param int               $version_change
     * @return ActivationType
     * @throws InvalidArgumentException
     */
    protected function upgradeOrDowngrade(ActivationHistory $activation_history, int $version_change): ActivationType
    {
        // version change indicates an upgrade or downgrade
        $request_type = new ActivationType(
            $version_change === 1
                ? ActivationType::UPGRADE
                : ActivationType::DOWNGRADE,
            $this->detectMajorVersionChange($activation_history)
        );
        $activation_history->deleteActivationIndicator();
        return $request_type;
    }


    /**
     * @param ActivationHistory $activation_history
     * @return ActivationType
     * @throws InvalidArgumentException
     */
    protected function reactivation(ActivationHistory $activation_history): ActivationType
    {
        // it's an activation. must be a reactivation
        $request_type = new ActivationType(
            ActivationType::REACTIVATION,
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
    protected function versionChange(ActivationHistory $activation_history): int
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
    protected function detectMajorVersionChange(ActivationHistory $activation_history): bool
    {
        $previous_version       = $activation_history->getMostRecentActiveVersion();
        $previous_version_parts = explode('.', $previous_version);
        $current_version_parts  = explode('.', $activation_history->getCurrentVersion());
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
