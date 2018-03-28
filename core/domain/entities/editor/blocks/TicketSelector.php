<?php

namespace EventEspresso\core\domain\entities\editor\blocks;

use EventEspresso\core\domain\entities\editor\EditorBlock;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class TicketSelector
 * Description
 *
 * @package EventEspresso\core\domain\entities\editor\blocks
 * @author  Brent Christensen
 * @since   $VID:$
 */
class TicketSelector extends EditorBlock
{

    const EDITOR_BLOCK_TYPE = 'event-espresso/widget-ticket-selector';


    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize()
    {
        $this->setEditorBlockType(TicketSelector::EDITOR_BLOCK_TYPE);
        $this->setSupportedPostTypes(array('espresso_events'));
    }


    /**
     * Registers the Editor Block with WP core;
     * Returns the registered block type on success, or false on failure.
     *
     * @return WP_Block_Type|false
     */
    public function registerBlock()
    {
        $wp_block_type = register_block_type(
            new WP_Block_Type(
                $this->editorBlockType(),
                array(
                    'editor_script' => 'ee-widget-ticket-selector',
                    'editor_style'  => 'ee-widget-ticket-selector',
                    'attributes'    => array(),
                )
            )
        );
        $this->setWpBlockType($wp_block_type);
        return $wp_block_type;
    }


    /**
     * @return array
     */
    public function getEditorContainer()
    {
        return array(
            $this->editorBlockType(),
            array()
        );
    }


    /**
     * @return  void
     */
    public function registerScripts()
    {
    }


    /**
     * @return void
     */
    public function registerStyles()
    {
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
