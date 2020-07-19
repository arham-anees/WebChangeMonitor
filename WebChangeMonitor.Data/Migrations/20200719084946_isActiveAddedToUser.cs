using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class isActiveAddedToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "DomainId",
                table: "Users",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users",
                column: "DomainId",
                principalTable: "Domains",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "DomainId",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users",
                column: "DomainId",
                principalTable: "Domains",
                principalColumn: "Id");
        }
    }
}
