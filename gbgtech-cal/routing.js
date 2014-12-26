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

Router.route('/event/new', function() {
	this.render('eventCreate')
}, {
	name: 'eventCreate'
})