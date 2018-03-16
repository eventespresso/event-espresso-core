<?php

namespace EventEspresso\core\domain\entities\editor\blocks;

use EE_Error;
use EventEspresso\core\domain\entities\editor\EditorBlock;
use EventEspresso\core\domain\entities\shortcodes\EspressoEvents;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EventsList
 * EditorBlock for the Events List / EspressoEvents shortcode
 *
 * @package EventEspresso\core\domain\entities\editor\blocks
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventsList extends EditorBlock
{

    const EDITOR_BLOCK_TYPE = 'ee-shortcodes/events-list';


    /**
     * Perform any early setup required by the block
     *
     * @return void
     */
    public function initialize()
    {
        $this->setEditorBlockType(EventsList::EDITOR_BLOCK_TYPE);
        $this->setSupportedPostTypes(array('espresso_events', 'post', 'page'));
    }



    /**
     * @return WP_Block_Type|false The registered block type on success, or false on failure.
     */
    public function registerBlock()
    {
        $wp_block_type = register_block_type(
            new WP_Block_Type(
                $this->editorBlockType(),
                array(
                    'editor_script'   => 'ee-shortcode-blocks',
                    'editor_style'    => 'ee-block-styles',
                    'render_callback' => array($this, 'renderBlock'),
                    'attributes'      => array(
                        'title'        => array(
                            'type' => 'string',
                        ),
                        'limit'        => array(
                            'type'    => 'integer',
                            'default' => 10,
                        ),
                        'cssClass'     => array(
                            'type' => 'string',
                        ),
                        'showExpired'  => array(
                            'type'    => 'boolean',
                            'default' => false,
                        ),
                        'month'        => array(
                            'type' => 'string',
                        ),
                        'categorySlug' => array(
                            'type' => 'string',
                        ),
                        'orderBy'      => array(
                            'type'    => 'string',
                            'enum'    => array(
                                'start_date',
                                'ticket_start',
                                'ticket_end',
                                'venue_title',
                                'city',
                                'state',
                            ),
                            'default' => 'start_date',
                        ),
                        'order'        => array(
                            'type'    => 'string',
                            'default' => 'ASC',
                            'enum'    => array('ASC', 'DESC'),
                        ),
                        'showTitle'    => array(
                            'type'    => 'boolean',
                            'default' => true,
                        ),
                    ),
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
            'core/paragraph',
            array('placeholder' => esc_html__('Add description...', 'event_espresso'))
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
     * @param array $attributes
     * @return string
     * @throws EE_Error
     */
    public function renderBlock(array $attributes = array())
    {
        /** @var EspressoEvents $shortcode */
        $shortcode  = $this->loader->getShared('EventEspresso\core\domain\entities\shortcodes\EspressoEvents');
        $attributes = $this->mapAttributes($attributes);
        return $shortcode->processShortcodeCallback($attributes);
    }


    /**
     * Maps new style block attributes to old style shortcode attribute keys.
     *
     * @param array $attributes
     * @return array
     */
    private function mapAttributes(array $attributes)
    {
        $replacements   = array(
            'cssClass'     => 'css_class',
            'showExpired'  => 'show_expired',
            'categorySlug' => 'category_slug',
            'orderBy'      => 'order_by',
            'order'        => 'sort',
            'showTitle'    => 'show_title',
        );
        $new_attributes = array();
        array_walk(
            $attributes,
            function ($value, $key) use (&$new_attributes, $replacements)
            {
                $new_key                    = isset($replacements[ $key ]) ? $replacements[ $key ] : $key;
                $value                      = $value === 'none' ? null : $value;
                $new_attributes[ $new_key ] = $value;
            }
        );
        return $new_attributes;
    }
}
