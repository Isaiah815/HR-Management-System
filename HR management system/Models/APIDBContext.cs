
using HR_management_system.Models;
using HR_management_system.Models.Entities;
using HR_management_system.Modules;
using Microsoft.EntityFrameworkCore;


namespace HR_management_system.Models
{
    public class APIDBContext : DbContext {
        public APIDBContext(DbContextOptions<APIDBContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<PayRoll> PayRolls { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.Employee)
                .WithMany(e => e.LeaveRequests)
                .HasForeignKey(lr => lr.EmployeeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.Department)
                .WithMany(d => d.LeaveRequests)
                .HasForeignKey(lr => lr.DepartmentId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<LeaveRequest>()
           .Property(lr => lr.Status)
           .HasConversion<string>();

            modelBuilder.Entity<Department>()
                .HasIndex(d => d.Name)
                .IsUnique();

           modelBuilder.Entity<PayRoll>()
          .ToTable(tb =>
         {
             tb.HasCheckConstraint("CK_PayRoll_BasicSalary_Positive", "[BasicSalary] >= 0");
             tb.HasCheckConstraint("CK_PayRoll_Allowances_Positive", "[Allowances] >= 0");
             tb.HasCheckConstraint("CK_PayRoll_NetSalary_Positive", "[NetSalary] >= 0");
             tb.HasCheckConstraint("CK_PayRoll_Deductions_Valid", "[Deductions] <= [BasicSalary] + [Allowances]");
         });

                modelBuilder.Entity<Attendance>()
                .Property(a => a.Date)
                .HasDefaultValueSql("GETDATE()");

        }

    }
}

