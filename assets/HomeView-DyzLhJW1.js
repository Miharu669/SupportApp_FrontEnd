import{_ as i,r as d,o as a,c,a as e,e as s,f as o,g as l}from"./index-BidwgzBi.js";const u="/SupportApp_FrontEnd/assets/doctor-DELcbJgC.png",p="/SupportApp_FrontEnd/assets/doctor4-iGD6_NXa.png",_={},h={class:"container mx-auto p-6"},m={class:"text-center pb-5"},x=e("h1",{class:"text-4xl font-bold text-amber-600 mb-4"}," Welcome to Our Request Management App ",-1),b=e("p",{class:"text-lg text-zinc-500 mb-6"}," Easily manage and track all your requests in one place. ",-1),g={class:"flex justify-center gap-4"},v=e("button",{class:"bg-amber-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700"}," Create New Request ",-1),f=e("button",{class:"bg-cyan-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700"}," View All Requests ",-1),w=l('<div class="lg:w-2/3 flex flex-col gap-6 mx-auto"><div id="card1" class="bg-white/40 -backdrop-hue-rotate-15 hover:backdrop-hue-rotate-90 shadow-2xl rounded-lg"><div class="flex"><div class="w-1/4"><img src="'+u+'" class="w-auto h-auto object-contain md:object-scale-down" alt="help"></div><div class="w-2/3 p-4"><h3 class="text-xl font-semibold text-gray-800">Need Help?</h3><p class="text-gray-600 mt-2"> Welcome to our hospital service! Our dedicated team is here to help you with any inquiries or assistance you need. </p></div></div></div><div id="card2" class="bg-white/60 -backdrop-hue-rotate-60 hover:backdrop-hue-rotate-90 shadow-2xl rounded-lg"><div class="flex"><div class="w-1/4"><img src="'+p+'" class="w-auto h-auto object-contain md:object-scale-down" alt="about us"></div><div class="w-2/3 p-4"><h3 class="text-xl font-semibold text-gray-800">About Us</h3><p class="text-gray-600 mt-2"> Our hospital service is committed to providing the best care and support for our patients. We prioritize your health and well-being. </p></div></div></div></div>',1);function y(r,n){const t=d("router-link");return a(),c("div",h,[e("div",m,[x,b,e("div",g,[s(t,{to:"/new-request"},{default:o(()=>[v]),_:1}),s(t,{to:"/request-list"},{default:o(()=>[f]),_:1})])]),w])}const k=i(_,[["render",y]]),N={__name:"HomeView",setup(r){return(n,t)=>(a(),c("main",null,[s(k)]))}};export{N as default};
