<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Display Strategy for line item tables in the admin on the Registration Details page..
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author		  Darren Ethier
 * @since		  4.8
 *
 */

class EE_Admin_Table_Registration_Line_Item_Display_Strategy extends EE_Admin_Table_Line_Item_Display_Strategy  {

	/**
	 * Table header for display.
	 * @since   4.8
	 * @param array $options
	 * @return string
	 */
	protected function _table_header( $options ) {
		$html = EEH_HTML::table( '','', $options['table_css_class'] );
		$html .= EEH_HTML::thead();
		$html .= EEH_HTML::tr();
		$html .= EEH_HTML::th( __( 'Name', 'event_espresso' ), '', 'jst-left' );
		$html .= EEH_HTML::th( __( 'Type', 'event_espresso'), '', 'jst-left' );
		$html .= EEH_HTML::th( __( 'Date(s)', 'event_espresso' ), '', 'jst-left' );
		$html .= EEH_HTML::th( __( 'Amount', 'event_espresso' ), '', 'jst-cntr' );
		$html .= EEH_HTML::tbody();
		return $html;
	}





	/**
	 *    _item_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	protected function _item_row( EE_Line_Item $line_item, $options = array() ) {
		$line_item_related_object = $line_item->get_object();
		$parent_line_item_related_object = $line_item->parent() instanceof EE_Line_Item
			? $line_item->parent()->get_object()
			: null;
		// start of row
		$row_class = $options['odd'] ? 'item odd' : 'item';
		$html = EEH_HTML::tr( '', '', $row_class );


		//Name Column
		$name_link = $line_item_related_object instanceof EEI_Admin_Links ? $line_item_related_object->get_admin_details_link() : '';

		//related object scope.
		$parent_related_object_name = $parent_line_item_related_object instanceof EEI_Line_Item_Object
			? $parent_line_item_related_object->name()
			: '';
		$parent_related_object_name = empty( $parent_related_object_name ) && $line_item->parent() instanceof EE_Line_Item
			? $line_item->parent()->name()
			: $parent_related_object_name;
		$parent_related_object_link = $parent_line_item_related_object instanceof EEI_Admin_Links
			? $parent_line_item_related_object->get_admin_details_link()
			: '';


		$name_html = $line_item_related_object instanceof EEI_Line_Item_Object
			? $line_item_related_object->name() : $line_item->name();
		$name_html = $name_link ? '<a href="' . $name_link . '">' . $name_html . '</a>'
			: $name_html;
		$name_html .= $line_item->is_taxable() ? ' *' : '';
		//maybe preface with icon?
		$name_html = $line_item_related_object instanceof EEI_Has_Icon
			? $line_item_related_object->get_icon() . $name_html
			: $name_html;
		$name_html = '<span class="ee-line-item-name linked">' . $name_html . '</span><br>';
		$name_html .=  sprintf(
			_x( '%1$sfor the %2$s: %3$s%4$s', 'eg. "for the Event: My Cool Event"', 'event_espresso'),
			'<span class="ee-line-item-related-parent-object">',
			$line_item->parent() instanceof EE_Line_Item
				? $line_item->parent()->OBJ_type_i18n()
				: __( 'Item:', 'event_espresso' ),
			$parent_related_object_link
				? '<a href="' . $parent_related_object_link . '">' . $parent_related_object_name . '</a>'
				: $parent_related_object_name,
			'</span>'
		);
		$html .= EEH_HTML::td( $name_html, '', 'jst-left' );
		//Type Column
		$type_html = $line_item->OBJ_type() ? $line_item->OBJ_type_i18n() : '';
		$type_html .= $this->_get_cancellations( $line_item );
		$type_html .= $line_item->OBJ_type() ? '<br />' : '';
		$code = $line_item_related_object instanceof EEI_Has_Code ? $line_item_related_object->code() : '';
		$type_html .= ! empty( $code ) ? '<span class="ee-line-item-id">' . sprintf( __( 'Code: %s', 'event_espresso' ), $code ) . '</span>' : '';
		$html .= EEH_HTML::td( $type_html, '', 'jst-left' );

		//Date column
		$datetime_content = '';
		if ( $line_item_related_object instanceof EE_Ticket ) {
			$datetimes = $line_item_related_object->datetimes();
			foreach ( $datetimes as $datetime ) {
				if ( $datetime instanceof EE_Datetime ) {
					$datetime_content .= $datetime->get_dtt_display_name() . '<br>';
				}
			}
		}
		$html .= EEH_HTML::td( $datetime_content, '', 'jst-left' );

		//Amount Column
		if ( $line_item->is_percent() ) {
			$html .= EEH_HTML::td( $line_item->percent() . '%', '', 'jst-rght' );
		} else {
			$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '', 'jst-rght' );
		}


		//finish things off and return
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 * 	_tax_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	protected function _tax_row( EE_Line_Item $line_item, $options = array() ) {
		// start of row
		$html = EEH_HTML::tr( '', 'admin-primary-mbox-taxes-tr' );
		// name th
		$html .= EEH_HTML::th(  $line_item->name() . '(' . $line_item->get_pretty( 'LIN_percent' ) . '%)', '',  'jst-rght', '', ' colspan="3"' );
		// total th
		$html .= EEH_HTML::th( EEH_Template::format_currency( $line_item->total(), false, false ), '', 'jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}





	/**
	 * 	_total_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	protected function _total_row( EE_Line_Item $line_item, $options = array() ) {

		$registration = isset( $options['EE_Registration'] ) ? $options['EE_Registration'] : null;
		$registration_total = $registration instanceof EE_Registration ? $registration->pretty_final_price() : 0;
		//if no valid registration object then we're not going to show the approximate text.
		$total_match = $registration instanceof EE_Registration
			? $registration->final_price() === $line_item->total()
			: true;

		// start of row
		$html = EEH_HTML::tr( '', '', 'admin-primary-mbox-total-tr' );
		// Total th label
		if ( $total_match ) {
			$total_label = sprintf( __( 'This registration\'s total %s:', 'event_espresso' ), '(' . EE_Registry::instance()->CFG->currency->code . ')' );
		} else {
			$total_label = sprintf( __( 'This registration\'s approximate total %s', 'event_espresso' ), '(' . EE_Registry::instance()->CFG->currency->code . ')' );
			$total_label .= '<br>';
			$total_label .= '<p class="ee-footnote-text">'
			                . sprintf(
				                __( 'The registrations\' share of the transaction total is approximate because it might not be possible to evenly divide the transaction total among each registration, and so some registrations may need to pay a penny more than others.  This registration\'s final share is actually %1$s%2$s%3$s.', 'event_espresso' ),
				                '<strong>',
				                $registration_total,
				                '</strong>'
			                )
			                . '</p>';
		}
		$html .= EEH_HTML::th( $total_label, '',  'jst-rght',  '',  ' colspan="3"' );
		// total th

		$html .= EEH_HTML::th( EEH_Template::format_currency( $line_item->total(), false, false ), '',  'jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}

} // End of EE_Admin_Table_Registration_Line_Item_Display_Strategy