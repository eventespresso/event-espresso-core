<?php

/**
 * EE_Restriction_Generator_Default_Public
 * For generating capability restrictions for models which have a "default"
 * qualifier, and "others_default" qualifier; and where non-default model
 * objects' access is controlled by access to their related events. The
 * restrictions provide limited access to users with no capabilities, and
 * fuller access to users with more capabilities
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Restriction_Generator_Default_Public extends EE_Restriction_Generator_Base
{
    /**
     * Name of the field on this model (or a related model, including the model
     * chain to it) that is a boolean indicating whether or not a model object
     * is considered "Default" or not
     *
     * @var string
     */
    protected $_default_field_name;

    /**
     * The model chain to follow to get to the event model, including the event
     * model itself. Eg 'Ticket.Datetime.Event'
     *
     * @var string
     */
    protected $_path_to_event_model;


    /**
     * @param string $default_field_name  the name of the field Name of the
     *                                    field on this model (or a related
     *                                    model, including the model chain to
     *                                    it) that is a boolean indicating
     *                                    whether or not a model object is
     *                                    considered "Default" or not
     * @param string $path_to_event_model The model chain to follow to get to
     *                                    the event model, including the event
     *                                    model itself. Eg
     *                                    'Ticket.Datetime.Event'
     */
    public function __construct(string $default_field_name, string $path_to_event_model)
    {
        $this->_default_field_name = $default_field_name;
        if (substr($path_to_event_model, -1, 1) != '.') {
            $path_to_event_model .= '.';
        }
        $this->_path_to_event_model = $path_to_event_model;
    }


    /**
     * @return EE_Default_Where_Conditions[]|EE_Return_None_Where_Conditions[]
     * @throws EE_Error
     */
    protected function _generate_restrictions(): array
    {
        // if there are no standard caps for this model, then for now all we know
        // if they need the default cap to access this
        if (! $this->model()->cap_slug()) {
            return [
                self::get_default_restrictions_cap(
                ) => new EE_Return_None_Where_Conditions(),
            ];
        }

        $event_model = EEM_Event::instance();

        $restrictions = [
            // first: basically access to non-defaults is essentially
            // controlled by which events are accessible
            // if they don't have the basic event cap,
            // they can't access ANY non-default items
            EE_Restriction_Generator_Base::get_cap_name(
                $event_model,
                $this->action()
            ) => new EE_Default_Where_Conditions(
                [
                    'OR*no_' .
                    EE_Restriction_Generator_Base::get_cap_name(
                        $event_model,
                        $this->action()
                    ) => $this->addPublishedPostConditions(
                        [
                            $this->_default_field_name => true,
                        ],
                        true,
                        $this->_path_to_event_model
                    ),
                ]
            ),
            // if they don't have the others event cap,
            // they can only access their own,
            // others' that are for published events, or defaults
            EE_Restriction_Generator_Base::get_cap_name(
                $event_model,
                $this->action() . '_others'
            ) => new EE_Default_Where_Conditions(
                [
                    'OR*no_' .
                    EE_Restriction_Generator_Base::get_cap_name(
                        $event_model,
                        $this->action() . '_others'
                    ) => $this->addPublishedPostConditions(
                        [
                            $this->_path_to_event_model . 'EVT_wp_user' => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                            $this->_default_field_name                  => true,
                        ],
                        true,
                        $this->_path_to_event_model
                    ),
                ]
            ),
            // if they have basic and others, but not private,
            // they can access default, their own,
            // and others' that aren't private
            EE_Restriction_Generator_Base::get_cap_name(
                $event_model,
                $this->action() . '_private'
            ) => new EE_Default_Where_Conditions(
                [
                    'OR*no_' .
                    EE_Restriction_Generator_Base::get_cap_name(
                        $event_model,
                        $this->action() . '_private'
                    ) => $this->addPublishedPostConditions(
                        [
                            $this->_path_to_event_model . 'EVT_wp_user' => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                            $this->_default_field_name                  => true,
                        ],
                        false,
                        $this->_path_to_event_model
                    ),
                ]
            ),
            // second: access to defaults is controlled
            // by the default capabilities
            // if they don't have the basic default capability,
            // restrict access to only non-default items
            EE_Restriction_Generator_Base::get_cap_name(
                $this->model(),
                $this->action() . '_default'
            ) => new EE_Default_Where_Conditions(
                [$this->_default_field_name => false]
            ),
        ];
        if (
            EE_Restriction_Generator_Base::is_cap(
                $this->model(),
                $this->action() . '_others_default'
            )
        ) {
            // if they don't have the "others" default capability,
            // restrict access to only their default ones, and non-default ones
            $restrictions[ EE_Restriction_Generator_Base::get_cap_name(
                $this->model(),
                $this->action() . '_others_default'
            ) ] = new EE_Default_Where_Conditions(
                [
                    // if they don't have the others default cap,
                    // they can't access others default items
                    // (but they can access their own default items,
                    // and non-default items)
                    'OR*no_' .
                    EE_Restriction_Generator_Base::get_cap_name(
                        $this->model(),
                        $this->action() . '_others_default'
                    ) => [
                        'AND'                      => [
                            EE_QUERY_PLACEHOLDER_USER_FIELD_NAME => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                            $this->_default_field_name           => true
                        ],
                        $this->_default_field_name => false
                    ]
                ]
            );
        }
        return $restrictions;
    }
}
