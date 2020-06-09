﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebChangeMonitor.Data;

namespace WebChangeMonitor.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20200609024554_DomainAdded")]
    partial class DomainAdded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebChangeMonitor.Domain.cDomain", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("LastUpdatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastUpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Domains");
                });

            modelBuilder.Entity("WebChangeMonitor.Domain.cFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ContentType")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("EncodedName")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<int>("LastUpdatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastUpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<long>("Length")
                        .HasColumnType("bigint");

                    b.Property<string>("LocalName")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("LocalRelativePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ServerPath")
                        .HasColumnType("nvarchar(1000)")
                        .HasMaxLength(1000);

                    b.Property<DateTime>("UploadCompleteDateTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("UploadDateTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("WebChangeMonitor.Domain.cFileStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("LastUpdatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastUpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("FileStatuses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedBy = 0,
                            CreatedOn = new DateTime(2020, 6, 9, 7, 45, 53, 914, DateTimeKind.Local).AddTicks(2412),
                            LastUpdatedBy = 0,
                            LastUpdatedOn = new DateTime(2020, 6, 9, 7, 45, 53, 915, DateTimeKind.Local).AddTicks(9236),
                            Name = "Added"
                        },
                        new
                        {
                            Id = 2,
                            CreatedBy = 0,
                            CreatedOn = new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8594),
                            LastUpdatedBy = 0,
                            LastUpdatedOn = new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8636),
                            Name = "Updated"
                        },
                        new
                        {
                            Id = 3,
                            CreatedBy = 0,
                            CreatedOn = new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8926),
                            LastUpdatedBy = 0,
                            LastUpdatedOn = new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8932),
                            Name = "Deleted"
                        },
                        new
                        {
                            Id = 4,
                            CreatedBy = 0,
                            CreatedOn = new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8947),
                            LastUpdatedBy = 0,
                            LastUpdatedOn = new DateTime(2020, 6, 9, 7, 45, 53, 918, DateTimeKind.Local).AddTicks(8950),
                            Name = "Unmodified"
                        });
                });

            modelBuilder.Entity("WebChangeMonitor.Domain.cVersion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Domain")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LastUpdatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastUpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Version")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Versions");
                });

            modelBuilder.Entity("WebChangeMonitor.Domain.cVersionFiles", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("FileId")
                        .HasColumnType("int");

                    b.Property<int>("FileStatusId")
                        .HasColumnType("int");

                    b.Property<int>("LastUpdatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastUpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("VersionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FileId");

                    b.HasIndex("FileStatusId");

                    b.HasIndex("VersionId");

                    b.ToTable("VersionFiles");
                });

            modelBuilder.Entity("WebChangeMonitor.Domain.cVersionFiles", b =>
                {
                    b.HasOne("WebChangeMonitor.Domain.cFile", "File")
                        .WithMany()
                        .HasForeignKey("FileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebChangeMonitor.Domain.cFileStatus", "FileStatus")
                        .WithMany("VersionFiles")
                        .HasForeignKey("FileStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebChangeMonitor.Domain.cVersion", "Version")
                        .WithMany("VersionFiles")
                        .HasForeignKey("VersionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
