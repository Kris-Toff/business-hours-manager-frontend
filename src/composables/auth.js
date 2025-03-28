import { ref } from "vue";
import router from "@/router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from "yup";
import { useFetchApi } from "./fetchApi";

export function useAuth() {
  const { fetchApi } = useFetchApi();
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
        loading.value = false;
      })
      .catch((e) => {
        authError.value = e.data;
        loading.value = false;
      });
  });

  const logout = async () => {
    await fetchApi({ url: "/logout", method: "post" })
      .then(() => {
        router.push({ name: "login" });
      })
      .catch((e) => {
        authError.value = e.data;
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
