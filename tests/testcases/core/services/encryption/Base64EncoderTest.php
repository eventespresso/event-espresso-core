<?php

namespace EventEspresso\tests\testcases\core\services\encryption;

use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\tests\includes\RandomDataGenerator;
use PHPUnit\Framework\AssertionFailedError;
use PHPUnit\Framework\TestCase;
use PHPUnit_Framework_AssertionFailedError;
use RuntimeException;

/**
 * tests/testcases/core/services/encryption/Base64EncoderTest.php
 *
 * @group encryption
 */
class Base64EncoderTest extends TestCase
{
    /**
     * @var Base64Encoder
     */
    protected $b64;

    /**
     * @var RandomDataGenerator $rdg
     */
    protected $rdg;


    public function setUp()
    {
        parent::setUp();
        $this->setUpDependencies();
    }


    private function setUpDependencies()
    {
        $this->b64 = new Base64Encoder;
        $this->rdg = new RandomDataGenerator();
    }


    public function validBase64DataProvider()
    {
        $this->setUpDependencies();
        return [
            [$this->rdg->getString()],
            [$this->rdg->generateRandomString(mt_rand(5, 100))],
            [$this->rdg->generateRandomString(mt_rand(5, 100))],
            [$this->rdg->generateRandomString(mt_rand(5, 100), true, true)],
            [$this->rdg->generateRandomString(mt_rand(5, 100), false, true)],
            [$this->rdg->generateRandomString(mt_rand(5, 100), true, true, true)],
            [$this->rdg->generateRandomString(mt_rand(5, 100), false, true, true)],
            [$this->rdg->generateRandomString(mt_rand(5, 100), true, false, true)],
            [$this->rdg->generateRandomString(mt_rand(5, 100), false, false, true)],
        ];
    }


    /**
     * @dataProvider validBase64DataProvider
     * @throws PHPUnit_Framework_AssertionFailedError
     * @throws AssertionFailedError
     * @throws AssertionFailedError
     */
    public function testValidBase64($string)
    {
        $this->assertTrue(
            $this->b64->isValidBase64(
                $this->b64->encodeString(
                    $string
                )
            )
        );
        $this->assertFalse(
            $this->b64->isValidBase64(
                $string . "!@#$%"
            )
        );
    }


    /**
     * @dataProvider validBase64DataProvider
     * @return void
     * @throws RuntimeException
     */
    public function testBase64StringEncoding($string)
    {
        $this->assertEquals(
            $string,
            $this->b64->decodeString(
                $this->b64->encodeString(
                    $string
                )
            )
        );
    }


    public function base64UrlDataProvider()
    {
        $this->setUpDependencies();
        return [
            ['https://eventespresso.com'],
            [$this->rdg->generateRandomURL()],
            [$this->rdg->generateRandomURL()],
            [$this->rdg->generateRandomURL()],
            [$this->rdg->generateRandomURL(true)],
            [$this->rdg->generateRandomURL(true)],
            [$this->rdg->generateRandomURL(true)],
        ];
    }


    /**
     * @dataProvider base64UrlDataProvider
     * @return void
     * @throws RuntimeException
     */
    public function testBase64UrlEncoding($url)
    {
        $this->assertEquals(
            $url,
            $this->b64->decodeUrl(
                $this->b64->encodeUrl($url)
            )
        );
    }
}
