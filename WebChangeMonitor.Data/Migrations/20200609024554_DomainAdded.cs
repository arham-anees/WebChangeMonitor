using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class DomainAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Versions_VersionId",
                table: "VersionFiles");

            migrationBuilder.AlterColumn<int>(
                name: "VersionId",
                table: "VersionFiles",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Domains",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    LastUpdatedBy = table.Column<int>(nullable: false),
                    LastUpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Domains", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 9, 7, 45, 53, 914, DateTimeKind.Local).AddTicks(2412), new DateTime(2020, 6, 9, 7, 45, 53, 915, DateTimeKind.Local).AddTicks(9236) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8594), new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8636) });

            migrationBuilder.UpdateData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedOn", "LastUpdatedOn" },
                values: new object[] { new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8926), new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8932) });

            migrationBuilder.InsertData(
                table: "FileStatuses",
                columns: new[] { "Id", "CreatedBy", "CreatedOn", "LastUpdatedBy", "LastUpdatedOn", "Name" },
                values: new object[] { 4, 0, new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8947), 0, new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8950), "Unmodified" });

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Versions_VersionId",
                table: "VersionFiles",
                column: "VersionId",
                principalTable: "Versions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_Versions_VersionId",
                table: "VersionFiles");

            migrationBuilder.DropTable(
                name: "Domains");

            migrationBuilder.DeleteData(
                table: "FileStatuses",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.AlterColumn<int>(
                name: "VersionId",
                table: "VersionFiles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

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

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Files_FileId",
                table: "VersionFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_Versions_VersionId",
                table: "VersionFiles",
                column: "VersionId",
                principalTable: "Versions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
