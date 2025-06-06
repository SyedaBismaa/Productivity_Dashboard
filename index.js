
var allElems = document.querySelectorAll('.Elem');
var allFullElems = document.querySelectorAll('.fullElem')

 allElems.forEach(function(Elem){
    Elem.addEventListener('click', function(){
     
        allFullElems[Elem.id].style.display='block';
        
    })
    
 })