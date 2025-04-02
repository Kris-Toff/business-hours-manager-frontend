<script setup>
import { ref } from "vue";
import { useCsrfCookie } from "@/composables/csrfCookie";
import { useAuth } from "@/composables/auth";

const {
  authError,
  loading,
  email,
  emailAttrs,
  password,
  passwordAttrs,
  errors,
  login,
} = useAuth();
const { getCsrfCookie } = useCsrfCookie();

const visible = ref(false);

async function handleSubmit() {
  await getCsrfCookie();
  await login();
}
</script>

<template>
  <div>
    <v-form @submit.prevent="handleSubmit">
      <v-card class="mx-auto mt-16" elevation="8" max-width="448" rounded="lg">
        <v-card-item class="bg-red-lighten-1">
          <v-card-title>
            <span class="font-weight-black text-wrap text-center">
              <h2>Login</h2>
            </span>
          </v-card-title>
        </v-card-item>

        <v-card-item class="mt-6">
          <div class="text-subtitle-1 text-medium-emphasis">Email</div>

          <v-text-field
            v-model="email"
            v-bind="emailAttrs"
            :error-messages="errors.email"
            density="compact"
            placeholder="Email address"
            variant="outlined"
            color="red-lighten-1"
          />

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            Password
          </div>

          <v-text-field
            v-model="password"
            v-bind="passwordAttrs"
            :error-messages="errors.password"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            variant="outlined"
            color="red-lighten-1"
            @click:append-inner="visible = !visible"
          >
            <template #append-inner>
              <v-icon
                :icon="!visible ? 'mdi-eye-off' : 'mdi-eye'"
                color="red-lighten-1"
                @click="visible = !visible"
              />
            </template>
          </v-text-field>

          <div v-if="authError" class="error-text my-2">
            {{ authError.message }}
          </div>

          <v-btn
            :loading="loading"
            type="submit"
            class="mb-8"
            color="red-lighten-1"
            size="large"
            variant="tonal"
            block
          >
            Log In
          </v-btn>
        </v-card-item>
      </v-card>
    </v-form>
  </div>
</template>

<style scoped>
.error-text {
  color: red;
}
</style>
