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

const getLicenseManagerCustomerById = (id) => {
    
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('tenant_id', '1');
        form.append('id', id);

        Broker.post("/GetLicenseManagerCustomerById", form)
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        })
    })
}

const updateLicenseManagerCustomer = (data) => {
    
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('account_id', '1');
		form.append('tenant_id', '1');
        form.append('data', JSON.stringify(data));
        
        Broker.post("/UpdateLicenseManagerCustomer", form) 
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        })
    })
}

const deleteLicenseManagerCustomer = (id) => {
    
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('account_id', '1');
        form.append('tenant_id', '1');
        form.append('id', id);
        form.append("updated_at" , new Date().toISOString());

        Broker.post("/DeleteLicenseManagerCustomer", form)
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        })
    })
}

export {
    createLicenseManagerCustomer, 
    getAllLicenseManagerCustomers, 
    getLicenseManagerCustomerById, 
    updateLicenseManagerCustomer, 
    deleteLicenseManagerCustomer
};