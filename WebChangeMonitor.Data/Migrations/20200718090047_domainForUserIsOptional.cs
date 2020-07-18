using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class domainForUserIsOptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DomainId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_DomainId",
                table: "Users",
                column: "DomainId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users",
                column: "DomainId",
                principalTable: "Domains",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
