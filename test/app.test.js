const { expect } = require('chai');
const supertest = require('supertest');
const { server, handleRequest } = require('../index');
const os = require('os');

describe('Node.js Application Tests', () => {
  // Test the response from the HTTP server
  it('should respond with the correct message', (done) => {
    const hostname = os.hostname();
    supertest(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal(`Hi there! I'm being served from ${hostname} main branch`);
        done();
      });
  });

  // Test the handler function directly
  it('should call handleRequest and return the correct message', (done) => {
    const mockRequest = {};
    const mockResponse = {
      write: function (data) {
        this.body = data;
      },
      end: function () {
        this.finished = true;
      },
    };

    handleRequest(mockRequest, mockResponse);

    const hostname = os.hostname();
    expect(mockResponse.body).to.equal(`Hi there! I'm being served from ${hostname} main branch`);
    expect(mockResponse.finished).to.be.true;
    done();
  });
});

// Close the server after tests
after(() => {
  server.close();
});
