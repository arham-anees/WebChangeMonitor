using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebChangeMonitor.Data.Migrations
{
    public partial class fileStatusAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FileStatusId",
                table: "VersionFiles",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FileStatuses",
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
                    table.PrimaryKey("PK_FileStatuses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VersionFiles_FileStatusId",
                table: "VersionFiles",
                column: "FileStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles",
                column: "FileStatusId",
                principalTable: "FileStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VersionFiles_FileStatuses_FileStatusId",
                table: "VersionFiles");

            migrationBuilder.DropTable(
                name: "FileStatuses");

            migrationBuilder.DropIndex(
                name: "IX_VersionFiles_FileStatusId",
                table: "VersionFiles");

            migrationBuilder.DropColumn(
                name: "FileStatusId",
                table: "VersionFiles");
        }
    }
}
