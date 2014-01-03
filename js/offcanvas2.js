	/* user unactivity checking*/
var no_active_delay = 60; 
var now_no_active = 0; 
setInterval("now_no_active++;", 1000); 
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
	

function openProblem(id){
	setHashVal('id', 'problem' + id);
	window.location = 'problem.htm' + window.location.hash;
}

function openHomeFounded(){
	setHashVal('founded', '1');
	window.location = 'home.htm' + window.location.hash;
}

function openSummary(){
	window.location = 'summary.htm' + window.location.hash;
}


	function getWindowHashObj(){
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

	function setWindowHash(obj){
		var hashStr = '';
		for (var key in obj){
			hashStr += key + '=' + obj[key] + '&';
		}
		window.location.hash = hashStr;
	}
	
	function getHashVal(name){
		var obj = getWindowHashObj();
		return obj[name];
	}

	function deleteHashVal(name){
		var obj = getWindowHashObj();
		if(obj[name]) {delete obj[name]}
		setWindowHash(obj);
	}

	function setHashVal(name, val){
		var obj = getWindowHashObj();
		obj[name] = val;
		setWindowHash(obj);
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
		
		

		jQuery(function($){
			$('.brand-search .search-title').css({'visibility':'hidden'});
			$('.brand').hide();
			$('.problem').hide();
			$('.model').hide();
			$('.ready').hide();			
			$('.first').hide();

			if(getHashVal('br')) {
				$('.model').show();			
				$('.first').show();
			}

			if(getHashVal('md')) {
				$('.ready').hide();
				$('.model').hide();
				$('.brand').hide();
				$('.problem').show();
				//alert('9')
			}

			if(getHashVal('pr')) {
				$('.model').hide();
				$('.brand').hide();
				$('.problem').hide();
				$('.brand-search .brandSelection').hide();/*block for search*/
				$('.ready').show();
			}
			
			if(getHashVal('edit')) {	
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
				
				if(getHashVal('id')) {

					var problemTitle = document.getElementById(getHashVal('id'));
					$('#problemTitleValue').html(problemTitle.innerHTML);	
					
					var filter = $(problemTitle).find('span').html();
					//console.log(filter);
					
					/*make a function*/
					$('.search-result ul li').hide();
					$('.search-result ul li a').each(function(){
						var searchstr = filter.toLowerCase().split(' ');
						var showFlag=true;
						for(var i=0; i<searchstr.length; i++){
							if($(this).text().toLowerCase().indexOf(searchstr[i])<0) showFlag=false;
						}					
						if(showFlag) $(this).parent().show();	
					});			
					
					$('.summary .problems ul li a').each(function(){
						if(this.id != getHashVal('id')) $(this).parent().remove();

					});
				}
			}, 50);
			
			
			
			$('ul li a').on('click', function(){$(this).css("color",'#999999');});
			
			var social = document.createElement('div');
			social.className="social-place-holder hidden-xs";
			$('body').append(social);

			//$('#videos ul li:visible').
			
		});
		/*-------End On document ready---------*/


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
			
		function readFile(classname, filename) {
            $.get(filename, function(data) {
                var dataOb = parseJSONSecond(data);
                $('.' + classname).typeahead({
                    name: 'first',
                    local: dataOb,
					matcher: function(item) {
					var synonyms= {'iPhone 5':'iPhone V, ifoon, ifone, ijfone, ijphone', 'Samsung S3':'i8190, Siii mini, S111 mini'}
						if(synonyms[item] && synonyms[item].indexOf(this.query)>0){
							return true;
						}
					}
                });
            }, "text");

        }
		readFile('typeahead-list', 'js/list.json');
		/**moved to brand selectim*/
		readFile('typeahead-list-problem', 'js/list_problem.json');
		
		$('a.collapsed').on('mouseup', function(){
			var ev=event;			
			$(this).parent().parent().find('li>a[data-toggle="collapse"]').each(function(index){
				//console.log(this.className);
				if(!($(this).hasClass('collapsed')) && this!=ev.target) $(this).trigger('click');
			}); 
		});
		
		$('.brandSelection div.brand').on('click', function(){
			$('.ready').hide();
			$('.model').show();
			$('.brand').hide();
			$('.problem').hide();
			$('.brandSelection').show();/*block for search*/
			$('.first').show();
			document.body.scrollTop = 0;
			console.log('show');
			//$('.brand-search input.form-control.typeahead-list').val('Apple').trigger('keyup');
		});
		
		$('.brandSelection div.model').on('click', function(){
			$('.ready').hide();
			$('.model').hide();
			$('.brand').hide();
			$('.problem').show();
			document.body.scrollTop = 0;
			//$('.brand-search input.form-control.typeahead-list').val('Apple iPhone 5').trigger('keyup');
		});
		
		$('.brandSelection div.problem').on('click', function(){
			$('.model').hide();
			$('.brand').hide();
			$('.problem').hide();
			$('.brandSelection').hide();/*block for search*/
			$('.ready').show();
			document.body.scrollTop = 0;
		});	
		
		/*Close buttons*/
		
		$('.close-button.first').on('click', function(){
			$('.search-title').css({'visibility':'hidden'});
			$('.brand').show();
			$('.problem').hide();
			$('.model').hide();
			$('.ready').hide();
			$('.first').hide();			
			$('.brandSelection').show();/*block for search*/
			document.body.scrollTop = 0;
			$('.brand-search input.form-control.typeahead-list').val('').trigger('keyup');
			window.location.hash = '';
		});
		
		$('.close-button.second').on('click', function(){
			$('.ready').hide();
			$('.brand').hide();
			$('.problem').hide();
			$('.model').show();
			$('.brandSelection').show();/*block for search*/
			document.body.scrollTop = 0;
			$('.brand-search input.form-control.typeahead-list').val( curBrand ).trigger('keyup');/*needs to be checked*/
			deleteHashVal('pr');
			deleteHashVal('md');
		});
		
		$('.close-button.third').on('click', function(){
			$('.model').hide();
			$('.brand').hide();
			$('.ready').hide();
			$('.problem').show();
			$('.brandSelection').show();/*block for search*/
			document.body.scrollTop = 0;
			$('.brand-search input.form-control.typeahead-list').val( curModel ).trigger('keyup');
			deleteHashVal('pr');
		});
		
		/*Sluit button*/
		$('.fixed-close-btn').on('click', hideLeftPart);
		 function hideLeftPart(){
			$('.fixed-close-btn').toggleClass('reversed');
			$('.left-part').toggleClass('hidden');
		 }
		
		$('.home .companies .img-container').each(function(index){
			this.id = 'brand'+index;
		}).on('click', function(){
			window.location='brand_search.htm#br=' + this.id + '&';
		});


/*------------------------User selected--------------------------*/
var curBrand = '';
var curModel = '';
var curProblem = '';

	$('.companies .brand .img-container').each(function(index){
			this.id = 'brand'+index;
			if(getHashVal('br') == this.id) {
				showModelByBrand($(this));
			}			
		}).on('click', function(){
				setHashVal('br',this.id);
				$('.details-result img.first').attr('src', $(this).find('img').attr('src')).css('width','80%');
				$('.details-result h5.first').html($(this).parent().find('h5').html());
				showModelByBrand($(this));				
		});

	function showModelByBrand(container){
		$('.details-result img.first').attr('src', container.find('img').attr('src')).css('width','80%');
				
		$('.details-result h5.first').html(container.parent().find('h5').html());
				
		var currentBrandName = container.parent().find('h5').text();
		curBrand = currentBrandName;
		$('.brand-search input.form-control.typeahead-list').val(currentBrandName).trigger('keyup');
		if(currentBrandName == 'Apple') var currentBrandName ='iPhone';
				
		/* hide models of other brands */
		$('.brand-search .model h5').each(function(){
			if($(this).html().toLowerCase().indexOf(currentBrandName.toLowerCase()) < 0){
				$(this).parent('div.model').addClass('hidden');
			}else{
				$(this).parent('div.model').removeClass('hidden');
			};
		});
	};

		
	$('.companies .model .img-container').each(function(index){
			this.id = 'model'+index;

			if(getHashVal('md') && getHashVal('md') == this.id) {
				
				setCurrentModel($(this));
			
			}	

		}).on('click', function(){
				setHashVal('md', this.id);

				setCurrentModel($(this));
		});

	function setCurrentModel(self){
				$('.details-result img.problem.ready').attr('src', self.find('img').attr('src'));
				$('.details-result h5.problem.ready').html(self.parent().find('h5').html());

				curModel = self.parent().find('h5').html().replace('<br/>',' ').replace('<br>', ' ');
				
				$('.brand-search input.form-control.typeahead-list').val( curModel).trigger('keyup');
	};
		
	$('.companies .problem .img-container').each(function(index){
			this.id = 'pro'+index;
			if(getHashVal('pr') && getHashVal('pr') == this.id) {

				setCurrentProblem($(this));

			}			
		}).on('click', function(){
				setHashVal('pr', this.id);

				setCurrentProblem($(this));

		});

		function setCurrentProblem(self){
				$('.details-result .result_problem img.ready').attr('src', self.find('img').attr('src'));
				$('.details-result .result_problem h5.ready.center').html(self.parent().find('h5').html());
				
				curProblem = self.parent().find('h5').html().replace('<br/>',' ').replace('<br>', ' ');
				
				$('.brand-search input.form-control.typeahead-list').val(curModel +' '+ curProblem).trigger('keyup');
		}

		
		$('.see-more').on('click', function(){
			$(this).parent().find('ul').toggleClass('fullHeight');
		});
		
/*------------------------------------------------------------------*/		
		/*Typeahed*/
		/*$('input.choicehelper').on('keyup', function(){
			$('.companies .brand .img-container:visible').each(function(){
				
			};
		});*/
		function openPopupWithLink(name, link){
			$('#goBrandSearch').on('click', function(){window.location = link;})
			$('#deviceName').html(name);
			$('#imei-modal').modal('show');
		}

		$('input.form-control.typeahead-list').on('keyup', function(){
			var self = this;
			var val = self.value;
			if(val) {
				//document.body.scrollTop=115;
				$('.search-title').css({'visibility':'hidden'});
				if(val.length == 15 && isNumeric(val)){
				
					switch(val){
					case '357139056277663': /*$(this).val('Samsung S4');*/openPopupWithLink('Samsung S4', 'brand_search.htm#br=brand8&md=model12'); break;
					case '353426056649148': /*$(this).val('HTC One X');*/openPopupWithLink('HTC One X' ,'brand_search.htm#br=brand4&md=model13&');break;
					case '013060002431525': /*$(this).val('iPhone 4S');*/openPopupWithLink('Apple iPhone 4S','brand_search.htm#br=brand1&md=model0&');break;
					case '013345003518572': /*$(this).val('iPhone 5');*/openPopupWithLink('Apple iPhone 5','brand_search.htm#br=brand1&md=model2&');break;
					case '013347006740260': /*$(this).val('iPhone 5');*/openPopupWithLink('Apple iPhone 5','brand_search.htm#br=brand1&md=model2&');break;
					default: $(this).val('').trigger('keyup');					
					}
					val = this.value;
				}
								
				if($(self).parents().hasClass('home')){
					$($('.brandSelection')[0]).hide(); 
					$($('.search-result')[0]).removeClass('hide');  
				}
				
				$('.search-result ul li').hide();
				$('.search-result ul li a').each(function(){
					var searchstr = self.value.toLowerCase().split(' ');
					var showFlag=true;
					for(var i=0; i<searchstr.length; i++){
						if($(this).text().toLowerCase().indexOf(searchstr[i])<0) showFlag=false;
					}					
					if(showFlag) $(this).parent().show();	
				});			
			}
			else{
				/*document.body.scrollTop=0;
				$($('.brandSelection')[0]).show(); */
				//$($('.search-result')[0]).hide();
				$('.search-result ul li').hide();
			}
		});
		
		
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
					tipContent = '<a target="_blank" href="' + parsedList[i].deeplinks + '">'+ parsedList[i].deeplinks + '</a>';
				 }
				 else{
				    tipContent = '<p></br></br></p>';
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
				'<div id="tips'+i+'" class="row collapse">'+
							'<div class="inlineBlock">'+
								'<div class="col content">'+
									'<div>'+
										'<p style="width:640px;">' + tipContent + '</p>'+
									'</div>'+
								'</div><!--span-->'+
								
								'<div class="helps center-block">'+
										'<p>Heeft deze tip geholpen?</p>'+
										'<p class="radio-group" onclick="event.stopPropgation();">'+
											  '<label><input type="radio" name="optionsRadios" value="option1"/>Ja</label>'+
											  '<label><input type="radio" name="optionsRadios" value="option2" />Nee</label>'+
											  '<label><input type="radio" name="optionsRadios" value="option3" checked>Weet ik niet</label>'+
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
				}
			
			});
		 }
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
						tipContent = '<iframe width="644" height="400" src="' + parsedList[i].deeplinks +'"></iframe>';
					}
					else{
						tipContent = '<video width="640" height="480" controls><source src="' + parsedList[i].deeplinks + 
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
										'<p style="width:640px;">' + tipContent + '</p>'+
									'</div>'+
								'</div><!--span-->'+
								
								'<div class="helps center-block">'+
										'<p>Heeft deze tip geholpen?</p>'+
										'<p class="radio-group" onclick="event.stopPropgation();">'+
											  '<label><input type="radio" name="optionsRadios" value="option1"/>Ja</label>'+
											  '<label><input type="radio" name="optionsRadios" value="option2" />Nee</label>'+
											  '<label><input type="radio" name="optionsRadios" value="option3" checked>Weet ik niet</label>'+
										'</p>'+									
								'</div>'+
								'<div class="tip-nav">'+
									'<button onclick="" class="btn btn-default pull-left">Vorige tip</button>'+
									'<button onclick="" class="btn btn-default pull-right">Volgende tip</button>'+
								'</div>'+
							'</div>'+
						'</div><!--row-->';

                fragment.appendChild(listEl);
            }
            container.appendChild(fragment);}
        }       
		
}




