<?php
namespace EventEspresso\core\services\collections\FilterIteratorsHelper;

use Closure;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\iterators\CollectionFilterCallbackIterator;

/**
 * FilterIteratorsHelper
 * Helpers for working with collection iterators.
 *
 * @package EventEspresso\core\services\FilterIteratorsHelper
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
class FilterIteratorsHelper
{


    /**
     * Uses CollectionFilterCallbackIterator on a provided collection with provided Closure for filtering each object
     * in the collection.
     * The closure receives an instance of the object and should return false if it is not "valid" and true if it is.
     *
     * @param Collection $collection
     * @param Closure    $acceptance_callback
     * @return array
     */
    public static function getFilteredObjectsFromCollection(Collection $collection, Closure $acceptance_callback)
    {
        $collection_filter_iterator = new CollectionFilterCallbackIterator($collection, $acceptance_callback);
        return $collection_filter_iterator->getFiltered();
    }
}
