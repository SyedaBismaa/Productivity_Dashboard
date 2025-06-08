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

var form = document.querySelector('.addTask form');
var taskInput = document.querySelector('.addTask form #Task-input');
var taskDetsInput = document.querySelector('.addTask form textarea');
var taskCheckbox = document.querySelector('.addTask form #check');

const currentTask = [
   {
      task: "khana banao",
      details: "mirch masala dal k",
      imp: true,
   },
   {
      task: "school japo",
      details: "books leke jao",
      imp: false,
   },
   {
      task: "pizaa khao",
      details: "mirch masala dal k",
      imp: true,
   }
]



function renderTask() {
   var allTask = document.querySelector(".allTask");
   var sum = "";
   currentTask.forEach(function (elem) {
      sum += `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
                        <button>Mark as completed</button>
                    </div> `
   })

   allTask.innerHTML = sum;
}
renderTask();


form.addEventListener('submit', (e) => {
   e.preventDefault();
   // console.log(taskInput.value);
   // console.log(taskDetsInput.value);
   // console.log(taskCheckbox.checked);

   currentTask.push(
      {
         task: taskInput.value,
         details: taskDetsInput.valueS,
         imp: taskCheckbox.checked
      }
   )
   renderTask();

})