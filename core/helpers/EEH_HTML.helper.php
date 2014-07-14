<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EEH_HTML
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */

class EEH_HTML {


	private static $_indent = 1;


	/**
	 * @param int    $indent
	 * @return int
	 */
	public static function indent( $indent = 0 ) {
		return EEH_HTML::$_indent += $indent;
	}



	/**
	 * Generates an opening HTML <XX> tag and adds any passed attributes
	 * if passed content, it will also add that, as well as the closing </XX> tag
	 *
	 * @access private
	 * @param string $tag
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	private static function _open_tag( $tag = 'div', $id = '', $class = '', $style = '', $content = '', $other_attributes = '' ) {
		$attributes = ! empty( $id ) ? ' id="' . $id . '"' : '';
		$attributes .= ! empty( $class ) ? ' class="' . $class . '"' : '';
		$attributes .= ! empty( $style ) ? ' style="' . $style . '"' : '';
		$attributes .= ! empty( $other_attributes ) ? ' ' . $other_attributes : '';
		$html = EEH_Formatter::nl( EEH_HTML::indent( 0 )) . '<' . $tag . $attributes . '>' . EEH_Formatter::nl( EEH_HTML::indent( 1 ));
		if ( ! empty( $content ) || $tag === 'p' ) {
			$html .= $content;
			$html .= EEH_HTML::_close_tag( $tag, $id, $class );
		}
		return $html;
	}



	/**
	 * Generates HTML closing </XX> tag - if passed the id or class attribute used for the opening tag, will append a comment
	 *
	 * @param string $tag
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @return string
	 */
	private static function _close_tag( $tag = 'div', $id = '', $class = '' ) {
		if ( $id ) {
			$comment = EEH_HTML::comment( 'close ' . $id );
		} else if ( $class ) {
			$comment = EEH_HTML::comment( 'close ' . $class );
		} else {
			$comment = '';
		}
		return EEH_Formatter::nl( EEH_HTML::indent( -1 )) . '</' . $tag . '>' . $comment . EEH_Formatter::nl( EEH_HTML::indent( 0 ));
	}



	/**
	 * 	div - generates HTML opening <div> tag and adds any passed attributes
	 * 	to add an id use: 		echo EEH_HTML::divo( 'footer' );
	 *  to add a class use: 	echo EEH_HTML::divo( '', 'float_left' );
	 * 	to add a both an id and a class use: 	echo EEH_HTML::divo( 'footer', 'float_left' );
	 *
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	public static function div( $content = '', $id = '', $class = '', $style = '', $other_attributes = '' ) {
		return EEH_HTML::_open_tag( 'div', $content, $id, $class, $style, $other_attributes );
	}



	/**
	 * Generates HTML closing </div> tag - if passed the id or class attribute used for the opening div tag, will append a comment
	 * usage: echo EEH_HTML::divx();
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @return string
	 */
	public static function divx( $id = '', $class = '' ) {
		return EEH_HTML::_close_tag( 'div', $id, $class );
	}



	/**
	 * Generates HTML <p></p> tags, inserts content, and adds any passed attributes
	 * usage: echo EEH_HTML::p( 'this is a paragraph' );
	 *
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	public static function p( $content = '', $id = '', $class = '', $style = '', $other_attributes = '' ) {
		return EEH_HTML::_open_tag( 'p', $content, $id, $class, $style, $other_attributes );
	}



	/**
	 * Generates HTML <span></span> tags, inserts content, and adds any passed attributes
	 * usage: echo EEH_HTML::span( 'this is some inline text' );
	 *
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	public static function span( $content = '', $id = '', $class = '', $style = '', $other_attributes = '' ) {
		$attributes = ! empty( $id ) ? ' id="' . $id . '"' : '';
		$attributes .= ! empty( $class ) ? ' class="' . $class . '"' : '';
		$attributes .= ! empty( $style ) ? ' style="' . $style . '"' : '';
		$attributes .= ! empty( $other_attributes ) ? ' ' . $other_attributes : '';
		return '<span' . $attributes . '>'  . $content  . '</span>';
	}



	/**
	 * 	ul - generates HTML opening <ul> tag and adds any passed attributes
	 * 	usage: 		echo EEH_HTML::ul( 'my-list-id', 'my-list-class' );
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	function ul( $id = '', $class = '', $style = '', $other_attributes = '' ) {
		return EEH_HTML::_open_tag( 'ul', '', $id, $class, $style, $other_attributes );
	}



	/**
	 * Generates HTML closing </ul> tag - if passed the id or class attribute used for the opening ul tag, will append a comment
	 * usage: echo EEH_HTML::ulx();
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @return string
	 */
	public static function ulx( $id = '', $class = '' ) {
		return EEH_HTML::_close_tag( 'ul', $id, $class );
	}



	/**
	 * Generates HTML <li> tag, inserts content, and adds any passed attributes
	 * if passed content, it will also add that, as well as the closing </li> tag
	 * usage: echo EEH_HTML::li( 'this is a line item' );
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	public static function li( $content = '', $id = '', $class = '', $style = '', $other_attributes = '' ) {
		return EEH_HTML::_open_tag( 'li', $content, $id, $class, $style, $other_attributes );
	}



	/**
	 * Generates HTML closing </li> tag - if passed the id or class attribute used for the opening ul tag, will append a comment
	 * usage: echo EEH_HTML::lix();
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @return string
	 */
	public static function lix( $id = '', $class = '' ) {
		return EEH_HTML::_close_tag( 'li', $id, $class );
	}



	/**
	 *    thead - generates an HTML <thead> tag and adds any passed attributes
	 *    usage: echo EEH_HTML::thead();
	 *
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	public static function thead( $content = '', $id = '', $class = '', $style = '', $other_attributes = '' ) {
		return EEH_HTML::_open_tag( 'thead', $content, $id, $class, $style, $other_attributes );
	}



	/**
	 * theadx - generates an HTML </thead> tag - if passed the id or class attribute used for the opening ul tag, will append a comment
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @return string
	 */
	public static function theadx( $id = '', $class = '' ) {
		return EEH_HTML::_close_tag( 'thead', $id, $class );
	}



	/**
	 *    th - generates an HTML <th> tag and adds any passed attributes
	 *    usage: echo EEH_HTML::th();
	 *
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	public static function th( $content = '', $id = '', $class = '', $style = '', $other_attributes = '' ) {
		return EEH_HTML::_open_tag( 'th', $content, $id, $class, $style, $other_attributes );
	}



	/**
	 * thx - generates an HTML </th> tag - if passed the id or class attribute used for the opening ul tag, will append a comment
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @return string
	 */
	public static function thx( $id = '', $class = '' ) {
		return EEH_HTML::_close_tag( 'th', $id, $class );
	}



	/**
	 *    tr - generates an HTML <tr> tag and adds any passed attributes
	 *    usage: echo EEH_HTML::tr();
	 *
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	public static function tr( $content = '', $id = '', $class = '', $style = '', $other_attributes = '' ) {
		return EEH_HTML::_open_tag( 'tr', $content, $id, $class, $style, $other_attributes );
	}



	/**
	 * trx - generates an HTML </tr> tag - if passed the id or class attribute used for the opening ul tag, will append a comment
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @return string
	 */
	public static function trx( $id = '', $class = '' ) {
		return EEH_HTML::_close_tag( 'tr', $id, $class );
	}



	/**
	 *    td - generates an HTML <td> tag and adds any passed attributes
	 *    usage: echo EEH_HTML::td();
	 *
	 * @param string $content - inserted after opening tag, and appends closing tag, otherwise tag is left open
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @param string $style - html style attribute for applying inline styles
	 * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
	 * @return string
	 */
	public static function td( $content = '', $id = '', $class = '', $style = '', $other_attributes = '' ) {
		return EEH_HTML::_open_tag( 'td', $content, $id, $class, $style, $other_attributes );
	}



	/**
	 * tdx - generates an HTML </td> tag - if passed the id or class attribute used for the opening ul tag, will append a comment
	 *
	 * @param string $id - html id attribute
	 * @param string $class - html class attribute
	 * @return string
	 */
	public static function tdx( $id = '', $class = '' ) {
		return EEH_HTML::_close_tag( 'td', $id, $class );
	}



	/**
	 * Generates an html <--  comment --> tag
	 * 	usage: echo comment( 'this is a comment' );
	 *
	 * @param string $comment
	 * @return string
	 */
	public static function comment( $comment = '' ) {
		return ! empty( $comment ) ? EEH_Formatter::nl(EEH_HTML::indent( 0 )) . '<!-- ' . $comment . ' -->' : '';
	}



	/**
	 * nbsp - generates non-breaking space entities based on number supplied
	 *
	 * @param int $nmbr - the number of non-breaking spaces to return
	 * @return string
	 */
	public static function nbsp( $nmbr = 1 ) {
		return str_repeat( "&nbsp;", $nmbr );
	}



}
// End of file EEH_HTML.helper.php
// Location: /EEH_HTML.helper.php