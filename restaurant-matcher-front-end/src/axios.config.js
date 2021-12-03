import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

axios.defaults.baseURL = 'https://wfiis-cloud-project-backend.herokuapp.com/api_v1/';
axios.defaults.headers['Content-Type'] = 'application/json';

export default applyCaseMiddleware(axios.create());