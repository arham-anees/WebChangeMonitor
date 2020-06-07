using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class statusIdAddToVersionFiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles");

            migrationBuilder.AlterColumn<int>(
                name: "FileStatusId",
                table: "VersionFiles",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles",
                column: "FileStatusId",
                principalTable: "FileStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles");

            migrationBuilder.AlterColumn<int>(
                name: "FileStatusId",
                table: "VersionFiles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles",
                column: "FileStatusId",
                principalTable: "FileStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
