<?php

namespace EventEspresso\tests\testcases\core\domain\values\assets;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\tests\mocks\core\domain\DomainMock;
use InvalidArgumentException;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;

/**
 * JavascriptAssetTest
 *
 *
 * @package EventEspresso\tests
 * @author  Darren Ethier
 * @since   4.9.70.p
 */
class JavascriptAssetTest extends EspressoPHPUnitFrameworkTestCase
{

    /**
     * @var DomainInterface
     */
    private $domain_mock;

    /**
     * @var JavascriptAsset
     */
    private $js_asset;


    /**
     * @throws InvalidDataTypeException
     * @throws InvalidFilePathException
     * @throws InvalidArgumentException
     */
    public function setUp(): void
    {
        $this->domain_mock = new Domain(
            new FilePath(EVENT_ESPRESSO_MAIN_FILE),
            Version::fromString('1.2.3.p')
        );
        $this->js_asset = $this->getAsset();
    }


    public function tearDown(): void
    {
        parent::tearDown();
        $this->domain_mock = null;
        $this->js_asset = null;
    }


    private function getAsset(
        $source = 'https://testurl.com/test.js',
        array $dependencies = array(),
        bool $load_in_footer = true
    ): JavascriptAsset {
        return new JavascriptAsset(
            'test-handle',
            $source,
            $dependencies,
            $load_in_footer,
            $this->domain_mock
        );
    }


    public function testConstruct()
    {
        $this->assertEquals('test-handle', $this->js_asset->handle());
        $this->assertEquals('https://testurl.com/test.js', $this->js_asset->source());
        $this->assertEquals(array(), $this->js_asset->dependencies());
        $this->assertTrue($this->js_asset->loadInFooter());
    }


    public function testHasInlineData()
    {
        $this->assertFalse($this->js_asset->hasInlineData());
        $this->js_asset->setHasInlineData();
        $this->assertTrue($this->js_asset->hasInlineData());
    }


    public function testInlineDataCallback()
    {
        $test_callback = function () {
            return true;
        };
        $this->assertFalse($this->js_asset->hasInlineDataCallback());
        $this->assertNull($this->js_asset->inlineDataCallback());
        $this->assertFalse($this->js_asset->hasInlineData());

        $this->js_asset->setInlineDataCallback($test_callback);
        $this->assertTrue($this->js_asset->hasInlineDataCallback());
        $this->assertEquals($test_callback, $this->js_asset->inlineDataCallback());
        $this->assertTrue($this->js_asset->hasInlineData());
    }


    public function testIsBuiltDistributionSource()
    {
        $this->assertFalse($this->js_asset->isBuiltDistributionSource());

        $asset = $this->getAsset('https://testurl.com/testjs.dist.js');
        $this->assertTrue($asset->isBuiltDistributionSource());
    }


    public function testVersion()
    {
        // version for non built (or "dist") source with no set version
        $this->assertEquals('1.2.3.p', $this->js_asset->version());

        // version for explicitly set version
        $this->js_asset->setVersion('4.5.6');
        $this->assertEquals('4.5.6', $this->js_asset->version());

        // version for built ('.dist.js') source.
        $asset = $this->getAsset('https://testurl.com/testjs.dist.js');
        $this->assertEquals('', $asset->version());
    }
}
