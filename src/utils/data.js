import PropTypes from 'prop-types';


export const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

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
   // scrollTop на сколько прокручен родитель
   // scrollHeight - это высота блока
   
   let section    =   document.getElementById(id)
   let area       =   section.parentNode;
   
   // прокрутка до точки
   let pointTop   =   0;
   while( section = section.previousSibling ) pointTop += section.scrollHeight;
   pointTop    =  pointTop === 0 ? pointTop: pointTop + 40;
   
   
   let offset     =  pointTop - area.scrollTop;       // смещение
   const step     =  area.scrollTop < offset ?  15 : -15;  // шаг смещения
   const duration =  8;

   // area.scrollTop = offset

   var loop = setInterval(function(){

      // console.log(area.scrollTop)
      area.scrollTop += step;
      
      if (  (step > 0 && area.scrollTop >= pointTop)
         || (step < 0 && area.scrollTop <= pointTop)
      )
      {
         area.scrollTop = pointTop
         // console.log(`pointTop = ${pointTop}`)
         // console.log(`area.scrollTop = ${area.scrollTop}`)
         return clearInterval(loop)
      }
      
   }, duration);
   
   
}

















































export const ingredientListData = [
    {
       "_id":"60666c42cc7b410027a1a9b1",
       "name":"Краторная булка N-200i",
       "type":"bun",
       "proteins":80,
       "fat":24,
       "carbohydrates":53,
       "calories":420,
       "price":1255,
       "image":"https://code.s3.yandex.net/react/code/bun-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b5",
       "name":"Говяжий метеорит (отбивная)",
       "type":"main",
       "proteins":800,
       "fat":800,
       "carbohydrates":300,
       "calories":2674,
       "price":3000,
       "image":"https://code.s3.yandex.net/react/code/meat-04.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b6",
       "name":"Биокотлета из марсианской Магнолии",
       "type":"main",
       "proteins":420,
       "fat":142,
       "carbohydrates":242,
       "calories":4242,
       "price":424,
       "image":"https://code.s3.yandex.net/react/code/meat-01.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b7",
       "name":"Соус Spicy-X",
       "type":"sauce",
       "proteins":30,
       "fat":20,
       "carbohydrates":40,
       "calories":30,
       "price":90,
       "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b4",
       "name":"Мясо бессмертных моллюсков Protostomia",
       "type":"main",
       "proteins":433,
       "fat":244,
       "carbohydrates":33,
       "calories":420,
       "price":1337,
       "image":"https://code.s3.yandex.net/react/code/meat-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b9",
       "name":"Соус традиционный галактический",
       "type":"sauce",
       "proteins":42,
       "fat":24,
       "carbohydrates":42,
       "calories":99,
       "price":15,
       "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b8",
       "name":"Соус фирменный Space Sauce",
       "type":"sauce",
       "proteins":50,
       "fat":22,
       "carbohydrates":11,
       "calories":14,
       "price":80,
       "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9bc",
       "name":"Плоды Фалленианского дерева",
       "type":"main",
       "proteins":20,
       "fat":5,
       "carbohydrates":55,
       "calories":77,
       "price":874,
       "image":"https://code.s3.yandex.net/react/code/sp_1.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9bb",
       "name":"Хрустящие минеральные кольца",
       "type":"main",
       "proteins":808,
       "fat":689,
       "carbohydrates":609,
       "calories":986,
       "price":300,
       "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9ba",
       "name":"Соус с шипами Антарианского плоскоходца",
       "type":"sauce",
       "proteins":101,
       "fat":99,
       "carbohydrates":100,
       "calories":100,
       "price":88,
       "image":"https://code.s3.yandex.net/react/code/sauce-01.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9bd",
       "name":"Кристаллы марсианских альфа-сахаридов",
       "type":"main",
       "proteins":234,
       "fat":432,
       "carbohydrates":111,
       "calories":189,
       "price":762,
       "image":"https://code.s3.yandex.net/react/code/core.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/core-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/core-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9be",
       "name":"Мини-салат Экзо-Плантаго",
       "type":"main",
       "proteins":1,
       "fat":2,
       "carbohydrates":3,
       "calories":6,
       "price":4400,
       "image":"https://code.s3.yandex.net/react/code/salad.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/salad-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/salad-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b3",
       "name":"Филе Люминесцентного тетраодонтимформа",
       "type":"main",
       "proteins":44,
       "fat":26,
       "carbohydrates":85,
       "calories":643,
       "price":988,
       "image":"https://code.s3.yandex.net/react/code/meat-03.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9bf",
       "name":"Сыр с астероидной плесенью",
       "type":"main",
       "proteins":84,
       "fat":48,
       "carbohydrates":420,
       "calories":3377,
       "price":4142,
       "image":"https://code.s3.yandex.net/react/code/cheese.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b2",
       "name":"Флюоресцентная булка R2-D3",
       "type":"bun",
       "proteins":44,
       "fat":26,
       "carbohydrates":85,
       "calories":643,
       "price":988,
       "image":"https://code.s3.yandex.net/react/code/bun-01.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
       "__v":0
    }
]


 
