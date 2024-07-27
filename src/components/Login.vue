<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username === "admin" && this.password === "password") {
        this.$router.push("/home");
      } else {
        alert("Invalid username or password");
      }
    },
  },
};
</script>
<template>
  <main>
    <div class="bg-transparent flex justify-center items-center">
      <div class="w-1/2 h-screen hidden lg:block">
        <img src="./../assets/images/doctor5.png" alt="Placeholder Image" class="object-cover w-full h-full" />
      </div>

      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="username" class="block text-gray-600">Username</label>
            <input type="text" id="username" v-model="username" requiered
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-cyan-500"
              autocomplete="off" />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-gray-600">Password</label>
            <input type="password" id="password" v-model="password" required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-amber-500"
              autocomplete="off" />
          </div>
          <div class="bg-transparent">
            <div class="relative">
              <div
                class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
              </div>
              <button
                class="relative font-semibold py-2 px-4 w-full text-lg text-blue-500 transition-all duration-100 bg-white font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
}
</style>
