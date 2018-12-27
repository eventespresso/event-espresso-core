<?php
namespace EventEspresso\core\services\helpers\datetime;

use DateTimeZone;
use DomainException;
use EE_Error;
use Exception;

/**
 * PhpCompatLessFiveSixHelper
 * This class is an implementation of DatetimeHelper methods for php versions < 5.6
 * This class will throw an exception if the php version is greater than 5.6 when it is constructed.
 *
 * @package EventEspresso\core\domain\datetime
 * @author  Darren Ethier
 * @since   4.9.54.rc
 */
class PhpCompatLessFiveSixHelper extends AbstractHelper
{

    /**
     * PhpCompatLessFiveSixHelper constructor.
     *
     * @throws DomainException
     */
    public function __construct()
    {
        if (PHP_VERSION_ID >= 50600) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The %1$s is only usable on php versions less than 5.6.  You\'ll want to use %2$s instead.',
                        'event_espresso'
                    ),
                    __CLASS__,
                    'EventEspresso\core\services\helpers\datetime\PhpCompatGreaterFiveSixHelper'
                )
            );
        }
    }

    /**
     * Returns a timezone string for the provided gmt_offset.
     *
     * @param float|string $gmt_offset
     * @return string
     * @throws EE_Error
     */
    public function getTimezoneStringFromGmtOffset($gmt_offset = '')
    {
        $gmt_offset_or_timezone_string = $this->sanitizeInitialIncomingGmtOffsetForGettingTimezoneString($gmt_offset);
        if (is_string($gmt_offset_or_timezone_string)) {
            return $gmt_offset_or_timezone_string;
        }
        // well we know its a float, so let's roll with it.
        $gmt_offset = $gmt_offset_or_timezone_string;
        // convert GMT offset to seconds
        $gmt_offset *= HOUR_IN_SECONDS;
        // although we don't know the TZ abbreviation, we know the UTC offset
        $timezone_string = timezone_name_from_abbr(null, $gmt_offset);
        // only use this timezone_string IF it's current offset matches the given offset
        if (! empty($timezone_string)) {
            $offset = null;
            try {
                $offset = $this->getTimezoneOffset(new DateTimeZone($timezone_string));
                if ($offset !== $gmt_offset) {
                    $timezone_string = false;
                }
            } catch (Exception $e) {
                $timezone_string = false;
            }
        }
        // better have a valid timezone string by now, but if not, sigh... loop thru  the timezone_abbreviations_list()
        // ...
        $timezone_string = $timezone_string !== false
            ? $timezone_string
            : $this->getTimezoneStringFromAbbreviationsList($gmt_offset);
        return $timezone_string;
    }


    /**
     * @param int  $gmt_offset
     * @param bool $coerce If true, we attempt to coerce with our adjustment table
     * @see self::adjustInvalidGmtOffset
     * @return string
     * @throws EE_Error
     */
    protected function getTimezoneStringFromAbbreviationsList($gmt_offset = 0, $coerce = true)
    {
        $gmt_offset = (int) $gmt_offset;
        /** @var array[] $abbreviations */
        $abbreviations = DateTimeZone::listAbbreviations();
        foreach ($abbreviations as $abbreviation) {
            foreach ($abbreviation as $timezone) {
                if ((int) $timezone['offset'] === $gmt_offset && (bool) $timezone['dst'] === false) {
                    try {
                        $offset = $this->getTimezoneOffset(new DateTimeZone($timezone['timezone_id']));
                        if ($offset !== $gmt_offset) {
                            continue;
                        }
                        return $timezone['timezone_id'];
                    } catch (Exception $e) {
                        continue;
                    }
                }
            }
        }
        // if $coerce is true, let's see if we can get a timezone string after the offset is adjusted
        if ($coerce === true) {
            $timezone_string = $this->getTimezoneStringFromAbbreviationsList(
                $this->adjustInvalidGmtOffsets($gmt_offset),
                false
            );
            if ($timezone_string) {
                return $timezone_string;
            }
        }
        throw new EE_Error(
            sprintf(
                esc_html__(
                    'The provided GMT offset (%1$s), is invalid, please check with %2$sthis list%3$s for what valid timezones can be used',
                    'event_espresso'
                ),
                $gmt_offset / HOUR_IN_SECONDS,
                '<a href="http://www.php.net/manual/en/timezones.php">',
                '</a>'
            )
        );
    }


    /**
     * Depending on PHP version,
     * there might not be valid current timezone strings to match these gmt_offsets in its timezone tables.
     * To get around that, for these fringe timezones we bump them to a known valid offset.
     * This method should ONLY be called after first verifying an timezone_string cannot be retrieved for the offset.
     *
     * @param int $gmt_offset
     * @return int
     */
    public function adjustInvalidGmtOffsets($gmt_offset = 0)
    {
        // make sure $gmt_offset is int
        $gmt_offset = (int) $gmt_offset;
        switch ($gmt_offset) {
            // -12
            case -43200:
                $gmt_offset = -39600;
                break;
            // -11.5
            case -41400:
                $gmt_offset = -39600;
                break;
            // -10.5
            case -37800:
                $gmt_offset = -39600;
                break;
            // -8.5
            case -30600:
                $gmt_offset = -28800;
                break;
            // -7.5
            case -27000:
                $gmt_offset = -25200;
                break;
            // -6.5
            case -23400:
                $gmt_offset = -21600;
                break;
            // -5.5
            case -19800:
                $gmt_offset = -18000;
                break;
            // -4.5
            case -16200:
                $gmt_offset = -14400;
                break;
            // -3.5
            case -12600:
                $gmt_offset = -10800;
                break;
            // -2.5
            case -9000:
                $gmt_offset = -7200;
                break;
            // -1.5
            case -5400:
                $gmt_offset = -3600;
                break;
            // -0.5
            case -1800:
                $gmt_offset = 0;
                break;
            // .5
            case 1800:
                $gmt_offset = 3600;
                break;
            // 1.5
            case 5400:
                $gmt_offset = 7200;
                break;
            // 2.5
            case 9000:
                $gmt_offset = 10800;
                break;
            // 3.5
            case 12600:
                $gmt_offset = 14400;
                break;
            // 7.5
            case 27000:
                $gmt_offset = 28800;
                break;
            // 8.5
            case 30600:
                $gmt_offset = 31500;
                break;
            // 10.5
            case 37800:
                $gmt_offset = 39600;
                break;
            // 11.5
            case 41400:
                $gmt_offset = 43200;
                break;
            // 12.75
            case 45900:
                $gmt_offset = 46800;
                break;
            // 13.75
            case 49500:
                $gmt_offset = 50400;
                break;
        }
        return $gmt_offset;
    }
}
