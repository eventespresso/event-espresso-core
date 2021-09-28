<?php

namespace EventEspresso\tests\testcases\core\services\encryption\openssl;

use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\core\services\encryption\openssl\OpenSSL;
use EventEspresso\tests\includes\RandomDataGenerator;
use EventEspresso\tests\mocks\core\services\encryption\CipherMethodMock;
use EventEspresso\tests\mocks\core\services\encryption\EncryptionKeyManagerMock;
use EventEspresso\tests\mocks\core\services\encryption\OpenSSLv1Mock;
use EventEspresso\tests\mocks\core\services\encryption\OpenSSLv2Mock;
use EventEspresso\tests\testcases\core\services\encryption\EncryptionKeyManagerTest;
use PHPUnit\Framework\TestCase;

/**
 * Class OpenSSLTest
 *
 * @author  Brent Christensen
 * @package EventEspresso\tests\testcases\core\services\encryption\openssl
 * @since   4.10.14.p
 * @group   encryption
 * @group   openssl
 */
class OpenSSLTest extends TestCase
{
    /**
     * @var Base64Encoder
     */
    protected $b64;

    /**
     * @var CipherMethodMock
     */
    protected $cmm;

    /**
     * @var EncryptionKeyManagerMock
     */
    protected $ekm;

    /**
     * @var OpenSSLv1Mock
     */
    protected $osm1;

    /**
     * @var OpenSSLv2Mock
     */
    protected $osm2;

    /**
     * @var RandomDataGenerator $rdg
     */
    protected $rdg;


    public function setUp()
    {
        parent::setUp();
        $this->setUpDependencies();
    }


    public function tearDown()
    {
        $this->b64 = null;
        $this->osm1 = null;
        $this->rdg = null;
        parent::tearDown();
    }


    private function setUpDependencies()
    {
        $this->b64 = $this->b64 instanceof Base64Encoder
            ? $this->b64
            : new Base64Encoder;

        $this->cmm = $this->cmm instanceof CipherMethodMock
            ? $this->cmm
            : new CipherMethodMock(
                CipherMethodTest::TEST_DEFAULT_CM,
                CipherMethodTest::TEST_CM_OPTION_NAME
            );

        $this->ekm = new EncryptionKeyManagerMock(
            $this->b64,
            EncryptionKeyManagerTest::TEST_KEY_ID,
            EncryptionKeyManagerTest::TEST_KEYS_OPTION_NAME
        );

        $this->osm1 = $this->osm1 instanceof OpenSSLv1Mock
            ? $this->osm1
            : new OpenSSLv1Mock( $this->b64, $this->cmm, $this->ekm, '5.3.0' );

        $this->osm2 = $this->osm1 instanceof OpenSSLv2Mock
            ? $this->osm1
            : new OpenSSLv2Mock( $this->b64, $this->cmm, $this->ekm, '7.1.0' );

        $this->rdg = $this->rdg instanceof RandomDataGenerator
            ? $this->rdg
            : new RandomDataGenerator();
    }


    /**
     * @return array
     */
    public function opensslEncryptionDataProvider()
    {
        $this->setUpDependencies();
        $random_strings = [ $this->rdg->getString()];

        // add a WHOLE bunch of random strings
        for ($x = 0; $x < 500; $x++) {
            $random_strings[] = $this->rdg->generateRandomString(
                mt_rand(1, 250),         // length
                $this->rdg->coinToss(),  // include letters
                $this->rdg->coinToss(),  // include symbols
                $this->rdg->coinToss()   // include spaces
            );
        }

        $test_data = [];
        /** @var OpenSSL[] $mocks */
        $mocks = [$this->osm1, $this->osm2];
        foreach ($mocks as $mock) {
            if ($mock->canUse()) {
                foreach ($random_strings as $string) {
                    $test_data[] = [$mock, $string];
                }
            }
        }
        return $test_data;
    }


    /**
     * @dataProvider opensslEncryptionDataProvider
     */
    public function testOpensslEncryption(OpenSSL $mock, $string)
    {
        $this->assertEquals(
            $string,
            $mock->decrypt($mock->encrypt($string))
        );
    }
}
