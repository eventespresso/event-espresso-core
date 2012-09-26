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
 * @ version		 	3.2
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

	/** MESSAGE SEND PROPERTIES **/
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
		$this->description = __('Email messenger.  This sends out email via the built-in wp_mail function included with WordPress', 'event_espresso');

		//we're using defaults so let's call parent constructor that will take care of setting up all the other properties
		parent::__construct();

		//email messenger DOES have admin settings so let's check to see if any are set.
		$this->_set_existing_admin_settings();
	}

	/**
	 * _set_template_fields
	 * This sets up the fields that a messenger requires for the message to go out.
	 * 
	 * @access  protected
	 * @return void
	 */
	protected function _set_template_fields() {
		// any extra template fields that are NOT used by the messenger but will get used by a messenger field for shortcode replacement get added to the 'extra' key in an associated array indexed by the messenger field they relate to.  This is important for the Messages_admin to know what fields to display to the user.  Also, notice that the "values" are equal to the field type that messages admin will use to know what kind of field to display. 
		$this->_template_fields = array(
				'to' => 'text',
				'from' => 'text',
				'subject' => 'text',
				'content' => 'textarea',
				'extra' => array(
					'content' => array(
						'main' => 'textarea',
						'attendee_list' => 'textarea')
					)
				);

		$this->_template_fields = apply_filters('filter_hook_espresso_set_template_fields_'.$this->name, $this->_template_fields);
		$this->_template_fields = apply_filters('filter_hook_espresso_set_template_fields_all', $this->_template_fields);	
	}

	/**
	 * _set_default_field_content
	 * set the _default_field_content property (what gets added in the default templates).
	 * 
	 * @access protected
	 * @return void
	 */
	protected function _set_default_field_content() {
		$this->_default_field_content = array(
			'to' => '[ATTENDEE_EMAIL]',
			'from' => $this->_existing_admin_settings['from'],
			'subject' => '',
			'content' => array(
				'main' => 'This contains the main content for the message going out.  It\'s specific to message type so you will want to replace this in the template',
				'attendee_list' => 'This contains the formatting for each attendee in a attendee list'
				)
			);
	}

	/**
	 * setting up admin_settings_fields for messenger.
	 */
	protected function _set_admin_settings_fields() {
		$this->_admin_settings_fields = array(
			'from' => array(
					'field_type' => 'text',
					'label' => __('Default From Address', 'event_espresso'),
					'default' => '[ADMIN_EMAIL]',
					'value_type' => 'string',
					'format' => '%s',
					'validation' => FALSE,
					'required' => TRUE
				),

		);
	}

	/**
	 * We just deliver the messages don't kill us!!  
	 * @return void
	 * @return bool|error_object true if message delivered, false if it didn't deliver OR bubble up any error object if present.
	 */
	protected function _send_message() {
		return wp_mail($this->_to, stripslashes_deep(html_entity_decode($this->_subject, ENT_QUOTES, "UTF-8")), stripslashes_deep(html_entity_decode(wpautop($this->_body()), ENT_QUOTES,"UTF-8")), $this->_headers());
	}

	/**
	 * Setup headers for email
	 * 
	 * @access protected
	 * @return string formatted header for email
	 */
	protected function _headers() {
		$headers = '';
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "From: " . $this->_from;
		$headers .= "Reply-To: " . $this->_from;
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";
		return $headers;
	}

	/**
	 * setup body for email
	 * @return string formatted body for email.
	 */
	protected function _body() {
		return $this->_css_reset();
	}

	/**
	 * returns some code for reset of all email clients css to attempt to keep actual body of email consistent across email clients.
	 * 
	 * @uses portion of Mailchimp Email blueprints (@link https://github.com/mailchimp/Email-Blueprints#readme)
	 * @link https://github.com/mailchimp/Email-Blueprints
	 * @return string formatted html_code for css reset.
	 */
	protected function _css_reset() {
		ob_start();
		?>
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html>
    	<head>
       	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
        <!-- Facebook sharing information tags -->
        <meta property="og:title" content="<?php echo $this->_subject; ?>" />
        
        <title><?php echo $this->_subject; ?></title>
		<style type="text/css">
			/* Client-specific Styles */
			#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */
			body{width:100% !important;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
			body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text sizes. */

			/* Reset Styles */
			body{margin:0; padding:0;}
			img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
			table td{border-collapse:collapse;}
			#backgroundTable{height:100% !important; margin:0; padding:0; width:100% !important;}

			/* Template Styles */

			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: COMMON PAGE ELEMENTS /\/\/\/\/\/\/\/\/\/\ */

			/**
			* @tab Page
			* @section background color
			* @tip Set the background color for your email. You may want to choose one that matches your company's branding.
			* @theme page
			*/
			body, #backgroundTable{
				/*@editable*/ background-color:#FAFAFA;
			}

			/**
			* @tab Page
			* @section email border
			* @tip Set the border for your email.
			*/
			#templateContainer{
				/*@editable*/ border: 1px solid #DDDDDD;
			}

			/**
			* @tab Page
			* @section heading 1
			* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
			* @style heading 1
			*/
			h1, .h1{
				/*@editable*/ color:#202020;
				display:block;
				/*@editable*/ font-family:Arial;
				/*@editable*/ font-size:34px;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}

			/**
			* @tab Page
			* @section heading 2
			* @tip Set the styling for all second-level headings in your emails.
			* @style heading 2
			*/
			h2, .h2{
				/*@editable*/ color:#202020;
				display:block;
				/*@editable*/ font-family:Arial;
				/*@editable*/ font-size:30px;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}

			/**
			* @tab Page
			* @section heading 3
			* @tip Set the styling for all third-level headings in your emails.
			* @style heading 3
			*/
			h3, .h3{
				/*@editable*/ color:#202020;
				display:block;
				/*@editable*/ font-family:Arial;
				/*@editable*/ font-size:26px;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}

			/**
			* @tab Page
			* @section heading 4
			* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
			* @style heading 4
			*/
			h4, .h4{
				/*@editable*/ color:#202020;
				display:block;
				/*@editable*/ font-family:Arial;
				/*@editable*/ font-size:22px;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}

			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: PREHEADER /\/\/\/\/\/\/\/\/\/\ */

			/**
			* @tab Header
			* @section preheader style
			* @tip Set the background color for your email's preheader area.
			* @theme page
			*/
			#templatePreheader{
				/*@editable*/ background-color:#FAFAFA;
			}

			/**
			* @tab Header
			* @section preheader text
			* @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
			*/
			.preheaderContent div{
				/*@editable*/ color:#505050;
				/*@editable*/ font-family:Arial;
				/*@editable*/ font-size:10px;
				/*@editable*/ line-height:100%;
				/*@editable*/ text-align:left;
			}

			/**
			* @tab Header
			* @section preheader link
			* @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
			*/
			.preheaderContent div a:link, .preheaderContent div a:visited, /* Yahoo! Mail Override */ .preheaderContent div a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:#336699;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}

			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: HEADER /\/\/\/\/\/\/\/\/\/\ */

			/**
			* @tab Header
			* @section header style
			* @tip Set the background color and border for your email's header area.
			* @theme header
			*/
			#templateHeader{
				/*@editable*/ background-color:#FFFFFF;
				/*@editable*/ border-bottom:0;
			}

			/**
			* @tab Header
			* @section header text
			* @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
			*/
			.headerContent{
				/*@editable*/ color:#202020;
				/*@editable*/ font-family:Arial;
				/*@editable*/ font-size:34px;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				/*@editable*/ padding:0;
				/*@editable*/ text-align:center;
				/*@editable*/ vertical-align:middle;
			}

			/**
			* @tab Header
			* @section header link
			* @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
			*/
			.headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:#336699;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}

			#headerImage{
				height:auto;
				max-width:600px !important;
			}

			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: MAIN BODY /\/\/\/\/\/\/\/\/\/\ */

			/**
			* @tab Body
			* @section body style
			* @tip Set the background color for your email's body area.
			*/
			#templateContainer, .bodyContent{
				/*@editable*/ background-color:#FFFFFF;
			}

			/**
			* @tab Body
			* @section body text
			* @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
			* @theme main
			*/
			.bodyContent div{
				/*@editable*/ color:#505050;
				/*@editable*/ font-family:Arial;
				/*@editable*/ font-size:14px;
				/*@editable*/ line-height:150%;
				/*@editable*/ text-align:left;
			}

			/**
			* @tab Body
			* @section body link
			* @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
			*/
			.bodyContent div a:link, .bodyContent div a:visited, /* Yahoo! Mail Override */ .bodyContent div a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:#336699;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}

			.bodyContent img{
				display:inline;
				height:auto;
			}

			/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: FOOTER /\/\/\/\/\/\/\/\/\/\ */

			/**
			* @tab Footer
			* @section footer style
			* @tip Set the background color and top border for your email's footer area.
			* @theme footer
			*/
			#templateFooter{
				/*@editable*/ background-color:#FFFFFF;
				/*@editable*/ border-top:0;
			}

			/**
			* @tab Footer
			* @section footer text
			* @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
			* @theme footer
			*/
			.footerContent div{
				/*@editable*/ color:#707070;
				/*@editable*/ font-family:Arial;
				/*@editable*/ font-size:12px;
				/*@editable*/ line-height:125%;
				/*@editable*/ text-align:left;
			}

			/**
			* @tab Footer
			* @section footer link
			* @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
			*/
			.footerContent div a:link, .footerContent div a:visited, /* Yahoo! Mail Override */ .footerContent div a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:#336699;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}

			.footerContent img{
				display:inline;
			}

			/**
			* @tab Footer
			* @section social bar style
			* @tip Set the background color and border for your email's footer social bar.
			* @theme footer
			*/
			#social{
				/*@editable*/ background-color:#FAFAFA;
				/*@editable*/ border:0;
			}

			/**
			* @tab Footer
			* @section social bar style
			* @tip Set the background color and border for your email's footer social bar.
			*/
			#social div{
				/*@editable*/ text-align:center;
			}

			/**
			* @tab Footer
			* @section utility bar style
			* @tip Set the background color and border for your email's footer utility bar.
			* @theme footer
			*/
			#utility{
				/*@editable*/ background-color:#FFFFFF;
				/*@editable*/ border:0;
			}

			/**
			* @tab Footer
			* @section utility bar style
			* @tip Set the background color and border for your email's footer utility bar.
			*/
			#utility div{
				/*@editable*/ text-align:center;
			}

		</style>
		</head>
   		<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
	    	<center>
	        	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
	            	<tr>
	                	<td align="center" valign="top">
	                        <!-- // Begin Template Preheader \\ -->
	                        <?php /** TODO: this could be an option in the template?  We could have view in browser links
	                        <table border="0" cellpadding="10" cellspacing="0" width="600" id="templatePreheader">
	                            <tr>
	                                <td valign="top" class="preheaderContent">
	                                
	                                	<!-- // Begin Module: Standard Preheader \ -->
	                                    <table border="0" cellpadding="10" cellspacing="0" width="100%">
	                                    	<tr>
	                                            <!-- *|IFNOT:ARCHIVE_PAGE|* -->
												<td valign="top" width="190">
	                                            	<div class="std_preheader_links">
	                                                	Is this email not displaying correctly?<br /><a href="*|ARCHIVE|*" target="_blank">View it in your browser</a>.
	                                                </div>
	                                            </td>
												<!-- *|END:IF|* -->
	                                        </tr>
	                                    </table>
	                                	<!-- // End Module: Standard Preheader \ -->
	                                
	                                </td>
	                            </tr>
	                        </table>
	                        <!-- // End Template Preheader \\ --> /**/ ?>
	                    	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">
	                        	<tr>
	                            	<td align="center" valign="top">
	                                    <!-- // Begin Template Header \\ -->
	                                    <?php /** TODO:  this is another area that could be made a template field 
	                                	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
	                                        <tr>
	                                            <td class="headerContent">
	                                            
	                                            	<!-- // Begin Module: Standard Header Image \\ -->
	                                            	<img src="http://gallery.mailchimp.com/653153ae841fd11de66ad181a/images/placeholder_600.gif" style="max-width:600px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
	                                            	<!-- // End Module: Standard Header Image \\ -->
	                                            
	                                            </td>
	                                        </tr>
	                                    </table>
	                                    <!-- // End Template Header \\ --> /**/?>
	                                </td>
	                            </tr>
	                        	<tr>
	                            	<td align="center" valign="top">
	                                    <!-- // Begin Template Body \\ -->
	                                	<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
	                                    	<tr>
	                                            <td valign="top" class="bodyContent">
	                                
	                                                <!-- // Begin Module: Standard Content \\ -->
	                                                <table border="0" cellpadding="20" cellspacing="0" width="100%">
	                                                    <tr>
	                                                        <td valign="top">
	                                                            <div>
	                                                                <?php echo $this->_content; ?>
	                                                            </div>
															</td>
	                                                    </tr>
	                                                </table>
	                                                <!-- // End Module: Standard Content \\ -->
	                                                
	                                            </td>
	                                        </tr>
	                                    </table>
	                                    <!-- // End Template Body \\ -->
	                                </td>
	                            </tr>
	                        	<tr>
	                            	<td align="center" valign="top">
	                            		<?php /** TODO: This is another template field that could possible be created?
	                                    <!-- // Begin Template Footer \\ -->
	                                	<table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter">
	                                    	<tr>
	                                        	<td valign="top" class="footerContent">
	                                            
	                                                <!-- // Begin Module: Standard Footer \\ -->
	                                                <table border="0" cellpadding="10" cellspacing="0" width="100%">
	                                                    <tr>
	                                                        <td colspan="2" valign="middle" id="social">
	                                                            <div mc:edit="std_social">
	                                                                &nbsp;<a href="*|TWITTER:PROFILEURL|*">follow on Twitter</a> | <a href="*|FACEBOOK:PROFILEURL|*">friend on Facebook</a> | <a href="*|FORWARD|*">forward to a friend</a>&nbsp;
	                                                            </div>
	                                                        </td>
	                                                    </tr>
	                                                    <tr>
	                                                        <td valign="top" width="350">
	                                                            <div mc:edit="std_footer">
																	<em>Copyright &copy; *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em>
																	<br />
																	*|IFNOT:ARCHIVE_PAGE|* *|LIST:DESCRIPTION|*
																	<br />
																	<strong>Our mailing address is:</strong>
																	<br />
																	*|HTML:LIST_ADDRESS_HTML|**|END:IF|* 
	                                                            </div>
	                                                        </td>
	                                                        <td valign="top" width="190" id="monkeyRewards">
	                                                            <div mc:edit="monkeyrewards">
	                                                                *|IF:REWARDS|* *|HTML:REWARDS|* *|END:IF|*
	                                                            </div>
	                                                        </td>
	                                                    </tr>
	                                                    <tr>
	                                                        <td colspan="2" valign="middle" id="utility">
	                                                            <div mc:edit="std_utility">
	                                                                &nbsp;<a href="*|UNSUB|*">unsubscribe from this list</a> | <a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
	                                                            </div>
	                                                        </td>
	                                                    </tr>
	                                                </table>
	                                                <!-- // End Module: Standard Footer \\ -->
	                                            
	                                            </td>
	                                        </tr>
	                                    </table>
	                                    <!-- // End Template Footer \\ --> /**/ ?>
	                                </td>
	                            </tr>
	                        </table>
	                        <br />
	                    </td>
	                </tr>
	            </table>
	        </center>
    	</body>
		</html>
		<?php
		$output = ob_get_contents();
		ob_end_clean();
		return $output;
	}
}

// end of file:	includes/core/messages/messengers/EE_Email_messenger.class.php