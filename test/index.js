// import {delay, resolve} from "bluebird";
import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
// import R from "ramda";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import * as indexModule from "index";
import {handler} from "index";

chai.use(chaiAsPromised);
chai.use(sinonChai);


describe("wi6labs readings handler", () => {
    var dispatchSpy = sinon.stub().returns(Promise.resolve());
    indexModule.__Rewire__("dispatch", dispatchSpy);
    it("calls dispatch function with the correct parameters", (done) => {
        var fakeRequest = {
            "url":"/",
            "method":"POST",
            "headers":{},
            "body":"1000101c6666620a0000294a0b100021a00c2000292d04",
            "params":{}
        };
        var fakeContext ={"succeed": sinon.spy(), "fail": sinon.spy()};
        var promise = handler(fakeRequest, fakeContext);

        // assertions
        promise.then(function () {
            expect(dispatchSpy).to.have.callCount(1);
            expect(dispatchSpy).to.have.been.calledWith("element inserted in collection wi6labs-raw-reading");
            // var secondParameter = dispatchSpy.getCall(0).args[1];

            // expect(secondParameter).to.deep.equal(expectedOutput);
            done();
        }, function (error) {
            done(error);
        });
    });

});

/*
var expectedOutput=  {
    "sensorId": "0x00000000AC000004",
    "date": "2022-04-25T09:13:00.000Z",
    "measurements": [
        {
            "type": "Temperature",
            "source": "reading",
            "unitOfMeasurement": "°C",
            "value": 28.9
        },
        {
            "type": "Humidity",
            "source": "reading",
            "unitOfMeasurement": "%",
            "value": 32.32
        },
        {
            "type": "DewPoint",
            "source": "reading",
            "unitOfMeasurement": "°C",
            "value": 10.69
        }
    ]
};
*/
