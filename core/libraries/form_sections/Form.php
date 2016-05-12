<?php
namespace EventEspresso\core\libraries\form_sections;

use EE_Form_Section_Proper;
use EventEspresso\Core\Exceptions\InvalidDataTypeException;
use EventEspresso\Core\Exceptions\InvalidFormSubmissionException;
use LogicException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Form
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class Form implements FormInterface{

	/**
	 * @var string $form_name
	 */
	private $form_name;

	/**
	 * @var string $admin_name
	 */
	private $admin_name;

	/**
	 * @var string $slug
	 */
	private $slug;

	/**
	 * @var \EE_Form_Section_Proper $form
	 */
	private $form;



	/**
	 * Form constructor.
	 *
	 * @param string $form_name
	 * @param string $admin_name
	 * @param string $slug
	 * @throws InvalidDataTypeException
	 */
	public function __construct( $form_name, $admin_name, $slug ) {
		$this->setFormName( $form_name );
		$this->setAdminName( $admin_name );
		$this->setSlug( $slug );
	}



	/**
	 * @return \EE_Form_Section_Proper
	 * @throws LogicException
	 */
	public function form() {
		if ( ! $this->formIsValid() ) {
			return null;
		}
		return $this->form;
	}



	/**
	 * @return boolean
	 * @throws LogicException
	 */
	public function formIsValid() {
		if ( ! $this->form instanceof \EE_Form_Section_Proper ) {
			static $generated = false;
			if ( ! $generated ) {
				$generated = true;
				$this->generate();
			}
			return $this->verifyForm();
		}
		return true;
	}



	/**
	 * @return boolean
	 * @throws LogicException
	 */
	public function verifyForm() {
		if ( $this->form instanceof \EE_Form_Section_Proper ) {
			return true;
		}
		throw new LogicException(
			sprintf(
				__( 'The "%1$s" form is invalid or missing', 'event_espresso' ),
				$this->form_name
			)
		);
	}



	/**
	 * @param \EE_Form_Section_Proper $form
	 */
	public function setForm( \EE_Form_Section_Proper $form ) {
		$this->form = $form;
	}



	/**
	 * a public name for the form that can be displayed on the frontend of a site
	 *
	 * @return string
	 */
	public function formName() {
		return $this->form_name;
	}



	/**
	 * @param string $form_name
	 * @throws InvalidDataTypeException
	 */
	public function setFormName( $form_name ) {
		if ( ! is_string( $form_name ) ) {
			throw new InvalidDataTypeException( '$form_name', $form_name, 'string' );
		}
		$this->form_name = $form_name;
	}



	/**
	 * a public name for the form that can be displayed, but only in the admin
	 *
	 * @return string
	 */
	public function adminName() {
		return $this->admin_name;
	}



	/**
	 * @param string $admin_name
	 * @throws InvalidDataTypeException
	 */
	public function setAdminName( $admin_name ) {
		if ( ! is_string( $admin_name ) ) {
			throw new InvalidDataTypeException( '$admin_name', $admin_name, 'string' );
		}
		$this->admin_name = $admin_name;
	}



	/**
	 * a URL friendly string that can be used for identifying the form
	 *
	 * @return string
	 */
	public function slug() {
		return $this->slug;
	}



	/**
	 * @param string $slug
	 * @throws InvalidDataTypeException
	 */
	public function setSlug( $slug ) {
		if ( ! is_string( $slug ) ) {
			throw new InvalidDataTypeException( '$slug', $slug, 'string' );
		}
		$this->slug = $slug;
	}



	/**
	 * called after the form is instantiated
	 * and used for performing any logic that needs to occur early
	 * before any of the other methods are called.
	 * returns true if everything is ok to proceed,
	 * and false if no further form logic should be implemented
	 *
	 * @return boolean
	 */
	public function initialize() {
		return true;
	}



	/**
	 * used for localizing any string or variables for use in JS
	 *
	 * @return void
	 */
	public function localizeVariables() {
		\EEH_Debug_Tools::printr( __FUNCTION__, __CLASS__, __FILE__, __LINE__, 2 );
		//form variables are localized when calling EE_Form_Section_Base::enqueue_js, which is done during Form::enqueueStylesAndScripts()
	}



	/**
	 * used for setting up css and js
	 *
	 * @return void
	 * @throws LogicException
	 * @throws \EE_Error
	 */
	public function enqueueStylesAndScripts() {
		\EEH_Debug_Tools::printr( __FUNCTION__, __CLASS__, __FILE__, __LINE__, 2 );
		$this->form()->enqueue_js();

	}



	/**
	 * creates and returns the actual form
	 *
	 * @return EE_Form_Section_Proper
	 */
	abstract public function generate() ;



	/**
	 * takes the generated form and displays it along with ony other non-form HTML that may be required
	 * returns a string of HTML that can be directly echoed in a template
	 *
	 * @return string
	 * @throws LogicException
	 * @throws \EE_Error
	 */
	public function display() {
		\EEH_Debug_Tools::printr( __FUNCTION__, __CLASS__, __FILE__, __LINE__, 2 );
		return $this->form()->get_html();
	}



	/**
	 * handles processing the form submission
	 * returns true or false depending on whether the form was processed successfully or not
	 *
	 * @param array $form_data
	 * @return bool
	 * @throws \EE_Error
	 * @throws \LogicException
	 * @throws InvalidFormSubmissionException
	 */
	public function process( $form_data = array() ) {
		if ( ! $this->form()->was_submitted( $form_data ) ) {
			throw new InvalidFormSubmissionException( $this->form_name );
		}
		$this->form->receive_form_submission( $form_data );
		if ( $this->form->is_valid() ) {
			return $this->form->valid_data();
		}
		return array();
	}



}
// End of file Form.php
// Location: /Form.php