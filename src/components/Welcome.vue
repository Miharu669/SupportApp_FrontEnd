<script setup>
import { ref } from 'vue';

const comments = ref([
  { id: 1, author: 'John Doe', content: 'Exceptional service and care. Highly recommend!' },
  { id: 2, author: 'Jane Smith', content: 'The doctors and staff are very professional and caring.' },
  { id: 3, author: 'Mary Johnson', content: 'I received excellent treatment. Thank you!' },
  { id: 4, author: 'Robert Brown', content: 'Great facilities and friendly staff. Very satisfied.' },
  { id: 5, author: 'Linda Davis', content: 'Efficient and compassionate care. Wonderful experience.' },
  { id: 6, author: 'Michael Wilson', content: 'The best hospital experience I have ever had.' },
  { id: 7, author: 'Elizabeth Moore', content: 'Highly skilled and attentive doctors. Highly recommend!' },
  { id: 8, author: 'William Taylor', content: 'Very clean and well-maintained hospital. Great service.' }
]);
</script>
<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col lg:flex-row-reverse gap-6">
      <!-- Review card -->
      <div class="lg:w-1/3">
        <div id="cardreview" class="bg-zinc-600 shadow-md rounded-lg">
          <div class="bg-sky-600 text-white p-4 rounded-t-lg">
            <h5 id="reviewtitle" class="text-lg font-semibold">Reviews</h5>
          </div>
          <div class="p-4 max-h-96 overflow-y-auto custom-scrollbar">
            <div v-for="comment in comments" :key="comment.id" class="bg-gray-200 p-3 mb-3 rounded-lg">
              <h6 class="text-gray-700 text-sm font-medium mb-1">{{ comment.author }}</h6>
              <p class="text-gray-600 text-sm">{{ comment.content }}</p>
            </div>
          </div>          
        </div>
      </div>

      <div class="lg:w-2/3 flex flex-col gap-6">
        <div id="card1" class="bg-zinc-200 shadow-md rounded-lg">
          <div class="flex">
            <div class="w-1/3">
              <img src="./../assets/images/doctor.png" class="w-full h-full object-cover rounded-l-lg" alt="help" />
            </div>
            <div class="w-2/3 p-4">
              <h3 class="text-xl font-semibold text-gray-800">Need Help?</h3>
              <p class="text-gray-600 mt-2">
                Welcome to our hospital service! Our dedicated team is here to help you with any inquiries or assistance you need.
              </p>
            </div>
          </div>
        </div>

        <div id="card2" class="bg-zinc-200 shadow-md rounded-lg">
          <div class="flex">
            <div class="w-1/3">
              <img src="./../assets/images/doctor4.png" class="w-full h-full object-cover rounded-l-lg" alt="about us" />
            </div>
            <div class="w-2/3 p-4">
              <h3 class="text-xl font-semibold text-gray-800">About Us</h3>
              <p class="text-gray-600 mt-2">
                Our hospital service is committed to providing the best care and support for our patients. We prioritize your health and well-being.
              </p>
              <p class="text-gray-600 mt-2">
                Thank you for trusting us with your care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
