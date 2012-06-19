// reg admin registrations per day report
(function($) {
	$(document).ready(function(){	

		$.jqplot( regPerDay.id, [regPerDay.regs], {
			title: regPerDay.title,
			animate: !$.jqplot.use_excanvas,
			seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				pointLabels: { show: true, location: 'n' },
				rendererOptions: { 
					varyBarColor: true, 
					barWidth: regPerDay.width
				}				
			},
			axes: {
				xaxis: { 
					renderer: $.jqplot.DateAxisRenderer,
					tickRenderer: $.jqplot.CanvasAxisTickRenderer,
					min: regPerDay.xmin, 
					max: regPerDay.xmax,
	                	pad: 0,
					numberTicks: regPerDay.span,
					syncTicks: true,
	                	tickOptions: {
						formatString: "%a %b %e %y",
                    		angle: -45
					}
				},
				yaxis: {
					min: 0, 
					max: regPerDay.ymax,
					tickOptions: {
						formatString:'%.0f'
					}
				}
			},
	        highlighter: { show: false }
		});
		
	});
})(jQuery);