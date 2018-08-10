<?php

namespace EventEspresso\core\services\collections;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use LimitIterator;
use SplObjectStorage;

/**
 * Class Collection
 * class for managing a set of entities that all adhere to the same interface
 * unofficially follows Interop\Container\ContainerInterface
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class Collection extends SplObjectStorage implements CollectionInterface
{

    /**
     * a unique string for identifying this collection
     *
     * @type string $collection_identifier
     */
    protected $collection_identifier;


    /**
     * an interface (or class) name to be used for restricting the type of objects added to the storage
     * this should be set from within the child class constructor
     *
     * @type string $interface
     */
    protected $collection_interface;

    /**
     * a short dash separated string describing the contents of this collection
     * used as the base for the $collection_identifier
     * defaults to the class short name if not set
     *
     * @type string $collection_identifier
     */
    protected $collection_name;


    /**
     * Collection constructor
     *
     * @param string $collection_interface
     * @param string $collection_name
     * @throws InvalidInterfaceException
     */
    public function __construct($collection_interface, $collection_name = '')
    {
        $this->setCollectionInterface($collection_interface);
        $this->setCollectionName($collection_name);
        $this->setCollectionIdentifier();
    }


    /**
     * setCollectionInterface
     *
     * @param  string $collection_interface
     * @throws InvalidInterfaceException
     */
    protected function setCollectionInterface($collection_interface)
    {
        if (! (interface_exists($collection_interface) || class_exists($collection_interface))) {
            throw new InvalidInterfaceException($collection_interface);
        }
        $this->collection_interface = $collection_interface;
    }


    /**
     * @return string
     */
    public function collectionName()
    {
        return $this->collection_name;
    }


    /**
     * @param string $collection_name
     */
    protected function setCollectionName($collection_name)
    {
        $this->collection_name = ! empty($collection_name)
            ? sanitize_key($collection_name)
            : basename(str_replace('\\', '/', get_class($this)));
    }


    /**
     * @return string
     */
    public function collectionIdentifier()
    {
        return $this->collection_identifier;
    }


    /**
     * creates a very readable unique 9 character identifier like:  CF2-532-DAC
     * and appends it to the non-qualified class name, ex: ThingCollection-CF2-532-DAC
     *
     * @return void
     */
    protected function setCollectionIdentifier()
    {
        // hash a few collection details
        $identifier = md5(spl_object_hash($this) . $this->collection_interface . time());
        // grab a few characters from the start, middle, and end of the hash
        $id = array();
        for ($x = 0; $x < 19; $x += 9) {
            $id[] = substr($identifier, $x, 3);
        }
        $this->collection_identifier = $this->collection_name . '-' . strtoupper(implode('-', $id));
    }


    /**
     * add
     * attaches an object to the Collection
     * and sets any supplied data associated with the current iterator entry
     * by calling EE_Object_Collection::set_identifier()
     *
     * @param        $object
     * @param  mixed $identifier
     * @return bool
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function add($object, $identifier = null)
    {
        if (! $object instanceof $this->collection_interface) {
            throw new InvalidEntityException($object, $this->collection_interface);
        }
        if ($this->contains($object)) {
            throw new DuplicateCollectionIdentifierException($identifier);
        }
        $this->attach($object);
        $this->setIdentifier($object, $identifier);
        return $this->contains($object);
    }


    /**
     * getIdentifier
     * if no $identifier is supplied, then the spl_object_hash() is used
     *
     * @param        $object
     * @param  mixed $identifier
     * @return bool
     */
    public function getIdentifier($object, $identifier = null)
    {
        return ! empty($identifier)
            ? $identifier
            : spl_object_hash($object);
    }


    /**
     * setIdentifier
     * Sets the data associated with an object in the Collection
     * if no $identifier is supplied, then the spl_object_hash() is used
     *
     * @param        $object
     * @param  mixed $identifier
     * @return bool
     */
    public function setIdentifier($object, $identifier = null)
    {
        $identifier = $this->getIdentifier($object, $identifier);
        $this->rewind();
        while ($this->valid()) {
            if ($object === $this->current()) {
                $this->setInfo($identifier);
                $this->rewind();
                return true;
            }
            $this->next();
        }
        return false;
    }


    /**
     * get
     * finds and returns an object in the Collection based on the identifier that was set using addObject()
     * PLZ NOTE: the pointer is reset to the beginning of the collection before returning
     *
     * @param mixed $identifier
     * @return mixed
     */
    public function get($identifier)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($identifier === $this->getInfo()) {
                $object = $this->current();
                $this->rewind();
                return $object;
            }
            $this->next();
        }
        return null;
    }


    /**
     * has
     * returns TRUE or FALSE
     * depending on whether the object is within the Collection
     * based on the supplied $identifier
     *
     * @param  mixed $identifier
     * @return bool
     */
    public function has($identifier)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($identifier === $this->getInfo()) {
                $this->rewind();
                return true;
            }
            $this->next();
        }
        return false;
    }


    /**
     * hasObject
     * returns TRUE or FALSE depending on whether the supplied object is within the Collection
     *
     * @param $object
     * @return bool
     */
    public function hasObject($object)
    {
        return $this->contains($object);
    }


    /**
     * hasObjects
     * returns true if there are objects within the Collection, and false if it is empty
     *
     * @return bool
     */
    public function hasObjects()
    {
        return $this->count() !== 0;
    }


    /**
     * isEmpty
     * returns true if there are no objects within the Collection, and false if there are
     *
     * @return bool
     */
    public function isEmpty()
    {
        return $this->count() === 0;
    }


    /**
     * remove
     * detaches an object from the Collection
     *
     * @param $object
     * @return bool
     */
    public function remove($object)
    {
        $this->detach($object);
        return true;
    }


    /**
     * setCurrent
     * advances pointer to the object whose identifier matches that which was provided
     *
     * @param mixed $identifier
     * @return boolean
     */
    public function setCurrent($identifier)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($identifier === $this->getInfo()) {
                return true;
            }
            $this->next();
        }
        return false;
    }


    /**
     * setCurrentUsingObject
     * advances pointer to the provided object
     *
     * @param $object
     * @return boolean
     */
    public function setCurrentUsingObject($object)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($this->current() === $object) {
                return true;
            }
            $this->next();
        }
        return false;
    }


    /**
     * Returns the object occupying the index before the current object,
     * unless this is already the first object, in which case it just returns the first object
     *
     * @return mixed
     */
    public function previous()
    {
        $index = $this->indexOf($this->current());
        if ($index === 0) {
            return $this->current();
        }
        $index--;
        return $this->objectAtIndex($index);
    }


    /**
     * Returns the index of a given object, or false if not found
     *
     * @see http://stackoverflow.com/a/8736013
     * @param $object
     * @return boolean|int|string
     */
    public function indexOf($object)
    {
        if (! $this->contains($object)) {
            return false;
        }
        foreach ($this as $index => $obj) {
            if ($obj === $object) {
                return $index;
            }
        }
        return false;
    }


    /**
     * Returns the object at the given index
     *
     * @see http://stackoverflow.com/a/8736013
     * @param int $index
     * @return mixed
     */
    public function objectAtIndex($index)
    {
        $iterator = new LimitIterator($this, $index, 1);
        $iterator->rewind();
        return $iterator->current();
    }


    /**
     * Returns the sequence of objects as specified by the offset and length
     *
     * @see http://stackoverflow.com/a/8736013
     * @param int $offset
     * @param int $length
     * @return array
     */
    public function slice($offset, $length)
    {
        $slice = array();
        $iterator = new LimitIterator($this, $offset, $length);
        foreach ($iterator as $object) {
            $slice[] = $object;
        }
        return $slice;
    }


    /**
     * Inserts an object at a certain point
     *
     * @see http://stackoverflow.com/a/8736013
     * @param mixed $object A single object
     * @param int   $index
     * @param mixed $identifier
     * @return bool
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidEntityException
     */
    public function insertObjectAt($object, $index, $identifier = null)
    {
        // check to ensure that objects don't already exist in the collection
        if ($this->has($identifier)) {
            throw new DuplicateCollectionIdentifierException($identifier);
        }
        // detach any objects at or past this index
        $remaining_objects = array();
        if ($index < $this->count()) {
            $remaining_objects = $this->slice($index, $this->count() - $index);
            foreach ($remaining_objects as $key => $remaining_object) {
                // we need to grab the identifiers for each object and use them as keys
                $remaining_objects[ $remaining_object->getInfo() ] = $remaining_object;
                // and then remove the object from the current tracking array
                unset($remaining_objects[ $key ]);
                // and then remove it from the Collection
                $this->detach($remaining_object);
            }
        }
        // add the new object we're splicing in
        $this->add($object, $identifier);
        // attach the objects we previously detached
        foreach ($remaining_objects as $key => $remaining_object) {
            $this->add($remaining_object, $key);
        }
        return $this->contains($object);
    }


    /**
     * Inserts an object (or an array of objects) at a certain point
     *
     * @see http://stackoverflow.com/a/8736013
     * @param mixed $objects A single object or an array of objects
     * @param int   $index
     */
    public function insertAt($objects, $index)
    {
        if (! is_array($objects)) {
            $objects = array($objects);
        }
        // check to ensure that objects don't already exist in the collection
        foreach ($objects as $key => $object) {
            if ($this->contains($object)) {
                unset($objects[ $key ]);
            }
        }
        // do we have any objects left?
        if (! $objects) {
            return;
        }
        // detach any objects at or past this index
        $remaining = array();
        if ($index < $this->count()) {
            $remaining = $this->slice($index, $this->count() - $index);
            foreach ($remaining as $object) {
                $this->detach($object);
            }
        }
        // add the new objects we're splicing in
        foreach ($objects as $object) {
            $this->attach($object);
        }
        // attach the objects we previously detached
        foreach ($remaining as $object) {
            $this->attach($object);
        }
    }


    /**
     * Removes the object at the given index
     *
     * @see http://stackoverflow.com/a/8736013
     * @param int $index
     */
    public function removeAt($index)
    {
        $this->detach($this->objectAtIndex($index));
    }


    /**
     * detaches ALL objects from the Collection
     */
    public function detachAll()
    {
        $this->rewind();
        while ($this->valid()) {
            $object = $this->current();
            $this->next();
            $this->detach($object);
        }
    }


    /**
     * unsets and detaches ALL objects from the Collection
     */
    public function trashAndDetachAll()
    {
        $this->rewind();
        while ($this->valid()) {
            $object = $this->current();
            $this->next();
            $this->detach($object);
            unset($object);
        }
    }
}
