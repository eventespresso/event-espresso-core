<?php

/**
 * Meta Capability Map class for the registration form (questions and question groups) component
 * This is a special map due to questions and question groups having special "system" data.  Only users with the
 * edit_system_question or edit_system_question_group capability should be able to do things with the system data.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Registration_Form_Cap extends EE_Meta_Capability_Map
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
        //only process if we're checking our mapped_cap
        if ($cap !== $this->meta_cap) {
            return $caps;
        }
        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        //if no obj then let's just do cap
        if (! $obj instanceof EE_Base_Class) {
            $caps[] = $cap;
            return $caps;
        }
        $is_system = $obj instanceof EE_Question_Group ? $obj->system_group() : false;
        $is_system = $obj instanceof EE_Question ? $obj->is_system_question() : $is_system;
        if ($is_system) {
            $caps[] = $this->private_cap;
        } else {
            $caps[] = $cap;
        }
        return $caps;
    }


}
