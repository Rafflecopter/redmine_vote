function vote(direction) {
	$.ajax({
		url: "../vote/" + direction + ".js?id=" + $('#vote_issue_id').val() + "&count=" + $('#vote_count').val(),
		type: 'POST',
		context: document.body
		}).success(function(transport) {
			$('#voting_controls').html(transport);
		}).error(function() {
			$('#vote-failed').show();
		});
}

function clear() {
	$.ajax({
		url: "../vote/clear.js?id=" + $('#vote_issue_id').val(),
		type: 'DELETE',
		context: document.body
		}).success(function(transport) {
			$('#voting_controls').html(transport);
		}).error(function() {
			$('#vote-failed').show();
		});
}

$(document).ready(function() {
    if (! user_can_vote()) {
      $('#vote_up').remove()
    }

	$('#vote_up').click(function(event) {
		vote('up');
        record_vote_today()
        $('#vote_up').remove()
		return false; // Prevent link from following its href
	});
	
	$('#vote_down').click(function(event) {
		vote('down');
		return false; // Prevent link from following its href
	});
	
	$('#vote_delete').click(function(event) {
		clear();
		return false;
	});
});



function user_can_vote() {
  var midnight = _midnight()
  var last_vote = new Date(parseInt(localStorage.getItem(location.pathname) || 0, 10))

  return last_vote < midnight
}

function record_vote_today() {
  localStorage.setItem(location.pathname, Date.now())
}

function _midnight() {
  var d = new Date
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(1)

  return d
}

