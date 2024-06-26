export const formData = (data:any) => {

    const formData = new FormData();
    formData.append("customer_code", data.customer_code);
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("tax_code", data.tax_code);
    formData.append("phone", data.phone);
    if(data.id){
        formData.append("_method", "put");
    }

    return formData;
}