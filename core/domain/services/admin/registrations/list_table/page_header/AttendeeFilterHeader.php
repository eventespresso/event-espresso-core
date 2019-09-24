<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\page_header;

use EE_Admin_Page;
use EE_Attendee;
use EE_Error;
use EEM_Attendee;
use EventEspresso\core\services\admin\AdminPageHeaderDecorator;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class AttendeeFilterHeader
 * uses Decorator pattern to add details about the currently filtered attendee to admin page header text
 *
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\page_header
 * @author  Brent Christensen
 * @since   $VID:$
 */
class AttendeeFilterHeader extends AdminPageHeaderDecorator
{

    /**
     * @var EEM_Attendee $attendee_model
     */
    private $attendee_model;


    /**
     * AttendeeFilterHeader constructor.
     *
     * @param RequestInterface $request
     * @param EEM_Attendee     $attendee_model
     */
    public function __construct(RequestInterface $request, EEM_Attendee $attendee_model)
    {
        parent::__construct($request);
        $this->attendee_model = $attendee_model;
    }


    /**
     * @param string $text
     * @return string
     * @throws EE_Error
     * @since $VID:$
     */
    public function getHeaderText($text = '')
    {
        $ATT_ID = $this->request->getRequestParam('ATT_ID');
        $ATT_ID = $this->request->getRequestParam('attendee_id', $ATT_ID);
        $ATT_ID = absint($ATT_ID);
        if ($ATT_ID) {
            $attendee = $this->attendee_model->get_one_by_ID($ATT_ID);
            if ($attendee instanceof EE_Attendee) {
                $text .= sprintf(
                    esc_html__(
                        '%1$s Viewing registrations for %2$s%3$s',
                        'event_espresso'
                    ),
                    '<h3 style="line-height:1.5em;">',
                    '<a href="' . EE_Admin_Page::add_query_args_and_nonce(
                        array(
                            'action' => 'edit_attendee',
                            'post'   => $ATT_ID,
                        ),
                        REG_ADMIN_URL
                    ) . '">' . $attendee->full_name() . '</a>',
                    '</h3>'
                );
            }
        }
        return $text;
    }
}
