<?php

namespace EventEspresso\tests\testcases\core\services\request;

use EE_Error;
use EE_UnitTestCase;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\Request;
use EventEspresso\core\services\request\Response;
use EventEspresso\tests\mocks\core\services\request\RequestStackBuilderMock;
use EventEspresso\tests\mocks\core\services\request\RequestStackCoreAppMock;

class RequestStackBuilderTest extends EE_UnitTestCase
{

    /**
     * @type LoaderInterface $loader
     */
    private $loader;

    /**
     * @var RequestStackBuilderMock $request_stack_builder
     */
    private $request_stack_builder;

    /**
     * @var string $obi_wan_kenobi
     */
    private $obi_wan_kenobi;

    /**
     * @var string $general_grievous
     */
    private $general_grievous;


    /**
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    public function setUp()
    {
        parent::setUp();
        $this->loader = LoaderFactory::getLoader();
        $this->request_stack_builder = $this->loader->getShared(
            'EventEspresso\tests\mocks\core\services\request\RequestStackBuilderMock',
            array($this->loader)
        );
    }


    /**
     * @return RequestStackCoreAppMock
     */
    public function getCoreApp()
    {
        return $this->loader->getShared(
            'EventEspresso\tests\mocks\core\services\request\RequestStackCoreAppMock'
        );
    }


    /**
     * @return Request
     */
    public function getRequest()
    {
        return $this->loader->getShared(
            'EventEspresso\core\services\request\Request'
        );
    }


    /**
     * @return Response
     */
    public function getResponse()
    {
        return $this->loader->getShared(
            'EventEspresso\core\services\request\Response'
        );
    }


    /**
     * @return array
     */
    public function getNotices()
    {
        $notices = EE_Error::get_vanilla_notices();
        if(isset($notices['errors']['RequestStackCoreAppMock - handleRequest - 34'])) {
            $notices['errors'][] = str_replace(
                '<br/><span class="tiny-text">RequestStackCoreAppMock - handleRequest - 34</span>',
                '',
                $notices['errors']['RequestStackCoreAppMock - handleRequest - 34']
            );
            unset($notices['errors']['RequestStackCoreAppMock - handleRequest - 34']);
        }
        return $notices;
    }


    /**
     * @return void
     */
    public function setMiddlewareFQCNs()
    {
        $this->obi_wan_kenobi   = 'EventEspresso\tests\mocks\core\services\request\ObiWanKenobiWare';
        $this->general_grievous = 'EventEspresso\tests\mocks\core\services\request\GeneralGrievousWare';
    }


    /**
     * @param bool $legacy
     * @return void
     */
    public function addMiddleware($legacy = false)
    {
        $this->setMiddlewareFQCNs();
        if($legacy){
            $this->request_stack_builder->push(array(0, $this->general_grievous));
            $this->request_stack_builder->push(array(1, $this->obi_wan_kenobi));
        } else {
            $this->request_stack_builder->push(array($this->general_grievous, array()));
            $this->request_stack_builder->push(array($this->obi_wan_kenobi, array()));
        }
    }


    /**
     * @return void
     */
    public function testRequestStackBuilderAsSplDoublyLinkedList()
    {
        $this->addMiddleware();
        // list should be FILO, so first in is at bottom of the stack
        $first = $this->request_stack_builder->bottom();
        $first_fqcn = reset($first);
        $this->assertEquals($this->general_grievous, $first_fqcn);
        $last = $this->request_stack_builder->top();
        $last_fqcn = reset($last);
        $this->assertEquals($this->obi_wan_kenobi, $last_fqcn);
    }


    /**
     * returns following parameters:
     *      $middleware_app middleware app class details (FQCN, args array)
     *      $recurse        true may call validateMiddlewareAppDetails() twice
     *      $expected       expected middleware app class
     *
     * @return array
     */
    public function middlewareAppProvider()
    {
        $this->setMiddlewareFQCNs();
        return array(
            // empty array
            array(array(), false, null),
            // arguments in wrong order
            array(array(array(), $this->obi_wan_kenobi), true, $this->obi_wan_kenobi),
            // arguments in wrong order, no recurse
            array(array(array(), $this->obi_wan_kenobi), false, null),
            // legacy middleware
            array(array(0, $this->obi_wan_kenobi), true, $this->obi_wan_kenobi),
            // legacy middleware, no recurse
            array(array(0, $this->obi_wan_kenobi), false, null),
            // invalid FQCN
            array(array('invalid/FQCN', array()), false, null),
            // all good
            array(array($this->obi_wan_kenobi, array()), true, $this->obi_wan_kenobi),
            array(array($this->general_grievous, array()), true, $this->general_grievous),
        );
    }


    /**
     * @dataProvider middlewareAppProvider
     * @param array  $middleware_app
     * @param bool   $recurse
     * @param string $expected
     * @throws \EventEspresso\core\services\request\InvalidRequestStackMiddlewareException
     */
    public function testValidateMiddlewareAppDetails(array $middleware_app, $recurse, $expected)
    {
        if($recurse === false) {
            $this->setExpectedException('EventEspresso\core\services\request\InvalidRequestStackMiddlewareException');
            $middleware_app_class = $this->request_stack_builder->validateMiddlewareAppDetails(
                $middleware_app
            );
            $this->assertEquals(
                null,
                $middleware_app_class,
                'An InvalidRequestStackMiddlewareException was expected but not thrown!'
            );
            return;
        }
        $middleware_app = $this->request_stack_builder->validateMiddlewareAppDetails(
            $middleware_app,
            true
        );
        $middleware_app_class = array_shift($middleware_app);
        $this->assertEquals($expected, $middleware_app_class);
    }


    /**
     * @return void
     * @throws \Exception
     */
    public function testRequestStackBuilderResolve()
    {
        $this->addMiddleware();
        $this->TheBattleOfUtapau();
    }

    /**
     * @return void
     * @throws \Exception
     */
    public function testRequestStackBuilderResolveWithLegacyMiddleware()
    {
        $this->addMiddleware(true);
        $this->TheBattleOfUtapau();
    }


    /**
     * @return void
     * @throws \Exception
     */
    public function TheBattleOfUtapau()
    {
        $request_stack = $this->request_stack_builder->resolve($this->getCoreApp());
        $this->assertInstanceOf(
            'EventEspresso\core\services\request\RequestStack',
            $request_stack
        );
        $this->assertEquals(0, EE_Error::has_notices());
        $request_stack->handleRequest($this->getRequest(), $this->getResponse());
        $notices = $this->getNotices();
        $this->assertCount(1, $notices['success']);
        $this->assertEquals('Hello There!', $notices['success'][0]);
        $this->assertCount(1, $notices['attention']);
        $this->assertEquals('General Kenobi!', $notices['attention'][0]);
        $this->assertCount(1, $notices['errors']);
        $this->assertEquals('Back away! I will deal with this Jedi slime myself!', $notices['errors'][0]);
        $request_stack->handleResponse();
        $notices = $this->getNotices();
        $this->assertCount(2, $notices['success']);
        $this->assertEquals('Now, let\'s get a move on. We\'ve got a battle to win here.', $notices['success'][1]);
        // now clear all notices
        EE_Error::reset_notices();
    }
}
// location: tests/testcases/core/services/requests/RequestStackBuilderTest.php
