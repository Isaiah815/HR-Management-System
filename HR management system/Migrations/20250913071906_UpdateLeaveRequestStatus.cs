using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR_management_system.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLeaveRequestStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.Sql(@"
        UPDATE LeaveRequests
        SET Status = 
            CASE Status
                WHEN '0' THEN 'Pending'
                WHEN '1' THEN 'Approved'
                WHEN '2' THEN 'Rejected'
            END
    ");
            migrationBuilder.AlterColumn<string>(
         name: "Status",
         table: "LeaveRequests",
         type: "nvarchar(20)",
         nullable: false,
         oldClrType: typeof(int),
         oldType: "int");


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
        UPDATE LeaveRequests
        SET Status = 
            CASE Status
                WHEN 'Pending' THEN '0'
                WHEN 'Approved' THEN '1'
                WHEN 'Rejected' THEN '2'
            END
    ");

            migrationBuilder.AlterColumn<int>(
        name: "Status",
        table: "LeaveRequests",
        type: "int",
        nullable: false,
        oldClrType: typeof(string),
        oldType: "nvarchar(20)");
        }
    }
}
