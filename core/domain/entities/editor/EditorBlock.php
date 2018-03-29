<?php

namespace EventEspresso\core\domain\entities\editor;

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\services\loaders\LoaderInterface;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EditorBlock
 * Registers a Editor block type with WordPress core,
 * specifies all assets required for the block,
 * and executes all logic as necessary
 * ALL blocks should be located in
 *  \core\domain\entities\editor\blocks\
 * under the appropriate namespace root
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class EditorBlock implements EditorBlockInterface
{

    const NS = 'event-espresso/';

    /**
     * @var DomainInterface $domain
     */
    protected $domain;

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @var string $editor_block_type
     */
    private $editor_block_type;

    /**
     * @var WP_Block_Type $wp_block_type
     */
    private $wp_block_type;

    /**
     * @var array $supported_post_types
     */
    private $supported_post_types;

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
     * EditorBlockLoader constructor.
     *
     * @param DomainInterface $domain
     * @param LoaderInterface $loader
     */
    public function __construct(DomainInterface $domain, LoaderInterface $loader)
    {
        $this->domain = $domain;
        $this->loader = $loader;
    }


    /**
     * @return string
     */
    public function editorBlockType()
    {
        return $this->editor_block_type;
    }


    /**
     * @return string
     */
    public function namespacedEditorBlockType()
    {
        return EditorBlock::NS . $this->editor_block_type;
    }


    /**
     * @param string $editor_block_type
     */
    protected function setEditorBlockType($editor_block_type)
    {
        $this->editor_block_type = $editor_block_type;
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
        $context ='core';
        // todo add route detection (ie inject route) and change context based on route
        $args          = array(
            'attributes'      => $this->attributes(),
            'editor_script'   => "ee-{$context}-blocks",
            'editor_style'    => "ee-{$context}-blocks",
            'script'          => "ee-{$context}-blocks",
            'style'           => "ee-{$context}-blocks",
        );
        if(! $this->isDynamic()) {
            $args['render_callback'] = $this->renderBlock();
        }
        $wp_block_type = register_block_type(
            new WP_Block_Type(
                $this->namespacedEditorBlockType(),
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
        return unregister_block_type($this->namespacedEditorBlockType());
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
            $this->namespacedEditorBlockType(),
            array()
        );
    }


    /**
     * @return  void
     */
    public function registerScripts()
    {
        // wp_register_script(
        //     'core-blocks',
        //     $this->domain->distributionAssetsUrl() . 'ee-core-blocks.dist.js',
        //     array(
        //         'wp-blocks',    // Provides useful functions and components for extending the editor
        //         'wp-i18n',      // Provides localization functions
        //         'wp-element',   // Provides React.Component
        //         'wp-components' // Provides many prebuilt components and controls
        //     ),
        //     filemtime($this->domain->distributionAssetsPath() . 'ee-core-blocks.dist.js')
        // );
    }


    /**
     * @return void
     */
    public function registerStyles()
    {
        // wp_register_style(
        //     'ee-block-styles',
        //     $this->domain->distributionAssetsUrl() . 'style.css',
        //     array(),
        //     filemtime($this->domain->distributionAssetsPath() . 'style.css')
        // );
    }
}
