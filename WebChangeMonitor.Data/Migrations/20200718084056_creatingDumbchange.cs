using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class creatingDumbchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Domains_DomainId",
                table: "Users",
                column: "DomainId",
                principalTable: "Domains",
                principalColumn: "Id");
        }
    }
}
