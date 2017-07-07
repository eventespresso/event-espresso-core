<?php

namespace EventEspresso\core\services\activation;

use EventEspresso\core\exceptions\InvalidDataTypeException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class ActivationHistory
 * gets and sets the activation version history array from the WP options
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class ActivationHistory
{

    const EE_ACTIVATION_HISTORY_OPTION_NAME = 'espresso_db_update';

    /**
     * option name for recording the activation history for core
     */
    const EE_ACTIVATION_INDICATOR_OPTION_NAME = 'ee_espresso_activation';

    /**
     * @var string $activation_history_option_name
     */
    protected $activation_history_option_name;

    /**
     * @var string $activation_indicator_option_name
     */
    protected $activation_indicator_option_name;

    /**
     * @var string $current_version
     */
    protected $current_version;

    /**
     * @var array|bool $version_history
     */
    protected $version_history;



    /**
     * ActivationHistory constructor.
     *
     * @param string $activation_history_option_name
     * @param string $activation_indicator_option_name
     * @param string $current_version
     * @throws InvalidDataTypeException
     */
    public function __construct(
        $activation_history_option_name = '',
        $activation_indicator_option_name = '',
        $current_version = ''
    ) {
        $this->setActivationHistoryOptionName($activation_history_option_name);
        $this->setActivationIndicatorOptionName($activation_indicator_option_name);
        $this->setCurrentVersion($current_version);
        $this->version_history = get_option($this->activation_history_option_name);
    }



    /**
     * @param string $activation_history_option_name
     * @throws InvalidDataTypeException
     */
    protected function setActivationHistoryOptionName($activation_history_option_name)
    {
        if(! is_string($activation_history_option_name)) {
            throw new InvalidDataTypeException(
                '$activation_history_option_name',
                $activation_history_option_name,
                'string'
            );
        }
        $this->activation_history_option_name = $activation_history_option_name !== ''
            ? $activation_history_option_name
            : ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME;
    }



    /**
     * @param string $activation_indicator_option_name
     * @throws InvalidDataTypeException
     */
    protected function setActivationIndicatorOptionName($activation_indicator_option_name)
    {
        if (! is_string($activation_indicator_option_name)) {
            throw new InvalidDataTypeException(
                '$activation_indicator_option_name',
                $activation_indicator_option_name,
                'string'
            );
        }
        $this->activation_indicator_option_name = $activation_indicator_option_name !== ''
            ? $activation_indicator_option_name
            : ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME;
    }



    /**
     * @param string $current_version
     * @throws InvalidDataTypeException
     */
    protected function setCurrentVersion($current_version)
    {
        if (! is_string($current_version)) {
            throw new InvalidDataTypeException(
                '$current_version',
                $current_version,
                'string'
            );
        }
        $this->current_version = $current_version !== ''
            ? $current_version
            : espresso_version();
    }




    /**
     * Gets the wp option which stores the activation history for this addon
     *
     * @return array|bool
     */
    public function getVersionHistory()
    {
        return $this->version_history;
    }



    /**
     * @return string
     */
    public function getCurrentVersion()
    {
        return $this->current_version;
    }



    /**
     * Gets the most recently active version listed in the activation history,
     * and if none are found (ie, it's a brand new install) returns '0.0.0.dev.000'.
     *
     * @return string
     */
    public function getMostRecentActiveVersion()
    {
        $most_recently_active_version_activation = '1970-01-01 00:00:00';
        $most_recently_active_version = '0.0.0.dev.000';
        if (is_array($this->version_history)) {
            foreach ($this->version_history as $version => $times_activated) {
                // check there is a record of when this version was activated.
                // Otherwise, mark it as unknown
                if (! $times_activated) {
                    $times_activated = array('unknown-date');
                }
                if (is_string($times_activated)) {
                    $times_activated = array($times_activated);
                }
                foreach ($times_activated as $an_activation) {
                    if (
                        $an_activation !== 'unknown-date'
                        && $an_activation > $most_recently_active_version_activation
                    ) {
                        $most_recently_active_version = $version;
                        $most_recently_active_version_activation = $an_activation === 'unknown-date'
                            ? '1970-01-01 00:00:00'
                            : $an_activation;
                    }
                }
            }
        }
        return $most_recently_active_version;
    }



    /**
     * Updates the version history for this addon
     *
     * @param array|null $version_history
     * @param string     $current_version
     * @return boolean success
     */
    public function updateActivationHistory($version_history = null, $current_version = '')
    {
        if ($version_history !== null) {
            $this->version_history = $version_history;
        }
        if ($current_version !== '') {
            $this->current_version = $current_version;
        }
        if(! isset($this->version_history[$this->current_version])) {
            $this->version_history[$this->current_version] =   array();
        }
        $this->version_history[ $this->current_version ][] = date('Y-m-d H:i:s', time());
        return update_option(
            $this->activation_history_option_name,
            $this->version_history
        );
    }



    /**
     * Updates the version history for this addon
     *
     * @param array|null $version_history
     * @param string     $current_version
     * @return boolean success
     */
    public function addActivationHistory($version_history = null, $current_version = '')
    {
        if ($version_history !== null) {
            $this->version_history = $version_history;
        }
        if ($current_version !== '') {
            $this->current_version = $current_version;
        }
        return add_option(
            $this->activation_history_option_name,
            $this->version_history,
            '',
            'no'
        );
    }



    /**
     * @return bool
     */
    public function getActivationIndicator()
    {
        return get_option($this->activation_indicator_option_name, false);
    }



    /**
     * @return bool
     */
    public function setActivationIndicator()
    {
        return update_option($this->activation_indicator_option_name, true);
    }



    /**
     * @return bool
     */
    public function deleteActivationIndicator()
    {
        return delete_option($this->activation_indicator_option_name);
    }



}
