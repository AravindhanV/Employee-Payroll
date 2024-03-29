import React, { useState, useEffect } from "react";
import { Link, useParams, withRouter } from 'react-router-dom';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './payroll-form.scss';
import logo from '../../assets/logo.png';
import EmployeeService from '../../services/employee-services'

const PayrollForm = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse -3.png' },
            { url: '../../assets/profile-images/Ellipse 1.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' }
        ],
        allDepartments: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        department: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2021',
        startDate: '',
        notes: '',
        id: '',
        profilePic: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
    }

    const params = useParams();
    const employeeService = new EmployeeService();


    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    }, []);

    const getDataById = (id) => {
        employeeService.getEmployee(id).then((data) => {
            let object = data.data;
            setData(object);
        }).catch((error) => {
            console.log("Error is ", error);
        });
    };

    const setData = (object) => {
        let array = object.startDate.split(" ");
        setForm({
            ...formValue, ...object, department: object.department, isUpdate: true, day: array[0], month: array[1], year: array[2],
        });
    };


    const [formValue, setForm] = useState(initialValue);
    const [displayMessage, setDisplayMessage] = useState("");

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
    }

    const onCheckChange = (name) => {
        let index = formValue.department.indexOf(name);
        let checkArray = [...formValue.department]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, department: checkArray });
    }

    const getChecked = (name) => {
        return formValue.department && formValue.department.includes(name);
    }

    const validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
        if (!formValue.name.match('^[A-Z]{1}[a-zA-Z]{2,}')) {
            error.name = 'Name error'
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.name = 'Gender is required field'
            isError = true;
        }
        if ((formValue.salary.valueOf() < 400000) || (formValue.salary.valueOf() > 500000)) {
            error.salary = 'Salary should be between 4,00,000 and 5,00,000!!'
            isError = true;
        }
        if (formValue.profilePic.length < 1) {
            error.name = 'Profile is required field'
            isError = true;
        }
        if (formValue.department.length < 1) {
            error.name = 'Department is required field'
            isError = true;
        }

        var day = formValue.day.valueOf();
        var month = formValue.month.valueOf();
        var year = formValue.year.valueOf();
        var date = new Date(day + " " + month + " " + year);
        var nowDate = Date.now();
        if (date > nowDate) {
            error.startDate = "Start Date is a future Date"
            isError = true;
        }

        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();

        if (await validData()) {
            return;
        }

        let object = {
            name: formValue.name,
            department: formValue.department,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            notes: formValue.notes,
            id: '',
            profilePic: formValue.profilePic,
        }

        employeeService.addEmployee(object).then(data => {
            setDisplayMessage("Successfully added user");
            setTimeout(() => {
                window.location.replace("/home");
            }, 2000);
        })

            .catch(error => {
                setDisplayMessage("Error while adding the user");
                setTimeout(() => {
                    setDisplayMessage("");
                }, 5000);

            });
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
    }

    return (
        <div className="payroll-main">
            <header className='header row center'>
                <div className="logo">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form" action="#" onSubmit={save} autoComplete="off">
                    <div className="form-head"> Employee Payroll Form </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                        <div className="error">{formValue.error.name}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile Image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" checked={formValue.profilePic === "../../assets/profile-images/Ellipse -3.png"} name="profilePic" value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile1} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profilePic === "../../assets/profile-images/Ellipse -1.png"} name="profilePic" value="../../assets/profile-images/Ellipse 1.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile2} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profilePic === "../../assets/profile-images/Ellipse -8.png"} name="profilePic" value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile3} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profilePic === "../../assets/profile-images/Ellipse -7.png"} name="profilePic" value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile4} alt="profile" />
                            </label>
                        </div>
                        <div className="error">{formValue.error.profilePic}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div id="gender">
                            <input type="radio" id="male" checked={formValue.gender === 'male'} onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender === 'female'} onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                        <div className="error">{formValue.error.gender}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartments.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" checked={getChecked(item)} onChange={() => onCheckChange(item)} name={item} defaultChecked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}
                        </div>
                        <div className="error">{formValue.error.department}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Salary:</label>
                        <input className="input" type="text" id="salary" name="salary" value={formValue.salary} onChange={changeValue} />
                        <div className="error">{formValue.error.salary}</div>
                    </div><br />
                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select value={formValue.day} onChange={changeValue} id="day" name="day">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select value={formValue.month} onChange={changeValue} id="month" name="month">
                                <option value="Jan">January</option>
                                <option value="Feb">February</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <select value={formValue.year} onChange={changeValue} id="year" name="year">
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                        <div className="error">{formValue.error.startDate}</div>
                    </div>
                    <br /><br />
                    <div className="row-content">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" placeholder=""
                            style={{ height: '100px' }}></textarea>
                        <div className="error">{formValue.error.notes}</div>
                    </div>
                    <div className="buttonParent">
                        <Link to="/home" className="resetButton button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>
                    <div className="displaymessage">
                        {displayMessage}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PayrollForm;