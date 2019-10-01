<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

use EE_Datetime;
use EE_Error;
use EEM_Datetime;
use EventEspresso\core\domain\services\converters\json\DatetimeToJson;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\graphql\ResolverBase;
use GraphQL\Type\Definition\ResolveInfo;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\AppContext;


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
     * @var DatetimeToJson $converter
     */
    protected $converter;

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
     * @param object         $query_data
     * @param EEM_Datetime   $datetime_model
     * @param DatetimeToJson $converter
     */
    public function __construct($query_data, EEM_Datetime $datetime_model, DatetimeToJson $converter)
    {
        $this->query_data = $query_data;
        $this->datetime_model = $datetime_model;
        $this->converter = $converter;
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function query()
    {
        return 'Event';
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function field()
    {
        return 'eventDates';
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function type()
    {
        return 'String';
    }


    /**
     * @param             $root
     * @param array       $args
     * @param AppContext  $context
     * @param ResolveInfo $info
     * @return string
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolve($event)
    {
        return wp_json_encode($this->converter->convertArrayOf($this->getDatesForEvent($event->ID)));
    }


    /**
     * @return EE_Datetime[]
     * @throws EE_Error
     * @since $VID:$
     */
    public function getDatesForEvent($eventId)
    {
        return $this->datetime_model->get_all_event_dates($eventId);
    }

}