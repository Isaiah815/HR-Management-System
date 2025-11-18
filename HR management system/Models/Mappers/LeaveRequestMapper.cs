using HR_management_system.Models.DTOs;

namespace HR_management_system.Models.Mappers
{
    public class LeaveRequestMapper
    {
        public static LeaveRequestDTO ToDTO(LeaveRequest leaveRequest)
        {
            return new LeaveRequestDTO
            {
                Id = leaveRequest.LeaveRequestId,
                EmployeeId = leaveRequest.EmployeeId,
                DepartmentId = leaveRequest.DepartmentId,
                StartDate = leaveRequest.StartDate,
                EndDate = leaveRequest.EndDate,
                Reason = leaveRequest.Reason,
                Status = leaveRequest.Status,
                Department = leaveRequest.Department != null ? new DepartmentDTO
                {
                    Name = leaveRequest.Department.Name,
                    Description = leaveRequest.Department.Description
                } : new DepartmentDTO(),

                Employee = leaveRequest.Employee != null ? new EmplDTO
                {

                    FirstName = leaveRequest.Employee.FirstName,
                    LastName = leaveRequest.Employee.LastName,
                    Email = leaveRequest.Employee.Email,
                    JobTitle = leaveRequest.Employee.JobTitle,
                    DepartmentId = leaveRequest.Employee.DepartmentId
                } : new EmplDTO()
            };
        }
    }
}
