import config from '../config/config';
import AxiosService from './axios-service'

export default class EmployeeService {
    baseUrl = config.baseUrl;
    addEmployee(data) {
        return AxiosService.postService(`${this.baseUrl}employee`, data);
    }

    getAllEmployees() {
        return AxiosService.getService(`${this.baseUrl}employee`);
    }

    async getEmployee(id) {
        return (await AxiosService.getService(`${this.baseUrl}employee/${id}`));
    }

    updateEmployee(data) {
        return AxiosService.putService(`${this.baseUrl}employee/${data.id}`, data);
    }

    deleteEmployee(data) {
        return AxiosService.deleteService(`${this.baseUrl}employee/` + data);
    }
}