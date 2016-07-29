const should = require('should');
const request = require('supertest');
const testHelpers = require('../utilities/testHelpers');
const server = require('../../server');
const Customer = require('../models/customer.model');

describe('/customers', function() {
  const url = 'http://localhost:3000';

  beforeEach(testHelpers.cleanDatabase);

  describe('/', function() {

    it('GET should return (204) and empty body when DB is empty', function(done) {
      request(url)
        .get('/customers')
        .end(function(err, response) {
          if (err) {
            throw new Error(err);
          }
          response.status.should.equal(204);
          response.body.should.be.empty();
          done();
        });
    });

    it('POST should return customer when successful', function(done) {
      const newCustomer = {emailAddress: 'rjstires@gmail.com'};
      request(url)
        .post('/customers')
        .send(newCustomer)
        .end(function(err, res) {
          if (err) {
            throw new Error(err);
          }
          res.status.should.be.equal(201);
          res.body.emailAddress.should.be.equal(newCustomer.emailAddress);
          done();
        });
    });

  });

  describe('/:id', function() {

    it('DELETE should return OK when a customer is deleted', function(done) {
      Customer.forge({emailAddress: 'name@domain.com'}).save()
        .then(function(customer) {
          request(url)
            .delete(`/customers/${customer.id}`)
            .end(
              function(err, response) {
                if(err) throw new Error(err);
                response.status.should.equal(200);
                response.text.should.equal('OK');
                done();
              }
            );
        });
    });

    it('PATCH should return updated resource on success.', function(done) {
      const newCustomer = {emailAddress: 'rjstires@gmail.com'};
      const updatedCustomer = {emailAddress: 'jarvis.dresden@gmail.com'};

      Customer.forge(newCustomer).save().then(function(customer) {
        request(url)
          .patch('/customers/' + customer.id)
          .send(updatedCustomer)
          .end(function(err, response) {
            if(err){
              throw new Error(err);
            }
            response.status.should.equal(200);
            response.body.should.have.properties(updatedCustomer);
            done();
          });
      });
    });

  });

});