module.export= function(app) {
	app.put('/updateDocument/:id', function(req, res, next){
		product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
		.delete('delDocument/:id', function(req, res, next) {
			product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
				if (err) return next(err);
				res.json(post);
			});
		});
	})
}