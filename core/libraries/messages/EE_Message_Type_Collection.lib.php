<?php

/**
 * Class EE_Message_Type_Collection
 *
 * Container object for EE_messenger objects
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 *
 *
 */
class EE_Message_Type_Collection extends EE_Object_Collection
{
    /**
     * EE_Message_Type_Collection constructor.
     */
    public function __construct()
    {
        $this->interface = 'EE_message_type';
    }



    /**
     * attaches an object to the Collection
     * and sets any supplied data associated with the current iterator entry
     * by calling EE_Object_Collection::set_info()
     *
     * @param object $object
     * @param mixed  $info
     * @return bool
     */
    public function add($object, $info = ''): bool
    {
        $info = empty($info) && $object instanceof $this->interface ? $object->name : $info;
        return parent::add($object, $info);
    }



    /**
     * Sets the data associated with an object in the Collection
     * if no $info is supplied, then the spl_object_hash() is used
     *
     * @param object $object
     * @param mixed  $info
     * @return bool
     */
    public function set_info($object, $info = ''): bool
    {
        $info = empty($info) && $object instanceof $this->interface ? $object->name : $info;
        return parent::set_info($object, $info);
    }



    /**
     * finds and returns an object in the Collection based on the info that was set using addObject()
     * PLZ NOTE: the pointer is reset to the beginning of the collection before returning
     *
     * @param mixed
     * @return null | object
     */
    public function get_by_info($info = '')
    {
        return parent::get_by_info(str_replace(' ', '_', strtolower($info)));
    }



    /**
     * returns TRUE or FALSE depending on whether the supplied object is within the Collection
     *
     * @param object $object
     * @return bool
     */
    public function has($object): bool
    {
        return parent::has($object);
    }



    /**
     * returns TRUE or FALSE depending on whether the supplied message_type classname is within the Collection
     *
     * @param string $message_type_name
     * @return bool
     */
    public function has_by_name(string $message_type_name): bool
    {
        return $this->get_by_info($message_type_name) instanceof $this->interface;
    }



    /**
     * detaches an object from the Collection
     *
     * @param $object
     * @return bool
     */
    public function remove($object): bool
    {
        return parent::remove($object);
    }



    /**
     * advances pointer to the provided object
     *
     * @param $object
     * @return void
     */
    public function set_current($object)
    {
        parent::set_current($object);
    }



    /**
     * advances pointer to the object whose info matches that which was provided
     *
     * @param $info
     * @return void
     */
    public function set_current_by_info($info)
    {
        parent::set_current_by_info($info);
    }



    /**
     * displays list of collection classes if WP_DEBUG is on
     *
     * @return void
     */
    public function show_collection_classes()
    {
        if (WP_DEBUG) {
            $this->rewind();
            while ($this->valid()) {
                echo '<h5 style="color:#2EA2CC;">
                    ' . __CLASS__ . ' class : <span style="color:#E76700">' . esc_html($this->getInfo()) . '</span>
                    </h5>';
                $this->next();
            }
        }
    }
}
