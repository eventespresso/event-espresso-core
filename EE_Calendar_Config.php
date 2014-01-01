<?php

/*
 * Settings for the calendar
 */
class EE_Calendar_Config extends EE_Config_Base{
	/**
	 *
	 * @var EE_Calendar_Config_Header
	 */
	public $header;
	/**
	 *
	 * @var EE_Calendar_Config_Button_Text
	 */
	public $button_text;
	/**
	 *
	 * @var EE_Calendar_Config_Tooltip
	 */
	public $tooltip;
	/**
	 *
	 * @var EE_Calendar_Config_Title_Format 
	 */
	public $title_format;
	/**
	 *
	 * @var EE_Calendar_Config_Column_Format
	 */
	public $column_format;
	/**
	 *
	 * @var EE_Calendar_Config_Time
	 */
	public $time;
	
	public $week_mode;
	public $calendar_height;
	public $enable_calendar_thumbs;
	public $enable_calendar_filters;
	public $use_pickers;
	public $event_background;
	public $event_text_color;
	public $enable_cat_classes;
	public $disable_categories;
	
	public $show_attendee_limit;
	
	public function __construct(){
		$this->header = new EE_Calendar_Config_Header();
		$this->button_text = new EE_Calendar_Config_Button_Text();
		$this->tooltip = new EE_Calendar_Config_Tooltip();
		$this->title_format = new EE_Calendar_Config_Title_Format();
		$this->column_format = new EE_Calendar_Config_Column_Format();
		$this->time = new EE_Calendar_Config_Time();
		$this->week_mode = 'liquid';//fixed, liquid, variable
		$this->calendar_height = '';
		$this->enable_calendar_thumbs = false;
		$this->enable_calendar_filters = false;
		$this->use_pickers = false;
		$this->event_background = '007BAE';
		$this->event_text_color = 'FFFFFF';
		$this->enable_cat_classes = false;
		$this->disable_categories = false;
		$this->show_attendee_limit = false;
	}
	
	/**
	 * 
	 * @return array one dimensional. All nested config classes properties are 
	 * 'flatened'. Eg, $this->tooltip->show becomes array key 'tooltip_show' in the newly
	 * formed array
	 */
	public function to_flat_array(){
		$flattened_vars = array();
		$properties = get_object_vars($this);
		foreach($properties as $name => $property){
			if($property instanceof EE_Config_Base){
				$sub_config_properties = get_object_vars($property);
				foreach($sub_config_properties as $sub_config_property_name => $sub_config_property){
					$flattened_vars[$name."_".$sub_config_property_name] = $sub_config_property;
				}
			}else{
				$flattened_vars[$name] = $property;
			}
		}
		return $flattened_vars;
	}
}
class EE_Calendar_Config_Time extends EE_Config_Base{
	public $first_day;
	public $weekends;
	public $format;
	public $show;
	public function __construct() {
		$this->first_day = '0';
		$this->weekends = true;
		$this->format = get_option('time_format');
		$this->show = true;
	}
}
class EE_Calendar_Config_Header  extends EE_Config_Base{
	public $left;
	public $center;
	public $right;
	public function __construct(){
		$this->left = 'prev, today';
		$this->center = 'title';
		$this->right = 'month, agendaWeek, agendaDay, next';
	}
}
class EE_Calendar_Config_Button_Text  extends EE_Config_Base{
	public $prev;
	public $next;
	public $prev_year;
	public $next_year;
	public $today;
	public $month;
	public $week;
	public $day;
	public function __construct(){
		$this->prev = '&lsaquo;';
		$this->next = '&rsaquo;';
		$this->prev_year = '&laquo;';
		$this->next_year = '&raquo;';
		$this->today = 'today';
		$this->month = 'month';
		$this->week = 'week';
		$this->day = 'day';
	}
}
class EE_Calendar_Config_Tooltip  extends EE_Config_Base{
	public $pos_my_1;
	public $pos_my_2;
	public $pos_at_1;
	public $pos_at_2;
	public $style;
	public $show;
	public $word_count;
	public function __construct(){
		$this->show = true;
		$this->pos_my_1 = 'bottom';
		$this->pos_my_2 = 'center';
		$this->pos_at_1 = 'center';
		$this->pos_at_2 = 'center';
		$this->style = 'qtip-light';
		$this->word_count = 50;
	}
}
class EE_Calendar_Config_Title_Format extends EE_Config_Base{
	public $month;
	public $week;
	public $day;
	public function __construct() {
		$this->month = 'MMMM yyyy';
		$this->week = 'MMM dS[ yyyy] - {[ MMM] dS yyyy}';
		$this->day = 'dddd, MMM dS, yyyy';
	}
}

class EE_Calendar_Config_Column_Format extends EE_Config_Base{
	public $month;
	public $week;
	public $day;
	public function __construct() {
		$this->month = 'ddd';
		$this->week = 'ddd M/d';
		$this->day = 'dddd M/d';
	}
}