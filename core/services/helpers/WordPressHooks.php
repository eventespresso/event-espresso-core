<?php

namespace EventEspresso\core\services\helpers;

class WordPressHooks
{
    /**
     * returns an array of names for all classes that have methods registered as callbacks for the given action or
     * filter hook
     *
     * @param string $hook
     * @return array
     */
    public static function getClassNamesForAllCallbacksOnHook(string $hook): array
    {
        global $wp_filter;
        $class_names = [];
        // are any callbacks registered for this hook ?
        if (isset($wp_filter[ $hook ])) {
            // loop thru all of the callbacks attached to the deprecated hookpoint
            foreach ($wp_filter[ $hook ] as $priority) {
                foreach ($priority as $callback) {
                    // is the callback a non-static class method ?
                    if (isset($callback['function']) && is_array($callback['function'])) {
                        if (isset($callback['function'][0]) && is_object($callback['function'][0])) {
                            $class_names[] = get_class($callback['function'][0]);
                        }
                        // test for static method
                    } elseif (strpos($callback['function'], '::') !== false) {
                        $class         = explode('::', $callback['function']);
                        $class_names[] = $class[0];
                    }
                }
            }
        }
        return $class_names;
    }
}
