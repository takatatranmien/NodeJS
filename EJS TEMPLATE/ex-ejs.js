var ejs = require('ejs'),
	people = ['geddy', 'neil', 'alex'],
	html = ejs.render('<%= people.join(", "); %>', {people: people});

<script src="ejs.js"></script> 
<script>
	var people=['geddy', 'neil', 'alex'],
	html = ejs.render('<%= people.join(", "); %>', {people: people});
</script>