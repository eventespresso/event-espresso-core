<?php

namespace EventEspresso\core\domain\services\admin\privacy\export;

use EE_Registration;
use EE_Ticket;
use EEM_Answer;
use EEM_Registration;
use EventEspresso\core\services\privacy\export\PersonalDataExporterInterface;

/**
 * Class ExportRegistration
 * Returns information about what this user registered for
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class ExportRegistration implements PersonalDataExporterInterface
{
    /**
     * @var EEM_Registration
     */
    protected $registration_model;

    /**
     * ExportRegistration constructor.
     *
     * @param EEM_Registration $registration_model
     */
    public function __construct(EEM_Registration $registration_model)
    {
        $this->registration_model = $registration_model;
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
        $registrations = $this->registration_model->get_all(
            array(
                array(
                    'Attendee.ATT_email' => $email_address,
                ),
                'limit' => array(
                    ($page - 1) * $page_size,
                    $page_size,
                ),
            )
        );
        $export_fields = array_intersect_key(
            $this->registration_model->field_settings(),
            array_flip(
                array(
                    'REG_code',
                    'REG_date',
                    'REG_final_price',
                    'REG_paid',
                    'REG_url_link',
                    'REG_count',
                    'REG_group_size',
                    'REG_att_is_going',
                )
            )
        );
        $export_items = array();
        $found_something = false;
        foreach ($registrations as $registration) {
            /**
             * @var $registration EE_Registration
             */
            $found_something = true;
            $data = array();
            foreach ($export_fields as $field_name => $field_obj) {
                $data[] = array(
                    'name'  => $field_obj->get_nicename(),
                    'value' => $registration->get_pretty($field_name),
                );
            }
            $answers = $registration->answers(
                array(
                    'force_join' => array(
                        'Question',
                    ),
                )
            );
            foreach ($answers as $answer) {
                $data[] = array(
                    'name'  => $answer->question()->display_text(),
                    'value' => $answer->pretty_value(),
                );
            }
            $ticket = $registration->ticket();
            if ($ticket instanceof EE_Ticket) {
                $data[] = array(
                    'name'  => esc_html__('Ticket', 'event_espresso'),
                    'value' => $ticket->name_and_info(),
                );
                $data[] = array(
                    'name'  => esc_html__('Event', 'event_espresso'),
                    'value' => $ticket->get_event_name(),
                );
            }

            $export_items[] = array(
                'group_id'    => 'registration',
                'group_label' => esc_html__('Event Registrations', 'event_espresso'),
                'item_id'     => $registration->ID(),
                'data'        => $data,
            );
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
        return esc_html__('Event Espresso Registration Data Exporter', 'event_espresso');
    }
}
// End of file ExportRegistration.php
// Location: EventEspresso\core\domain\services\admin\privacy\export/ExportRegistration.php
