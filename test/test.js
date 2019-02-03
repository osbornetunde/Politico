import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


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

