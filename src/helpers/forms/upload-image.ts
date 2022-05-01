import axios from "axios";

export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_HOST}/upload/post`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(res => {
      return res.data.file.filename;
    })
    .catch(() => {
      return null;
    });
};
