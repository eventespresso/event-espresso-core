<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\page_header;

use EE_Admin_Page;
use EE_Error;
use EE_Event;
use EEM_Event;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\admin\AdminPageHeaderDecorator;
use EventEspresso\core\services\request\RequestInterface;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class EventFilterHeader
 * uses Decorator pattern to add name and link for currently filtered event to admin page header text
 *
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\page_header
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventFilterHeader extends AdminPageHeaderDecorator
{

    /**
     * @var EEM_Event $event_model
     */
    private $event_model;


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
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function getHeaderText($text = '')
    {
        $EVT_ID = $this->request->getRequestParam('EVT_ID');
        $EVT_ID = $this->request->getRequestParam('event_id', $EVT_ID);
        $EVT_ID = absint($EVT_ID);
        if ($EVT_ID) {
            $event = $this->event_model->get_one_by_ID($EVT_ID);
            if ($event instanceof EE_Event) {
                $text .= sprintf(
                    /* translators: %s: <h3>  %s: <a href>Event Name</a>  %s: </h3> */
                    // phpcs:ignore WordPress.WP.I18n.UnorderedPlaceholdersText
                    esc_html__('%s Viewing registrations for the event: %s%s', 'event_espresso'),
                    '<h3 style="line-height:1.5em;">',
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
