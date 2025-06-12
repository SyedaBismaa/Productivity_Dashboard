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
// https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes
    async function fetchQuote() {
        try {
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.quotable.io/random');
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            const quote = data[randomIndex];

            motivationQuoteContent.innerHTML = `"${quote.q}"`;
            motivationAuthor.innerHTML = `– ${quote.a}`;
        } catch (error) {
            console.error("Failed to fetch quote:", error);
            motivationQuoteContent.innerHTML = "Failed to load quote 😞";
            motivationAuthor.innerHTML = "";
        }
    }

    fetchQuote();
}

motivationalQuote();






// https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes