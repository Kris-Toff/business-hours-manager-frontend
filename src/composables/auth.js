import { ref } from "vue";
import router from "@/router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from "yup";
import { useFetchApi } from "./fetchApi";
import { useErrorHandler } from "./errorHandler";

export function useAuth() {
  const { fetchApi } = useFetchApi();
  const { errorHandler } = useErrorHandler();
  const authError = ref(null);
  const loading = ref(false);

  const schema = toTypedSchema(
    object({
      email: string().required("Email is required").email(),
      password: string().required("Password is required"),
    })
  );

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: schema,
  });

  const [email, emailAttrs] = defineField("email");
  const [password, passwordAttrs] = defineField("password");

  const login = handleSubmit(async (values) => {
    loading.value = true;
    await fetchApi({ url: "/login", method: "post", params: values })
      .then(() => {
        router.push({ name: "dashboard" });
      })
      .catch((e) => {
        authError.value = e.data;
        errorHandler(e);
      })
      .finally(() => {
        loading.value = false;
      });
  });

  const logout = async () => {
    loading.value = true;
    await fetchApi({ url: "/logout", method: "post" })
      .then(() => {
        router.push({ name: "login" });
      })
      .catch((e) => {
        authError.value = e.data;
        errorHandler(e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    authError,
    loading,
    email,
    emailAttrs,
    password,
    passwordAttrs,
    errors,
    login,
    logout,
  };
}
