<?php

/**
 * This sets up the email messenger for the EE_messages (notifications) subsystem in EE.
 */
class EE_Email_messenger extends EE_messenger
{
    /**
     * To field for email
     * @var string
     */
    protected $_to = '';


    /**
     * CC field for email.
     * @var string
     */
    protected $_cc = '';

    /**
     * From field for email
     * @var string
     */
    protected $_from = '';


    /**
     * Subject field for email
     * @var string
     */
    protected $_subject = '';


    /**
     * Content field for email
     * @var string
     */
    protected $_content = '';


    /**
     * constructor
     *
     * @access public
     */
    public function __construct()
    {
        // set name and description properties
        $this->name                = 'email';
        $this->description         = sprintf(
            esc_html__(
                'This messenger delivers messages via email using the built-in %s function included with WordPress',
                'event_espresso'
            ),
            '<code>wp_mail</code>'
        );
        $this->label               = array(
            'singular' => esc_html__('email', 'event_espresso'),
            'plural'   => esc_html__('emails', 'event_espresso'),
        );
        $this->activate_on_install = true;

        // we're using defaults so let's call parent constructor that will take care of setting up all the other
        // properties
        parent::__construct();
    }


    /**
     * see abstract declaration in parent class for details.
     */
    protected function _set_admin_pages()
    {
        $this->admin_registered_pages = array(
            'events_edit' => true,
        );
    }


    /**
     * see abstract declaration in parent class for details
     */
    protected function _set_valid_shortcodes()
    {
        // remember by leaving the other fields not set, those fields will inherit the valid shortcodes from the
        // message type.
        $this->_valid_shortcodes = array(
            'to'   => array('email', 'event_author', 'primary_registration_details', 'recipient_details'),
            'cc' => array('email', 'event_author', 'primary_registration_details', 'recipient_details'),
            'from' => array('email', 'event_author', 'primary_registration_details', 'recipient_details'),
        );
    }


    /**
     * see abstract declaration in parent class for details
     *
     * @access protected
     * @return void
     */
    protected function _set_validator_config()
    {
        $valid_shortcodes = $this->get_valid_shortcodes();

        $this->_validator_config = array(
            'to'            => array(
                'shortcodes' => $valid_shortcodes['to'],
                'type'       => 'email',
            ),
            'cc' => array(
                'shortcodes' => $valid_shortcodes['to'],
                'type' => 'email',
            ),
            'from'          => array(
                'shortcodes' => $valid_shortcodes['from'],
                'type'       => 'email',
            ),
            'subject'       => array(
                'shortcodes' => array(
                    'organization',
                    'primary_registration_details',
                    'event_author',
                    'primary_registration_details',
                    'recipient_details',
                ),
            ),
            'content'       => array(
                'shortcodes' => array(
                    'event_list',
                    'attendee_list',
                    'ticket_list',
                    'organization',
                    'primary_registration_details',
                    'primary_registration_list',
                    'event_author',
                    'recipient_details',
                    'recipient_list',
                    'transaction',
                    'messenger',
                ),
            ),
            'attendee_list' => array(
                'shortcodes' => array('attendee', 'event_list', 'ticket_list'),
                'required'   => array('[ATTENDEE_LIST]'),
            ),
            'event_list'    => array(
                'shortcodes' => array(
                    'event',
                    'attendee_list',
                    'ticket_list',
                    'venue',
                    'datetime_list',
                    'attendee',
                    'primary_registration_details',
                    'primary_registration_list',
                    'event_author',
                    'recipient_details',
                    'recipient_list',
                ),
                'required'   => array('[EVENT_LIST]'),
            ),
            'ticket_list'   => array(
                'shortcodes' => array(
                    'event_list',
                    'attendee_list',
                    'ticket',
                    'datetime_list',
                    'primary_registration_details',
                    'recipient_details',
                ),
                'required'   => array('[TICKET_LIST]'),
            ),
            'datetime_list' => array(
                'shortcodes' => array('datetime'),
                'required'   => array('[DATETIME_LIST]'),
            ),
        );
    }


    /**
     * @see   parent EE_messenger class for docs
     * @since 4.5.0
     */
    public function do_secondary_messenger_hooks($sending_messenger_name)
    {
        if ($sending_messenger_name === 'html') {
            add_filter('FHEE__EE_Messages_Template_Pack__get_variation', array($this, 'add_email_css'), 10, 8);
        }
    }


    public function add_email_css(
        $variation_path,
        $messenger,
        $message_type,
        $type,
        $variation,
        $file_extension,
        $url,
        EE_Messages_Template_Pack $template_pack
    ) {
        // prevent recursion on this callback.
        remove_filter('FHEE__EE_Messages_Template_Pack__get_variation', array($this, 'add_email_css'), 10);
        $variation = $this->get_variation($template_pack, $message_type, $url, 'main', $variation, false);

        add_filter('FHEE__EE_Messages_Template_Pack__get_variation', array($this, 'add_email_css'), 10, 8);
        return $variation;
    }


    /**
     * See parent for details
     *
     * @access protected
     * @return void
     */
    protected function _set_test_settings_fields()
    {
        $this->_test_settings_fields = array(
            'to'      => array(
                'input'      => 'text',
                'label'      => esc_html__('Send a test email to', 'event_espresso'),
                'type'       => 'email',
                'required'   => false,
                'validation' => true,
                'css_class'  => 'large-text',
                'format'     => '%s',
                'default'    => get_bloginfo('admin_email'),
            ),
            'subject' => array(
                'input'      => 'hidden',
                'label'      => '',
                'type'       => 'string',
                'required'   => false,
                'validation' => false,
                'format'     => '%s',
                'value'      => sprintf(esc_html__('Test email sent from %s', 'event_espresso'), get_bloginfo('name')),
                'default'    => '',
                'css_class'  => '',
            ),
        );
    }


    /**
     * _set_template_fields
     * This sets up the fields that a messenger requires for the message to go out.
     *
     * @access  protected
     * @return void
     */
    protected function _set_template_fields()
    {
        // any extra template fields that are NOT used by the messenger but will get used by a messenger field for
        // shortcode replacement get added to the 'extra' key in an associated array indexed by the messenger field
        // they relate to.  This is important for the Messages_admin to know what fields to display to the user.
        //  Also, notice that the "values" are equal to the field type that messages admin will use to know what
        // kind of field to display. The values ALSO have one index labeled "shortcode".  the values in that array
        // indicate which ACTUAL SHORTCODE (i.e. [SHORTCODE]) is required in order for this extra field to be
        // displayed.  If the required shortcode isn't part of the shortcodes array then the field is not needed and
        // will not be displayed/parsed.
        $this->_template_fields = array(
            'to'      => array(
                'input'      => 'text',
                'label'      => esc_html_x(
                    'To',
                    'Label for the "To" field for email addresses',
                    'event_espresso'
                ),
                'type'       => 'string',
                'required'   => true,
                'validation' => true,
                'css_class'  => 'large-text',
                'format'     => '%s',
            ),
            'cc'      => array(
                'input'      => 'text',
                'label'      => esc_html_x(
                    'CC',
                    'Label for the "Carbon Copy" field used for additional email addresses',
                    'event_espresso'
                ),
                'type'       => 'string',
                'required'   => false,
                'validation' => true,
                'css_class'  => 'large-text',
                'format'     => '%s',
            ),
            'from'    => array(
                'input'      => 'text',
                'label'      => esc_html_x(
                    'From',
                    'Label for the "From" field for email addresses.',
                    'event_espresso'
                ),
                'type'       => 'string',
                'required'   => true,
                'validation' => true,
                'css_class'  => 'large-text',
                'format'     => '%s',
            ),
            'subject' => array(
                'input'      => 'text',
                'label'      => esc_html_x(
                    'Subject',
                    'Label for the "Subject" field (short description of contents) for emails.',
                    'event_espresso'
                ),
                'type'       => 'string',
                'required'   => true,
                'validation' => true,
                'css_class'  => 'large-text',
                'format'     => '%s',
            ),
            'content' => '',
            // left empty b/c it is in the "extra array" but messenger still needs needs to know this is a field.
            'extra'   => array(
                'content' => array(
                    'main'          => array(
                        'input'      => 'wp_editor',
                        'label'      => esc_html__('Main Content', 'event_espresso'),
                        'type'       => 'string',
                        'required'   => true,
                        'validation' => true,
                        'format'     => '%s',
                        'rows'       => '15',
                    ),
                    'event_list'    => array(
                        'input'               => 'wp_editor',
                        'label'               => '[EVENT_LIST]',
                        'type'                => 'string',
                        'required'            => true,
                        'validation'          => true,
                        'format'              => '%s',
                        'rows'                => '15',
                        'shortcodes_required' => array('[EVENT_LIST]'),
                    ),
                    'attendee_list' => array(
                        'input'               => 'textarea',
                        'label'               => '[ATTENDEE_LIST]',
                        'type'                => 'string',
                        'required'            => true,
                        'validation'          => true,
                        'format'              => '%s',
                        'css_class'           => 'large-text',
                        'rows'                => '5',
                        'shortcodes_required' => array('[ATTENDEE_LIST]'),
                    ),
                    'ticket_list'   => array(
                        'input'               => 'textarea',
                        'label'               => '[TICKET_LIST]',
                        'type'                => 'string',
                        'required'            => true,
                        'validation'          => true,
                        'format'              => '%s',
                        'css_class'           => 'large-text',
                        'rows'                => '10',
                        'shortcodes_required' => array('[TICKET_LIST]'),
                    ),
                    'datetime_list' => array(
                        'input'               => 'textarea',
                        'label'               => '[DATETIME_LIST]',
                        'type'                => 'string',
                        'required'            => true,
                        'validation'          => true,
                        'format'              => '%s',
                        'css_class'           => 'large-text',
                        'rows'                => '10',
                        'shortcodes_required' => array('[DATETIME_LIST]'),
                    ),
                ),
            ),
        );
    }


    /**
     * See definition of this class in parent
     */
    protected function _set_default_message_types()
    {
        $this->_default_message_types = array(
            'payment',
            'payment_refund',
            'registration',
            'not_approved_registration',
            'pending_approval',
        );
    }


    /**
     * @see   definition of this class in parent
     * @since 4.5.0
     */
    protected function _set_valid_message_types()
    {
        $this->_valid_message_types = array(
            'payment',
            'registration',
            'not_approved_registration',
            'declined_registration',
            'cancelled_registration',
            'pending_approval',
            'registration_summary',
            'payment_reminder',
            'payment_declined',
            'payment_refund',
        );
    }


    /**
     * setting up admin_settings_fields for messenger.
     */
    protected function _set_admin_settings_fields()
    {
    }

    /**
     * We just deliver the messages don't kill us!!
     *
     * @return bool|WP_Error true if message delivered, false if it didn't deliver OR bubble up any error object if
     *              present.
     * @throws EE_Error
     * @throws \TijsVerkoyen\CssToInlineStyles\Exception
     */
    protected function _send_message()
    {
        $success = wp_mail(
            $this->_to,
            // some old values for subject may be expecting HTML entities to be decoded in the subject
            // and subjects aren't interpreted as HTML, so there should be no HTML in them
            wp_strip_all_tags(wp_specialchars_decode($this->_subject, ENT_QUOTES)),
            $this->_body(),
            $this->_headers()
        );
        if (! $success) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'The email did not send successfully.%3$sThe WordPress wp_mail function is used for sending mails but does not give any useful information when an email fails to send.%3$sIt is possible the "to" address (%1$s) or "from" address (%2$s) is invalid.%3$s',
                        'event_espresso'
                    ),
                    $this->_to,
                    $this->_from,
                    '<br />'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return $success;
    }


    /**
     * see parent for definition
     *
     * @return string html body of the message content and the related css.
     * @throws EE_Error
     * @throws \TijsVerkoyen\CssToInlineStyles\Exception
     */
    protected function _preview()
    {
        return $this->_body(true);
    }


    /**
     * Setup headers for email
     *
     * @access protected
     * @return string formatted header for email
     */
    protected function _headers()
    {
        $this->_ensure_has_from_email_address();
        $from    = $this->_from;
        $headers = array(
            'From:' . $from,
            'Reply-To:' . $from,
            'Content-Type:text/html; charset=utf-8',
        );

        /**
         * Second condition added as a result of https://events.codebasehq.com/projects/event-espresso/tickets/11416 to
         * cover back compat where there may be users who have saved cc values in their db for the newsletter message
         * type which they are no longer able to change.
         */
        if (! empty($this->_cc) && ! $this->_incoming_message_type instanceof EE_Newsletter_message_type) {
            $headers[] = 'cc: ' . $this->_cc;
        }

        // but wait!  Header's for the from is NOT reliable because some plugins don't respect From: as set in the
        // header.
        add_filter('wp_mail_from', array($this, 'set_from_address'), 100);
        add_filter('wp_mail_from_name', array($this, 'set_from_name'), 100);
        return apply_filters('FHEE__EE_Email_messenger___headers', $headers, $this->_incoming_message_type, $this);
    }


    /**
     * This simply ensures that the from address is not empty.  If it is, then we use whatever is set as the site email
     * address for the from address to avoid problems with sending emails.
     */
    protected function _ensure_has_from_email_address()
    {
        if (empty($this->_from)) {
            $this->_from = get_bloginfo('admin_email');
        }
    }


    /**
     * This simply parses whatever is set as the $_from address and determines if it is in the format {name} <{email}>
     * or just {email} and returns an array with the "from_name" and "from_email" as the values. Note from_name *MAY*
     * be empty
     *
     * @since 4.3.1
     * @return array
     */
    private function _parse_from()
    {
        if (strpos($this->_from, '<') !== false) {
            $from_name = substr($this->_from, 0, strpos($this->_from, '<') - 1);
            $from_name = str_replace('"', '', $from_name);
            $from_name = trim($from_name);

            $from_email = substr($this->_from, strpos($this->_from, '<') + 1);
            $from_email = str_replace('>', '', $from_email);
            $from_email = trim($from_email);
        } elseif (trim($this->_from) !== '') {
            $from_name  = '';
            $from_email = trim($this->_from);
        } else {
            $from_name = $from_email = '';
        }
        return array($from_name, $from_email);
    }


    /**
     * Callback for the wp_mail_from filter.
     *
     * @since 4.3.1
     * @param string $from_email What the original from_email is.
     * @return string
     */
    public function set_from_address($from_email)
    {
        $parsed_from = $this->_parse_from();
        // includes fallback if the parsing failed.
        $from_email = is_array($parsed_from) && ! empty($parsed_from[1])
            ? $parsed_from[1]
            : get_bloginfo('admin_email');
        return $from_email;
    }


    /**
     * Callback fro the wp_mail_from_name filter.
     *
     * @since 4.3.1
     * @param string $from_name The original from_name.
     * @return string
     */
    public function set_from_name($from_name)
    {
        $parsed_from = $this->_parse_from();
        if (is_array($parsed_from) && ! empty($parsed_from[0])) {
            $from_name = $parsed_from[0];
        }

        // if from name is "WordPress" let's sub in the site name instead (more friendly!)
        // but realize the default name is HTML entity-encoded
        $from_name = $from_name == 'WordPress' ? wp_specialchars_decode(get_bloginfo(), ENT_QUOTES) : $from_name;

        return $from_name;
    }


    /**
     * setup body for email
     *
     * @param bool $preview will determine whether this is preview template or not.
     * @return string formatted body for email.
     * @throws EE_Error
     * @throws \TijsVerkoyen\CssToInlineStyles\Exception
     */
    protected function _body($preview = false)
    {
        // setup template args!
        $this->_template_args = array(
            'subject'   => $this->_subject,
            'from'      => $this->_from,
            'main_body' => wpautop($this->_content),
        );
        $body                 = $this->_get_main_template($preview);

        /**
         * This filter allows one to bypass the CSSToInlineStyles tool and leave the body untouched.
         *
         * @type    bool $preview Indicates whether a preview is being generated or not.
         * @return  bool    true  indicates to use the inliner, false bypasses it.
         */
        if (apply_filters('FHEE__EE_Email_messenger__apply_CSSInliner ', true, $preview)) {
            // require CssToInlineStyles library and its dependencies via composer autoloader
            require_once EE_VENDOR . 'autoload.php';
            // now if this isn't a preview, let's setup the body so it has inline styles
            if (! $preview || ($preview && defined('DOING_AJAX'))) {
                $style = file_get_contents(
                    $this->get_variation(
                        $this->_tmp_pack,
                        $this->_incoming_message_type->name,
                        false,
                        'main',
                        $this->_variation
                    ),
                    true
                );
                $CSS  = new TijsVerkoyen\CssToInlineStyles\CssToInlineStyles();
                $body = $CSS->convert($body, $style);
            }
        }
        return $body;
    }


    /**
     * This just returns any existing test settings that might be saved in the database
     *
     * @access public
     * @return array
     */
    public function get_existing_test_settings()
    {
        $settings = parent::get_existing_test_settings();
        // override subject if present because we always want it to be fresh.
        if (is_array($settings) && ! empty($settings['subject'])) {
            $settings['subject'] = sprintf(esc_html__('Test email sent from %s', 'event_espresso'), get_bloginfo('name'));
        }
        return $settings;
    }
}
