import { ref } from "vue";
import { useFetchApi } from "./fetchApi";
import { useErrorHandler } from "./errorHandler";
import { useFieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, array, boolean } from "yup";

export function useBusinessHours() {
  const { fetchApi } = useFetchApi();
  const { errorHandler } = useErrorHandler();
  const loading = ref(false);
  const data = ref(null);
  const businessHoursErrors = ref(null);

  const schema = toTypedSchema(
    object({
      days: array().of(
        object({
          id: string(),
          openAt: string().required("Open time is required"),
          closeAt: string().required("Close time is required"),
          isOpen: boolean(),
          lunchStart: string().required("Lunch start is required"),
          lunchEnd: string().required("Lunch end is required"),
          isEveryOtherWeek: boolean(),
          otherWeekStartDate: string(),
        })
      ),
    })
  );

  const { setValues, setErrors, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const { fields } = useFieldArray("days");

  const getBusinessHours = async () => {
    loading.value = true;
    await fetchApi({ url: "/business-hours", method: "get" })
      .then((response) => {
        // data.value = response;
        setValues({
          days: response || [],
        });
      })
      .catch((e) => {
        businessHoursErrors.value = e.response;
        setErrors(e.response);
        errorHandler(e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  // const updateBusinessHours = handleSubmit((v) => {});

  return {
    businessHoursErrors,
    loading,
    fields,
    errors,
    getBusinessHours,
  };
}
