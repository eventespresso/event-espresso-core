<?php

namespace EventEspresso\core\services\helpers;

/**
 * Class ColorConverter
 * utility class for converting colors between different formats
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\helpers
 * @author      The Interweb
 * @since       5.0.28.p
 */
class ColorConverter
{
    /**
     * stolen shamelessly from https://stackoverflow.com/a/32977705
     *
     * @param array $RGB
     * @return string
     */
    public static function rgb2Hex(array $RGB): string
    {
        return sprintf("#%02x%02x%02x", $RGB[0], $RGB[1], $RGB[2]);
    }


    /**
     * stolen shamelessly from https://stackoverflow.com/a/72570665
     *
     * @param string $hex
     * @return array
     */
    public static function hex2RGB(string $hex): array
    {
        $hex = ltrim($hex, '#');
        if (strlen($hex) == 3) {
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        }
        $R = hexdec($hex[0] . $hex[1]);
        $G = hexdec($hex[2] . $hex[3]);
        $B = hexdec($hex[4] . $hex[5]);
        return [$R, $G, $B];
    }


    /**
     * stolen shamelessly from https://stackoverflow.com/a/72570665
     *
     * @param array $RGB
     * @param int   $light_adjust
     * @return array
     */
    public static function rgb2Hsl(array $RGB, int $light_adjust = 0): array
    {
        // scale the RGB values to 0 to 1 (percentages)
        $r   = $RGB[0] / 255;
        $g   = $RGB[1] / 255;
        $b   = $RGB[2] / 255;
        $max = max($r, $g, $b);
        $min = min($r, $g, $b);

        $hue = 0;

        // lightness calculation. 0 to 1 value, scale to 0 to 100% at end
        $lightness = ($max + $min) / 2;

        // saturation calculation. Also 0 to 1, scale to percent at end.
        $darkness = $max - $min;

        if ($darkness == 0) {
            // achromatic (grey) so hue and saturation both zero
            $hue = $saturation = 0;
        } else {
            $saturation = $darkness / (1 - abs((2 * $lightness) - 1));
            // hue (if not grey) This is being calculated directly in degrees (0 to 360)
            switch ($max) {
                case $r:
                    $hue = 60 * fmod((($g - $b) / $darkness), 6);
                    if ($b > $g) { //will have given a negative value for $h
                        $hue += 360;
                    }
                    break;
                case $g:
                    $hue = 60 * (($b - $r) / $darkness + 2);
                    break;
                case $b:
                    $hue = 60 * (($r - $g) / $darkness + 4);
                    break;
            }
        }

        // make any lightness adjustment required
        if ($light_adjust > 0) {
            $lightness += (1 - $lightness) * $light_adjust / 100;
        } elseif ($light_adjust < 0) {
            $lightness += $lightness * $light_adjust / 100;
        }

        // put the values in an array and scale the saturation and lightness to be percentages
        return [round($hue), round($saturation * 100), round($lightness * 100)];
    }


    /**
     * @param array $HSL
     * @return string
     */
    public static function hsl2Hex(array $HSL): string
    {
        return self::rgb2Hex(self::hsl2Rgb($HSL));
    }


    /**
     * stolen shamelessly from https://gist.github.com/brandonheyer/5254516
     *
     * @param array $HSL
     * @return array
     */
    public static function hsl2Rgb(array $HSL): array
    {
        $hue = $HSL[0] ?? 0;
        $saturation = ($HSL[1] ?? 100) / 100;
        $lightness = ($HSL[2] ?? 50) / 100;

        $c = (1 - abs(2 * $lightness - 1)) * $saturation;
        $x = $c * (1 - abs(fmod(($hue / 60), 2) - 1));
        $m = $lightness - ($c / 2);

        if ($hue < 60) {
            $r = $c;
            $g = $x;
            $b = 0;
        } elseif ($hue < 120) {
            $r = $x;
            $g = $c;
            $b = 0;
        } elseif ($hue < 180) {
            $r = 0;
            $g = $c;
            $b = $x;
        } elseif ($hue < 240) {
            $r = 0;
            $g = $x;
            $b = $c;
        } elseif ($hue < 300) {
            $r = $x;
            $g = 0;
            $b = $c;
        } else {
            $r = $c;
            $g = 0;
            $b = $x;
        }

        $r = ($r + $m) * 255;
        $g = ($g + $m) * 255;
        $b = ($b + $m) * 255;

        return [floor($r), floor($g), floor($b)];
    }
}
