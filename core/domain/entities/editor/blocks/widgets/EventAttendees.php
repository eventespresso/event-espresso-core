<?php

namespace EventEspresso\core\domain\entities\editor\blocks\widgets;

use DomainException;
use EE_Error;
use EEM_Registration;
use EventEspresso\core\domain\entities\editor\Block;
use EventEspresso\core\domain\entities\editor\blocks\CoreBlocksAssetManager;
use EventEspresso\core\domain\entities\shortcodes\EspressoEventAttendees;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

/**
 * Class EventAttendees
 * Returns a list of people that have registered for the specified event
 *
 * @package EventEspresso\core\domain\entities\editor\blocks\common
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventAttendees extends Block
{

    const BLOCK_TYPE = 'widgets-event-attendees';

    /**
     * @var EspressoEventAttendees $shortcode
     */
    protected $shortcode;


    /**
     * EventAttendees constructor.
     *
     * @param CoreBlocksAssetManager $block_asset_manager
     * @param EspressoEventAttendees $shortcode
     */
    public function __construct(CoreBlocksAssetManager $block_asset_manager, EspressoEventAttendees $shortcode)
    {
        parent::__construct($block_asset_manager);
        $this->shortcode = $shortcode;
    }


    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize()
    {
        $this->setBlockType(self::BLOCK_TYPE);
        $this->setSupportedRoutes(
            array(
                'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditor',
                'EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostsEditor',
                'EventEspresso\core\domain\entities\route_match\specifications\frontend\EspressoBlockRenderer',
            )
        );
        $this->setAttributes(
            array(
                'eventId'            => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                'datetimeId'         => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                'ticketId'           => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                'status'              => array(
                    'type'    => 'string',
                    'default' => EEM_Registration::status_id_approved,
                ),
                'limit' => array(
                    'type'    => 'number',
                    'default' => 10,
                ),
                'showGravatar'       => array(
                    'type'    => 'boolean',
                    'default' => false,
                ),
                'displayOnArchives' => array(
                    'type'    => 'boolean',
                    'default' => false,
                ),
            )
        );
        $this->setDynamic();
    }


    /**
     * returns an array where the key corresponds to the incoming attribute name from the WP block
     * and the value corresponds to the attribute name for the existing EspressoEventAttendees shortcode
     *
     * @since $VID:$
     * @return array
     */
    private function getAttributesMap()
    {
        return array(
            'eventId'           => array('attribute' => 'event_id', 'sanitize' => 'absint'),
            'datetimeId'        => array('attribute' => 'datetime_id', 'sanitize' => 'absint'),
            'ticketId'          => array('attribute' => 'ticket_id', 'sanitize' => 'absint'),
            'status'            => array('attribute' => 'status', 'sanitize' => 'sanitize_text_field'),
            'limit'             => array('attribute' => 'limit', 'sanitize' => 'intval'),
            'showGravatar'      => array('attribute' => 'show_gravatar', 'sanitize' => 'bool'),
            'displayOnArchives' => array('attribute' => 'display_on_archives', 'sanitize' => 'bool'),
        );
    }


    /**
     * @param array $attributes
     * @since $VID:$
     * @return array
     */
    private function parseAttributes(array $attributes)
    {
        foreach ($attributes as $attribute => $value) {
            $convert = $this->getAttributesMap();
            if (isset($convert[ $attribute ])) {
                $sanitize = $convert[ $attribute ]['sanitize'];
                if ($sanitize === 'bool') {
                    $attributes[ $convert[ $attribute ]['attribute'] ] = filter_var(
                        $value,
                        FILTER_VALIDATE_BOOLEAN
                    );
                } else {
                    $attributes[ $convert[ $attribute ]['attribute'] ] = $sanitize($value);
                }
                if ($attribute !== $convert[ $attribute ]['attribute']) {
                    unset($attributes[ $attribute ]);
                }
            }
        }
        return $attributes;
    }


    /**
     * returns the rendered HTML for the block
     *
     * @param array $attributes
     * @return string
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws DomainException
     */
    public function renderBlock(array $attributes = array())
    {
        return $this->shortcode->processShortcode($this->parseAttributes($attributes));
    }
}
