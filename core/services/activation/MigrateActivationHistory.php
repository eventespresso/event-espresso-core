<?php

namespace EventEspresso\core\services\activation;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');


/**
 * Class MigrateActivationHistory
 * Converts the ActivationHistory to the latest format
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class MigrateActivationHistory
{


    /**
     * @param ActivationHistory $activation_history
     * @return ActivationHistory
     */
    public function updateFormat(ActivationHistory $activation_history)
    {
        $version_history = $activation_history->getVersionHistory();
        do_action(
            'FHEE__EventEspresso_core_services_database_MigrateActivationHistory__repair__begin',
            $version_history
        );
        // check that option is an array
        if (is_array($version_history)) {
            $corrected_db_update = array();
            //it IS an array, but is it an array where KEYS are version numbers, and values are arrays?
            foreach ($version_history as $should_be_version_string => $should_be_array) {
                if (is_int($should_be_version_string) && ! is_array($should_be_array)) {
                    //the key is an int, and the value IS NOT an array
                    //so it must be numerically-indexed, where values are versions installed...
                    //fix it!
                    $version_string = $should_be_array;
                    $corrected_db_update[ $version_string ] = array('unknown-date');
                } else {
                    //ok it checks out
                    $corrected_db_update[ $should_be_version_string ] = $should_be_array;
                }
            }
            $version_history = $corrected_db_update;
            $activation_history->updateActivationHistory($corrected_db_update);
        } else {
            // if option is FALSE, then it never existed
            if ($version_history === false) {
                // make $version_history an array and save option with autoload OFF
                $version_history = array();
                $activation_history->addActivationHistory($version_history);
            } else {
                // option is NOT FALSE but also is NOT an array, so make it an array and save it
                $version_history = array($version_history => array());
                $activation_history->updateActivationHistory($version_history);
            }
        }
        do_action(
            'FHEE__EventEspresso_core_services_database_MigrateActivationHistory__repair__complete',
            $version_history
        );
        return $activation_history;
    }


}