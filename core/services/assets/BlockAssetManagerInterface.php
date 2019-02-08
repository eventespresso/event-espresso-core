<?php

namespace EventEspresso\core\services\assets;

/**
 * Interface BlockAssetManagerInterface
 * Defines any class capable of handling asset registration via EventEspresso\core\services\assets\Registry
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
interface BlockAssetManagerInterface
{
    /**
     * @since 4.9.71.p
     * @return string
     */
    public function assetNamespace();

    /**
     * @since 4.9.71.p
     * @return void
     */
    public function setAssetHandles();

    /**
     * @since 4.9.71.p
     * @return string
     */
    public function getEditorScriptHandle();


    /**
     * @since 4.9.71.p
     * @return string
     */
    public function getEditorStyleHandle();


    /**
     * @since 4.9.71.p
     * @return string
     */
    public function getScriptHandle();


    /**
     * @since 4.9.71.p
     * @return string
     */
    public function getStyleHandle();
}