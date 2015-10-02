$(document).ready(function() {

	//facets panel counter
	var idPanelCounter = 0;

    //add Id to individual facets dinamically - this allow to handle as many facets as we need
    $(".panel").each(function(){
    	++idPanelCounter;
    	$(this).attr("id","panel"+idPanelCounter);
	});  

  	//function that handles the landing page redirect on "send data simulation" button click
    $(".reload-page").click(function() {

    	 //define the landing page querystring
    	 var landingUrl = "size:4,10,16|base_colour:1,4|brand:53,3392,12767";

    	 //define the landing page url and redirect to it
         var url = "pages/refinements_landingpage.html?refine=" + encodeURIComponent(landingUrl);
         window.location.href = url;		
    });
   

	 //function that handles both add and remove item click
    $("input[type=checkbox]").click(function() {
	    
    	var checkboxCounterEachPanel = 0;
    	
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
    });

 	//function that handles the "clear all" click
    $(".top-clear-filter").click(function() {
    	$('input:checkbox').removeAttr('checked');
    	$(this).fadeOut(300);
    	$(".clear-filter").fadeOut(300);
    });

    //function that handles the "clear" click for each panel
    $(".clear-filter").click(function() { 	
    	$(this).siblings(".options").find('input[type=checkbox]:checked').removeAttr('checked');
    	$(this).fadeOut(300);

    	//disable also the "clear all" button
	    $(".top-clear-filter").fadeOut(300);

    });

}); //end document ready
