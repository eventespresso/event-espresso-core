<?php

namespace EventEspresso\tests\testcases\core\domain\values\session;

use EE_Error;
use EE_UnitTestCase;
use EventEspresso\core\domain\values\session\SessionLifespanOption;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class SessionLifespanOptionTest
 *
 * @package EventEspresso\tests\testcases\core\domain\values\session
 * @author  Hossein Rafiei
 * @since   $VID:$
 * @group   ValueObjects
 * @group   SessionLifespanOptionTest
 */
class SessionLifespanOptionTest extends EE_UnitTestCase
{

    /**
     * @var SessionLifespanOption
     */
    private $lifespanOption;


    /**
     * @throws EE_Error
     */
    public function set_up()
    {
        parent::set_up();
        $this->lifespanOption = new SessionLifespanOption();
    }


    public function test_constructor()
    {
        $this->assertInstanceOf('EventEspresso\core\domain\values\session\SessionLifespanOption', $this->lifespanOption);
    }


    public function test_setter_with_invalid_value()
    {
        $this->setExceptionExpected('TypeError');
        $this->lifespanOption->setSessionLifespan('STRING');
    }


    public function test_setter_with_negative_value()
    {
        $this->lifespanOption->setSessionLifespan(-10);
        $lifespan = $this->lifespanOption->getSessionLifespan();
        $this->assertEquals($lifespan, $this->lifespanOption::DEFAULT_LIFESPAN);
    }


    public function test_setter_with_valid_data()
    {
        $this->lifespanOption->setSessionLifespan(600);
        $lifespan = $this->lifespanOption->getSessionLifespan();
        $this->assertEquals($lifespan, 600);
    }


    public function test_option_existence()
    {
        $this->lifespanOption->setSessionLifespan(600);
        $this->assertWPOptionExists(
            $this->lifespanOption::OPTION_NAME
        );
    }


    public function test_option_delete()
    {
        $this->lifespanOption->deleteOption();
        $this->assertWPOptionDoesNotExist(
            $this->lifespanOption::OPTION_NAME
        );
    }


}
// Location: SessionLifespanOptionTest.php
