<?php

/**
 *
 * EE_Restriction_Generator_Event_Related_Public
 *
 * For generating capability restrictions for models whose access is actually
 * dictated by the events they are related to.
 * Limited access is given to users with no capabilities, but more access is given
 * to users with more capabilities.
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 */
class EE_Restriction_Generator_Event_Related_Public extends EE_Restriction_Generator_Base
{

    /**
     * Path to the event model from the model this restriction generator will be applied to;
     * including the event model itself. Eg "Ticket.Datetime.Event"
     * @var string
     */
    protected $_path_to_event_model;
    /**
     *
     * @param string $path_to_event_model
     */
    public function __construct($path_to_event_model)
    {
        if (substr($path_to_event_model, -1, 1) != '.') {
            $path_to_event_model .= '.';
        }
        $this->_path_to_event_model = $path_to_event_model;
    }
    /**
     *
     * @return \EE_Default_Where_Conditions
     */
    protected function _generate_restrictions()
    {
        // if there are no standard caps for this model, then for now all we know
        // if they need the default cap to access this
        if (! $this->model()->cap_slug()) {
            return array(
                self::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions()
            );
        }

        $event_model = EEM_Event::instance();
        return array(
            // first: basically access to non-defaults is essentially controlled by which events are accessible
            // if they don't have the basic event cap, they can only read things for published events
            EE_Restriction_Generator_Base::get_cap_name($event_model, $this->action()) => new EE_Default_Where_Conditions(
                $this->addPublishedPostConditions(
                    array(),
                    true,
                    $this->_path_to_event_model
                )
            ),
            // if they don't have the others event cap, they can't access others' non-default items
            EE_Restriction_Generator_Base::get_cap_name($event_model, $this->action() . '_others') => new EE_Default_Where_Conditions(
                array(
                    'OR*' . EE_Restriction_Generator_Base::get_cap_name($event_model, $this->action() . '_others') => $this->addPublishedPostConditions(
                        array(
                            $this->_path_to_event_model . 'EVT_wp_user' => EE_Default_Where_Conditions::current_user_placeholder,
                        ),
                        true,
                        $this->_path_to_event_model
                    )
                )
            ),
            // if they have basic and others, but not private, they can't access others' private non-default items
            EE_Restriction_Generator_Base::get_cap_name($event_model, $this->action() . '_private') => new EE_Default_Where_Conditions(
                array(
                    'OR*no_' . EE_Restriction_Generator_Base::get_cap_name($event_model, $this->action() . '_private') => $this->addPublishedPostConditions(
                        array(
                            $this->_path_to_event_model . 'EVT_wp_user' => EE_Default_Where_Conditions::current_user_placeholder,
                        ),
                        false,
                        $this->_path_to_event_model
                    )
                )
            ),
        );
    }
}
