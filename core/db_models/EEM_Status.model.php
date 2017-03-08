<?php if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author                Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            4.0
 * ------------------------------------------------------------------------
 */
require_once(EE_MODELS . 'EEM_Base.model.php');

/**
 * Class EEM_Status
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson
 * @since                 EE4
 */
class EEM_Status extends EEM_Base
{

    // private instance of the Attendee object
    protected static $_instance = null;


    /**
     * @return EEM_Status
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item    = __('Status', 'event_espresso');
        $this->plural_item      = __('Stati', 'event_espresso');
        $this->_tables          = array(
            'StatusTable' => new EE_Primary_Table('esp_status', 'STS_ID'),
        );
        $this->_fields          = array(
            'StatusTable' => array(
                'STS_ID'       => new EE_Primary_Key_String_Field('STS_ID', __('Status ID', 'event_espresso')),
                'STS_code'     => new EE_Plain_Text_Field('STS_code', __('Status Code', 'event_espresso'), false, ''),
                'STS_type'     => new EE_Enum_Text_Field(
                    'STS_type',
                    __("Type", "event_espresso"),
                    false,
                    'event',
                    array(
                        'event'        => __("Event", "event_espresso"),//deprecated
                        'registration' => __("Registration", "event_espresso"),
                        'transaction'  => __("Transaction", "event_espresso"),
                        'payment'      => __("Payment", "event_espresso"),
                        'email'        => __("Email", "event_espresso"),
                        'message'      => __("Message", "event_espresso"),
                    )),
                'STS_can_edit' => new EE_Boolean_Field('STS_can_edit', __('Editable?', 'event_espresso'), false),
                'STS_desc'     => new EE_Simple_HTML_Field('STS_desc', __("Description", "event_espresso"), false, ''),
                'STS_open'     => new EE_Boolean_Field('STS_open', __("Open?", "event_espresso"), false, false),
            ),
        );
        $this->_model_relations = array(
            'Registration' => new EE_Has_Many_Relation(),
            'Transaction'  => new EE_Has_Many_Relation(),
            'Payment'      => new EE_Has_Many_Relation(),
        );
        //this model is generally available for reading
        $this->_cap_restriction_generators[EEM_Base::caps_read] = new EE_Restriction_Generator_Public();

        parent::__construct($timezone);
    }


    /**
     * This method provides the localized singular or plural string for a given status id
     *
     * @param  array   $statuses This should be an array of statuses in the format array( $status_id, $status_code ).
     *                           That way if there isn't a translation in the index we'll return the default code.
     * @param  boolean $plural   Whether to return plural string or not. Note, nearly all of the plural strings are the
     *                           same as the singular (in English), however, this may NOT be the case with other
     *                           languages
     * @param  string  $schema   This can be either 'upper', 'lower', or 'sentence'.  Basically indicates how we want
     *                           the status string returned ( UPPER, lower, Sentence)
     * @throws EE_Error
     * @return array             an array of translated strings for the incoming status id.
     */
    public function localized_status($statuses, $plural = false, $schema = 'upper')
    {
        //note these are all in lower case because ucwords() on upper case will NOT convert.
        $translation_array = array(
            EEM_Registration::status_id_pending_payment => array(
                __('pending payment', 'event_espresso'), //singular
                __('pending payments', 'event_espresso') //plural
            ),
            EEM_Registration::status_id_approved        => array(
                __('approved', 'event_espresso'), //singular
                __('approved', 'event_espresso') //plural
            ),
            EEM_Registration::status_id_not_approved    => array(
                __('not approved', 'event_espresso'),
                __('not approved', 'event_espresso'),
            ),
            EEM_Registration::status_id_cancelled       => array(
                __('cancelled', 'event_espresso'),
                __('cancelled', 'event_espresso'),
            ),
            EEM_Registration::status_id_incomplete      => array(
                __('incomplete', 'event_espresso'),
                __('incomplete', 'event_espresso'),
            ),
            EEM_Registration::status_id_declined        => array(
                __('declined', 'event_espresso'),
                __('declined', 'event_espresso'),
            ),
            EEM_Registration::status_id_wait_list       => array(
                __('wait list', 'event_espresso'),
                __('wait list', 'event_espresso'),
            ),
            EEM_Transaction::overpaid_status_code       => array(
                __('overpaid', 'event_espresso'),
                __('overpaid', 'event_espresso'),
            ),
            EEM_Transaction::complete_status_code       => array(
                __('complete', 'event_espresso'),
                __('complete', 'event_espresso'),
            ),
            EEM_Transaction::incomplete_status_code     => array(
                __('incomplete', 'event_espresso'),
                __('incomplete', 'event_espresso'),
            ),
            EEM_Transaction::failed_status_code         => array(
                __('failed', 'event_espresso'),
                __('failed', 'event_espresso'),
            ),
            EEM_Transaction::abandoned_status_code      => array(
                __('abandoned', 'event_espresso'),
                __('abandoned', 'event_espresso'),
            ),
            EEM_Payment::status_id_approved             => array(
                __('accepted', 'event_espresso'),
                __('accepted', 'event_espresso'),
            ),
            EEM_Payment::status_id_pending              => array(
                __('pending', 'event_espresso'),
                __('pending', 'event_espresso'),
            ),
            EEM_Payment::status_id_cancelled            => array(
                __('cancelled', 'event_espresso'),
                __('cancelled', 'event_espresso'),
            ),
            EEM_Payment::status_id_declined             => array(
                __('declined', 'event_espresso'),
                __('declined', 'event_espresso'),
            ),
            EEM_Payment::status_id_failed               => array(
                __('failed', 'event_espresso'),
                __('failed', 'event_espresso'),
            ),
            //following statuses are NOT part of the EEM_Status but to keep things centralized we include in here.
            EEM_Event::sold_out                         => array(
                __('sold out', 'event_espresso'),
                __('sold out', 'event_espresso'),
            ),
            EEM_Event::postponed                        => array(
                __('postponed', 'event_espresso'),
                __('Postponed', 'event_espresso'),
            ),
            EEM_Event::cancelled                        => array(
                __('cancelled', 'event_espresso'),
                __('cancelled', 'event_espresso'),
            ),
            EE_Ticket::archived                         => array(
                __('archived', 'event_espresso'),
                __('archived', 'event_espresso'),
            ),
            EE_Ticket::expired                          => array(
                __('expired', 'event_espresso'),
                __('expired', 'event_espresso'),
            ),
            EE_Ticket::sold_out                         => array(
                __('sold out', 'event_espresso'),
                __('sold out', 'event_espresso'),
            ),
            EE_Ticket::pending                          => array(
                __('upcoming', 'event_espresso'),
                __('upcoming', 'event_espresso'),
            ),
            EE_Ticket::onsale                           => array(
                __('on sale', 'event_espresso'),
                __('on sale', 'event_espresso'),
            ),
            EE_Datetime::cancelled                      => array(
                __('cancelled', 'event_espresso'),
                __('cancelled', 'event_espresso'),
            ),
            EE_Datetime::sold_out                       => array(
                __('sold out', 'event_espresso'),
                __('sold out', 'event_espresso'),
            ),
            EE_Datetime::expired                        => array(
                __('expired', 'event_espresso'),
                __('expired', 'event_espresso'),
            ),
            EE_Datetime::inactive                       => array(
                __('inactive', 'event_espresso'),
                __('inactive', 'event_espresso'),
            ),
            EE_Datetime::upcoming                       => array(
                __('upcoming', 'event_espresso'),
                __('upcoming', 'event_espresso'),
            ),
            EE_Datetime::active                         => array(
                __('active', 'event_espresso'),
                __('active', 'event_espresso'),
            ),
            EE_Datetime::postponed                      => array(
                __('postponed', 'event_espresso'),
                __('postponed', 'event_espresso'),
            ),
            //messages related
            EEM_Message::status_sent                    => array(
                __('sent', 'event_espresso'),
                __('sent', 'event_espresso'),
            ),
            EEM_Message::status_idle                    => array(
                __('queued for sending', 'event_espresso'),
                __('queued for sending', 'event_espresso'),
            ),
            EEM_Message::status_failed                  => array(
                __('failed', 'event_espresso'),
                __('failed', 'event_espresso'),
            ),
            EEM_Message::status_debug_only              => array(
                __('debug only', 'event_espresso'),
                __('debug only', 'event_espresso'),
            ),
            EEM_Message::status_messenger_executing     => array(
                __('messenger is executing', 'event_espresso'),
                __('messenger is executing', 'event_espresso'),
            ),
            EEM_Message::status_resend                  => array(
                __('queued for resending', 'event_espresso'),
                __('queued for resending', 'event_espresso'),
            ),
            EEM_Message::status_incomplete              => array(
                __('queued for generating', 'event_espresso'),
                __('queued for generating', 'event_espresso'),
            ),
            EEM_Message::status_retry                   => array(
                __('failed sending, can be retried', 'event_espresso'),
                __('failed sending, can be retried', 'event_espresso'),
            ),
            EEM_CPT_Base::post_status_publish           => array(
                __('published', 'event_espresso'),
                __('published', 'event_espresso'),
            ),
            EEM_CPT_Base::post_status_future            => array(
                __('scheduled', 'event_espresso'),
                __('scheduled', 'event_espresso'),
            ),
            EEM_CPT_Base::post_status_draft             => array(
                __('draft', 'event_espresso'),
                __('draft', 'event_espresso'),
            ),
            EEM_CPT_Base::post_status_pending           => array(
                __('pending', 'event_espresso'),
                __('pending', 'event_espresso'),
            ),
            EEM_CPT_Base::post_status_private           => array(
                __('private', 'event_espresso'),
                __('private', 'event_espresso'),
            ),
            EEM_CPT_Base::post_status_trashed           => array(
                __('trashed', 'event_espresso'),
                __('trashed', 'event_espresso'),
            ),
        );

        $translation_array = apply_filters('FHEE__EEM_Status__localized_status__translation_array', $translation_array);

        if ( ! is_array($statuses)) {
            throw new EE_Error(__('The incoming statuses argument must be an array with keys as the $status_id and values as the $status_code',
                'event_espresso'));
        }

        $translation = array();

        foreach ($statuses as $id => $code) {
            if (isset($translation_array[$id])) {
                $translation[$id] = $plural ? $translation_array[$id][1] : $translation_array[$id][0];
            } else {
                $translation[$id] = $code;
            }

            //schema
            switch ($schema) {
                case 'lower' :
                    $translation[$id] = strtolower($translation[$id]); //even though these start in lower case, this will catch any statuses added via filter.
                    break;
                case 'sentence' :
                    $translation[$id] = ucwords($translation[$id]);
                    break;
                case 'upper' :
                    $translation[$id] = strtoupper($translation[$id]);
                    break;
            }
        }

        return $translation;
    }


}
// End of file EEM_Status.model.php
// Location: /includes/models/EEM_Status.model.php
