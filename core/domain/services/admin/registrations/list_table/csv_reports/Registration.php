<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports;

use EE_Config;
use EE_Error;
use EE_Registry;
use EEH_Export;
use EEM_Registration;
use ReflectionException;

/**
 * Class Registration
 * Adds registration columns to the CSV row
 *
 * @author  Hossein Rafiei
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports
 */
class Registration
{

    /**
     * @var array
     */
    private array $fields;


    /**
     * @var array
     */
    private array $reg_row;


    /**
     * @var EEM_Registration
     */
    private EEM_Registration $reg_model;


    /**
     * Registration constructor.
     *
     * @param array $fields
     * @param array $reg_row
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(array $fields, array $reg_row)
    {
        $this->fields = $fields;
        $this->reg_row = $reg_row;
        $this->reg_model = EE_Registry::instance()->load_model('Registration');
    }


    /**
     * Adds registration columns to the CSV row
     *
     * @param array $data
     * @return mixed
     * @throws EE_Error
     */
    public function addRegistrationColumns(array $data)
    {
        foreach ($this->fields as $field_name) {
            $field = $this->reg_model->field_settings_for($field_name);
            if ($field_name == 'REG_final_price') {
                $value = EEH_Export::prepare_value_from_db_for_display(
                    $this->reg_model,
                    $field_name,
                    $this->reg_row['Registration.REG_final_price'],
                    'localized_float'
                );
            } elseif ($field_name == 'REG_count') {
                $value = sprintf(
                /* translators: 1: number of registration in group (REG_count), 2: registration group size (REG_group_size) */
                    esc_html__('%1$s of %2$s', 'event_espresso'),
                    EEH_Export::prepare_value_from_db_for_display(
                        $this->reg_model,
                        'REG_count',
                        $this->reg_row['Registration.REG_count']
                    ),
                    EEH_Export::prepare_value_from_db_for_display(
                        $this->reg_model,
                        'REG_group_size',
                        $this->reg_row['Registration.REG_group_size']
                    )
                );
            } elseif ($field_name == 'REG_date') {
                $value = EEH_Export::prepare_value_from_db_for_display(
                    $this->reg_model,
                    $field_name,
                    $this->reg_row['Registration.REG_date'],
                    'no_html'
                );
            } else {
                $value = EEH_Export::prepare_value_from_db_for_display(
                    $this->reg_model,
                    $field_name,
                    $this->reg_row[ $field->get_qualified_column() ]
                );
            }
            $data[ EEH_Export::get_column_name_for_field($field) ] = $value;
            if ($field_name == 'REG_final_price') {
                // add a column named Currency after the final price
                $data[ (string) esc_html__("Currency", "event_espresso") ] = EE_Config::instance()->currency->code;
            }
        }
        return $data;
    }
}
