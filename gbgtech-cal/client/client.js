var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

Template.home.helpers({

})

Template.month.rendered = function() {
	var d = new Date()
	Session.set('currentMonth', d.getMonth())
	Session.set('currentYear', d.getFullYear())

	this.autorun(function() {
		var m = Session.get('currentMonth')
		var y = Session.get('currentYear')

		d = new Date(y, m)
		nbrOfDays = new Date(y, m+1, 0).getDate();
		var weekNbr = 0;
		var newWeek = false;
		var startingDay = d.getDay(y,m,1)
		if(startingDay == 0) {
			startingDay = 6
		} else {
			startingDay = startingDay-1
		}
		$('#week-container').empty();
		// Render first week of month
		Blaze.renderWithData(Template.week, {'weekNbr': weekNbr}, $('#week-container').get(0))

		//Render dummy days if the month starts in the middle of the week
		for(var i = 0; i < startingDay; i++) {
			Blaze.renderWithData(Template.day, {'id': 'dummy-'+i}, $('#week-'+weekNbr).get(0))
		}
		var date = 1;
		// Render the days of the month
		for(var i = startingDay; i < nbrOfDays+startingDay; i++) {
			if(newWeek) {
				Blaze.renderWithData(Template.week, {'weekNbr': weekNbr}, $('#week-container').get(0))
				newWeek = false
			}
			Blaze.renderWithData(Template.day, {'id': y +"-"+m+"-"+date, 'date': date}, $('#week-'+weekNbr).get(0))
			date++;
			if((i%7) == 6) {
				newWeek = true;
				weekNbr++;
			}
		}
		

	})
};

Template.month.helpers({
	currentMonthAndYear: function() {
		var m = Session.get('currentMonth')
		var y = Session.get('currentYear') 
		return monthNames[m] + ", " + y
	}
})

Template.month.events({
	'click #days-generator': function(evt, err) {
		console.log("Created days")
		currentMonth = Session.get('currentMonth')
		currentMonth = Months.find({"nbr": currentMonth}).fetch()
		console.log(currentMonth[0].nbrOfDays)
		var date = 1;
		for (var i = currentMonth[0].startingDay; i < currentMonth[0].nbrOfDays+currentMonth[0].startingDay; i++) {
			Days.insert({
				"month": currentMonth[0].nbr,
				"date": date,
				"day": i%7,
				"events": []
			})
			date++;
		}	
	},

	'click input#next-month': function(evt, err) {
		var m = Session.get('currentMonth')
		if(m == 11) {
			m = -1
			var y = Session.get('currentYear')
			Session.set('currentYear', y+1)
		}
		Session.set('currentMonth', m+1)
	},

	'click input#prev-month': function(evt, err) {
		var m = Session.get('currentMonth')
		if(m == 0) {
			m = 12
			var y = Session.get('currentYear')
			Session.set('currentYear', y-1)	
		}
		Session.set('currentMonth', m-1)
	}
})