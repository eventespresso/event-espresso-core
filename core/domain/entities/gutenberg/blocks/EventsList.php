<?php

namespace EventEspresso\core\domain\entities\gutenberg\blocks;

use EE_Error;
use EventEspresso\core\domain\entities\gutenberg\GutenbergBlock;
use EventEspresso\core\domain\entities\shortcodes\EspressoEvents;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EventsList
 * GutenbergBlock for the Events List / EspressoEvents shortcode
 *
 * @package EventEspresso\core\domain\entities\gutenberg\blocks
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventsList extends GutenbergBlock
{

    const GUTENBERG_BLOCK_TYPE = 'ee-shortcodes/events-list';


    /**
     * Perform any early setup required by the block
     *
     * @return void
     */
    public function initialize()
    {
    }


    /**
     * @return WP_Block_Type|false The registered block type on success, or false on failure.
     */
    public function registerBlock()
    {
        $this->block_type = register_block_type(
            new WP_Block_Type(
                EventsList::GUTENBERG_BLOCK_TYPE,
                array(
                    'editor_script'   => 'ee-shortcode-blocks',
                    'editor_style'    => 'ee-block-styles',
                    'render_callback' => array($this, 'renderEventsList'),
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
        return $this->block_type;
    }


    /**
     * @return WP_Block_Type|false The registered block type on success, or false on failure.
     */
    public function unRegisterBlock()
    {
        return unregister_block_type(EventsList::GUTENBERG_BLOCK_TYPE);
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
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     */
    public function renderEventsList(array $attributes = array())
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
