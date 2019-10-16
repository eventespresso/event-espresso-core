<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\domain\services\admin\events\default_settings;

use EE_Admin_Config;
use EE_Config;
use EE_Form_Section_HTML;
use EE_Select_Input;
use EEH_HTML;
use EventEspresso\core\domain\services\assets\EspressoEditorAssetManager;
use WP_Post;

/**
 * Class AdvancedEditorAdminForm
 * adds a subsection to the Events Admin Default Settings tab for controlling the display of the Advanced Editor
 *
 * @package EventEspresso\core\domain\services\admin\events\default_settings
 * @author  Brent Christensen
 * @since   $VID:$
 */
class AdvancedEditorAdminFormSection
{

    /**
     * @var EE_Admin_Config
     */
    protected $admin_config;


    /**
     * AdvancedEditorAdminForm constructor.
     *
     * @param EE_Admin_Config $admin_config
     */
    public function __construct(EE_Admin_Config $admin_config)
    {
        $this->admin_config = $admin_config;
        add_filter(
            'FHEE__Events_Admin_Page___default_event_settings_form__form_subsections',
            [$this, 'mergeFormSubsections']
        );
        add_action(
            'AHEE__Events_Admin_Page___update_default_event_settings',
            [$this, 'updateAdminFormSettings'],
            10,
            2
        );
    }


    /**
     * @param array $default_event_settings_form_subsections
     * @return array
     * @since $VID:$
     */
    public function mergeFormSubsections(array $default_event_settings_form_subsections)
    {
        return [
                   'use_advanced_editor'     => new EE_Select_Input(
                       apply_filters(
                           'FHEE__Events_Admin_Page___default_event_settings_form__advanced_editor_input_answer_options',
                           [
                               esc_html__('Legacy Editor', 'event_espresso'),
                               esc_html__('Advanced Editor', 'event_espresso'),
                           ]
                       ),
                       apply_filters(
                           'FHEE__Events_Admin_Page___default_event_settings_form__advanced_editor_input_settings',
                           [
                               'default'         => $this->admin_config->useAdvancedEditor(),
                               'html_label_text' => esc_html__('Activate Advanced Editor?', 'event_espresso'),
                               'html_help_text'  => sprintf(
                                   esc_html__(
                                       'Controls whether the Event Espresso Event Editor continues to use the existing legacy editor that functions like the typical older WordPress admin you are used to,%1$sor uses the new Advanced Editor with a more powerful and easier to use interface. This may be automatically turned on in order to utilize advanced features from new addons.',
                                       'event_espresso'
                                   ),
                                   '<br />'
                               ),
                           ]
                       )
                   ),
                   'defaults_section_header' => new EE_Form_Section_HTML(
                       EEH_HTML::h2(
                           esc_html__('Default Settings', 'event_espresso'),
                           '',
                           'ee-admin-settings-hdr'
                       )
                   ),
               ] + $default_event_settings_form_subsections;
    }


    /**
     * @param array     $valid_data
     * @param EE_Config $config
     * @since $VID:$
     */
    public function updateAdminFormSettings(array $valid_data, EE_Config $config)
    {
        $config->admin->setUseAdvancedEditor(
            isset($valid_data['use_advanced_editor'])
                ? $valid_data['use_advanced_editor']
                : false
        );
    }
}