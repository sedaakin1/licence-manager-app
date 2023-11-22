import axios from "axios";

const Broker=axios.create({
    baseURL: "https://api.apirealm.com/pedavalans",
});

export default Broker;