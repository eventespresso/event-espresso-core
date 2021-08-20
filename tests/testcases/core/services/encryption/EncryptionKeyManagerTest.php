<?php

namespace EventEspresso\tests\testcases\core\services\encryption;

use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\tests\includes\RandomDataGenerator;
use EventEspresso\tests\mocks\core\services\encryption\EncryptionKeyManagerMock;
use Exception;
use PHPUnit\Framework\TestCase;
use RuntimeException;

/**
 * Class EncryptionKeyManagerTest
 *
 * @author  Brent Christensen
 * @package tests/testcases/core/services/encryption/EncryptionKeyManagerTest.php
 * @since   $VID:$
 * @group   encryption
 */
class EncryptionKeyManagerTest extends TestCase
{

    const TEST_KEY_ID           = 'openssl_test_key';

    const TEST_KEYS_OPTION_NAME = 'openssl_test_encryption_keys';

    /**
     * @var Base64Encoder
     */
    protected $b64;

    /**
     * @var EncryptionKeyManagerMock
     */
    protected $ekm;

    /**
     * @var RandomDataGenerator $rdg
     */
    protected $rdg;


    public function setUp()
    {
        parent::setUp();
        $this->setUpDependencies();
        delete_option(self::TEST_KEYS_OPTION_NAME);
    }


    public function tearDown()
    {
        $this->b64 = null;
        $this->ekm = null;
        $this->rdg = null;
        parent::tearDown();
    }


    private function setUpDependencies()
    {
        $this->b64 = $this->b64 instanceof Base64Encoder
            ? $this->b64
            : new Base64Encoder;

        $this->ekm = new EncryptionKeyManagerMock(
            $this->b64,
            EncryptionKeyManagerTest::TEST_KEY_ID,
            EncryptionKeyManagerTest::TEST_KEYS_OPTION_NAME
        );

        $this->rdg = $this->rdg instanceof RandomDataGenerator
            ? $this->rdg
            : new RandomDataGenerator();
    }


    /**
     * @throws Exception
     */
    public function generateEncryptionKeyDataProvider()
    {
        $this->setUpDependencies();
        $keys = [];
        for ($i = 0; $i < 32; $i++) {
            $keys[] = [$this->ekm->generateEncryptionKey(mt_rand(0, 1))];
        }
        return $keys;
    }


    /**
     * @dataProvider generateEncryptionKeyDataProvider
     * @return void
     * @throws Exception
     */
    public function testGenerateEncryptionKey($key)
    {
        $this->assertNotEmpty($key);
        $this->assertTrue($this->b64->isValidBase64($key));
    }


    public function bitDepthDataProvider()
    {
        return [
            [64, 64],
            [128, 128],
            [192, 192],
            [256, 256],
            [1, 128],
            [100, 128],
            ['abc', 128],
            ['%$@#', 128],
            [0, 128],
            [null, 128],
            [true, 128],
        ];
    }


    /**
     * @dataProvider bitDepthDataProvider
     */
    public function testSetBitDepth($bit_depth, $expected)
    {
        $this->ekm->setBitDepth($bit_depth);
        $this->assertEquals($expected, $this->ekm->bitDepth());
    }


    public function keyLengthDataProvider()
    {
        return [
            [0, 8],
            [1, 8],
            [7, 8],
            [8, 8],
            [16, 16],
            [100, 100],
            [128, 128],
            [256, 128],
            ['abc', 8],
            ['%$@#', 8],
            [null, 8],
            [true, 8],
        ];
    }


    /**
     * @dataProvider keyLengthDataProvider
     */
    public function testSetKeyLength($key_length, $expected)
    {
        $this->ekm->setKeyLength($key_length);
        $this->assertEquals($expected, $this->ekm->keyLength());
    }


    /**
     * @return void
     * @throws Exception
     */
    public function testRetrieveEncryptionKeys()
    {
        $no_keys = get_option(self::TEST_KEYS_OPTION_NAME, []);
        $this->assertEmpty($no_keys);
        $has_keys = $this->ekm->retrieveEncryptionKeys();
        $this->assertNotEmpty($has_keys);
        $this->assertArrayHasKey(self::TEST_KEY_ID, $has_keys);
        $reload_keys = get_option(self::TEST_KEYS_OPTION_NAME, []);
        foreach ($has_keys as $key_id => $key) {
            $this->assertArrayHasKey($key_id, $reload_keys);
            $this->assertEquals($reload_keys[ $key_id ], $key);
        }
    }


    /**
     * @return void
     * @throws Exception
     */
    public function testGetEncryptionKey()
    {
        $key        = $this->ekm->getEncryptionKey();
        $saved_keys = $this->ekm->retrieveEncryptionKeys();
        $this->assertArrayHasKey(self::TEST_KEY_ID, $saved_keys);
        $this->assertEquals($saved_keys[ self::TEST_KEY_ID ], $key);
    }


    /**
     * @throws Exception
     */
    public function addEncryptionKeyDataProvider()
    {
        $this->setUpDependencies();
        $default_key = $this->ekm->getEncryptionKey();
        $test_data   = [
            ['', '', false, $default_key, true],
            [self::TEST_KEY_ID, $default_key, true, $default_key, false],
        ];
        for ($i = 0; $i < 32; $i++) {
            $key_id      = $this->rdg->generatePropertyOrKeyName();
            $key         = $this->rdg->generateRandomString();
            $test_data[] = [$key_id, $key, false, $key, false];
            // run the same key again to test overwrites
            if ($this->rdg->coinToss()) {
                $test_data[] = [$key_id, $key, true, $key, false];
            }
        }
        return $test_data;
    }


    /**
     * @dataProvider addEncryptionKeyDataProvider
     * @throws Exception
     */
    public function testAddEncryptionKey($key_id, $key, $overwrite, $expected, $throws)
    {
        if ($throws) {
            $this->expectException(RuntimeException::class);
        }
        $this->ekm->addEncryptionKey($key_id, $key, $overwrite);
        $new_key = $this->ekm->getEncryptionKey($key_id, false);
        $this->assertEquals($expected, $new_key);
        $saved_keys = get_option(self::TEST_KEYS_OPTION_NAME, []);
        $this->assertArrayHasKey($key_id, $saved_keys);
        $this->assertEquals($saved_keys[ $key_id ], $key);
    }
}
