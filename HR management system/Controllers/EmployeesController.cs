using HR_management_system.Models;
using HR_management_system.Modules;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using HR_management_system.Models.DTOs;
using HR_management_system.Models.Mappers;


namespace HR_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase

    {
        private readonly APIDBContext _context;
        public EmployeesController(APIDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var employees = _context.Employees
                .Include(e=> e.Department) 

                .ToList();
            var employeeDTOs = employees.Select(EmployeeMapper.ToDTO).ToList();
            return Ok(employeeDTOs);
        }


        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _context.Employees
                .Include(e => e.Department)
                .FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                return NotFound();

            }
            var dto = EmployeeMapper.ToDTO(employee);

            return Ok(dto);
        }

        [HttpPost]
        public IActionResult AddEmployee(EmplDTO employeeDTO)
        {
            var employeeEntity = new Employee()
            {
                FirstName = employeeDTO.FirstName,
                LastName = employeeDTO.LastName,
                Email = employeeDTO.Email,
                JobTitle = employeeDTO.JobTitle,

                DepartmentId = employeeDTO.DepartmentId
            };
            _context.Employees.Add(employeeEntity);
            _context.SaveChanges();
            return Ok(employeeEntity);

        }
        [HttpPut("{id:int}")]
        public IActionResult UpdateEmployee(int id, UpdateEmployeeDTO updateDTO)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            employee.FirstName = updateDTO.FirstName;
            employee.LastName = updateDTO.LastName;
            employee.Email = updateDTO.Email;
            employee.JobTitle = updateDTO.JobTitle;
            employee.DepartmentId = updateDTO.DepartmentId;
            _context.SaveChanges();
            return Ok(employee);
        }
        [HttpDelete("{id:int}")]
        public IActionResult DeleteEmployee(int id)
        {

            var employee = _context.Employees.Find(id);
            if (employee == null) { return NotFound(); }
            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return Ok(employee);
        }
    }
}
