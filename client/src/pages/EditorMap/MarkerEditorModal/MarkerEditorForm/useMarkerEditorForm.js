import { useForm } from "react-hook-form";
import { useEditor } from "../../MarkerEditor/MarkerEditorContext";

export default function useMarkerEditorForm() {
  const { api } = useEditor();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
    getValues,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      xOffset: 0,
      yOffset: 0,
      width: 40,
      height: 40,
    },
  });

  const formFields = {
    markerId: register("markerId", { required: "Marker ID Is Required" }),
    width: register("width", { required: "Width Is Required" }),
    height: register("height", { required: "Height Is Required" }),
    xOffset: register("xOffset", {
      required: "Marker X offset is required",
      onChange: () => sendOffset(),
    }),
    yOffset: register("yOffset", {
      required: "Marker X offset is required",
      onChange: () => sendOffset(),
    }),
  };

  const clearForm = () => {
    reset();
  };

  const setOffset = (x, y) => {
    setValue("xOffset", x);
    setValue("yOffset", y);
  };

  const sendOffset = () => {
    const { xOffset, yOffset } = getValues();
    api.setOffset(xOffset, yOffset);
  };

  return {
    handleSubmit,
    formFields,
    errors,
    isValid,
    setValues: reset,
    clearForm,
    setValue,
    setOffset,
    api,
  };
}
