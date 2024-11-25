<?php

namespace EventEspresso\core\domain\services\registration\form\v1\subsections;

use EE_Error;
use EE_Form_Section_HTML;
use EE_Event;
use EEH_HTML;
use ReflectionException;

class EventHeader extends EE_Form_Section_HTML
{
    private static int $prev_event_id  = 0;


    /**
     * @param EE_Event $event
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Event $event)
    {
        parent::__construct(
            // only show event title if not admin and event id is not the same as the previous event id
            ! is_admin() && $event->ID() !== EventHeader::$prev_event_id
                ? EEH_HTML::h4(esc_html($event->name()), "event_title-{$event->ID()}", 'big-event-title-hdr')
                : ''
        );
        // update prev event id after generating header html
        EventHeader::$prev_event_id = $event->ID();
    }
}
