# GreenHouse-Web
SmartFarm Project - GreenHouse Web 
# GreenHouse-Web
SmartFarm Project - GreenHouse Web 
</br>
</br>
</br>
# 소개
라즈베리파이와 MQTT 브로커를 통해 통신을 주고 받으며 동작하는 Flask Version Web
MQTT 브로커의 종류는 mosquitto를 사용하였고, 기본 동작은 localhost에 mosquitto가 실행되어 있어야 합니다
![Web_Flow_Chart_last](https://user-images.githubusercontent.com/98437996/209534132-b7ae149a-7d45-4230-9aa5-c842673c0d1d.png)
웹 동작 Flow_Chart
</br>
</br>
</br>
## Main Page
![web_main PNG](https://user-images.githubusercontent.com/98437996/209532758-ffef712f-f126-475f-b37f-b5f529ed2d20.png)
Main Page의 경우 대쉬보드 형태입니다.
Page에 들어가면 연결된 브로커에게 Main Page임을 알리고, Raspberry PI는 통신을 받고
현재 센서값을 지속적으로 갱신하여 전달합니다.
</br>
</br>
</br>
## Data Page
![web_data PNG](https://user-images.githubusercontent.com/98437996/209532920-4274805c-7e4c-4420-9472-ebf0ecdd567a.png)
Data Page의 경우 이전 데이터를 불러와 원하는 시간대의 데이터를 확인하는 것입니다.
종류와 날짜를 지정하지 않거나 혹은 데이터가 없는 날짜를 선택하면 경고창을 발생시킵니다.
데이터베이스의 경우 Raspberry PI에서 InfluxDB를 사용합니다.
종류와 데이터가 저장된 날짜를 브로커에게 전송하여 Raspberry PI에 알리고, 그에 맞는 데이터를
query하여 데이터를 뽑아옵니다.
데이터는 테이블 형식으로 추가되며, InfluxDB에 특성상 시간순으로 자동 정렬됩니다.
</br>
</br>
</br>
## CCTV Page
![web_cctv](https://user-images.githubusercontent.com/98437996/209533388-a63c8978-b4df-4194-ab7b-027f99580540.png)
CCTV Page는 온실 속 환경을 실시간 스트리밍합니다.
카메라의 버튼을 누르면 Raspberry PI에게 알리고 지속적으로 이미지 프레임을 받아와 갱신해 줍니다.
아래 슬라이더는 현재 사진에서 더 자세하게 보고싶을 때 확대하는 기능이며, base64 인코딩 방식을 사용합니다.
</br>
</br>
</br>
## Control Page
![web_control PNG](https://user-images.githubusercontent.com/98437996/209533732-0dd8cb43-4d39-41da-8b70-93bfb0c6c74b.png)
Raspberry PI의 연결된 PIN들을 제어합니다.
저희 프로젝트에서는 Water Pump의 동작은 한개씩 동작하기 때문에 Water Pump작동 시에는 정해진 시간동안 다른 행동을
취할 수 없습니다.
</br>
</br>
</br>
# 출처
Background image
https://wallpapersafari.com/w/lyMNAf

Temperature icon
https://icon-icons.com/de/symbol/thermometer-voll-Temperatur/62245 ( 바이아나트 )

Humidity icon
https://iconarchive.com/show/lovely-weather-2-icons-by-custom-icon-design/Humidity-icon.html( 커스텀 아이콘 디자인 )

soil icon
https://www.flaticon.com/kr/free-icon/soil-analysis_6634686( photo3idea_studio )

water icon
https://kor.pngtree.com/freepng/vector-water-bottle-icon_3782861.html?sol=downref&id=bef( IYIKON )

logo icon
https://commons.wikimedia.org/wiki/File:Greenhouse_icon.svg( Victor Ostrovsky, Maria Cruz )
