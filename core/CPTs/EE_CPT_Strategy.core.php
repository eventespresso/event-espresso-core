<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {exit('No direct script access allowed');}
/**
 * CPT_Strategy
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
class EE_CPT_Strategy extends EE_Base {

   /**
     * 	EE_CPT_Strategy Object
     * 	@private _instance
	 * 	@private 	protected
     */
	private static $_instance;


	/**
	 * $CPT - the current page, if it utilizes CPTs
	 *	@var 	array
	 * 	@access 	protected
	 */
	protected $CPT;

	/**
	 * return value from \EE_Register_CPTs::get_CPTs()
	 * @var 	array 	$_CPTs
	 * @access 	protected
	 */
	protected $_CPTs = array();

	/**
	 * 	@var 	array 	$_CPT_taxonomies
	 *  @access 	protected
	 */
	protected $_CPT_taxonomies = array();

	/**
	 * 	@var 	array 	$_CPT_terms
	 *  @access 	protected
	 */
	protected $_CPT_terms = array();

	/**
	 * 	@var 	array 	$_CPT_endpoints
	 *  @access 	protected
	 */
	protected $_CPT_endpoints = array();

	/**
	 * $CPT_model
	 *	@var EEM_Base
	 * 	@access 	protected
	 */
	protected $CPT_model;

	/**
	 *	@var EventEspresso\Core\CPTs\CptQueryModifier
	 */
	protected $query_modifier;



	/**
	 *@ singleton method used to instantiate class object
	 *@ access public
	 *@ return EE_CPT_Strategy instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_CPT_Strategy ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 * @access protected
	 * @return \EE_CPT_Strategy
	 */
	protected function __construct() {
		// get CPT data
		$this->_CPTs = EE_Register_CPTs::get_CPTs();
		$this->_CPT_endpoints = $this->_set_CPT_endpoints();
		$this->_CPT_taxonomies = EE_Register_CPTs::get_taxonomies();
		add_action( 'pre_get_posts', array( $this, 'pre_get_posts' ), 5 );
	}



	/**
	 *    _get_espresso_CPT_endpoints
	 *
	 * @access public
	 * @return array
	 */
	public function get_CPT_endpoints() {
		return $this->_CPT_endpoints;
	}



	/**
	 * @return array
	 */
	public function get_CPT_taxonomies() {
		return $this->_CPT_taxonomies;
	}



	/**
	 * 	_set_CPT_endpoints - add CPT "slugs" to array of default espresso "pages"
	 *
	 * 	@access private
	 * 	@return array
	 */
	private function _set_CPT_endpoints() {
		$_CPT_endpoints = array();
		if ( is_array( $this->_CPTs )) {
			foreach ( $this->_CPTs as $CPT_type => $CPT ) {
				$_CPT_endpoints [ $CPT['plural_slug'] ] = $CPT_type;
			}
		}
		return $_CPT_endpoints;
	}



	/**
	 *    pre_get_posts
	 * If this query (not just "main" queries (ie, for WP's infamous "loop")) is for an EE CPT, then we want to supercharge the get_posts query
	 * to add our EE stuff (like joining to our tables, selecting extra columns, and adding
	 * EE objects to the post to facilitate further querying of related data etc)
	 *
	 * @access public
	 * @param WP_Query $WP_Query
	 * @return void
	 */
	public function pre_get_posts( $WP_Query ) {
		// check that post-type is set
		if ( ! $WP_Query instanceof WP_Query ) {
			return;
		}
		// add our conditionals
		$this->_set_EE_tags_on_WP_Query( $WP_Query );
		// check for terms
		$this->_set_post_type_for_terms( $WP_Query );
		// make sure paging is always set
		$this->_set_paging( $WP_Query );
		// is a taxonomy set ?
		$this->_set_CPT_taxonomies_on_WP_Query( $WP_Query );
		// loop thru post_types if set
		$this->_process_WP_Query_post_types( $WP_Query );
	}


	/**
	 *    _set_EE_tags_on_WP_Query
	 *
	 * @access private
	 * @param WP_Query $WP_Query
	 * @return void
	 */
	private function _set_EE_tags_on_WP_Query( WP_Query $WP_Query) {
		$WP_Query->is_espresso_event_single = FALSE;
		$WP_Query->is_espresso_event_archive = FALSE;
		$WP_Query->is_espresso_event_taxonomy = FALSE;
		$WP_Query->is_espresso_venue_single = FALSE;
		$WP_Query->is_espresso_venue_archive = FALSE;
		$WP_Query->is_espresso_venue_taxonomy = FALSE;
	}



	/**
	 *    _set_CPT_terms
	 *
	 * @access private
	 * @return void
	 */
	private function _set_CPT_terms() {
		if ( empty( $this->_CPT_terms )) {
			$terms = EEM_Term::instance()->get_all_CPT_post_tags();
			foreach ( $terms as $term ) {
				if ( $term instanceof EE_Term ) {
					$this->_CPT_terms[ $term->slug() ] = $term;
				}
			}
		}
	}



	/**
	 *    _set_post_type_for_terms
	 *
	 * @access private
	 * @param $WP_Query
	 * @return void
	 */
	private function _set_post_type_for_terms( WP_Query $WP_Query ) {
		// is a tag set ?
		if ( isset( $WP_Query->query['tag'] )) {
			// set post_tags
			$this->_set_CPT_terms();
			// is this tag archive term in the list of terms used by our CPTs ?
			$term = isset ( $this->_CPT_terms[ $WP_Query->query['tag'] ] ) ? $this->_CPT_terms[ $WP_Query->query['tag'] ] : NULL;
			// verify the term
			if ( $term instanceof EE_Term ) {
				$term->post_type  = array_merge( array( 'post', 'page' ), (array)$term->post_type );
				$term->post_type = apply_filters( 'FHEE__EE_CPT_Strategy___set_post_type_for_terms__term_post_type', $term->post_type, $term );
				// if a post type is already set
				if ( isset( $WP_Query->query_vars['post_type'] )) {
						// add to existing array
						$term->post_type = array_merge ( (array)$WP_Query->query_vars['post_type'], $term->post_type );
				}
				// just set post_type to our CPT
				$WP_Query->set( 'post_type', array_unique( $term->post_type ) );
			}
		}
	}



	/**
	 *	_set_paging
	 *
	 * @access public
	 * @param WP_Query $WP_Query
	 * @return void
	 */
	public function _set_paging( $WP_Query ) {
		if ( $WP_Query->is_main_query() && apply_filters( 'FHEE__EE_CPT_Strategy___set_paging', TRUE )) {
			$page = get_query_var('page') ? get_query_var('page') : NULL;
			$paged = get_query_var('paged') ? get_query_var('paged') : $page;
			$WP_Query->set( 'paged', $paged );
		}
	}



	/**
	 * @access protected
	 * @param \WP_Query $WP_Query
	 */
	protected function _set_CPT_taxonomies_on_WP_Query( WP_Query $WP_Query ) {
		// is a taxonomy set ?
		if ( $WP_Query->is_tax ) {
			// loop thru our taxonomies
			foreach ( $this->_CPT_taxonomies as $CPT_taxonomy => $CPT_taxonomy_details ) {
				// check if one of our taxonomies is set as a query var
				if ( isset( $WP_Query->query[ $CPT_taxonomy ] ) ) {
					// but which CPT does that correspond to??? hmmm... guess we gotta go looping
					foreach ( $this->_CPTs as $post_type => $CPT ) {
						// verify our CPT has args, is public and has taxonomies set
						if (
							isset( $CPT['args'], $CPT['args']['public'] )
							&& $CPT['args']['public']
							&& ! empty( $CPT['args']['taxonomies'] )
							&& in_array( $CPT_taxonomy, $CPT['args']['taxonomies'] )
						) {
							// if so, then add this CPT post_type to the current query's array of post_types'
							$WP_Query->query_vars['post_type'] = isset( $WP_Query->query_vars['post_type'] )
								? (array) $WP_Query->query_vars['post_type']
								: array();
							$WP_Query->query_vars['post_type'][] = $post_type;
							switch ( $post_type ) {
								case 'espresso_events' :
									$WP_Query->is_espresso_event_taxonomy = true;
									break;
								case 'espresso_venues' :
									$WP_Query->is_espresso_venue_taxonomy = true;
									break;
								default :
									do_action(
										'AHEE__EE_CPT_Strategy___set_CPT_taxonomies_on_WP_Query__for_' . $post_type . '_post_type',
										$WP_Query,
										$this
									);
							}
						}
					}
				}
			}
		}
	}



	/**
	 * @access public
	 * @param \WP_Query $WP_Query
	 */
	protected function _process_WP_Query_post_types( WP_Query $WP_Query ) {
		if ( isset( $WP_Query->query_vars['post_type'] ) ) {
			// loop thru post_types as array
			foreach ( (array) $WP_Query->query_vars['post_type'] as $post_type ) {
				// is current query for an EE CPT ?
				if ( isset( $this->_CPTs[ $post_type ] ) ) {
					// is EE on or off ?
					if ( EE_Maintenance_Mode::instance()->level() ) {
						// reroute CPT template view to maintenance_mode.template.php
						if ( ! has_filter( 'template_include', array( 'EE_Maintenance_Mode', 'template_include' ) ) ) {
							add_filter( 'template_include', array( 'EE_Maintenance_Mode', 'template_include' ), 99999 );
						}
						if ( has_filter( 'the_content', array( EE_Maintenance_Mode::instance(), 'the_content' ) ) ) {
							add_filter( 'the_content', array( $this, 'inject_EE_shortcode_placeholder' ), 1 );
						}
						return;
					}
					$this->_generate_CptQueryModifier( $WP_Query, $post_type );
				}
			}
		}
	}



	/**
	 * @param \WP_Query $WP_Query
	 * @param string    $post_type
	 */
	protected function _generate_CptQueryModifier( WP_Query $WP_Query, $post_type ) {
		$this->query_modifier = new EventEspresso\core\CPTs\CptQueryModifier(
			$post_type,
			$this->_CPTs[ $post_type ],
			$WP_Query,
			EE_Registry::instance()->REQ
		);
		$this->_CPT_taxonomies = $this->query_modifier->taxonomies();
	}



	/**
	 * inject_EE_shortcode_placeholder
	 * in order to display the M-Mode notice on our CPT routes,
	 * we need to first inject what looks like one of our shortcodes,
	 * so that it can be replaced with the actual M-Mode notice
	 *
	 * @access public
	 * @return string
	 */
	public function inject_EE_shortcode_placeholder() {
		return '[ESPRESSO_';
	}



	/**
	 * @deprecated
	 * @since  4.8.41
	 * @access public
	 * @return void
	 */
	public function _possibly_set_ee_request_var() {
		$this->query_modifier->setRequestVarsIfCpt();
	}



	/**
	 * @deprecated
	 * @since  4.8.41
	 * @access public
	 * @param  $SQL
	 * @return string
	 */
	public function posts_fields( $SQL ) {
		if ( $this->query_modifier instanceof EventEspresso\Core\CPTs\CptQueryModifier ) {
			return $this->query_modifier->postsFields( $SQL );
		}
		return $SQL;
	}



	/**
	 * @deprecated
	 * @since  4.8.41
	 * @access public
	 * @param  $SQL
	 * @return string
	 */
	public function posts_join( $SQL ) {
		if ( $this->query_modifier instanceof EventEspresso\Core\CPTs\CptQueryModifier ) {
			return $this->query_modifier->postsJoin( $SQL );
		}
		return $SQL;
	}



	/**
	 * @deprecated
	 * @since  4.8.41
	 * @access public
	 * @param  \WP_Post[] $posts
	 * @return \WP_Post[]
	 */
	public function the_posts( $posts ) {
		if ( $this->query_modifier instanceof EventEspresso\Core\CPTs\CptQueryModifier ) {
			$this->query_modifier->thePosts( $posts );
		}
		return $posts;
	}



	/**
	 * @deprecated
	 * @since  4.8.41
	 * @access public
	 * @param $url
	 * @param $ID
	 * @return string
	 */
	public function get_edit_post_link( $url, $ID ) {
		if ( $this->query_modifier instanceof EventEspresso\Core\CPTs\CptQueryModifier ) {
			return $this->query_modifier->getEditPostLink( $url, $ID );
		}
		return '';
	}



	/**
	 * @deprecated
	 * @since  4.8.41
	 * @access public
	 * @param null $WP_Query
	 */
	protected function _do_template_filters( $WP_Query = null ) {
		if ( $this->query_modifier instanceof EventEspresso\Core\CPTs\CptQueryModifier ) {
			$this->query_modifier->addTemplateFilters();
		}
	}



	/**
	 * @deprecated
	 * @since  4.8.41
	 * @access public
	 * @param string $current_template Existing default template path derived for this page call.
	 * @return string the path to the full template file.
	 */
	public function single_cpt_template( $current_template ) {
		if ( $this->query_modifier instanceof EventEspresso\Core\CPTs\CptQueryModifier ) {
			return $this->query_modifier->singleCptTemplate( $current_template );
		}
		return $current_template;
	}






}
// End of file EE_CPT_Strategy.core.php
// Location: /core/EE_CPT_Strategy.core.php
