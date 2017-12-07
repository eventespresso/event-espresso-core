<?php

namespace EventEspresso\tests\testcases\core\domain\values;

use EE_UnitTestCase;
use EventEspresso\core\domain\values\Version;
use InvalidArgumentException;
use PHPUnit\Framework\Exception;

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

    /**
     * @return array
     */
    public function validMajorMinorPatchProvider()
    {
        return array(
            array(1, 2, 3, 'rc', 4),
            array(1, 2, 3, 'beta', 4),
            array(1, 2, 3, 'decaf', 4),
            array(1, 2, 3, 'p', 4),
            array(1, 2, 3, 'p'),
            array(1, 2, 3),
        );
    }


    /**
     * @dataProvider validMajorMinorPatchProvider
     * @param        $major
     * @param        $minor
     * @param        $patch
     * @param string $release
     * @param int    $build
     * @throws Exception
     */
    public function testConstructor($major, $minor, $patch, $release = Version::RELEASE_TYPE_PROD, $build = 0)
    {
        $version = new Version($major, $minor, $patch, $release, $build);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
    }



    /**
     * @return array
     */
    public function invalidMajorMinorPatchProvider()
    {
        return array(
            array(1.1, 2, 3, 'rc', 4),
            array(1, 2.1, 3, 'rc', 4),
            array(1, 2, 'three', 'rc', 4),
            array(1, 2, 3, 3.5, 4, 'InvalidArgumentException'),
            array(1, 2, 3, 'release', 4, 'InvalidArgumentException'),
            array(1, 2, 3, 'decaff', 4, 'InvalidArgumentException'),
            array(1, 2, 3, 'rc', 4.1),
            array(1, 2, 3, 'rc', '001'),
        );
    }


    /**
     * @dataProvider invalidMajorMinorPatchProvider
     * @param        $major
     * @param        $minor
     * @param        $patch
     * @param string $release
     * @param int    $build
     * @param string $exception
     * @throws Exception
     */
    public function testConstructorWithInvalidParameters(
        $major,
        $minor,
        $patch,
        $release = Version::RELEASE_TYPE_PROD,
        $build = 0,
        $exception = 'EventEspresso\core\exceptions\InvalidDataTypeException'
    ) {
        $this->setExceptionExpected($exception);
        new Version($major, $minor, $patch, $release, $build);
    }



    /**
     * @return array
     */
    public function validVersionStringProvider()
    {
        return array(
            array(espresso_version(), espresso_version()),
            array('1.2.3.rc.4', '1.2.3.rc.004'),
            array('1.2.3.beta', '1.2.3.beta.000'),
            array('1.2.3.decaf.123', '1.2.3.decaf'),
            array('1.2.3.decaf', '1.2.3.decaf'),
            array('1.2.3.p.123', '1.2.3.p'),
            array('1.2.3.p', '1.2.3.p'),
            array('1.2.3', '1.2.3.p'),
        );
    }



    /**
     * @dataProvider validVersionStringProvider
     * @param string $version_string
     * @param string $expected
     * @throws Exception
     * @throws InvalidArgumentException
     */
    public function testFromString($version_string, $expected)
    {
        // using EE version method
        $version = Version::fromString($version_string);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $this->assertEquals($expected, "{$version}");
    }



    /**
     * @return array
     */
    public function invalidVersionStringProvider()
    {
        return array(
            array('1.2.3.alpha.4'),
            array('moar.betterer.version.for.$5000'),
            array('Oh come on!!! This isn\'t even a version  string!!!'),
        );
    }


    /**
     * @dataProvider invalidVersionStringProvider
     * @param string $version_string
     * @throws Exception
     * @throws InvalidArgumentException
     */
    public function testFromStringWithInvalidData($version_string)
    {
        $this->setExceptionExpected('InvalidArgumentException');
        Version::fromString($version_string);
    }


    /**
     * @return array
     */
    public function majorMinorPatchReleaseAndBuildProvider()
    {
        return array(
            array(1, 2, 3, 'rc', 4),
            array(1, 2, 3, 'beta', 4),
            array(1, 2, 3, 'decaf', 4),
            array(1, 2, 3, 'p', 4),
            array(1, 2, 3, 'p'),
            array(1, 2, 3),
        );
    }


    /**
     * @dataProvider validMajorMinorPatchProvider
     * @param        $major
     * @param        $minor
     * @param        $patch
     * @param string $release
     * @param int    $build
     * @throws Exception
     */
    public function testMajorMinorPatchReleaseAndBuild(
        $major,
        $minor,
        $patch,
        $release = Version::RELEASE_TYPE_PROD,
        $build = 0
    ) {
        $version = new Version($major, $minor, $patch, $release, $build);
        $this->assertEquals($major, $version->major());
        $this->assertEquals($minor, $version->minor());
        $this->assertEquals($patch, $version->patch());
        $this->assertEquals($release, $version->release());
        $this->assertEquals($build, $version->build());
    }



    /**
     * @return array
     */
    public function versionCompareProvider()
    {
        return array(
            'major version compare' => array(
                'version'       => new Version(2, 2, 3, 'p', 0),
                'older version' => new Version(1, 2, 3, 'p', 0),
                'same version'  => new Version(2, 2, 3, 'p', 0),
                'newer version' => new Version(3, 2, 3, 'p', 0),
            ),
            'minor version compare' => array(
                'version'       => new Version(1, 2, 3, 'p', 0),
                'older version' => new Version(1, 1, 3, 'p', 0),
                'same version'  => new Version(1, 2, 3, 'p', 0),
                'newer version' => new Version(1, 3, 3, 'p', 0),
            ),
            'patch version compare' => array(
                'version'       => new Version(1, 2, 3, 'p', 0),
                'older version' => new Version(1, 2, 2, 'p', 0),
                'same version'  => new Version(1, 2, 3, 'p', 0),
                'newer version' => new Version(1, 2, 4, 'p', 0),
            ),
            'release version compare' => array(
                'version'       => new Version(1, 2, 3, 'rc', 0),
                'older version' => new Version(1, 2, 3, 'beta', 0),
                'same version'  => new Version(1, 2, 3, 'rc', 0),
                'newer version' => new Version(1, 2, 3, 'p', 0),
            ),
            'build version compare' => array(
                'version'       => new Version(1, 2, 3, 'rc', 2),
                'older version' => new Version(1, 2, 3, 'rc', 1),
                'same version'  => new Version(1, 2, 3, 'rc', 2),
                'newer version' => new Version(1, 2, 3, 'rc', 3),
            ),
        );
    }



    /**
     * @dataProvider versionCompareProvider
     * @param Version $version
     * @param Version $older_version
     * @param Version $same_version
     * @param Version $newer_version
     */
    public function testCompare(
        Version $version,
        Version $older_version,
        Version $same_version,
        Version $newer_version
    ) {
        // current version is newer so result == 1
        $this->assertEquals(1, $version->compare($older_version));
        // current version is same so result == 0
        $this->assertEquals(0, $version->compare($same_version));
        // current version is older so result == -1
        $this->assertEquals(-1, $version->compare($newer_version));
    }


    /**
     * @dataProvider versionCompareProvider
     * @param Version $version
     * @param Version $older_version
     * @param Version $same_version
     * @param Version $newer_version
     */
    public function testEquals(
        Version $version,
        Version $older_version,
        Version $same_version,
        Version $newer_version
    ) {
        $this->assertFalse($version->equals($older_version));
        $this->assertFalse( $version->equals($newer_version));
        $this->assertTrue($version->equals($same_version));
    }


    /**
     * @dataProvider versionCompareProvider
     * @param Version $version
     * @param Version $older_version
     * @param Version $same_version
     * @param Version $newer_version
     */
    public function testNewerThan(
        Version $version,
        Version $older_version,
        Version $same_version,
        Version $newer_version
    ) {
        $this->assertFalse( $version->newerThan($same_version));
        $this->assertFalse($version->newerThan($newer_version));
        $this->assertTrue($version->newerThan($older_version));
    }


    /**
     * @dataProvider versionCompareProvider
     * @param Version $version
     * @param Version $older_version
     * @param Version $same_version
     * @param Version $newer_version
     */
    public function testOlderThan(
        Version $version,
        Version $older_version,
        Version $same_version,
        Version $newer_version
    ) {
        $this->assertFalse( $version->olderThan($same_version));
        $this->assertFalse($version->olderThan($older_version));
        $this->assertTrue($version->olderThan($newer_version));
    }


    /**
     * @return array
     */
    public function toStringProvider()
    {
        return array(
            array('1.2.3.rc.004', 1, 2, 3, 'rc', 4),
            array('1.2.3.beta.004', 1, 2, 3, 'beta', 4),
            array('1.2.3.decaf', 1, 2, 3, 'decaf', 4),
            array('1.2.3.decaf', 1, 2, 3, 'decaf'),
            array('1.2.3.p', 1, 2, 3, 'p', 4),
            array('1.2.3.p', 1, 2, 3, 'p'),
            array('1.2.3.p', 1, 2, 3),
        );
    }


    /**
     * @dataProvider toStringProvider
     * @param string $expected
     * @param int    $major
     * @param int    $minor
     * @param int    $patch
     * @param string $release
     * @param int    $build
     * @throws Exception
     */
    public function testToString (
        $expected,
        $major,
        $minor,
        $patch,
        $release = Version::RELEASE_TYPE_PROD,
        $build = 0
    ) {
        $version = new Version($major, $minor, $patch, $release, $build);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Version', $version);
        $this->assertEquals($expected, (string) $version);
        $this->assertEquals($expected, "{$version}");
    }


}
// Location: VersionTest.php
