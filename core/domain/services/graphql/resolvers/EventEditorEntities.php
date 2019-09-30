<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

use EE_Datetime;
use EE_Error;
use EEM_Datetime;

/**
 * Class EventEditorEntities
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\resolvers
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventEditorEntities
{

    /**
     * @var EEM_Datetime $datetime_model
     */
    protected $datetime_model;

    /**
     * @var object $query_data
     */
    protected $query_data;


    /**
     * EventEditorEntities constructor.
     *
     * @param object $query_data
     * @param EEM_Datetime $datetime_model
     */
    public function __construct($query_data, EEM_Datetime $datetime_model)
    {
        $this->query_data = $query_data;
        $this->datetime_model = $datetime_model;
    }


    /**
     * @return EE_Datetime[]
     * @throws EE_Error
     * @since $VID:$
     */
    public function getDatesForEvent()
    {
        return $this->datetime_model->get_all_event_dates(
            $this->query_data->eventId()
        );
    }
}