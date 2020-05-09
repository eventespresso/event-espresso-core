<?php

namespace EventEspresso\tests\includes;

use PHPUnit_Framework_TestCase;

/**
 * Class EspressoPHPUnitFrameworkTestCase
 * Description
 *
 * @package EETests\bootstrap\
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoPHPUnitFrameworkTestCase extends PHPUnit_Framework_TestCase
{

    /**
     * \PHPUnit\Framework\TestCase::expectException() only exists in PHPUnit version 5.7+
     * but on Travis-CI we test using PHPUnit 4.8 because it supports PHP versions < 5.6
     * This should call the appropriate method regardless of version
     *
     * @param string $exception
     * @throws \PHPUnit\Framework\Exception
     */
    public function setExceptionExpected($exception, $code = null)
    {
        if (method_exists($this, 'expectException')) {
            parent::expectException($exception);
        } elseif (method_exists($this, 'setExpectedException')) {
            $this->setExpectedException($exception);
        }
        if ($code !== null && method_exists($this, 'expectExceptionCode')) {
            parent::expectExceptionCode($code);
        }
    }
}