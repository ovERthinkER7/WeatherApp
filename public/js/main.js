const submitbtn=document.getElementById('submitBtn');
const cityName=document.getElementById('cityName');
const city_name=document.getElementById('city_name');
const temp=document.getElementById('temp');
const temp_status=document.getElementById('temp_status');
const cur_day=document.getElementById('day');
const cur_date=document.getElementById('today_date');
const weatherIcon=document.getElementById('weather-icon');
const datahide=document.querySelector('.middle_layer');

const getCurrentday = () => {
    var day = new Date();
    var weekday = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
    currentDay = weekday[day.getDay()];
    // console.log(currentDay);
    return currentDay;
}
const getCurrentTime = () => {
    var months = [
        "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"
    ];
    var now = new Date();
    var month = months[now.getMonth()];
    var daydate = now.getDate();
    return `${daydate} ${month}`;
}
cur_day.innerText=getCurrentday();
cur_date.innerHTML=getCurrentTime();
const getinfo= async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value;
    if(cityVal===""){
        city_name.innerText="Write the City Name!"
        datahide.classList.add('data_hide');
    }else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=5f07113912c2abdc7136d6b7d792a82e`;
            const response=await fetch(url);
            const data =await response.json();
            const arrData =[data];
            if(arrData[0].cod==200){
                city_name.innerHTML=`${arrData[0].name}, ${arrData[0].sys.country}`
                temp.innerHTML=`<span>${arrData[0].main.temp}</span><sup>o</sup>C`;
                temp_status.innerText=arrData[0].weather[0].main;
                weatherIcon.innerHTML=`<img src="image/icons/${arrData[0].weather[0].icon}.png" />`;
                // const tempstatus=arrData[0].weather[0].main;
                // if(tempstatus=="Sunny" || "Clear"){
                //     temp_status.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
                // }else if(tempstatus=="Smoke"){
                //     temp_status.innerHTML = `<i class="fas fa-smog" sytle="color:#074242 ;"></i>`;

                // }else if(tempstatus=="Clouds"||"Mist"){
                //     temp_status.innerHTML = `<i class="fas fa-cloud" sytle="color:#074242 ;"></i>`;

                // }
                // else if(tempstatus=="Rainy"){
                //     temp_status.innerHTML = `<i class="fas fa-cloud-rain" sytle="color:#074242 ;"></i>`;

                // }
                // else{
                //     temp_status.innerHTML = `<i class="fas fa-cloud" sytle="color:#074242 ;"></i>`;

                // }
                // console.log(tempstatus);
                
                datahide.classList.remove('data_hide');
            }else if(arrData[0].cod=="404"){
                city_name.innerText="Enter the Correct City Name";
                temp_status.innerText="";
                datahide.classList.add('data_hide');
            }
            

            
        }catch{
            // city_name.innerText="Enter the Correct City Name";
            datahide.classList.add('data_hide');

        }
    }
}

submitbtn.addEventListener('click',getinfo);