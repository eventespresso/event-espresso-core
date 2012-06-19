// reg admin registrations per event report
(function($) {
	$(document).ready(function(){	

		$.jqplot( regPerEvent.id, [regPerEvent.regs], {
			title: regPerEvent.title,
			animate: !$.jqplot.use_excanvas,
			seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true, location: 'n', sizeAdjust:5 },
           		rendererOptions: { varyBarColor: true, barWidth: regPerEvent.width }				
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
					max: regPerEvent.ymax,
					tickOptions: {
						formatString:'%.0f'
					}
				}
			},
	        highlighter: { show: false }
		});
		
	});

})(jQuery);