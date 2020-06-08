using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class versionFilesToFilesRelationFixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles");

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 14, 4, 893, DateTimeKind.Local).AddTicks(9986), new DateTime(2020, 6, 7, 15, 14, 4, 895, DateTimeKind.Local).AddTicks(7644) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 14, 4, 898, DateTimeKind.Local).AddTicks(1098), new DateTime(2020, 6, 7, 15, 14, 4, 898, DateTimeKind.Local).AddTicks(1129) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 14, 4, 898, DateTimeKind.Local).AddTicks(1326), new DateTime(2020, 6, 7, 15, 14, 4, 898, DateTimeKind.Local).AddTicks(1330) });

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles");

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 12, 13, 12, 87, DateTimeKind.Local).AddTicks(9962), new DateTime(2020, 6, 7, 12, 13, 12, 89, DateTimeKind.Local).AddTicks(2843) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 12, 13, 12, 91, DateTimeKind.Local).AddTicks(2525), new DateTime(2020, 6, 7, 12, 13, 12, 91, DateTimeKind.Local).AddTicks(2548) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 12, 13, 12, 91, DateTimeKind.Local).AddTicks(2713), new DateTime(2020, 6, 7, 12, 13, 12, 91, DateTimeKind.Local).AddTicks(2717) });

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
