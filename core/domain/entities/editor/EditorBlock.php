<?php

namespace EventEspresso\core\domain\entities\editor;


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
     * EditorBlockLoader constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
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
     * @return WP_Block_Type|false The registered block type on success, or false on failure.
     */
    public function unRegisterBlock()
    {
        return unregister_block_type($this->editorBlockType());
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

}
