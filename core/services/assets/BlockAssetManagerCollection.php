<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

/**
 * Class BlockAssetManagerCollection
 * a Collection of BlockAssetManager objects
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class BlockAssetManagerCollection extends Collection
{

    /**
     * Collection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct('EventEspresso\core\services\assets\BlockAssetManager');
    }


    /**
     * @return  void
     */
    public function addAssets()
    {
        $this->rewind();
        while ($this->valid()) {
            $this->current()->addAssets();
            $this->next();
        }
        $this->rewind();
    }


    /**
     * @return  void
     */
    public function enqueueAssets()
    {
        $this->rewind();
        while ($this->valid()) {
            $this->current()->enqueueAssets();
            $this->next();
        }
        $this->rewind();
    }
}
