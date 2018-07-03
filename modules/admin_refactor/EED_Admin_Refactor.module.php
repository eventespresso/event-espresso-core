<?php

/**
 * @package        Event Espresso
 * @subpackage     /modules/admin_refactor/
 * @author         Brent Christensen
 */
class EED_Admin_Refactor extends EED_Module
{


    /**
     * @var WP_Post $post
     */
    private $post;

    /**
     * @var EE_Event $event
     */
    private $event;


    /**
     * @return EED_Module|EED_Admin_Refactor
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks()
    {
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        add_action('add_meta_boxes_espresso_events', array('EED_Admin_Refactor', 'add_meta_boxes'));
    }

    /**
     * run - initial module setup
     * this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
     *
     * @var WP $WP
     * @return void
     */
    public function run($WP)
    {
        // TODO: Implement run() method.
    }

    /**
     * @return void
     */
    public static function add_meta_boxes(WP_Post $post)
    {
        $admin_refactor = EED_Admin_Refactor::instance();
        $admin_refactor->post = $post;
        add_meta_box(
            'admin-refactor-meta-box',
            '<span class="dashicons dashicons-calendar"></span>' . esc_html__('Event Dates', 'event_espresso'),
            array($admin_refactor, 'adminRefactorMetaBox'),
            'espresso_events',
            'normal',
            'high'
        );
    }

    public function adminRefactorMetaBox()
    {
        $this->event = EEM_Event::instance()->get_one_by_ID($this->post->ID);
        echo '
<div id="ee-editor-dates-metabox" class="ee-editor-metabox" style="margin:20px 10px 10px 10px;">
    ' . $this->dateFilters() . $this->displayDates($this->event) . $this->metaboxFooter() . '                
    <div style="clear:both;"></div>
</div>
<script>
    function resetEspressoDateDivHeights() {
      let maxHeight = 0;
      let divHeight = 0;
      $( ".ee-editor-date-outer-div" ).each(function() {
           divHeight = $(this).outerHeight();
           maxHeight = maxHeight < divHeight ? divHeight : maxHeight;
        });
      maxHeight = maxHeight + 10;
      maxHeight = maxHeight + "px";
      $( ".ee-editor-date-div" ).css("height", maxHeight);
    }
    $(".ee-toggle-menu").on("click", function() {
        const menuID = "#" + this.dataset.menu;
        if ($(menuID).css("display") === "none") {
            $(menuID).fadeIn(50);
        } else {
            $(menuID).fadeOut(100);
        }
    });
    $("#ee-editor-date-filters-show-div").on("change", function() {
        const show = $(this).val();
        let count = 0;
        $( ".ee-editor-date-div" ).each(function() {
          const isActive = $(this).hasClass("ee-datetime-active") || 
                  $(this).hasClass("ee-datetime-upcoming") || 
                  $(this).hasClass("ee-datetime-sold-out");
          switch(show) {
            case "active" :
                if ( isActive ) {
                    $(this).fadeIn(50);
                } else {
                    $(this).fadeOut(100);
                }
              break;
            case "next" :
                if ( count === 0 && isActive ) {
                    $(this).fadeIn(50);
                    count++;
                } else {
                    $(this).fadeOut(100);
                }
              break;
            case "expired" :
                $(this).fadeIn(50);
              break;
          }
        });
        setTimeout(resetEspressoDateDivHeights, 150);
    });
    $("#ee-editor-date-filters-start-end-select").on("change", function() {
//      console.log("show end date: " + $(this).val() );
      if ($(this).val() === "end") {
            $(".ee-editor-date-cal-end-date-div").fadeIn(50);
        } else {
            $(".ee-editor-date-cal-end-date-div").fadeOut(100);
        }
        setTimeout(resetEspressoDateDivHeights, 150);
    });
    $("#ee-editor-date-filters-venue-select").on("change", function() {
//        console.log("show venue: " + $(this).val() );
      if ($(this).val() === "yes") {
            $(".ee-editor-date-location-div").fadeIn(50);
        } else {
            $(".ee-editor-date-location-div").fadeOut(100);
        }
        setTimeout(resetEspressoDateDivHeights, 150);
    });
        setTimeout(resetEspressoDateDivHeights, 150);
</script>
        ';
    }

    public function dateFilters()
    {
        return '
    <div id="ee-editor-date-filters-div" style="background: #e7e6e4; color: #4f5c5d; font-size: 16px; font-weight: bold; margin:0 0 20px; padding:10px 20px; text-shadow: 1px 1px rgba(255,255,255,.75); vertical-align: middle;">
        <div id="ee-editor-date-filters-next-div" style="float:left; margin-right: 30px;">
            <span style="padding:15px 10px 0 0;">' . esc_html__('show', 'event_espresso') . '</span>
            <select id="ee-editor-date-filters-show-div" style="font-weight: normal;">
                <option value="active" selected>' . esc_html__('all active and upcoming', 'event_espresso') . '</option>
                <option value="next">' . esc_html__('next active or upcoming only', 'event_espresso') . '</option>
                <option value="expired">' . esc_html__('all dates including expired', 'event_espresso') . '</option>
            </select>
        </div>
        <div id="ee-editor-date-filters-order-div" style="float:left; margin-right: 30px;">
            <span style="padding:15px 10px 0 0;">' . esc_html__('order dates', 'event_espresso') . '</span>
            <select style="font-weight: normal;">
                <option value="chrono" selected>' . esc_html__('chronologically', 'event_espresso') . '</option>
                <option value="alpha">' . esc_html__('alphabetically', 'event_espresso') . '</option>
                <option value="custom">' . esc_html__('by custom order', 'event_espresso') . '</option>
            </select>
        </div>
        <div id="ee-editor-date-filters-start-end-div" style="float:left; margin-right: 30px;">
            <span style="padding:15px 10px 0 0;">' . esc_html__('display dates', 'event_espresso') . '</span>
            <select id="ee-editor-date-filters-start-end-select" style="font-weight: normal;">
                <option value="start" selected>' . esc_html__('start dates only', 'event_espresso') . '</option>
                <option value="end">' . esc_html__('start and end dates', 'event_espresso') . '</option>
            </select>
        </div>
        <div id="ee-editor-date-filters-venue-div" style="float:left; margin-right: 30px;">
            <span style="padding:15px 10px 0 0;">' . esc_html__('display venue', 'event_espresso') . '</span>
            <select id="ee-editor-date-filters-venue-select" style="font-weight: normal;">
                <option value="yes">' . esc_html__('yes', 'event_espresso') . '</option>
                <option value="no" selected>' . esc_html__('no', 'event_espresso') . '</option>
            </select>
        </div>
        <div style="clear:both;"></div>
    </div>
';
    }

    public function metaboxFooter()
    {
        return '
<div class="ee-editor-dates-metabox-footer-div" style="clear:both;">
    <div class="ee-editor-dates-legend-div" style="color: #999; float: left; position: relative; bottom:-15px;">
        <div style="display: inline-block; float: left; margin:0 20px 0 0; position: relative;">
            <div style="background: #93b343; display: inline-block; height: 20px; position: relative; bottom:-5px; width: 20px;"></div>
            <span style="">' . esc_html__('active', 'event_espresso') . '</span>
        </div>
        <div style="display: inline-block; float: left; margin:0 20px 0 0;">
            <div style="background: #3297c3; display: inline-block; height: 20px; position: relative; bottom:-5px; width: 20px;"></div>
            <span style="">' . esc_html__('upcoming', 'event_espresso') . '</span>
        </div>
        <div style="display: inline-block; float: left; margin:0 20px 0 0;">
            <div style="background: #f8ae00; display: inline-block; height: 20px; position: relative; bottom:-5px; width: 20px;"></div>
            <span style="">' . esc_html__('sold out', 'event_espresso') . '</span>
        </div>
        <div style="display: inline-block; float: left; margin:0 20px 0 0;">
            <div style="background: #a0a5a5; display: inline-block; height: 20px; position: relative; bottom:-5px; width: 20px;"></div>
            <span style="">' . esc_html__('expired', 'event_espresso') . '</span>
        </div>
    </div>
    <div class="ee-editor-dates-add-datetime-button-div" style="background-color: #93b343; border-radius:5px; color: #fff; cursor: pointer; display: inline-block; float: right; font-size: 18px; font-weight: bold; padding:10px 20px 10px 10px; box-shadow: 0 3px 3px rgba(0,0,0,.5)" onMouseOver="document.getElementById(\'ee-add-datetime-button-plus\').style.color=\'rgba(255,255,255,1)\'"
   onMouseOut="document.getElementById(\'ee-add-datetime-button-plus\').style.color=\'rgba(255,255,255,.75)\'">
        <span id="ee-add-datetime-button-plus" class="dashicons dashicons-plus" style="color: rgba(255,255,255,.75); font-size:24px; font-weight: normal; line-height: 15px; top:0;"></span>' . esc_html__('Add Datetime', 'event_espresso') . '
    </div>
    <div style="clear:both;"></div>
</div>
        ';
    }

    public function displayDates(EE_Event $event)
    {
        $output = '';
        $datetimes = $event->datetimes_in_chronological_order();
        foreach ($datetimes as $datetime) {
            $output .= $this->displayDate($datetime);
        }
        return $output;
    }

    public function displayDate(EE_Datetime $datetime)
    {
        switch ($datetime->get_active_status()) {
            case EE_Datetime::active :
                $bg = '#93b343'; // 70CC50 93b343
                $class = 'ee-datetime-active';
                break;
            case EE_Datetime::expired :
                $bg = '#a0a5a5'; // AC9D9C a0a5a5
                $class = 'ee-datetime-expired';
                break;
            case EE_Datetime::sold_out :
                $bg = '#f8ae00'; // E44064 f06291 f7d500 f8c600 c52e75 f8ae00
                $class = 'ee-datetime-sold-out';
                break;
            case EE_Datetime::upcoming :
                $bg = '#3297c3'; // 00B1CA 3297c3
                $class = 'ee-datetime-upcoming';
                break;
        }
        return '
    <div id="ee-editor-date-div-' . $datetime->ID() . '" class="ee-editor-date-div ' . $class . '" style="float:left; margin:0 20px 0 0; height: 160px; width:420px;">
        <div class="ee-editor-date-outer-div" style="background: ' . $bg . '; color: #fff; margin: 0; padding: 10px; position:relative; box-sizing: border-box; width:420px;">
            <div class="ee-editor-date-inner-div">' .
                $this->calendarPageDateDisplay($datetime) .
                $this->dateDetails($datetime) . '
                <div style="clear:both;"></div>
            </div>
        </div>
    </div>
        ';
    }


    public function calendarPageDateDisplay(EE_Datetime $datetime)
    {
        $start_date = $datetime->start_date('Y-m-d');
        $end_date = $datetime->end_date('Y-m-d');
        $output = '
        <div class="ee-editor-date-cal-page-div" style="float: left; margin:0 20px 0 0; min-height: 77px;">
            <div class="ee-editor-date-cal-start-div" style="box-sizing: border-box; font-size: 18px; font-weight:bold; height:62px; line-height: 24px; text-align: center; width:60px;">
                <div class="ee-editor-date-cal-page-month-div" style="background:rgba(0,0,0,.1); border:1px solid rgba(255,255,255,.25); border-bottom:0 solid #fff; color: #fff; height:30px;">
                    ' . $datetime->start_date('M') . '
                </div>
                <div class="ee-editor-date-cal-page-day-div" style="background: #fff; border:1px solid #fff; border-top:0 solid #fff; color: #333; height:30px;">
                    ' . $datetime->start_date('d') . '                
                </div>
            </div>
        ';
        if($start_date !== $end_date) {
            $output .= '
            <div class="ee-editor-date-cal-end-date-div" style="display:none;">
                <div class="ee-editor-date-cal-page-to-div" style="color:rgba(255,255,255,.75); position: relative; top:1px; left: 25px; font-size: 8px; letter-spacing: 1px; line-height: 12px;">
                    ' . esc_html__('TO', 'event_espresso') . '
                </div>
                <div class="ee-editor-date-cal-page-end-div" style="box-sizing: border-box; font-size: 18px; font-weight:bold; height:62px; line-height: 24px; text-align: center; width:60px;">
                    <div class="ee-editor-date-cal-page-month-div" style="background:rgba(0,0,0,.1); border:1px solid rgba(255,255,255,.25); border-bottom:0 solid #fff; color: #fff; height:30px;">
                        ' . $datetime->end_date('M') . '
                    </div>
                    <div class="ee-editor-date-cal-page-day-div" style="background: #fff; border:1px solid #fff; border-top:0 solid #fff; color: #333; height:30px;">
                        ' . $datetime->end_date('d') . '                
                    </div>
                </div>
            </div>
            ';
        }
        /*$output .='
        <div class="ee-editor-date-extras-div" style="color:rgba(255,255,255,.75); font-size: 14px; line-height: 18px; position: absolute; left: 10px; top: 90px; width:70px;">
            <div class="ee-editor-date-extras-dates-div" style="float: left;">
                <span class="dashicons dashicons-calendar"></span>
            </div>
            <div class="ee-editor-date-extras-times-div" style="float: left;">
                <span class="dashicons dashicons-clock"></span>
            </div>
            <div class="ee-editor-date-extras-tickets-div" style="float: left;">
                <span class="dashicons dashicons-tickets"></span>
            </div>
        </div>';*/
        $output .= '</div>';
        return $output;
    }

    public function dateDetails(EE_Datetime $datetime)
    {
        $output = '<div class="ee-editor-date-details-div" style="font-size: 16px;">';
        if($datetime->name() !== '') {
            $output .= '
                <h4 class="ee-editor-date-name-h4" style="margin:0 26px 15px 0; line-height:20px; font-weight:bold; min-height: 20px; max-height: 40px; overflow: hidden; text-overflow: ellipsis; text-shadow: -1px -1px rgba(0,0,0,.25);">
                ' . $datetime->name() . '
                </h4>
                ';
        }
        $output .= $this->dateMenu($datetime);
        /** @var EE_Venue[] $venues */
        $venues = $this->event->venues();
        $venue = reset($venues);
        if ($venue instanceof EE_Venue) {
            $output .= '
                <div class="ee-editor-date-location-div" style="display: none; font-size: 14px; margin:0 0 15px;">
                    <span class="dashicons dashicons-location" style="margin-bottom:-2px;"></span>' . $venue->name() . '
                </div>
                ';
        }
        $output .= $this->dateSoldReservedCapacity($datetime);
        $output .= '</div>';
        return $output;
    }

    public function dateSoldReservedCapacity(EE_Datetime $datetime)
    {
        $reg_list_url = EE_Admin_Page::add_query_args_and_nonce(
            array('event_id' => $datetime->event()->ID(), 'datetime_id' => $datetime->ID()),
            REG_ADMIN_URL
        );
        return '
        <div class="ee-editor-date-details-sold-rsrvd-cap-div" style="font-size: 21px; line-height: 21px; height: 42px; text-align: center;">
            <div class="ee-editor-date-details-sold-div" style="display: inline-block; padding: 0 5px;">
                <div class="ee-editor-date-details-sold-qty-div" style="">
                ' . $datetime->sold() . '
                </div>
                <div class="ee-editor-date-details-sold-label-div" style="color:rgba(255,255,255,.75); font-size: 10px; letter-spacing: 1px;">
                ' . esc_html__('sold', 'event_espresso') . '
                </div>
            </div>
            <div class="sep" style="border:0 solid rgba(255,255,255,0); border-left:1px solid rgba(255,255,255,.25); display: inline-block;  height: 40px; margin: 0 5px;"></div>
            <div class="ee-editor-date-details-reserved-div" style="display: inline-block; padding: 0 5px;">
                <div class="ee-editor-date-details-reserved-qty-div" style="text-align: center;">
                ' . $datetime->reserved() . '
                </div>
                <div class="ee-editor-date-details-reserved-label-div" style="color:rgba(255,255,255,.75); font-size: 10px; letter-spacing: 1px;">
                ' . esc_html__('reserved', 'event_espresso') . '
                </div>
            </div>
            <div class="sep" style="border:0 solid rgba(255,255,255,0); border-left:1px solid rgba(255,255,255,.25);display: inline-block;  height: 40px; margin: 0 5px;"></div>
            <div class="ee-editor-date-details-capacity-div" style="display: inline-block; padding: 0 5px;">
                <div class="ee-editor-date-details-capacity-qty-div" style="text-align: center;">
                ' . ($datetime->reg_limit() === INF ? '<span class="ee-infity" style="font-size:24px;">&infin;</span>' : $datetime->reg_limit()) . '
                </div>
                <div class="ee-editor-date-details-capacity-label-div" style="color:rgba(255,255,255,.75); font-size: 10px; letter-spacing: 1px;">
                ' . esc_html__('capacity', 'event_espresso') . '
                </div>
            </div>
            <div class="sep" style="border:0 solid rgba(255,255,255,0); border-left:1px solid rgba(255,255,255,.25);display: inline-block;  height: 40px; margin: 0 5px;"></div>
            <div class="ee-editor-date-details-capacity-div" style="display: inline-block; padding: 0 5px;">
                <div class="ee-editor-date-details-capacity-qty-div" style="">
                    <a href="' . $reg_list_url . '" title="' . esc_html__('View registrations for this datetime.', 'event_espresso') . '" style="color: #fff; text-decoration: none;" target="_blank">
                        <span class="dashicons dashicons-groups clickable"></span>
                    </a>
                </div>
                <div class="ee-editor-date-details-capacity-label-div" style="color:rgba(255,255,255,.75); font-size: 10px; letter-spacing: 1px;">
                ' . esc_html__('registrations', 'event_espresso') . ' <span class="dashicons dashicons-external"></span>
                </div>
            </div>
        </div>
        ';
    }


    public function dateMenu(EE_Datetime $datetime)
    {
        /** @var EE_Venue[] $venues */
        $venues = $this->event->venues();
        $venue = reset($venues);
        if ($venue instanceof EE_Venue) {
            $edit_venue = EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'edit', 'post' => $venue->ID()),
                EE_VENUES_ADMIN_URL
            );
        } else {
            $edit_venue = EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'create_new', 'page' => 'espresso_venues'),
                EE_VENUES_ADMIN_URL
            );
        }

        return '
        <div class="ee-editor-date-menu-wrapper-div" style="font-size: 30px;line-height: 30px; font-weight: normal; position: absolute; right:10px; top: 5px;">
            <div class="ee-editor-date-menu-div" style="font-size: 16px;line-height: 32px; font-weight: normal; position: absolute; right:0; top: -5px;">
                <span class="dashicons dashicons-menu ee-toggle-menu clickable" data-menu="ee-editor-date-menu-dropdown-div-' . $datetime->ID() . '" style="margin:0; cursor: pointer;"></span>
                <div id="ee-editor-date-menu-dropdown-div-' . $datetime->ID() . '" class="ee-editor-date-menu-dropdown-div" style="display: none; padding:20px 20px 10px; background-color: #fff; color:#666; border-radius: 3px; text-shadow: none; position: absolute; right:-11px; top:-1px; width:140px; z-index:999; box-shadow: 0 3px 5px rgba(0,0,0,.5), 0 0 20px 10px rgba(0,0,0,.1);">
                    <!--close menu-->
                    <div class="ee-editor-date-menu-dropdown-close-menu-div" style="color: #ccc; margin:0; position: absolute; right:1px; top:1px;">
                        <span class="dashicons dashicons-no ee-toggle-menu clickable" data-menu="ee-editor-date-menu-dropdown-div-' . $datetime->ID() . '"></span>
                    </div>
                    <div class="ee-editor-date-menu-dropdown-edit-venue-div" style="margin:0 0 10px;">
                        <a href="' . $edit_venue . '" title="' . esc_html__('edit venue', 'event_espresso') . '" style="color: #666; text-decoration: none;" target="_blank">
                            <span class="dashicons dashicons-location" style="margin-bottom:-2px;"></span>
                            ' . esc_html__('edit venue', 'event_espresso') . ' 
                            <span class="dashicons dashicons-external" style="color:#ccc;"></span>
                        </a>
                    </div>
                    <div class="ee-editor-date-menu-dropdown-edit-div" style="margin:0 0 10px;">
                        <span class="clickable">
                            <span class="dashicons dashicons-edit"></span>
                            ' . esc_html__('edit date', 'event_espresso') . '
                        </span>
                    </div>
                    <div class="ee-editor-date-menu-dropdown-copy-div" style="margin:0 0 10px;">
                        <span class="clickable">
                            <span class="dashicons dashicons-admin-page"></span>
                            ' . esc_html__('copy date', 'event_espresso') . '
                        </span>
                    </div>
                    <div class="ee-editor-date-menu-dropdown-trash-div" style="margin:0 0 10px;">
                        <span class="clickable">
                            <span class="dashicons dashicons-trash"></span>
                            ' . esc_html__('trash date', 'event_espresso') . '
                        </span>
                    </div>
                </div>
            </div>
        </div>
        ';
    }


}