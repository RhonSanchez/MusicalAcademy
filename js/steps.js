;(function(){

	var selector = "#contact-form"

	$(".step textarea").on("keydown", (ev)=>{
		if(ev.keyCode == 13){
			ev.preventDefault()
			$(ev.target).blur()
		}
	})

	$(".path-step").on("click", (ev)=>{
		var $current_circle = $(ev.target) 

		focus_circle($current_circle)

		var posicion = $current_circle.index(".path-step") + 1
		var $test = $(".step:nth-child("+posicion+")")

		siguiente($test)
	})

	$(selector).find(".input").on("change", (ev)=>{

		var $input = $(ev.target)
		var $next_step = $input.parent().next(".step")
		var is_form_valid = es_valido_formulario()

		
		if(!is_form_valid && $next_step.length > 0){
			siguiente($next_step)			
		}else{
			validar_formulario()
		}
		
	})

		// Helpers
	
	function es_valido_formulario(){	
		return document.querySelector(selector).checkValidity()
	}

	function validar_formulario(){
		if(es_valido_formulario()){
			enviar_formulario()
		}else{
			var $fieldset_invalido = $(selector).find(".input:invalid").first().parent()
			siguiente($fieldset_invalido)
		}
	}

	function siguiente($next_step){
		$(".step.active").removeClass("active")
		$next_step.addClass("active")
		$next_step.find(".input").focus()
		
		//coordinar circulos
		var posicion = $next_step.index(".step") + 1 
		
		var $circle = $(".path-step:nth-child("+posicion+")")
		focus_circle($circle)
	}

	function focus_circle($circle){
		$(".path-step.active").removeClass("active")
		$circle.addClass("active")
		//console.log("hola")	
	}
	function enviar_formulario(){
		var $form = $(selector)
		console.log($form.formObject())
		$.ajax({
		    url: $form.attr("action"), 
		    method: "POST",
		    data: $form.formObject(),
		    dataType: "json",
			success: function(){
				$form.slideUp()
				$("#info-contacto").html("Enviamos tu mnsaje, pronto nos pondremos en contacto")
			}
		})
	}

})()