<?php 
/**
 * migrates 3.1 attendee rows into 4.1 line items.
 * THis is done separately from migrating transaction and registrations, because
 * we wanted to use that completed 4.1 data in creating the line items

4.1 Line Item table fields
 * $this->_tables = array(
			'Line_Item'=>new EE_Primary_Table('esp_line_item','LIN_ID')
		);
		$line_items_can_be_for = array('Ticket','Price');
		$this->_fields = array(
			'Line_Item'=> array(
				'LIN_ID'=>new EE_Primary_Key_Int_Field('LIN_ID', __("ID", "event_espresso")),
				'LIN_code'=>new EE_Slug_Field('LIN_code', __("Code for index into Cart", "event_espresso"), true),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', __("Transaction ID", "event_espresso"), true, null, 'Transaction'),
				'LIN_name'=>new EE_Full_HTML_Field('LIN_name', __("Line Item Name", "event_espresso"), false, ''),
				'LIN_desc'=>new EE_Full_HTML_Field('LIN_desc', __("Line Item Description", "event_espresso"), true),
				'LIN_unit_price'=>new EE_Money_Field('LIN_unit_price',  __("Unit Price", "event_espresso"),false,0),
				'LIN_percent'=>new EE_Float_Field('LIN_percent', __("Percent", "event_espresso"), false, false),
				'LIN_is_taxable'=>new EE_Boolean_Field('LIN_is_taxable', __("Taxable", "event_espresso"), false, false),
				'LIN_order'=>new EE_Integer_Field('LIN_order', __("Order of Application towards total of parent", "event_espresso"), false,1),
				'LIN_total'=>new EE_Money_Field('LIN_total', __("Total (unit price x quantity)", "event_espresso"), false, 0),
				'LIN_quantity'=>new EE_Integer_Field('LIN_quantity', __("Quantity", "event_espresso"), true, null),
				'LIN_parent'=>new EE_Integer_Field('LIN_parent', __("Parent ID (this item goes towards that Line Item's total)", "event_espresso"), true, null),
				'LIN_type'=>new EE_Enum_Text_Field('LIN_type', __("Type", "event_espresso"), false, 'line-item', 
						array(
							self::type_line_item=>  __("Line Item", "event_espresso"),
							self::type_sub_line_item=>  __("Sub-Item", "event_espresso"),
							self::type_sub_total=>  __("Subtotal", "event_espresso"),
							self::type_tax_sub_total => __("Tax Subtotal", "event_espresso"),
							self::type_tax=>  __("Tax", "event_espresso"),
							self::type_total=>  __("Total", "event_espresso"))),
				'OBJ_ID'=>new EE_Foreign_Key_Int_Field('OBJ_ID', __("ID of Item purchased.", "event_espresso"), true,null,$line_items_can_be_for),
				'OBJ_type'=>new EE_Any_Foreign_Model_Name_Field('OBJ_type', __("Model Name this Line Item is for", "event_espresso"), true,null,$line_items_can_be_for),
			)
		);
 */
class EE_DMS_4_1_0_line_items extends EE_Data_Migration_Script_Stage_Table{
	private $_new_line_table;
	private $_new_transaction_table;
	private $_new_reg_table;
	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Line Items", "event_espresso");
		$this->_old_table = $wpdb->prefix."events_attendee";
		$this->_new_transaction_table = $wpdb->prefix."esp_transaction";
		$this->_new_line_table = $wpdb->prefix."esp_line_item";
		$this->_new_reg_table = $wpdb->prefix."esp_registration";
		parent::__construct();
	}
	
	protected function _migrate_old_row($old_row) {
		//insert line items if its a primary id
		if(intval($old_row['is_primary'])){
			$txn_id = $this->get_migration_script()->get_mapping_new_pk($this->_old_table, $old_row['id'], $this->_new_transaction_table);
			if ( ! $txn_id ){
				$this->add_error(sprintf(__("Could not find the transaction for the 3.1 attendee %d from row %s", "event_espresso"),$old_row['id'],$this->_json_encode($old_row)));
				return;
			}
			$txn = $this->_get_txn($txn_id);
			$new_line_items = $this->_insert_new_line_items($txn,$old_row);
			$this->get_migration_script()->set_mapping($this->_old_table,$old_row['id'],$this->_new_line_table,$new_line_items);
		}
	}
	
	private function _get_txn($txn_id){
		global $wpdb;
		$txn = $wpdb->get_row($wpdb->prepare("SELECT * FROM $this->_new_transaction_table WHERE TXN_ID=%d",$txn_id),ARRAY_A);
		return $txn;
	}
	
	/**
	 * In 4.1, we'd normally need more info than just the registrations to make the line items. Ie, we'd need
	 * the transaction, and tax prices at the time of registration. (And probably promotions and other price factors).
	 * But seeing how these are REGs created from 3.1 attendee data, which have
	 * @param array $transaction
	 * @return array new line item ids
	 */
	private function _insert_new_line_items($transaction,$old_attendee){
		global $wpdb;
		$regs_on_this_transaction = $wpdb->get_results($wpdb->prepare("SELECT * FROM ".$this->_new_reg_table." WHERE TXN_ID=%d",$transaction['TXN_ID']),ARRAY_A);
		$new_line_item_ids = array();
		//create a totla line item
		$total_line_item_id = $this->_insert_new_line_item(array(
			'LIN_code'=>'total',
			'TXN_ID'=>$transaction['TXN_ID'],
			'LIN_name'=>  __("Total", "event_espresso"),
			'LIN_total'=>$transaction['TXN_total'],
			'LIN_type'=>'total',
			'OBJ_ID'=>$transaction['TXN_ID'],
			'OBJ_type'=>'Transaction'
		),$old_attendee);
		$new_line_item_ids[] = $total_line_item_id;
		//create a subtotal line item
		$reg_total = 0;
		foreach($regs_on_this_transaction as $new_reg){
			$reg_total += floatval($new_reg['REG_final_price']);
		}
		$subtotal_line_item_id = $this->_insert_new_line_item(array(
			'LIN_code'=>'sub-total',
			'TXN_ID'=>$transaction['TXN_ID'],
			'LIN_name'=>  __("Subtotal", "event_espresso"),
			'LIN_total'=>$reg_total,
			'LIN_parent'=>$total_line_item_id,
			'LIN_type'=>'sub-total',
		),$old_attendee);
		$new_line_item_ids[] = $subtotal_line_item_id;
		//group REGs by TKT_ID
		$regs_by_tkt = array();
		foreach($regs_on_this_transaction as $new_reg){
			$regs_by_tkt[$new_reg['TKT_ID']][] = $new_reg;
		}
		
		//create individual line items
		
		foreach($regs_by_tkt as $ticket_id => $regs){
			$count = count($regs);
			$line_total = 0;
			foreach($regs as $new_reg){
				$line_total += $new_reg['REG_final_price'];
			}
			$a_reg = reset($regs);
			$new_ticket = $this->_get_new_ticket_row($a_reg['TKT_ID']);
			$reg_line_item_id = $this->_insert_new_line_item(array(
				'LIN_code'=> md5( 'Ticket' . $ticket_id . time() ),
				'TXN_ID'=>$transaction['TXN_ID'],
				'LIN_name'=>$new_ticket['TKT_name'],
				'LIN_unit_price'=>$a_reg['REG_final_price'],
				'LIN_is_taxable'=>false,
				'LIN_total'=>$line_total,
				'LIN_quantity'=>$count,
				'LIN_parent'=>$subtotal_line_item_id,
				'OBJ_ID'=>$ticket_id,
				'OBJ_type'=>'Ticket'
			),$old_attendee);
			$new_line_item_ids[] = $reg_line_item_id;
		}
		
			
		
		return $new_line_item_ids;
	}
	/**
	 * Gets the full ticket by ID
	 * @global type $wpdb
	 * @param type $new_ticket_id
	 * @return array
	 */
	private function _get_new_ticket_row($new_ticket_id){
		global $wpdb;
		$ticket_row = $wpdb->get_row($wpdb->prepare("SELECT * FROM ".$wpdb->prefix."esp_ticket WHERE TKT_ID=%d",$new_ticket_id),ARRAY_A);
		return $ticket_row;
	}
	
	private function _insert_new_line_item($cols_n_values,$old_attendee){
		global $wpdb;
		$default_cols_n_values = array(
			'LIN_code'=>'',
			'TXN_ID'=>0,
			'LIN_name'=>'',
			'LIN_desc'=>'',
			'LIN_unit_price'=>0,
			'LIN_percent'=>0,
			'LIN_is_taxable'=>false,
			'LIN_order'=>0,
			'LIN_total'=>0,
			'LIN_quantity'=>null,
			'LIN_parent'=>0,
			'LIN_type'=>'line-item',
			'OBJ_ID'=>null,
			'OBJ_type'=>null
		);
		$cols_n_values = array_merge($default_cols_n_values,$cols_n_values);
			$datatypes = array(
				'%s',//LIN_code
				'%d',//TXN_ID
				'%s',//LIN_name
				'%s',//LIN_desc
				'%f',//LIN_unit_price
				'%f',//LIN_percent
				'%d',//LIN_is_taxable
				'%d',//LIN_order
				'%f',//LIN_total
				'%d',//LIN_quantity
				'%d',//LIN_parent
				'%s',//LIN_type
				'%d',//OBJ_ID
				'%s',//OBJ_type
			);
			$success = $wpdb->insert($this->_new_line_table,$cols_n_values,$datatypes);
			if ( ! $success){
				$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_attendee, $this->_new_reg_table, $cols_n_values, $datatypes));
				return 0;
			}
			return $wpdb->insert_id;
			
	}
	
}