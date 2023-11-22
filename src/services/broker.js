import Broker from "./config.js";

const createLicenseManagerCustomer = (data) => {

    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('account_id', '1');
		form.append('tenant_id', '1');
        form.append('data', JSON.stringify(data));

        Broker.post("/CreateLicenseManagerCustomer", form) 
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        })
    })
}

const getAllLicenseManagerCustomers = () => {
    
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('tenant_id', '1');

        Broker.post("/GetAllLicenseManagerCustomers", form)
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        })
    })
}

export {createLicenseManagerCustomer, getAllLicenseManagerCustomers};