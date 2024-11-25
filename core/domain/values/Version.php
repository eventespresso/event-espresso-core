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

    private int $major;

    private int $minor;

    private int $patch;

    private string $release;

    private int $build;


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
    public function __construct(
        int $major,
        int $minor,
        int $patch,
        string $release = Version::RELEASE_TYPE_PROD,
        int $build = 0
    ) {
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
    public static function fromString(string $version_string): Version
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
        // convert semver 1.2.3.001 to 1.2.3.p.001 style... FOR THE TIME BEING
        if (count($version_parts) === 4 && is_numeric($version_parts[3])) {
            $version_parts[4] = $version_parts[3];
            unset($version_parts[3]);
        }
        $release = isset($version_parts[4]) && (string) $version_parts[4] === '000'
            ? Version::RELEASE_TYPE_PROD
            : Version::RELEASE_TYPE_RC;
        // semver styles like 1.2.3 will be considered production releases
        $release = ! isset($version_parts[3], $version_parts[4])
            ? Version::RELEASE_TYPE_PROD
            : $release;
        // add defaults for missing pieces
        $version_parts += [0, 0, 0, $release, 0];
        ksort($version_parts, SORT_NUMERIC);
        // reassign to individual variables
        [$major, $minor, $patch, $release, $build] = $version_parts;
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
    public function major(): int
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
    public function minor(): int
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
    public function patch(): int
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
    public function release(): string
    {
        return $this->release;
    }


    /**
     * @param string $release
     * @throws InvalidArgumentException
     */
    private function setRelease(string $release)
    {
        $valid_release_types = [
            Version::RELEASE_TYPE_RC,
            Version::RELEASE_TYPE_BETA,
            Version::RELEASE_TYPE_DECAF,
            Version::RELEASE_TYPE_PROD,
        ];
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
    public function build(): int
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
    public function compare(Version $other_version): int
    {
        return version_compare((string) $this, (string) $other_version);
    }


    /**
     * @param Version $other_version
     * @return bool
     */
    public function equals(Version $other_version): bool
    {
        return version_compare((string) $this, (string) $other_version, '==');
    }


    /**
     * @param Version $other_version
     * @return bool
     */
    public function newerThan(Version $other_version): bool
    {
        return version_compare((string) $this, (string) $other_version, '>');
    }


    /**
     * @param Version $other_version
     * @return bool
     */
    public function olderThan(Version $other_version): bool
    {
        return version_compare((string) $this, (string) $other_version, '<');
    }


    /**
     * @return string
     */
    public function __toString()
    {
        $version_string = "$this->major.$this->minor.$this->patch.$this->release";
        if ($this->release !== Version::RELEASE_TYPE_PROD && $this->release !== Version::RELEASE_TYPE_DECAF) {
            $version_string .= '.' . str_pad($this->build, 3, '0', STR_PAD_LEFT);
        }
        return $version_string;
    }
}
