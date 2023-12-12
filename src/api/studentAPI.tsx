import ApiGenerator, {apiService, AxiosClient} from "./AxiosClient";


const endpoints = {
    students: 'users/students',
    lectures: 'users/lectures',
    projects: 'projects'
}


const StudentAPI = {
    Manange_Accont:ApiGenerator(endpoints["students"])



}

export default StudentAPI


