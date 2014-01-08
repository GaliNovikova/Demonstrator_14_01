if($('body').hasClass('problemPage')){
				checkForProblemId19();
				checkForProblemId6();
			}

/* user unactivity checking*/
var no_active_delay = 90; 
var now_no_active = 0; 
var video_playing_flag = false;
var video;
setInterval(function(){
	if( video && video.paused == true){
		video_playing_flag = false;
	}else{
		video_playing_flag = false;/*true;*/
	}
	if(!video_playing_flag) now_no_active++;
		//console.log(video_playing_flag);
	}, 1000);
	
setInterval("showPopupLeaving()", 1000);
document.onmousemove = activeUser; 
function activeUser() {
    now_no_active = 0; 
    }
function showPopupLeaving() {
    if (now_no_active >= no_active_delay) { 
    activeUser();

    // show pop up window
    $('#agreed-modal').modal('show');

    return;
    }
    // update page
}

var hashObj = new HashObject();

jQuery(document).on('click', 'video', function(){
		video = this;
        video_playing_flag = false;/*(this.paused) ? false : true;*/
});	
	
	$('form').on( "submit", function( event ){
		event.preventDefault();
		$(this).find('input').trigger('keyup');
	});
	
	
	
function openProblem(id){
	hashObj.setHashVal('id', 'problem' + id);
	window.location = 'problem.htm' + window.location.hash;
}

function openHomeFounded(){
	hashObj.setHashVal('id',getHashVal('founded'));
	hashObj.setHashVal('founded', '1');
	//window.location = 'home.htm' + window.location.hash;
	openSummary();
}

function onOpenSummaryFromProblem(){
	hashObj.setHashVal('founded', '1');
	//window.location = 'home.htm' + window.location.hash;
	openSummary();
}

/*button on problem page 'Nee' from popup*/
function goToBSwithoutPr(){
	if(hashObj.getHashVal('id') && hashObj.getHashVal('id')!='false'){hashObj.setHashVal('founded', getHashVal('id'))}
	else{hashObj.setHashVal('founded','1')};
	
	hashObj.deleteHashVal('id');
	hashObj.deleteHashVal('pr');	
	window.location = 'brand_search.htm' + window.location.hash;	
}

function openSummary(){
	window.location = 'brand_search.htm' + window.location.hash;
	if($('body').hasClass('brand-search') && (!$('body').hasClass('problemPage'))){ location.reload()};
}

function showAllProblems(){
	hashObj.deleteHashVal('id');
	openSummary();  	
}

function showHelpBlock(){
	$('#agreed-modal').modal('hide');
	$('#questions_box').fadeToggle();
}

/************ Hash object *************/
	
function HashObject(){
	var self=this;

	getWindowHashObj = function(){
		var hashObj={};
		var hashVal = window.location.hash;	
		//alert(hashVal);
		if(hashVal){
			var temp = hashVal.substring(1).split('&');
			
			for (var i = 0; i < temp.length; i++){
				if(temp[i]){
					hashObj[temp[i].split('=')[0]] = temp[i].split('=')[1];
				}
			}

		}
		return hashObj;
	}

	setWindowHash = function(obj){
		var hashStr = '';
		for (var key in obj){
			hashStr += key + '=' + obj[key] + '&';
		}
		window.location.hash = hashStr;
	}
	
	self.getHashVal = function(name){
		var obj = getWindowHashObj();
		return obj[name] || false;
	}

	self.deleteHashVal = function(name){
		var obj = getWindowHashObj();
		if(obj[name]) {delete obj[name]}
		setWindowHash(obj);
	}

	self.setHashVal = function(name, val){
		var obj = getWindowHashObj();
		obj[name] = val;
		setWindowHash(obj);
	}

}
	
	function parseJSONSecond(respText){
		try {
			var problemsObj = JSON.parse(respText);
			return problemsObj;
		} catch ( e ) {
			console.error("Parsing error:", e);
		}
	}
		
		document.addEventListener('touchstart', function(e) {
		    var touch = e.touches[0];
		    touch.target.trigger('click');
		}, false);
		
		
/***********************************************page onLoad ******************************************************/
		jQuery(function($){
			
			if($('body').hasClass('problemPage')){
				checkForProblemId19();
				checkForProblemId6();
				$('.fixed-close-btn').addClass('reversed').on('click', function(){showAllProblems()});
			}
						
			$('.brand-search .search-title').css({'visibility':'hidden'});
			$('.brand').hide();
			$('.problem').hide();
			$('.model').hide();
			$('.ready').hide();			
			$('.first').hide();

			if(hashObj.getHashVal('br')) {
				if($('body').hasClass('problemPage')){
					$('.first').show();
					$('.brand-search .brandSelection').hide();/*block for search*/
				}else{
					$('.model').show();			
					$('.first').show();			
				}
			}else{
				$('.brand').show();		
				$('.brandSelection').show();/*block for search*/
			}
			
			if(hashObj.getHashVal('md')) {
				if($('body').hasClass('problemPage')){				
					$('.model').hide();
					$('.brand').hide();
					$('.problem').hide();
					$('.brand-search .brandSelection').hide();/*block for search*/
					$('.ready').show();
				}else{
					$('.ready').hide();
					$('.model').hide();
					$('.brand').hide();
					$('.problem').show();
				}
			}

			if(hashObj.getHashVal('pr')) {
				$('.model').hide();
				$('.brand').hide();
				$('.problem').hide();
				$('.brand-search .brandSelection').hide();/*block for search*/
				$('.ready').show();
			}else{
			 $('.result_problem .ready').hide();
			}
			
			if(hashObj.getHashVal('edit')) {	
				document.body.contentEditable='true'; 
				document.designMode='on';
			}
			//$('.search-title').css({'visibility':'hidden'});
			
			var problemsFullList = new problemsList({
		      id: 'problems', idTips: 'collapsibleTips', idVideos: 'videos',
		      filePath: 'js/problems.json'
		    });

			checkForSavedProblem();
			
			setTimeout(function checkHash(){
				
				if(hashObj.getHashVal('id') && hashObj.getHashVal('id')!='false') {

					var problemTitle = document.getElementById(hashObj.getHashVal('id'));
					$('#problemTitleValue').html(problemTitle.innerHTML);	
					
					var filter = $(problemTitle).find('span').html();
					//console.log(filter);
					
					
					onInputKeyUp(false, false, filter)
					/*make a function*/
				
						/*$('.search-result ul li').hide();
						$('.search-result ul li a').each(function(){
							var searchstr = filter.toLowerCase().split(' ');
							var showFlag=true;
							for(var i=0; i<searchstr.length; i++){
								if($(this).text().toLowerCase().indexOf(searchstr[i])<0) showFlag=false;
							}					
							if(showFlag) $(this).parent().show();	
						});	*/		
					
					
					if( $('body').hasClass('brand-search') && !!hashObj.getHashVal('founded')){

						$('.summary .problems ul li a').each(function(){
							if(this.id != hashObj.getHashVal('id')) $(this).parent().remove();
						});
					}
					
					$('.brand-search .problems ul li a').each(function(){
						if(this.id != hashObj.getHashVal('id')) $(this).parent().remove();
						$('.see-more').hide();
					});
				
				if($('body').hasClass('problemPage')){
					$('fixed-close-btn').addClass('reversed');//.on('click', function(){showAllProblems()});
				}


				}//end of id hash founded
				
				$('input.form-control.typeahead-list').trigger('keyup');
				$('ul.typeahead.dropdown-menu').hide(); 
				
				if($('body').hasClass('home')){
					var elem = $('.companies')[0];
					sortByColumn(0,'',elem, false);

					if(sessionStorage.page == 'home2'  && !$('body').hasClass('home2')){
				       document.location.href='home2.htm'
				    }

				}else{
					sortItems('Alfabetisch a-z', false, '.sorting-AtoZ');
				}

				if($('body').hasClass('home2')){
				     sessionStorage.setItem('page', 'home2');
				  }
				
				$('.search-result ul').each(function(){
					$(this).append('<li style="display: none;"><p class="info">Geen gegevens beschikbaar</p></li>');
				});
				
			}, 100);
			
			/*-------------------------Summary----------------------------*/					
			if(hashObj.getHashVal('founded')=='1'){									
				$('.left-part').addClass('smallSize');
				$('.right-part').removeClass('col-md-6 col-lg-6').addClass('col-md-10 col-lg-10')
				$('.fixed-close-btn').addClass('reversed');
				$('.brand-search .summary').show();
				$('.brand-search .summaryHide').hide();
				
				if(hashObj.getHashVal('br')) {
						$('.first').show();
				}
				
				if(hashObj.getHashVal('md')) {			
						$('.model').hide();
						$('.brand').hide();
						$('.problem').hide();
						$('.ready').show();
				}else{
					$('.model').hide();
				}
				
				if(!hashObj.getHashVal('pr')) {
				 $('.result_problem .ready').hide();
				}
				
				onInputKeyUp();

				$('.brandSelection').hide();/*block for search*/
			/*------ end summary ------*/	
			} else{
				$('.brand-search .summary').hide();
				$('.brand-search .summaryHide').show();
			}
			
			$('ul li a').on('click', function(){$(this).css("color",'#999999');});
			
			var social = document.createElement('div');
			social.className="social-place-holder hidden-xs";
			$('body').append(social);

			var helpButton = document.createElement('span');
			helpButton.className="help-button hidden-xs";
			$('body').append(helpButton);
			
			var backButton = document.createElement('span');
			backButton.className="back-button hidden-xs";
			$(backButton).on('click', function(){
				if(!$('body').hasClass('problemPage')) {window.history.back();setTimeout(function(){location.reload()}, 0)}
				else { 
					hashObj.deleteHashVal('id');
					window.location = 'brand_search.htm' + window.location.hash;
				}
			})
			$('body').not('.home').append(backButton);
						
			$('body').on('click', '.help-button, .help-button-link', function(e){
				e.preventDefault();
				$('#questions_box').fadeToggle();
				
				$(document).click(function(event) {
				 if ($(event.target).closest("#questions_box, .help-button, .help-button-link").length) return;
				 $("#questions_box").hide();
				 event.stopPropagation();
				});

			   })		
			   
			$('body').on('click', '#questions_box a',function(e){
				e.preventDefault();
				$('#questions_box').fadeToggle();
			   })			
			
			$('.list-model, .list-problem').filterByName();
			
			$('.companies').gridView();

			$(window).resize(function(){
				$('.companies').gridView();
			});

			$('#goToSearch').off().on('click',function(e){
				e.preventDefault();
				window.location='brand_search.htm' + window.location.hash;
			});

			$('#more_problems').on('click', function(e){
				e.preventDefault();
				if(hashObj.getHashVal('id')) { 
					hashObj.setHashVal('founded', hashObj.getHashVal('id'));
				} else {
					hashObj.setHashVal('founded', '');
				}
				hashObj.deleteHashVal('pr', '');
				location.reload();
			});

			
		});
/*----------------------------End On document ready----------------------------------*/
jQuery.fn.gridView=function(){
   return $(this).each(function(){
    var $t=$(this);
     $t.el = $t.children('div:visible');
     $t.elWidth = $t.el.outerWidth();
     $t.elHeight = $t.el.outerHeight();
     $t.container = $t.closest('div.row')
     $t.containerWidth = $t.container.width();
     $t.elemsLength = $t.el.length;
     $t.containerHeight = $t.elHeight*(Math.floor($t.elemsLength/Math.floor($t.containerWidth/$t.elWidth)));
     $t.moreLink = $t.container.next('div.row').find('a.btn');

    if($t.elemsLength > 9){
     $t.container.addClass('grid');
     if($t.containerHeight <= $t.elHeight*3){
      $t.container.height($t.containerHeight);     
     } else {
      $t.container.height($t.elHeight*3);
     }

     if(($t.containerWidth * $t.containerHeight) - (20*$t.containerHeight)  ==  $t.elWidth * $t.elHeight * $t.elemsLength){
      $t.moreLink.hide(); 
     } else {
      $t.moreLink.show(); 
     }

     $t.moreLink.off().on('click', function(e){
   e.preventDefault();
       $t.container.toggleClass('show_all');
        if(this.innerHTML == 'Meer'){ this.innerHTML = 'Minder';}
        else{ this.innerHTML = 'Meer'}
        $t.moreLink.children('span').toggleClass('hide');
     });
    } else {
     $t.moreLink.hide();
    }
   });
}

		function checkForSavedProblem(){
			var hashString=window.location.hash;
			if(~hashString.indexOf('founded')) {
			  $('#foundedProblem').show();			  
			} else{
				$('#foundedProblem').hide();
				if(~hashString.indexOf('edit')) {
					document.body.contentEditable='true'; 
					document.designMode='on';
				}				
			}
		}
		
		function checkForProblemId19(){
			if(hashObj.getHashVal('br')=='brand8' && hashObj.getHashVal('md')=='model11' && hashObj.getHashVal('id')=='problem19'){
				if(!getHashVal('pr')){
					hashObj.setHashVal('pr', 'pro4');
					//location.reload();
				}
			}else{
				$('#textForProblem29').hide();
			}
		}		
		
		function checkForProblemId6(){
			if(hashObj.getHashVal('br')=='brand8' && hashObj.getHashVal('md')=='model12' && hashObj.getHashVal('id')=='problem6'){
				if(!hashObj.getHashVal('pr')){
					hashObj.setHashVal('pr', 'pro5');
					//location.reload();
				}
			}
		}
		
		function readFile(classname, filename,errors) {
            $.get(filename, function(data) {
                var dataOb = parseJSONSecond(data);
                $('.' + classname).typeahead({
                    source: dataOb,
					matcher: function(item) {
						var str=this.query.trim().toLowerCase();
						for(error in errors){
							var re = new RegExp(errors[error],'gmi');
							str=str.replace(re,error);
						}
						if(item.toLowerCase().indexOf(str.toLowerCase()) != -1) return true;
					},
					updater:function (item) {
						$('input.form-control.typeahead-list').val(item).trigger('keyup');
						return item;

					}
                });
            }, "text");

        }
			
		/*function readFile(classname, filename) {
            $.get(filename, function(data) {
                var dataOb = parseJSONSecond(data);
                $('.' + classname).typeahead({
                    name: 'first',
                    local: dataOb,
					matcher: function(item) {
						var synonyms= {'iPhone 5':'iPhone 5, iPhone V, ifoon, ifone, ijfone, ijphone', 'Samsung S3':'Samsung S3, i8190, Siii mini, S111 mini'};
						if(synonyms[item] && synonyms[item].indexOf(this.query)>0){
							return true;
						}else if(synonyms[item]){ return false};
						
						return true;
					}
                });
            }, "text");

        }*/
function readFileUser(classname, arr) {            
   $('.' + classname).typeahead({
    source: arr,
    matcher:function(item) {
	     var str=this.query.trim().toLowerCase();
	     for(error in errors){
	      var re = new RegExp(errors[error],'gm');
	      str=str.replace(re,error);
	     }
	     if(item.toLowerCase().indexOf(str.toLowerCase()) != -1) return true;
	    },
    updater:function (item) {
			$('input.form-control.choicehelper').val(item).trigger('keyup');

			/*
			if($('.brandSelection .companies .model:visible').length == 1){
				$('.brandSelection .companies .model:visible h5').click();
			} else if($('.brandSelection .companies .problem:visible').length == 1){
				$('.brandSelection .companies .problem:visible h5').click();
			} else {
				$('.brandSelection .companies .model:visible').each(function(){
					if($(this).find('h5').text()==item){
						$(this).find('h5').click();
					}
				});				
			}*/
		
		    return item;
	    }
	});
  }
		var fieldErrors={
			'iPhone':'iPhone|iPhone|ifoon|ifone|jfone|ijphone|ifo|ifoo',
			'Samsung S3':'Samsung S3|Siii|S111',
			'Samsung S3 mini':'i8190|Siii mini|S111 mini|Siii',
			'iPhone 5 accu snel leeg':'iPhone 5 akku|iphone 5 akku'
		};
		readFile('typeahead-list', 'js/list_new.json',fieldErrors);
		/**moved to brand selected*/
		readFileUser('list-problem', ["Audio (geluid) tijdens het bellen","Audio (geluid) overigen", "Netwerk / GPS / Bluetooth / Wifi", "Geen netwerk","Accu snel leeg", "Behuizing", "Opladen / Batterij / Lader", "In-/uitschakelen"]);
		
		$('a.collapsed').on('mouseup', function(){
			var ev=event;			
			$(this).parent().parent().find('li>a[data-toggle="collapse"]').each(function(index){
				//console.log(this.className);
				if(!($(this).hasClass('collapsed')) && this!=ev.target) $(this).trigger('click');
			}); 
		});
		
		$('.brandSelection div.brand').on('click', function(e){e.stopPropagation()});
		$('.brandSelection div.brand .img-container, .brandSelection div.brand h5').on('click', function(e){
			//if(e.target === this){
			$('.ready').hide();
			$('.model').show();
			$('.brand').hide();
			$('.problem').hide();
			$('.brandSelection').show();/*block for search*/
			$('.first').show();
			document.body.scrollTop = 0;
			$('.companies').gridView();
			sortItems('Alfabetisch a-z', false, '.sorting-AtoZ');
			//}//$('.brand-search input.form-control.typeahead-list').val('Apple').trigger('keyup');
		});
		
		$('.brandSelection div.model').on('click', function(e){e.stopPropagation()});
		$('.brandSelection div.model .img-container, .brandSelection div.model h5').on('click', function(){
			$('.ready').hide();
			$('.model').hide();
			$('.brand').hide();
			$('.problem').show();
			document.body.scrollTop = 0;
			$('.companies').gridView();
			sortItems('Alfabetisch a-z', false, '.sorting-AtoZ');
			//$('.brand-search input.form-control.typeahead-list').val('Apple iPhone 5').trigger('keyup');
		});
		
		$('.brandSelection div.problem').on('click', function(e){e.stopPropagation()});
		$('.brandSelection div.problem .img-container, .brandSelection div.problem h5').on('click', function(){
			$('.model').hide();
			$('.brand').hide();
			$('.problem').hide();
			$('.brandSelection').hide();/*block for search*/
			$('.ready').show();
			$('.companies').gridView();
			document.body.scrollTop = 0;
		});	
		
		/*Close buttons*/
		
		$('.close-button.first').on('click', function(){
			if($('body').hasClass('problemPage')){
				window.location='brand_search.htm';
			}else{
				window.location.hash = '';
				location.reload();
			}
			$('.left-part').removeClass('smallSize');
			$('.search-title').css({'visibility':'hidden'});
			$('.brand').show();
			$('.problem').hide();
			$('.model').hide();
			$('.ready').hide();
			$('.first').hide();			
			$('.brandSelection').show();/*block for search*/
			document.body.scrollTop = 0;
			$('.brand-search input.form-control.typeahead-list').val('').trigger('keyup');
			setTimeout(function(){$('ul.typeahead.dropdown-menu').hide();},500);			
			$('.choicehelper').val('');
			$('.companies').gridView();
			sortItems('Alfabetisch a-z', false, '.sorting-AtoZ');
		});
		
		$('.close-button.second').on('click', function(){
			hashObj.deleteHashVal('pr');
			hashObj.deleteHashVal('md');
			hashObj.deleteHashVal('id');
			hashObj.deleteHashVal('founded');
			$('.choicehelper').val('');
			if($('body').hasClass('problemPage')){
				window.location='brand_search.htm' + window.location.hash;
			}else{
			 location.reload();
			}
			/*
			$('.ready').hide();
			$('.brand').hide();
			$('.problem').hide();
			$('.model').show();
			$('.brandSelection').show();/*block for search*/
			/*document.body.scrollTop = 0;
			$('.brand-search input.form-control.typeahead-list').val( curBrand ).trigger('keyup');
			*/
		});
		
		$('.close-button.third').on('click', function(){
			hashObj.deleteHashVal('pr');
			hashObj.deleteHashVal('id');
			hashObj.deleteHashVal('founded');
			$('.choicehelper').val('');
			if($('body').hasClass('problemPage')){
				window.location='brand_search.htm' + window.location.hash;
			}else{
			 location.reload();
			}
			/*$('.model').hide();
			$('.brand').hide();
			$('.ready').hide();
			$('.problem').show();
			$('.brandSelection').show();/*block for search*/
			/*document.body.scrollTop = 0;
			$('.brand-search input.form-control.typeahead-list').val( curModel ).trigger('keyup');
			*/


		});
		
		/*Sluit button*/
		$('.fixed-close-btn').on('click', hideLeftPart);
		
		 function hideLeftPart(){

			if(!$(this).hasClass('reversed')){
				$('.left-part').addClass('smallSize');
				$('.smallSize .details-result>div').attr('style','');	
				hideEmptyBlocks();
				$('.right-part').removeClass('col-md-6 col-lg-6').addClass('col-md-10 col-lg-10')
				//$('.fixed-close-btn').addClass('reversed').css('left','-42px');
			} else{							
				//$('.left-part').toggleClass('hidden');
				$('.right-part').addClass('col-md-6 col-lg-6').removeClass('col-md-10 col-lg-10')
				showEmptyBlocks();
				if($('.left-part').hasClass('smallSize')){
							$('.left-part').removeClass('smallSize');
							$('.smallSize .details-result>div').attr('style','min-height:210px;');
							$(this).attr('style','');
							//$('.left-part').toggleClass('hidden');
						}						
			}
			$('.fixed-close-btn').toggleClass('reversed');
		 }
		
		$('.home .companies .img-container').each(function(index){
			this.id = 'brand'+index;
		}).on('click', function(){
			window.location='brand_search.htm#br=' + this.id + '&';
		});
	
	
	function hideEmptyBlocks(){
				$('.brandSelection').hide();
				if(hashObj.getHashVal('br')) {
						$('.first').show();
				}
				
				if(hashObj.getHashVal('md')) {			
						$('.model').hide();
						$('.brand').hide();
						$('.problem').hide();
						$('.ready').show();
				}else{
					$('.model').hide();
				}
				
				if(!hashObj.getHashVal('pr')) {
				 $('.result_problem .ready').hide();
				}
	
	}	
	
	function showEmptyBlocks(){
				$('.brandSelection').show();
				if(hashObj.getHashVal('br')) {
						$('.model').show();
				}
				
				if(hashObj.getHashVal('md')) {			
					$('.model').hide();
					$('.brand').hide();
					$('.problem').show();
					//$('.ready').show();
				}else{
					//$('.model').hide();
				}
				
				if(hashObj.getHashVal('pr')) {
					$('.problem').hide();
				 	$('.ready').show();
					$('.brandSelection').hide();
				}

				if(!hashObj.getHashVal('pr')) {
				 $('.result_problem .ready').hide();
				}
	
	}





/*------------------------User selected--------------------------*/
var curBrand = '';
var curModel = '';
var curProblem = '';

	$('.companies .brand .img-container').each(function(index){
			this.id = 'brand'+index;
			if(hashObj.getHashVal('br') == this.id) {
				showModelByBrand($(this));
			}			
		}).on('click', function(){
				hashObj.setHashVal('br',this.id);
				$('.details-result img.first').attr('src', $(this).find('img').attr('src')).css('width','80%');
				$('.details-result h5.first').html($(this).parent().find('h5').html());
				showModelByBrand($(this));				
		});

		$('.companies .brand h5').on('click', function(){
				$(this).parent().find('.img-container').trigger('click');
							
		});

	function showModelByBrand(container){

		$('.details-result img.first').attr('src', container.find('img').attr('src')).css('width','80%');
				
		$('.details-result h5.first').html(container.parent().find('h5').html().replace('<span class="hidden">1</span>', ''));
				
		var currentBrandName = container.parent().find('h5').html().replace('<span class="hidden">1</span>', '');
		curBrand = currentBrandName;
		$('.brand-search input.form-control.typeahead-list').val(currentBrandName).trigger('keyup');
		$('ul.typeahead.dropdown-menu').hide();
		
		if(currentBrandName == 'Apple') var currentBrandName ='iPhone';
				
		/* hide models of other brands */
		$('.brand-search .model h5').each(function(){
			if($(this).html().toLowerCase().indexOf(currentBrandName.toLowerCase()) < 0){
				$(this).parent('div.model').addClass('hidden');
			}else{
				$(this).parent('div.model').removeClass('hidden');
			};
		});
		
		switch(curBrand){
		case "Apple": readFileUser('list-model',["iPhone 5", "iPhone 4S", "iPhone 5C", "iPhone 5S", "iPhone 3G", "iPhone 3GS" ] );break;
		case "Samsung": readFileUser('list-model', ["Samsung Galaxy S3", "Samsung Galaxy S3 mini", "Samsung Galaxy S4", "Samsung Galaxy Ace 3", "Samsung Galaxy Express", "Samsung Galaxy Note", "Samsung Galaxy Note 2", "Samsung Galaxy Note 3", "Samsung Galaxy Y", "Galaxy S (I9000)", "Galaxy S Plus (I9001)", "Galaxy S2 (I9100)", "Galaxy Nexus (I9250)", "Galaxy Note (N7000)", "Galaxy Tab 10.1 (P7500)", "Galaxy Y (S5360)", "Galaxy Mini (S5570)", "Galaxy Ace (S5830)", "Galaxy Ace 2 (I8160)", "Galaxy S3 Mini (I8190)", "Galaxy S3 (I9300)", "Galaxy Note 2 (N7100)", "Galaxy Ace (S5839)", "Galaxy Ace Plus (S7500)", "S Advance (I9070)", "Galaxy S4 (I9505)", "Galaxy Tab (P1000)", "Galaxy Tab 2 (P5100)", "S3570 / Chat 357", "S5250 / Wave 525", "Galaxy Mini 2 (S6500)", "Galaxy Mega (I9200)", "Galaxy S4 Mini (I9195)", "Galaxy Pocket Neo (S5310)", "Galaxy S2 Plus (I9105)", "Galaxy Core", "Galaxy Trend", "Galaxy S4 Active", "Galaxy S4 Zoom", "Galaxy Ace", "Galaxy Mega", "Galaxy Note 3", "Galaxy Ace 3 (S7275)", "Galaxy Tab Nexus 10 (P8110)", "Galaxy S4 mini Duos (I9192)", "Galaxy S Wifi 5.0", "Galaxy Tab 3 8.0"]);break;
		case "HTC": readFileUser('list-model', ["HTC Desire 200", "HTC Desire C", "HTC Desire S", "HTC One Max", "HTC One S", "HTC One S", "HTC One X", "HTC Sensation XE", "HTC Sensation XL", "HTC WildiFire S"]);break;
		case "Sony": readFileUser('list-model', ["Sony Xperia C", "Sony Xperia M", "Sony Xperia M dual", "Sony Xperia Tablet Z", "Sony Xperia Z Ultra", "Sony Xperia Z1"]);break;
		case "Nokia": readFileUser('list-model', ["Nokia Asha 206", "Nokia Asha 311", "Nokia Lumia 520", "Nokia Lumia 820", "Nokia Lumia 920", "Nokia Lumia 925"]);break;
		case "Acer": readFileUser('list-model', ["Acer Liquid E", "Acer Liquid E", "Acer Liquid E2 DUO", "Acer Liquid S", "Acer Liquid Z", "Acer Liquid Gallant DUO"]);break;
		case "BlackBerry": readFileUser('list-model', ["BlackBerry 9790", "BlackBerry 9900", "BlackBerry Q10", "BlackBerry Q5", "BlackBerry Z10", "BlackBerry Z30"]);break;
		default: readFile('list-model', 'js/list.json')
		}
		
		$('.choicehelper').val('');

        $('.companies').gridView();
	};

		
	$('.companies .model .img-container').each(function(index){
			this.id = 'model'+index;
			if(hashObj.getHashVal('md') && hashObj.getHashVal('md') == this.id) {				
				setCurrentModel($(this));			
			}	

		}).on('click', function(e){
				hashObj.setHashVal('md', this.id);
				setCurrentModel($(this));
		});

	$('.companies .model h5').on('click', function(){
		$(this).parent().find('.img-container').trigger('click');
							
	});

	function setCurrentModel(self){
				$('.details-result img.problem.ready').attr('src', self.find('img').attr('src'));
				$('.details-result h5.problem.ready').html(self.parent().find('h5').html());

				curModel = self.parent().find('h5').html().replace('<br/>',' ').replace('<br>', ' ');
				
				$('.brand-search input.form-control.typeahead-list').val( curModel).trigger('keyup');
				$('ul.typeahead.dropdown-menu').hide();
				
		switch(curBrand){
		case "Apple": readFileUser('list-model',["iPhone 5", "iPhone 4s", "iPhone 5c", "iPhone 5s" ] );break;
		case "Samsung": readFileUser('list-model', ["Samsung S4", "Samsung S3", "Samsung S3 mini"]);break;
		case "HTC": readFileUser('list-model', ["HTC One X"]);break;
		default: readFile('list-model', 'js/list.json')
		}
			
		$('.choicehelper').val('');

	};
		
	$('.companies .problem .img-container').each(function(index){
			this.id = 'pro'+index;
			if(hashObj.getHashVal('pr') && hashObj.getHashVal('pr') == this.id) {

				setCurrentProblem($(this));

			}			
		}).on('click', function(){
				hashObj.setHashVal('pr', this.id);

				setCurrentProblem($(this));

		});

		$('.companies .problem h5').on('click', function(){
			$(this).parent().find('.img-container').trigger('click');							
		});

		function setCurrentProblem(self){
				$('.details-result .result_problem img.ready').attr('src', self.find('img').attr('src'));
				$('.details-result .result_problem h5.ready.center').html(self.parent().find('h5').html());				
				curProblem = self.parent().find('h5').html().replace('<br/>',' ').replace('<br>', ' ');				
				$('.brand-search input.form-control.typeahead-list').val(curModel +' '+ curProblem).trigger('keyup');
				$('ul.typeahead.dropdown-menu').hide();
				
				$('.fixed-close-btn').addClass('reversed');
				$('.left-part').addClass('smallSize');
				$('.smallSize .details-result>div').attr('style','');
				
				//$('.fixed-close-btn').addClass('reversed').css('left','-42px');
				
				$('.choicehelper').val('');
				$('.close-button').on('click', function(){
					$('.left-part').removeClass('smallSize');
					$('.smallSize .details-result>div').attr('style','min-height:210px;');
				});

				
		}
		
		
/*------------------------------------------------------------------*/		
		/*Typeahed*/
		/*$('input.choicehelper').on('keyup', function(){
			$('.companies .brand .img-container:visible').each(function(){
				
			};
		});*/
		function openPopupWithLink(name, link, imgurl){
			$('#goBrandSearch').on('click', function(){window.location = link;})
			$('#deviceName').html(name);
			$('#deviceImg').attr('src', imgurl);
			$('#imei-modal').modal('show');
		}
		
	$('input.form-control.imei-typeahead-list').on('keyup', function(){	
		var val = $.trim(this.value);
		if(val.length == 15 && isNumeric(val)){				
					switch(val){
					case '357139056277663': /*$(this).val('Samsung S4');*/openPopupWithLink('Samsung S4', 'brand_search.htm#br=brand8&md=model12', 'images/content/samsung-galaxy-s4.png'); break;
					case '353426056649148': /*$(this).val('HTC One X');*/openPopupWithLink('HTC One X' ,'brand_search.htm#br=brand4&md=model13&','images/content/htc-one.png');break;
					case '013060002431525': /*$(this).val('iPhone 4S');*/openPopupWithLink('Apple iPhone 4S','brand_search.htm#br=brand1&md=model0&','images/content/iphone_4s.png');break;
					case '013345003518572': /*$(this).val('iPhone 5');*/openPopupWithLink('Apple iPhone 5','brand_search.htm#br=brand1&md=model2&','images/content/iphone_5.png');break;
					case '013347006740260': /*$(this).val('iPhone 5');*/openPopupWithLink('Apple iPhone 5','brand_search.htm#br=brand1&md=model2&','images/content/iphone_5.png');break;
					default: $(this).val('').trigger('keyup');					
					}
					val = this.value;
		}

		//console.debug(val)
		
		$('div.brandSelection div').find('h5').each(function(){
			if(($(this).text().replace('1','').toLowerCase() == val.toLowerCase()) && !($(this).closest('div').hasClass('model'))){
				var brandImage = $(this).prev('div.img-container').children('img').attr('src');
				//set hash value
				setHashVal('br', $(this).prev('div.img-container').attr('id'));
				setHashVal('smsize', '1');
				$('.details-result div:nth-child(1) .img-container *').show();
				$('.details-result div:nth-child(1) img.first').attr('src', brandImage);
				$('.details-result div:nth-child(1) h5').text(val).show();
				console.debug(val)
			}
		});

		$('div.companies div.model').find('h5').each(function(){

			if($(this).text().toLowerCase() == val.toLowerCase()){
				var modelImage = $(this).prev('div.img-container').children('img').attr('src');
				//set hash value
				setHashVal('md', $(this).prev('div.img-container').attr('id'));
				//setHashVal('smsize', '1');
				$('.details-result div:nth-child(2) .img-container span').show();
				$('.details-result div:nth-child(2) img.problem').attr('src', modelImage).show();
				$('.details-result div:nth-child(2) h5').text(val).show();
			}
		});




	});		
	
		$('input.form-control.typeahead-list').on('keyup', onInputKeyUp);
		
		var current_count;

		function onInputKeyUp(showAllItems, objParentCall, filterValue){
			//alert(7)
			var self = this;
			if (window == this) self=$('input.form-control.typeahead-list')[0];
			var val = self.value || '';

			if(hashObj.getHashVal('id')!='false' && hashObj.getHashVal('id')) val = filterValue;
			var MAX_COUNT=9;

			if(true) {
				//document.body.scrollTop=115;
				$('.search-title').css({'visibility':'hidden'});
				
				switch(val){
					case 'Samsung S3 mini geen netwerk': hashObj.setHashVal('br', 'brand8');hashObj.setHashVal('md','model10');hashObj.setHashVal('pr','pro3'); openSummary();break;
					case 'iPhone 5 accu snel leeg': hashObj.setHashVal('br', 'brand1');hashObj.setHashVal('md','model2');hashObj.setHashVal('pr','pro4');openSummary();break;//br=brand1&md=model2&pr=pro4
					//case 'iPhone 5': setHashVal('br', 'brand1');setHashVal('md','model2');openSummary();break;//br=brand1&md=model2&pr=pro4										
				}
								
				if($(self).parents().hasClass('home') && val!=''){
					$($('.brandSelection')[0]).hide(); 
					$($('.search-result')[0]).removeClass('hide');
				}
				
				//$('.search-result ul li').hide();
				$('a.see-more').hide();
				if(!objParentCall){
					 current_count=0; 
					$('.search-result ul#problems li a').each( function(){showItemsByKeyVal(this, self.value, MAX_COUNT, showAllItems); });
					 current_count=0; 
					$('.search-result ul#collapsibleTips li a').each( function(){showItemsByKeyVal(this, self.value, MAX_COUNT, showAllItems); });
					 current_count=0; 
					$('.search-result ul#videos li a').each( function(){showItemsByKeyVal(this, self.value, MAX_COUNT, showAllItems); });

				}else{
					current_count=0; 
					$(objParentCall).find('ul li a').each( function(){showItemsByKeyVal(this, self.value, MAX_COUNT, showAllItems); });
				};

				if($(this).is(':visible') && $(this).is(':focus')){
				    $('body').addClass('gray_bg');
				    $('.home .left-part').removeClass('hidden');
				    $('.home .right-part').addClass('col-10 col-xs-12 col-md-10 col-lg-10');
				   }

			}
			
			$('.search-result ul').each(function(){
				var liCount=$(this).find('li:visible').length;
				
				if(liCount<1){
					var self = this;
					$('li p.info', this).parent().hide();
					setTimeout(function(){showNoFoundMess(self);}, 1500);
				}else{
					$('li p.info', this).parent().hide();
				};
			});
				
		};

		function showItemsByKeyVal(item, selfValue, MAX_COUNT, showAllItems){
			var searchstr = selfValue.toLowerCase().split(' ');
			var showFlag=true;
			
			$(item).parent().hide();

			for(var i=0; i<searchstr.length; i++){
				if($(item).text().toLowerCase().indexOf(searchstr[i])<0) showFlag=false;
			}					
					
			if(showFlag){
				if(showAllItems == true){
					$(item).parent().show();
					if(current_count == 0) $(item).parent().find('button.pull-left').hide();
					$(item).parent().find('button.pull-right').hide();
					$(item).parent().prevAll(':visible:first').find('button.pull-right').show();
				}
				else{
					if(current_count < MAX_COUNT){
						$(item).parent().show();
						if(current_count == 0) $(item).parent().find('button.pull-left').hide();
						$(item).parent().find('button.pull-right').hide();
						$(item).parent().prevAll(':visible:first').find('button.pull-right').show();
					}
				}
					
				current_count++;
				//console.log($(item).parents('div'))

				if( current_count > MAX_COUNT){
					$(item).parents('div').find('a.see-more').show();
					if(current_count == MAX_COUNT){
						$(item).parent().find('button.pull-right').show().on('click', 
							function(){
								$(this).parents('.tips').find('a.see-more').trigger('click');
								$(this).parents('li').nextAll(':visible:first').find('a').trigger('click');
							});
					}
				}else{
					$(item).parents('div').find('a.see-more').hide();
				}

			}else{
					$(item).parent().find('button.pull-right').show();
					$(item).parent().find('button.pull-left').show();
			}
					
		}


		$('.see-more').on('click', function(){
			var $parent = $(this).parent();
			$parent.find('ul').toggleClass('fullHeight');
			if($parent.find('ul').first().hasClass('fullHeight')){
				onInputKeyUp(true, $(this).parent());
			}
			else{	
				onInputKeyUp(false, $(this).parent());
			}
		});
		
		function showNoFoundMess(obj){
			if($(obj).find('li:visible').length < 1){
				$('li p.info', obj).clearQueue().parent().show();
			}
		}
		
		$('span.abbr').on('click', function(e){
			e.stopPropagation();
			e.preventDefault();
			
			$(this).parent().parent().toggleClass('open');
			
			if($(this).parent().parent().hasClass('open')&&(!$(this).parent().parent().find('p.abbrBlock')[0])){
				this.insertAdjacentHTML('AfterEnd', '<span class="abbrSpace"></span>');
				
				this.parentNode.parentNode
				 .insertAdjacentHTML('BeforeEnd','<p class="abbrBlock">Bluetooth verzorgt de verbinding tussen twee toestellen. <a href="javascript:0">Lees meer hierover</a></p>');
			}		
		});
		
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function problemsList(options) {
        
        var self = this;
        var elem = document.getElementById(options.id); 
        if(!elem || !options.filePath) return;

        getFile(options.filePath);

	function getFile(filePath){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', filePath + '?r='+ Math.random(), true);
            
            xhr.onreadystatechange = function() {
              if (this.readyState != 4) return;

              /*if (this.status != 200) {
                console.error('Ошибка ' + this.status + ' / ' + this.statusText + ' / ' + this.responseText);
                return;
              }*/
              self.parsedObj = parseJSON(this.responseText);
              if (self.parsedObj == undefined) {
                   alert('Warning: cannot read json data via XMLHttpRequest.\nCross origin requests are only supported for HTTP.\nPlease use Firefox browser or create a virtual host.');
              }
			  
              if(self.parsedObj.problems) drawProblemsList(self.parsedObj.problems);			 
              if(self.parsedObj.tips) drawTipsList(self.parsedObj.tips);
              if(self.parsedObj.videos) drawVideosList(self.parsedObj.videos);
			  
			  $('a.collapsed').on('mouseup', function(event){
				var ev=event;			
				$(this).parent().parent().find('li>a[data-toggle="collapse"]').each(function(index){
					//console.log(this.className);
					if(!($(this).hasClass('collapsed')) && this!=ev.target) $(this).trigger('click');
					}); 
				
			  });
				
				$('ul li a').on('click', function(){$(this).css("color",'#999999');});
			
            }

            xhr.send('');
        }

        function parseJSON(respText){
          try {
              var problemsObj = JSON.parse(respText);
              return problemsObj;             
          } catch (e) {
              console.error("Parsing error:", e); 
          }
        }
        
        function drawProblemsList(parsedList){

            var fragment = document.createDocumentFragment();
            for(var i = 0; i < parsedList.length; i++){
            	var listEl = document.createElement('li');
            	listEl.innerHTML='<span class="caret"></span>'  +
            	'<a id="problem'+i+'" href="javascript: openProblem('+ i +')">' +
            	parsedList[i].title +
				'<span class="hidden">' + parsedList[i].keywords + '</span></a>';

                fragment.appendChild(listEl);
            }
            elem.appendChild(fragment);
        }       
		
		function drawTipsList(parsedList){
			if(options.idTips){
				var container = document.getElementById(options.idTips);
			}else return;
			if(container){
            var fragment = document.createDocumentFragment();
            for(var i = 0; i < parsedList.length; i++){
            	var listEl = document.createElement('li');
				var tipContent;
				if(parsedList[i].deeplinks){
					tipContent = '<img width="80%" src="' + parsedList[i].deeplinks + '"/>';
				 }
				 else{
				    tipContent = '<p ></br>'+parsedList[i].text+'</br></p>';
				}
				
				var navigation = '<button onclick="" class="btn btn-default pull-left">Vorige tip</button>'+
								 '<button onclick="" class="btn btn-default pull-right">Volgende tip</button>';
				if(i==0){
					navigation = '<button onclick="" class="btn btn-default pull-right">Volgende tip</button>';
				}else if(i == parsedList.lenght-1){
					navigation = '<button onclick="" class="btn btn-default pull-left">Vorige tip</button>';
				}
				
            	listEl.innerHTML= '<a  href="javascript:void(0);" class="collapsed" data-toggle="collapse" data-parent="#collapsibleTips" data-target="#tips'+ i +'">'+
						'<span class="caret"></span>' + parsedList[i].title + '<span class="hidden">' + parsedList[i].keywords + '</span>'+
						'</a>'+	
				'<div id="tips'+i+'" class="row collapse" style="width:100%">'+
							'<div class="inlineBlock">'+
								'<div class="col content">'+
									'<div>'+
										'<p style="width:640px;">' + tipContent + '</p>'+
									'</div>'+
								'</div><!--span-->'+
								
								'<div class="helps center-block">'+
										'<p>Heeft deze tip geholpen?</p>'+
										'<p class="radio-group" onclick="event.stopPropgation();">'+
											  '<label><input type="radio" name="optionsRadios" value="option1"/>&nbsp;Ja</label>'+
											  '<label><input type="radio" name="optionsRadios" value="option2" />&nbsp;Nee</label>'+
											  '<label><input type="radio" name="optionsRadios" value="option3" checked>&nbsp;Weet ik niet</label>'+
										'</p>'+									
								'</div>'+
								'<div class="tip-nav">'+
									navigation
								'</div>'+
							'</div>'+
						'</div><!--row-->';
				
                fragment.appendChild(listEl);
            }
            container.appendChild(fragment);
			
			$('.tip-nav button').on('click', function(){
				var self = $(this);
				var listEl = self.closest('li');
				
				listEl.find('a[data-toggle="collapse"]').trigger('click');
				if(self.hasClass('pull-right')){
					var listElnext=$(listEl).next('li');
					/*if($(listElnext).prevAll('li:visible').length > 8){
					   $(listElnext).find('button.pull-right').hide();
					}*/
					
					while(listElnext && listElnext.css('display')=='none'){
						listElnext = $(listElnext).next('li');
					}
					if(listElnext){listElnext.find('a[data-toggle="collapse"]').trigger('click');}	
				}else{				
					var listElnext=$(listEl).prev('li');
					
					while(listElnext && listElnext.css('display')=='none'){
						listElnext = $(listElnext).prev('li');
					}
					if(listElnext){listElnext.find('a[data-toggle="collapse"]').trigger('click');}	
				};
			
			})/*.each(function(){
				var self = $(this);
				var listEl = self.closest('li');

				if(self.hasClass('pull-right')){
					var listElnext=$(listEl).next('li');
					if($(listElnext).prevAll('li:visible').length > 8  || $(listElnext).nextAll('li:visible').length == 0){
					   $(listElnext).find('button.pull-right').hide();
					   console.log($(listElnext).prevAll('li:visible').length)
					}
					
					while(listElnext && listElnext.css('display')=='none'){
						listElnext = $(listElnext).next('li');
					}
			
				}else{				
					var listElnext=$(listEl).prev('li');
					
					while(listElnext && listElnext.css('display')=='none'){
						listElnext = $(listElnext).prev('li');
					}
			
				};
			});*/
		 }
        
		$('#collapsibleTips li > a').on('click', function(e){
				e.preventDefault();
				var $t = $(this);
				if($t.parent().children('div.row').hasClass('collapse')){
					var elHeight = $t.next('div.row').height('auto').height(),
						listHeight = $t.closest('ul').height();
					$t.closest('ul').css({
						'max-height':listHeight + elHeight
					});
				} else {
					$t.closest('ul').removeAttr('style');
				}
			});
			
		}
		
		function drawVideosList(parsedList){
			if(options.idVideos){
				var container = document.getElementById(options.idVideos);
			}else return;
			
			if(container){
            var fragment = document.createDocumentFragment();
            for(var i = 0; i < parsedList.length; i++){
            	var listEl = document.createElement('li');
				var tipContent='<p></br></br></p>';
				if(parsedList[i].deeplinks){
					if(~parsedList[i].deeplinks.indexOf('://')){
						tipContent = '<img width="80%" src="' + parsedList[i].replacement +'"/>';
					}
					else{
						tipContent = '<video width="500" height="375" controls><source src="' + parsedList[i].deeplinks + 
						'" type="video/mp4"><source src="'+ parsedList[i].deeplinks.replace('mp4','ogg') +'" type="video/ogg">' +
						'Your browser does not support the video tag.</video>'
					}
				}
				
            	listEl.innerHTML= '<a  href="javascript:void(0);" class="collapsed" data-toggle="collapse" data-parent="#'+ options.idVideos +'" data-target="#videos'+ i +'">'+
						'<span class="caret"></span>' + parsedList[i].title + '<span class="hidden">' + parsedList[i].keywords + '</span>'+
						'</a>'+	
				'<div id="videos'+i+'" class="row collapse">'+
							'<div class="inlineBlock">'+
								'<div class="col content">'+
									'<div>'+
										'<p style="min-width:400px;">' + tipContent + '</p>'+
									'</div>'+
								'</div><!--span-->'+
								
							'</div>'+
						'</div><!--row-->';

                fragment.appendChild(listEl);
            }
            container.appendChild(fragment);}
			
			$('#videos li > a').on('click', function(e){
				e.preventDefault();
				var $t = $(this);
				if($t.parent().children('div.row').hasClass('collapse')){
					var elHeight = $t.next('div.row').height('auto').height(),
						listHeight = $t.closest('ul').height();
					$t.closest('ul').css({
						'max-height':listHeight + elHeight
					});
				} else {
					$t.closest('ul').removeAttr('style');
				}
			});
		
        }       
		
}
/*---------------------------------Clear after IMEI search -------------------------------------------------*/
$('button[data-clear-search="true"]').on('click', clearSearch);

function clearSearch(){
		$($('.brandSelection')[0]).show(); 
		$($('.search-result')[0]).addClass('hide');  
	
}

/*-------------------------------------Sorting function-----------------------------------------------*/
	function sortItems(itemVal, reversed, className){
		var elem = $('.left-part .companies')[1];
		sortByColumn(0,'',elem, reversed);
		$('button.dropdown-toggle').html(itemVal+' '+'<span class="caret"></span>');
		$('.sorting li a').not(className).attr('style','');
		$(className).attr('style', 'color:#999999;')
	};
	   
	var sortByColumn = function (colIndex, colType,elem, reversed) {
          var content = getTableData(elem);
          if (!content) return;

          var compareFunction;
          if (reversed) {
            compareFunction = function (a, b) {
              if (a[colIndex].toLowerCase() < b[colIndex].toLowerCase()) return 1;
              if (a[colIndex].toLowerCase() > b[colIndex].toLowerCase()) return -1;
            }
          } else {
            compareFunction = function (a, b) {
			  if (a[colIndex]==' ') a[colIndex]='zzz';
			  if (b[colIndex]==' ') b[colIndex]='zzz';
              if (a[colIndex].toLowerCase() > b[colIndex].toLowerCase()) return 1;
              if (a[colIndex].toLowerCase() < b[colIndex].toLowerCase()) return -1;
            }
          }

          content.sort(compareFunction);
			var fragment = document.createDocumentFragment()

          
          for (var j = 0; j < content.length; j++) {
            fragment.appendChild(content[j][content[j].length - 1]);
          }
          
          elem.appendChild(fragment);
        }

        
        
        function getTableData(elem) {

          var rowsArr = $(elem).find('>div');
          var tableContent = [];

          for (var key = 0; key < rowsArr.length; key++) {
            var row = [];
			row.push($(rowsArr[key]).find('h5').text());
            row.push(rowsArr[key]);
			
            tableContent.push(row);
          }

          return tableContent;
        }
      


jQuery.fn.correctErrors=function(errors){
	return $(this).each(function(){
		var $t=$(this);
		$t.keyup(function(){
			var str=$t.val();
			for(error in errors){
				var re = new RegExp(errors[error],'gm');
				str=str.replace(re,error);

			}
			$t.val(str).trigger('keyup');
		});
	});
}
var errors={
	'iPhone':'ihone|iPhone|ifoon|ifone|jfone|ijphone',
	'5':'V',
	'Samsung S3':'Samsung S3|i8190|Siii|S111'
};
//$('input.typeahead-list').correctErrors(errors);

$('[data-show-all-problems="true"]').on('click', showAllProblems);

jQuery.fn.filterByName=function(){
	return $(this).each(function(){
		var $t=$(this),
			type;
		if ($t.hasClass('list-problem')) {
			type = 'problem';
		} else if($t.hasClass('list-model')){
			type = 'model';
		}
		$t.keyup(function(){
			var str=$t.val().toLowerCase().replace('<br/>', ' ');
			var elems = $('div.brandSelection').find('div.'+type+':visible');
			
			$('div.companies > div.'+type).show().each(function(){
				if($(this).find('h5').text().toLowerCase().indexOf(str) < 0) {	
					$(this).hide();
				}
			});

			if(elems.length == 1){
				$(elems).find('h5').click();
			} else {
				$('div.companies > div.'+type+':visible').find('h5').each(function(){												
					if($(this).text() == $t.val()){
						$(this).click();
					}					
				});
			}
		});
	});
}

var clearSearchResult = function(){
	return $(this).each(function(){
		var $t=$(this),
			type;
		if ($t.hasClass('list-problem')) {
			type = 'problem';
		} else if($t.hasClass('list-model')){
			type = 'model';
		}
		$t.keyup(function(){
			var str=$t.val().toLowerCase();
			$('div.companies > div.'+type).show().each(function(){
				if($(this).find('h5').text().toLowerCase().indexOf(str) < 0) $(this).hide(); 
				//console.log(this);
			});			
		});
	});
}

$('[data-show-help="true"]').on('click', showHelpBlockHandler);

function showHelpBlockHandler(){
	showHelpBlock();
}