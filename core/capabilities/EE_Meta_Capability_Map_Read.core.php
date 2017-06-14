<?php
/**
 * Meta Capability Map class for reads.
 * Maps any read meta capabilities to equivalents for context.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Read extends EE_Meta_Capability_Map
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
        //only process if we're checking our mapped cap;
        if ($cap !== $this->meta_cap) {
            return $caps;
        }

        //cast $user_id to int for later explicit comparisons
        $user_id = (int) $user_id;

        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        //if no obj then let's just do cap
        if (! $obj instanceof EE_Base_Class) {
            $caps[] = $cap;
            return $caps;
        }
        if ($obj instanceof EE_CPT_Base) {
            $status_obj = get_post_status_object($obj->status());
            if ($status_obj->public) {
                $caps[] = $cap;
                return $caps;
            }
            //if the item author is set and the user is the author...
            if ($obj->wp_user() && $obj->wp_user() === $user_id) {
                $caps[] = $cap;
            } elseif ($status_obj->private && ! empty($this->private_cap)) {
                //the user is trying to view someone else's obj
                $caps[] = $this->private_cap;
            } elseif (! empty($this->others_cap)) {
                $caps[] = $this->others_cap;
            } else {
                $caps[] = $cap;
            }
        } else {
            //not a cpt object so handled differently
            $has_cap = false;
            try {
                $has_cap = method_exists($obj, 'wp_user') && $obj->wp_user() && $obj->wp_user() === $user_id;
            } catch (Exception $e) {
                if (WP_DEBUG) {
                    EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
                }
            }
            if ($has_cap) {
                $caps[] = $cap;
            } elseif (! empty($this->private_cap)) {
                $caps[] = $this->private_cap;
            } elseif (! empty($this->others_cap)) {
                $caps[] = $this->others_cap;
            } else {
                $caps[] = $cap;
            }
        }
        return $caps;
    }
}

