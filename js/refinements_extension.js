$(document).ready(function() {

	 //facets panel counter
	 var idPanelCounter = 0;

	 //add Id to individual facets dinamically - this allow to handle as many facets as we need
	 $(".panel").each(function(){
		++idPanelCounter;
		$(this).attr("id","panel"+idPanelCounter);
	 });  

  	 //run deserialization on document ready
  	 deserializeURL();
  	 //run checkboxes initialisation
  	 initialiseCheckBoxes();

	 //this function desealize the URL i
	 function deserializeURL(){

	  	//get the landing page url
	  	var url = window.location.href; 

	  	//get the latter part of the querystring by stripping out data before the "=" symbol
	    var landingUrl = decodeURIComponent(window.location.search.split("=")[1]);
	  
		var facetGroup = [];
		var selectedFacets = [];
		var facetType;

		//split string when it finds the pipe symbol - it return an array containing the data to be read
		$.each(landingUrl.split(/\|/), function (i, val) {
		    
		     //push facets in an array
		     selectedFacets.push(val);
		   	    
		     //store facet type
		     facetType = selectedFacets[i].split(/\:/)[0];
		     //store facets an an array
			 facetGroup = selectedFacets[i].split(/\:/)[1].split(/\,/);

			 //loop through facets and show them in the HTML page
		     $.each(facetGroup, function(i,val){
		     	
		     	//build the facet id to be found
		     	var facetToBeSelected = facetType + "_" + val;

		     	//find the facet and enable its own checkbox
		     	$('[data-id='+facetType+']').find("#"+facetToBeSelected).prop('checked', true);

		     });
		});

	}

	 //function that handles both add and remove item click
    function initialiseCheckBoxes(){
	    
    	var checkboxCounterEachPanel = 0;
    	var localCheckboxesCounter = 0;

		//it goes through all the panels and check whether or not there are enabled checkboxes in each of them
		//it also enables and disables the selected panel "clear" button
		for(var i = 1; i <= idPanelCounter; i++) {
			   			
	    	//if each panel countains at least one enable checkbox then show the local "clear" button
	    	// and increase the counter 
	    	if($("#panel"+i+" "+".options input[type='checkbox']:checked").length > 0){

	    		//if the panel contains at least one checkbox then shows the "clear" button
	    		$("#panel"+i+" "+".options").siblings(".clear-filter").fadeIn(300);

	    		//increse checkbox counter
	    		checkboxCounterEachPanel++;
	    	}
	    	else{ //if not, hide the local "clear" button
	    		$("#panel"+i+" "+".options").siblings(".clear-filter").fadeOut(300);
	    	}	
		}

		//hide "clear all" button when at least one of the panels don't have any enabled checkboxes
		//if the counter is equal to the number of panels then show the "clear all" button
    	if(checkboxCounterEachPanel === idPanelCounter){
    		//enable the clear all button
    		$(".top-clear-filter").fadeIn(300);
    	}else{   	
	    	//disable the clear all button
	    	$(".top-clear-filter").fadeOut(300);
    	}

    }
    
}); //end document ready
