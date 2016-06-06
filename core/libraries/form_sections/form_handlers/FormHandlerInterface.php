<?php
namespace EventEspresso\core\libraries\form_sections\form_handlers;

use EE_Form_Section_Proper;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface FormInterface
 *
 * The Event Espresso Form Sections library located at "\core\libraries\form_sections\"
 * gives you everything you need to build a form and process it's data upon submission.
 * This interface is for building classes that handle the last mile of boilerplate client code
 * for displaying and processing a typical form, and allow your forms to integrate
 * with other systems that utilize this interface
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.0
 */
interface FormHandlerInterface {

	/**
	 * the absolute top level form section being used on the page
	 *
	 * @return \EE_Form_Section_Proper
	 */
	public function form();



	/**
	 * @param \EE_Form_Section_Proper $form
	 */
	public function setForm( \EE_Form_Section_Proper $form );



	/**
	 * if set to false, then this form has no displayable content,
	 * and will only be used for processing data sent passed via GET or POST
	 *
	 * @return boolean
	 */
	public function displayable();



	/**
	 * @param boolean $displayable
	 */
	public function setDisplayable( $displayable = false );



	/**
	 * a public name for the form that can be displayed on the frontend of a site
	 *
	 * @return string
	 */
	public function formName();



	/**
	 * a public name for the form that can be displayed, but only in the admin
	 *
	 * @return string
	 */
	public function adminName();



	/**
	 * a URL friendly string that can be used for identifying the form
	 *
	 * @return string
	 */
	public function slug();



	/**
	 * @return string
	 */
	public function submitBtnText();



	/**
	 * @param string $submit_btn_text
	 */
	public function setSubmitBtnText( $submit_btn_text );



	/**
	 * @return string
	 */
	public function formAction();



	/**
	 * @param string $form_action
	 */
	public function setFormAction( $form_action );



	/**
	 * @param array $form_args
	 */
	public function addFormActionArgs( $form_args = array() );



	/**
	 * if data regarding the form's state needs to be persisted,
	 * then this method can be used to retrieve that data
	 *
	 * @return string
	 */
	public function formConfig();



	/**
	 * if data regarding the form's state needs to be persisted,
	 * the this method can be used for setting the persisted data locally
	 *
	 * @param string $form_config
	 */
	public function setFormConfig( $form_config );



	/**
	 * called after the form is instantiated
	 * and used for performing any logic that needs to occur early
	 * before any of the other methods are called.
	 * returns true if everything is ok to proceed,
	 * and false if no further form logic should be implemented
	 *
	 * @return boolean
	 */
	public function initialize();



	/**
	 * used for setting up css and js
	 *
	 * @return void
	 */
	public function enqueueStylesAndScripts();



	/**
	 * creates and returns the actual form
	 *
	 * @return EE_Form_Section_Proper
	 */
	public function generate();



	/**
	 * takes the generated form and displays it along with ony other non-form HTML that may be required
	 * returns a string of HTML that can be directly echoed in a template
	 *
	 * @return string
	 */
	public function display();



	/**
	 * handles processing the form submission
	 * returns true or false depending on whether the form was processed successfully or not
	 *
	 * @param array $submitted_form_data
	 * @return bool
	 */
	public function process( $submitted_form_data = array() );



	/**
	 * creates and returns an EE_Submit_Input labeled "Submit"
	 *
	 * @param string $text
	 * @return \EE_Submit_Input
	 */
	public function generateSubmitButton( $text = '' );



	/**
	 * calls generateSubmitButton() and appends it onto the form along with a float clearing div
	 *
	 * @return void
	 */
	public function appendSubmitButton();



	/**
	 * creates and returns an EE_Submit_Input labeled "Cancel"
	 *
	 * @param string $text
	 * @return \EE_Submit_Input
	 */
	public function generateCancelButton( $text = '' );



	/**
	 * appends a float clearing div onto end of form
	 *
	 * @return void
	 */
	public function clearFormButtonFloats();



}
// End of file FormInterface.php
// Location: /FormInterface.php