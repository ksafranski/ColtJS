define(function(){
   
   var footer = {
       
       routes: {
           '*': 'renderFooter'
       },
       
       renderFooter: function() {
           Colt.render(this);
       }
       
   };
   
   return footer;
   
});