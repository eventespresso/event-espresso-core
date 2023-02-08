<?php

namespace EventEspresso\core\services\form\meta;

use EventEspresso\core\services\graphql\Utils as GQLUtils;

/**
 * Class FormStatus
 * For managing the status for a form element, ie: active, trashed, etc
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\form\meta
 * @since   $VID:$
 */
class FormStatus
{
    /**
     * indicates that element is not archived or trashed
     */
    const ACTIVE = 'active';

    /**
     * indicates that element is archived and should no longer be displayed on public forms
     * but may still be required due to existing answers when form was completed prior to input being archived
     */
    const ARCHIVED = 'archived';

    /**
     * indicates that element should be automatically added to newly created forms
     */
    const DEFAULT = 'default';

    /**
     * indicates that a copy of the form section will be saved for use in other events but not loaded by default
     */
    const SHARED = 'shared';

    /**
     * indicates that element is no longer needed, has no existing answers, and can be moved to the trash
     */
    const TRASHED = 'trashed';

    /**
     * @var array
     */
    private $valid_status_options;


    public function __construct()
    {
        $this->valid_status_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_FormStatus__valid_status_options',
            [
                FormStatus::ACTIVE   => esc_html__('Active', 'event_espresso'),
                FormStatus::ARCHIVED => esc_html__('Archived', 'event_espresso'),
                FormStatus::DEFAULT  => esc_html__('Default', 'event_espresso'),
                FormStatus::SHARED   => esc_html__('Shared', 'event_espresso'),
                FormStatus::TRASHED  => esc_html__('Trashed', 'event_espresso'),
            ]
        );
    }


    /**
     * @return array
     */
    public function getFormStatusValues()
    {
        $values = [];
        foreach ($this->valid_status_options as $value => $description) {
            $values[ GQLUtils::formatEnumKey($value) ] = compact('value', 'description');
        }
        return $values;
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validStatusOptions($constants_only = false)
    {
        return $constants_only
            ? array_keys($this->valid_status_options)
            : $this->valid_status_options;
    }
}
