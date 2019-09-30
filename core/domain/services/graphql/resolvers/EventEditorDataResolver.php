<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

use EE_Datetime;
use EE_Error;
use EEM_Datetime;
use EventEspresso\core\services\graphql\ResolverBase;
use WPGraphQL\AppContext;
use WPGraphQL\ResolveInfo;


/**
 * Class EventEditorEntities
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\resolvers
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventEditorDataResolver extends ResolverBase
{

    /**
     * @var EEM_Datetime $datetime_model
     */
    protected $datetime_model;


    /**
     * EventEditorEntities constructor.
     *
     * @param EEM_Datetime $datetime_model
     */
    public function __construct(EEM_Datetime $datetime_model)
    {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        $this->datetime_model = $datetime_model;
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function query()
    {
        return 'RootQuery';
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function field()
    {
        return 'EventDates';
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function type()
    {
        return 'CustomRegisteredType';
    }


    /**
     * @param             $root
     * @param array       $args
     * @param AppContext  $context
     * @param ResolveInfo $info
     * @return mixed
     * @throws EE_Error
     * @since $VID:$
     */
    public function resolve($root, array $args, AppContext $context, ResolveInfo $info)
    {
        $dates = $this->getDatesForEvent();
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