module.exports = function(app,db){
    app.post('/notes',(req,res) => {
        //creating note
        res.send('Hi')
    });
};