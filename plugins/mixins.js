import Vue from 'vue';
import { DateTime } from 'luxon';

export default function ({ store, i18n, $loading }) {
  Vue.mixin({
    methods: {
      showLoader(ref) {
        return $loading.show({
          container: ref ? ref : null,
        });
      },
      isoDateToLocaleString(date) {
        try {
          return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
        } catch (e) {
          console.error(e);
          return "";
        }
      },
      /**
       * This function give the localized value of a field. It first tries the current locale, then the first locale in the list.
       * @param {Object} object with key/value pairs where key is the locale and value is the translation key
       * @returns
       */
      localizedValue(value) {
        // If the value is not an object return it
        if (typeof value !== "object" || Object.keys(value).length <= 0) return value;

        // Try current locale first
        if (value[i18n.locale] !== null && typeof value[i18n.locale] !== "undefined") {
          return value[i18n.locale];
        }

        // Try first locale in the list
        return value[Object.keys(value)[0]];
      },
      /**
       * Check if the user can do something
       * @param permission the permissions to check
       * @returns boolean true if allowed, otherwise false
       */
      can(permissionsToCheck) {
        // If user is not authenticated, or user is not an object, return false
        if (!store.state.auth.loggedIn || typeof store.state.auth.user !== "object") {
          return false;
        }

        const userPermissions = store.state.auth.user.permissions;

        // The assigned permissions must be an array
        if (!Array.isArray(userPermissions)) {
          return false;
        }

        // If the permissions is a string, convert it to an array
        if (typeof permissionsToCheck === "string") {
          permissionsToCheck = [ permissionsToCheck ];
        }

        // Check if the user has all the permissions
        return permissionsToCheck.every(permission => userPermissions.includes(permission));
      },
      /**
       * Check if the field is invalid or not, first parameter is the field name, second is the errors from the backend,
       * the third parameter is errors from the frontend
       *
       * @param {String} field name of the field
       * @param {Object} backendErrors all the backend errors
       * @param {Array} frontendErrors array of the current field
       * @param {Boolean} castString if true, the field will be casted to a string
       * @returns boolean true/false
       */
      isInvalidField(field, backendErrors, frontendErrors = [], castString = false) {
        const isBackendError = typeof backendErrors === "object" && (typeof backendErrors[field] === "string" || Array.isArray(backendErrors[field]));
        const isFrontendError = Array.isArray(frontendErrors) && frontendErrors.length > 0;

        const error = isBackendError || isFrontendError;

        if (castString) {

          return String(error);
        }

        return error;
      },
      showValidationError(field, backendErrors, frontendErrors = []) {
        // If there is are no errors, return nothing
        if (!this.isInvalidField(field, backendErrors, frontendErrors)) {
          return "";
        }

        // If it is a backend error, show it
        if (typeof backendErrors === "object" && backendErrors[field]) {
          const fieldErrors = backendErrors[field];

          // If the field is an array, show the first error
          return Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors;
        }

        // If it is a frontend error, show it
        if (Array.isArray(frontendErrors) && frontendErrors.length > 0) {
          return frontendErrors[0];
        }
      }
    }
  });
}
