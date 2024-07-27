<script setup></script>
<template>
  <div class="container mx-auto p-6">
    <div class="text-center pb-5">
      <h1 class="text-4xl font-bold text-amber-600 mb-4">
        Welcome to Our Request Management App
      </h1>
      <p class="text-lg text-zinc-500 mb-6">
        Easily manage and track all your requests in one place.
      </p>
      <div class="flex justify-center gap-4">
        <router-link to="/new-request">
          <button
            class="bg-amber-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700">
            Create New Request
          </button>
        </router-link>
        <router-link to="/request-list">
          <button
            class="bg-cyan-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700">
            View All Requests
          </button>
        </router-link>
      </div>
    </div>

    <div class="lg:w-2/3 flex flex-col gap-6 mx-auto">
      <div id="card1" class="bg-white/40 -backdrop-hue-rotate-15 hover:backdrop-hue-rotate-90 shadow-2xl rounded-lg">
        <div class="flex">
          <div class="w-1/4">
            <img src="./../assets/images/doctor.png" class="w-auto h-auto object-contain md:object-scale-down"
              alt="help" />
          </div>
          <div class="w-2/3 p-4">
            <h3 class="text-xl font-semibold text-gray-800">Need Help?</h3>
            <p class="text-gray-600 mt-2">
              Welcome to our hospital service! Our dedicated team is here to help you with
              any inquiries or assistance you need.
            </p>
          </div>
        </div>
      </div>

      <div id="card2" class="bg-white/60 -backdrop-hue-rotate-60 hover:backdrop-hue-rotate-90 shadow-2xl rounded-lg">
        <div class="flex">
          <div class="w-1/4">
            <img src="./../assets/images/doctor4.png" class="w-auto h-auto object-contain md:object-scale-down"
              alt="about us" />
          </div>
          <div class="w-2/3 p-4">
            <h3 class="text-xl font-semibold text-gray-800">About Us</h3>
            <p class="text-gray-600 mt-2">
              Our hospital service is committed to providing the best care and support for
              our patients. We prioritize your health and well-being.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
