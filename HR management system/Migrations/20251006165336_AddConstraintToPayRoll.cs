using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR_management_system.Migrations
{
    /// <inheritdoc />
    public partial class AddConstraintToPayRoll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_PayRoll_Allowances_Positive",
                table: "PayRolls",
                sql: "[Allowances] >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_PayRoll_BasicSalary_Positive",
                table: "PayRolls",
                sql: "[BasicSalary] >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_PayRoll_Deductions_Valid",
                table: "PayRolls",
                sql: "[Deductions] <= [BasicSalary] + [Allowances]");

            migrationBuilder.AddCheckConstraint(
                name: "CK_PayRoll_NetSalary_Positive",
                table: "PayRolls",
                sql: "[NetSalary] >= 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_PayRoll_Allowances_Positive",
                table: "PayRolls");

            migrationBuilder.DropCheckConstraint(
                name: "CK_PayRoll_BasicSalary_Positive",
                table: "PayRolls");

            migrationBuilder.DropCheckConstraint(
                name: "CK_PayRoll_Deductions_Valid",
                table: "PayRolls");

            migrationBuilder.DropCheckConstraint(
                name: "CK_PayRoll_NetSalary_Positive",
                table: "PayRolls");
        }
    }
}
