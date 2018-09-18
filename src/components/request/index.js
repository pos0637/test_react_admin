import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const Request = axios.create({
    baseURL: 'localhost:8080',
});

const Mock = new MockAdapter(Request, {
    delayResponse: 1000
});

export default Request;
export { Mock };
