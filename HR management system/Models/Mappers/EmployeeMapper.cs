using HR_management_system.Models.DTOs;
using HR_management_system.Modules;

namespace HR_management_system.Models.Mappers
{
    public static class EmployeeMapper
    {
        public static EmployeeDTO ToDTO(Employee employee)
        {
            return new EmployeeDTO
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                JobTitle = employee.JobTitle,
                DepartmentId = employee.DepartmentId,
                Department = employee.Department !=null? new DepartmentDTO
                {
                    Name = employee.Department.Name,
                    Description = employee.Department.Description
                } : new DepartmentDTO(),
               
            };
        }
    }
}
