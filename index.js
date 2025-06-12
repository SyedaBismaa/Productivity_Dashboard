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



