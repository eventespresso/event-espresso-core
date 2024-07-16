<?php

/**
 * Stores any EE Environment values that are referenced through the code.
 *
 * @since       4.4.0
 * @package     Event Espresso
 * @subpackage  config
 */
class EE_Environment_Config extends EE_Config_Base
{
    /**
     * Hold any php environment variables that we want to track.
     *
     * @var stdClass;
     */
    public stdClass $php;


    public function __construct()
    {
        $this->php = new stdClass();
        $this->_set_php_values();
    }


    /**
     * This sets the php environment variables.
     *
     * @since 4.4.0
     * @return void
     */
    protected function _set_php_values()
    {
        $this->php->max_input_vars = ini_get('max_input_vars');
        $this->php->version = phpversion();
    }


    /**
     * helper method for determining whether input_count is
     * reaching the potential maximum the server can handle
     * according to max_input_vars
     *
     * @param int   $input_count the count of input vars.
     * @return string error message
     */
    public function max_input_vars_limit_check(int $input_count = 0): string
    {
        if (
            ! empty($this->php->max_input_vars)
            && ($input_count >= $this->php->max_input_vars)
        ) {
            // check the server setting because the config value could be stale
            $max_input_vars = ini_get('max_input_vars');
            if ($input_count >= $max_input_vars) {
                return sprintf(
                    esc_html__(
                        'The maximum number of inputs on this page has been exceeded. You cannot make edits to this page because of your server\'s PHP "max_input_vars" setting.%1$sThere are %2$d inputs and the maximum amount currently allowed by your server is %3$d.%1$sPlease contact your web host and ask them to raise the "max_input_vars" limit.',
                        'event_espresso'
                    ),
                    '<br>',
                    $input_count,
                    $max_input_vars
                );
            }
        }
        return '';
    }


    /**
     * The purpose of this method is just to force rechecking php values so if they've changed, they get updated.
     *
     * @since 4.4.1
     * @return void
     */
    public function recheck_values()
    {
        $this->_set_php_values();
    }
}
