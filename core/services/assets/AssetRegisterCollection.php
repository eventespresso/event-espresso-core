<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class AssetRegisterCollection
 * a Collection of AssetRegister objects
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class AssetRegisterCollection extends Collection implements AssetRegisterInterface
{

    /**
     * Collection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct('EventEspresso\core\services\assets\AssetRegisterInterface');
    }


    /**
     * @return  void
     */
    public function registerManifestFile()
    {
        $this->rewind();
        while ($this->valid()) {
            $this->current()->registerManifestFile();
            $this->next();
        }
        $this->rewind();
    }


    /**
     * @return  void
     */
    public function registerScripts()
    {
        $this->rewind();
        while ($this->valid()) {
            $this->current()->registerScripts();
            $this->next();
        }
        $this->rewind();
    }


    /**
     * @return void
     */
    public function registerStyles()
    {
        $this->rewind();
        while ($this->valid()) {
            $this->current()->registerStyles();
            $this->next();
        }
        $this->rewind();
    }
}