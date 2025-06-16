function OpenCards() {

   var allElems = document.querySelectorAll('.Elem');
   var FullElemPage = document.querySelectorAll('.fullElem')
   var FullElemPageBackBtn = document.querySelectorAll('.fullElem .back')
   allElems.forEach(function (Elem) {
      Elem.addEventListener('click', function () {

         FullElemPage[Elem.id].style.display = 'block';

      })

   })

   FullElemPageBackBtn.forEach(function (back) {
      back.addEventListener('click', function () {
         FullElemPage[back.id].style.display = 'none';
      })

   })
}
OpenCards();

function TodoList() {
   var form = document.querySelector('.addTask form');
   var taskInput = document.querySelector('.addTask form #Task-input');
   var taskDetsInput = document.querySelector('.addTask form textarea');
   var taskCheckbox = document.querySelector('.addTask form #check');

   var currentTask = []

   if (localStorage.getItem(('currentTask'))) {
      currentTask = JSON.parse(localStorage.getItem(("currentTask")));
   } else {
      alert("Task List Is Empty..");
   }

   function renderTask() {
      localStorage.setItem('currentTask', JSON.stringify(currentTask))
      let allTask = document.querySelector(".allTask");
      let sum = "";
      currentTask.forEach(function (elem, idx) {
         sum += `<div class="task">
           <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
           <button id=${idx}>Mark as completed</button>
           </div> `
      })

      allTask.innerHTML = sum;

      var markCompletedBtn = document.querySelectorAll('.task button');
      markCompletedBtn.forEach(function (btn) {
         btn.addEventListener('click', function () {
            currentTask.splice(btn.id, 1);
            renderTask();


         })
         taskCheckbox.checked = false;
         taskInput.value = "";
         taskDetsInput.value = "";
      })
   }
   renderTask();



   form.addEventListener('submit', (e) => {
      e.preventDefault();

      currentTask.push(
         {
            task: taskInput.value,
            details: taskDetsInput.value,
            imp: taskCheckbox.checked
         }
      )
      renderTask();

   })


}

TodoList();

function dailyPlanner() {
   var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}
   var dayPlanner = document.querySelector('.day-planner');

   var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

   var wholeDaySum = ' '
   hours.forEach(function (elem, idx) {
      var saveData = dayPlanData[idx] || '';

      wholeDaySum += `
 <div class="time-planner">
   <p>${elem}</p>
   <input id=${idx} type="text" placeholder="..." value=${saveData}>
</div>  `
   })

   dayPlanner.innerHTML = wholeDaySum;

   var dayPlannerInput = document.querySelectorAll('.day-planner input');


   dayPlannerInput.forEach(function (elem) {
      elem.addEventListener('input', function () {
         dayPlanData[elem.id] = elem.value;

         localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));

      })
   })
}
dailyPlanner();


function motivationalQuote() {
   const motivationQuoteContent = document.querySelector('.moti-2 h1');
   const motivationAuthor = document.querySelector('.moti-3 h2');

   // Fallback quotes
   const fallbackQuotes = [
      { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
      { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
      { q: "Stay hungry, stay foolish.", a: "Steve Jobs" }
   ];

   async function fetchQuote() {
      // Check cache
      const cachedQuote = localStorage.getItem('motivationalQuote');
      const cacheTimestamp = localStorage.getItem('quoteTimestamp');
      const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours

      if (cachedQuote && cacheTimestamp && Date.now() - cacheTimestamp < cacheDuration) {
         const quote = JSON.parse(cachedQuote);
         motivationQuoteContent.innerHTML = `"${quote.q}"`;
         motivationAuthor.innerHTML = `– ${quote.a}`;
         return;
      }

      try {
         const response = await fetch('https://thingproxy.freeboard.io/fetch/https://zenquotes.io/api/quotes');
         const data = await response.json(); // No need to parse contents with this proxy
         const randomIndex = Math.floor(Math.random() * data.length);
         const quote = data[randomIndex];

         // Update DOM
         motivationQuoteContent.innerHTML = `"${quote.q}"`;
         motivationAuthor.innerHTML = `– ${quote.a}`;

         // Cache the quote
         localStorage.setItem('motivationalQuote', JSON.stringify(quote));
         localStorage.setItem('quoteTimestamp', Date.now());
      } catch (error) {
         console.error("Failed to fetch quote:", error);
         // Use fallback quote
         const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
         motivationQuoteContent.innerHTML = `"${randomFallback.q}"`;
         motivationAuthor.innerHTML = `– ${randomFallback.a}`;
      }
   }

   fetchQuote();
}

motivationalQuote();


function PomodoroTimer() {
   var timer = document.querySelector('.pomo-timer h1');
   var startBtn = document.querySelector('.pomo-timer .start');
   var pauseBtn = document.querySelector('.pomo-timer .pause');
   var resetBtn = document.querySelector('.pomo-timer .Reset');
   var Wsession = document.querySelector('.pomodoro-fullpage .work-session')
   var isworkSession = true;

   let totalSeconds = 25 * 60
   let TimeInterval = null;

   function updateTimer() {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`

   }

   function startTimer() {
      clearInterval(TimeInterval);
      if (isworkSession) {
         TimeInterval = setInterval(function () {
            if (totalSeconds > 0) {
               totalSeconds--
               updateTimer()
            } else {
               isworkSession = false;
               clearInterval(TimeInterval);
               timer.innerHTML = '05:00'
               Wsession.innerHTML = 'Break Time',
                  Wsession.style.backgroundColor = 'var(--blue)';
               totalSeconds = 5 * 60;

            }

         }, 1000)
      } else {


         TimeInterval = setInterval(function () {
            if (totalSeconds > 0) {
               totalSeconds--
               updateTimer()
            } else {
               isworkSession = true;
               clearInterval(TimeInterval);
               timer.innerHTML = '25:00'
               Wsession.innerHTML = 'Work Session',
                  Wsession.style.backgroundColor = 'var(--green)';
               totalSeconds = 25 * 60;

            }

         }, 1000)
      }
   }

   function pauseTimer() {
      clearInterval(TimeInterval);
   }
   function resetTimer() {
      totalSeconds = 25 * 60;
      clearInterval(TimeInterval);
      updateTimer();
   }

   startBtn.addEventListener('click', startTimer)
   pauseBtn.addEventListener('click', pauseTimer)
   resetBtn.addEventListener('click', resetTimer)
}

PomodoroTimer();


function WeatherDash() {

   var cityres = prompt("Enter Your City Please!");


   var apiKey = '0e4fbc436dec47c7baa61455251506';
   var city = `${cityres}`;


   var header1Time = document.querySelector('.header-1 h1');
   var header1Date = document.querySelector('.header-1 h2');
   var header1Location = document.querySelector('.header-1 h4');


   var header2Temp = document.querySelector('.header-2 h2');
   var header2Condition = document.querySelector('.header-2 h4');
   var heatidx = document.querySelector('.header-2 .heatidx');
   var Humidity = document.querySelector('.header-2 .Humidity');
   var wind = document.querySelector('.header-2 .Wind');




   async function wheatherApiCall() {
      var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      var data = await response.json();

      header2Temp.innerHTML = `${data.current.temp_c} °C`
      header2Condition.innerHTML = `${data.current.condition.text} °C`
      wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
      Humidity.innerHTML = `Humidity: ${data.current.humidity}%`
      heatidx.innerHTML = `HeatIndex: ${data.current.heatindex_c}%`

      header1Location.innerHTML = `${data.location.name}, ${data.location.region}`


   }

   wheatherApiCall();





   function dateTime() {
      const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const totalMonthNames = [
         "January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
      ];
      var date = new Date();
      var daysOfWeek = totalDaysOfWeek[date.getDay()];
      var Hours = date.getHours();
      var minuts = date.getMinutes();
      var secounds = date.getSeconds();
      var Datee = date.getDate();
      var month = totalMonthNames[date.getMonth()]
      var year = date.getFullYear();

      header1Date.innerHTML = `${Datee} ${month}, ${year}`


      if (Hours > 12) {
         header1Time.innerHTML = `${daysOfWeek}, ${String(Hours - 12).padStart('2', '0')}:${String(minuts).padStart('2', '0')}:${String(secounds).padStart('2', '0')} PM`;
      } else {
         header1Time.innerHTML = `${daysOfWeek}, ${String(Hours - 12).padStart('2', '0')}:${String(minuts).padStart('2', '0')}:${String(secounds).padStart('2', '0')} AM`;
      }
   }


   setInterval(() => {
      dateTime();
   }, 1000);
}

WeatherDash();

function changeTheme() {

   var theme = document.querySelector('.theme')
   var rootElement = document.documentElement

   var flag = 0
   theme.addEventListener('click', function () {


      if (flag === 0) {
         rootElement.style.setProperty('--pri', '#5C4033');
         rootElement.style.setProperty('--sec', '#B29985');
         rootElement.style.setProperty('--tri1', '#F5EDE3');
         rootElement.style.setProperty('--tri2', '#D7CCC8');
         rootElement.style.setProperty('--tri3', '#CBA192');
         rootElement.style.setProperty('--green', '#9DC183');
         rootElement.style.setProperty('--blue', '#7A9E9F');
         flag = 1;
      } else if (flag === 1) {
         rootElement.style.setProperty('--pri', '#2F3E46');
         rootElement.style.setProperty('--sec', '#84A98C');
         rootElement.style.setProperty('--tri1', '#CAD2C5');
         rootElement.style.setProperty('--tri2', '#EDF6F9');
         rootElement.style.setProperty('--tri3', '#B5CDA3');
         rootElement.style.setProperty('--green', '#A3B18A');
         rootElement.style.setProperty('--blue', '#6C91BF');
         flag = 2;
      } else if (flag === 2) {
         // Theme 3 – Mocha Glow (Updated)
         rootElement.style.setProperty('--pri', '#2E1F1B');
         rootElement.style.setProperty('--sec', '#A47148');
         rootElement.style.setProperty('--tri1', '#F4ECE6');
         rootElement.style.setProperty('--tri2', '#8E735B');
         rootElement.style.setProperty('--tri3', '#D9A86C');
         rootElement.style.setProperty('--green', '#B6CE91');
         rootElement.style.setProperty('--blue', '#9CB4C0');
         flag = 3;
      } else {
         // Default – Ocean Calm (your main palette)
         rootElement.style.setProperty('--pri', '#1E2A44');
         rootElement.style.setProperty('--sec', '#4A8B9F');
         rootElement.style.setProperty('--tri1', '#F5F7FA');
         rootElement.style.setProperty('--tri2', '#E0E7F0');
         rootElement.style.setProperty('--tri3', '#FF6B6B');
         rootElement.style.setProperty('--green', '#2ECC71');
         rootElement.style.setProperty('--blue', '#3498DB');
         flag = 0;
      }

   })


}

changeTheme()