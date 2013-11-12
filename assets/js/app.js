$(function() {
	
	//activate events tabs 'url.php#tabToActivate'
	var hash = window.location.hash;
	hash && $('ul.nav a[href="' + hash + '"]').tab('show');
	
	//Highlight Current Nav
	$("#home a:contains('Home')").parent().addClass('active');
	$("#about a:contains('About')").parent().addClass('active');
	$("#contact a:contains('Contact')").parent().addClass('active');
	
	//$("#artists a:contains('Artists')").parent().addClass('active');
	$("#events a:contains('Events')").parent().addClass('active');
	$("#maps a:contains('Maps')").parent().addClass('active');
	$("#software a:contains('Software')").parent().addClass('active');
	//$("#tips-and-tricks a:contains('Tips & Tricks')").parent().addClass('active');
	$("#venue-travel a:contains('Travel')").parent().addClass('active');
	//$("#videos a:contains('Videos')").parent().addClass('active');
	$("#random-video a:contains('Random Video')").parent().addClass('active');
	
	
	//activate dropdown menus on hover fadeIn/fadeOut
	$("ul.nav li.dropdown").hover(function() {
		$(".dropdown-menu",this).fadeIn();
	},function() {
		$(".dropdown-menu",this).fadeOut("fast");
	}); //end hover function
	
	//activate tooltips
	$("[data-toggle='tooltip']").tooltip({
		animation : true
	});
	//end activate tooltips
	
	//show modals
	$('.modalphotos img').on('click', function(){
		$('#modal').modal({
			show: true,
		})
		
		var mysrc = this.src.substr(0, this.src.length-7) + '.jpg';
		$('#modal-image').attr('src', mysrc);
		$('#modal-image').on('click', function(){
			$('#modal').modal('hide');	
		});
		
	});
	//end show modals
	
});