<?php

/**
 * Class EEM_Status
 *
 * @package     Event Espresso
 * @subpackage  includes/models/
 * @author      Michael Nelson
 */
class EEM_Status extends EEM_Base
{

    /**
     * @var EEM_Status
     */
    protected static $_instance;


    /**
     * EEM_Status constructor.
     *
     * @param string $timezone
     * @throws EE_Error
     */
    protected function __construct(string $timezone = '')
    {
        $this->singular_item    = esc_html__('Status', 'event_espresso');
        $this->plural_item      = esc_html__('Stati', 'event_espresso');
        $this->_tables          = [
            'StatusTable' => new EE_Primary_Table('esp_status', 'STS_ID'),
        ];
        $this->_fields          = [
            'StatusTable' => [
                'STS_ID'       => new EE_Primary_Key_String_Field(
                    'STS_ID',
                    esc_html__('Status ID', 'event_espresso')
                ),
                'STS_code'     => new EE_Plain_Text_Field(
                    'STS_code',
                    esc_html__('Status Code', 'event_espresso'),
                    false,
                    ''
                ),
                'STS_type'     => new EE_Enum_Text_Field(
                    'STS_type',
                    esc_html__("Type", "event_espresso"),
                    false,
                    'event',
                    [
                        'event'        => esc_html__("Event", "event_espresso"),// deprecated
                        'registration' => esc_html__("Registration", "event_espresso"),
                        'transaction'  => esc_html__("Transaction", "event_espresso"),
                        'payment'      => esc_html__("Payment", "event_espresso"),
                        'email'        => esc_html__("Email", "event_espresso"),
                        'message'      => esc_html__("Message", "event_espresso"),
                    ]
                ),
                'STS_can_edit' => new EE_Boolean_Field(
                    'STS_can_edit',
                    esc_html__('Editable?', 'event_espresso'),
                    false,
                    false
                ),
                'STS_desc'     => new EE_Simple_HTML_Field(
                    'STS_desc',
                    esc_html__("Description", "event_espresso"),
                    false,
                    ''
                ),
                'STS_open'     => new EE_Boolean_Field(
                    'STS_open',
                    esc_html__("Open?", "event_espresso"),
                    false,
                    false
                ),
            ],
        ];
        $this->_model_relations = [
            'Registration' => new EE_Has_Many_Relation(),
            'Transaction'  => new EE_Has_Many_Relation(),
            'Payment'      => new EE_Has_Many_Relation(),
        ];
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();

        parent::__construct($timezone);
    }


    /**
     * This method provides the localized singular or plural string for a given status id
     *
     * @param array   $statuses  This should be an array of statuses in the format array( $status_id, $status_code ).
     *                           That way if there isn't a translation in the index we'll return the default code.
     * @param boolean $plural    Whether to return plural string or not. Note, nearly all of the plural strings are the
     *                           same as the singular (in English), however, this may NOT be the case with other
     *                           languages
     * @param string  $schema    This can be either 'upper', 'lower', or 'sentence'.  Basically indicates how we want
     *                           the status string returned ( UPPER, lower, Sentence)
     * @return array             an array of translated strings for the incoming status id.
     * @throws EE_Error
     */
    public function localized_status(array $statuses, bool $plural = false, string $schema = 'upper'): array
    {
        // note these are all in lower case because ucwords() on upper case will NOT convert.
        $translation_array = [
            EEM_Registration::status_id_pending_payment => [
                esc_html__('pending payment', 'event_espresso'), // singular
                esc_html__('pending payments', 'event_espresso') // plural
            ],
            EEM_Registration::status_id_approved        => [
                esc_html__('approved', 'event_espresso'), // singular
                esc_html__('approved', 'event_espresso') // plural
            ],
            EEM_Registration::status_id_not_approved    => [
                esc_html__('not approved', 'event_espresso'),
                esc_html__('not approved', 'event_espresso'),
            ],
            EEM_Registration::status_id_cancelled       => [
                esc_html__('cancelled', 'event_espresso'),
                esc_html__('cancelled', 'event_espresso'),
            ],
            EEM_Registration::status_id_incomplete      => [
                esc_html__('incomplete', 'event_espresso'),
                esc_html__('incomplete', 'event_espresso'),
            ],
            EEM_Registration::status_id_declined        => [
                esc_html__('declined', 'event_espresso'),
                esc_html__('declined', 'event_espresso'),
            ],
            EEM_Registration::status_id_wait_list       => [
                esc_html__('wait list', 'event_espresso'),
                esc_html__('wait list', 'event_espresso'),
            ],
            EEM_Transaction::overpaid_status_code       => [
                esc_html__('overpaid', 'event_espresso'),
                esc_html__('overpaid', 'event_espresso'),
            ],
            EEM_Transaction::complete_status_code       => [
                esc_html__('complete', 'event_espresso'),
                esc_html__('complete', 'event_espresso'),
            ],
            EEM_Transaction::incomplete_status_code     => [
                esc_html__('incomplete', 'event_espresso'),
                esc_html__('incomplete', 'event_espresso'),
            ],
            EEM_Transaction::failed_status_code         => [
                esc_html__('failed', 'event_espresso'),
                esc_html__('failed', 'event_espresso'),
            ],
            EEM_Transaction::abandoned_status_code      => [
                esc_html__('abandoned', 'event_espresso'),
                esc_html__('abandoned', 'event_espresso'),
            ],
            EEM_Payment::status_id_approved             => [
                esc_html__('accepted', 'event_espresso'),
                esc_html__('accepted', 'event_espresso'),
            ],
            EEM_Payment::status_id_pending              => [
                esc_html__('pending', 'event_espresso'),
                esc_html__('pending', 'event_espresso'),
            ],
            EEM_Payment::status_id_cancelled            => [
                esc_html__('cancelled', 'event_espresso'),
                esc_html__('cancelled', 'event_espresso'),
            ],
            EEM_Payment::status_id_declined             => [
                esc_html__('declined', 'event_espresso'),
                esc_html__('declined', 'event_espresso'),
            ],
            EEM_Payment::status_id_failed               => [
                esc_html__('failed', 'event_espresso'),
                esc_html__('failed', 'event_espresso'),
            ],
            // following statuses are NOT part of the EEM_Status but to keep things centralized we include in here.
            EEM_Event::sold_out                         => [
                esc_html__('sold out', 'event_espresso'),
                esc_html__('sold out', 'event_espresso'),
            ],
            EEM_Event::postponed                        => [
                esc_html__('postponed', 'event_espresso'),
                esc_html__('Postponed', 'event_espresso'),
            ],
            EEM_Event::cancelled                        => [
                esc_html__('cancelled', 'event_espresso'),
                esc_html__('cancelled', 'event_espresso'),
            ],
            EE_Ticket::archived                         => [
                esc_html__('archived', 'event_espresso'),
                esc_html__('archived', 'event_espresso'),
            ],
            EE_Ticket::expired                          => [
                esc_html__('expired', 'event_espresso'),
                esc_html__('expired', 'event_espresso'),
            ],
            EE_Ticket::sold_out                         => [
                esc_html__('sold out', 'event_espresso'),
                esc_html__('sold out', 'event_espresso'),
            ],
            EE_Ticket::pending                          => [
                esc_html__('upcoming', 'event_espresso'),
                esc_html__('upcoming', 'event_espresso'),
            ],
            EE_Ticket::onsale                           => [
                esc_html__('on sale', 'event_espresso'),
                esc_html__('on sale', 'event_espresso'),
            ],
            EE_Datetime::cancelled                      => [
                esc_html__('cancelled', 'event_espresso'),
                esc_html__('cancelled', 'event_espresso'),
            ],
            EE_Datetime::sold_out                       => [
                esc_html__('sold out', 'event_espresso'),
                esc_html__('sold out', 'event_espresso'),
            ],
            EE_Datetime::expired                        => [
                esc_html__('expired', 'event_espresso'),
                esc_html__('expired', 'event_espresso'),
            ],
            EE_Datetime::inactive                       => [
                esc_html__('inactive', 'event_espresso'),
                esc_html__('inactive', 'event_espresso'),
            ],
            EE_Datetime::upcoming                       => [
                esc_html__('upcoming', 'event_espresso'),
                esc_html__('upcoming', 'event_espresso'),
            ],
            EE_Datetime::active                         => [
                esc_html__('active', 'event_espresso'),
                esc_html__('active', 'event_espresso'),
            ],
            EE_Datetime::postponed                      => [
                esc_html__('postponed', 'event_espresso'),
                esc_html__('postponed', 'event_espresso'),
            ],
            // messages related
            EEM_Message::status_sent                    => [
                esc_html__('sent', 'event_espresso'),
                esc_html__('sent', 'event_espresso'),
            ],
            EEM_Message::status_idle                    => [
                esc_html__('queued for sending', 'event_espresso'),
                esc_html__('queued for sending', 'event_espresso'),
            ],
            EEM_Message::status_failed                  => [
                esc_html__('failed', 'event_espresso'),
                esc_html__('failed', 'event_espresso'),
            ],
            EEM_Message::status_debug_only              => [
                esc_html__('debug only', 'event_espresso'),
                esc_html__('debug only', 'event_espresso'),
            ],
            EEM_Message::status_messenger_executing     => [
                esc_html__('messenger is executing', 'event_espresso'),
                esc_html__('messenger is executing', 'event_espresso'),
            ],
            EEM_Message::status_resend                  => [
                esc_html__('queued for resending', 'event_espresso'),
                esc_html__('queued for resending', 'event_espresso'),
            ],
            EEM_Message::status_incomplete              => [
                esc_html__('queued for generating', 'event_espresso'),
                esc_html__('queued for generating', 'event_espresso'),
            ],
            EEM_Message::status_retry                   => [
                esc_html__('failed sending, can be retried', 'event_espresso'),
                esc_html__('failed sending, can be retried', 'event_espresso'),
            ],
            EEM_CPT_Base::post_status_publish           => [
                esc_html__('published', 'event_espresso'),
                esc_html__('published', 'event_espresso'),
            ],
            EEM_CPT_Base::post_status_future            => [
                esc_html__('scheduled', 'event_espresso'),
                esc_html__('scheduled', 'event_espresso'),
            ],
            EEM_CPT_Base::post_status_draft             => [
                esc_html__('draft', 'event_espresso'),
                esc_html__('draft', 'event_espresso'),
            ],
            EEM_CPT_Base::post_status_pending           => [
                esc_html__('pending', 'event_espresso'),
                esc_html__('pending', 'event_espresso'),
            ],
            EEM_CPT_Base::post_status_private           => [
                esc_html__('private', 'event_espresso'),
                esc_html__('private', 'event_espresso'),
            ],
            EEM_CPT_Base::post_status_trashed           => [
                esc_html__('trashed', 'event_espresso'),
                esc_html__('trashed', 'event_espresso'),
            ],
        ];

        $translation_array = apply_filters('FHEE__EEM_Status__localized_status__translation_array', $translation_array);

        if (! is_array($statuses)) {
            throw new EE_Error(
               esc_html__(
                   'The incoming statuses argument must be an array with keys as the $status_id and values as the $status_code',
                   'event_espresso'
               )
            );
        }

        $translation = [];

        foreach ($statuses as $id => $code) {
            if (isset($translation_array[ $id ])) {
                $translation[ $id ] = $plural
                    ? $translation_array[ $id ][1]
                    : $translation_array[ $id ][0];
            } else {
                $translation[ $id ] = $code;
            }

            // schema
            switch ($schema) {
                case 'lower':
                    // even though these start in lower case, this will catch any statuses added via filter.
                    $translation[ $id ] = strtolower($translation[ $id ]);
                    break;
                case 'sentence':
                    $translation[ $id ] = ucwords($translation[ $id ]);
                    break;
                case 'upper':
                    $translation[ $id ] = strtoupper($translation[ $id ]);
                    break;
            }
        }

        return $translation;
    }
}
