<?php

namespace EventEspresso\core\domain\services\admin\privacy\export;

use EE_Error;
use EE_Form_Section_Proper;
use EEM_Attendee;
use EEM_Payment_Method;
use EventEspresso\core\services\privacy\export\PersonalDataExporterInterface;

/**
 * Class ExportAttendeeBillingData
 * Returns all the billing data we have stored on users of that email address
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class ExportAttendeeBillingData implements PersonalDataExporterInterface
{
    /**
     * @var EEM_Attendee
     */
    protected $attendee_model;

    /**
     * @var EEM_Payment_Method
     */
    protected $payment_method_model;

    /**
     * ExportAttendeeBillingData constructor.
     *
     * @param EEM_Attendee $attendee_model
     */
    public function __construct(EEM_Attendee $attendee_model, EEM_Payment_Method $payment_method_model)
    {
        $this->attendee_model = $attendee_model;
        $this->payment_method_model = $payment_method_model;
    }

    /**
     * Returns data for export.
     *
     * @param string    $email_address ,
     * @param int       $page          starts at 1, not 0
     * @return array {
     * @type array      $data          {
     * @type array {
     * @type string     $group_id      (not translated, same for all exports)
     * @type string     $group_label   (translated string)
     * @type string|int $item_id
     * @type array      $data          {
     * @type array {
     * @type string     $name          what's shown in the left-column of the export row
     * @type string     $value         what's showin the right-column of the export row
     *                                 }
     *                                 }
     *                                 }
     *                                 }
     *                                 }
     */
    public function export($email_address, $page = 1)
    {
        $page_size = 10;
        $attendees = $this->attendee_model->get_all(
            array(
                array(
                    'ATT_email' => $email_address,
                ),
                'limit' => array(
                    ($page - 1) * $page_size,
                    $page_size,
                ),
            )
        );
        // get all payment methods, even inactive ones
        $payment_methods = $this->payment_method_model->get_all(
            array(
                'group_by' => array('PMD_type'),
            )
        );
        $export_items = array();
        $found_something = false;
        foreach ($attendees as $attendee) {
            foreach ($payment_methods as $payment_method) {
                try {
                    $billing_info = $attendee->billing_info_for_payment_method($payment_method);
                } catch (EE_Error $e) {
                    $billing_info = null;
                }
                if (! $billing_info instanceof EE_Form_Section_Proper) {
                    continue;
                }
                $found_something = true;
                $data = array();
                foreach ($billing_info->input_pretty_values(true, true) as $input_name => $display_value) {
                    try {
                        $input = $billing_info->get_input($input_name);
                        $input_display_name = $input->html_label_text();
                    } catch (EE_Error $e) {
                        $input_display_name = $input_name;
                    }
                    $data[] = array(
                        'name'  => strip_tags($input_display_name),
                        'value' => $display_value,
                    );
                }
                $export_items[] = array(
                    'group_id'    => 'billing_data',
                    'group_label' => esc_html__('Billing Data', 'event_espresso'),
                    'item_id'     => $attendee->ID() . '-' . $payment_method->ID(),
                    'data'        => $data,
                );
            }
        }
        return array(
            'data' => $export_items,
            'done' => ! $found_something,
        );
    }

    /**
     * Gets the Translated name of this exporter
     *
     * @return string
     */
    public function name()
    {
        return esc_html__('Event Espresso Attendee Billing Data Exporter', 'event_espresso');
    }
}
// End of file ExportAttendeeBillingData.php
// Location: EventEspresso\core\domain\services\admin\privacy\export/ExportAttendeeBillingData.php
