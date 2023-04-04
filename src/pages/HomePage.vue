<template>
  <div
    class="grid place-items-center min-h-screen beige-colour"
    v-if="!apiResponse"
  >
    <breeding-rhombus-spinner
      :animation-duration="1500"
      :size="64"
      color="#1a202c"
    />
  </div>
  <div id="main" class="bg-beige" v-if="apiResponse">
    <section>
      <div class="grid place-items-center min-h-screen">
        <div class="container mx-auto mt-5">
          <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
            <div class="p-4 flex justify-center mt-5">
              <figure
                class="relative p-5 max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                <a href="#">
                  <img
                    class="object-fill rounded-lg"
                    :src="apiResponse.basic_data.profile_photo"
                    alt="Nelson Katale"
                  />
                </a>
              </figure>
            </div>
            <div class="text-left text-justify mt-5">
              <h2
                class="title mb-6 text-gray-900 text-5xl font-extrabold tracking-tight dark:text-white"
              >
                Nice to meet you,
              </h2>
              <br/>
              <blockqoute
                class="text-lg place-items-center italic font-semibold text-gray-900 dark:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-10 h-10 text-gray-400 dark:text-gray-500"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
                  />
                </svg>
                <p
                  class="mb-8 font-normal text-md text-gray-700 dark:text-gray-300"
                >
                  "{{ apiResponse.basic_data.qoute }}"
                </p>
              </blockqoute>
              <p
                class="mb-6 text-justify font-normal text-md text-gray-700 dark:text-white"
              >
                {{ apiResponse.basic_data.short_bio }}
              </p>
              <p
                class="mb-6 text-justify font-normal text-md text-gray-700 dark:text-white"
                v-html="apiResponse.basic_data.contribute"
              ></p>
              <p class="mb-6 text-md text-gray-700 dark:text-white">
                Reach me 👉
                <a
                  :href="'mailTo:' + apiResponse.basic_data.email"
                  class="font-extrabold hover:underline"
                >
                  {{ apiResponse.basic_data.email }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <button
      @click="toggleDarkMode()"
      aria-label="floating action button"
      class="fixed z-90 bottom-14 right-10 dark:bg-gray-600 bg-gray-700 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-gray-500 dark:hover:bg-gray-500 hover:drop-shadow-2xl hover:animate-bounce duration-300"
    >
      <svg
        aria-hidden="true"
        id="theme-toggle-dark-icon"
        class="w-5 h-5 hidden"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        ></path>
      </svg>
      <svg
        aria-hidden="true"
        id="theme-toggle-light-icon"
        class="w-5 h-5"
        fill="yellow"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <footer>
      <div class="mx-auto w-full container p-4 sm:p-6">
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-white-500 sm:text-center dark:text-gray-400"
            >&copy; {{ year }}
            <a href="." class="hover:underline">{{
              apiResponse.basic_data.name
            }}</a>
          </span>
          <span class="flex mt-4 space-x-6 sm:text-center">
            <div
              v-for="socialLink in apiResponse.basic_data.social_links"
              :key="socialLink.name"
            >
              <a
                :href="socialLink.url"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
              >
                <span v-html="socialLink.icon"></span>
                <span class="sr-only">{{ socialLink.name }}</span>
              </a>
            </div>
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from "moment";
import { BreedingRhombusSpinner } from "epic-spinners";
export default {
  name: "HomePage",
  components: {
    BreedingRhombusSpinner,
  },
  data() {
    return {
      isDarkMode: false,
      windowHeight: window.innerHeight,
      year: moment().format("YYYY"),
      apiResponse: null,
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    window.onresize = () => {
      this.windowHeight = window.innerHeight;
    };
    this.year = moment().format("YYYY");
  },
  methods: {
    async fetchData() {
      try {
        const url =
          "https://api.jsonbin.io/v3/b/642c20baace6f33a22048009?meta=false";
        // const url1 = `personal_details.json`;
        this.apiResponse = await (
          await this.apiTimeout(url, {
            timeout: 8000,
          })
        ).json();
      } catch (error) {
        console.log("error: ", error.name == "AbortError");
      }
    },
    async apiTimeout(resource, options = {}) {
      const { timeout = 8000 } = options; //set timeout to 8 secs
      const controller = new AbortController();
      
      // start the timing function. After timeout,
      //If timing function wasn't cleared then abort function cancels the fetch request
      const id = setTimeout(() => controller.abort(), timeout);
      
      const headers = {
        "X-Master-Key":"$2b$10$lmLH75Okweov6TeGJq928uIcdmCCuzp4nWmDlLNaX35FvqvIf1h/C",
      };

      const response = await fetch(resource, {
        ...options,
        headers,
        signal: controller.signal, // signal connects fetch request to the abort controller
      });

      clearTimeout(id); //clear the abort timing function when fetch request completes before timeout.
      
      return response;
    },
    toggleDarkMode() {
      let el = document.getElementById("main");
      let lightIcon = document.getElementById("theme-toggle-light-icon");
      let moonIcon = document.getElementById("theme-toggle-dark-icon");
      //  check if dark mode is enabled
      if (el.classList.contains("dark")) {
        el.classList.remove("dark");
        el.classList.remove("bg-dark");
        el.classList.add("bg-beige");
        lightIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
      } else {
        el.classList.remove("bg-beige");
        el.classList.add("dark");
        el.classList.add("bg-dark");
        moonIcon.classList.remove("hidden");
        lightIcon.classList.add("hidden");
      }
    },
  },
};
</script>
