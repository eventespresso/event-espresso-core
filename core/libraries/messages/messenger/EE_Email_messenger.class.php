<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright			(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Messenger class
 *
 * @package			Event Espresso
 * @subpackage		includes/core/messages
 * @author			Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */

/**
 * This sets up the email messenger for the EE_messages (notifications) subsystem in EE.
 */
class EE_Email_messenger extends EE_messenger  {

	/**
	 * The following are the properties that email requires for the message going out.
	 */
	protected $_to;
	protected $_from;
	protected $_subject;
	protected $_content;
	/**
	 * constructor
	 *
	 * @access public
	 * @return void
	 */
	public function __construct() {
		//set name and description properties
		$this->name = 'email';
		$this->description = __('This messenger delivers messages via email using the built-in <code>wp_mail</code> function included with WordPress', 'event_espresso');
		$this->label = array(
			'singular' => __('email', 'event_espresso'),
			'plural' => __('emails', 'event_espresso')
			);

		//we're using defaults so let's call parent constructor that will take care of setting up all the other properties
		parent::__construct();
	}


	/**
	 * see abstract declaration in parent class for details.
	 */
	protected function _set_admin_pages() {
		$this->admin_registered_pages = array(
			'events_edit' => true,
		);
	}


	/**
	 * see abstract declaration in parent class for details
	 */
	protected function _set_valid_shortcodes() {
		//remember by leaving the other fields not set, those fields will inherit the valid shortcodes from the message type.
		$this->_valid_shortcodes = array(
			'to' => array('email','event_author', 'primary_registration_details', 'recipient_details'),
			'from' => array('email', 'event_author', 'primary_registration_details', 'recipient_details')
			);
	}







	/**
	 * see abstract declaration in parent class for details
	 *
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_validator_config() {
		$valid_shortcodes = $this->get_valid_shortcodes();

		$this->_validator_config = array(
			'to' => array(
				'shortcodes' => $valid_shortcodes['to'],
				'type' => 'email'
				),
			'from' => array(
				'shortcodes' => $valid_shortcodes['from'],
				'type' => 'email'
				),
			'subject' => array(
				'shortcodes' => array('organization', 'primary_registration_details', 'event_author', 'primary_registration_details', 'recipient_details')
				),
			'content' => array(
				'shortcodes' => array('event_list','attendee_list', 'ticket_list', 'organization', 'primary_registration_details', 'primary_registration_list', 'event_author', 'recipient_details', 'recipient_list', 'transaction', 'messenger')
				),
			'attendee_list' => array(
				'shortcodes' => array('attendee', 'event_list', 'ticket_list'),
				'required' => array('[ATTENDEE_LIST]')
				),
			'event_list' => array(
				'shortcodes' => array('event', 'attendee_list', 'ticket_list', 'venue', 'datetime_list', 'attendee', 'primary_registration_details', 'primary_registration_list', 'event_author', 'recipient_details', 'recipient_list'),
				'required' => array('[EVENT_LIST]')
				),
			'ticket_list' => array(
				'shortcodes' => array('event_list', 'attendee_list', 'ticket', 'datetime_list','primary_registration_details', 'recipient_details'),
				'required' => array('[TICKET_LIST]')
				),
			'datetime_list' => array(
				'shortcodes' => array('datetime'),
				'required' => array('[DATETIME_LIST]')
				)
			);
	}





	/**
	 * @see parent EE_messenger class for docs
	 *
	 * @since 4.5.0
	 */
	public function do_secondary_messenger_hooks( $sending_messenger_name ) {
		if ( $sending_messenger_name = 'html' ) {
			add_filter( 'FHEE__EE_Messages_Template_Pack__get_variation', array( $this, 'add_email_css' ), 10, 8 );
		}
	}




	public function add_email_css( $variation_path, $messenger, $message_type, $type, $variation, $file_extension, $url, EE_Messages_Template_Pack $template_pack ) {
		//prevent recursion on this callback.
		remove_filter( 'FHEE__EE_Messages_Template_Pack__get_variation', array( $this, 'add_email_css' ), 10 );
		$variation = $this->get_variation( $template_pack, $url, 'main', $variation, FALSE  );
		add_filter( 'FHEE__EE_Messages_Template_Pack__get_variation', array( $this, 'add_email_css' ), 10, 8 );
		return $variation;
	}




	/**
	 * See parent for details
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_test_settings_fields() {
		$this->_test_settings_fields = array(
			'to' => array(
				'input' => 'text',
				'label' => __('To', 'event_espresso'),
				'type' => 'email',
				'required' => TRUE,
				'validation' => TRUE,
				'css_class' => 'large-text',
				'format' => '%s',
				'default' => get_bloginfo('admin_email')
				),
			'from' => array(
				'input' => 'hidden',
				'label' => '',
				'type' => 'string',
				'required' => FALSE,
				'validation' => FALSE,
				'format' => '%s',
				'value' => get_bloginfo('admin_email'),
				'default' => '',
				'css_class' => ''
				),
			'subject' => array(
				'input' => 'hidden',
				'label' => '',
				'type' => 'string',
				'required' => FALSE,
				'validation' => FALSE,
				'format' => '%s',
				'value' => sprintf( __('Test email sent from %s', 'event_espresso'), get_bloginfo('name') ),
				'default'=> '',
				'css_class' => ''
				)
			);
	}





	/**
	 * _set_template_fields
	 * This sets up the fields that a messenger requires for the message to go out.
	 *
	 * @access  protected
	 * @return void
	 */
	protected function _set_template_fields() {
		// any extra template fields that are NOT used by the messenger but will get used by a messenger field for shortcode replacement get added to the 'extra' key in an associated array indexed by the messenger field they relate to.  This is important for the Messages_admin to know what fields to display to the user.  Also, notice that the "values" are equal to the field type that messages admin will use to know what kind of field to display. The values ALSO have one index labeled "shortcode".  the values in that array indicate which ACTUAL SHORTCODE (i.e. [SHORTCODE]) is required in order for this extra field to be displayed.  If the required shortcode isn't part of the shortcodes array then the field is not needed and will not be displayed/parsed.
		$this->_template_fields = array(
			'to' => array(
				'input' => 'text',
				'label' => __('To', 'event_espresso'),
				'type' => 'string',
				'required' => TRUE,
				'validation' => TRUE,
				'css_class' => 'large-text',
				'format' => '%s'
			),
			'from' => array(
				'input' => 'text',
				'label' => __('From', 'event_espresso'),
				'type' => 'string',
				'required' => TRUE,
				'validation' => TRUE,
				'css_class' => 'large-text',
				'format' => '%s'
			),
			'subject' => array(
				'input' => 'text',
				'label' => __('Subject', 'event_espresso'),
				'type' => 'string',
				'required' => TRUE,
				'validation' => TRUE,
				'css_class' => 'large-text',
				'format' => '%s'
			),
			'content' => '', //left empty b/c it is in the "extra array" but messenger still needs needs to know this is a field.
			'extra' => array(
				'content' => array(
					'main' => array(
						'input' => 'wp_editor',
						'label' => __('Main Content', 'event_espresso'),
						'type' => 'string',
						'required' => TRUE,
						'validation' => TRUE,
						'format' => '%s',
						'rows' => '15'
					),
					'event_list' => array(
						'input' => 'wp_editor',
						'label' => '[EVENT_LIST]',
						'type' => 'string',
						'required' => TRUE,
						'validation' => TRUE,
						'format' => '%s',
						'rows' => '15',
						'shortcodes_required' => array('[EVENT_LIST]')
						),
					'attendee_list' => array(
						'input' => 'textarea',
						'label' => '[ATTENDEE_LIST]',
						'type' => 'string',
						'required' => TRUE,
						'validation' => TRUE,
						'format' => '%s',
						'css_class' => 'large-text',
						'rows' => '5',
						'shortcodes_required' => array('[ATTENDEE_LIST]')
					),
					'ticket_list' => array(
						'input' => 'textarea',
						'label' => '[TICKET_LIST]',
						'type' => 'string',
						'required' => TRUE,
						'validation' => TRUE,
						'format' => '%s',
						'css_class' => 'large-text',
						'rows' => '10',
						'shortcodes_required' => array('[TICKET_LIST]')
						),
					'datetime_list' => array(
						'input' => 'textarea',
						'label' => '[DATETIME_LIST]',
						'type' => 'string',
						'required' => TRUE,
						'validation' => TRUE,
						'format' => '%s',
						'css_class' => 'large-text',
						'rows' => '10',
						'shortcodes_required' => array('[DATETIME_LIST]')
						)
				)
			)
		);
	}





	/**
	 * See definition of this class in parent
	 */
	protected function _set_default_message_types() {
		$this->_default_message_types = array(
			'payment',
			'registration',
			'not_approved_registration',
			//'declined_registration',
			//'cancelled_registration',
			'pending_approval',
			'payment_reminder',
			'payment_declined',
			'payment_refund'
			);
	}




	/**
	 * @see definition of this class in parent
	 *
	 * @since 4.5.0
	 *
	 */
	protected function _set_valid_message_types() {
		$this->_valid_message_types = array(
			'payment',
			'registration',
			'not_approved_registration',
			'declined_registration',
			'cancelled_registration',
			'pending_approval',
			'payment_reminder',
			'payment_declined',
			'payment_refund'
			);
	}




	/**
	 * setting up admin_settings_fields for messenger.
	 */
	protected function _set_admin_settings_fields() {}

	/**
	 * We just deliver the messages don't kill us!!
	 * @return void
	 * @return bool|error_object true if message delivered, false if it didn't deliver OR bubble up any error object if present.
	 */
	protected function _send_message() {

		$success = wp_mail(html_entity_decode($this->_to, ENT_QUOTES, "UTF-8"), stripslashes_deep(html_entity_decode($this->_subject, ENT_QUOTES, "UTF-8")), $this->_body(), $this->_headers());

		return $success;

	}




	/**
	 * see parent for definition
	 * @return string html body of the message content and the related css.
	 */
	protected function _preview() {
		return $this->_body( TRUE );
	}





	/**
	 * Setup headers for email
	 *
	 * @access protected
	 * @return string formatted header for email
	 */
	protected function _headers() {
		$headers = array(
			'MIME-Version: 1.0',
			'From:' . $this->_from,
			'Reply-To:' . $this->_from,
			'Content-Type:text/html; charset=utf-8'
			);
		return $headers;
	}

	/**
	 * setup body for email
	 *
	 * @param bool $preview will etermine whether this is preview template or not.
	 * @return string formatted body for email.
	 */
	protected function _body( $preview = FALSE ) {
		//setup template args!
		$this->_template_args = array(
			'subject' => $this->_subject,
			'from' => $this->_from,
			'main_body' => wpautop(stripslashes_deep( html_entity_decode($this->_content,  ENT_QUOTES,"UTF-8" ) ))
			);
		$body =  $this->_get_main_template( $preview );

		//now if this isn't a preview, let's setup the body so it has inline styles
		if ( !$preview ) {
			require_once EE_LIBRARIES . 'messages/messenger/assets/email/CssToInlineStyles.php';
			$CSS = new CssToInlineStyles( $body );
			$CSS->setUseInlineStylesBlock();
			$body = ltrim( $CSS->convert(), ">\n" ); //for some reason the library has a bracket and new line at the beginning.  This takes care of that.
		} else if ( $preview && defined('DOING_AJAX' ) ) {
			require_once EE_LIBRARIES . 'messages/messenger/assets/email/CssToInlineStyles.php';
			$style = file_get_contents( $this->get_variation( $this->_tmp_pack,  $this->_incoming_message_type->name, FALSE, 'main', $this->_variation ) );
			$CSS = new CssToInlineStyles( utf8_decode($body), $style );
			$body = ltrim( $CSS->convert(), ">\n" );

			//let's attempt to fix width's for ajax preview
			/*$i_width = '/width:[ 0-9%]+;|width:[ 0-9px]+;/';
			$s_width = '/width="[ 0-9]+"/';
			$body = preg_replace( $i_width, 'width:100%;', $body );
			$body = preg_replace( $s_width, 'width=100%', $body );/**/
		}
		return $body;
	}


}

// end of file:	includes/core/messages/messengers/EE_Email_messenger.class.php
