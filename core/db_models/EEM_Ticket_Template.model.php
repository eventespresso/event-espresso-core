<?php
/**
 * Ticket Template Model
 *
 * @package         Event Espresso
 * @subpackage      includes/models/EEM_Ticket_Template.model.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EEM_Ticket_Template extends EEM_Base
{



    // private instance of the EEM_Ticket_Template object
    protected static $_instance = null;

    /**
     *      private constructor to prevent direct creation
     *      @Constructor
     *      @access private
     *      @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
     *      @return void
     */
    protected function __construct($timezone)
    {
        $this->singular_item = __('Ticket Template', 'event_espresso');
        $this->plural_item = __('Ticket Templates', 'event_espresso');

        $this->_tables = array(
            'Ticket_Template'=> new EE_Primary_Table('esp_ticket_template', 'TTM_ID')
        );
        $this->_fields = array(
            'Ticket_Template'=>array(
                'TTM_ID'=>new EE_Primary_Key_Int_Field('TTM_ID', __('Ticket Template ID', 'event_espresso')),
                'TTM_name'=>new EE_Plain_Text_Field('TTM_name', __('The name of the ticket template', 'event_espresso'), false, ''),
                'TTM_description'=>new EE_Plain_Text_Field('TTM_description', __('The description for the ticket template', 'event_espresso'), true, ''),
                'TTM_file'=>new EE_Plain_Text_Field('TTM_file', __('The file name for the actual template file saved on disk', 'event_espresso'), true, ''),
            ));
        $this->_model_relations = array(
            'Ticket'=>new EE_Has_Many_Relation()
        );
        $this->_model_chain_to_wp_user = 'Ticket';
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Default_Public('Ticket.TKT_is_default', 'Ticket.Datetime.Event');
        // account for default tickets in the caps
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Default_Protected('Ticket.TKT_is_default', 'Ticket.Datetime.Event');
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Default_Protected('Ticket.TKT_is_default', 'Ticket.Datetime.Event');
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Default_Protected('Ticket.TKT_is_default', 'Ticket.Datetime.Event');
        parent::__construct($timezone);
    }
}
