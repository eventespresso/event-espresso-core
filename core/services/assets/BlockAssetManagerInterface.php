<?php

namespace EventEspresso\core\services\assets;

/**
 * Interface BlockAssetManagerInterface
 * Defines any class capable of handling asset registration via EventEspresso\core\services\assets\Registry
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface BlockAssetManagerInterface
{

    /**
     * @return string
     */
    public function getEditorScriptHandle();


    /**
     * @return string
     */
    public function getEditorStyleHandle();


    /**
     * @return string
     */
    public function getScriptHandle();


    /**
     * @return string
     */
    public function getStyleHandle();
}