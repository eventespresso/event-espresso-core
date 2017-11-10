<?php

namespace EventEspresso\tests\testcases\core\domain\values;

use EE_UnitTestCase;
use EventEspresso\core\domain\values\Version;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class VersionTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\values
 * @author  Brent Christensen
 * @since   4.9.51
 * @group   ValueObjects
 * @group   Version
 */
class VersionTest extends EE_UnitTestCase
{

    public function test_constructor()
    {
        $version = new Version(1, 2, 3, 'rc', 4);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $version = new Version(1, 2, 3, 'beta', 4);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $version = new Version(1, 2, 3, 'p', 4);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $version = new Version(1, 2, 3, 'p');
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $version = new Version(1, 2, 3);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
    }


    public function test_constructor_with_invalid_major()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        new Version(1.1, 2, 3, 'rc', 4);
    }


    public function test_constructor_with_invalid_minor()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        new Version(1, 2.1, 3, 'rc', 4);
    }


    public function test_constructor_with_invalid_patch()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        new Version(1, 2, 'three', 'rc', 4);
    }


    public function test_constructor_with_invalid_release()
    {
        $this->setExceptionExpected('InvalidArgumentException');
        new Version(1, 2, 3, 3.5, 4);
    }


    public function test_constructor_with_invalid_release_2()
    {
        $this->setExceptionExpected('InvalidArgumentException');
        new Version(1, 2, 3, 'release', 4);
    }


    public function test_constructor_with_invalid_build()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        new Version(1, 2, 3, 'rc', 4.1);
    }


    public function test_constructor_with_invalid_build_2()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidDataTypeException');
        new Version(1, 2, 3, 'rc', '001');
    }


    public function test_fromString()
    {
        // using EE version method
        $version = Version::fromString(espresso_version());
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $this->assertEquals(espresso_version(), "{$version}");
        // using full dev version with build
        $version = Version::fromString('1.2.3.rc.4');
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $this->assertEquals('1.2.3.rc.004', "{$version}");
        // using full production version
        $version = Version::fromString('1.2.3.p');
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $this->assertEquals('1.2.3.p', "{$version}");
        // using minimal production version
        $version = Version::fromString('1.2.3');
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $this->assertEquals('1.2.3.p', "{$version}");
    }


    public function test_fromString_invalid_data()
    {
        $this->setExceptionExpected('InvalidArgumentException');
        Version::fromString('1.2.3.alpha.4');
    }


    public function test_fromString_invalid_data_2()
    {
        $this->setExceptionExpected('InvalidArgumentException');
        Version::fromString('moar.betterer.version.for.$5000');
    }


    public function test_major()
    {
        $version = new Version(1, 2, 3, 'rc', 4);
        $this->assertEquals(1, $version->major());
    }


    public function test_minor()
    {
        $version = new Version(1, 2, 3, 'rc', 4);
        $this->assertEquals(2, $version->minor());
    }


    public function test_patch()
    {
        $version = new Version(1, 2, 3, 'rc', 4);
        $this->assertEquals(3, $version->patch());
    }


    public function test_release()
    {
        $version = new Version(1, 2, 3, 'rc', 4);
        $this->assertEquals('rc', $version->release());
    }


    public function test_build()
    {
        $version = new Version(1, 2, 3, 'rc', 4);
        $this->assertEquals(4, $version->build());
    }



    public function test_compare_with_major_version_change()
    {
        $version       = new Version(2, 2, 3, 'p', 0);
        $older_version = new Version(1, 2, 3, 'p', 0);
        $same_version  = new Version(2, 2, 3, 'p', 0);
        $newer_version = new Version(3, 2, 3, 'p', 0);
        // current version is newer so result == 1
        $this->assertEquals(1, $version->compare($older_version));
        $this->assertEquals(0, $version->compare($same_version));
        // current version is older so result == -1
        $this->assertEquals(-1, $version->compare($newer_version));
    }



    public function test_compare_with_minor_version_change()
    {
        $version       = new Version(1, 2, 3, 'p', 0);
        $older_version = new Version(1, 1, 3, 'p', 0);
        $same_version  = new Version(1, 2, 3, 'p', 0);
        $newer_version = new Version(1, 3, 3, 'p', 0);
        // current version is newer so result == 1
        $this->assertEquals(1, $version->compare($older_version));
        $this->assertEquals(0, $version->compare($same_version));
        // current version is older so result == -1
        $this->assertEquals(-1, $version->compare($newer_version));
    }


    public function test_compare_with_patch_version_change()
    {
        $version       = new Version(1, 2, 3, 'p', 0);
        $older_version = new Version(1, 2, 2, 'p', 0);
        $same_version  = new Version(1, 2, 3, 'p', 0);
        $newer_version = new Version(1, 2, 4, 'p', 0);
        // current version is newer so result == 1
        $this->assertEquals(1, $version->compare($older_version));
        $this->assertEquals(0, $version->compare($same_version));
        // current version is older so result == -1
        $this->assertEquals(-1, $version->compare($newer_version));
    }


    public function test_compare_with_release_version_change()
    {
        $version       = new Version(1, 2, 3, 'rc', 0);
        $older_version = new Version(1, 2, 3, 'beta', 0);
        $same_version  = new Version(1, 2, 3, 'rc', 0);
        $newer_version = new Version(1, 2, 3, 'p', 0);
        // current version is newer so result == 1
        $this->assertEquals(1, $version->compare($older_version));
        $this->assertEquals(0, $version->compare($same_version));
        // current version is older so result == -1
        $this->assertEquals(-1, $version->compare($newer_version));
    }


    public function test_compare_with_build_version_change()
    {
        $version       = new Version(1, 2, 3, 'rc', 2);
        $older_version = new Version(1, 2, 3, 'rc', 1);
        $same_version  = new Version(1, 2, 3, 'rc', 2);
        $newer_version = new Version(1, 2, 3, 'rc', 3);
        // current version is newer so result == 1
        $this->assertEquals(1, $version->compare($older_version));
        $this->assertEquals(0, $version->compare($same_version));
        // current version is older so result == -1
        $this->assertEquals(-1, $version->compare($newer_version));
    }


    public function test_equals()
    {
        $version       = new Version(2, 3, 4, 'rc', 5);
        $older_version = new Version(1, 2, 3, 'rc', 4);
        $same_version  = new Version(2, 3, 4, 'rc', 5);
        $newer_version = new Version(3, 4, 5, 'rc', 6);
        $this->assertFalse($version->equals($older_version));
        $this->assertFalse( $version->equals($newer_version));
        $this->assertTrue($version->equals($same_version));
    }


    public function test_newerThan()
    {
        $version       = new Version(2, 3, 4, 'rc', 5);
        $older_version = new Version(1, 2, 3, 'rc', 4);
        $same_version  = new Version(2, 3, 4, 'rc', 5);
        $newer_version = new Version(3, 4, 5, 'rc', 6);
        $this->assertFalse( $version->newerThan($same_version));
        $this->assertFalse($version->newerThan($newer_version));
        $this->assertTrue($version->newerThan($older_version));
    }


    public function test_olderThan()
    {
        $version       = new Version(2, 3, 4, 'rc', 5);
        $older_version = new Version(1, 2, 3, 'rc', 4);
        $same_version  = new Version(2, 3, 4, 'rc', 5);
        $newer_version = new Version(3, 4, 5, 'rc', 6);
        $this->assertFalse( $version->olderThan($same_version));
        $this->assertFalse($version->olderThan($older_version));
        $this->assertTrue($version->olderThan($newer_version));
    }


    public function test_toString()
    {
        $version = new Version(1, 2, 3, 'rc', 4);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $this->assertEquals('1.2.3.rc.004', (string) $version);
        $this->assertEquals('1.2.3.rc.004', "{$version}");
    }


}
// Location: VersionTest.php
