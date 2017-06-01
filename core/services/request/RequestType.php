<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\services\activation\ActivationHistory;

/**
 * Class DetectRequestType
 * Detects if the current EE Core or Addon version has existed in the list of previously-installed versions
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class RequestType
{


    /**
     * indicates this is a 'normal' request. Ie, not activation, nor upgrade, nor activation.
     * So examples of this would be a normal GET request on the frontend or backend, or a POST, etc
     */
    const REQUEST_TYPE_NORMAL = 0;

    /**
     * Indicates this is a brand new installation of EE so we should install
     * tables and default data etc
     */
    const REQUEST_TYPE_NEW_ACTIVATION = 1;

    /**
     * we've detected that EE has been reactivated (or EE was activated during maintenance mode,
     * and we just exited maintenance mode). We MUST check the database is setup properly
     * and that default data is setup too
     */
    const REQUEST_TYPE_REACTIVATION = 2;

    /**
     * indicates that EE has been upgraded since its previous request.
     * We may have data migration scripts to call and will want to trigger maintenance mode
     */
    const REQUEST_TYPE_UPGRADE = 3;

    /**
     * TODO  will detect that EE has been DOWNGRADED. We probably don't want to run in this case...
     */
    const REQUEST_TYPE_DOWNGRADE = 4;


    /**
     * @var ActivationHistory $activation_history
     */
    private $activation_history;


    /**
     * Stores which type of request this is, options being one of the REQUEST_TYPE_* constants above.
     * It can be a brand-new activation, a reactivation, an upgrade, a downgrade, or a normal request.
     *
     * @var int $request_type
     */
    private $request_type;


    /**
     * Whether or not there was a non-micro version change in EE core version during this request
     *
     * @var boolean
     */
    private $major_version_change = false;



    /**
     * RequestType constructor.
     *
     * @param ActivationHistory $activation_history
     */
    public function __construct(ActivationHistory $activation_history)
    {
        $this->activation_history = $activation_history;
    }



    /**
     * @return ActivationHistory
     */
    public function getActivationHistory()
    {
        return $this->activation_history;
    }



    /**
     * @return int
     */
    public function requestType()
    {
        return $this->request_type;
    }



    /**
     * Returns true if either the major or minor version of EE changed during this request.
     * Eg 4.9.0.rc.001 to 4.10.0.rc.000, but not 4.9.0.rc.0001 to 4.9.1.rc.0001
     *
     * @return bool
     */
    public function isMajorVersionChange()
    {
        return $this->major_version_change;
    }



    /**
     * Determines the request type for EE core or any EE addon, given three pieces of info:
     * the current array of activation histories
     *  (for core that' 'espresso_db_update' wp option);
     * the name of the WordPress option which is temporarily set upon activation of the plugin
     *  (for core it's 'ee_espresso_activation');
     * and the version that this plugin was just activated to
     *  (for core that will always be espresso_version())
     */
    public function resolveFromActivationHistory() {
        $version_change = $this->versionChange();
        $version_history = $this->activation_history->getVersionHistory();
        if ($version_history) {
            // it exists, so this isn't a completely new install
            // check if this version already in that list of previously installed versions
            if (! isset($version_history[ $this->activation_history->getCurrentVersion() ])) {
                // it's a version we haven't seen before
                if ($version_change === 1) {
                    $this->request_type = RequestType::REQUEST_TYPE_UPGRADE;
                } else {
                    $this->request_type = RequestType::REQUEST_TYPE_DOWNGRADE;
                }
                $this->activation_history->deleteActivationIndicator();
            } else {
                // its not an update. maybe a reactivation?
                if ($this->activation_history->getActivationIndicator()) {
                    if ($version_change === -1) {
                        $this->request_type = RequestType::REQUEST_TYPE_DOWNGRADE;
                    } else if ($version_change === 0) {
                        // we've seen this version before, but it's an activation. must be a reactivation
                        $this->request_type = RequestType::REQUEST_TYPE_REACTIVATION;
                    } else {
                        // $version_change === 1
                        $this->request_type = RequestType::REQUEST_TYPE_UPGRADE;
                    }
                    $this->activation_history->deleteActivationIndicator();
                } else {
                    //we've seen this version before and the activation indicate doesn't show it was just activated
                    if ($version_change === -1) {
                        $this->request_type = RequestType::REQUEST_TYPE_DOWNGRADE;
                    } else if ($version_change === 0) {
                        //we've seen this version before and it's not an activation. its normal request
                        $this->request_type = RequestType::REQUEST_TYPE_NORMAL;
                    } else {
                        //$version_change === 1
                        $this->request_type = RequestType::REQUEST_TYPE_UPGRADE;
                    }
                }
            }
        } else {
            //brand new install
            $this->request_type = RequestType::REQUEST_TYPE_NEW_ACTIVATION;
            $this->activation_history->deleteActivationIndicator();
        }
    }



    /**
     * Detects if the current version is higher or lower than the most recent version in the $this->activation_history.
     * Returns results of version_compare() as follows:
     *      -1 if current version is LOWER (downgrade);
     *       0 if current version MATCHES (reactivation or normal request);
     *       1 if current version is HIGHER (upgrade) ;
     *
     * @return int
     */
    private function versionChange()
    {
        return version_compare(
            $this->activation_history->getCurrentVersion(),
            $this->activation_history->getMostRecentActiveVersion()
        );
    }



    /**
     * Returns whether or not there was a non-micro version change (ie, change in either
     * the first or second number in the version. Eg 4.9.0.rc.001 to 4.10.0.rc.000,
     * but not 4.9.0.rc.0001 to 4.9.1.rc.0001
     */
    public function detectMajorVersionChange()
    {
        $previous_version = $this->activation_history->getMostRecentActiveVersion();
        $previous_version_parts = explode('.', $previous_version);
        $current_version_parts = explode('.', $this->activation_history->getCurrentVersion());
        $this->major_version_change = isset(
            $previous_version_parts[0],
            $previous_version_parts[1],
            $current_version_parts[0],
            $current_version_parts[1]
        ) && (
            $previous_version_parts[0] !== $current_version_parts[0]
            || $previous_version_parts[1] !== $current_version_parts[1]
        );
    }





}
