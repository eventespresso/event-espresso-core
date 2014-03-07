<?php

/**
 * Converts 3.1's calendar options to a EE4's calendar config
 */
class EE_DMS_4_1_0_calendar_options extends EE_Data_Migration_Script_Stage{

	function _migration_step($num_items=50){

		$items_actually_migrated = 0;
		$old_org_options = get_option('espresso_calendar_options');
		//the option's name differened depending on the version of the calendar
		if( ! $old_org_options){
			$old_org_options = get_option('espresso_calendar_settings');
		}
		foreach($this->_org_options_we_know_how_to_migrate as $option_name){
			//only bother migrating if there's a setting to migrate. Otherwise we'll just use the default
			if(isset($old_org_options[$option_name])){
				$this->_handle_org_option($option_name, $old_org_options[$option_name]);
			}
			$items_actually_migrated++;
		}

		EE_Config::instance()->update_espresso_config(false,false);
		if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
			$this->set_completed();
		}
		return $items_actually_migrated;
	}
	function _count_records_to_migrate() {
		$count_of_options_to_migrate = count($this->_org_options_we_know_how_to_migrate);
		return $count_of_options_to_migrate;
	}
	function __construct() {
		$this->_pretty_name = __("Calendar Options", "event_espresso");
		$this->_org_options_we_know_how_to_migrate = apply_filters( 'FHEE__EE_DMS_4_1_0_calendaring_options__org_options_we_know_how_to_migrate',$this->_org_options_we_know_how_to_migrate );
		parent::__construct();
	}

	private function _handle_org_option($option_name,$value){
		if(isset(EE_Config::instance()->addons['calendar']) && EE_Config::instance()->addons['calendar'] instanceof EE_Calendar_Config){
			$c = EE_Config::instance()->addons['calendar'];
		}else{
			$c = new EE_Calendar_Config();
			EE_Config::instance()->addons['calendar'] = $c;
		}
		/* @var $c EE_Calendar_Config */
		switch($option_name){
			
			case 'header_left':	$c->header->left = $value;break;
			case 'header_center':$c->header->center = $value;break;
			case 'header_right': $c->header->right = $value;break;

			case 'buttonText_prev':$c->button_text->prev = $value;break;
			case 'buttonText_next':$c->button_text->next = $value;break;
			case 'buttonText_prevYear':$c->button_text->prev_year = $value;break;
			case 'buttonText_nextYear':$c->button_text->next_year = $value;break;
			case 'buttonText_today':$c->button_text->today = $value;break;
			case 'buttonText_month': $c->button_text->month = $value; break;
			case 'buttonText_week': $c->button_text->week = $value; break;
			case 'buttonText_day': $c->button_text->day = $value; break;

			case 'firstDay': $c->time->first_day = intval($value); break;
			case 'weekends': $c->time->weekends = $value; break;
			case 'weekMode': $c->time->week_mode = $value; break; 
			case 'espresso_calendar_height': $c->display->calendar_height = $value; break;
			case 'enable_calendar_thumbs': $c->display->enable_calendar_thumbs = $value; break;
			case 'enable_calendar_filters': $c->display->enable_calendar_filters = $value;break;

			case 'show_tooltips': $c->tooltip->show = $value;break;
			case 'tooltips_pos_my_1': $c->tooltip->pos_my_1 = $value;break;
			case 'tooltips_pos_my_2': $c->tooltip->pos_my_2 = $value;break;
			case 'tooltips_pos_at_1': $c->tooltip->pos_at_1 = $value;break;
			case 'tooltips_pos_at_2': $c->tooltip->pos_at_2 = $value;break;
			case 'tooltip_style': $c->tooltip->style = $value;break;

			case 'espresso_use_pickers': $c->display->use_pickers = $value;break;
			case 'ee_event_background': $c->display->event_background = $value;break;
			case 'ee_event_text_color': $c->display->event_text_color = $value;break;
			case 'enable_cat_classes': $c->display->enable_cat_classes = $value;break;
			case 'time_format': $c->time->format = $value;break;
			case 'show_time': $c->time->show = $value;break;

			case 'disable_categories': $c->display->disable_categories = $value;break;
			case 'show_attendee_limit': $c->display->show_attendee_limit = $value;break;

			case 'titleFormat_month': $c->title_format->month = $value;break; 
			case 'titleFormat_week': $c->title_format->week = $value;break; 
			case 'titleFormat_day': $c->title_format->day = $value;break;

			case 'columnFormat_month': $c->column_format->month = $value;break;
			case 'columnFormat_week': $c->column_format->week = $value;break;
			case 'columnFormat_day': $c->column_format->day = $value;break;
			default:
			  do_action( 'AHEE__EE_DMS_4_1_0__handle_org_option',$option_name,$value );
		}
	}
	
	protected $_org_options_we_know_how_to_migrate = array(
'header_left',
'header_center',
'header_right',

'buttonText_prev',
'buttonText_next',
'buttonText_prevYear',
'buttonText_nextYear',
'buttonText_today',
'buttonText_month',
'buttonText_week',
'buttonText_day',

'firstDay',
'weekends',
'weekMode', 
'espresso_calendar_height',
'enable_calendar_thumbs',
'enable_calendar_filters',

'show_tooltips',
'tooltips_pos_my_1',
'tooltips_pos_my_2',
'tooltips_pos_at_1',
'tooltips_pos_at_2',
'tooltip_style',
'tooltip_word_count',

'espresso_use_pickers',
'ee_event_background',
'ee_event_text_color',
'enable_cat_classes',
'time_format',
'show_time',

'disable_categories',
'show_attendee_limit',

'titleFormat_month', 
'titleFormat_week', 
'titleFormat_day',

'columnFormat_month',
'columnFormat_week',
'columnFormat_day');
}
