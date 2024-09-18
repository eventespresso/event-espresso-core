<?php

namespace EventEspresso\core\services\helpers;

trait DebugDisplay
{
    /**
     * used for controlling how much data is displayed when debugging
     * threshold is set to 0 by default, but can be set to 1, 2, 3, or 4
     * where higher numbers display more data
     *
     * @var int
     */
    private int $threshold = 0;

    private array $levels = [
        0 => 'none',
        1 => 'low',
        2 => 'medium',
        3 => 'high',
        4 => 'all'
    ];


    public function initializeDebugDisplay(int $threshold = 0, ?array $levels = null)
    {
        $this->threshold = defined('WP_DEBUG') && WP_DEBUG ? $threshold : 0;
        $this->levels = $levels ?: $this->levels;
    }

    public function debugLog(string $text, int $level = 1)
    {
        if ($this->threshold && $this->threshold >= $level) {
            error_log($text);
        }
    }
}
