let weekdays,
   day,
   setDate,
   id = 0;

const creator = document.getElementById('creator');
const card = document.getElementById(`cardContainer`);
const create = document.getElementById('create');
const chooseTheCountry = document.getElementById(`chooseTheCountry`);
const createButton = document.getElementById(`createButton`);
const edit = document.getElementById(`edit`);

const autoincrement = () => {
   id++;
   return id;
};

function createGame() {
   creator.style.visibility = 'visible';
   card.style.visibility = 'hidden';
   create.style.visibility = 'hidden';
   createButton.style.display = 'inline';
   edit.style.display = 'none';
}

function closeButton() {
   chooseTheCountry.style.visibility = 'hidden';
   creator.style.visibility = 'visible';
}

function cancelButton() {
   creator.style.visibility = 'hidden';
   card.style.visibility = 'visible';
   create.style.visibility = 'visible';
}

function showCountries() {
   chooseTheCountry.style.visibility = 'visible';
   create.style.visibility = 'hidden';
   creator.style.visibility = 'hidden';
}

function pickCountry(event) {
   const team = event.target;
   const countrySelector = document.getElementById('countrySelector');
   const handleCountryClick = (e) => {
      if (e.target.tagName != 'IMG') {
         closeButton();
      } else {
         const country = e.target.getAttribute('src');
         team.setAttribute('src', country);
         e.target.style.display = 'none';
         creator.style.visibility = 'visible';
         closeButton();

         const handleSecondCountryClick = (event) => {
            const secondCountry = event.target.getAttribute('src');
            if (secondCountry !== country) {
               //Here it gets the selected country and display it again
               e.target.style.display = 'grid';
            }
         };
         countrySelector.removeEventListener('click', handleCountryClick);
         countrySelector.addEventListener('click', handleSecondCountryClick, { once: true });
      }
   };
   countrySelector.addEventListener('click', handleCountryClick);
}

function getDate() {
   let getDateValue = document.getElementById(`date`).value;
   const dateValueObject = new Date(getDateValue);
   weekdays = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
   day = dateValueObject.getDay();
   setDate = dateValueObject.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function deleteCard() {
   document.addEventListener(
      `click`,
      (e) => {
         const getModifiedCardButtons = e.target.parentElement;
         const getParentElement = getModifiedCardButtons.parentElement;
         getParentElement.remove();
      },
      { once: true }
   );
}

function createCardGame() {
   getDate();
   autoincrement();

   const images = Array.from(document.querySelectorAll('.team')).map((img) => img.getAttribute('src'));
   const cardContainer = document.getElementById('cardContainer');
   const newElement = document.createElement('div');
   const firstGameHour = document.getElementById(`firstGameHour`).value;
   const secondGameHour = document.getElementById(`secondGameHour`).value;
   const thirdGameHour = document.getElementById(`thirdGameHour`).value;
   newElement.classList.add('card');
   newElement.id = id;
   newElement.innerHTML = `
     <header>  
       <p class="date"> ${setDate} </p>
       <p id="dayOfWeek"> ${weekdays[day]} </p>
     </header>
     
     <div class="games">
       <div class="col-a">
         <ul>
           <li>
             <button class="icon">
               <img src="${images[0]}" id="first" class="team"/>
             </button>
             <p id="firstGameHour"> ${firstGameHour} </p>
             <button class="icon">
               <img src="${images[1]}" id="second" class="team" />
             </button>
           </li>
         </ul>
       </div>
       <!-- 

       -->
       <div class="col-b">
         <ul>
           <li>
             <button class="icon">
               <img src="${images[2]}" id="third" class="team" />
             </button>
             <p id="secondGameHour"> ${secondGameHour} </p>
             <button class="icon">
               <img src="${images[3]}" id="fourth" class="team" />
             </button>
           </li>
         </ul>
       </div>
       <!-- 

       -->
       <div class="col-c">
         <ul>
           <li>
             <button class="icon">
               <img src="${images[4]}" id="fifth" class="team" />
             </button>
             <p id="thirdGameHour"> ${thirdGameHour} </p>
             <button class="icon">
               <img src="${images[5]}" id="sixth" class="team" />
             </button>
           </li>
         </ul>
       </div>
     </div>
     <div class="modifyCardButtons">
       <img src="./assets/delete.svg" onclick="deleteCard()" id="deleteButton">
       <img src="./assets/edit.svg" onclick="showEditCard()" id="editButton">
     </div>
     </svg>`;

   cardContainer.appendChild(newElement);
   creator.style.visibility = 'hidden';
   create.style.visibility = 'visible';
   cardContainer.style.visibility = 'visible';
}

function showEditCard() {
   createGame();
   const makeChanges = (e) => {
      const childElement = e.target.parentElement;
      const cardToBeEdit = childElement.parentElement;
      const getId = cardToBeEdit.getAttribute(`id`);
      getDate();
      editCard(getId);
   };
   document.addEventListener(`click`, makeChanges, { once: true });
   createButton.style.display = 'none';
   edit.style.display = 'inline';
}

function editCard(id) {
   const createEditedCard = () => {
      getDate();
      const images = Array.from(document.querySelectorAll('.team')).map((img) => img.getAttribute('src'));
      const firstGameHour = document.getElementById(`firstGameHour`).value;
      const secondGameHour = document.getElementById(`secondGameHour`).value;
      const thirdGameHour = document.getElementById(`thirdGameHour`).value;
      const newElement = document.getElementById(id);

      if (newElement) {
         newElement.innerHTML = `
       <header>  
         <p class="date"> ${setDate} </p>
         <p id="dayOfWeek"> ${weekdays[day]} </p>
       </header>
  
       <div class="games">
         <div class="col-a">
           <ul>
             <li>
               <button class="icon">
                 <img src="${images[0]}" id="first" class="team"/>
               </button>
               <p id="firstGameHour"> ${firstGameHour} </p>
               <button class="icon">
                 <img src="${images[1]}" id="second" class="team" />
               </button>
             </li>
           </ul>
         </div>
         <!-- 
  
         -->
         <div class="col-b">
           <ul>
             <li>
               <button class="icon">
                 <img src="${images[2]}" id="third" class="team" />
               </button>
               <p id="secondGameHour"> ${secondGameHour} </p>
               <button class="icon">
                 <img src="${images[3]}" id="fourth" class="team" />
               </button>
             </li>
           </ul>
         </div>
         <!-- 
  
         -->
         <div class="col-c">
           <ul>
             <li>
               <button class="icon">
                 <img src="${images[4]}" id="fifth" class="team" />
               </button>
               <p id="thirdGameHour"> ${thirdGameHour} </p>
               <button class="icon">
                 <img src="${images[5]}" id="sixth" class="team" />
               </button>
             </li>
           </ul>
         </div>
       </div>
       <div class="modifyCardButtons">
         <img src="./assets/delete.svg" onclick="deleteCard()" id="deleteButton">
         <img src="./assets/edit.svg" onclick="showEditCard()" id="editButton">
       </div>
         </svg>`;

         creator.style.visibility = 'hidden';
         card.style.visibility = 'visible';
         create.style.visibility = 'visible';
         createButton.style.display = 'inline';
         edit.style.display = 'none';
         document.getElementById(`edit`).removeEventListener('click', createEditedCard);
      }
   };
   document.getElementById(`edit`).addEventListener(`click`, createEditedCard);
}
