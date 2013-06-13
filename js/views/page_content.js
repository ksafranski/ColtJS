define(function(){
   
   var page_content = {
       
       routes: {
           '*': 'renderPageContent', // home, default
       },
       
       template: '', // Clear out template, load content by route
       
       renderPageContent: function() {
            // Get route
            var _this = this,
                route = window.location.hash.replace('#!/','');
            // Set default/home route
            if (route==='') {
               route = 'introduction';
            }
            // Get template and render
            $.get('templates/'+route.replace(/-/g,'_')+'.tpl',function (tpl){
                // Set template attribute
                _this.template = tpl;
                // Render
                Colt.render(_this);
                // Syntax highlighting
                Rainbow.color();
                //
                _this.$el.hide().fadeIn(250);
                
                window.logHash();
            });

            // Set nav active route
            //_this.setActiveNav(route);
            Colt.access('main_nav', function(main_nav) {
                main_nav.setActive(route);
            });
            
       }
       
   };
   
   return page_content;
    
});