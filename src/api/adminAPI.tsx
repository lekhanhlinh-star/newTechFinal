import ApiGenerator, { apiService } from "./AxiosClient";

const endpoints = {
    students: 'users',
    lectures: 'users',
    projects: 'projects',
    majors: `majors`
}


const AdminAPI = {
    ManageStudent: ApiGenerator(endpoints.students),
    ManageLectures: ApiGenerator(endpoints.lectures),
    ManageProject: ApiGenerator(endpoints.projects),
    ManageMajor: ApiGenerator(endpoints.majors)
};

export default AdminAPI;
