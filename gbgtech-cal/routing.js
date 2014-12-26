Router.route('/', function() {
	this.render('home')
}, {
	name: 'home'
})

Router.route('/organization', function() {
	this.render('orgView')
}, {
	name: 'orgView'
})

Router.route('/organization/new', function() {
	this.render('orgCreate')
}, {
	name: 'orgCreate'
})

Router.route('/event', function() {
	this.render('eventList')
}, {
	name: 'eventList'
})

Router.route('/event/new', function() {
	this.render('eventCreate')
}, {
	name: 'eventCreate'
})

Router.route('/event/:_id', function() {
	this.render('eventView', {
		data: function() {
			templateData = { event: Events.findOne({_id: this.params._id})};
			return templateData;
		}
	})
})

