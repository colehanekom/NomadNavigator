import axios from "axios";

const API_URL = "http://localhost:8800";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});

export const apiRequest = async ({ url,token,data,method}) => {
    try {
        const result = await API(url, {
            method:  method || "GET",
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        });

        return result?.data;
    } catch (error) {
        const err = error.response.data;
        console.log(err);
        return{status: err.success, message: err.message};
    }
};

export const handleFileUpload = async (uploadFile) => {
    formData.append("file", uploadFile);
    formData.append("upload_present", "Nomad Navigator");

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload/`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.log(error);
    }
}

export const getUserInfo = async (token, id) => {
    try {
        const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;

        const res = await apiRequest ({
            url: uri,
            token: token,
            method: "POST",
        });

        if(res?.message === "Authentication failed"){
            localStorage.removeItem("user");
            window.alert("User session expired. Login again.");
            window.location.replace("/login");
        }
        return res?.user;
    } catch (error) {
        console.log(error);
    }
}