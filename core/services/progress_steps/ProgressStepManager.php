<?php
namespace EventEspresso\core\services\progress_steps;

use EE_Request;
use EventEspresso\Core\Exceptions\InvalidClassException;
use EventEspresso\Core\Exceptions\InvalidDataTypeException;
use EventEspresso\Core\Exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\progress_steps\display_strategies\ProgressStepsDisplayInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ProgressStepManager
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ProgressStepManager {

	/**
	 * @var ProgressStepsDisplayInterface[] $collection
	 */
	protected $collection;

	/**
	 * @var string $default_step
	 */
	protected $default_step;

	/**
	 * @var ProgressStepsDisplayInterface $display_strategy
	 */
	protected $display_strategy;

	/**
	 * @var EE_Request $request
	 */
	protected $request;



	/**
	 * ProgressStepManager constructor
	 *
	 * @param string              $display_strategy_name
	 * @param string              $default_step
	 * @param CollectionInterface $collection
	 * @param \EE_Request         $request
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidInterfaceException
	 */
	public function __construct(
		$display_strategy_name = 'number_bubbles',
		$default_step = '',
		CollectionInterface $collection = null,
		EE_Request $request = null
	) {
		$this->setDisplayStrategy( $display_strategy_name );
		$this->setDefaultStep( $default_step );
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


	public function setStep() {
		$this->collection->current()->setIsCurrent( false );
		$set = $this->collection->setCurrent(
			$this->request->get( 'ee-step', $this->default_step )
		);
		if ( $set ) {
			$this->collection->current()->setIsCurrent();
		}
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
	 * @return void
	 */
	public function displaySteps() {
		echo \EEH_Template::display_template(
			$this->display_strategy->getTemplate(),
			array( 'progress_steps' => $this->collection ),
			true
		);
	}

}

// End of file ProgressStepManager.php
// Location: core/services/progress_steps/ProgressStepManager.php