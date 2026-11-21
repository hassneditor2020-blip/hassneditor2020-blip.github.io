
(function(){
  function arrow(){return '<span aria-hidden="true">↗</span>';}
  function spotlight(en){
    return '<article class="digital-service-spotlight" data-v5-web-app="spotlight">'+
      '<div class="digital-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M8 21h8M12 17v4"></path><path d="M7 8h4M7 11h8"></path></svg></div>'+
      '<div class="digital-service-copy"><small>'+(en?'NEW · COMPLEMENTARY DIGITAL SERVICE':'جديد · خدمة رقمية مكملة')+'</small>'+
      '<h3>'+(en?'Website & App Design':'تصميم المواقع والتطبيقات')+'</h3>'+
      '<p>'+(en?'Modern business websites, web apps and mobile-first digital experiences—offered as a complementary service while video production remains my core specialty.':'مواقع أعمال حديثة وتطبيقات وتجارب رقمية مهيأة للجوال، كخدمة مكملة مع بقاء تصوير ومونتاج الفيديو تخصصي الأساسي.')+'</p>'+
      '<div class="digital-service-actions"><a href="'+(en?'/en':'')+'/services/web-app-design">'+(en?'Explore web & app design':'استكشف الخدمة')+arrow()+'</a><a href="#digital-projects">'+(en?'See digital projects':'شاهد المشاريع الرقمية')+' <span aria-hidden="true">↓</span></a></div></div></article>';
  }
  function projects(en,compact){
    var p=[
      {url:'https://www.syriastoreonline.com/',mark:'SYRIA STORE',label:en?'Full e-commerce platform':'متجر إلكتروني متكامل',title:'Syria Store',desc:en?'A practical e-commerce platform with a mobile-first storefront, product pages, cart and ordering flows, plus SEO and Google indexing improvements.':'متجر إلكتروني عملي بواجهة مهيأة للجوال، صفحات منتجات وسلة وطلبات، تحسينات SEO وفهرسة Google وتجربة شراء واضحة.',tags:en?['E-commerce','Mobile UX','SEO','Orders']:['متجر إلكتروني','تجربة جوال','SEO','طلبات']},
      {url:'https://kokabfodool.com/',mark:en?'KOKAB FODOOL':'كوكب فضول',label:en?'Educational platform & app project':'منصة تعليمية ومشروع تطبيق',title:en?'Kokab Fodool':'كوكب فضول',desc:en?'A children’s learning platform combining the website, Android app, games, stories, worksheets and educational series in one connected experience.':'منصة تعليمية للأطفال تجمع الموقع وتطبيق Android والألعاب والقصص وأوراق العمل والسلاسل التعليمية ضمن تجربة واحدة.',tags:en?['Website','Android','Games','Learning content']:['موقع','Android','ألعاب','محتوى تعليمي']}
    ];
    var cards=p.map(function(x){return '<article class="digital-project-card"><a class="digital-project-preview" href="'+x.url+'" target="_blank" rel="noopener noreferrer"><span class="digital-browser-bar" aria-hidden="true"><i></i><i></i><i></i><small>'+x.url.replace(/^https?:\/\//,'').replace(/\/$/,'')+'</small></span><span class="digital-project-mark">'+x.mark+'</span><span class="digital-project-screen-lines" aria-hidden="true"><i></i><i></i><i></i></span></a><div class="digital-project-copy"><small>'+x.label+'</small><h3>'+x.title+'</h3><p>'+x.desc+'</p><div class="digital-project-tags">'+x.tags.map(function(t){return '<span>'+t+'</span>';}).join('')+'</div><a href="'+x.url+'" target="_blank" rel="noopener noreferrer">'+(en?'View live project':'شاهد المشروع مباشرة')+arrow()+'</a></div></article>';}).join('');
    return '<section class="digital-projects '+(compact?'digital-projects-compact':'')+'" id="digital-projects" data-v5-web-app="projects"><div class="digital-projects-heading"><div><p class="eyebrow">DIGITAL PROJECTS</p><h2>'+(en?'Websites and apps built around real projects':'مواقع وتطبيقات مبنية لمشاريع حقيقية')+'</h2></div><div class="digital-projects-intro"><p>'+(en?'A complementary digital service alongside my core video work—focused on clear mobile experiences, useful functionality and launch-ready delivery.':'خدمة رقمية مكملة لتخصصي الأساسي في الفيديو، تركّز على تجربة جوال واضحة ووظائف عملية وتسليم جاهز للإطلاق.')+'</p>'+(compact?'':'<a href="'+(en?'/en':'')+'/services/web-app-design">'+(en?'Explore web & app design':'استكشف خدمة تصميم المواقع والتطبيقات')+arrow()+'</a>')+'</div></div><div class="digital-projects-grid">'+cards+'</div></section>';
  }
  function enhance(){
    var main=document.querySelector('main.site'); if(!main)return;
    var en=main.classList.contains('en') || document.documentElement.lang==='en';
    var services=document.getElementById('services');
    if(services && !services.querySelector('[data-v5-web-app="spotlight"]')){
      var grid=services.querySelector('.solutions-grid'); if(grid) grid.insertAdjacentHTML('afterend',spotlight(en));
      var links=services.querySelector('.service-quick-links'); if(links && !links.querySelector('a[href$="/services/web-app-design"]')) links.insertAdjacentHTML('beforeend','<a href="'+(en?'/en':'')+'/services/web-app-design"><span>'+(en?'Website & app design':'تصميم المواقع والتطبيقات')+'</span><b>↗</b></a>');
      if(!document.getElementById('digital-projects')) services.insertAdjacentHTML('afterend',projects(en,false));
    }
    var dir=document.querySelector('.service-directory.services-index-list');
    if(dir && !dir.querySelector('a[href$="/services/web-app-design"]')){
      var holder=dir.querySelector(':scope > div'); if(holder) holder.insertAdjacentHTML('beforeend','<a class="v5-service-link" href="'+(en?'/en':'')+'/services/web-app-design"><span><small>07</small>'+(en?'Website & App Design':'تصميم المواقع والتطبيقات')+'</span><b>↗</b></a>');
      dir.insertAdjacentHTML('afterend',spotlight(en)+projects(en,false));
    }
  }
  function mobileMenu(){
    document.querySelectorAll('.mobile-menu-toggle').forEach(function(btn){
      if(btn.dataset.v5Bound)return; btn.dataset.v5Bound='1';
      btn.addEventListener('click',function(){var id=btn.getAttribute('aria-controls');var nav=id&&document.getElementById(id);if(!nav)return;var open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false');});
    });
  }
  function run(){enhance();mobileMenu();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  window.addEventListener('load',function(){setTimeout(run,0);});
})();
