using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class versionStatusAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "Versions",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "VersionStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    LastUpdatedBy = table.Column<int>(nullable: false),
                    LastUpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VersionStatuses", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "VersionStatuses",
                columns: new[] { "Id", "CreatedBy", "CreatedOn", "LastUpdatedBy", "LastUpdatedOn", "Name" },
                values: new object[] { 1, 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pending" });

            migrationBuilder.InsertData(
                table: "VersionStatuses",
                columns: new[] { "Id", "CreatedBy", "CreatedOn", "LastUpdatedBy", "LastUpdatedOn", "Name" },
                values: new object[] { 2, 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Uploaded" });

            migrationBuilder.InsertData(
                table: "VersionStatuses",
                columns: new[] { "Id", "CreatedBy", "CreatedOn", "LastUpdatedBy", "LastUpdatedOn", "Name" },
                values: new object[] { 3, 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Reverted" });

            migrationBuilder.CreateIndex(
                name: "IX_Versions_StatusId",
                table: "Versions",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Versions_VersionStatuses_StatusId",
                table: "Versions",
                column: "StatusId",
                principalTable: "VersionStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Versions_VersionStatuses_StatusId",
                table: "Versions");

            migrationBuilder.DropTable(
                name: "VersionStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Versions_StatusId",
                table: "Versions");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Versions");
        }
    }
}
