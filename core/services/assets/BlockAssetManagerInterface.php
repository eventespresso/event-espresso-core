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
     * @since $VID:$
     * @return string
     */
    public function assetNamespace();

    /**
     * @since $VID:$
     * @return void
     */
    public function setAssetHandles();

    /**
     * @since $VID:$
     * @return string
     */
    public function getEditorScriptHandle();


    /**
     * @since $VID:$
     * @return string
     */
    public function getEditorStyleHandle();


    /**
     * @since $VID:$
     * @return string
     */
    public function getScriptHandle();


    /**
     * @since $VID:$
     * @return string
     */
    public function getStyleHandle();
}