import { apiService,} from "./AxiosClient";

const endpoints = {
    students: 'users/students',
    lectures: 'users/lectures',
    projects:'projects'
}

const ApiGenerator = (apiEndpoint:string) => ({
    getAll: (params:object) => apiService.getAll(apiEndpoint, params),
    getOne: (id:string) => apiService.getOne(apiEndpoint,id),
    createOne: (data:object) => apiService.createOne(apiEndpoint,data),
    updateOne: (id:string, data:object) => apiService.updateOne(apiEndpoint,id,data),
    deleteOne:(id:string)=>apiService.deleteOne(apiEndpoint,id)
});

const AdminAPI = {
    ManageStudent: ApiGenerator(endpoints.students),
    ManageLectures: ApiGenerator(endpoints.lectures),
    ManageProject:ApiGenerator(endpoints.projects)
};

export default AdminAPI;