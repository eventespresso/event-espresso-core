<?php

namespace EventEspresso\core\services\collections\iterators;

use Closure;
use EventEspresso\core\services\collections\Collection;
use FilterIterator;

class CollectionFilterCallbackIterator extends FilterIterator
{

    /**
     * Used for determining whether the iterated object in the Collection is "valid" or not.
     * @var Closure
     */
    private $acceptance_callback;


    /**
     * CollectionFilterCallbackIterator constructor.
     *
     * @param Collection $collection
     * @param Closure    $acceptance_callback  The closure will receive an instance of whatever object is stored on the
     *                                         collection when iterating over the collection and should return boolean.
     */
    public function __construct(Collection $collection, Closure $acceptance_callback)
    {
        $this->acceptance_callback = $acceptance_callback;
        parent::__construct($collection);
    }

    /**
     * Check whether the current element of the iterator is acceptable
     *
     * @link  http://php.net/manual/en/filteriterator.accept.php
     * @return bool true if the current element is acceptable, otherwise false.
     */
    public function accept()
    {
        $acceptance_callback = $this->acceptance_callback;
        return $acceptance_callback($this->getInnerIterator()->current());
    }



    /**
     * Returns a filtered array of objects from the collection using the provided acceptance callback
     * @return array
     */
    public function getFiltered()
    {
        $filtered_array = array();
        $this->rewind();
        foreach ($this as $filtered_object) {
            $filtered_array[] = $filtered_object;
        }
        return $filtered_array;
    }
}
