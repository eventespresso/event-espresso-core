<?php

namespace EventEspresso\core\services\admin;

use EventEspresso\core\services\request\RequestInterface;

/**
 * Class AdminPageHeaderDecorator
 * base class for admin page header decorators
 * uses Decorator pattern to apply changes to admin page header text
 *
 * @package EventEspresso\core\services\admin
 * @author  Brent Christensen
 * @since   4.10.2.p
 */
abstract class AdminPageHeaderDecorator implements AdminPageHeaderDecoratorInterface
{

    /**
     * @var RequestInterface $request
     */
    protected $request;


    /**
     * AdminPageHeader constructor.
     *
     * @param RequestInterface $request
     */
    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }
}
