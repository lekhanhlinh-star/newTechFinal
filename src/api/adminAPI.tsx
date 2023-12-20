import ApiGenerator from "./AxiosClient";

const endpoints = {
    students: 'users',
    lectures: 'users',
    projects: 'projects',
    majors: `majors`,
    notis: `notifications`

}


const AdminAPI = {
    ManageStudent: ApiGenerator(endpoints.students),
    ManageLectures: ApiGenerator(endpoints.lectures),
    ManageProject: ApiGenerator(endpoints.projects),
    ManageMajor: ApiGenerator(endpoints.majors),
    ManageNoti: ApiGenerator(endpoints.notis)

};

export default AdminAPI;
