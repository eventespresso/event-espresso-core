<?php

/**
 * Class EE_Object_Collection
 *
 * abstract storage entity for unique objects
 * extends SplObjectStorage so therefore implements the
 * Countable, Iterator, Serializable, and ArrayAccess interfaces
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.6.31
 *
 */
abstract class EE_Object_Collection extends SplObjectStorage
{
    /**
     * an interface (or class) name to be used for restricting the type of objects added to the storage
     * this should be set from within the child class constructor
     *
     * @type string $interface
     */
    protected $interface;


    /**
     * attaches an object to the Collection
     * and sets any supplied data associated with the current iterator entry
     * by calling EE_Object_Collection::set_info()
     *
     * @param object           $object
     * @param array|int|string $info
     * @return bool
     */
    public function add($object, $info = ''): bool
    {
        $class = $this->interface;
        if (! $object instanceof $class) {
            return false;
        }
        $this->attach($object);
        $this->set_info($object, $info);
        return $this->contains($object);
    }


    /**
     * @return array|int|string
     * @since 4.10.33.p
     */
    #[\ReturnTypeWillChange]
    public function getInfo()
    {
        return $this->valid() ? maybe_unserialize(parent::getInfo()) : '';
    }

    /**
     * Sets the data associated with an object in the Collection
     * if no $info is supplied, then the spl_object_hash() is used
     *
     * @param object            $object
     * @param array|int|string  $info
     * @return bool
     */
    public function set_info($object, $info = ''): bool
    {
        $info = ! empty($info) ? $info : spl_object_hash($object);
        $info = $this->prepInfo($info);
        $this->rewind();
        while ($this->valid()) {
            if ($object === $this->current()) {
                $this->setInfo($info);
                $this->rewind();
                return true;
            }
            $this->next();
        }
        return false;
    }


    /**
     * finds and returns an object in the Collection based on the info that was set using addObject()
     * PLZ NOTE: the pointer is reset to the beginning of the collection before returning
     *
     * @param array|int|string $info
     * @return null | object
     */
    public function get_by_info($info = '')
    {
        $info = $this->prepInfo($info);
        $this->rewind();
        while ($this->valid()) {
            if ($info === $this->getInfo()) {
                $object = $this->current();
                $this->rewind();
                return $object;
            }
            $this->next();
        }
        return null;
    }


    /**
     * returns TRUE or FALSE depending on whether the supplied object is within the Collection
     *
     * @param object $object
     * @return bool
     */
    public function has($object): bool
    {
        return $this->contains($object);
    }


    /**
     * detaches an object from the Collection
     *
     * @param $object
     * @return bool
     */
    public function remove($object): bool
    {
        $this->detach($object);
        return true;
    }


    /**
     * advances pointer to the provided object
     *
     * @param $object
     * @return void
     */
    public function set_current($object)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($this->current() === $object) {
                break;
            }
            $this->next();
        }
    }


    /**
     * advances pointer to the object whose info matches that which was provided
     *
     * @param array|int|string $info
     * @return void
     */
    public function set_current_by_info($info)
    {
        $info = $this->prepInfo($info);
        $this->rewind();
        while ($this->valid()) {
            if ($info === $this->getInfo()) {
                break;
            }
            $this->next();
        }
    }


    /**
     * @param array|int|string $info
     * @return string
     * @since 4.10.33.p
     */
    private function prepInfo($info = ''): string
    {
        return maybe_serialize($info);
    }
}
