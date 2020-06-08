using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class firstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
