<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EE_Encryption_Test
 * unit tests for the EE_Encryption_Test class
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 *
 */
class EE_Encryption_Test extends EE_UnitTestCase
{


    /**
     * @var EE_Encryption_Mock $encryption
     */
    protected $encryption;


    /**
     * @throws EE_Error
     */
    public function setUp()
    {
        parent::setUp();
        require_once EE_TESTS_DIR . 'mocks' . DS . 'core' . DS . 'EE_Encryption_Mock.php';
        $this->encryption = EE_Encryption_Mock::instance();
    }



    /**
     * @param int $length
     * @return string
     */
    private function generateRandomString($length = 10)
    {
        $characters = '0123456789 abcd efg hijk lmnop qrs tuv wxyz ABCD EFG HIJK LMNOP QRS TUV WXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }



    /**
     * @return string
     */
    private function generatePropertyOrKeyName()
    {
        $property = str_replace(' ', '', $this->generateRandomString(mt_rand(5, 10)));
        if(empty($property)) {
            return $this->generatePropertyOrKeyName();
        }
        return $property;
    }



    /**
     * @return string
     */
    private function getString()
    {
        return 'LPT: Change all of your passwords to "incorrect" so that your computer just tells you when you forget!';
    }



    /**
     * @return array
     */
    private function getArrayData()
    {
        $array = array();
        $array_size = mt_rand(5, 10);
        for ($x = 0; $x <= $array_size; $x++) {
            $key = mt_rand(0, 1)
                ? $this->generatePropertyOrKeyName()
                : count($array);
            $array[$key] = $this->generateRandomString(mt_rand(10, 50));
        }
        return $array;
    }



    /**
     * @return stdClass
     */
    private function getObjectData()
    {
        $object = new stdClass();
        $array_size = mt_rand(5, 10);
        for ($x = 0; $x <= $array_size; $x++) {
            $property = $this->generatePropertyOrKeyName();
            $object->{$property} = $this->generateRandomString(mt_rand(10, 50));
        }
        return $object;
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
            $this->getString(),
            $this->encryption->openssl_decrypt(
                $this->encryption->openssl_encrypt(
                    $this->getString()
                )
            )
        );
        // with arrays
        $this->runEncryptionTest(
            'openssl_encrypt',
            'openssl_decrypt',
            $this->getArrayData()
        );
        // with objects
        $this->runEncryptionTest(
            'openssl_encrypt',
            'openssl_decrypt',
            $this->getObjectData()
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
                    $this->getString(),
                    $this->encryption->openssl_decrypt(
                        $this->encryption->openssl_encrypt(
                            $this->getString(),
                            $cipher_method
                        ),
                        $cipher_method
                    )
                );
                // with arrays
                $this->runEncryptionTest(
                    'openssl_encrypt',
                    'openssl_decrypt',
                    $this->getArrayData(),
                    $cipher_method
                );
                // with objects
                $this->runEncryptionTest(
                    'openssl_encrypt',
                    'openssl_decrypt',
                    $this->getObjectData(),
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
            $this->getString(),
            $this->encryption->m_decrypt(
                $this->encryption->m_encrypt(
                    $this->getString()
                )
            )
        );
        $this->runEncryptionTest(
            'm_encrypt',
            'm_decrypt',
            $this->getArrayData()
        );
        $this->runEncryptionTest(
            'm_encrypt',
            'm_decrypt',
            $this->getObjectData()
        );
    }



    /**
     * @return void
     * @throws RuntimeException
     */
    public function testAcmeEncryption()
    {
        $this->assertEquals(
            $this->getString(),
            $this->encryption->acme_decrypt(
                $this->encryption->acme_encrypt(
                    $this->getString()
                )
            )
        );
        $this->runEncryptionTest(
            'acme_encrypt',
            'acme_decrypt',
            $this->getArrayData()
        );
        $this->runEncryptionTest(
            'acme_encrypt',
            'acme_decrypt',
            $this->getObjectData()
        );
    }


    /**
     * @return void
     * @throws RuntimeException
     */
    public function testBase64StringEncoding()
    {
        $this->assertEquals(
            $this->getString(),
            $this->encryption->base64_string_decode(
                $this->encryption->base64_string_encode(
                    $this->getString()
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
        $url = 'http://eventespresso.com';
        $this->assertEquals(
            $url,
            $this->encryption->base64_url_decode(
                $this->encryption->base64_url_encode($url)
            )
        );
    }


    /**
     * @throws PHPUnit_Framework_AssertionFailedError
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function testValidBase64()
    {
        $this->assertTrue(
            $this->encryption->valid_base_64(
                $this->encryption->base64_string_encode(
                    $this->getString()
                )
            )
        );
        $this->assertFalse(
            $this->encryption->valid_base_64(
                $this->getString()
            )
        );
    }


}
// testcases/core/EE_Encryption_Test.php
