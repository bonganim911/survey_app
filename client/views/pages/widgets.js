Template.widgets.rendered = function(){

  //import { Session } from 'meteor/session';
  var widget = {};
  Session.set("platform", "preview");
  var widget_table;
  var widget_list = new Array();
  var urlch = 'reports/mongo?request=widget_list&args={"platform":"' + Session.get("platform") + '"}';
	var combinedData = new Array();
  var url = ""
  var urlplat = 'platform?args={"platform":"' + Session.get("platform") + '"}';
	xhr_get(urlplat).done(cbPlatform);

  function cbPlatform(data) {
      if (data.url) {
        url = "http://" + data.url;
        xhr_get(urlch).done(cbWidgets);
      };
  }

	function cbWidgets(data) {
		for (var gkey in data.documents) {
			if (data.documents.hasOwnProperty(gkey)) {
				if (data.documents[gkey].widget) {
					switch (Number(data.documents[gkey].widget.specification.type)) {
						case 2: typeName = 'PuzzleUP';
								break;
						case 3: typeName = 'CluedUP';
								break;
						case 4: typeName = 'ShuffleUP';
								break;
						default: typeName = 'Other';
								break;
					}
				}
				var combObj = {
					id: {url: url, id: data.documents[gkey]._id},
					name: data.documents[gkey].widget ? data.documents[gkey].widget.name : 'Unspecified',
					region: data.documents[gkey].widget ? data.documents[gkey].widget.region_code : 'Unspecified',
					type: data.documents[gkey].widget ? typeName : 'Unspecified',
					start: data.documents[gkey].widget.specification ? data.documents[gkey].widget.specification.start_date : 'Unspecified',
					end: data.documents[gkey].widget.specification ? data.documents[gkey].widget.specification.end_date : 'Unspecified',
          winners: data.documents[gkey].widget.specification ? data.documents[gkey].widget.specification.number_of_winners : 0,
          plays: data.documents[gkey].widget.specification ? data.documents[gkey].widget.specification.number_of_plays : 0,
          prize: data.documents[gkey].widget.prize ? data.documents[gkey].widget.prize.name : 'Unspecified'
				};
				combinedData.push(combObj);
				widget_list.push({id:combObj.id.id, value: combObj.name})
 			}
		}


        if (  $.fn.DataTable.isDataTable( '#widget_grid' ) ) {
			widget_table.destroy();
		}

		widget_table = $('#widget_grid').DataTable( {
			"data": combinedData,
			"columns": [
                { title: "ID", data: "id.id"},
				{ title: "Link", data: "id",
                  "render" : function(data, type){
                            if(type === 'display'){
                               return $('<a>')
                                  .attr('href', data.url + data.id)
                                  .text("link")
                                  .wrap('<div></div>')
                                  .parent()
                                  .html();

                            } else {
                               return data.id;
                            }
                    }
                },
				{ title: "Name", data: "name" },
				{ title: "Region", data: "region" },
				{ title: "Game Type", data: "type"},
				{ title: "Start Date", data: "start" },
				{ title: "End Date", data: "end"},
        { title: "Winners", data: "winners"},
        { title: "Plays", data: "plays"},
        { title: "Prize", data: "prize"},
			],
      "order": [[5,'desc']],
			"pagingType": "full_numbers",
			"buttons": ['copy', 'csv', 'excel', 'pdf'],
			"dom": 'Blfrtp'
		} );

    widget_table.on( 'click', 'tr', function () {
			widget = {
      widget_id: widget_table.row( this ).data().id.id ,
		 	name: widget_table.row( this ).data().name,
		 	type: widget_table.row( this ).data().type,
		 	start: widget_table.row( this ).data().start,
		 	end: widget_table.row( this ).data().end};
			//document.getElementById("widget_id").innerHTML = "Widget ID: [ " + widget_id + " ]   | " + name + "  | " + type + "  | " + sdate + " - " + edate;
      Session.set("widget",widget)
    } );
	};

};

function xhr_get(url) {
  var url_base = "http://192.168.10.17:3010/api/";

  return $.ajax( {
   url: url_base + url,
  type: 'get',
  dataType: 'jsonp'
  })
  .fail(function(data) {
  if ( data.responseCode )
    console.log( data.responseCode );
  });
}
