import { toast } from "react-toastify";

class Utils {
  static convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  static displayImages(imagesString) {
    if (!imagesString || typeof imagesString !== "string") {
      return [];
    }

    const imagesArray = imagesString.split("||");
    return imagesArray;
  }

  static successToast(msg) {
    return toast.success(msg, {
      position: "bottom-right",
      draggable: false,
    });
  }

  static errorToast(msg) {
    return toast.error(msg, {
      position: "bottom-right",
      draggable: false,
    });
  }
}

export default Utils;
