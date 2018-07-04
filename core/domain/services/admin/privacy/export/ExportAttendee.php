<?php

namespace EventEspresso\core\domain\services\admin\privacy\export;

use EEM_Attendee;
use EventEspresso\core\services\privacy\export\PersonalDataExporterInterface;

/**
 * Class ExportAttendee
 * Returns data on all the attendees using that email address
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class ExportAttendee implements PersonalDataExporterInterface
{
    /**
     * @var EEM_Attendee
     */
    protected $attendee_model;

    /**
     * ExportAttendee constructor.
     *
     * @param EEM_Attendee $attendee_model
     */
    public function __construct(EEM_Attendee $attendee_model)
    {
        $this->attendee_model = $attendee_model;
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
        $attendees = $this->attendee_model->get_all(
            array(
                array(
                    'ATT_email' => $email_address,
                ),
            )
        );

        if (empty($attendees)) {
            return array(
                'data' => array(),
                'done' => true,
            );
        }

        $export_items = array();
        foreach ($attendees as $attendee) {
            $export_fields = array_intersect_key(
                $this->attendee_model->field_settings(),
                array_flip(
                    array(
                        'ATT_fname',
                        'ATT_lname',
                        'ATT_email',
                        'ATT_address1',
                        'ATT_address2',
                        'ATT_city',
                        'STA_ID',
                        'CNT_ISO',
                        'ATT_zip',
                        'ATT_phone',
                    )
                )
            );
            $data = array();
            foreach ($export_fields as $field_name => $field_obj) {
                if ($field_name === 'STA_ID') {
                    $value = $attendee->state_name();
                } elseif ($field_name == 'CNT_ISO') {
                    $value = $attendee->country_name();
                } else {
                    $value = $attendee->get_pretty($field_name);
                }
                $data[] = array(
                    'name'  => $field_obj->get_nicename(),
                    'value' => $value,
                );
            }
            $export_items[] =
                array(
                    'group_id'    => 'att-' . $attendee->ID(),
                    'group_label' => esc_html__('Contact Profiles', 'event_espresso'),
                    'item_id'     => $attendee->ID(),
                    'data'        => $data,
                );
        }
        return array(
            'data' => $export_items,
            'done' => true,
        );
    }

    /**
     * Gets the Translated name of this exporter
     *
     * @return string
     */
    public function name()
    {
        return esc_html__('Event Espresso Attendee Data Exporter', 'event_espresso');
    }
}
// End of file ExportAttendee.php
// Location: EventEspresso\core\domain\services\admin\privacy\export/ExportAttendee.php
