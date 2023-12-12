import ApiGenerator, {apiService} from "./AxiosClient";

const endpoints = {
    students: 'users/students',
    lectures: 'users/lectures',
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
