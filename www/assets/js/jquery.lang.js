Cookies.set('lang', Cookies.get('lang'), { expires: 365 });
$('body').on('data-attribute-changed', function () {
	var lang = Cookies.get('lang');
		// console.log( 'aa: ' + lang);
	var dzlang = $.getJSON( 'assets/json/Lang/' + lang +'.json', function( data ) {
		// console.log( data )
		$('[data-lang]').each(function( index ) {
			var a = $(this).attr('data-lang');
			$(this).text(data[a]);
			if(data[a]==null){
				console.log(a);
			}
			// console.log(data[a]);
		});
	});
});

function change_langue(lang) {
    var x = document.getElementById("flag")
        x.className = "dz-flag-icon dz-" + lang;
    var c = document.getElementById("Demo");
        c.className = c.className.replace(" w3-show", "");
	Cookies.set('lang', lang, { expires: 365 });
	$('body').attr('data-language', lang);
	$('body').trigger('data-attribute-changed');
}

$('body').attr('data-language', Cookies.get('lang'));
$('body').trigger('data-attribute-changed');