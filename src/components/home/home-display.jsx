import React from 'react';
import './home.scss';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import EmployeeService from '../../services/employee-services';

var employee = new EmployeeService();

const Display = (props) => {
    const update = (id) => {
        let editEmployee;
        employee.getEmployee(id).then(employeeData => {
            editEmployee = employeeData.data;
            employee.updateEmployee(editEmployee, id);
        });
    }

    const remove = (id) => {
        employee.deleteEmployee(id);
        window.location.reload();
    }

    return (
        <table id="display" className="table">
            <tbody>

                <tr key={-1}>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Startdate</th>
                    <th>Actions</th>
                </tr>
                {
                    props.employeeArray && props.employeeArray.map((employee, ind) => (
                        <tr key={ind}>
                            <td><img className="profile" src={profile1} alt="" /></td>
                            <td>{employee.name}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.department && employee.department.map(dept =>
                                (<div className="dept-label">{dept}</div>))}</td>
                            <td> ₹ {employee.salary}</td>
                            <td>{employee.startDate}</td>
                            <td><img src={deleteIcon} onClick={() => remove(employee.id)} alt="delete" />
                                <img src={editIcon} onClick={() => update(employee.id)} alt="edit" /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Display;