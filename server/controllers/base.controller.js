const BaseController = {
  getAll: function(req, res, next) {
    this.model.findAll()
      .then(function(results) {
        if (results.length === 0) {
          res.status(200).send({message: 'No records returned'});
          return;
        }

        res.status(200).send({results: results});
      }).catch(function(error) {
      handleError(error, res);
    });
  },

  create: function(req, res, next) {
    this.model.forge(req.body).save()
      .then(function(newObj) {
        res.status(200).send(newObj);
      }).catch(function(error) {
      handleError(error, res);
    });
  },

  read: function(req, res, next) {
    this.model.findById(req.params.id)
      .then(function(model) {
        if (!model) {
          res.status(200).send({message: 'No records returned.'});
          return;
        }
        res.status(200).send(model);
      })
      .catch(function(error) {
        handleError(error, res);
      });
  },

  update: function(req, res, next) {
    this.model.updateById(req.params.id, req.body)
      .then(function(model) {
        res.status(200).send(model);
      })
      .catch(function(error) {
        handleError(error, res);
      });
  },

  destroy: function(req, res, next) {
    this.model.destroyById(req.params.id)
      .then(function() {
        res.status(200).send('OK');
      })
      .catch(function(error) {
        handleError(error, res);
      });
  }
};

BaseController.extend = function extend(obj) {
  return Object.assign({}, BaseController, obj);
};

function handleError(error, res){
  console.log(error);
  return res.status(400).send({error: error});
}

module.exports = BaseController;