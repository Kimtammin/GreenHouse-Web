

const led_btn = document.getElementById("LED_btn");                 // 버튼 초기화
const led_text = document.getElementById("LED");

const water_btn1 = document.getElementById("water1_btn");
const water_btn2 = document.getElementById("water2_btn");
const water_text1 = document.getElementById("water1");
const water_text2 = document.getElementById("water2");

const cooling_btn = document.getElementById("cooling_btn");
const cooling_text = document.getElementById("cooling");
let text = ""
// 버튼 이벤트 등록
led_btn.onclick = function()
{
    if(wait_point == true)
    {
        alert("워터펌프 작동중...");
    }
    else{
        text = led_text.innerHTML;
        console.log(text);
        if(text == "LED OFF")
        {
            led_text.innerHTML = "LED ON";
            sendMsg("led ON");
            console.log('led on publish');
        }
        else
        {
            led_text.innerHTML= "LED OFF";
            sendMsg('led OFF');
            console.log('led off publish');
        }
    }
}



water_btn1.onclick = function()
{
    if(wait_point == true)
    {
        alert("워터펌프 작동 중...");
    }
    else
    {
        ltext = water_text1.innerHTML;
        console.log(text);
        if(text == "Water Pump OFF")
        {
            water_text1.innerHTML = "Water Pump ON";
            sendMsg("water1 ON");
            console.log('water on publish');
            wait_point = true;
        }
    }
}

water_btn2.onclick = function()
{
    if(wait_point == true)
    {
        alert("워터펌프 작동 중...");
    }
    else
    {
        text = water_text2.innerHTML;
        console.log(text);
        if(text == "Water Pump OFF")
        {
            water_text2.innerHTML = "Water Pump ON";
            sendMsg("water2 ON");
            console.log('water on publish');
            wait_point = true;
        }
    }
}


cooling_btn.onclick = function()
{
    if(wait_point == true)
    {
        alert("워터펌프 작동 중...");
    }
    else{
        text = cooling_text.innerHTML;
        console.log(text);
        if(text == "Cooling Fan OFF")
        {
            cooling_text.innerHTML = "Cooling Fan ON";
            sendMsg("cooling ON");
            console.log('Cooling on publish');
        }
        else
        {
            cooling_text.innerHTML= "Cooling Fan OFF";
            sendMsg('cooling OFF');
            console.log('Cooling off publish');
        }
    }
}

