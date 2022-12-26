
const host = "localhost";                               // 호스트 및 포트 초기화
const port = 9001;
let mqtt;

const tem1 = document.getElementById('sm1-tem');        // 데이터를 표시할 태그 초기화
const hum1 = document.getElementById('sm1-hum');
const soil1 = document.getElementById('sm3-soil');

const tem2 = document.getElementById('sm2-tem');
const hum2 = document.getElementById('sm2-hum');
const soil2 = document.getElementById('sm3-soil2');

const water = document.getElementById("sm3-water");


// 연결이 성공하면 호출될 함수
function onConnect()
{
    console.log("접속완료");
    mqtt.subscribe("sensor/#");
    sendMsg('main');
    
}
    
// 연결이 실패하면 호출될 함수
function onFailure()
{
    console.log("접속실패");
}

// 메세지 전달 함수 
function sendMsg(msg)
{
    
    message = new Paho.MQTT.Message(msg);
    message.destinationName = "page/main";
   

    mqtt.send(message);
}
   
// 메세지를 받으면 호출될 함수 
function onMessageArrived(msg)
{
    console.log("호출");
    out_msg = msg.payloadString;
    console.log(out_msg);
    
    
    sensor_datas = JSON.parse(out_msg);
    
    tem1.innerHTML = sensor_datas.temperature_inner + " ℃";
    hum1.innerHTML = sensor_datas.humidity_inner+ " %";
    soil1.innerHTML = sensor_datas.soil_lettuce + " %";
    tem2.innerHTML = sensor_datas.temperature_outer + " ℃";
    hum2.innerHTML = sensor_datas.humidity_outer + " %";
    soil2.innerHTML = sensor_datas.soil_choy + " %";
    water.innerHTML = sensor_datas.water_level;
}


// MQTT 연결 함수
function MQTTConnect()
{
    
    mqtt = new Paho.MQTT.Client(host,port,"sensor_data");
    console.log("mqtt접속:"+host+","+port);
    console.log(mqtt);
    
    let options = {
        timeout:3,
        onSuccess:onConnect,
        onFailure:onFailure,
                
    };

    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}