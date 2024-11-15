<template>
   <div class="background-container">
     
     <RouterView></RouterView>
   </div>
 </template>
 
 <style scoped>
 .background-container {
   width: 100vw;
   height: 100vh;
   background-image: url('../../assets/Pet/animal_background.jpeg');
   background-size: cover;
   background-position: center;
 }
 
 @media (max-width: 768px) {
   .background-container {
     background-image: url('../../assets/Pet/animal_background_mobile.jpeg'); 
   }
 }
 
 @media (max-width: 480px) {
   .background-container {
     background-image: url('../../assets/Pet/animal_background_small.jpeg'); 
   }
 }
 </style>