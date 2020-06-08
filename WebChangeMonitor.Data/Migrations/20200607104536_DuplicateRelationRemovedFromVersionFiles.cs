using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class DuplicateRelationRemovedFromVersionFiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Files_cFileId",
                table: "VersionFiles");

            migrationBuilder.DropIndex(
                name: "IX_VersionFiles_cFileId",
                table: "VersionFiles");

            migrationBuilder.DropColumn(
                name: "cFileId",
                table: "VersionFiles");

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 45, 36, 143, DateTimeKind.Local).AddTicks(5961), new DateTime(2020, 6, 7, 15, 45, 36, 144, DateTimeKind.Local).AddTicks(8475) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 45, 36, 147, DateTimeKind.Local).AddTicks(4689), new DateTime(2020, 6, 7, 15, 45, 36, 147, DateTimeKind.Local).AddTicks(4725) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 45, 36, 147, DateTimeKind.Local).AddTicks(4978), new DateTime(2020, 6, 7, 15, 45, 36, 147, DateTimeKind.Local).AddTicks(4983) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "cFileId",
                table: "VersionFiles",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 41, 42, 872, DateTimeKind.Local).AddTicks(3985), new DateTime(2020, 6, 7, 15, 41, 42, 873, DateTimeKind.Local).AddTicks(7315) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 41, 42, 875, DateTimeKind.Local).AddTicks(9108), new DateTime(2020, 6, 7, 15, 41, 42, 875, DateTimeKind.Local).AddTicks(9132) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 15, 41, 42, 875, DateTimeKind.Local).AddTicks(9328), new DateTime(2020, 6, 7, 15, 41, 42, 875, DateTimeKind.Local).AddTicks(9333) });

            migrationBuilder.CreateIndex(
                name: "IX_VersionFiles_cFileId",
                table: "VersionFiles",
                column: "cFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Files_cFileId",
                table: "VersionFiles",
                column: "cFileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
