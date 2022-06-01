<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports;

use EE_Error;
use EEH_Export;
use EEM_Attendee;
use EEM_Country;
use EEM_State;

/**
 * Class Attendee
 * Adds attendee columns to the CSV row
 *
 * @author  Hossein Rafiei
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports
 */
class AttendeeCSV
{

    /**
     * Adds attendee columns to the CSV row
     *
     * @param array $fields
     * @param array $reg_row
     * @param array $data
     * @return array
     * @throws EE_Error
     */
    public static function addAttendeeColumns(array $fields, array $reg_row, array $data)
    {
        foreach ($fields as $field_name) {
            $field_obj = EEM_Attendee::instance()->field_settings_for($field_name);
            if ($reg_row['Attendee_CPT.ID']) {
                switch ($field_name) {
                    case 'STA_ID':
                        $value = EEM_State::instance()->get_var(
                            [
                                ['STA_ID' => $reg_row['Attendee_Meta.STA_ID']]
                            ],
                            'STA_name'
                        );
                        break;
                    case 'CNT_ISO':
                        $value = EEM_Country::instance()->get_var(
                            [
                                ['CNT_ISO' => $reg_row['Attendee_Meta.CNT_ISO']]
                            ],
                            'CNT_name'
                        );
                        break;
                    default:
                        $value = EEH_Export::prepare_value_from_db_for_display(
                            EEM_Attendee::instance(),
                            $field_name,
                            $reg_row[ $field_obj->get_qualified_column() ]
                        );
                }
            } else {
                $value = '';
            }
            $data[ EEH_Export::get_column_name_for_field($field_obj) ] = $value;
        }
        return $data;
    }
}
