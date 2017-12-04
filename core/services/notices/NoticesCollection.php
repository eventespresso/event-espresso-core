<?php
namespace EventEspresso\core\services\notices;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\FilterIteratorsHelper\FilterIteratorsHelper;

/**
 * NoticesCollection
 * For holding a collection of Notice objects.
 *
 * @package EventEspresso\core\services\notices
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
class NoticesCollection extends Collection
{

    /**
     * NoticesCollection constructor.
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct('EventEspresso\core\services\notices\NoticeInterface');
    }


    /**
     * Loops through the collection and returns true if there is any notice with the given type.
     * Note: this resets the pointer.
     *
     * @param string $type
     * @return bool
     */
    public function hasForType($type)
    {
        $this->rewind();
        /** @var NoticeInterface $notice */
        foreach ($this as $notice) {
            if ($notice->type() === $type) {
                $this->rewind();
                return true;
            }
        }
        return false;
    }


    /**
     * Loops through the collection and counts all the notices having the given type.
     * Note: this resets the pointer
     *
     * @param string $type
     * @return int
     */
    public function countForType($type)
    {
        $filtered = FilterIteratorsHelper::getFilteredObjectsFromCollection(
            $this,
            function (NoticeInterface $notice) use ($type) {
                return $notice->type() === $type;
            }
        );
        return count($filtered);
    }


    /**
     * Loops through the collection and returns all the notices having the given type.
     *
     * @param string $type
     * @return NoticeInterface[]
     */
    public function getForType($type)
    {
        return FilterIteratorsHelper::getFilteredObjectsFromCollection(
            $this,
            function (NoticeInterface $notice) use ($type) {
                return $notice->type() === $type;
            }
        );
    }
}
