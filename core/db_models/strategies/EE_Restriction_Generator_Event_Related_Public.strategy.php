<?php

/**
 * EE_Restriction_Generator_Event_Related_Public
 * For generating capability restrictions for models whose access is actually
 * dictated by the events they are related to.
 * Limited access is given to users with no capabilities, but more access is
 * given to users with more capabilities.
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Restriction_Generator_Event_Related_Public extends EE_Restriction_Generator_Base
{
    /**
     * Path to the event model from the model this restriction generator will
     * be applied to; including the event model itself. Eg
     * "Ticket.Datetime.Event"
     *
     * @var string
     */
    protected $_path_to_event_model;


    /**
     * @param string $path_to_event_model
     */
    public function __construct(string $path_to_event_model)
    {
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
        // if there are no standard caps for this model, then for now
        // all we know if they need the default cap to access this
        if (! $this->model()->cap_slug()) {
            return [
                self::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions(),
            ];
        }

        $event_model = EEM_Event::instance();
        return [
            // first: basically access to non-defaults is essentially
            // controlled by which events are accessible
            // if they don't have the basic event cap,
            // they can only read things for published events
            self::get_cap_name($event_model, $this->action()) => new EE_Default_Where_Conditions(
                $this->addPublishedPostConditions(
                    [],
                    true,
                    $this->_path_to_event_model
                )
            ),
            // if they don't have the others event cap,
            // they can't access others' non-default items
            self::get_cap_name(
                $event_model,
                $this->action() . '_others'
            ) => new EE_Default_Where_Conditions(
                [
                    'OR*' . self::get_cap_name(
                        $event_model,
                        $this->action() . '_others'
                    ) => $this->addPublishedPostConditions(
                        [
                            $this->_path_to_event_model . 'EVT_wp_user' => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                        ],
                        true,
                        $this->_path_to_event_model
                    ),
                ]
            ),
            // if they have basic and others, but not private,
            // they can't access others' private non-default items
            self::get_cap_name($event_model, $this->action() . '_private') => new EE_Default_Where_Conditions(
                [
                    'OR*no_' . self::get_cap_name(
                        $event_model,
                        $this->action() . '_private'
                    ) => $this->addPublishedPostConditions(
                        [
                            $this->_path_to_event_model . 'EVT_wp_user' => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                        ],
                        false,
                        $this->_path_to_event_model
                    ),
                ]
            ),
        ];
    }
}
