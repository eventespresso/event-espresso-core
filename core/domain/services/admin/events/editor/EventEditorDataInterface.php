<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

/**
 * Class EventEditorData
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface EventEditorDataInterface
{
    /**
     * @param int $eventId
     * @return array
     * @since 5.0.0.p
     */
    public function getData(int $eventId);
}
