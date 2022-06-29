<template>
  <nav aria-label="Global">
    <div id="desktop-nav">
      <div class="flex justify-between h-16">
        <!-- Nav left -->
        <div class="nav-left">
          <div class="flex-shrink-0 flex items-center">
            <nuxt-link :to="localePath({ name: 'index' })" >
            <img class="h-8 w-auto" src="https://intranet.ucll.be/sites/all/themes/ucll_intranet/images/logo.svg" alt="Workflow">
            </nuxt-link>
          </div>
          <div class="links-list">
            <nuxt-link :to="localePath({ name: 'index' })" class="" v-t="'offers.menu'" />
            <nuxt-link :to="localePath({ name: 'offers-create' })" v-t="'programs.createOffer'" />
            <nuxt-link v-if="isAdmin" :to="localePath({ name: 'admin-programs' })" v-t="'programs.menu'" />
            <nuxt-link v-if="isAdmin" :to="localePath({ name: 'admin-courses' })" v-t="'courses.menu'" />
            <nuxt-link v-if="isAdmin" :to="localePath({ name: 'admin-users' })" v-t="'users.menu'" />
            <nuxt-link v-if="isAdmin" :to="localePath({ name: 'admin-sold' })" v-t="'nav.soldMenu'" />

            <nuxt-link :to="localePath({ name: 'instructions' })" v-t="'howto.title'" />

          </div>

        </div>



        <div class="flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <button class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-regal-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" :aria-expanded="String(mobileOpen)" @click="mobileOpen = !mobileOpen">
            <span class="sr-only" v-t="'general.openDropdown'" />
            <!-- Icon when menu is closed. -->
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open. -->
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="nav-right">
          <button
            class="dropdown-toggle inline-block px-6 py-2.5 bg-regal-blue-100 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-regal-blue-200
                  hover:shadow-lg focus:bg-regal-blue-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-regal-blue-200 active:shadow-lg transition duration-150 ease-in-out
                  flex items-center whitespace-nowrap gap-2"
            type="button" @click.prevent="openModal = true;"><span class="sr-only" v-t="'general.stop'" />
            {{$t("dashboard.language")}}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>
          <!-- Profile dropdown -->
          <div class="profile-dropdown z-50" v-if="$auth.loggedIn" v-on-clickaway="closeDropdown">
            <div>
              <button class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-regal-blue-200 focus:ring-white" id="user-menu" @click.prevent="open = !open" aria-haspopup="true">
                <span class="sr-only" v-t="'general.openDropdown'" />
                <img class="h-8 w-8 rounded-full" :src="getAvatar" alt="">
              </button>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <div class="dropdown" role="menu" aria-orientation="vertical" aria-labelledby="user-menu" v-if="open">
                <div class="block px-4 py-2 text-sm text-gray-700 truncate">{{getName}} <br> {{getSchoolnumber}}</div>

                <nuxt-link v-if="!$auth.$state.user.oauthOnly" :to="localePath({ name: 'auth-changepassword' })" v-t="'nav.changepass'" />

                <a href="#" role="menuitem" @click.prevent="logout">{{$t("auth.logout")}}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </a>

              </div>
            </transition>


          </div>

          <nuxt-link class="inline-flex items-center justify-center p-2 M-L-é rounded-md text-white hover:text-white hover:bg-regal-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" :to="localePath({ name: 'auth-login' })" v-t="'auth.signin'" v-else />

        </div>
      </div>
    </div>

    <div id="mobile-nav" :class="{ 'block': mobileOpen, 'hidden': !mobileOpen, 'lg:hidden': true }">

      <div class="pt-2 pb-3 px-2 space-y-1">
        <ul>
          <li @click="closeMobile()"><nuxt-link :to="localePath({ name: 'index' })" class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-regal-blue-200" v-t="'offers.menu'" /></li>
          <li @click="closeMobile()"><nuxt-link :to="localePath({ name: 'offers-create' })" v-t="'programs.createOffer'" class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-regal-blue-200" /></li>
          <li @click="closeMobile()"><nuxt-link v-if="isAdmin" :to="localePath({ name: 'admin-programs' })" class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-regal-blue-200" v-t="'programs.menu'" /></li>
          <li @click="closeMobile()"><nuxt-link v-if="isAdmin" :to="localePath({ name: 'admin-courses' })" class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-regal-blue-200" v-t="'courses.menu'" /></li>
          <li @click="closeMobile()"><nuxt-link v-if="isAdmin" :to="localePath({ name: 'admin-users' })" class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-regal-blue-200" v-t="'users.menu'" /></li>
          <li @click="closeMobile()"><nuxt-link v-if="isAdmin" :to="localePath({ name: 'admin-sold' })" class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-regal-blue-200" v-t="'nav.soldMenu'" /></li>
          <li @click="closeMobile()"><nuxt-link :to="localePath({ name: 'instructions' })" class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-regal-blue-200" v-t="'howto.title'" /></li>
        </ul>
      </div>
      <div class="pt-2 pb-3 border-t border-white">
        <div v-if="isLoggedIn" class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="getAvatar" alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{getName}}</div>
            <div class="text-sm font-medium text-white">{{getSchoolnumber}}</div>
          </div>
        </div>
        <div class="profile-links-list">
          <button id="languageButton" type="button" class="flex items-center content-center justify-center"  @click.prevent="openModal = true;"><span class="sr-only" v-t="'general.stop'" />{{$t("dashboard.language")}}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>

          <div v-if="isLoggedIn">
            <nuxt-link v-if="!$auth.$state.user.oauthOnly" :to="localePath({ name: 'auth-changepassword' })" v-t="'nav.changepass'" />

            <a href="#" @click.prevent="logout">{{$t("auth.logout")}}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </a>
          </div>

          <nuxt-link v-if="!isLoggedIn" :to="localePath({ name: 'auth-login' })" v-t="'auth.signin'"/>
        </div>
      </div>
    </div>

    <!-- Modal to confirm language -->
    <modal v-model="openModal" modal-title-id="closeModalTitle" id="languageModel">
      <template>
        <div class="modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        </div>
        <div class="modal-body">
          <h3 class="modal-title" id="closeModalTitle" v-t="'language.choice.title'" />
          <p v-t="'language.choice.text'" />
        </div>
      </template>
      <template slot="footer">
        <div>
          <ul>
            <li class="" v-for="locale in availableLocales" :key="locale.code">
              <div v-if="locale.code === $i18n.locale" class=" justify-center text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 flex items-center" @click="closeMobile()" >
                {{locale.name}}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 align-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div v-else @click="closeMobile()">
                <nuxt-link class="justify-center text-center text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 flex items-center" :to="switchLocalePath(locale.code)">{{locale.name}}</nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </modal>

  </nav>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'components-layout-navigation',
  mixins: [ clickaway ],
  data () {
    return {
      open: false,
      mobileOpen: false,
      openModal:false

    }
  },
  methods: {
    closeDropdown () {
      this.open = false;
    },
    logout () {
      this.$toast.success(this.$t("auth.loggedOut"));
      this.$auth.logout();
    },
    closeMobile () {
      this.mobileOpen = false;
      this.openModal = false;
    },
  },
  computed: {
    isAdmin() {
          let found = false;
          if(this.$auth.$state.user !== null)
              this.$auth.$state.user.authorities.forEach(el => {if(el.authority == 'ROLE_ADMIN') found = true});
          return found;
    },
    isLoggedIn(){
      return this.$auth.$state.loggedIn === true;
    },
    getName() {
        if(this.$auth.$state.user !== null)
              return this.$auth.$state.user.firstName + " " + this.$auth.$state.user.lastName;
        return "";
    },
    getSchoolnumber() {
      if(this.$auth.$state.user !== null)
              return this.$auth.$state.user.username
      return "";
    },
    getAvatar () {
      const user = this.$auth.$state.user;
      if(user !== null)
        return "https://eu.ui-avatars.com/api/?name=" + user.firstName.charAt(0) + "+" + user.lastName.charAt(0);
      return "";
    },
    availableLocales () {

      return this.$i18n.locales.filter(i => i.code)
    },
  }

}
</script>

<style lang="scss">

nav {

  @apply bg-regal-blue-100;
  #desktop-nav {
    @apply max-w-7xl mx-auto px-2 sm:px-4 lg:px-8;

    .nav-left {
      @apply flex items-center px-2 lg:px-0;

      .links-list {
        @apply hidden lg:ml-8 lg:flex lg:space-x-4;

        a {
          @apply rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-regal-blue-200;
          &.nuxt-link-exact-active {
            @apply bg-regal-blue-200;
          }
        }
      }
    }

    .nav-right {
      @apply hidden lg:ml-4 lg:flex lg:items-center gap-3;

      .profile-dropdown {
        @apply ml-4 relative flex-shrink-0;

        .dropdown {
          @apply origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5;
          a {
            @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100;
          }


        }
      }
    }
  }

  #mobile-nav {
    .profile-links-list {
      @apply px-2;

      a {
        @apply block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-regal-blue-200;
      }
      button {
         @apply text-white hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium;

         &#languageButton{
           @apply items-center flex gap-2 ;
         }
       }
    }
  }
}

</style>
