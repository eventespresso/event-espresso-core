<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\page_header;

use EE_Datetime;
use EE_Error;
use EEM_Datetime;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\admin\AdminPageHeaderDecorator;
use EventEspresso\core\services\request\RequestInterface;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class DateFilterHeader
 * uses Decorator pattern to add details about the currently filtered date to admin page header text
 *
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\page_header
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DateFilterHeader extends AdminPageHeaderDecorator
{

    /**
     * @var EEM_Datetime $datetime_model
     */
    private $datetime_model;


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
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function getHeaderText($text = '')
    {
        $DTT_ID = $this->request->getRequestParam('DTT_ID');
        $DTT_ID = $this->request->getRequestParam('datetime_id', $DTT_ID);
        $DTT_ID = absint($DTT_ID);
        if ($DTT_ID) {
            $datetime = $this->datetime_model->get_one_by_ID($DTT_ID);
            if ($datetime instanceof EE_Datetime && $text !== '') {
                // remove the closing h3 heading tag if it exists
                $text = str_replace(
                    '</h3>',
                    '',
                    $text
                );
                $text .= '&nbsp; &nbsp; ';
                $text .= '<span class="drk-grey-text">';
                $text .= '<span class="dashicons dashicons-calendar"></span>';
                $text .= $datetime->name();
                $text .= ' ( ' . $datetime->start_date() . ' )';
                $text .= '</span></h3>';
            }
        }

        return $text;
    }
}
