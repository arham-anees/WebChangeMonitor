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
    [Migration("20200506200558_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebChangeMonitor.Domain.cFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EncodedName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Length")
                        .HasColumnType("int");

                    b.Property<string>("LocalName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LocalRelativePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ServerPath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UploadDateTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Files");
                });
#pragma warning restore 612, 618
        }
    }
}
