<?php

/**
 * Class for defining what's in the EE_Config relating to template settings
 */
class EE_Template_Config extends EE_Config_Base
{
    /**
     * @var EE_Ticket_Selector_Config|stdClass|null
     */
    public $EED_Ticket_Selector = null;

    /**
     * @var EE_Event_Single_Config|stdClass|null
     */
    public $EED_Event_Single = null;

    /**
     * @var EE_Events_Archive_Config|stdClass|null
     */
    public $EED_Events_Archive = null;

    /**
     * @var EE_People_Config|stdClass|null
     * @since 5.0.12.p
     */
    public $EED_People_Single = null;

    public string $current_espresso_theme = 'Espresso_Arabica_2014';

    private bool $template_caching_enabled = false;


    public function __construct()
    {
    }


    public function templateCachingEnabled(): bool
    {
        return $this->template_caching_enabled;
    }


    public function setTemplateCachingEnabled(bool $enable_template_caching): void
    {
        $this->template_caching_enabled = $enable_template_caching;
    }
}
