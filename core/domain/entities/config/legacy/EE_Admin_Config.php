<?php

use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class for defining what's in the EE_Config relating to admin settings
 */
class EE_Admin_Config extends EE_Config_Base
{
    protected ?bool $useAdvancedEditor = true;

    public $use_remote_logging = false;

    public $show_reg_footer = false;

    protected ?bool $is_caffeinated = false;

    public $use_dashboard_widget = false;

    public $use_personnel_manager = false;

    public $use_event_timezones = false;

    /**
     * adds extra layer of encoding to session data to prevent serialization errors
     * but is incompatible with some server configuration errors
     * if you get "500 internal server errors" during registration, try turning this on
     * if you get PHP fatal errors regarding base 64 methods not defined, then turn this off
     *
     * @var boolean $encode_session_data
     */
    protected bool $encode_session_data = false;

    public ?string $log_file_name = '';

    public ?string $debug_file_name = '';

    public ?string $remote_logging_url = '';

    public ?string $affiliate_id = 'default';

    /**
     * @var int|null $events_in_dashboard
     * @deprecated
     */
    public ?int $events_in_dashboard = 30;


    public function __construct()
    {
        $this->setIsCaffeinated();
        // set default general admin settings
        $this->show_reg_footer = (bool) apply_filters(
            'FHEE__EE_Admin_Config__show_reg_footer__default',
            false
        );
    }


    /**
     * @param bool $reset
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function log_file_name(bool $reset = false): string
    {
        if (empty($this->log_file_name) || $reset) {
            $this->log_file_name = sanitize_key('espresso_log_' . md5(uniqid('', true))) . '.txt';
            EE_Config::instance()->update_espresso_config(false, false);
        }
        return (string) $this->log_file_name;
    }


    /**
     * @param bool $reset
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function debug_file_name(bool $reset = false): string
    {
        if (empty($this->debug_file_name) || $reset) {
            $this->debug_file_name = sanitize_key('espresso_debug_' . md5(uniqid('', true))) . '.txt';
            EE_Config::instance()->update_espresso_config(false, false);
        }
        return (string) $this->debug_file_name;
    }


    /**
     * @return string
     */
    public function affiliate_id(): string
    {
        return ! empty($this->affiliate_id) ? (string) $this->affiliate_id : 'default';
    }


    /**
     * @return boolean
     */
    public function encode_session_data(): bool
    {
        return $this->encode_session_data;
    }


    /**
     * @param bool|int|string $encode_session_data
     */
    public function set_encode_session_data($encode_session_data)
    {
        $this->encode_session_data = (bool) filter_var($encode_session_data, FILTER_VALIDATE_BOOLEAN);
    }

    /**
     * @return boolean
     */
    public function useAdvancedEditor(): bool
    {
        return (bool) $this->useAdvancedEditor;
    }

    /**
     * @param bool|int|string $use_advanced_editor
     */
    public function setUseAdvancedEditor($use_advanced_editor = true)
    {
        $this->useAdvancedEditor = (bool) filter_var(
            apply_filters(
                'FHEE__EE_Admin_Config__setUseAdvancedEditor__use_advanced_editor',
                $use_advanced_editor
            ),
            FILTER_VALIDATE_BOOLEAN
        );
    }


    protected function setIsCaffeinated(): void
    {
        /** @var EventEspresso\core\domain\Domain $domain */
        $domain               = LoaderFactory::getLoader()->getShared('EventEspresso\core\domain\Domain');
        $this->is_caffeinated = (bool) filter_var($domain->isCaffeinated(), FILTER_VALIDATE_BOOLEAN);
    }
}
