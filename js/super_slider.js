(function($){
		$.fn.super_slider = function(options){
			$.fn.super_slider.defaults = { auto_advance_interval : 4000,fade_in_time: 1000}
			var opts = $.extend({},$.fn.super_slider.defaults,options);
			return this.each(function(){
				// auto increment function
				var change_slide = function(){
					current_element = $('div#container div#links').find('a.colored');
						if(current_element.next().length == 0){
							$('div#container div#links a:first').stop().click();
						}else{
							current_element.next().stop().click();
						}
						console.log(opts.auto_advance_interval);
						console.log(opts.fade_in_time);
				}
				//auto increment
				var timed=setInterval(change_slide,opts.auto_advance_interval);

				// stopping the auto advancing when mouse is in div#slider
				$('div#container').mouseenter(function(){
					console.log("Entered");
					clearInterval(timed);
					console.log(timed);
				});

				// starting the auto advancing when mouse leaves div#slider
				$('div#container').mouseleave(function(){
					console.log("Out");
					timed=setInterval(change_slide,opts.auto_advance_interval);
					console.log(timed);
				});

				//browse using arrows
				$('div#container a.arrow').click(function(){
					
					id = $(this).attr("id");
					if(id=='right'){
						current_element = $('div#container div#links').find('a.colored');
						if(current_element.next().length == 0){
							$('div#container div#links a:first').stop().click();
						}else{
							current_element.next().stop().click();
						}
					}
					if(id=='left'){
						current_element = $('div#container div#links').find('a.colored');
						if(current_element.prev().length == 0){
							$('div#container div#links a:last').click();
						}else{
							current_element.prev().click();
						}
					}
				});

				// browse using links
				$('div#container a.link').click(function(){
					element = $('div#container div#links').find('a.colored');
					element.removeClass("colored");
					$(this).addClass("colored");
					clicked=$(this).attr("id");
					current=element.attr("id");
					clicked_element_name = 'div#container div#slider p#'+clicked;
					current_element_name = 'div#container div#slider p#'+current;
					if(current_element_name!=clicked_element_name){
						$(current_element_name).stop().animate(
							{"opacity":"0"},
							opts.fade_in_time,
							function(){ 
								$(current_element_name).css("z-index","10");
							 }
							);
					}
					$(clicked_element_name).stop().animate(
						{"opacity":"1"},
						opts.fade_in_time,
						function(){
							$(clicked_element_name).css("z-index","1000");
						}
						);
				});
				// plugin ends here
			});	
		}
	})(jQuery);