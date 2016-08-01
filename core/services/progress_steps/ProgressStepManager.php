<?php
namespace EventEspresso\core\services\progress_steps;

use EE_Request;
use  EventEspresso\core\exceptions\InvalidClassException;
use  EventEspresso\core\exceptions\InvalidDataTypeException;
use  EventEspresso\core\exceptions\InvalidIdentifierException;
use  EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\progress_steps\display_strategies\ProgressStepsDisplayInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ProgressStepManager
 * primarily used in conjunction with \EventEspresso\core\libraries\form_sections\form_handlers\SequentialStepFormManager
 * for displaying a visual guide that details all of the form steps within a sequence,
 * which steps have been completed, and which step is the currently active form
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class ProgressStepManager {

	/**
	 * @var ProgressStepInterface[] $collection
	 */
	private $collection;

	/**
	 * @var string $default_step
	 */
	private $default_step;

	/**
	 * the key used for the URL param that denotes the current form step
	 * defaults to 'ee-form-step'
	 *
	 * @var string $form_step_url_key
	 */
	private $form_step_url_key = '';

	/**
	 * @var ProgressStepsDisplayInterface $display_strategy
	 */
	private $display_strategy;

	/**
	 * @var EE_Request $request
	 */
	private $request;



	/**
	 * ProgressStepManager constructor
	 *
	 * @param string              $display_strategy_name
	 * @param string              $default_step
	 * @param string              $form_step_url_key
	 * @param CollectionInterface $collection
	 * @param \EE_Request         $request
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidInterfaceException
	 */
	public function __construct(
		$display_strategy_name = 'number_bubbles',
		$default_step = '',
		$form_step_url_key = '',
		CollectionInterface $collection = null,
		EE_Request $request = null
	) {
		$this->setDisplayStrategy( $display_strategy_name );
		$this->setDefaultStep( $default_step );
		$this->setFormStepUrlKey( $form_step_url_key );
		if ( ! $collection instanceof CollectionInterface ) {
			$collection = new Collection( '\EventEspresso\core\services\progress_steps\ProgressStepInterface' );
		}
		$this->collection = $collection;
		if ( ! $request instanceof EE_Request ) {
			$request = \EE_Registry::instance()->load_core( 'Request' );
		}
		$this->request = $request;
	}



	/**
	 * @param string $display_strategy_name
	 * @throws InvalidDataTypeException
	 * @throws InvalidClassException
	 */
	protected function setDisplayStrategy( $display_strategy_name = 'number_bubbles' ) {
		if ( ! is_string( $display_strategy_name ) ) {
			throw new InvalidDataTypeException( '$display_strategy_name', $display_strategy_name, 'string' );
		}
		// build up FQCN from incoming display strategy folder name
		$display_strategy_class = 'EventEspresso\core\services\progress_steps\display_strategies\\';
		$display_strategy_class .= $display_strategy_name . '\\';
		$display_strategy_class .= str_replace( ' ', '', ucwords( str_replace( '_', ' ', $display_strategy_name ) ) );
		$display_strategy_class .= 'ProgressStepsDisplay';
		$display_strategy_class = apply_filters(
			'FHEE__ProgressStepManager__setDisplayStrategy__display_strategy_class',
			$display_strategy_class
		);
		if ( ! class_exists( $display_strategy_class ) ) {
			throw new InvalidClassException( $display_strategy_class );
		}
		$display_strategy = new $display_strategy_class();
		if ( ! $display_strategy instanceof ProgressStepsDisplayInterface ) {
			throw new InvalidClassException(
				$display_strategy_class,
				sprintf(
					__( 'The "%1$s" Class needs to be an implementation of the "%1$s" Interface.', 'event_espresso' ),
					$display_strategy_class,
					'\EventEspresso\core\services\progress_steps\display_strategies\ProgressStepsDisplayInterface'
				)
			);
		}
		$this->display_strategy = $display_strategy;
	}



	/**
	 * @param string $default_step
	 * @throws InvalidDataTypeException
	 */
	public function setDefaultStep( $default_step ) {
		if ( ! is_string( $default_step ) ) {
			throw new InvalidDataTypeException( '$default_step', $default_step, 'string' );
		}
		$this->default_step = $default_step;
	}



	/**
	 * @param string $form_step_url_key
	 * @throws InvalidDataTypeException
	 */
	public function setFormStepUrlKey( $form_step_url_key = 'ee-form-step' ) {
		if ( ! is_string( $form_step_url_key ) ) {
			throw new InvalidDataTypeException( '$form_step_key', $form_step_url_key, 'string' );
		}
		$this->form_step_url_key = ! empty( $form_step_url_key ) ? $form_step_url_key : 'ee-form-step';
	}



	/**
	 * @param string $step
	 * @throws InvalidIdentifierException
	 */
	public function setCurrentStep( $step = '' ) {
		// use incoming value if it's set, otherwise use request param if it's set, otherwise use default
		$step = ! empty( $step )
			? $step
			: $this->request->get( $this->form_step_url_key, $this->default_step );
		// grab the step previously known as current, in case we need to revert
		$current_current_step = $this->collection->current();
		// verify that requested step exists
		if ( ! $this->collection->has( $step ) ) {
			throw new InvalidIdentifierException( $step, $this->default_step );
		}
		if ( $this->collection->setCurrent( $step ) ) {
			// if the old boss is the same as the new boss, then nothing changes
			if ( $this->collection->current() !== $current_current_step ) {
				$current_current_step->setIsCurrent( false );
			}
			$this->collection->current()->setIsCurrent();
		} else {
			$this->collection->setCurrent( $current_current_step->id() );
			$current_current_step->setIsCurrent( true );
		}
	}



	/**
	 * setPreviousStepsCompleted
	 */
	public function setPreviousStepsCompleted() {
		$current_current_step = $this->collection->current();
		$this->collection->rewind();
		while ( $this->collection->valid() ) {
			if ( $this->collection->current() === $current_current_step ) {
				break;
			}
			$this->setCurrentStepCompleted();
			$this->collection->next();
		}
		$this->collection->setCurrentUsingObject( $current_current_step );
		return false;
	}



	/**
	 * @return ProgressStepInterface
	 */
	public function currentStep() {
		return $this->collection->current();
	}



	/**
	 * @return ProgressStepInterface
	 */
	public function nextStep() {
		return $this->collection->next();
	}



	/**
	 * @return void
	 */
	public function enqueueStylesAndScripts() {
		$this->display_strategy->enqueueStylesAndScripts();
	}



	/**
	 * echos out HTML
	 *
	 * @return string
	 */
	public function displaySteps() {
		return \EEH_Template::display_template(
			$this->display_strategy->getTemplate(),
			array( 'progress_steps' => $this->collection ),
			true
		);
	}



	/**
	 * @param bool $completed
	 * @return \EventEspresso\core\services\progress_steps\ProgressStepInterface
	 */
	public function setCurrentStepCompleted( $completed = true ) {
		return $this->collection->current()->setIsCompleted( $completed );
	}



}

// End of file ProgressStepManager.php
// Location: core/services/progress_steps/ProgressStepManager.php