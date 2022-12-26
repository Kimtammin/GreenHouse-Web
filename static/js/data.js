const category_value = document.getElementById("category");     // 데이터를 표시할 태그 초기화
const date_value = document.getElementById("date");
const button_value = document.getElementById("date_button");
const table = document.getElementById("value_table");
const table_body = document.getElementById("table_body");
table_body.style.display = "none";

const host = "localhost";                                       // 호스트 및 포트 초기화
const port = 9001;
let mqtt;

// 버튼 클릭시 호출될 함수 등록
// 날짜를 지정하지 않으면 경고
button_value.onclick = function()
{
    
    let datetime = date_value.value;
    if (datetime == "")
    {
        alert("None datetime");
        
        table_body.style.display = "none";
    }
    else{
        let len = table.rows.length;
        let value = category_value.options[category_value.selectedIndex].text;
        if(len != 1)
        {
            
            for(i=1; i < len; i++)
            {
                table.deleteRow(-1);
            }
        }
        table_body.style.display = "block";
        console.log(value + " " + datetime);
        sendMsg(value + " " + datetime);
            
        
    }
    
}

// 연결이 성공하면 호출될 함수
function onConnect()
{
    console.log("접속완료");
    mqtt.subscribe("database/#");
    sendMsg("data")
    
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
    message.destinationName = "page/data";
   
    mqtt.send(message);
}

// 메세지를 받으면 호출될 함수
function onMessageArrived(msg)
{
    out_msg = msg.payloadString;    
    if (out_msg == "None")
    {
        table_body.style.display = "none";
        alert("None Data");
        
    }
    else
    {
        db_values = out_msg.split(' ');
        console.log(db_values);
        table_row_col_add(db_values);
    }
}

// MQTT 연결 함수
function MQTTConnect()
{
    console.log("mqtt접속:"+host+","+port);
    //mqtt통신을 위한 클라이언트 객체 생성
    mqtt = new Paho.MQTT.Client(host,port,"database_value");//"javascript_client"는 클라이언트id
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

// 테이블 행, 열 추가
function table_row_col_add(db_values)
{
    let newRow = table_body.insertRow();

    for(i=1; i<6; i++){
    
        newCell = newRow.insertCell(i-1);
        if (i==1){
            newCell.innerText = db_values[i-1] + ' '+ db_values[i];
        }
        else{
            newCell.innerText = db_values[i];
        }
    }
}