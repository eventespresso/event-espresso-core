<?php

namespace EventEspresso\core\domain\services\cache;

use EE_Admin_Two_Column_Layout;
use EE_Div_Per_Section_Layout;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Switch_Input;
use EE_Template_Config;
use EEH_HTML;
use EventEspresso\core\services\cache\TemplateCache;
use EventEspresso\core\services\request\RequestInterface;

/**
 * TemplateCacheAdmin
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\cache
 * @author      Brent Christensen
 * @since       5.0.21.p
 */
class TemplateCacheAdmin
{
    private EE_Template_Config $template_config;

    private RequestInterface $request;


    public function __construct(EE_Template_Config $template_config, RequestInterface $request)
    {
        $this->template_config = $template_config;
        $this->request         = $request;

        add_action(
            'AHEE__template_settings__template__before_settings_form',
            [$this, 'displayTemplateCacheSettingsForm'],
            99
        );
        add_filter(
            'FHEE__General_Settings_Admin_Page__update_template_settings__data',
            [$this, 'updateTemplateCacheSettingsForm'],
            99
        );
        add_action(
            'AHEE__General_Settings_Admin_Page__update_template_settings__after_update',
            [TemplateCache::class, 'clearCache']
        );
    }


    /**
     * @throws EE_Error
     */
    public function displayTemplateCacheSettingsForm()
    {
        echo EEH_HTML::br(2) . $this->templateCacheSettingsForm()->get_html();
    }


    /**
     * @throws EE_Error
     */
    public function templateCacheSettingsForm(): EE_Form_Section_Proper
    {
        return new EE_Form_Section_Proper(
            [
                'name'            => 'template_cache_settings_form',
                'html_id'         => 'template_cache_settings_form',
                'html_class'      => 'ee-feature-highlight-2024',
                'layout_strategy' => new EE_Div_Per_Section_Layout(),
                'subsections'     => [
                    'template_cache_settings_hdr' => new EE_Form_Section_HTML(
                        EEH_HTML::h2(esc_html__('Template Cache Settings', 'event_espresso'))
                    ),
                    'feature_highlight_notice'    => new EE_Form_Section_HTML(
                        EEH_HTML::span(
                            sprintf(esc_html__('%1$s NEW', 'event_espresso'), '✨'),
                            '',
                            'ee-feature-highlight-2024-notice'
                        )
                    ),
                    'template_cache_settings'     => new EE_Form_Section_Proper(
                        [
                            'name'            => 'template_cache_settings_tbl',
                            'html_id'         => 'template_cache_settings_tbl',
                            'html_class'      => 'form-table',
                            'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                            'subsections'     => [
                                'enable_cache' => new EE_Switch_Input(
                                    [
                                        'html_label_text' => esc_html__('Enable Template Cache.', 'event_espresso'),
                                        'html_help_text'  => esc_html__(
                                            'When template caching is enabled, templates are cached for faster retrieval. This can improve performance, but may cause issues if you need to see changes immediately. To clear the cache at any time, just click the Save button at the top of the page.',
                                            'event_espresso'
                                        ),
                                        'html_name'       => 'enable_template_caching',
                                        'default'         => $this->template_config->templateCachingEnabled()
                                            ? EE_Switch_Input::OPTION_ON
                                            : EE_Switch_Input::OPTION_OFF,
                                    ],
                                    [
                                        EE_Switch_Input::OPTION_OFF => esc_html__(
                                            'template caching is disabled',
                                            'event_espresso'
                                        ),
                                        EE_Switch_Input::OPTION_ON  => esc_html__(
                                            'template caching is enabled',
                                            'event_espresso'
                                        ),
                                    ]
                                ),
                            ],
                        ]
                    ),
                ],
            ]
        );
    }


    /**
     * @param EE_Template_Config $CFG
     * @return EE_Template_Config
     * @throws EE_Error
     */
    public function updateTemplateCacheSettingsForm(EE_Template_Config $CFG): EE_Template_Config
    {
        $action = $this->request->getRequestParam('action');
        if ($action === 'update_template_settings') {
            // capture form data
            $form = $this->templateCacheSettingsForm();
            $form->receive_form_submission();
            // validate form data
            if ($form->is_valid()) {
                // grab validated data from form
                $valid_data              = $form->valid_data();
                $template_cache_settings = $valid_data['template_cache_settings'] ?? [];
                $enable_cache            = $template_cache_settings['enable_cache'] ?? EE_Switch_Input::OPTION_OFF;
                $CFG->setTemplateCachingEnabled($enable_cache === EE_Switch_Input::OPTION_ON);
            } else {
                if ($form->submission_error_message() !== '') {
                    EE_Error::add_error(
                        $form->submission_error_message(),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            }
        }
        return $CFG;
    }
}
