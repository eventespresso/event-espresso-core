<?php
/**
 * Meta Capability Map class for the messages component
 * This is a special map due to messages having global and custom messages.  Only users with the edit_global_message
 * capability should be able to do things with the global messages.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Messages_Cap extends EE_Meta_Capability_Map
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

        //cast $user_id to int for later explicit comparisons
        $user_id = (int) $user_id;

        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        //if no obj then let's just do cap
        if (! $obj instanceof EE_Message_Template_Group) {
            $caps[] = $cap;
            return $caps;
        }
        $is_global = $obj->is_global();
        if ($obj->wp_user() && $obj->wp_user() === $user_id) {
            if ($is_global) {
                $caps[] = $this->private_cap;
            } else {
                $caps[] = $cap;
            }
        } else {
            if ($is_global) {
                $caps[] = $this->private_cap;
            } else {
                $caps[] = $this->others_cap;
            }
        }
        return $caps;
    }
}
