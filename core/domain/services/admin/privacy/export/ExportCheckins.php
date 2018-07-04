<?php

namespace EventEspresso\core\domain\services\admin\privacy\export;

use EE_Registration;
use EEM_Checkin;
use EventEspresso\core\services\privacy\export\PersonalDataExporterInterface;

/**
 * Class ExportCheckins
 * Returns data about when the user checked in or out of events
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class ExportCheckins implements PersonalDataExporterInterface
{
    /**
     * @var EEM_Checkin
     */
    protected $checkin_model;

    /**
     * ExportCheckins constructor.
     *
     * @param EEM_Checkin $checkin_model
     */
    public function __construct(EEM_Checkin $checkin_model)
    {
        $this->checkin_model = $checkin_model;
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
        $checkins = $this->checkin_model->get_all(
            array(
                array(
                    'Registration.Attendee.ATT_email' => $email_address,
                ),
                'limit'      => array(
                    ($page - 1) * $page_size,
                    $page_size,
                ),
                'force_join' => array('Registration.Event'),
            )
        );

        if (empty($checkins)) {
            return array(
                'data' => array(),
                'done' => true,
            );
        }

        $export_items = array();
        foreach ($checkins as $checkin) {
            $reg = $checkin->get_first_related('Registration');
            if ($reg instanceof EE_Registration) {
                $event_name = $reg->event_name();
            } else {
                $event_name = esc_html__('Unknown', 'event_espresso');
            }
            $export_items[] =
                array(
                    'group_id'    => 'check-ins',
                    'group_label' => esc_html__('Event Check-Ins', 'event_espresso'),
                    'item_id'     => $checkin->ID(),
                    'data'        => array(
                        array(
                            'name'  => esc_html__('Time', 'event_espresso'),
                            'value' => $checkin->get_pretty('CHK_timestamp'),
                        ),
                        array(
                            'name'  => esc_html__('Check in/out', 'event_espresso'),
                            'value' => $checkin->get('CHK_in')
                                ? esc_html__('In', 'event_espresso')
                                : esc_html__('Out', 'event_espresso'),
                        ),
                        array(
                            'name'  => esc_html__('Event', 'event_espresso'),
                            'value' => $event_name,
                        ),
                    ),
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
        return esc_html__('Event Espresso Checkins Exporter', 'event_espresso');
    }
}
// End of file ExportCheckins.php
// Location: EventEspresso\core\domain\services\admin\privacy\export/ExportCheckins.php
