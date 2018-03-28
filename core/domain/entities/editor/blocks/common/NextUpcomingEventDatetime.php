<?php

namespace EventEspresso\core\domain\entities\editor\blocks\common;

use EventEspresso\core\domain\entities\editor\EditorBlock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class NextUpcomingEventDatetime
 * Description
 *
 * @package EventEspresso\core\domain\entities\editor\blocks\common
 * @author  Brent Christensen
 * @since   $VID:$
 */
class NextUpcomingEventDatetime extends EditorBlock
{

    const BLOCK_TYPE = 'common-next-upcoming-event-datetime';


    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize()
    {
        $this->setEditorBlockType(NextUpcomingEventDatetime::BLOCK_TYPE);
        $this->setSupportedPostTypes(array('espresso_events', 'posts'));
        $this->setAttributes(
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
        return espresso_next_upcoming_datetime();
    }
}
