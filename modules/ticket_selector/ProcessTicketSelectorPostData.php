<?php

namespace EventEspresso\modules\ticket_selector;

use DomainException;
use EEH_Event_View;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class ProcessTicketSelectorPostData
 *
 * @author  Brent Christensen
 * @package EventEspresso\modules\ticket_selector
 * @since   $VID:$
 */
class ProcessTicketSelectorPostData
{
    /**
     * @var int
     */
    private $event_id;

    /**
     * @var array
     */
    private $inputs_to_clean = [];

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var array
     */
    private $valid_data = [];


    /**
     * @param int              $event_id
     * @param RequestInterface $request
     */
    public function __construct(int $event_id, RequestInterface $request)
    {
        if (! absint($event_id)) {
            throw new DomainException(esc_html__('The event id provided was not valid.', 'event_espresso'));
        }
        $this->event_id        = $event_id;
        $this->request         = $request;
        $this->inputs_to_clean = [
            'max_atndz'  => 'tkt-slctr-max-atndz-',
            'rows'       => 'tkt-slctr-rows-',
            'qty'        => 'tkt-slctr-qty-',
            'ticket_id'  => 'tkt-slctr-ticket-id-',
            'return_url' => 'tkt-slctr-return-url-',
        ];
    }


    /**
     * @return array
     */
    public function validatePostData(): array
    {
        // grab valid id
        $this->valid_data['id'] = $this->event_id;
        // let's track the total number of tickets ordered.'
        $this->valid_data['total_tickets'] = 0;
        // cycle through $inputs_to_clean array
        foreach ($this->inputs_to_clean as $what => $input_to_clean) {
            $input_key = "{$input_to_clean}{$this->event_id}";
            // check for POST data
            if ($this->request->requestParamIsSet($input_key)) {
                switch ($what) {
                    // integers
                    case 'event_id':
                    case 'rows':
                    case 'max_atndz':
                        $this->valid_data[ $what ] = $this->request->getRequestParam($input_key, 0, 'int');
                        break;
                    // arrays of integers
                    case 'qty':
                        $this->processQuantity($input_key);
                        break;
                    // array of integers
                    case 'ticket_id':
                        $this->processTicketID($input_key);
                        break;
                    case 'return_url':
                        $this->processReturnURL($input_key);
                        break;
                }    // end switch $what
            }
        }    // end foreach $this->inputs_to_clean
        return $this->valid_data;
    }


    /**
     * @param string $input_key
     */
    protected function processQuantity(string $input_key)
    {
        $max_atndz = $this->valid_data['max_atndz'] ?? $this->request->getRequestParam($input_key, 0, 'int');
        $raw_qty = $this->request->getRequestParam($input_key);
        // explode integers by the dash if qty is a string
        $delimiter = is_string($raw_qty) && strpos($raw_qty, '-') ? '-' : '';
        /** @var array $row_qty */
        $row_qty = $this->request->getRequestParam($input_key, [], 'int', true, $delimiter);
        // if qty is coming from a radio button input, then we need to assemble an array of rows
        if ($delimiter === '-') {
            // get number of rows
            $rows = $this->request->getRequestParam('tkt-slctr-rows-' . $this->event_id, 1, 'int');
            $row  = isset($row_qty[0]) ? absint($row_qty[0]) : 1;
            $qty  = isset($row_qty[1]) ? absint($row_qty[1]) : 0;
            // restructure the row qty array so that $row is now the key instead of the first value
            $row_qty = [$row => $qty];
            for ($x = 1; $x <= $rows; $x++) {
                if (! isset($row_qty[ $x ])) {
                    $row_qty[ $x ] = 0;
                }
            }
        }
        ksort($row_qty);
        // cycle thru values
        foreach ($row_qty as $qty) {
            $qty = absint($qty);
            // sanitize as integers
            $this->valid_data['qty'][]         = $qty;
            $this->valid_data['total_tickets'] += $qty;
        }
    }


    /**
     * @param string $input_key
     */
    protected function processTicketID(string $input_key)
    {
        $ticket_ids = (array) $this->request->getRequestParam($input_key, [], 'int', true);
        // cycle thru values
        foreach ($ticket_ids as $key => $value) {
            // allow only integers
            $this->valid_data['ticket_id'][ $key ] = absint($value);
        }
    }


    /**
     * @param string $input_key
     */
    protected function processReturnURL(string $input_key)
    {
        // grab and sanitize return-url
        $input_value = $this->request->getRequestParam($input_key, '', 'url');
        // was the request coming from an iframe ? if so, then:
        if (strpos($input_value, 'event_list=iframe')) {
            // get anchor fragment
            $input_value = explode('#', $input_value);
            $input_value = end($input_value);
            // use event list url instead, but append anchor
            $input_value = EEH_Event_View::event_archive_url() . '#' . $input_value;
        }
        $this->valid_data['return_url'] = $input_value;
    }
}
