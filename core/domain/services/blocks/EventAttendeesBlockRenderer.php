<?php

namespace EventEspresso\core\domain\services\blocks;

use DomainException;
use EE_Error;
use EEH_Template;
use EEM_Attendee;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\services\blocks\BlockRenderer;

/**
 * EventAttendeesBlockRenderer
 *
 *
 * @package EventEspresso\core\domain\services\blocks
 * @author  Darren Ethier
 * @since   4.9.71.p
 */
class EventAttendeesBlockRenderer extends BlockRenderer
{

    /**
     * @var EEM_Attendee
     */
    private $attendee_model;

    public function __construct(DomainInterface $domain, EEM_Attendee $attendee_model)
    {
        $this->attendee_model = $attendee_model;
        parent::__construct($domain);
    }


    /**
     * Renders the block.
     *
     * @param array $attributes  Expect already validated and sanitized array of attributes for use in generating the
     *                           query and the template output.
     * @return string
     * @throws DomainException
     * @throws EE_Error
     */
    public function render(array $attributes)
    {
        $template_args['attributes'] = $attributes;
        $template_args['attendees'] = $this->attendee_model->get_all($this->getQueryParams($attributes));
        return EEH_Template::display_template(
            $this->templateRootPath() . 'event-attendees.php',
            $template_args,
            true
        );
    }


    /**
     * Get query parameters for model query.
     *
     * @param array $attributes
     * @return array
     */
    private function getQueryParams(array $attributes)
    {
        return array(
            0 => $this->getWhereQueryPart($attributes),
            'default_where_conditions' => 'this_model_only',
            'limit' => $attributes['limit'],
            'group_by' => array('ATT_ID'),
            'order_by' => $this->getOrderByQueryPart($attributes)
        );
    }


    /**
     * Get where query part for query parameters for model query.
     *
     * @param array $attributes
     * @return array
     */
    private function getWhereQueryPart(array $attributes)
    {
        $where = array();
        if ($attributes['ticketId'] > 0) {
            $where['Registration.TKT_ID'] = $attributes['ticketId'];
        } elseif ($attributes['datetimeId'] > 0) {
            $where['Registration.Ticket.Datetime.DTT_ID'] = $attributes['datetimeId'];
        } else {
            $where['Registration.EVT_ID'] = $attributes['eventId'];
        }
        $where['Registration.STS_ID'] = $attributes['status'];
        return $where;
    }


    /**
     * Get order by query part for query parameters for model query.
     *
     * @param array $attributes
     * @return array
     */
    private function getOrderByQueryPart(array $attributes)
    {
        $order = $attributes['order'];
        switch ($attributes['orderBy']) {
            case 'id':
                $order_by = array('ATT_ID' => $order);
                break;
            case 'lastNameOnly':
                $order_by = array('ATT_lname' => $order);
                break;
            case 'firstNameOnly':
                $order_by = array('ATT_fname' => $order);
                break;
            case 'firstThenLastName':
                $order_by = array('ATT_fname' => $order, 'ATT_lname' => $order);
                break;
            default:
                $order_by = array('ATT_lname' => $order, 'ATT_fname' => $order);
                break;
        }
        return $order_by;
    }
}
