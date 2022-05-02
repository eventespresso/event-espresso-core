<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports;

use EE_Checkin;
use EE_Datetime;
use EE_Error;
use ReflectionException;

/**
 * Class Checkins
 * Renders the Checkin data
 *
 * @author  Hossein Rafiei
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports
 */
class Checkins
{

    /**
     * Returns datetime label
     *
     * @param EE_Datetime $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getDatetineLabel(EE_Datetime $datetime)
    {
        if (trim($datetime->get('DTT_name'))) {
            /* translators: 1: datetime name, 2: datetime ID */
            $name = sprintf(
                esc_html__('Check-ins for %1$s - ID: %2$s', 'event_espresso'),
                esc_html($datetime->get('DTT_name')),
                esc_html($datetime->get('DTT_ID'))
            );
        } else {
            /* translators: %s: datetime ID */
            $name = sprintf(
                esc_html__('ID: %1$s', 'event_espresso'),
                esc_html($datetime->get('DTT_ID'))
            );
        }

        return $name;
    }


    /**
     * Returns checkin value using checkin status and datetime
     *
     * @param EE_Checkin $checkin
     * @return string|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getCheckinValue(?EE_Checkin $checkin)
    {
        $value = NULL;
        if ($checkin instanceof EE_Checkin && $checkin->get('CHK_in') === true) {
            /* translators: 1: check-in timestamp */
            $value = sprintf(
                esc_html__('IN: %1$s', 'event_espresso'),
                $checkin->get_datetime('CHK_timestamp', 'Y-m-d', 'g:i a')
            );
        } elseif ($checkin instanceof EE_Checkin && $checkin->get('CHK_in') === false) {
            /* translators: 1: check-in timestamp */
            $value = sprintf(
                esc_html__('OUT: %1$s', 'event_espresso'),
                $checkin->get_datetime('CHK_timestamp', 'Y-m-d', 'g:i a')
            );
        }

        return $value;
    }
}
