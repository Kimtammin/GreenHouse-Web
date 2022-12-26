const tog = document.getElementById("cctv_btn");            // 버튼 및 슬라이더 초기화
const text = document.getElementById("cctv_text");
const sl1 = document.getElementById('sl');

const host = "localhost";                                   // 호스트 및 포트 초기화
const port = 9001;
let mqtt;

// 버튼 클릭시 호출될 함수 등록
tog.onclick = function()
{
    tog.classList.toggle("active");
    console.log("클릭");
    value = text.innerHTML;

    if (value == "CAM OFF")
    {
        document.getElementById("cctv").style.display="inline-block";
        text.innerHTML = "CAM ON";
        sendMsg("cctv_on");
        
    }
    else
    {
        document.getElementById("cctv").style.display="none";
        text.innerHTML = "CAM OFF";
        sendMsg("cctv_off");
    }
}

// 슬라이더 함수 등록( 앞 숫자로 확대크기 결정 )
function sendValue()
{
    sendMsg(sl1.value + " cam");
    console.log(sl1.value);
}

// 연결이 성공하면 호출될 함수
function onConnect()
{
    console.log("접속완료");
    sendMsg("cctv");
    mqtt.subscribe('streaming/#');
    
}
    

// 연결이 실패하면 호출될 함수
function onFailure()
{
    console.log("접속실패");
}

// 메세지 전달 함수
function  sendMsg(msg)
{
    
    message = new Paho.MQTT.Message(msg);
    message.destinationName = "page/cctv";
    

    mqtt.send(message);
}

// 메세지를 받으면 호출될 함수
function onMessageArrived(msg)
{
    // 이미지 출력
    document.getElementById('cctv_img1').src = "data:image/jpeg;base64,"+btoa(String.fromCharCode.apply(null, msg.payloadBytes))
    
   
}

// MQTT 연결 함수
function MQTTConnect(){
    document.getElementById("cctv").style.display = "none";
    
    console.log("mqtt접속:"+host+","+port);
    //mqtt통신을 위한 클라이언트 객체 생성
    mqtt = new Paho.MQTT.Client(host,port,"cam_data");//"javascript_client"는 클라이언트id
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