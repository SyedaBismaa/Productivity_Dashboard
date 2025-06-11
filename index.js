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
      var allTask = document.querySelector(".allTask");
      var sum = "";
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