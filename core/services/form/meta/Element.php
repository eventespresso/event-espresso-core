<?php

namespace EventEspresso\core\services\form\meta;

class Element
{

    /**
     * indicates that element is not archived or trashed
     */
    public const STATUS_ACTIVE = 'active';

    /**
     * indicates that element is archived and should no longer be displayed on public forms
     * but may still be required due to existing answers when form was completed prior to input being archived
     */
    public const STATUS_ARCHIVED = 'archived';

    /**
     * indicates that element should be automatically added to newly created forms
     */
    public const STATUS_DEFAULT = 'default';

    /**
     * indicates that element is no longer needed, has no existing answers, and can be moved to the trash
     */
    public const STATUS_TRASHED = 'trashed';

    /**
     * @var array
     */
    private $valid_status_options;


    protected function __construct()
    {
        $this->valid_status_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_Element__valid_status_options',
            [
                Element::STATUS_ACTIVE   => esc_html__('Active', 'event_espresso'),
                Element::STATUS_ARCHIVED => esc_html__('Archived', 'event_espresso'),
                Element::STATUS_DEFAULT  => esc_html__('Default', 'event_espresso'),
                Element::STATUS_TRASHED  => esc_html__('Trashed', 'event_espresso'),
            ]
        );
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validStatusOptions(bool $constants_only = false): array
    {
        return $constants_only
            ? array_keys($this->valid_status_options)
            : $this->valid_status_options;
    }
}
