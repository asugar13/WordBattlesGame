$(document).ready(function() {
	$('#userSearch').click(function(evt) {
		$("table").empty();
		let formData = $('#inputUser');
		//console.log("lookup: " + formData);
		$.get('/user_lookup', formData, function(data) {
			console.log(data);
			let answer = data.answer;
			if (answer == "OK") {
				console.log(data.username,data.score);
				let row = $("<tr></tr>");
				row.append("<th>User ID</th>");
				row.append("<th>Score</th>");
				row.append("<th>Chat</th>");
				$("table").append(row);

			      row = $("<tr></tr>");
			      row.append("<td>" + data.username + "</td>");
			      row.append("<td>" + data.score + "</td>");
			      row.append("<td> <form action=/chat><button id=chatbut class=chatbut type=submit> Chat</button></form> </td>");

			      $("table").append(row);
			}
		});
	});
});
