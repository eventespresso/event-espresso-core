<?php

namespace EventEspresso\core\domain\services\admin\privacy\erasure;

use EEM_Attendee;
use EventEspresso\core\services\privacy\erasure\PersonalDataEraserInterface;

/**
 * Class EraseAttendeeData
 * Erases attendee data when requested by a site user
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class EraseAttendeeData implements PersonalDataEraserInterface
{

    /**
     * @var EEM_Attendee
     */
    protected $attendee_model;


    /**
     * EraseAttendeeData constructor.
     *
     * @param EEM_Attendee $attendee_model
     */
    public function __construct(EEM_Attendee $attendee_model)
    {
        $this->attendee_model = $attendee_model;
    }


    /**
     * Gets a translated string name for the data eraser
     *
     * @return string
     */
    public function name()
    {
        return esc_html__('Event Espresso Attendee Data', 'event_espresso');
    }


    /**
     * Erases a "page" of personal user data
     *
     * @return array {
     * @type boolean $items_removed  whether items were removed successfully or not
     * @type boolean $items_retained whether any items were skipped or not
     * @type array   $messages       values are messages to show
     * @type boolean $done           whether this eraser is done or has more pages
     *               }
     * @throws \EE_Error
     */
    public function erase($email_address, $page = 1)
    {
        $rows_updated = $this->attendee_model->update(
            array(
                'ATT_fname'    => esc_html__('Anonymous', 'event_espresso'),
                'ATT_lname'    => '',
                'ATT_email'    => '',
                'ATT_address'  => '',
                'ATT_address2' => '',
                'ATT_city'     => '',
                'STA_ID'       => 0,
                'CNT_ISO'      => '',
                'ATT_zip'      => '',
                'ATT_phone'    => '',
            ),
            array(
                array(
                    'ATT_email' => $email_address,
                ),
            )
        );

        return array(
            'items_removed'  => (bool) $rows_updated,
            'items_retained' => false, // always false in this example
            'messages'       => array(),
            'done'           => true,
        );
    }
}
// End of file EraseAttendeeData.php
// Location: EventEspresso\core\domain\services\privacy\erasure/EraseAttendeeData.php
