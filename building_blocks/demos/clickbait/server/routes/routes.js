

var appRouter = function(app) {

    app.get('/test', function(req,res){
        var field = req.query.test_field

        res.send("field")

    })
}
module.exports = appRouter;





