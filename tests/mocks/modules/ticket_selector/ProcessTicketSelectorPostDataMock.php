<?php

namespace EventEspresso\tests\mocks\modules\ticket_selector;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\modules\ticket_selector\ProcessTicketSelectorPostData;

class ProcessTicketSelectorPostDataMock extends ProcessTicketSelectorPostData
{

    /**
     * @param RequestInterface $request
     */
    public function __construct(RequestInterface $request)
    {
        parent::__construct($request);
    }


    /**
     * @return RequestInterface
     */
    public function getRequest(): RequestInterface
    {
        return $this->request;
    }


    /**
     * @param string $key
     * @return mixed
     */
    public function getValidData(string $key)
    {
        return $this->valid_data[ $key ] ?? null;
    }


    /**
     * @param string $key
     * @param mixed  $value
     */
    public function setValidData(string $key, $value)
    {
        $this->valid_data[ $key ] = $value;
    }
}
