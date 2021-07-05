<?php

namespace EndyJasmi;

/**
 * Cuid is a library to create collision resistant ids optimized for horizontal scaling and performance.
 *
 * @package EndyJasmi
 */
class Cuid
{
    /**
     * Base 36 constant
     */
    const BASE36 = 36;

    /**
     * Decimal constant
     */
    const DECIMAL = 10;

    /**
     * Normal block size
     */
    const NORMAL_BLOCK = 4;

    /**
     * Small block size
     */
    const SMALL_BLOCK = 2;


    /**
     * Counter used to prevent same machine collision
     *
     * @param integer $blockSize Block size
     *
     * @return string Return count generated hash
     */
    protected static function count($blockSize = Cuid::NORMAL_BLOCK)
    {
        static $count = 0;

        return Cuid::pad(
            base_convert(
                ++$count,
                Cuid::DECIMAL,
                Cuid::BASE36
            ),
            $blockSize
        );
    }


    /**
     * Fingerprint are used for process identification
     *
     * @param integer $blockSize Block size
     *
     * @return string Return fingerprint generated hash
     */
    protected static function fingerprint($blockSize = Cuid::NORMAL_BLOCK)
    {
        // Generate process id based hash
        $pid = Cuid::pad(
            base_convert(
                getmypid(),
                Cuid::DECIMAL,
                Cuid::BASE36
            ),
            Cuid::NORMAL_BLOCK / 2
        );

        // Generate hostname based hash
        $hostname = Cuid::pad(
            base_convert(
                array_reduce(
                    str_split(gethostname()),
                    function ($carry, $char) {
                        return $carry + ord($char);
                    },
                    strlen(gethostname()) + Cuid::BASE36
                ),
                Cuid::DECIMAL,
                Cuid::BASE36
            ),
            2
        );

        // Return small or normal block of hash
        if ($blockSize == Cuid::SMALL_BLOCK) {
            return substr($pid, 0, 1) . substr($hostname, -1);
        }

        return $pid . $hostname;
    }


    /**
     * Pad the input string into specific size
     *
     * @param string  $input Input string
     * @param integer $size  Input size
     *
     * @return string Return padded string
     */
    protected static function pad($input, $size)
    {
        $input = str_pad(
            $input,
            Cuid::BASE36,
            '0',
            STR_PAD_LEFT
        );

        return substr($input, strlen($input) - $size);
    }


    /**
     * Generate random hash
     *
     * @return string Return random hash string
     */
    protected static function random($blockSize = Cuid::NORMAL_BLOCK)
    {
        // Get random integer
        $modifier = pow(Cuid::BASE36, Cuid::NORMAL_BLOCK);
        $random   = mt_rand() / mt_getrandmax();

        $random = $random * $modifier;

        // Convert integer to hash
        $hash = Cuid::pad(
            base_convert(
                floor($random),
                Cuid::DECIMAL,
                Cuid::BASE36
            ),
            Cuid::NORMAL_BLOCK
        );

        // Limit hash if small block required
        if ($blockSize == Cuid::SMALL_BLOCK) {
            $hash = substr($hash, -2);
        }

        return $hash;
    }


    /**
     * Generate timestamp based hash
     *
     * @return string Return timestamp based hash string
     */
    protected static function timestamp($blockSize = Cuid::NORMAL_BLOCK)
    {
        // Convert current time up to micro second to hash
        $hash = base_convert(
            floor(microtime(true) * 1000),
            Cuid::DECIMAL,
            Cuid::BASE36
        );

        // Limit hash if small block required
        if ($blockSize == Cuid::SMALL_BLOCK) {
            $hash = substr($hash, -2);
        }

        return $hash;
    }


    /**
     * Invoke magic method to allows easy access
     *
     * @return string Return generated cuid string
     */
    public function __invoke()
    {
        return $this->cuid();
    }


    /**
     * Generate full version cuid
     *
     * @return string Return generated cuid string
     */
    public static function cuid()
    {
        $prefix      = 'c';
        $timestamp   = Cuid::timestamp();
        $count       = Cuid::count();
        $fingerprint = Cuid::fingerprint();
        $random      = Cuid::random() . Cuid::random();

        return $prefix .
               $timestamp .
               $count .
               $fingerprint .
               $random;
    }


    /**
     * An alias to cuid method
     *
     * @return string Return generate cuid string
     */
    public static function make()
    {
        return Cuid::cuid();
    }


    /**
     * Generate short version cuid
     *
     * It only have 8 characters and it is a great solution
     * for short urls.
     *
     * Note: Less room for the data also means higher
     * chance of collision
     *
     * @return string Return generated short cuid string
     */
    public static function slug()
    {
        $timestamp   = Cuid::timestamp(Cuid::SMALL_BLOCK);
        $count       = Cuid::count(Cuid::SMALL_BLOCK);
        $fingerprint = Cuid::fingerprint(Cuid::SMALL_BLOCK);
        $random      = Cuid::random(Cuid::SMALL_BLOCK);

        return $timestamp .
               $count .
               $fingerprint .
               $random;
    }


    /**
     * Check if string is a valid 'cuid'.
     *
     * @param cuid: string to check if it is a 'cuid'.
     * @return boolean
     */

    public static function isCuid($cuid)
    {
        if (gettype($cuid) !== 'string') {
            return false;
        }

        return $cuid[0] === 'c';
    }
}
