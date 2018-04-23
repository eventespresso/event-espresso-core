<?php

namespace EventEspresso\core\domain\entities\editor;

use EventEspresso\core\services\assets\AssetRegisterInterface;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



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

    const NS = 'event-espresso/';

    /**
     * AssetRegister that this editor block uses for asset registration
     *
     * @var AssetRegisterInterface $asset_register_fqcn
     */
    protected $asset_register;

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
     * @var string $editor_block_type
     */
    private $editor_block_type;

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
     * @param AssetRegisterInterface $asset_register
     */
    public function __construct(AssetRegisterInterface $asset_register) {
        $this->asset_register = $asset_register;
    }


    /**
     * @return string
     */
    public function blockType()
    {
        return $this->editor_block_type;
    }


    /**
     * @return string
     */
    public function namespacedBlockType()
    {
        return Block::NS . $this->editor_block_type;
    }


    /**
     * @param string $editor_block_type
     */
    protected function setBlockType($editor_block_type)
    {
        $this->editor_block_type = $editor_block_type;
    }


    /**
     * AssetRegister that this editor block uses for asset registration
     *
     * @return AssetRegisterInterface
     */
    public function assetRegister()
    {
        return $this->asset_register;
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
        $args          = array(
            'attributes'      => $this->attributes(),
            'editor_script'   => $this->asset_register->scriptHandle(),
            'editor_style'    => $this->asset_register->styleHandle(),
            'script'          => $this->asset_register->scriptHandle(),
            'style'           => $this->asset_register->styleHandle(),
        );
        if(! $this->isDynamic()) {
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
            array()
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
