<?php

/**
 * Deletable Interface
 *
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.8.0
 * @author     Brent Christensen
 */
interface EEI_Deletable
{



    /**
     * delete
     *
     * used for deleting the current object from the wherever the object is persisted ( ie: from the database, cache, session, etc )
     *
     * @access public
     * @return bool | int
     */
    public function delete();
}
