const host = "localhost";                       // 호스트 및 포트 초기화
const port = 9001;
let mqtt;
let wait_point = false



// 연결이 성공하면 호출될 함수
function onConnect()
{
    console.log("접속완료");
    sendMsg("control");
    mqtt.subscribe('control/#');
    
}

// 연결이 실패하면 호출될 함수
function onFailure()
{
    console.log("접속실패");
}

// 메세지 전달 함수
function  sendMsg(msg)
{
  
    let message = new Paho.MQTT.Message(msg);
    message.destinationName = "page/control";
    

    mqtt.send(message);

}

// 메세지를 받으면 호출될 함수 
function onMessageArrived(msg)
{
        let message = msg.payloadString;
        if(message == "let_water")
        {
            wait_point = false;            
            water_text1.innerHTML= "Water Pump OFF";
            console.log('water off publish');
        }
        else if(message == "choy_water")
        {
            wait_point = false;
            water_text2.innerHTML= "Water Pump OFF";
            console.log('water off publish');
        }
}

// MQTT 연결 함수
function MQTTConnect()
{
   
    console.log("mqtt접속:"+host+","+port);
    //mqtt통신을 위한 클라이언트 객체 생성
    mqtt = new Paho.MQTT.Client(host,port,"control_data");//"javascript_client"는 클라이언트id
    console.log(mqtt)
    //mqtt통신을 위해 필요한 설정을 명시
    let options = {
        timeout:3,
        onSuccess:onConnect, //접속 성공 했을 때 실행될 콜백함수 등록
        onFailure:onFailure,
                
    };

    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}