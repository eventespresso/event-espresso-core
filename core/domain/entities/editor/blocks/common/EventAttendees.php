<?php

namespace EventEspresso\core\domain\entities\editor\blocks\common;

use EventEspresso\core\domain\entities\editor\EditorBlock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EventAttendees
 * returns a list of people that have registered for the specified event
 *
 * @package EventEspresso\core\domain\entities\editor\blocks\common
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventAttendees extends EditorBlock
{

    const BLOCK_TYPE = 'common-event-attendees';


    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize()
    {
        $this->setEditorBlockType(EventAttendees::BLOCK_TYPE);
        $this->setSupportedPostTypes(array('espresso_events', 'post', 'page'));
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
        return '';
    }

}
