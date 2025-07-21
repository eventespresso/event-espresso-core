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

    private int $build;


    /**
     * Version constructor.
     *
     * @param int    $major
     * @param int    $minor
     * @param int    $patch
     * @param int|string|null $build_or_release
     * @param int|null    $build
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public function __construct(
        int $major,
        int $minor,
        int $patch,
        $build_or_release = 0,
        ?int $build = null
    ) {
        $this->setMajor($major);
        $this->setMinor($minor);
        $this->setPatch($patch);
        $build = $build ?? $build_or_release;
        $this->setBuild($build);
    }


    /**
     * @param string $version_string
     * @return Version
     * @throws InvalidArgumentException
     */
    public static function fromString(string $version_string): Version
    {
        $version_string = trim($version_string);
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
        // remove any non-numeric parts
        $version_parts = array_filter($version_parts, 'is_numeric');
        // reindex the array so that the keys are sequential
        $version_parts = array_values($version_parts);
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
        if (isset($version_parts[4])) {
            // if there are more than 4 parts, then the version string includes the old "release" part
            $build = $version_parts[4];
            $version_parts[3] = $build;
            unset($version_parts[4]);
        }
        // add defaults for missing pieces
        $version_parts += ['0', '0', '0', '000'];
        ksort($version_parts, SORT_NUMERIC);
        $version_parts = array_map('trim', $version_parts);
        // reassign to individual variables
        [$major, $minor, $patch, $build] = $version_parts;
        return new Version(
            (int) $major,
            (int) $minor,
            (int) $patch,
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
        return '';
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
        $version_string = "$this->major.$this->minor.$this->patch";
        // if the build number is not 0, then append it to the version string
        $version_string .= $this->build
            ? '.' . str_pad($this->build, 3, '0', STR_PAD_LEFT)
            : '';
        return $version_string;
    }
}
