<?php

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed');


/**
 * EE Factory Class for EE_Status
 *
 * @since          4.3.0
 * @package        Event Espresso
 * @subpackage     tests
 */
class EE_UnitTest_Factory_For_Status extends WP_UnitTest_Factory_For_Thing
{

    public function __construct($factory = null)
    {
        parent::__construct($factory);
        //default args for creating events.
        $this->default_generation_definitions = array();
    }


    /**
     * used by factory to create status object
     *
     * @since 4.3.0
     * @param array $args Incoming field values to set on the new object
     * @return EE_Status|false
     * @throws EE_Error
     */
    public function create_object($args)
    {
        //first see if we have an existing status (because EE creates a bunch on initial install)
        $status = EEM_Status::instance()->get_one(array($args));
        if (! $status instanceof EE_Status) {
            $status   = EE_Status::new_instance($args);
            $statusID = $status->save();
        } else {
            $statusID = $status->ID();
        }
        return $statusID ? $status : false;
    }


    /**
     * Update status object for given status
     *
     * @since 4.3.0
     * @param int   $STS_ID      Status ID for the status to update
     * @param array $cols_n_data columns and values to change/update
     * @return EE_Status|false
     * @throws EE_Error
     */
    public function update_object($STS_ID, $cols_n_data)
    {
        //all the stuff for updating an status.
        $status = EEM_Status::instance()->get_one_by_ID($STS_ID);
        if (! $status instanceof EE_Status) {
            return null;
        }
        foreach ($cols_n_data as $key => $val) {
            $status->set($key, $val);
        }
        $success = $status->save();
        return $success ? $status : false;
    }


    /**
     * return the status object for a given status ID
     *
     * @since 4.3.0
     * @param int $STS_ID the status id for the status to attempt to retrieve
     * @return mixed null|EE_Status
     */
    public function get_object_by_id($STS_ID)
    {
        return EEM_Status::instance()->get_one_by_ID($STS_ID);
    }
}
