<?php

namespace EventEspresso\core\domain\entities\editor;

use EventEspresso\core\services\assets\BlockAssetManagerInterface;
use WP_Block_Type;

/**
 * Class Block
 * Registers a Block type with WordPress core
 * and executes all logic as necessary
 * ALL blocks should be located in
 *  \core\domain\entities\editor\blocks\
 * under the appropriate namespace root
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class Block implements BlockInterface
{

    /**
     * BlockAssetManager that this editor block uses for asset registration
     *
     * @var BlockAssetManagerInterface $block_asset_manager
     */
    protected $block_asset_manager;

    /**
     * @var array $attributes
     */
    private $attributes;

    /**
     * If set to true, then the block will render its content client side
     * If false, then the block will render its content server side using the renderBlock() method
     *
     * @var bool $dynamic
     */
    private $dynamic = false;

    /**
     * @var string $block_type
     */
    private $block_type;

    /**
     * @var array $supported_post_types
     */
    private $supported_post_types;

    /**
     * @var WP_Block_Type $wp_block_type
     */
    private $wp_block_type;


    /**
     * BlockLoader constructor.
     *
     * @param BlockAssetManagerInterface $block_asset_manager
     */
    public function __construct(BlockAssetManagerInterface $block_asset_manager)
    {
        $this->block_asset_manager = $block_asset_manager;
    }


    /**
     * @return string
     */
    public function blockType()
    {
        return $this->block_type;
    }


    /**
     * @return string
     */
    public function namespacedBlockType()
    {
        return self::NAME_SPACE . '/' . $this->block_type;
    }


    /**
     * @param string $block_type
     */
    protected function setBlockType($block_type)
    {
        $this->block_type = $block_type;
    }


    /**
     * BlockAssetManager that this editor block uses for asset registration
     *
     * @return BlockAssetManagerInterface
     */
    public function assetManager()
    {
        return $this->block_asset_manager;
    }


    /**
     * @param WP_Block_Type $wp_block_type
     */
    protected function setWpBlockType($wp_block_type)
    {
        $this->wp_block_type = $wp_block_type;
    }


    /**
     * @param array $supported_post_types
     */
    protected function setSupportedPostTypes(array $supported_post_types)
    {
        $this->supported_post_types = $supported_post_types;
    }


    /**
     * @return array
     */
    public function attributes()
    {
        return $this->attributes;
    }


    /**
     * @param array $attributes
     */
    public function setAttributes(array $attributes)
    {
        $this->attributes = $attributes;
    }


    /**
     * @return bool
     */
    public function isDynamic()
    {
        return $this->dynamic;
    }


    /**
     * @param bool $dynamic
     */
    public function setDynamic($dynamic = true)
    {
        $this->dynamic = filter_var($dynamic, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Registers the Editor Block with WP core;
     * Returns the registered block type on success, or false on failure.
     *
     * @return WP_Block_Type|false
     */
    public function registerBlock()
    {
        $args = array(
            'attributes'    => $this->attributes(),
            'editor_script' => $this->block_asset_manager->getEditorScriptHandle(),
            'editor_style'  => $this->block_asset_manager->getEditorStyleHandle(),
            'script'        => $this->block_asset_manager->getScriptHandle(),
            'style'         => $this->block_asset_manager->getStyleHandle(),
        );
        if (! $this->isDynamic()) {
            $args['render_callback'] = $this->renderBlock();
        }
        $wp_block_type = register_block_type(
            new WP_Block_Type(
                $this->namespacedBlockType(),
                $args
            )
        );
        $this->setWpBlockType($wp_block_type);
        return $wp_block_type;
    }


    /**
     * @return WP_Block_Type|false The registered block type on success, or false on failure.
     */
    public function unRegisterBlock()
    {
        return unregister_block_type($this->namespacedBlockType());
    }


    /**
     * returns true if the block type applies for the supplied post type
     * and should be added to that post type's editor
     *
     * @param string $post_type
     * @return boolean
     */
    public function appliesToPostType($post_type)
    {
        return in_array($post_type, $this->supported_post_types, true);
    }


    /**
     * @return array
     */
    public function getEditorContainer()
    {
        return array(
            $this->namespacedBlockType(),
            array(),
        );
    }


    /**
     * returns the rendered HTML for the block
     *
     * @param array $attributes
     * @return string
     */
    public function renderBlock(array $attributes = array())
    {
        return '';
    }
}
