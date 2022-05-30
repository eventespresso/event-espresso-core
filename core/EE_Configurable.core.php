<?php

/**
 * EE_Configurable
 *
 * @package       Event Espresso
 * @subpackage    /core/
 * @author        Brent Christensen
 */
abstract class EE_Configurable extends EE_Base
{
    /**
     * @var $_config
     * @type EE_Config_Base
     */
    protected $_config;

    /**
     * @var $_config_section
     * @type string
     */
    protected $_config_section = '';

    /**
     * @var $_config_class
     * @type string
     */
    protected $_config_class = '';

    /**
     * @var $_config_name
     * @type string
     */
    protected $_config_name = '';


    /**
     * @param string $config_section
     */
    public function set_config_section($config_section = '')
    {
        $this->_config_section = ! empty($config_section) ? $config_section : 'modules';
    }


    /**
     * @return mixed
     */
    public function config_section()
    {
        return $this->_config_section;
    }


    /**
     * @param string $config_class
     */
    public function set_config_class($config_class = '')
    {
        $this->_config_class = $config_class;
    }


    /**
     * @return mixed
     */
    public function config_class()
    {
        return $this->_config_class;
    }


    /**
     * @param mixed $config_name
     */
    public function set_config_name($config_name)
    {
        $this->_config_name = ! empty($config_name) ? $config_name : get_called_class();
    }


    /**
     * @return mixed
     */
    public function config_name()
    {
        return $this->_config_name;
    }


    /**
     *    set_config
     *    this method integrates directly with EE_Config to set up the config object for this class
     *
     * @access    protected
     * @param    EE_Config_Base $config_obj
     * @return    mixed    EE_Config_Base | NULL
     */
    protected function _set_config(EE_Config_Base $config_obj = null)
    {
        return EE_Config::instance()->set_config(
            $this->config_section(),
            $this->config_name(),
            $this->config_class(),
            $config_obj
        );
    }


    /**
     *    _update_config
     *    this method integrates directly with EE_Config to update an existing config object for this class
     *
     * @access    protected
     * @param    EE_Config_Base $config_obj
     * @throws \EE_Error
     * @return    mixed    EE_Config_Base | NULL
     */
    public function _update_config(EE_Config_Base $config_obj = null)
    {
        $config_class = $this->config_class();
        if (! $config_obj instanceof $config_class) {
            throw new EE_Error(
                sprintf(
                    esc_html__('The "%1$s" class is not an instance of %2$s.', 'event_espresso'),
                    print_r($config_obj, true),
                    $config_class
                )
            );
        }
        return EE_Config::instance()->update_config($this->config_section(), $this->config_name(), $config_obj);
    }


    /**
     * gets the class's config object
     *
     * @return EE_Config_Base
     */
    public function config()
    {
        if (empty($this->_config)) {
            $this->_config = EE_Config::instance()->get_config(
                $this->config_section(),
                $this->config_name(),
                $this->config_class()
            );
        }
        return $this->_config;
    }
}
