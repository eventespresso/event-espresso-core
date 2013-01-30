// txn admin revenue per event report
jQuery(document).ready(function($) {

	$.jqplot( revenuePerEvent.id, [revenuePerEvent.revenue], {
		title: revenuePerEvent.title,
		animate: !$.jqplot.use_excanvas,
		seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            pointLabels: { show: true, location: 'n', sizeAdjust:5 },
       		rendererOptions: { varyBarColor: true, barWidth: revenuePerEvent.width }				
        },
		axes: {
			xaxis: { 
				renderer: $.jqplot.CategoryAxisRenderer,
				tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                	pad: 0,
                	tickOptions: {
                	angle: -45
                }
			},
			yaxis: {
				min: 0, 
				tickOptions: {
					formatString:"$%'.2f"
				}
			}
		},
        highlighter: { show: false }
	});
	
});