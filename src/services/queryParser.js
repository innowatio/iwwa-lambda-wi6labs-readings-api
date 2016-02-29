// import * as bitConverter from  "./BinaryParser";
// import * as dtLogParser from "./dtLogParser";
import * as moment from "moment";


export function getEventFromObject (req) {
    console.log("body.length", req.body.length);
    
    var mainbuf = [];
    var mainbufIdx=0;
    for (var i = 0; i < req.body.length; i+=2) {
        mainbuf[mainbufIdx] = req.body.substr(i, 2);
        mainbufIdx++;
    }     
   
    var m_datebuf = new Buffer(4);
    m_datebuf[0] = "0x" + mainbuf[3];
    m_datebuf[1] = "0x" + mainbuf[4];
    m_datebuf[2] = "0x" + mainbuf[5];
    m_datebuf[3] = "0x" + mainbuf[6];
    var m_date = m_datebuf.readInt32LE(0);
    
    var m_temperature = ((parseInt(mainbuf[12], 16) * 256) + parseInt(mainbuf[11], 16)) / 100;
    var m_humidity = ((parseInt(mainbuf[17], 16) * 256) + parseInt(mainbuf[16], 16)) / 100;
    var m_dewpoint = ((parseInt(mainbuf[22], 16) * 256) + parseInt(mainbuf[21], 16)) / 100;
    
    var m_Model = {};
    m_Model.sensorId = "0x00000000AC000004";
    m_Model.date = moment.unix(m_date).toISOString();

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
   
    
    console.log(m_Model);   
          
    return m_Model;
}