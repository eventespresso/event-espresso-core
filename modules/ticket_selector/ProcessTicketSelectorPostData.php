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
 * @since   4.10.20.p
 */
class ProcessTicketSelectorPostData
{

    const DATA_KEY_EVENT_ID      = 'id';

    const DATA_KEY_MAX_ATNDZ     = 'max_atndz';

    const DATA_KEY_QUANTITY      = 'qty';

    const DATA_KEY_RETURN_URL    = 'return_url';

    const DATA_KEY_ROWS          = 'rows';

    const DATA_KEY_TICKET_ID     = 'ticket_id';

    const DATA_KEY_TOTAL_TICKETS = 'total_tickets';

    const INPUT_KEY_EVENT_ID     = 'tkt-slctr-event-id';

    const INPUT_KEY_MAX_ATNDZ    = 'tkt-slctr-max-atndz-';

    const INPUT_KEY_ROWS         = 'tkt-slctr-rows-';

    const INPUT_KEY_QTY          = 'tkt-slctr-qty-';

    const INPUT_KEY_TICKET_ID    = 'tkt-slctr-ticket-id-';

    const INPUT_KEY_RETURN_URL   = 'tkt-slctr-return-url-';


    /**
     * @var int
     */
    protected $event_id;

    /**
     * @var array
     */
    protected $inputs_to_clean = [];

    /**
     * @var array
     */
    protected $valid_data = [];

    /**
     * @var RequestInterface
     */
    protected $request;


    /**
     * @param RequestInterface $request
     */
    public function __construct(RequestInterface $request)
    {
        $this->request         = $request;
        $this->inputs_to_clean = [
            self::DATA_KEY_MAX_ATNDZ     => self::INPUT_KEY_MAX_ATNDZ,
            self::DATA_KEY_RETURN_URL    => self::INPUT_KEY_RETURN_URL,
            self::DATA_KEY_ROWS          => self::INPUT_KEY_ROWS,
            self::DATA_KEY_TOTAL_TICKETS => self::INPUT_KEY_TICKET_ID,
            self::DATA_KEY_QUANTITY      => self::INPUT_KEY_QTY,
        ];
    }


    /**
     * @return int
     * @throws DomainException
     */
    public function getEventId()
    {
        // do we have an event id?
        if ($this->event_id === null) {
            $this->event_id = $this->request->getRequestParam(self::INPUT_KEY_EVENT_ID, 0, 'int');
            if (! $this->event_id) {
                // $_POST['tkt-slctr-event-id'] was not set ?!?!?!?
                throw new DomainException(
                    sprintf(
                        esc_html__(
                            'An event id was not provided or was not received.%sPlease click the back button on your browser and try again.',
                            'event_espresso'
                        ),
                        '<br/>'
                    )
                );
            }
        }
        // event id is valid
        return $this->event_id;
    }


    /**
     * @return array
     * @throws DomainException
     */
    public function validatePostData()
    {
        // grab valid id
        $this->valid_data[ self::DATA_KEY_EVENT_ID ] = $this->getEventId();
        // let's track the total number of tickets ordered.'
        $this->valid_data[ self:: DATA_KEY_TOTAL_TICKETS ] = 0;
        // cycle through $inputs_to_clean array
        foreach ($this->inputs_to_clean as $what => $input_to_clean) {
            $input_key = "{$input_to_clean}{$this->event_id}";
            // check for POST data
            if ($this->request->requestParamIsSet($input_key)) {
                switch ($what) {
                    // integers
                    case self::DATA_KEY_ROWS:
                    case self::DATA_KEY_MAX_ATNDZ:
                        $this->processInteger($what, $input_key);
                        break;
                    // arrays of integers
                    case self::DATA_KEY_QUANTITY:
                        $this->processQuantity($input_key);
                        break;
                    // array of integers
                    case self::DATA_KEY_TOTAL_TICKETS:
                        $this->processTicketIDs($input_key);
                        break;
                    case self::DATA_KEY_RETURN_URL:
                        $this->processReturnURL($input_key);
                        break;
                }
            }
        }
        return $this->valid_data;
    }


    /**
     * @param string $what
     * @param string $input_key
     */
    protected function processInteger($what, $input_key)
    {
        $this->valid_data[ $what ] = $this->request->getRequestParam($input_key, 0, 'int');
    }


    /**
     * @param string $input_key
     * @throws DomainException
     */
    protected function processQuantity($input_key)
    {
        /** @var array $row_qty */
        $row_qty = $this->request->getRequestParam($input_key, [], 'int', true);
        if (empty($row_qty) || ! is_array($row_qty)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'An error occurred while trying to retrieve the ticket selections for the event.%sPlease click the back button on your browser and try again.',
                        'event_espresso'
                    ),
                    '<br/>'
                )
            );
        }
        foreach ($this->valid_data[ self::DATA_KEY_TICKET_ID ] as $ticket_id) {
            $qty = isset($row_qty[ $ticket_id ]) ? $row_qty[ $ticket_id ] : 0;
            // sanitize as integers
            $this->valid_data[ self::DATA_KEY_QUANTITY ][]     = $qty;
            $this->valid_data[ self:: DATA_KEY_TOTAL_TICKETS ] += $qty;
        }
    }


    /**
     * @param string $input_key
     */
    protected function processReturnURL($input_key)
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
        $this->valid_data[ self::DATA_KEY_RETURN_URL ] = $input_value;
    }


    /**
     * @param string $input_key
     * @throws DomainException
     */
    protected function processTicketIDs($input_key)
    {
        $ticket_ids          = (array) $this->request->getRequestParam($input_key, [], 'int', true);
        $filtered_ticket_ids = array_filter($ticket_ids);
        if (empty($filtered_ticket_ids)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'An error occurred while trying to retrieve the ticket IDs for the event.%sPlease click the back button on your browser and try again.',
                        'event_espresso'
                    ),
                    '<br/>'
                )
            );
        }
        // cycle thru values
        foreach ($ticket_ids as $key => $value) {
            // allow only integers
            $this->valid_data[ self::DATA_KEY_TICKET_ID ][ $key ] = absint($value);
        }
    }
}
