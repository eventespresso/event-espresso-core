<?php

namespace EventEspresso\core\domain\values;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use InvalidArgumentException;

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

    const RELEASE_TYPE_RC    = 'rc';

    const RELEASE_TYPE_BETA  = 'beta';

    const RELEASE_TYPE_DECAF = 'decaf';

    const RELEASE_TYPE_PROD  = 'p';

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
    public function __construct($major, $minor, $patch, $release = Version::RELEASE_TYPE_PROD, $build = 0)
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
        // break apart incoming version string
        $version_parts = explode('.', $version_string);
        // verify that version string at least contains {major}.{minor}.{patch}
        if (count($version_parts) < 3) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'At minimum, a version string needs to be in a "{major}.{minor}.{patch}" format, therefore "%1$s" is not valid',
                        'event_espresso'
                    ),
                    $version_string
                )
            );
        }
        // add defaults for missing pieces
        $version_parts += array(0,0,0,'p',0);
        // reassign to individual variables
        list($major, $minor, $patch, $release, $build) = $version_parts;
        return new Version(
            (int) $major,
            (int) $minor,
            (int) $patch,
            $release,
            (int) $build
        );
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
    private function setMajor($major)
    {
        if (! is_int($major)) {
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
    private function setMinor($minor)
    {
        if (! is_int($minor)) {
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
    public function patch()
    {
        return $this->patch;
    }


    /**
     * @param int|string $patch
     * @throws InvalidDataTypeException
     */
    private function setPatch($patch)
    {
        if (! is_int($patch)) {
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
    public function release()
    {
        return $this->release;
    }


    /**
     * @param string $release
     * @throws InvalidArgumentException
     */
    private function setRelease($release)
    {
        $valid_release_types = array(
            Version::RELEASE_TYPE_RC,
            Version::RELEASE_TYPE_BETA,
            Version::RELEASE_TYPE_DECAF,
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
    public function build()
    {
        return $this->build;
    }


    /**
     * @param int|string $build
     * @throws InvalidDataTypeException
     */
    private function setBuild($build)
    {
        if (! is_int($build)) {
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
        $version_string = "{$this->major}.{$this->minor}.{$this->patch}.{$this->release}";
        if ($this->release !== Version::RELEASE_TYPE_PROD && $this->release !== Version::RELEASE_TYPE_DECAF) {
            $version_string .= '.' . str_pad($this->build, 3, '0', STR_PAD_LEFT);
        }
        return $version_string;
    }
}
