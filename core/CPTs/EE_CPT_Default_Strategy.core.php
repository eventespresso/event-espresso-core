<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_CPT_Default_Strategy
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EE_CPT_Default_Strategy {



	/**
	 * $CPT - the current page, if it utilizes CPTs
	 *
	 * @var    object
	 * @access    protected
	 */
	protected $CPT = null;



	/**
	 *    class constructor
	 *
	 * @access    private
	 * @param    array $arguments
	 * @return    \EE_CPT_Default_Strategy
	 */
	public function __construct( $arguments = array() ) {
		$this->CPT = isset( $arguments['CPT'] ) ? $arguments['CPT'] : null;
		// $WP_Query = isset( $arguments['WP_Query'] ) ? $arguments['WP_Query'] : null;
		//EEH_Debug_Tools::printr( $this->CPT, '$this->CPT  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		add_filter( 'pre_get_posts', array( $this, 'pre_get_posts' ), 999 );
//		add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
	}



	/**
	 *    pre_get_posts
	 *
	 * @access    public
	 * @param    \WP_Query $WP_Query
	 * @return    \WP_Query
	 */
	public function pre_get_posts( WP_Query $WP_Query ) {
		//EEH_Debug_Tools::printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( ! $WP_Query->is_main_query() && ! $WP_Query->is_archive() ) {
			return $WP_Query;
		}
//		$WP_Query->set( 'post_type', array( $this->CPT['post_type'] ));
//		$WP_Query->set( 'fields', 'ids' );
		return $WP_Query;
	}



	/**
	 *    wp
	 *
	 * @access    public
	 * @param    \WP_Post[] $posts
	 * @param    \WP_Query  $WP_Query
	 * @return    \WP_Post[]
	 */
	public function the_posts( $posts, WP_Query $WP_Query ) {
		return $posts;
	}



	/**
	 *    get_EE_post_type_metadata
	 *
	 * @access    public
	 * @param mixed     $meta_value
	 * @param    int    $post_id
	 * @param    string $meta_key
	 * @param    string $single
	 * @return    mixed
	 */
	public function get_EE_post_type_metadata( $meta_value = null, $post_id, $meta_key, $single ) {
		return $meta_value;
	}


}
// End of file EE_CPT_Default_Strategy.core.php
// Location: /EE_CPT_Default_Strategy.core.php