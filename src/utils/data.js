import PropTypes from 'prop-types';


const INGREDIENTS_URL   =  "https://norma.nomoreparties.space/api/ingredients";
const SEND_ORDER_URL    =  "https://norma.nomoreparties.space/api/orders";




export async function apiGetIngredients()
{
   try {
      const response    =  await fetch(INGREDIENTS_URL)
      
      if ( !response.ok ) {
         return {error: "Ответ сети был не ok..."}
      }

      const data     =  await response.json();
      if ( data.success !== true ) {
         return {error: "Сервер вернул ошибку data.success..."}
      }

      return { list: data.data }
      
   }
   catch (error)
   {
      return {error: `Возникла проблема с вашим fetch запросом: ${error.message}`}
   }
}




export async function apiSendOrder(bodyData)
{
   try {
      const response    =  await fetch(SEND_ORDER_URL, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(bodyData),
      })
      
      if ( !response.ok ) {
         return {error: "Ответ сети был не ok..."}
      }

      const data     =  await response.json();
      if ( data.success !== true ) {
         return {error: "Сервер вернул ошибку data.success..."}
      }
      
      return { ...data }
      
   }
   catch (error)
   {
      return {error: `Возникла проблема с вашим fetch запросом: ${error.message}`}
   }
}






export const ingredientListObject = PropTypes.shape({
   _id:           PropTypes.string.isRequired,
   name:          PropTypes.string.isRequired,
   type:          PropTypes.string.isRequired,
   proteins:      PropTypes.number,
   fat:           PropTypes.number,
   carbohydrates: PropTypes.number,
   calories:      PropTypes.number,
   price:         PropTypes.number.isRequired,
   image:         PropTypes.string.isRequired,
   image_mobile:  PropTypes.string.isRequired,
   image_large:   PropTypes.string.isRequired,
   __v:           PropTypes.number
}); 




export function ingredientScroll(id)
{
   let section    =  document.getElementById(id)
   let area       =  section.parentNode;
   
   // прокрутка до точки
   let pointTop   =   0;
   while( section = section.previousSibling ) pointTop += section.scrollHeight;
   pointTop    =  pointTop === 0 ? pointTop: pointTop + 40;
   
   // смещение
   // шаг
   // duration
   const offset   =  pointTop - area.scrollTop;
   const step     =  area.scrollTop < offset ?  15 : -15;
   const duration =  8;

   //анимация
   if ( window.loop ) clearInterval(window.loop)

   window.loop = setInterval(function(){

      // console.log(area.scrollTop)
      area.scrollTop += step;
      
      if (  (step > 0 && area.scrollTop >= pointTop)
         || (step < 0 && area.scrollTop <= pointTop)
      )
      {
         area.scrollTop = pointTop
         // console.log(`pointTop = ${pointTop}`)
         // console.log(`area.scrollTop = ${area.scrollTop}`)
         return clearInterval(window.loop)
      }
      
   }, duration);
   
   
}



