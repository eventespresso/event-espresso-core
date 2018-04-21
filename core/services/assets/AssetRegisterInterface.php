<?php

namespace EventEspresso\core\services\assets;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface AssetRegisterInterface
 * Defines any class capable of handling asset registration via EventEspresso\core\services\assets\Registry
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface AssetRegisterInterface
{

    /**
     * @return  void
     */
    public function registerManifestFile();


    /**
     * @return  void
     */
    public function registerScripts();


    /**
     * @return void
     */
    public function registerStyles();
}