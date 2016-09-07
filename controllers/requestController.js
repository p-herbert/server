var db = require('../models/Database.js');

module.exports = {
  sendRequest: function(req, res, next) {
    var newRequest = {
      userId: req.user.id,
      requestReceiver: req.body.requestReceiver
    }
    db.Request.create(newRequest)
      .then(function(newRequest){
        res.status(201).send("Success")
      })
      .catch(function(err){
        res.status(404).json(err)
      })
  },

  getRequests: function(req, res, next){
    // db.Request.findAll({where: {requestReceiver: req.user.id}})
    //   .then(function(requestList){
    //     var query = requestList.reduce(function(total,request){
    //       total.push(request.dataValues.userId)
    //       return total;
    //     },[])
    //     db.User.findAll({
    //       where: {
    //           id: {
    //             $any: query
    //           }
    //       }
    //     })
    //       .then(function(requests){
    //         console.log("This is the friendslist", requests)
    //         res.status(201).json(requests)
    //       })
    //       .catch(function(err){
    //         res.status(404).json(err)
    //       })
    //   })
    //   .catch(function(err){
    //     res.status(404).json(err)
    //   })
    db.Request.findAll({
      where: { requestReceiver: req.user.id },
      include: {
        model: db.User,
        attributes: ['fullname']
      }
    })
      .then(function(requestList) {
        res.status(200).json(requestList);
      })
      .catch(function(err) {
        res.status(404).json(err);
      });
  }
}
