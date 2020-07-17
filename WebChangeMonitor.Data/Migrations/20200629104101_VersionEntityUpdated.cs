using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class VersionEntityUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ControlPanelUrl",
                table: "Domains");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Domains");

            migrationBuilder.AddColumn<string>(
                name: "OutputFilesPath",
                table: "Versions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HomeUrl",
                table: "Domains",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ServerIp",
                table: "Domains",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TargetServerDirectory",
                table: "Domains",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OutputFilesPath",
                table: "Versions");

            migrationBuilder.DropColumn(
                name: "HomeUrl",
                table: "Domains");

            migrationBuilder.DropColumn(
                name: "ServerIp",
                table: "Domains");

            migrationBuilder.DropColumn(
                name: "TargetServerDirectory",
                table: "Domains");

            migrationBuilder.AddColumn<string>(
                name: "ControlPanelUrl",
                table: "Domains",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Domains",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
