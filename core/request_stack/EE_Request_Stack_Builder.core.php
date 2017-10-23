<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EE_Request_Stack_Builder
 *
 * Assembles the EE_Request_Stack
 *
 * @package 	Event Espresso
 * @subpackage 	core
 * @author 		Brent Christensen
 * @since 		4.8.20
 *
 */
class EE_Request_Stack_Builder {

	/**
	 * Stack of middleware objects
	 *
	 * @type array $_middleware_stack
	 */
	protected $_middleware_stack;



	/**
	 * EE_Request_Stack_Builder
	 */
	public function __construct() {
		$this->_middleware_stack = array();
	}



    /**
     * Add an EE_Middleware class to the beginning of the middleware_stack
     * First parameter is the middleware classname,
     * any number of arguments can also be passed, and detected via func_get_args()

     * @ param $class_name
     * @ param $args
     *
     * @return EE_Request_Stack_Builder
     * @throws \InvalidArgumentException
     */
	public function unshift( /*$class_name, $args*/ ) {
		if ( func_num_args() === 0 ) {
			throw new InvalidArgumentException( 'Missing argument(s) when calling unshift' );
		}
		$middleware = func_get_args();
		array_unshift( $this->_middleware_stack, $middleware );
		return $this;
	}



    /**
     * Add an EE_Middleware class to the end of the middleware_stack
     * First parameter is the middleware classname,
     * any number of arguments can also be passed, and detected via func_get_args()

     * @ param $class_name
     * @ param $args
     *
     * @return EE_Request_Stack_Builder
     * @throws \InvalidArgumentException
     */
	public function push( /*$class_name, $args...*/ ) {
		if ( func_num_args() === 0 ) {
			throw new InvalidArgumentException( 'Missing argument(s) when calling push' );
		}
        $middleware = func_get_args();
        $this->_middleware_stack[] = $middleware;
		return $this;
	}



    /**
     * builds decorated middleware stack
     * by continuously injecting previous middleware app into the next
     *
     * @param EEI_Request_Decorator $application
     * @return EE_Request_Stack
     */
	public function resolve( EEI_Request_Decorator $application ) {
		$middlewares = array( $application );
		foreach ( $this->_middleware_stack as $middleware_args ) {
			$class_name = array_shift( $middleware_args );
			if ( is_callable( $class_name ) ) {
				$application = $class_name( $application );
			} else {
				array_unshift( $middleware_args, $application );
                $reflection = new ReflectionClass($class_name);
                $application = $reflection->newInstanceArgs($middleware_args);
            }
			array_unshift( $middlewares, $application );
		}
		return new EE_Request_Stack( $application, $middlewares );
	}



}
// End of file EE_Request_Stack_Builder.php
// Location: core/EE_Request_Stack_Builder.php