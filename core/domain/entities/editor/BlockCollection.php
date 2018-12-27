<?php

namespace EventEspresso\core\domain\entities\editor;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

/**
 * Class BlockCollection
 * a Collection of Block objects
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class BlockCollection extends Collection
{

    /**
     * Collection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct('EventEspresso\core\domain\entities\editor\BlockInterface');
    }


    /**
     * unRegisterBlock
     * finds block in the Collection based on the identifier that was set using addObject()
     * and calls unRegisterBlock() on it. Returns block if successful and false if block was not found.
     * PLZ NOTE: the pointer is reset to the beginning of the collection afterwards
     *
     * @param mixed $identifier
     * @return boolean
     */
    public function unRegisterBlock($identifier)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($identifier === $this->getInfo()) {
                $object = $this->current();
                $this->rewind();
                return $object->unRegisterBlock();
            }
            $this->next();
        }
        return false;
    }


    /**
     * unRegisterAllBlocks
     * calls unRegisterBlock() on all blocks in Collection.
     * PLZ NOTE: the pointer is reset to the beginning of the collection afterwards
     *
     * @return void
     */
    public function unRegisterAllBlocks()
    {
        $this->rewind();
        while ($this->valid()) {
            $this->current()->unRegisterBlock();
            $this->next();
        }
        $this->rewind();
    }
}
