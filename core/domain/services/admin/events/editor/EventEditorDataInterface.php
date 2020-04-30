<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

/**
 * Class EventEditorData
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface EventEditorDataInterface
{

    /**
     * @param $eventId
     * @return array
     * @since $VID:$
     */
    public function getData($eventId);
}
