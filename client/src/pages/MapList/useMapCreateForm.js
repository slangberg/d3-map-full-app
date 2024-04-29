import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useSignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const [imagePreview, setImagePreview] = useState("");

  const formFields = {
    file: register("file", {
      required: "Image required",
      onChange: (e) => handleImageChange(e),
    }),
    title: register("title", { required: "Title required" }),
    description: register("description", { required: "Description required" }),
  };

  // Handle file changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(""); // Clear preview if file is not an image
    }
  };

  return { handleSubmit, formFields, errors, isValid, imagePreview };
}
