<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\page_header;

use EE_Admin_Page;
use EE_Error;
use EE_Event;
use EEM_Event;
use EEM_Status;
use EventEspresso\core\services\admin\AdminPageHeaderDecorator;
use EventEspresso\core\services\request\RequestInterface;
use ReflectionException;

/**
 * Class EventFilterHeader
 * uses Decorator pattern to add name and link for currently filtered event to admin page header text
 *
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\page_header
 * @author  Brent Christensen
 * @since   4.10.2.p
 */
class EventFilterHeader extends AdminPageHeaderDecorator
{
    private EEM_Event $event_model;


    /**
     * EventFilterHeader constructor.
     *
     * @param RequestInterface $request
     * @param EEM_Event        $event_model
     */
    public function __construct(RequestInterface $request, EEM_Event $event_model)
    {
        parent::__construct($request);
        $this->event_model = $event_model;
    }


    /**
     * @param string $text
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.10.2.p
     */
    public function getHeaderText(string $text = ''): string
    {
        $EVT_ID = $this->request->getRequestParam('EVT_ID');
        $EVT_ID = $this->request->getRequestParam('event_id', $EVT_ID, 'int');
        $reg_status_code = $this->request->getRequestParam('_reg_status', '');
        $reg_statuses    = $reg_status_code
            ? EEM_Status::instance()->localized_status(
                [$reg_status_code => 'APPROVED'],
                false,
                'lowercase'
            )
            : [];
        $reg_status = $reg_statuses[ $reg_status_code ] ?? '';
        if ($EVT_ID) {
            $event = $this->event_model->get_one_by_ID($EVT_ID);
            if ($event instanceof EE_Event) {
                $text .= sprintf(
                    /* translators: %s: <h3>  %s: <a href>Event Name</a>  %s: </h3> */
                    // phpcs:ignore WordPress.WP.I18n.UnorderedPlaceholdersText
                    esc_html__('%s Viewing%s registrations for the event: %s%s', 'event_espresso'),
                    '<h3 class="ee-filter-header__text">',
                    $reg_status ? " <span class='ee-status-outline ee-status-outline--micro ee-status-bg--$reg_status_code'>$reg_status</span>" : '',
                    '&nbsp;<a href="'
                    . EE_Admin_Page::add_query_args_and_nonce(
                        array(
                            'action' => 'edit',
                            'post'   => $event->ID(),
                        ),
                        EVENTS_ADMIN_URL
                    )
                    . '">'
                    . $event->get('EVT_name')
                    . '</a>&nbsp;',
                    '</h3>'
                );
            }
        }
        return $text;
    }
}
