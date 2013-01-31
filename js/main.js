var Main = (function( Main ){

	var attributes = {
		locales : {
			0 : [ 'Americas', 'Europe', 'Australia', 'Africa', 'Asia', 'Philippines' ],
			1 : [ 'Canada East', 'Canada West', 'Hawaii Pacific', 'Northern California', 'Southern California', 'Northeastern Seaboard', 'Southeastern Seaboard', 'Northern Midwest', 'Southern Midwest', 'Pacific Northwest' ],
			2 : [ 'Anaheim', 'Bakersfield', 'Corona', 'Delano', 'Eagle Rock', 'El Cajon', 'Henderson', 'Irvine', 'Lancaster', 'Las Vegas', 'Lompoc', 'Long Beach', 'Los Angeles', 'Montclair', 'National City', 'North Hollywod', 'North San Diego', 'Oxnard', 'Palm Springs', 'Pasadena', 'Phoenix', 'Riverside', 'Salt Lake City', 'San Gabriel Valley', 'Santa Clarita', 'Santa Maria', 'South San Diego', 'Summerlin', 'Temecula Valley', 'Tempe', 'Torrance', 'Tucson', 'Victorville', 'Vista', 'Woodland Hills' ]
		}
	}

	/**
	 * Getter
	 */
	var get = function( k ) {
		if( typeof attributes[k] != 'undefined' ) {
			return attributes[k];
		} else {
			throw 'unable to find a value by ' + k;
		}
	}

	/**
	 * Setter
	 */
 	var set = function( k , v ) {
		if( typeof attributes[k] != 'undefined' ) {
			attributes[k] = v;
		} else {
			throw 'unable to find a value by ' + k;
		}
	} 

	/**
	 * Init
	 */
	var init = function() {
		var path = window.location.hash;

		if (path == '#americas') {
			showLocalesList(true);
			showLocaleDetail(false);
			createList(1);
		} else if (path == '#americas/scalifornia') {
			showLocalesList(true);
			showLocaleDetail(false);
			createList(2);
		} else if (path == '#americas/scalifornia/anaheim') {
			showLocalesList(false);
			showLocaleDetail(true);
		} else {
			showLocalesList(true);
			showLocaleDetail(false);
			createList(0);
		}
	}

	/**
	 * Create list item
	 */
	var createListItem = function( level, index, localeName ) {
		return '<li id="'+level+'-'+index+'" class="locale"><span>' + localeName + '</span><span class="arrow">></span></li>';
	}

	/**
	 * Create list
	 */
	var createList = function( level ) {
		var locales = get('locales'),
			list = locales[level],
			localeList = $('#locale-list');

		localeList.children().remove();

		for (var i = 0; i < list.length; i++) {
			localeList.append( createListItem( level, i, list[i] ) );
			$('#'+level+'-'+i).click(function(e){
				if (e.target.id == '0-0') {
					location.hash = 'americas';
					createList(1);
				} else if (e.target.id == '1-4') {
					location.hash = 'americas/scalifornia';
					createList(2);
				} else if (e.target.id == '2-0') {
					location.hash = 'americas/scalifornia/anaheim';
					showLocalesList(false);
					showLocaleDetail(true);
				}
			});
		}
	}

	/**
	 * Show locales list
	 */
	var showLocalesList = function(show) {
		var localeList = $('#locale-list');

		if (show) {
			localeList.removeClass('hide');
			localeList.addClass('show');
		} else {
			localeList.removeClass('show');
			localeList.addClass('hide');
		}
	}

	/**
	 * Show locale detail page
	 */
	var showLocaleDetail = function(show) {
		var localeDetail = $('#locale-detail'),
			latlng,
			mapOptions,
			map,
			marker;

		if (show) {
			localeDetail.removeClass('hide');
			localeDetail.addClass('show');

			latlng = new google.maps.LatLng(33.830668,-117.918184);
			mapOptions = {
				zoom : 16,
				center : latlng,
				mapTypeId : google.maps.MapTypeId.ROADMAP
	    	};
	        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	    	marker = new google.maps.Marker({
	    		position : latlng,
	    		map : map
	    	});
		} else {
			localeDetail.removeClass('show');
			localeDetail.addClass('hide');
		}
	}

	return {
		get: get,
		set: set,
		init: init
	}

}());