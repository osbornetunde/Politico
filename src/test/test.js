import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

// let chai = require('chai'); 
// let chaiHttp = require('chai-http');
// let app = require('../app');

chai.use(chaiHttp);
chai.should();




describe('Parties', () => {
    describe("GET /api/v1/parties", () => {


        // Test to get all party record
        it("should get all party records", (done) => {
            chai.request(app)
                .get('/api/v1/parties')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.eql('200');
                    res.body.should.be.a('object');
                    res.body.data[0].should.include.keys(
                        'id', 'name', 'hqAddress', 'logoUrl'
                        );
                    done();
                });
        });

        //Test to get a single party
        it("should get a single party", (done) => {
            // const id = 1;
            chai.request(app)
                .get('/api/v1/parties/1')
                .end((err, res) => {
                    // should.not.exist(err);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.an('object');
                    res.body.data[0].should.include.keys(
                        'id', 'name', 'hqAddress', 'logoUrl'
                        );
                    done();
                });
        });

        //Test not to get single party
        it("should not get a single party", (done) => {
            const id = 6;
            chai.request(app)
                .get(`/api/v1/parties/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('error');
                    done();
                });
        });

        //Test to create a party
        it("should create a party", (done) => {
            chai.request(app)
            .put('/api/v1/parties')
            .send({ id: 3, name:'PYY', hqAddress: 'wuse', logoUrl:'unsplash.com'})
            .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
            });
        })
    });
        //Test to delete a party
        it("should delete a party", (done) => {
                chai.request(app)
                    .delete(`/api/v1/parties/1`)
                    .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.not.be.a('object');
                    done();
            });
        })





        //Test to edit a party
        it("should edit a party", (done) => {
            chai.request(app)
            .patch('/api/v1/parties/1')
            .send({ id: 1, name:'PYY', hqAddress: 'wuse', logoUrl:'unsplash.com'})
            .end((err, res) => {
                res.should.have.status(200);
                should.equal(err, null);  
                res.should.be.json; 
                res.body.should.be.a('object'); 
                done();
            });
        })

    });


//    Test for Offices
describe('Offices', () => {
    describe("GET /api/v1/offices", () => {

        //Test to get all office
        it("should get all office", (done) => {
            chai.request(app)
                .get('/api/v1/offices')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });


        // Test to create a office
        it("should create an office", (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({type:'legislative', name:'chairman'})
            .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.be.a('object');
                    done();
            });
        })

        //Test to get a single office
        it("should get a single office", (done) => {
            const id = 1;
            chai.request(app)
                .get(`/api/v1/offices/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

