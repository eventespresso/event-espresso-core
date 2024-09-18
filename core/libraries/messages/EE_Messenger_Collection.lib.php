<?php

/**
 * Class EE_Messenger_Collection
 *
 * Container object for EE_messenger objects
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 *
 *
 */
class EE_Messenger_Collection extends EE_Object_Collection
{
    /**
     * EE_Messenger_Collection constructor.
     */
    public function __construct()
    {
        $this->interface = 'EE_messenger';
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
     * @param array|int|string $info
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
     * @param string|null $info
     * @return null | object
     */
    public function get_by_info($info = '')
    {
        return parent::get_by_info(str_replace(' ', '_', strtolower((string) $info)));
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
     * returns TRUE or FALSE depending on whether the supplied messenger name is within the Collection
     *
     * @param string $messenger_name
     * @return bool
     */
    public function has_by_name(string $messenger_name): bool
    {
        return $this->get_by_info($messenger_name) instanceof $this->interface;
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
     * current object from the Collection
     *
     * @return EE_messenger
     */
    public function current(): EE_messenger
    {
        return parent::current();
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
                    ' . __CLASS__ . ' class : . <span style="color:#E76700">' . esc_html($this->getInfo()) . '</span>
                    </h5>';
                $this->next();
            }
        }
    }
}
