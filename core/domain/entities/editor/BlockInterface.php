<?php

namespace EventEspresso\core\domain\entities\editor;

use EventEspresso\core\services\assets\BlockAssetManagerInterface;
use WP_Block_Type;

/**
 * Interface BlockInterface
 * Classes implementing this interface are responsible for
 * Registering a Editor block type with WordPress core,
 * specifying all assets required for the block,
 * and executing all logic as necessary
 * ALL blocks should be located in
 *  \core\domain\entities\editor\blocks\
 * under the appropriate namespace root
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
interface BlockInterface
{

    const NAME_SPACE = 'eventespresso';

    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize();


    /**
     * @return string
     */
    public function blockType();


    /**
     * AssetRegister that this editor block uses for asset registration
     *
     * @return BlockAssetManagerInterface
     */
    public function assetManager();


    /**
     * Registers the Editor Block with WP core;
     * Returns the registered block type on success, or false on failure.
     *
     * @return WP_Block_Type|false
     */
    public function registerBlock();


    /**
     * Un-registers the Editor Block with WP core;
     * Returns the registered block type on success, or false on failure.
     *
     * @return WP_Block_Type|false
     */
    public function unRegisterBlock();


    /**
     * returns an array of fully qualified class names
     * for RouteMatchSpecificationInterface objects
     * that specify routes that the block should be loaded for.
     *
     * @return array
     */
    public function supportedRoutes();


    /**
     * @return array
     */
    public function getEditorContainer();


    /**
     * returns the rendered HTML for the block
     *
     * @param array $attributes
     * @return string
     */
    public function renderBlock(array $attributes = array());
}
