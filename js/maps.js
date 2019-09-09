;(function(){

	class UserLocation{
		static get(callback){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition((location)=>{
					callback({
						lat: location.coords.latitude,
						lng: location.coords.longitude
					})
				})
			}else{
				alert("No logramos detectar el lugar en el que te encuentras")
			}

		}
	}
	var my_place ={
		lat:10.062618959383661,
		lng:-69.36540068844806
	}

	google.maps.event.addDomListener(window, "load", ()=>{
		var map = new google.maps.Map(document.getElementById('map'),
			{
				center: my_place,
				zoom: 15
			}
		)

		var marker = new google.maps.Marker({
			map: map,
			position: my_place,
			title: "Academy Musical",
			visible: true
		})
		UserLocation.get((coords)=>{
			//calcular distancia al usuario

			var origen = new google.maps.LatLng(coords.lat, coords.lng)
			var destino = new google.maps.LatLng(my_place.lat, my_place.lng)

			var service = new google.maps.DistanceMatrixService()

			service.getDistanceMatrix({
				origins: [origen],
				destinations: [destino],
				travelMode: google.maps.TravelMode.DRIVING
			},(response, status)=>{
				if(status === google.maps.DistanceMatrixStatus.OK){
					var duration_element = response.rows[0].elements[0]
					var duracion_viaje = duration_element.duration.text
					document.querySelector("#message").innerHTML = `
							Estas a ${duracion_viaje} de una experiencia inolvidable en 
							<span class="dancing-script">Musical Academy</span>`
							
				}
			}) 
		})
	})
})()