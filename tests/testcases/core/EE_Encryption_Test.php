<?php

use EventEspresso\tests\includes\RandomDataGenerator;
use PHPUnit\Framework\AssertionFailedError;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EE_Encryption_Test
 * unit tests for the EE_Encryption_Test class
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @group         legacy-encryption
 */
class EE_Encryption_Test extends EE_UnitTestCase
{


    /**
     * @var EE_Encryption_Mock $encryption
     */
    protected $encryption;

    /**
     * @var RandomDataGenerator $rdg
     */
    protected $rdg;


    /**
     * @throws EE_Error
     */
    public function set_up()
    {
        parent::set_up();
        require_once EE_TESTS_DIR . 'mocks/core/EE_Encryption_Mock.php';
        $this->encryption = EE_Encryption_Mock::instance();
        $this->rdg = new RandomDataGenerator();
    }


    /**
     * @param string $encrypt
     * @param string $decrypt
     * @param        $data
     * @param string $cipher_method
     */
    private function runEncryptionTest($encrypt, $decrypt, $data, $cipher_method = '')
    {
        if($cipher_method !== '') {
            $this->assertEquals(
                $data,
                unserialize(
                    $this->encryption->{$decrypt}(
                        $this->encryption->{$encrypt}(
                            serialize($data),
                            $cipher_method
                        ),
                        $cipher_method
                    )
                )
            );
        } else {
            $this->assertEquals(
                $data,
                unserialize(
                    $this->encryption->{$decrypt}(
                        $this->encryption->{$encrypt}(
                            serialize($data)
                        )
                    )
                )
            );
        }
    }



    /**
     * @return void
     */
    public function testGetEncryptionKey()
    {
        $key = $this->encryption->get_encryption_key();
        $this->assertEquals(
            get_option(EE_Encryption::ENCRYPTION_OPTION_KEY, ''),
            $key
        );
    }


    /**
     * @requires function openssl_encrypt
     * @return void
     * @throws RuntimeException
     */
    public function testOpensslEncryption()
    {
        // with strings
        $this->assertEquals(
            $this->rdg->getString(),
            $this->encryption->openssl_decrypt(
                $this->encryption->openssl_encrypt(
                    $this->rdg->getString()
                )
            )
        );
        // with arrays
        $this->runEncryptionTest(
            'openssl_encrypt',
            'openssl_decrypt',
            $this->rdg->getArrayData()
        );
        // with objects
        $this->runEncryptionTest(
            'openssl_encrypt',
            'openssl_decrypt',
            $this->rdg->getObjectData()
        );
    }


    /**
     * @requires function openssl_encrypt
     * @return void
     * @throws RuntimeException
     */
    public function testOpensslEncryptionWithCipherMethods()
    {
        $cipher_methods = openssl_get_cipher_methods();
        foreach ($cipher_methods as $cipher_method) {
            // only use ciphers that produce a vector
            if(openssl_cipher_iv_length($cipher_method) !== false){
                // with strings
                $this->assertEquals(
                    $this->rdg->getString(),
                    $this->encryption->openssl_decrypt(
                        $this->encryption->openssl_encrypt(
                            $this->rdg->getString(),
                            $cipher_method
                        ),
                        $cipher_method
                    )
                );
                // with arrays
                $this->runEncryptionTest(
                    'openssl_encrypt',
                    'openssl_decrypt',
                    $this->rdg->getArrayData(),
                    $cipher_method
                );
                // with objects
                $this->runEncryptionTest(
                    'openssl_encrypt',
                    'openssl_decrypt',
                    $this->rdg->getObjectData(),
                    $cipher_method
                );
            }
        }
    }



    /**
     * @requires function mcrypt_encrypt
     * @return void
     * @throws RuntimeException
     */
    public function testMcryptEncryption()
    {
        if (PHP_VERSION_ID >= 70100) {
            $this->markTestSkipped(
                'The mcrypt extension is deprecated in PHP version 7.1 and therefore can not be tested.'
            );
        }
        $this->assertEquals(
            $this->rdg->getString(),
            $this->encryption->m_decrypt(
                $this->encryption->m_encrypt(
                    $this->rdg->getString()
                )
            )
        );
        $this->runEncryptionTest(
            'm_encrypt',
            'm_decrypt',
            $this->rdg->getArrayData()
        );
        $this->runEncryptionTest(
            'm_encrypt',
            'm_decrypt',
            $this->rdg->getObjectData()
        );
    }



    /**
     * @return void
     * @throws RuntimeException
     */
    public function testAcmeEncryption()
    {
        $this->assertEquals(
            $this->rdg->getString(),
            $this->encryption->acme_decrypt(
                $this->encryption->acme_encrypt(
                    $this->rdg->getString()
                )
            )
        );
        $this->runEncryptionTest(
            'acme_encrypt',
            'acme_decrypt',
            $this->rdg->getArrayData()
        );
        $this->runEncryptionTest(
            'acme_encrypt',
            'acme_decrypt',
            $this->rdg->getObjectData()
        );
    }


    /**
     * @return void
     * @throws RuntimeException
     */
    public function testBase64StringEncoding()
    {
        $this->assertEquals(
            $this->rdg->getString(),
            $this->encryption->base64_string_decode(
                $this->encryption->base64_string_encode(
                    $this->rdg->getString()
                )
            )
        );
    }


    /**
     * @return void
     * @throws RuntimeException
     */
    public function testBase64UrlEncoding()
    {
        $url = 'https://eventespresso.com';
        $this->assertEquals(
            $url,
            $this->encryption->base64_url_decode(
                $this->encryption->base64_url_encode($url)
            )
        );
    }


    /**
     * @throws PHPUnit_Framework_AssertionFailedError
     * @throws AssertionFailedError
     * @throws AssertionFailedError
     */
    public function testValidBase64()
    {
        $this->assertTrue(
            $this->encryption->valid_base_64(
                $this->encryption->base64_string_encode(
                    $this->rdg->getString()
                )
            )
        );
        $this->assertFalse(
            $this->encryption->valid_base_64(
                $this->rdg->getString()
            )
        );
    }


}
// testcases/core/EE_Encryption_Test.php
