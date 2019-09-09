//if(navigator.serviceWorker){
//	navigator.serviceWorker.register("/sw.js")
//}


;(function () {
	
	var sticky = false
	var currentPosition = 0
	var imageCounter = $("[data-name='image-counter']").attr("content")
	var email = "rhonaldsanchez98@gmail.com"

	$("#contact-form").on("submit", function(ev){
		ev.preventDefault()

		sendForm($(this))

		return false
	})

	$("#sticky-navigation").removeClass("hidden")
	$("#sticky-navigation").slideUp(0)
	checkScroll()
	isOpen()
	$("#menu-opener").on("click", toggleNav)
	$(".menu-link").on("click", toggleNav)

	setInterval(function(){

		if(currentPosition<imageCounter){
			currentPosition++	
		}
		else{
			currentPosition=0
		}
		
		$("#gallery .inner").css({
			left: "-"+currentPosition*100+"%"
		})
	},4000)

	$(window).scroll(checkScroll)

	function checkScroll(){
		var inBottom = isInBottom()

		if(inBottom && !sticky){
			sticky = true
			stickNavigation()
		}
		if(!inBottom && sticky){
			sticky = false
			unStickNavigation()
		}
	}

	function toggleNav(){
		$("#responsive-nav ul").toggleClass("active")
		$("#menu-opener").toggleClass("glyphicon-menu-hamburger")
	}

	function isOpen(){
		var date = new Date()
		var current_hour = date.getHours()
	
		if(current_hour < 8 || current_hour > 12 || current_hour < 14 || current_hour > 18){
			$("#is-open .text").html("Cerrado ahora <br> Abierto de 8am a 12pm y de 2pm a 6pm")
		}
	}

	function stickNavigation(){
		$("#description").addClass("fixed").removeClass("absolute")
		$("#navigation").slideUp("fast")
		$("#sticky-navigation").slideDown("fast")

	}

	function unStickNavigation(){
		$("#description").removeClass("fixed").addClass("absolute")
		$("#navigation").slideDown("fast")
		$("#sticky-navigation").slideUp("fast")

	}

	function isInBottom(){
		var $description = $("#description")
		var descriptionHeight = $description.height()

		return $(window).scrollTop() > $(window).height() - (descriptionHeight * 2)
	}

})()
