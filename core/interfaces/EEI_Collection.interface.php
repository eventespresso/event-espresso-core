<?php

/**
 * Collection Interface
 *
 * PLZ USE \EventEspresso\core\services\collections\CollectionInterface
 *
 * @deprecated since 4.9
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.8.0
 * @author     Brent Christensen
 */
interface EEI_Collection
{
    /**
     * attaches an object to the Collection
     * and sets any supplied data associated with the current iterator entry
     * by calling EEI_Collection::set_info()
     *
     * @param object $object
     * @param array|int|string $info
     * @return bool
     */
    public function add($object, $info = ''): bool;



    /**
     * Sets the info associated with an object in the Collection
     *
     * @param object           $object
     * @param array|int|string $info
     * @return bool
     */
    public function set_info($object, $info = ''): bool;



    /**
     * finds and returns an object in the Collection based on the info that was set using set_info() or add()
     *
     * @param array|int|string $info
     * @return null | object
     */
    public function get_by_info($info = '');



    /**
     * returns TRUE or FALSE depending on whether the supplied object is within the Collection
     *
     * @param object $object
     * @return bool
     */
    public function has($object): bool;



    /**
     * detaches an object from the Collection
     *
     * @param $object
     * @return void
     */
    public function remove($object);
}
