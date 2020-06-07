using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class fileIdAddedToVersionFiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_FileStatus_FileStatusId",
                table: "VersionFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FileStatus",
                table: "FileStatus");

            migrationBuilder.RenameTable(
                name: "FileStatus",
                newName: "FileStatuses");

            migrationBuilder.AlterColumn<int>(
                name: "FileId",
                table: "VersionFiles",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "cFileId",
                table: "VersionFiles",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FileStatuses",
                table: "FileStatuses",
                column: "Id");

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

            migrationBuilder.CreateIndex(
                name: "IX_VersionFiles_cFileId",
                table: "VersionFiles",
                column: "cFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles",
                column: "FileStatusId",
                principalTable: "FileStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Files_cFileId",
                table: "VersionFiles",
                column: "cFileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Files_cFileId",
                table: "VersionFiles");

            migrationBuilder.DropIndex(
                name: "IX_VersionFiles_cFileId",
                table: "VersionFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FileStatuses",
                table: "FileStatuses");

            migrationBuilder.DropColumn(
                name: "cFileId",
                table: "VersionFiles");

            migrationBuilder.RenameTable(
                name: "FileStatuses",
                newName: "FileStatus");

            migrationBuilder.AlterColumn<int>(
                name: "FileId",
                table: "VersionFiles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddPrimaryKey(
                name: "PK_FileStatus",
                table: "FileStatus",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "FileStatus",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 0, 49, 49, 708, DateTimeKind.Local).AddTicks(2868), new DateTime(2020, 6, 7, 0, 49, 49, 709, DateTimeKind.Local).AddTicks(7497) });

            migrationBuilder.UpdateData(
                table: "FileStatus",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 0, 49, 49, 711, DateTimeKind.Local).AddTicks(8677), new DateTime(2020, 6, 7, 0, 49, 49, 711, DateTimeKind.Local).AddTicks(8707) });

            migrationBuilder.UpdateData(
                table: "FileStatus",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 7, 0, 49, 49, 711, DateTimeKind.Local).AddTicks(8877), new DateTime(2020, 6, 7, 0, 49, 49, 711, DateTimeKind.Local).AddTicks(8880) });

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_FileStatus_FileStatusId",
                table: "VersionFiles",
                column: "FileStatusId",
                principalTable: "FileStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
