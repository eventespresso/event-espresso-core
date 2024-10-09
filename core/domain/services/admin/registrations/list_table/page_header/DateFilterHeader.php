<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\page_header;

use EE_Datetime;
use EE_Error;
use EEH_Template;
use EEM_Datetime;
use EventEspresso\core\services\admin\AdminPageHeaderDecorator;
use EventEspresso\core\services\request\RequestInterface;
use ReflectionException;

/**
 * Class DateFilterHeader
 * uses Decorator pattern to add details about the currently filtered date to admin page header text
 *
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\page_header
 * @author  Brent Christensen
 * @since   4.10.2.p
 */
class DateFilterHeader extends AdminPageHeaderDecorator
{
    private EEM_Datetime $datetime_model;


    /**
     * DateFilterHeader constructor.
     *
     * @param RequestInterface $request
     * @param EEM_Datetime     $datetime_model
     */
    public function __construct(RequestInterface $request, EEM_Datetime $datetime_model)
    {
        parent::__construct($request);
        $this->datetime_model = $datetime_model;
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
        $DTT_ID = $this->request->getRequestParam('DTT_ID');
        $DTT_ID = $this->request->getRequestParam('datetime_id', $DTT_ID, 'int');
        if ($DTT_ID) {
            $datetime = $this->datetime_model->get_one_by_ID($DTT_ID);
            if ($datetime instanceof EE_Datetime && $text !== '') {
                $active_status   = $datetime->get_active_status();
                $datetime_status =
                    '<span class="ee-status ee-status-bg--' . esc_attr($active_status) . ' event-active-status-' .
                    esc_attr($active_status) . '">'
                    . EEH_Template::pretty_status($active_status, false, 'sentence')
                    . '</span>';
                // remove the closing h3 heading tag if it exists
                $text = str_replace(
                    '</h3>',
                    '',
                    $text
                );
                $text .= '&nbsp; &nbsp; ';
                $text .= '<span class="ee-filter-header__details">';
                $text .= '<span class="dashicons dashicons-calendar-alt"></span>';
                $text .= $datetime->name();
                $text .= ' ( ' . $datetime->start_date() . ' )';
                $text .= $datetime_status;
                $text .= '</span></h3>';
            }
        }

        return $text;
    }
}
