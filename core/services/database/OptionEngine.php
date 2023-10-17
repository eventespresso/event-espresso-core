<?php

namespace EventEspresso\core\services\database;

/**
 * Class OptionEngine
 * used internally by WordPressOption to facilitate regular site options and network options
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\database
 * @since   5.0.0.p
 */
class OptionEngine
{
    private bool $is_network_option;

    private int $network_ID;


    /**
     * @param bool $is_network_option
     */
    public function __construct(bool $is_network_option = false)
    {
        $this->is_network_option = $is_network_option;
        $this->network_ID        = get_current_network_id();
    }


    /**
     * @param string $option_name
     * @param mixed  $default_value
     * @return false|mixed|void
     */
    public function getOption(string $option_name, $default_value)
    {
        return $this->is_network_option
            ? get_network_option($this->network_ID, $option_name, $default_value)
            : get_option($option_name, $default_value);
    }


    /**
     * @param string $option_name
     * @param mixed  $value
     * @param string $autoload
     * @return bool
     */
    public function addOption(string $option_name, $value, string $autoload): bool
    {
        return $this->is_network_option
            ? add_network_option($this->network_ID, $option_name, $value)
            : add_option($option_name, $value, '', $autoload);
    }


    /**
     * @param string $option_name
     * @param mixed  $value
     * @return bool
     */
    public function updateOption(string $option_name, $value): bool
    {
        return $this->is_network_option
            ? update_network_option($this->network_ID, $option_name, $value)
            : update_option($option_name, $value);
    }


    /**
     * @param string $option_name
     * @return bool
     */
    public function deleteOption(string $option_name): bool
    {
        return $this->is_network_option
            ? delete_network_option($this->network_ID, $option_name)
            : delete_option($option_name);
    }
}
