<?php

namespace EventEspresso\tests\mocks\modules\ticket_selector;

use EventEspresso\modules\ticket_selector\ProcessTicketSelectorPostData;

class ProcessTicketSelectorPostDataMock extends ProcessTicketSelectorPostData
{

    /**
     * @param int              $event_id
     */
    public function __construct(int $event_id)
    {
        parent::__construct($event_id, new RequestMock());
    }

    /**
     * @param string $input_key
     */
    public function processQuantity(string $input_key)
    {
        parent::processQuantity($input_key, );
    }


    /**
     * @param string $input_key
     */
    public function processTicketID(string $input_key)
    {
        parent::processTicketID($input_key);
    }


    /**
     * @param string $input_key
     */
    public function processReturnURL(string $input_key)
    {
        parent::processReturnURL($input_key);
    }
}
