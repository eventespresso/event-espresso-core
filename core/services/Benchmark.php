<?php

namespace EventEspresso\core\services;

use EE_Error;
use EEH_File;

/**
 * Class Benchmark
 * Useful for measuring the performance of a block of code
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class Benchmark
{

    /**
     * @var string $output
     */
    private static $output;

    /**
     * @var array $start_times array containing the start time for the timers
     */
    private static $start_times;

    /**
     * @var array $times array containing all the timer'd times, which can be outputted via show_times()
     */
    private static $times = array();

    /**
     * @var array $memory_usage
     */
    protected static $memory_usage = array();


    /**
     * @param string $output
     * @param bool   $formatted
     */
    public static function addOutput($output, $formatted = true)
    {
        Benchmark::$output .= $formatted
            ? "<br />{$output}"
            : "\n{$output}";
    }


    /**
     * @return void
     */
    public static function resetOutput()
    {
        Benchmark::$output = '';
    }

    /**
     * whether to benchmark code or not
     */
    public static function doNotRun()
    {
        return ! WP_DEBUG || (defined('DOING_AJAX') && DOING_AJAX);
    }


    /**
     * resetTimes
     */
    public static function resetTimes()
    {
        Benchmark::$times = array();
    }


    /**
     * Add Benchmark::startTimer() before a block of code you want to measure the performance of
     *
     * @param null $timer_name
     */
    public static function startTimer($timer_name = null)
    {
        if (Benchmark::doNotRun()) {
            return;
        }
        $timer_name = $timer_name !== '' ? $timer_name : get_called_class();
        Benchmark::$start_times[ $timer_name ] = microtime(true);
    }


    /**
     * Add Benchmark::stopTimer() after a block of code you want to measure the performance of
     *
     * @param string $timer_name
     */
    public static function stopTimer($timer_name = '')
    {
        if (Benchmark::doNotRun()) {
            return;
        }
        $timer_name = $timer_name !== '' ? $timer_name : get_called_class();
        if (isset(Benchmark::$start_times[ $timer_name ])) {
            $start_time = Benchmark::$start_times[ $timer_name ];
            unset(Benchmark::$start_times[ $timer_name ]);
        } else {
            $start_time = array_pop(Benchmark::$start_times);
        }
        Benchmark::$times[ $timer_name ] = number_format(microtime(true) - $start_time, 8);
    }


    /**
     * Measure the memory usage by PHP so far.
     *
     * @param string  $label      The label to show for this time eg "Start of calling Some_Class::some_function"
     * @param boolean $output_now whether to echo now, or wait until EEH_Debug_Tools::show_times() is called
     * @param bool    $formatted
     * @return void
     */
    public static function measureMemory($label = 'memory usage', $output_now = false, $formatted = true)
    {
        if (Benchmark::doNotRun()) {
            return;
        }
        $memory_used = Benchmark::convert(memory_get_usage(true));
        Benchmark::$memory_usage[ $label ] = $memory_used;
        if ($output_now) {
            echo $formatted
                ? "<br>{$label} : {$memory_used}"
                : "\n {$label} : {$memory_used}";
        }
    }


    /**
     * will display the benchmarking results at shutdown
     *
     * @param bool $formatted
     * @return void
     */
    public static function displayResultsAtShutdown($formatted = true)
    {
        Benchmark::resetOutput();
        add_action(
            'shutdown',
            function () use ($formatted) {
                Benchmark::displayResults(true, $formatted);
            },
            999999
        );
    }


    /**
     * will display the benchmarking results at shutdown
     *
     * @param string $filepath
     * @param bool   $formatted
     * @param bool   $append
     * @return void
     */
    public static function writeResultsAtShutdown($filepath = '', $formatted = true, $append = true)
    {
        Benchmark::resetOutput();
        add_action(
            'shutdown',
            function () use ($filepath, $formatted, $append) {
                Benchmark::writeResultsToFile($filepath, $formatted, $append);
            },
            999999
        );
    }


    /**
     * @param bool $formatted
     * @return string
     */
    private static function generateResults($formatted = true)
    {
        if (Benchmark::doNotRun()) {
            return '';
        }
        if (! empty(Benchmark::$times)) {
            $total = 0;
            Benchmark::$output .= $formatted
                ? '<span style="color:#999999; font-size:.8em;">( time in milliseconds )</span><br />'
                : '';
            foreach (Benchmark::$times as $timer_name => $total_time) {
                Benchmark::$output .= Benchmark::formatTime($timer_name, $total_time, $formatted);
                Benchmark::$output .= $formatted ? '<br />' : "\n";
                $total += $total_time;
            }
            if ($formatted) {
                Benchmark::$output .= '<br />';
                Benchmark::$output .= '<h4>TOTAL TIME</h4>';
                Benchmark::$output .= Benchmark::formatTime('', $total, $formatted);
                Benchmark::$output .= '<span style="color:#999999; font-size:.8em;"> milliseconds</span><br />';
                Benchmark::$output .= '<br />';
                Benchmark::$output .= '<h5>Performance scale (from best to worse)</h5>';
                Benchmark::$output .= '<span style="color:mediumpurple">Like wow! How about a Scooby snack?</span><br />';
                Benchmark::$output .= '<span style="color:deepskyblue">Like...no way man!</span><br />';
                Benchmark::$output .= '<span style="color:limegreen">Like...groovy!</span><br />';
                Benchmark::$output .= '<span style="color:gold">Ruh Oh</span><br />';
                Benchmark::$output .= '<span style="color:darkorange">Zoinks!</span><br />';
                Benchmark::$output .= '<span style="color:red">Like...HEEELLLP</span><br />';
            }
        }
        if (! empty(Benchmark::$memory_usage)) {
            Benchmark::$output .= $formatted
                ? '<h5>Memory</h5>'
                : "\nMemory";
            foreach (Benchmark::$memory_usage as $label => $memory_usage) {
                Benchmark::$output .= $formatted
                    ? "<br />{$memory_usage} : {$label}"
                    : "\n{$memory_usage} : {$label}";
            }
        }
        if (empty(Benchmark::$output)) {
            return '';
        }
        Benchmark::$output = $formatted
            ? '<div style="border:1px solid #dddddd; background-color:#ffffff;'
              . (is_admin()
                ? ' margin:2em 2em 2em 180px;'
                : ' margin:2em;')
              . ' padding:2em;">'
              . '<h4>BENCHMARKING</h4>'
              . Benchmark::$output
              . '</div>'
            : Benchmark::$output;
        return Benchmark::$output;
    }


    /**
     * @param bool $echo
     * @param bool $formatted
     * @return string
     */
    public static function displayResults($echo = true, $formatted = true)
    {
        $results = Benchmark::generateResults($formatted);
        if ($echo) {
            echo $results;
            $results = '';
        }
        return $results;
    }


    /**
     * @param string $filepath
     * @param bool   $formatted
     * @param bool   $append
     * @throws EE_Error
     */
    public static function writeResultsToFile($filepath = '', $formatted = true, $append = true)
    {
        $filepath = ! empty($filepath) && is_readable(dirname($filepath))
            ? $filepath
            : '';
        if (empty($filepath)) {
            $filepath = EVENT_ESPRESSO_UPLOAD_DIR . 'logs/benchmarking-' . date('Y-m-d') . '.html';
        }
        EEH_File::ensure_file_exists_and_is_writable($filepath);
        file_put_contents(
            $filepath,
            "\n" . date('Y-m-d H:i:s') . Benchmark::generateResults($formatted),
            $append ? FILE_APPEND | LOCK_EX : LOCK_EX
        );
    }


    /**
     * Converts a measure of memory bytes into the most logical units (eg kb, mb, etc)
     *
     * @param int $size
     * @return string
     */
    public static function convert($size)
    {
        $unit = array('b', 'kb', 'mb', 'gb', 'tb', 'pb');
        return round(
            $size / pow(1024, $i = floor(log($size, 1024))),
            2
        ) . ' ' . $unit[ absint($i) ];
    }


    /**
     * @param string $timer_name
     * @param float  $total_time
     * @param bool   $formatted
     * @return string
     */
    public static function formatTime($timer_name, $total_time, $formatted = true)
    {
        $total_time *= 1000;
        switch ($total_time) {
            case $total_time > 12500:
                $color = 'red';
                $bold = 'bold';
                break;
            case $total_time > 2500:
                $color = 'darkorange';
                $bold = 'bold';
                break;
            case $total_time > 500:
                $color = 'gold';
                $bold = 'bold';
                break;
            case $total_time > 100:
                $color = 'limegreen';
                $bold = 'normal';
                break;
            case $total_time > 20:
                $color = 'deepskyblue';
                $bold = 'normal';
                break;
            default:
                $color = 'mediumpurple';
                $bold = 'normal';
                break;
        }
        return $formatted
            ? '<span style="min-width: 10px; margin:0 1em; color:'
              . $color
              . '; font-weight:'
              . $bold
              . '; font-size:1.2em;">'
              . str_pad(number_format($total_time, 3), 9, '0', STR_PAD_LEFT)
              . '</span> '
              . $timer_name
            : str_pad(number_format($total_time, 3), 9, '0', STR_PAD_LEFT);
    }
}
