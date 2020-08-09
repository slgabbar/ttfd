
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function undoPlay() {
	// console.log(shots_list);
	if (plays.length == 0) {
		return false;
	}
	var tmp = plays.pop();
	var pk = tmp[1].toString();
	var delete_url;
	if (tmp[0] == "shot.shot") {
		// user shot: pop, remove from chart, update score, delete from DB
		var shot_value = tmp[2];
		var last_shot = "#" + shots_list.pop();
		d3.select(last_shot).remove();
		USER_SCORE = USER_SCORE - shot_value;
		update_scoreboard('home', USER_SCORE);
		delete_url = '../../shot/delete/' + pk;
	} else if (tmp[0] == "stats.stats") {
		// user stat (non FT): pop, delete from DB
		delete_url = "../../stats/delete/" + pk;
	} else if (tmp[0] == "user_free_throw") {
		// user FT: update score, delete from DB
		var shot_value = tmp[2];
		USER_SCORE = USER_SCORE - shot_value;
		update_scoreboard('home', USER_SCORE);
		delete_url = '../../shot/delete/' + pk;
	}
	else {
		// last play was an opponent
		if (tmp[1] == 'shot') {
			var opp_last_shot = "#" + shots_list.pop();
			d3.select(opp_last_shot).remove();
		}
		var opp_last_play = "#" + pbp_list.pop();
		d3.select(opp_last_play).remove();

		//update opp score
		OPP_SCORE = OPP_SCORE - tmp[2];
		update_scoreboard('away', OPP_SCORE);
		return true;
	}

	var last_play = "#" + pbp_list.pop();
	d3.select(last_play).remove();

	$.ajax({
		url: delete_url,
		beforeSend: function(xhr) {
        	xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
		type: 'POST',
		data: {},
		error: function(result){
			console.log(result);
		},
		success: function(result) {
			console.log("successful delete.")
		}
	});
}


