import { onUpdated, ref } from "vue";
import { useFetchApi } from "./fetchApi";
import { useErrorHandler } from "./errorHandler";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, boolean } from "yup";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { usePayloadFormatting } from "./payloadFormatting";
import { useSnackbarStore } from "@/store/snackbar";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export function useBusinessHours() {
  const { fetchApi } = useFetchApi();
  const { errorHandler } = useErrorHandler();
  const { processPayload } = usePayloadFormatting();
  const snackbarStore = useSnackbarStore();
  const loading = ref(false);
  const businessHoursErrors = ref(null);
  const data = ref([]);
  const errors = ref({});
  const forms = ref([]);
  const saving = ref([]);

  const schema = toTypedSchema(
    object({
      openAt: string()
        .required("Open time is required")
        .test(
          "open-time-is-greater",
          "Opening time cannot be later than the closing time",
          function (v) {
            const { closeAt } = this.parent;
            return dayjs(v, "hh:mm").isSameOrBefore(dayjs(closeAt, "hh:mm"));
          }
        ),
      closeAt: string()
        .required("Close time is required")
        .test(
          "close-time-is-less",
          "Closing time cannot be earlier than the opening time",
          function (v) {
            const { openAt } = this.parent;
            return dayjs(v, "hh:mm").isSameOrAfter(dayjs(openAt, "hh:mm"));
          }
        ),
      isOpen: boolean(),
      lunchStart: string()
        .required("Lunch start is required")
        .test(
          "lunch-start-is-greater",
          "Lunch start time cannot be later than the lunch end time",
          function (v) {
            const { lunchEnd } = this.parent;
            return dayjs(v, "hh:mm").isSameOrBefore(dayjs(lunchEnd, "hh:mm"));
          }
        ),
      lunchEnd: string()
        .required("Lunch end is required")
        .test(
          "lunch-end-is-less",
          "Lunch end time cannot be earlier than the lunch start time",
          function (v) {
            const { lunchStart } = this.parent;
            return dayjs(v, "hh:mm").isSameOrAfter(dayjs(lunchStart, "hh:mm"));
          }
        ),
      isEveryOtherWeek: boolean(),
      otherWeekStartDate: string()
        .nullable(true)
        .when("isEveryOtherWeek", {
          is: true,
          then: () => string().required("Other week start date is required"),
        }),
    })
  );

  function createForm(value) {
    const { errors, defineField, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: value,
    });

    const [isOpen, isOpenAttrs] = defineField("isOpen");
    const [openAt, openAtAttrs] = defineField("openAt");
    const [closeAt, closeAtAttrs] = defineField("closeAt");
    const [lunchStart, lunchStartAttrs] = defineField("lunchStart");
    const [lunchEnd, lunchEndAttrs] = defineField("lunchEnd");
    const [isEveryOtherWeek, isEveryOtherWeekAttrs] =
      defineField("isEveryOtherWeek");
    const [otherWeekStartDate, otherWeekStartDateAttrs] =
      defineField("otherWeekStartDate");

    return {
      errors,
      isOpen,
      isOpenAttrs,
      openAt,
      openAtAttrs,
      closeAt,
      closeAtAttrs,
      lunchStart,
      lunchStartAttrs,
      lunchEnd,
      lunchEndAttrs,
      isEveryOtherWeek,
      isEveryOtherWeekAttrs,
      otherWeekStartDate,
      otherWeekStartDateAttrs,
      handleSubmit,
    };
  }

  const getBusinessHours = async () => {
    loading.value = true;
    await fetchApi({ url: "/business-hours", method: "get" })
      .then((response) => {
        data.value = response;
      })
      .catch((e) => {
        businessHoursErrors.value = e.response;
        errorHandler(e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateBusinessHours = (index) => {
    forms.value[index].handleSubmit(async (values) => {
      saving.value[index] = true;
      const payload = processPayload(values);

      await fetchApi({
        url: "/business-hours/update/" + payload.id,
        method: "put",
        params: payload,
      })
        .then((response) => {
          snackbarStore.showSnackbar({
            msg: response.message,
            type: "success",
          });
        })
        .catch((e) => {
          businessHoursErrors.value = e.response;
          errorHandler(e);
        })
        .finally(() => {
          saving.value[index] = false;
        });
    })();
  };

  onUpdated(() => {
    data.value.forEach((el) => {
      forms.value.push(createForm(el));
      saving.value.push(false);
    });
  });

  return {
    businessHoursErrors,
    loading,
    saving,
    data,
    errors,
    forms,
    updateBusinessHours,
    getBusinessHours,
  };
}
