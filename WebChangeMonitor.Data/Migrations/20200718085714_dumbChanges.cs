using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class dumbChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_DomainId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DomainId",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DomainId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Users_DomainId",
                table: "Users",
                column: "DomainId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users",
                column: "DomainId",
                principalTable: "Domains",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
