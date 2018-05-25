<?php

namespace EventEspresso\core\domain\entities\editor\blocks\widgets;

use EventEspresso\core\domain\entities\editor\Block;
use EventEspresso\core\domain\entities\editor\blocks\CoreBlocksAssetManager;
use EventEspresso\core\domain\entities\shortcodes\EspressoEventAttendees;

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
        $this->setSupportedPostTypes(array('espresso_events', 'post', 'page'));
        $this->setAttributes(array());
        $this->setDynamic();
    }


    /**
     * returns the rendered HTML for the block
     *
     * @param array $attributes
     * @return string
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    public function renderBlock(array $attributes = array())
    {
        if(! isset($attributes['selectedEventId'])) {
            return '<h2>' . __METHOD__ . '()</h2>' . var_export($attributes, true);
        }
        $attributes['event_id'] = absint($attributes['selectedEventId']);
        return $this->shortcode->processShortcode($attributes);
    }
}
