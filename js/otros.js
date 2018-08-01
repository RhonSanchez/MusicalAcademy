;(function(){
	var selector = "#contact-form"

	$(selector).find(".input").on("change", (ev)=>{

		var $input = $(ev.target)

		var $next_step = $input.parent().next(".step")

		//var $is_form_valid = es_valido_formulario()

	
		if( $next_step.length > 0){
			siguiente($next_step)
		}else{
		
			validar_formulario()
		}

		//siguiente($next_step)
	
	})


	function es_valido_formulario(){	
		return document.querySelector(selector).checkValidity()
	}

	function validar_formulario(){
		if(es_valido_formulario()){
			enviar_formulario()
		}
		
		else{
		

			var $fieldset_invalido = $(selector).find(".input:invalid").first().parent()
			siguiente($fieldset_invalido)
		}
	}

	

	function siguiente(variable){
		$(".step.active").removeClass("active")
		variable.addClass("active")
		variable.find(".input").focus()
	}

})()