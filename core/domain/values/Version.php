<?php

namespace EventEspresso\core\domain\values;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Version
 * Value Object representing a valid PHP version string for an Event Espresso product
 *
 * @package EventEspresso\core\domain\values
 * @author  Brent Christensen
 * @since   4.9.51
 */
class Version
{

    const RELEASE_TYPE_RC   = 'rc';

    const RELEASE_TYPE_BETA = 'beta';

    const RELEASE_TYPE_PROD = 'p';

    /**
     * @var int $major
     */
    private $major;

    /**
     * @var int $minor
     */
    private $minor;

    /**
     * @var int $patch
     */
    private $patch;

    /**
     * @var string $release
     */
    private $release;

    /**
     * @var int $build
     */
    private $build;


    /**
     * Version constructor.
     *
     * @param int    $major
     * @param int    $minor
     * @param int    $patch
     * @param string $release
     * @param int    $build
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public function __construct($major, $minor, $patch, $release, $build)
    {
        $this->setMajor($major);
        $this->setMinor($minor);
        $this->setPatch($patch);
        $this->setRelease($release);
        $this->setBuild($build);
    }


    /**
     * @param string $version_string
     * @return Version
     * @throws InvalidArgumentException
     */
    public static function fromString($version_string)
    {
        // compare incoming version string against the lowest possible valid version
        if (version_compare($version_string, '0.0.1.dev.001', '<')) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__('"%1$s" is not a valid version string', 'event_espresso'),
                    $version_string
                )
            );
        }
        list($major, $minor, $patch, $release, $build) = explode('.', $version_string);
        return new Version($major, $minor, $patch, $release, $build);
    }


    /**
     * @return int
     */
    public function major()
    {
        return $this->major;
    }


    /**
     * @param int|string $major
     * @throws InvalidDataTypeException
     */
    public function setMajor($major)
    {
        if (! is_int($major) && ! is_string($major)) {
            throw new InvalidDataTypeException(
                '$major',
                $major,
                'integer'
            );
        }
        $this->major = absint($major);
    }


    /**
     * @return int
     */
    public function minor()
    {
        return $this->minor;
    }


    /**
     * @param int|string $minor
     * @throws InvalidDataTypeException
     */
    public function setMinor($minor)
    {
        if (! is_int($minor) && ! is_string($minor)) {
            throw new InvalidDataTypeException(
                '$minor',
                $minor,
                'integer'
            );
        }
        $this->minor = absint($minor);
    }


    /**
     * @return int
     */
    public function getPatch()
    {
        return $this->patch;
    }


    /**
     * @param int|string $patch
     * @throws InvalidDataTypeException
     */
    public function setPatch($patch)
    {
        if (! is_int($patch) && ! is_string($patch)) {
            throw new InvalidDataTypeException(
                '$patch',
                $patch,
                'integer'
            );
        }
        $this->patch = absint($patch);
    }


    /**
     * @return string
     */
    public function getRelease()
    {
        return $this->release;
    }


    /**
     * @param string $release
     * @throws InvalidArgumentException
     */
    public function setRelease($release)
    {
        $valid_release_types = array(
            Version::RELEASE_TYPE_RC,
            Version::RELEASE_TYPE_BETA,
            Version::RELEASE_TYPE_PROD,
        );
        if (! in_array($release, $valid_release_types, true)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        '"%1$s" is not a valid release type. Please use one of the following values: %2$s',
                        'event_espresso'
                    ),
                    $release,
                    implode(', ', $valid_release_types)
                )
            );
        }
        $this->release = $release;
    }


    /**
     * @return int
     */
    public function getBuild()
    {
        return $this->build;
    }


    /**
     * @param int|string $build
     * @throws InvalidDataTypeException
     */
    public function setBuild($build)
    {
        if (! is_int($build) && ! is_string($build)) {
            throw new InvalidDataTypeException(
                '$build',
                $build,
                'integer'
            );
        }
        $this->build = absint($build);
    }


    /**
     * @param Version $other_version
     * @return int
     */
    public function compare(Version $other_version)
    {
        return version_compare((string) $this, (string) $other_version);
    }


    /**
     * @param Version $other_version
     * @return bool
     */
    public function equals(Version $other_version)
    {
        return version_compare((string) $this, (string) $other_version, '==');
    }


    /**
     * @param Version $other_version
     * @return bool
     */
    public function newerThan(Version $other_version)
    {
        return version_compare((string) $this, (string) $other_version, '>');
    }


    /**
     * @param Version $other_version
     * @return bool
     */
    public function olderThan(Version $other_version)
    {
        return version_compare((string) $this, (string) $other_version, '<');
    }


    /**
     * @return string
     */
    public function __toString()
    {
        $version_string = "{$this->major}.{$this->minor}.{$this->patch}.{$this->release}.";
        $version_string .= str_pad($this->build, 3, '0', STR_PAD_LEFT);
        return $version_string;
    }



}
// Location: Version.php
