<?php

namespace EventEspresso\core\domain\entities\editor\blocks\shortcodes;

use EE_Error;
use EventEspresso\core\domain\entities\editor\EditorBlock;
use EventEspresso\core\domain\entities\shortcodes\EspressoEvents;

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

    const BLOCK_TYPE = 'shortcode-events-list';


    /**
     * Perform any early setup required by the block
     *
     * @return void
     */
    public function initialize()
    {
        $this->setEditorBlockType(EventsList::BLOCK_TYPE);
        $this->setSupportedPostTypes(array('espresso_events', 'post', 'page'));
        $this->setAttributes(
            array(
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
            )
        );
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
