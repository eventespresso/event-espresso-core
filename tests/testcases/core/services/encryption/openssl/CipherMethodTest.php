<?php

namespace EventEspresso\tests\testcases\core\services\encryption\openssl;

use EventEspresso\tests\includes\RandomDataGenerator;
use EventEspresso\tests\mocks\core\services\encryption\CipherMethodMock;
use PHPUnit\Framework\TestCase;
use RuntimeException;

/**
 * Class CipherMethodTest
 *
 * @author  Brent Christensen
 * @package EventEspresso\tests\testcases\core\services\encryption\openssl
 * @since   4.10.14.p
 * @group   encryption
 * @group   cipher-tests
 */
class CipherMethodTest extends TestCase
{
    /**
     * the OPENSSL cipher method used
     */
    const TEST_DEFAULT_CM = 'aes-128-cbc';

    /**
     * WP "options_name" used to store a verified available cipher method
     */
    const TEST_CM_OPTION_NAME = 'ee_openssl_test_cipher_method';

    /**
     * @var CipherMethodMock
     */
    protected $cmm;

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
        $this->cmm = null;
        $this->rdg = null;
        parent::tearDown();
    }


    private function setUpDependencies()
    {
        $this->cmm = $this->cmm instanceof CipherMethodMock
            ? $this->cmm
            : new CipherMethodMock(
                CipherMethodTest::TEST_DEFAULT_CM,
                CipherMethodTest::TEST_CM_OPTION_NAME
            );

        $this->rdg = $this->rdg instanceof RandomDataGenerator
            ? $this->rdg
            : new RandomDataGenerator();
    }


    public function testConstructor()
    {
        $this->assertEquals(CipherMethodTest::TEST_DEFAULT_CM, $this->cmm->defaultCipherMethod());
        $this->assertEquals(CipherMethodTest::TEST_CM_OPTION_NAME, $this->cmm->cipherMethodOptionName());
        $this->assertNotEmpty($this->cmm->installedCipherMethods());
    }


    /**
     * @return string[][]
     */
    public function getCipherMethodDataProvider()
    {
        $this->setUpDependencies();

        // whether to reset validated_cipher_method to null before each test (forces loading of default CM)
        $reset = true;
        // whether to load the default CM / prev validated CM or throw an exception if requested CM is invalid
        $load_alt = true;

        // default CM
        $cipher_methods = [
            ['', self::TEST_DEFAULT_CM, $reset, $load_alt],
        ];
        // actually installed CMs should all pass
        foreach ($this->cmm->installedCipherMethods() as $installedCipherMethod) {
            $cipher_methods[] = [$installedCipherMethod, $installedCipherMethod, $reset, $load_alt];
        }
        // load the default again so that the validated_cipher_method gets set
        $cipher_methods[] = ['', self::TEST_DEFAULT_CM, $reset, $load_alt];

        // garbage CMs should load the default if we are not resetting
        $reset            = false;
        $cipher_methods[] = ['not-a-cipher', self::TEST_DEFAULT_CM, $reset, $load_alt];
        $cipher_methods[] = ['blue-bananas', self::TEST_DEFAULT_CM, $reset, $load_alt];
        $cipher_methods[] = ['$#%$^##^%$#^', self::TEST_DEFAULT_CM, $reset, $load_alt];
        $cipher_methods[] = ['', self::TEST_DEFAULT_CM, $reset, $load_alt];

        // UNLESS we are throwing exceptions because we don't want the default
        $load_alt         = false;
        $cipher_methods[] = ['not-a-cipher', '', $reset, $load_alt];
        $cipher_methods[] = ['blue-bananas', '', $reset, $load_alt];
        $cipher_methods[] = ['$#%$^##^%$#^', '', $reset, $load_alt];
        $cipher_methods[] = ['', '', $reset, $load_alt];
        return $cipher_methods;
    }


    /**
     * @dataProvider getCipherMethodDataProvider
     */
    public function testGetCipherMethod($cipher_method, $expected, $reset, $load_alt)
    {
        if ($reset) {
            $this->cmm->setValidatedCipherMethod();
        }
        if (! $load_alt) {
            $this->expectException(RuntimeException::class);
        }
        $this->assertEquals($expected, $this->cmm->getCipherMethod($cipher_method, $load_alt));
    }


    public function usesAuthEncryptionModeDataProvider()
    {
        return [
            ['aes-128-cbc', false],
            ['aes-128-ccm', true],
            ['aes-128-gcm', true],
            ['aes-256-cbc', false],
            ['aes-256-ccm', true],
            ['aes-256-gcm', true],
            ['aria-128-cfb', false],
            ['aria-128-cfb1', false],
            ['aria-128-ccm', true],
            ['aria-128-gcm', true],
            ['id-aes128-CCM', true],
            ['id-aes128-GCM', true],
            ['id-aes128-wrap', false],
            ['id-aes128-wrap-pad', false],
            ['id-aes256-CCM', true],
            ['id-aes256-GCM', true],
            ['id-aes256-wrap', false],
            ['id-aes256-wrap-pad', false],
            ['rc4-40', false],
            ['rc4-hmac-md5', false],
            ['sm4-ecb', false],
            ['sm4-ofb', false],
        ];
    }


    /**
     * @dataProvider usesAuthEncryptionModeDataProvider
     */
    public function testUsesAuthenticatedEncryptionMode($cipher_method, $expected)
    {
        if (PHP_VERSION_ID < 70100) {
            $this->markTestSkipped('Test requires PHP version 7.1 or greater');
        }
        $this->cmm->setValidatedCipherMethod($cipher_method);
        $this->assertEquals($expected, $this->cmm->usesAuthenticatedEncryptionMode());
    }


    public function getAvailableCipherMethodDataProvider()
    {
        $this->setUpDependencies();

        $default          = self::TEST_DEFAULT_CM;
        $default_cm_array = [$default];
        $data             = [
            [null, $default, null, $default_cm_array],
            [null, $default, $default, $default_cm_array],
        ];

        // add a bunch of valid CMs
        for ($x = 0; $x < 6; $x++) {
            $random_cm = $this->cmm->getAnInstalledCipherMethod();
            $data[]    = [null, $random_cm, $random_cm, [$random_cm]];
        }

        // add then some garbage
        $test_CMs = $default_cm_array;
        $bogus_cm = $this->generateBogusCipherMethod();
        for ($x = 0; $x < 6; $x++) {
            // add the previous bogus CM to the $default_cm_array to ensure we still get something valid
            $test_CMs[] = $bogus_cm;
            // then generate a new one
            $bogus_cm = $this->generateBogusCipherMethod();
            $data[]   = [$bogus_cm, $default, null, $test_CMs];
        }

        // finally verify that exceptions are thrown if there are no valid CMs on the server
        // but first remove any valid options from the test CMs array
        $test_CMs = array_diff($test_CMs, $this->cmm->installedCipherMethods());
        $data[]   = [$bogus_cm, $default, null, [], [], true];
        $data[]   = [$bogus_cm, $default, null, $test_CMs, [], true];

        return $data;
    }


    private function generateBogusCipherMethod()
    {
        $bogus_cm   = [];
        $bogus_cm[] = $this->rdg->generateRandomString(mt_rand(3, 4), true, true);
        $bogus_cm[] = $this->rdg->generateRandomString(3, false, true);
        $bogus_cm[] = $this->rdg->generateRandomString(3);
        return implode('-', $bogus_cm);
    }


    /**
     * @dataProvider getAvailableCipherMethodDataProvider
     */
    public function testGetAvailableCipherMethod(
        $cipher_method,
        $expected,
        $prev_option = null,
        $test_CMs = null,
        $installed_CMs = null,
        $throws = false
    ) {
        if ($throws) {
            $this->expectException(RuntimeException::class);
        }
        shuffle($test_CMs);
        // getAvailableCipherMethod() will load a previously validated CM from the db, so let's control that
        update_option(self::TEST_CM_OPTION_NAME, $prev_option);
        // getAvailableCipherMethod() will test CMs from the list of validated CMs, so let's control that too
        $this->cmm->setCipherMethods($test_CMs);
        if ($installed_CMs !== null) {
            $this->cmm->setInstalledCipherMethods($installed_CMs);
        }
        $this->assertEquals($expected, $this->cmm->getAvailableCipherMethod($cipher_method));
        $expected_valid_CMs = array_intersect($test_CMs, $this->cmm->installedCipherMethods());
        $valid_in_use_CMs   = array_intersect($this->cmm->cipherMethods(), $this->cmm->installedCipherMethods());
        $this->assertEquals(sort($expected_valid_CMs, SORT_NATURAL), sort($valid_in_use_CMs, SORT_NATURAL));
    }


    public function weakAlgorithmFilterDataProvider()
    {
        return [
            ['aes-128-cbc', true],
            ['aes-128-cbc-hmac-sha1', true],
            ['aes-128-cbc-hmac-sha256', true],
            ['aes-128-ccm', true],
            ['aes-128-cfb', true],
            ['aes-128-cfb1', true],
            ['aes-128-cfb8', true],
            ['aes-128-ctr', true],
            ['aes-128-ecb', false],
            ['aes-128-gcm', true],
            ['aes-128-ocb', true],
            ['aes-128-ofb', true],
            ['aes-128-xts', true],
            ['aes-192-cbc', true],
            ['aes-192-ccm', true],
            ['aes-192-cfb', true],
            ['aes-192-cfb1', true],
            ['aes-192-cfb8', true],
            ['aes-192-ctr', true],
            ['aes-192-ecb', false],
            ['aes-192-gcm', true],
            ['aes-192-ocb', true],
            ['aes-192-ofb', true],
            ['aes-256-cbc', true],
            ['aes-256-cbc-hmac-sha1', true],
            ['aes-256-cbc-hmac-sha256', true],
            ['aes-256-ccm', true],
            ['aes-256-cfb', true],
            ['aes-256-cfb1', true],
            ['aes-256-cfb8', true],
            ['aes-256-ctr', true],
            ['aes-256-ecb', false],
            ['aes-256-gcm', true],
            ['aes-256-ocb', true],
            ['aes-256-ofb', true],
            ['aes-256-xts', true],
            ['aria-128-cbc', true],
            ['aria-128-ccm', true],
            ['aria-128-cfb', true],
            ['aria-128-cfb1', true],
            ['aria-128-cfb8', true],
            ['aria-128-ctr', true],
            ['aria-128-ecb', false],
            ['aria-128-gcm', true],
            ['aria-128-ofb', true],
            ['aria-192-cbc', true],
            ['aria-192-ccm', true],
            ['aria-192-cfb', true],
            ['aria-192-cfb1', true],
            ['aria-192-cfb8', true],
            ['aria-192-ctr', true],
            ['aria-192-ecb', false],
            ['aria-192-gcm', true],
            ['aria-192-ofb', true],
            ['aria-256-cbc', true],
            ['aria-256-ccm', true],
            ['aria-256-cfb', true],
            ['aria-256-cfb1', true],
            ['aria-256-cfb8', true],
            ['aria-256-ctr', true],
            ['aria-256-ecb', false],
            ['aria-256-gcm', true],
            ['aria-256-ofb', true],
            ['bf-cbc', true],
            ['bf-cfb', true],
            ['bf-ecb', false],
            ['bf-ofb', true],
            ['camellia-128-cbc', true],
            ['camellia-128-cfb', true],
            ['camellia-128-cfb1', true],
            ['camellia-128-cfb8', true],
            ['camellia-128-ctr', true],
            ['camellia-128-ecb', false],
            ['camellia-128-ofb', true],
            ['camellia-192-cbc', true],
            ['camellia-192-cfb', true],
            ['camellia-192-cfb1', true],
            ['camellia-192-cfb8', true],
            ['camellia-192-ctr', true],
            ['camellia-192-ecb', false],
            ['camellia-192-ofb', true],
            ['camellia-256-cbc', true],
            ['camellia-256-cfb', true],
            ['camellia-256-cfb1', true],
            ['camellia-256-cfb8', true],
            ['camellia-256-ctr', true],
            ['camellia-256-ecb', false],
            ['camellia-256-ofb', true],
            ['cast5-cbc', true],
            ['cast5-cfb', true],
            ['cast5-ecb', false],
            ['cast5-ofb', true],
            ['chacha20', true],
            ['chacha20-poly1305', true],
            ['des-cbc', false],
            ['des-cfb', false],
            ['des-cfb1', false],
            ['des-cfb8', false],
            ['des-ecb', false],
            ['des-ede', false],
            ['des-ede-cbc', false],
            ['des-ede-cfb', false],
            ['des-ede-ofb', false],
            ['des-ede3', false],
            ['des-ede3-cbc', false],
            ['des-ede3-cfb', false],
            ['des-ede3-cfb1', false],
            ['des-ede3-cfb8', false],
            ['des-ede3-ofb', false],
            ['des-ofb', false],
            ['desx-cbc', false],
            ['id-aes128-CCM', true],
            ['id-aes128-GCM', true],
            ['id-aes128-wrap', true],
            ['id-aes128-wrap-pad', true],
            ['id-aes192-CCM', true],
            ['id-aes192-GCM', true],
            ['id-aes192-wrap', true],
            ['id-aes192-wrap-pad', true],
            ['id-aes256-CCM', true],
            ['id-aes256-GCM', true],
            ['id-aes256-wrap', true],
            ['id-aes256-wrap-pad', true],
            ['rc2-40-cbc', false],
            ['rc2-64-cbc', false],
            ['rc2-cbc', false],
            ['rc2-cfb', false],
            ['rc2-ecb', false],
            ['rc2-ofb', false],
            ['rc4', false],
            ['rc4-40', false],
            ['rc4-hmac-md5', false],
            ['seed-cbc', true],
            ['seed-cfb', true],
            ['seed-ecb', false],
            ['seed-ofb', true],
            ['sm4-cbc', true],
            ['sm4-cfb', true],
            ['sm4-ctr', true],
            ['sm4-ecb', false],
            ['sm4-ofb', true],
        ];
    }


    /**
     * @dataProvider weakAlgorithmFilterDataProvider
     */
    public function testWeakAlgorithmFilter($cipher_method, $expected)
    {
        $this->assertEquals($expected, $this->cmm->weakAlgorithmFilter($cipher_method));
    }
}
// end of file: tests/testcases/core/services/encryption/openssl/CipherMethodTest.php
