		
jQuery(document).ready(function() {

// Add class 'selected' to visual-toggle for email confirmation postbox
// Add class to postbox for further styling hook
jQuery("div.visual-toggle p a.toggleVisual").addClass('selected');
jQuery("div.visual-toggle p a.toggleHTML").click(
		function(){
			jQuery(this).parent("p").children("a.toggleHTML").addClass('selected');
			jQuery(this).closest("div.visual-toggle").next(".postbox").addClass('visHTML');
			jQuery(this).parent("p").children("a.toggleVisual").removeClass('selected');
			});
	jQuery("div.visual-toggle p a.toggleVisual").click(
		function() {
			jQuery(this).parent("p").children("a.toggleHTML").removeClass('selected');
			jQuery(this).closest("div.visual-toggle").next(".postbox").removeClass('visHTML');
			jQuery(this).parent("p").children("a.toggleVisual").addClass('selected');
			});
	// add or remove the mce editor 
	jQuery('a.toggleVisual').click(
		function() {
		var id = jQuery(this).closest('div.visual-toggle').next('div.postbox').children('textarea').attr('id');
		//alert( id );
			tinyMCE.execCommand('mceAddControl', false, id);
		}
	);

	jQuery('a.toggleHTML').click(
		function() {
		var id = jQuery(this).closest('div.visual-toggle').next('div.postbox').children('textarea').attr('id');
			tinyMCE.execCommand('mceRemoveControl', false, id);
		}
	);
});

//Confirm Delete
 	function confirmDelete(){
 if (confirm('Are you sure want to delete?')){
      return true;
    }
    return false;
  }
	  
//Select All
  function selectAll(x) {
for(var i=0,l=x.form.length; i<l; i++)
if(x.form[i].type == 'checkbox' && x.form[i].name != 'sAll')
x.form[i].checked=x.form[i].checked?false:true
}


/*
 * Pluralink - easy multilinking. 
 * http://pluralink.com/
*/

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('4 3={7:{n:m,o:"",1S:2d,2e:N.L.H().M(\'2c\')>-1,2b:N.L.H().M(\'29\')>-1,2a:N.L.H().M(\'2f\')>-1,2g:N.L.H().M(\'2l\')>-1,u:N.L.H().M(\'2h\')>-1,a:8.C(\'28\'),1m:/\\|\\|/,S:/\\%1D\\%1D/,1O:0},27:d(1C){3.7.a.f(\'1Y\',1C);3.7.a.1X()},3:d(b){G m},1N:d(b){4 W=0;4 T=0;4 w=b.1Z;4 h=b.25;9(26(b.1A)!=\'1I\'){1o(4 1f=0,1a=0;b;b=b.1A){1f+=b.24;1a+=b.23}W=1f;T=1a}j{W=b.x;T=b.y}G{1c:W,D:T,12:h,Z:w}},1y:d(){4 w=0;4 h=0;9(!q.1F){9(!(8.K.1e==0)){w=8.K.1e;h=8.K.1B}j{w=8.p.1e;h=8.p.1B}}j{w=q.1F;h=q.2E}G{Z:w,12:h}},I:d(e){4 Y=0;4 X=0;9(!e)4 e=q.1j;9(e.1G||e.1L){Y=e.1G;X=e.1L}j 9(e.1K||e.1z){Y=e.1K+8.p.1J+8.K.1J;X=e.1z+8.p.1M+8.K.1M}3.1x=Y;3.1w=X},1k:d(b){4 g=b.g.E(3.7.1m);9(g.v<2){g=b.g.E(3.7.S)}3.7.o=b.2p("O");b.f("O","");9(3.7.o!=1U){4 1s=3.7.o.E(/\\|\\|/)}4 13=3.1N(b);4 6=8.1h("3-B");4 F=8.1h("3-1T");F.s="";4 1g=J;1o(c=0;c<g.v;c++){9(3.7.o){4 Q="<a g=\'"+g[c]+"\'>"+1s[c]+"</a>"}j{4 Q="<a g=\'"+g[c]+"\'>"+g[c]+"</a>"}9(1g){F.s=Q;1g=m}j{F.s=F.s+"<2u />"+Q}}9(6.l.t!=="1d"){4 A=3.1x-20;4 1b=3.1w+5;4 16=3.1y();9((16.Z-1q)<A){A=(16.Z-1q)}9(3.7.u){9(8.p.l.1r){4 17=8.p.l.1r}j{4 17=15}4 2A=13.D+13.12+17;6.l.t="1d";6.l.1P="1R";6.l.1c=A+\'10\';6.l.D=1b+\'10\';6.2C=\'3-B\'}j{6.f(\'l\',\'t: 1d; 1P: 1R; 1c: \'+A+\'10; D: \'+1b+\'10;\');6.f(\'2t\',\'3-B\')}}3.7.n=J},1i:d(b){3.7.n=m;9(3.7.o!=1U){b.f("O",3.7.o)}j{b.f("O","")}},1Q:d(){9(!3.7.n){4 6=8.1h("3-B");9(3.7.u){6.l.t="19"}j{9(6){6.f(\'l\',\'t: 19;\')}}}},P:d(){3.7.1O=q.2r(3.1Q,3.7.1S);4 6=8.C(\'6\');6.f(\'V\',\'3-B\');6.f(\'l\',\'t: 19;\');9(3.7.u){6.U(\'1H\',d(){3.7.n=J});6.U(\'1v\',d(){3.7.n=m})}j{6.f(\'1u\',\'3.7.n = J;\');6.f(\'1t\',\'3.7.n = m;\')}4 11=8.C(\'6\');11.f(\'V\',\'3-D\');4 14=8.C(\'6\');14.f(\'V\',\'3-1T\');4 18=8.C(\'6\');18.f(\'V\',\'3-2n\');6.R(11);6.R(14);6.R(18);8.p.R(6);4 1p=8.2s("a");1o(4 c=0;c<1p.v;c++){4 k=1p[c];4 z=k.g.E(3.7.1m);9(z.v<2){z=k.g.E(3.7.S)}9(z.v>1){k.g=k.g.2o(3.7.S,\'||\');4 1l=k.s;9(1l.2z(/^\\<2q /i)==-1){k.s=1l+"<1W l=\'2v-2w: 0.2x;\'>["+z.v+"]</1W>"}9(3.7.u){k.2B=d(){3.3(r);G m};k.1H=d(){3.I(1j);3.1k(r)};k.1v=d(){3.1i(r)}}j{k.f(\'2y\',\'3.3(r); G m;\');k.f(\'1u\',\'3.I(1j);3.1k(r);\');k.f(\'1t\',\'3.1i(r);\')}}}}};d 1V(){9(1E==1I){9(8.1n){q.1n("2D",3.I,m);8.1n("2i",3.P,m)}j 9(8.U){3.7.u=J;8.22=3.I;8.U("21",d(){9(8.2j==="2k"){3.P()}})}}j{1E(8).2m(d(){3.P()})}}1V();',62,165,'|||pluralink|var||div|pluralinkOptions|document|if||obj||function||setAttribute|href|||else|el|style|false|pluralinkOver|pluralinkOldTitle|body|window|this|innerHTML|display|is_ie|length||||hr|leftpos|overlay|createElement|top|split|content|return|toLowerCase|getMouseXY|true|documentElement|userAgent|indexOf|navigator|title|init|text|appendChild|pattern_entity|curtop|attachEvent|id|curleft|posy|posx|width|px|divtop|height|pos|divbg||ws|marg|divbottom|none|posY|toppos|left|block|clientWidth|posX|first|getElementById|pluralink_out|event|pluralink_over|innertext|pattern_normal|addEventListener|for|elements|264|marginTop|titles|onMouseOut|onMouseOver|onmouseout|mousey|mousex|windowSize|clientY|offsetParent|clientHeight|link|7C|jQuery|innerWidth|pageX|onmouseover|undefined|scrollLeft|clientX|pageY|scrollTop|pluralink_findPos|interval|position|pluralink_hideDiv|absolute|hideInterval|bg|null|pluralink_init|sup|submit|action|offsetWidth||onreadystatechange|onmousemove|offsetTop|offsetLeft|offsetHeight|typeof|pluralink_open|form|safari|is_firefox|is_safari|chrome|500|is_chrome|firefox|is_opera|msie|DOMContentLoaded|readyState|complete|opera|ready|bottom|replace|getAttribute|img|setInterval|getElementsByTagName|class|br|font|size|7em|onClick|search|styletop|onclick|className|mousemove|innerHeight'.split('|'),0,{}))


$jaer = jQuery.noConflict();
jQuery(document).ready(function($jaer) {
	
    //This is to switch the emails in the admin question groups display
	$jaer("#show-question-group-self a").click( function() {
        $jaer("#question-group-all").hide();
		$jaer("#question-group-self").show();
        $jaer('#show-question-group-self').addClass('selected');
        $jaer('#show-question-group-all').removeClass('selected');
	});
	$jaer("#show-question-group-all a").click( function() {
        $jaer("#question-group-self").hide();
		$jaer("#question-group-all").show();
        $jaer('#show-question-group-all').addClass('selected');
        $jaer('#show-question-group-self').removeClass('selected');
	});
	$jaer("#registration_start").change( function() {
		if ($jaer("#recurrence_regis_start_date").length > 0){
			$jaer("#recurrence_regis_start_date").val($jaer("#registration_start").val());
		}							
	});
	$jaer("#registration_end").change( function() {
		if ($jaer("#recurrence_regis_end_date").length > 0){
			$jaer("#recurrence_regis_end_date").val($jaer("#registration_end").val());
		}							
	});
	if ($jaer("#recurrence_regis_start_date").length > 0){
		$jaer("#recurrence_regis_start_date").change( function() {
			if ($jaer("#registration_start").length > 0){
				$jaer("#registration_start").val($jaer("#recurrence_regis_start_date").val());
			}							
		});
	}
	if ($jaer("#recurrence_regis_end_date").length > 0){
		$jaer("#recurrence_regis_end_date").change( function() {
			if ($jaer("#registration_end").length > 0){
				$jaer("#registration_end").val($jaer("#recurrence_regis_end_date").val());
			}							
		});
	}

});

				
				