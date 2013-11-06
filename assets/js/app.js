$(function() {
	
	//Highlight Current Nav
	$("#home a:contains('Home')").parent().addClass('active');
	$("#about a:contains('About')").parent().addClass('active');
	$("#contact a:contains('Contact')").parent().addClass('active');
	
	//$("#artists a:contains('Artists')").parent().addClass('active');
	$("#events a:contains('Events')").parent().addClass('active');
	$("#maps a:contains('Maps')").parent().addClass('active');
	$("#software a:contains('Software')").parent().addClass('active');
	//$("#tips-and-tricks a:contains('Tips & Tricks')").parent().addClass('active');
	$("#travel a:contains('Travel')").parent().addClass('active');
	//$("#videos a:contains('Videos')").parent().addClass('active');
	$("#random-video a:contains('Random Video')").parent().addClass('active');
	
	
	//activate dropdown menus on hover fadeIn/fadeOut
	$("ul.nav li.dropdown").hover(function() {
		$(".dropdown-menu",this).fadeIn();
	},function() {
		$(".dropdown-menu",this).fadeOut("fast");
	}); //end hover function
	
});