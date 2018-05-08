<?php

namespace EventEspresso\core\services\collections;

use EventEspresso\core\exceptions\InvalidEntityException;

/**
 * Class LooseCollection
 * A Collection for storing objects that don't all implement a common interface
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class LooseCollection extends Collection
{


    /**
     * setCollectionInterface
     *
     * @access protected
     * @param  string $collection_interface
     */
    protected function setCollectionInterface($collection_interface)
    {
        $this->collection_interface = '';
    }


    /**
     * add
     * attaches an object to the Collection
     * and sets any supplied data associated with the current iterator entry
     * by calling EE_Object_Collection::set_identifier()
     *
     * @access public
     * @param  mixed $object
     * @param  mixed $identifier
     * @return bool
     * @throws InvalidEntityException
     */
    public function add($object, $identifier = null)
    {
        if (! is_object($object)) {
            throw new InvalidEntityException($object, 'object');
        }
        $this->attach($object);
        $this->setIdentifier($object, $identifier);
        return $this->contains($object);
    }
}
