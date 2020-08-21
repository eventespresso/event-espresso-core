<?php

namespace EventEspresso\core\services\converters\date_time_formats;


class PhpToUnicode
{
    /**
     * array where keys are PHP date format parameters
     * and values are Unicode Date Format substitutions
     */
    static $date_formats = [
        // YEAR
        'y' => 'YY',    // 00, 01, ..., 99
        'Y' => 'YYYY',  // 2000, 2001, ..., 2099
        'o' => 'GGGG',  // ISO "week-numbering year" 2000, 2001, ..., 2099
        // MONTH
        'n' => 'M',     // 1, 2, ..., 12
        'm' => 'MM',    // 01, 02, ..., 12
        'M' => 'MMM',   // Jan, Feb, ..., Dec
        'F' => 'MMMM',  // January, February, ..., December
        // DAY
        'jS' => 'do',   // 1st, 2nd, ..., 31st
        'j' => 'D',     // 1, 2, ..., 31
        'd' => 'DD',    // 01, 02, ..., 31
        'D' => 'ddd',   // Sun, Mon, ..., Sat
        'l' => 'dddd',  // Sunday, Monday, ..., Saturday
        'N' => 'E',     // Day of week 0, 1, ..., 6
        'w' => 'd',     // ISO Day of week 1, 2, ..., 7
        'z' => 'DDD',   // day of the year 0 - 365 to 1 - 366
    ];


    /**
     * array where keys are PHP time format parameters
     * and values are Unicode Time Format substitutions
     */
    static $time_formats = [
        // HOUR
        'g' => 'h',     // 1, 2, ..., 12
        'h' => 'hh',    // 01, 02, ..., 12
        'G' => 'H',     // 0, 1, ... 23
        'H' => 'HH',    // 00, 01, ... 23
        // MINUTES & SECONDS
        'i' => 'mm',    // 00, 01, ..., 59
        's' => 'ss',    // 00, 01, ..., 59
        'v' => 'SSS',   // milliseconds 000, 001, ..., 999
        'u' => 'SSS',   // microseconds (not in unicode) 000, 001, ..., 999
    ];


    /**
     * array where keys are PHP timezone format parameters
     * and values are Unicode Timezone Format substitutions
     */
    static $timezone_formats = [
        'e' => 'Z',     // Timezone identifier UTC, GMT, Atlantic/Azores to -01:00, +00:00, ... +12:00
        'T' => 'Z',     // Timezone abbreviation EST, MDT to -01:00, +00:00, ... +12:00
        'P' => 'Z',     // -01:00, +00:00, ... +12:00
        'O' => 'ZZ',    // -0100, +0000, ..., +1200
        'Z' => 'ZZ',    // -0100, +0000, ..., +1200
    ];


    /**
     * @param string $date_format
     * @return string
     */
    public function convertDateFormat($date_format)
    {
        foreach (PhpToUnicode::$date_formats as $find => $replace) {
            $date_format = (string) str_replace($find, $replace, $date_format);
        }
        return $date_format;
    }


    /**
     * @param string $time_format
     * @return string
     */
    public function convertTimeFormat($time_format)
    {
        foreach (PhpToUnicode::$time_formats as $find => $replace) {
            $time_format = (string) str_replace($find, $replace, $time_format);
        }
        // and just in case the timezone has been added
        foreach (PhpToUnicode::$timezone_formats as $find => $replace) {
            $time_format = (string) str_replace($find, $replace, $time_format);
        }
        return $time_format;
    }
}
