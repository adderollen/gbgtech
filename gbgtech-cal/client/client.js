Template.home.helpers({

})

Template.month.rendered = function() {
	var d = new Date()
	var m = d.getMonth()
	Session.set('currentMonth', 0) // Testing purpose
};

Template.month.helpers({

})

Template.month.events({
	'click input': function(evt, err) {
		currentMonthNbr = Session.get('currentMonth')
		currentMonth = Months.find({"nbr": currentMonthNbr}).fetch()
		/*
		for (var i = currentMonth.startingDay; i < currentMonth.nbrOfDays; i++) {
			Days.insert({
				"month": 
				"date": i+1,
				"day": i % 7,
				"events": []
			})
		}
		*/		
	}
})