<?php

if (! function_exists('mb_strcut')) {
    /**
     * Quickfix to address https://events.codebasehq.com/projects/event-espresso/tickets/11089 ASAP
     * Very simple mimic of mb_substr (which WP ensures exists in wp-includes/compat.php). Still has all the problems of mb_substr
     * (namely, that we might send too many characters to PayPal; however in this case they just issue a warning but nothing breaks)
     *
     * @param $string
     * @param $start
     * @param $length
     * @return string
     */
    function mb_strcut($string, $start, $length = null): string
    {
        return mb_substr($string, $start, $length);
    }
}