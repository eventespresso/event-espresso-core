<?php

namespace EventEspresso\modules\ticket_selector;

use DomainException;
use EE_Error;
use EE_Event;
use EEH_Event_View;
use EEM_Event;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\RequestInterface;
use ReflectionException;

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

    const DATA_KEY_QUANTITY      = 'ticket-selections';

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


    protected EEM_Event $event_model;

    protected RequestInterface $request;

    protected ?int $event_id = null;

    protected array $inputs_to_clean = [];

    protected array $valid_data = [];


    /**
     * @param RequestInterface $request
     * @param EEM_Event        $event_model
     */
    public function __construct(RequestInterface $request, EEM_Event $event_model)
    {
        $this->request         = $request;
        $this->event_model     = $event_model;
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
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getEventId(): int
    {
        // do we have an event id?
        if ($this->event_id === null) {
            $this->event_id = $this->request->getRequestParam(self::INPUT_KEY_EVENT_ID, 0, DataType::INTEGER);
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
        // let's pull the event so we can get the REAL max attendees per order value
        /** @var EE_Event $event */
        $event = $this->event_model->get_one_by_ID($this->event_id);
        if (! $event instanceof EE_Event) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'A valid event could not be retrieved for the supplied event id (%1$s).%2$sPlease click the back button on your browser and try again.',
                        'event_espresso'
                    ),
                    $this->event_id,
                    '<br/>'
                )
            );
        }
        $this->valid_data[ self::DATA_KEY_MAX_ATNDZ ] = $event->additional_limit();
        // event id is valid
        return $this->event_id;
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function validatePostData(): array
    {
        // grab valid id
        $this->valid_data[ self::DATA_KEY_EVENT_ID ] = $this->getEventId();
        // let's track the total number of tickets ordered.
        $this->valid_data[ self:: DATA_KEY_TOTAL_TICKETS ] = 0;
        // cycle through $inputs_to_clean array
        foreach ($this->inputs_to_clean as $what => $input_to_clean) {
            $input_key = "$input_to_clean$this->event_id";
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
    protected function processInteger(string $what, string $input_key)
    {
        $this->valid_data[ $what ] = $this->request->getRequestParam($input_key, 0, DataType::INTEGER);
    }


    /**
     * @param string $input_key
     * @throws DomainException
     */
    protected function processQuantity(string $input_key)
    {
        /** @var array $row_qty */
        $row_qty = $this->request->getRequestParam($input_key, [], DataType::INTEGER, true);
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
        $max_atndz = $this->valid_data[ self::DATA_KEY_MAX_ATNDZ ];
        // if max attendees is 1 then the incoming row qty array
        // will only have one element and the value will be the ticket ID
        // ex: row qty = [ 0 => TKT_ID ]
        if ($max_atndz === 1 && count($row_qty) === 1) {
            // if the TS used radio buttons, then the ticket ID is stored differently in the request data
            $raw_qty = $this->request->getRequestParam($input_key);
            // explode integers by the dash if qty is a string
            $delimiter = is_string($raw_qty) && strpos($raw_qty, '-') ? '-' : '';
            if ($delimiter !== '') {
                $row_qty = explode($delimiter, $raw_qty);
            }
            // grab that ticket ID regardless of where it is
            $ticket_id = $row_qty[0] ?? key($row_qty);
            // use it as the key, and set the value to 1
            // ex: row qty = [ TKT_ID => 1 ]
            $row_qty = [$ticket_id => 1];
        }
        foreach ($this->valid_data[ self::DATA_KEY_TICKET_ID ] as $ticket_id) {
            $qty                                                       = $row_qty[ $ticket_id ] ?? 0;
            $this->valid_data[ self::DATA_KEY_QUANTITY ][ $ticket_id ] = $qty;
            $this->valid_data[ self:: DATA_KEY_TOTAL_TICKETS ]         += $qty;
        }
    }


    /**
     * @param string $input_key
     */
    protected function processReturnURL(string $input_key)
    {
        // grab and sanitize return-url
        $input_value = $this->request->getRequestParam($input_key, '', DataType::URL);
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
    protected function processTicketIDs(string $input_key)
    {
        $ticket_ids          = (array) $this->request->getRequestParam($input_key, [], DataType::INTEGER, true);
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
