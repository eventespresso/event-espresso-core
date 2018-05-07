<?php

namespace EventEspresso\core\domain\entities\editor\blocks\widgets;

use EventEspresso\core\domain\entities\editor\Block;
use EventEspresso\core\domain\entities\editor\blocks\CoreBlocksAssetManager;

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
     * EventAttendees constructor.
     *
     * @param CoreBlocksAssetManager $block_asset_manager
     */
    public function __construct(CoreBlocksAssetManager $block_asset_manager)
    {
        parent::__construct($block_asset_manager);
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
    }
}
