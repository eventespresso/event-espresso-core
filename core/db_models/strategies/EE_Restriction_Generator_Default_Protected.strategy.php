<?php

/**
 * EE_Restriction_Generator_Default_Protected
 * For generating capability restrictions for models which have a "default"
 * qualifier, and "others_default" qualifier; and where non-default model
 * objects' access is controlled by access to their related events. The
 * restrictions generated generally only allow access to users with the
 * corresponding capabilities.
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Restriction_Generator_Default_Protected extends EE_Restriction_Generator_Base
{
    /**
     * Name of the field on this model (or a related model, including the model chain to it)
     * that is a boolean indicating whether or not a model object is considered "Default" or not
     *
     * @var string
     */
    protected $_default_field_name;

    /**
     * The model chain to follow to get to the event model, including the event model itself.
     * Eg 'Ticket.Datetime.Event'
     *
     * @var string
     */
    protected $_path_to_event_model;


    /**
     * @param string $default_field_name  the name of the field Name of the field on this model
     *                                    (or a related model, including the model chain to it)
     *                                    that is a boolean indicating whether or not a model object
     *                                    is considered "Default" or not
     * @param string $path_to_event_model The model chain to follow to get to the event model,
     *                                    including the event model itself. Eg 'Ticket.Datetime.Event'
     */
    public function __construct(string $default_field_name, string $path_to_event_model)
    {
        $this->_default_field_name  = $default_field_name;
        $this->_path_to_event_model = rtrim($path_to_event_model, '.') . '.';
    }


    /**
     * @return EE_Default_Where_Conditions[]|EE_Return_None_Where_Conditions[]
     * @throws EE_Error
     */
    protected function _generate_restrictions(): array
    {
        // if there are no standard caps for this model, then for now
        // all we know is if they need the default cap to access this
        if (! $this->model()->cap_slug()) {
            return [
                self::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions(),
            ];
        }

        $action         = $this->action();
        $others         = "{$action}_others";
        $private        = "{$action}_private";
        $default        = "{$action}_default";
        $others_default = "{$action}_others_default";
        $event_model    = EEM_Event::instance();

        $restrictions = [
            // first: access to non-defaults is essentially controlled by which events are accessible
            // if they don't have the basic event cap, they can't access ANY non-default items
            $this->getCapKey($event_model, $action)    => $this->nonDefaultRestrictions(true),
            // if they don't have the others event cap, they can't access others' non-default items
            $this->getCapKey($event_model, $others)    => $this->othersNonDefaultRestrictions($event_model, $others),
            // if they have basic and others, but not private, they can't access others' private non-default items
            $this->getCapKey($event_model, $private)   => $this->privateRestrictions($event_model, $private),
            // second: access to defaults is controlled by the default capabilities
            // if they don't have the default capability, restrict access to only non-default items
            $this->getCapKey($this->model(), $default) => $this->nonDefaultRestrictions(false),
        ];
        // if they don't have the "others" default capability,
        // restrict access to only their default ones, and non-default ones
        if (EE_Restriction_Generator_Base::is_cap($this->model(), $others_default)) {
            $restrictions[ $this->getCapKey($this->model(), $others_default) ] = $this->othersDefaultRestrictions(
                $others_default
            );
        }
        return $restrictions;
    }


    /**
     * @param EEM_Base $model
     * @param string   $action
     * @return string
     * @since   $VID:$
     */
    private function getCapKey(EEM_Base $model, string $action): string
    {
        return EE_Restriction_Generator_Base::get_cap_name($model, $action);
    }


    /**
     * @param bool $use_default_field_name
     * @return EE_Default_Where_Conditions
     * @since   $VID:$
     */
    private function nonDefaultRestrictions(bool $use_default_field_name): EE_Default_Where_Conditions
    {
        return new EE_Default_Where_Conditions([$this->_default_field_name => $use_default_field_name]);
    }


    /**
     * @param string $action
     * @return EE_Default_Where_Conditions
     * @throws EE_Error
     * @since   $VID:$
     */
    private function othersDefaultRestrictions(string $action): EE_Default_Where_Conditions
    {
        return new EE_Default_Where_Conditions(
            [
                // if they don't have the others default cap, they can't access others default items
                // (but they can access their own default items, and non-default items)
                'OR*no_' . $this->getCapKey($this->model(), $action) => [
                    'AND'                      => [
                        $this->_path_to_event_model . 'EVT_wp_user' => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                        $this->_default_field_name                  => true,
                    ],
                    $this->_default_field_name => false,
                ],
            ]
        );
    }


    /**
     * @param EEM_Event $event_model
     * @param string    $action
     * @return EE_Default_Where_Conditions
     * @since   $VID:$
     */
    private function othersNonDefaultRestrictions(EEM_Event $event_model, string $action): EE_Default_Where_Conditions
    {
        return new EE_Default_Where_Conditions(
            [
                'OR*no_' . $this->getCapKey($event_model, $action) => [
                    $this->_path_to_event_model . 'EVT_wp_user' => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                ],
                $this->_default_field_name                         => true,
            ]
        );
    }


    /**
     * @param EEM_Event $event_model
     * @param string    $action
     * @return EE_Default_Where_Conditions
     * @since   $VID:$
     */
    private function privateRestrictions(EEM_Event $event_model, string $action): EE_Default_Where_Conditions
    {
        return new EE_Default_Where_Conditions(
            [
                'OR*no_' . $this->getCapKey($event_model, $action) => [
                    $this->_path_to_event_model . 'EVT_wp_user' => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                    $this->_path_to_event_model . 'status'      => ['!=', 'private'],
                    $this->_default_field_name                  => true,
                ],
            ]
        );
    }
}
