<?php

namespace EventEspresso\core\domain\services\converters\json;

use EE_Datetime;
use EE_Error;
use EE_Event;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\converters\json\ModelObjectToJsonConverterInterface;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class DatetimeToJson
 * converts EE_Datetime model object to JSON
 *
 * @package EventEspresso\core\domain\services\converters\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DatetimeToJson implements ModelObjectToJsonConverterInterface
{

    /**
     * @param EE_Datetime[] $datetimes
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function convertAndEncodeArrayOf(array $datetimes)
    {
        $jsonDates = [];
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                $jsonDates[ $datetime->ID() ] = $this->convertAndEncode($datetime);
            }
        }
        return $jsonDates;
    }


    /**
     * @param EE_Datetime $datetime
     * @return false|string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function convertAndEncode($datetime)
    {
        return $datetime instanceof EE_Datetime ? $this->encode($this->convert($datetime)) : false;
    }


    /**
     * @param EE_Datetime[] $datetimes
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function convertArrayOf(array $datetimes)
    {
        $arrayOfDates = [];
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                $arrayOfDates[ $datetime->ID() ] = $this->convert($datetime);
            }
        }
        return $arrayOfDates;
    }


    /**
     * @param EE_Datetime $datetime
     * @return array
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function convert($datetime)
    {
        return $datetime instanceof EE_Datetime ? [
            'DTT_ID'          => $datetime->ID(),
            'EVT_ID'          => $datetime->event() instanceof EE_Event ? $datetime->event()->ID() : 0,
            'DTT_name'        => $datetime->name(),
            'DTT_description' => $datetime->description(),
            'DTT_EVT_start'   => $datetime->start_date(DATE_ATOM),
            'DTT_EVT_end'     => $datetime->end_date(DATE_ATOM),
            'DTT_sold'        => $datetime->sold(),
            'DTT_reserved'    => $datetime->reserved(),
            'DTT_reg_limit'   => $datetime->reg_limit() === INF ? -1 : $datetime->reg_limit(),
            'DTT_is_primary'  => $datetime->get_active_status(),
            'DTT_order'       => $datetime->order(),
            'DTT_parent'      => $datetime->parent(),
            'DTT_deleted'     => $datetime->get('DTT_deleted'),
        ] : [];
    }


    /**
     * @param EE_Datetime[] $datetimes
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function encodeArrayOf(array $datetimes)
    {
        $jsonDates = [];
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                $jsonDates[ $datetime->ID() ] = $this->encode($datetime);
            }
        }
        return $jsonDates;
    }


    /**
     * @param array $datetime_array
     * @return false|string
     * @since $VID:$
     */
    public function encode(array $datetime_array)
    {
        return wp_json_encode($datetime_array);
    }
}
