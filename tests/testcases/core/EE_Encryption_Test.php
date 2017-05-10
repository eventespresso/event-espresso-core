<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EE_Encryption_Test
 * unit tests for the EE_Encryption_Test class
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EE_Encryption_Test extends EE_UnitTestCase
{


    /**
     * EE_Encryption object
     *
     * @var EE_Encryption
     */
    protected $encryption;



    public function setUp()
    {
        parent::setUp();
        $this->encryption = EE_Encryption::instance();
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
     * @return void
     * @throws RuntimeException
     */
    public function testEncryptionWithStrings()
    {
        $string = 'LPT: Change all of your passwords to "incorrect" so that your computer just tells you when you forget!';
        $this->assertEquals(
            $string,
            $this->encryption->decrypt($this->encryption->encrypt($string))
        );
    }



    /**
     * @return void
     * @throws RuntimeException
     */
    public function testEncryptionWithArrays()
    {
        $array = array();
        $array_size = mt_rand(5, 10);
        for ($x = 0; $x <= $array_size; $x++) {
            $key = mt_rand(0, 1) ? trim($this->generateRandomString(mt_rand(5, 10))) : count($array);
            $array[$key] = $this->generateRandomString(mt_rand(10, 50));
        }
        $this->assertEquals(
            $array,
            unserialize(
                $this->encryption->decrypt(
                    $this->encryption->encrypt(
                        serialize($array)
                    )
                )
            )
        );
    }



    /**
     * @return void
     * @throws RuntimeException
     */
    public function testEncryptionWithObjects()
    {
        $object = new stdClass();
        $array_size = mt_rand(5, 10);
        for ($x = 0; $x <= $array_size; $x++) {
            $property = trim($this->generateRandomString(mt_rand(5, 10)));
            $object->{$property} = $this->generateRandomString(mt_rand(10, 50));
        }
        $this->assertEquals(
            $object,
            unserialize(
                $this->encryption->decrypt(
                    $this->encryption->encrypt(
                        serialize($object)
                    )
                )
            )
        );
    }



    /**
     * @return void
     */
    public function testBase64StringEncoding()
    {
        $string = 'LPT: Change all of your passwords to "incorrect" so that your computer just tells you when you forget!';
        $this->assertEquals(
            $string,
            $this->encryption->base64_string_decode($this->encryption->base64_string_encode($string))
        );
    }



    /**
     * @return void
     */
    public function testBase64UrlEncoding()
    {
        $url = 'http://eventespresso.com';
        $this->assertEquals(
            $url,
            $this->encryption->base64_url_decode($this->encryption->base64_url_encode($url))
        );
    }


}
// testcases/core/EE_Encryption_Test.php