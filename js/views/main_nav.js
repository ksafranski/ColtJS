define(function(){
   
   var main_nav = {
       
       routes: {
           '*': 'renderMainNav'
       },
       
       renderMainNav: function() {
            // Get route
            var _this = this,
                route = window.location.hash.replace('#!/','');
            // Set default/home route
            if (route==='') {
               route = 'introduction';
            }
            // Render
            Colt.render(this);
            // Set active
            this.setActive(route);
       },
       
       setActive: function(route) {
            //console.log('Set '+route+' to active');
            $('#main_nav').find('a[href="#!/'+route+'"]').addClass('active');
       }
       
   };
   
   return main_nav;
    
});