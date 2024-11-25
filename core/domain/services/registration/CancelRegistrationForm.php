<?php

namespace EventEspresso\core\domain\services\registration;

use EE_Checkbox_Input;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_No_Layout;
use EE_Registration;
use EE_Table_Layout;
use EE_Table_Row_Layout;
use EE_Text_Area_Input;
use EE_Text_Input;
use EEH_HTML;
use EEM_Registration;
use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\libraries\form_sections\form_handlers\FormHandler;
use ReflectionException;

/**
 * CancelRegistrationForm
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\registration
 * @author      Brent Christensen
 * @since       5.0.30.p
 */
class CancelRegistrationForm extends FormHandler
{
	private EE_Registration $registration;


	public function __construct(EE_Registration $registration)
	{
		$this->registration = $registration;
		parent::__construct(
			esc_html__('Cancel Registration', 'event_espresso'),
			esc_html__('Cancel Registration', 'event_espresso'),
			'registration_cancellations',
			'',
			FormHandler::ADD_FORM_TAGS_ONLY
		);
	}


	/**
	 * creates and returns the actual form
	 *
	 * @return EE_Form_Section_Proper
	 * @throws EE_Error
	 * @throws ReflectionException
	 */
	public function generate()
	{
		return new EE_Form_Section_Proper(
			[
				'name'            => 'registration_cancellations',
				'html_id'         => 'registration-cancellations',
				'layout_strategy' => new EE_No_Layout(['use_break_tags' => false]),
				'subsections'     => [
					'header'                  => new EE_Form_Section_HTML(
						EEH_HTML::h5(__('Please select the registrations to be cancelled', 'event_espresso'))
					),
					'registrations'           => $this->registrationsToCancel(),
					'spacer1'                 => new EE_Form_Section_HTML(EEH_HTML::br()),
					'reason_for_cancellation' => new EE_Text_Area_Input(
						[
							'html_label_text' => esc_html__('Reason for Cancellation', 'event_espresso'),
							'html_name'       => 'reason_for_cancellation',
						]
					),
					'spacer2'                 => new EE_Form_Section_HTML(EEH_HTML::br(2)),
					'confirmation_code'       => new EE_Text_Input(
						[
							'html_label_text' => esc_html__(
								'Please enter the confirmation code that was supplied in the email you received.',
								'event_espresso'
							),
							'html_name'       => 'confirmation_code',
							'html_class'      => 'ee-input-width--small',
							'required'        => true,
						]
					),
					'required_input_notice'   => new EE_Form_Section_HTML(
						EEH_HTML::br(2) .
						EEH_HTML::span(
							esc_html__('* required field', 'event_espresso'),
							'',
							'ee-status-bg--info'
						) .
						EEH_HTML::br(2)
					),
					'cancel_registration'     => $this->generateSubmitButton(
						esc_html__('Cancel Registration(s)', 'event_espresso')
					),
				],
			]
		);
	}


	/**
	 * @return EE_Form_Section_Proper
	 * @throws EE_Error
	 * @throws ReflectionException
	 */
	private function registrationsToCancel(): EE_Form_Section_Proper
	{
		$subsections = [
			$this->cancelRegistrationTableRow($this->registration),
		];

		if ($this->registration->is_primary_registrant()) {
			$other_registrations = $this->registration->get_all_other_registrations_in_group(false);
			if ($other_registrations) {
				foreach ($other_registrations as $registration) {
					if ($registration instanceof EE_Registration) {
						$subsections[] = $this->cancelRegistrationTableRow($registration);
					}
				}
			}
		}
		return new EE_Form_Section_Proper(
			[
				'name'            => 'registrations',
				'html_id'         => 'registrations',
				'layout_strategy' => new EE_Table_Layout(
					[
						[
							'content' => esc_html__('Registrant', 'event_espresso'),
							'id'      => '',
							'class'   => '',
							'style'   => '',
							'other'   => '',
						],
						[
							'content' => esc_html__('Email Address', 'event_espresso'),
							'id'      => '',
							'class'   => '',
							'style'   => '',
							'other'   => '',
						],
						[
							'content' => esc_html__('Reg Code', 'event_espresso'),
							'id'      => '',
							'class'   => '',
							'style'   => '',
							'other'   => '',
						],
					]
				),
				'subsections'     => $subsections,
			]
		);
	}


	/**
	 * @param EE_Registration $registration
	 * @return EE_Form_Section_Proper
	 * @throws EE_Error
	 * @throws ReflectionException
	 */
	private function cancelRegistrationTableRow(EE_Registration $registration): EE_Form_Section_Proper
	{
		return new EE_Form_Section_Proper(
			[
				'name'            => "registration_to_cancel",
				'html_id'         => "registration-to-cancel-{$registration->reg_url_link()}",
				'layout_strategy' => new EE_Table_Row_Layout(false),
				'subsections'     => [
					'reg_url_link'       => new EE_Checkbox_Input(
						[
							'html_name'       => "registrations_to_cancel[{$registration->reg_url_link()}]",
							'html_id'         => "registration-to-cancel",
							'default'         => $registration->reg_url_link(),
							'value'           => $registration->reg_url_link(),
							'html_label_text' => $registration->attendeeName(),
						]
					),
					'attendee_email' => new EE_Form_Section_HTML($registration->attendee()->email()),
					'reg_code'       => new EE_Form_Section_HTML($registration->reg_code()),
				],
			]
		);
	}


	/**
	 * @param array $submitted_form_data
	 * @return string
	 * @throws EE_Error
	 * @throws ReflectionException
	 */
	public function process($submitted_form_data = [])
	{
		$valid_data = parent::process($submitted_form_data);
		/**
		 * example data:
		 * [
		 * 		"registrations" => [
		 * 			["reg_url_link" => "1-e98b4bacfff4599c2c4d626f37283523"],
		 * 			["reg_url_link" => "2-c22776d5e7150c25ab5b92b6f1b6b248"],
		 * 			["reg_url_link" => "3-cd0453e9ab7f36ae5c9bdccd98c72e32"],
		 * 			["reg_url_link" => "4-6739e4827bedc060fe8d34b0afb64779"],
		 * 			["reg_url_link" => "5-74bcf6535dedf7d1fa9b78100a42821b"],
		 * 			["reg_url_link" => "6-c2b3cc96dfc4a6b31b9d9fac489b8fb4"],
		 * 		],
		 * 		"reason_for_cancellation" => "changed mind",
		 *  	"confirmation_code" => "01EF",
		 *  	"ee-form-submit-registration_cancellations" => "Cancel Registration(s)",
		 * ]
 		 */
		$success = true;
		foreach ($valid_data['registrations'] as $registrant) {
			$reg_url_link = $registrant['reg_url_link'];
			$registration = EEM_Registration::instance()->get_registration_for_reg_url_link($reg_url_link);
			if (! $registration instanceof EE_Registration) {
				return sprintf(
					esc_html__(
						'%1$sCould not find registration for the REG URL link: %2$s',
						'event_espresso'
					),
					'<p class="ee-registrations-cancelled-pg ee-attention">',
					$reg_url_link . '</p>'
				);
			}
			if ($registration->status_ID() === RegStatus::CANCELLED) {
				continue;
			}
			$updated = $registration->set_status(
				RegStatus::CANCELLED,
				false,
				new Context(
					'manual_registration_status_change_from_registrant',
					esc_html__('Manually triggered status change from frontend.', 'event_espresso')
				)
			);
			$registration->add_extra_meta(
				EE_Registration::META_KEY_REG_STATUS_CHANGE,
				[
					'date'   => time(),
					'change' => esc_html__('registration cancelled by registrant', 'event_espresso'),
					'reason' => $valid_data['reason_for_cancellation'],
				]
			);
			$success = $updated && $success;
		}
		if (! $success) {
			return sprintf(
				esc_html__(
					'%1$sAn error occurred and the one or more registrations could not be cancelled.%2$s',
					'event_espresso'
				),
				'<p class="ee-registrations-cancelled-pg ee-attention">',
				'</p>'
			);
		}

		return sprintf(
			esc_html__(
				'%1$sAll registrations have been successfully cancelled.%2$s',
				'event_espresso'
			),
			'<p class="ee-registrations-cancelled-pg ee-success">',
			'</p>'
		);
	}
}
