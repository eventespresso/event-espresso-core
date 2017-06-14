<?php
/**
 * Meta Capability Map class for delete type capabilities
 * Merely extends the Edit map.  Intention is for type hinting so it's clear a capability is a "delete" type of
 * capability (in case mapping needs to change in the future)
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Delete extends EE_Meta_Capability_Map_Edit
{

    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    protected function _map_meta_caps($caps, $cap, $user_id, $args)
    {
        return parent::_map_meta_caps($caps, $cap, $user_id, $args);
    }
}
