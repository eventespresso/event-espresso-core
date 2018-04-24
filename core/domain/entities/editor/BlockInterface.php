<?php

namespace EventEspresso\core\domain\entities\editor;

use EventEspresso\core\services\assets\AssetRegisterInterface;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
 * @since   $VID:$
 */
interface BlockInterface
{

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
     * @return AssetRegisterInterface
     */
    public function assetRegister();


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
     * returns true if the block type applies for the supplied post type
     * and should be added to that post type's editor
     *
     * @param string $post_type
     * @return boolean
     */
    public function appliesToPostType($post_type);


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
