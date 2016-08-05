Template.leaderboard.rendered = function(){
	//import { Session } from 'meteor/session'

	var leader_table;

 	var lbData = new Array();
	var wpData = new Array();
  var widget = Session.get("widget");

    var urllb = 'reports/mongo?request=widget_leaderboard&args={"widget_id":"' + widget.widget_id + '","platform":"' + Session.get("platform") + '"}';
    var urlwp = 'reports/mongo?request=widget_profile_list&args={"widget_id":"' + widget.widget_id + '","platform":"' + Session.get("platform") + '"}';

    xhr_get(urlwp).done(cbWidgetProfiles);



	function cbWidgetProfiles(data) {
         if (data.documents) {
            for (var gkey in data.documents) {
                var temp = data.documents[gkey].widget_profile;
                var wprofile = {
                    wp_id: data.documents[gkey]._id,
                    name: 'Unknown',
                    contact: 'Unknown',
                    fullname: 'Unknown'
                };

                var gate_key = Object.keys(temp.gates_actions);
                for (var i = 0; i < gate_key.length; i++) {
                    switch (gate_key[i]) {
                        case 'display_name':
                            wprofile.name = temp.gates_actions[gate_key[i]];
                            break;
                        case 'contact_details':
                            wprofile.contact = temp.gates_actions[gate_key[i]];
                            break;
                        case 'full_name':
                            wprofile.fullname = temp.gates_actions[gate_key[i]];
                            break;
                   };
                };
                wpData.push(wprofile);
            };
            xhr_get(urllb).done(cbLeaderboard);
        };
    }

    function cbLeaderboard(data) {

        if (data.documents) {
            for (var gkey in data.documents[0].leaderboard.list_entries) {
                if (data.documents[0].leaderboard.list_entries.hasOwnProperty(gkey)) {
                    var combObj = {
                        id: data.documents[0].leaderboard.list_entries[gkey].widget_profile_id,
                        name: data.documents[0].leaderboard.list_entries[gkey].display_name,
                        fullname: 'Unknown',
                        contact: 'Unknown',
                        score: data.documents[0].leaderboard.list_entries[gkey].best.score_value,
                        time: data.documents[0].leaderboard.list_entries[gkey].best.score_time,
                        attempt: data.documents[0].leaderboard.list_entries[gkey].best.attempt_number
                    };
                    var pos = wpData.map(function(e) { return e.wp_id; }).indexOf(combObj.id);
                    if (pos >= 0) {
                       combObj.contact = wpData[pos].contact;
                       combObj.fullname = wpData[pos].fullname;
                    }
                    lbData.push(combObj);
                };

            };

        if (  $.fn.DataTable.isDataTable( '#leader_grid' ) ) {
			leader_table.destroy();
		}

		leader_table = $('#leader_grid').DataTable( {
			"data": lbData,
			"columns": [
                {data: null},
				{ title: "Display Name", data: "name" },
                { title: "Full Name", data: "fullname"},
                { title: "Contact", data: "contact" },
				{ title: "Score", data: "score" },
				{ title: "Time", data: "time" },
				{ title: "Attempt", data: "attempt"}
			],
             "columnDefs": [ {
                "searchable": false,
                "orderable": false,
                "targets": 0
            }],
 			"pagingType": "full_numbers",
			"buttons": ['copy', 'csv', 'excel', 'pdf'],
			"dom": 'Blfrtp',
            "paging": false

		} );

        leader_table.on( 'order.dt search.dt', function () {
            leader_table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();

	};
};
}

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
