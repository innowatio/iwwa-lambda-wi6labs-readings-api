// import * as bitConverter from  "./BinaryParser";
import * as dtLogParser from "./dtLogParser";
// import * as moment from "moment";
// var moment = require("moment");


export function getEventFromObject (req) {
    var mainbuf = [];
    var mainbufIdx=0;
    for (var i = 0; i < req.body.length; i+=2) {
        mainbuf[mainbufIdx] = req.body.substr(i, 2);
        mainbufIdx++;
    }

    var m_temperature = 0;
    try {
        m_temperature = ((parseInt(mainbuf[12], 16) * 256) + parseInt(mainbuf[11], 16)) / 100;
    } catch (e) {
        m_temperature = 0;
    }

    var m_humidity = 0;
    try {
        m_humidity = ((parseInt(mainbuf[17], 16) * 256) + parseInt(mainbuf[16], 16)) / 100;
    } catch (e) {
        m_humidity = 0;
    }

    var m_dewpoint = 0;
    try {
        m_dewpoint = ((parseInt(mainbuf[22], 16) * 256) + parseInt(mainbuf[21], 16)) / 100;
    } catch (e) {
        m_dewpoint = 0;
    }

    var m_Model = {};
    m_Model.sensorId = "0x00000000AC000004";
    m_Model.date = dtLogParser.parse_dtLog(new Date());
    // console.log(m_Model.date);

    var measurementsList=[];
    var measurements={};

    measurements={};
    measurements.type="Temperature";
    measurements.source="reading";
    measurements.unitOfMeasurement="°C";
    measurements.value=m_temperature;
    measurementsList.push(measurements);

    measurements={};
    measurements.type="Humidity";
    measurements.source="reading";
    measurements.unitOfMeasurement="%";
    measurements.value=m_humidity;
    measurementsList.push(measurements);

    measurements={};
    measurements.type="DewPoint";
    measurements.source="reading";
    measurements.unitOfMeasurement="°C";
    measurements.value=m_dewpoint;
    measurementsList.push(measurements);

    m_Model.measurements=measurementsList;


    // console.log(m_Model);

    return m_Model;
}
