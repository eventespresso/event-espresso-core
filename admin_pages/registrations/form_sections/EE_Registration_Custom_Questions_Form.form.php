<?php

/**
 *
 * Class EE_Registration_Form
 *
 * For generating a basic form based on a registration and its question groups
 * and questions
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @since		 	   4.8.30.rc.009
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

class EE_Registration_Custom_Questions_Form extends EE_Form_Section_Proper{
	/**
	 *
	 * @var EE_Registration
	 */
	protected $_registration = null;

	/**
	 *
	 * @param EE_Registration $reg
	 * @param array $options
	 */
	public function __construct( EE_Registration $reg, $options = array() ) {
		$this->_registration = $reg;
		if( ! isset( $options[ 'layout_strategy' ] ) ) {
			$options[ 'layout_strategy' ] = new EE_Admin_Two_Column_Layout();
		}
		if( ! isset( $options[ 'html_id' ] ) ) {
			$options[ 'html_id' ] = 'reg-admin-attendee-questions-frm';
		}
		$this->build_form_from_registration();
		parent::__construct( $options );
	}


	/**
	 * Gets the registration object this form is about
	 * @return EE_Registration
	 */
	public function get_registration() {
		return $this->_registration;
	}

	public function build_form_from_registration() {
		$reg = $this->get_registration();
		if( ! $reg instanceof EE_Registration ) {
			throw new EE_Error( __( 'We cannot build the registration custom questions form because there is no registration set on it yet', 'event_espresso') );
		}
		//we want to get all their question groups
		$question_groups = EEM_Event::instance()->get_question_groups_for_event( $reg->event_ID(), $reg );
		//get each question groups questions
		foreach( $question_groups as $question_group ) {
			if ( $question_group instanceof EE_Question_Group ) {
				$this->_subsections[ $question_group->ID() ] = $this->build_subform_from_question_group(
					$question_group,
					$reg
				);
			}
		}
	}



	/**
	 *
	 * @param EE_Question_Group $question_group
	 * @param EE_Registration   $registration
	 * @return \EE_Form_Section_Proper
	 * @throws \EE_Error
	 */
	public function build_subform_from_question_group( $question_group, $registration ) {
		if( ! $question_group instanceof EE_Question_Group ||
			! $registration instanceof EE_Registration) {
			throw new EE_Error( __( 'A valid question group and registration must be passed to EE_Registration_Custom_Question_Form', 'event_espresso' ) );
		}
		$parts_of_subsection = array(
			'title' => new EE_Form_Section_HTML(
					EEH_HTML::h5( $question_group->name(),
					$question_group->identifier(),
					'espresso-question-group-title-h5 section-title' )
				)
		);
		foreach( $question_group->questions( array( array( 'QST_system' => '' ))) as $question ) {
			$parts_of_subsection[ $question->ID() ] = $question->generate_form_input( $registration );
		}
		$parts_of_subsection[ 'edit_link' ] = new EE_Form_Section_HTML(
				'<tr><th/><td class="reg-admin-edit-attendee-question-td"><a class="reg-admin-edit-attendee-question-lnk" href="#" title="' . esc_attr__( 'click to edit question', 'event_espresso' ) . '">
					<span class="reg-admin-edit-question-group-spn lt-grey-txt">' . __( 'edit the above question group', 'event_espresso' ) . '</span>
					<div class="dashicons dashicons-edit"></div>
				</a></td></tr>'
			);
		return new EE_Form_Section_Proper(
			array(
				'subsections' => $parts_of_subsection,
				'html_class' => 'question-group-questions',
			));
	}
}
