<?php

namespace EventEspresso\tests\mocks\core\services\dependencies\composites;

use EventEspresso\core\services\request\RequestInterface;

/**
 * OofOuchOwieDecorator
 *
 * @package EventEspresso\tests\mocks\core\services\dependencies\composites
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class OofOuchOwie implements OofOuchOwieInterface
{
    /**
     * @var string $key
     */
    protected $key;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @param RequestInterface $specification
     */
    public function __construct(RequestInterface $request)
    {
        $this->setKey();
        $this->request = $request;
    }

    abstract public function setKey();

    /**
     * @since $VID:$
     * @return string
     */
    public function oofOuchOwie()
    {
        return $this->request->getRequestParam($this->key);
    }
}
