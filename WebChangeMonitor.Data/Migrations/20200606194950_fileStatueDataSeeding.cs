using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class fileStatueDataSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FileStatuses",
                table: "FileStatuses");

            migrationBuilder.RenameTable(
                name: "FileStatuses",
                newName: "FileStatus");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FileStatus",
                table: "FileStatus",
                column: "Id");

            migrationBuilder.InsertData(
                table: "FileStatus",
                columns: new[] { "Id", "CreatedBy", "CreatedOn", "LastUpdatedBy", "LastUpdatedOn", "Name" },
                values: new object[] { 1, 0, new DateTime(2020, 6, 7, 0, 49, 49, 708, DateTimeKind.Local).AddTicks(2868), 0, new DateTime(2020, 6, 7, 0, 49, 49, 709, DateTimeKind.Local).AddTicks(7497), "Added" });

            migrationBuilder.InsertData(
                table: "FileStatus",
                columns: new[] { "Id", "CreatedBy", "CreatedOn", "LastUpdatedBy", "LastUpdatedOn", "Name" },
                values: new object[] { 2, 0, new DateTime(2020, 6, 7, 0, 49, 49, 711, DateTimeKind.Local).AddTicks(8677), 0, new DateTime(2020, 6, 7, 0, 49, 49, 711, DateTimeKind.Local).AddTicks(8707), "Updated" });

            migrationBuilder.InsertData(
                table: "FileStatus",
                columns: new[] { "Id", "CreatedBy", "CreatedOn", "LastUpdatedBy", "LastUpdatedOn", "Name" },
                values: new object[] { 3, 0, new DateTime(2020, 6, 7, 0, 49, 49, 711, DateTimeKind.Local).AddTicks(8877), 0, new DateTime(2020, 6, 7, 0, 49, 49, 711, DateTimeKind.Local).AddTicks(8880), "Deleted" });

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_FileStatus_FileStatusId",
                table: "VersionFiles",
                column: "FileStatusId",
                principalTable: "FileStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_FileStatus_FileStatusId",
                table: "VersionFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FileStatus",
                table: "FileStatus");

            migrationBuilder.DeleteData(
                table: "FileStatus",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FileStatus",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "FileStatus",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.RenameTable(
                name: "FileStatus",
                newName: "FileStatuses");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FileStatuses",
                table: "FileStatuses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles",
                column: "FileStatusId",
                principalTable: "FileStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
