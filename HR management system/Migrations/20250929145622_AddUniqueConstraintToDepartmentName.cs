using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR_management_system.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueConstraintToDepartmentName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
        name: "IX_Department_Name",
        table: "Departments",
        column: "Name",
        unique: true);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
        name: "IX_Department_Name",
        table: "Departments");

        }
    }
}
