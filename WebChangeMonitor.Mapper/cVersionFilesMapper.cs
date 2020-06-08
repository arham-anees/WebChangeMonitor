using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cVersionFilesMapper : IEntityTypeConfiguration<cVersionFiles> {
		public void Configure(EntityTypeBuilder<cVersionFiles> builder) {
			builder.ToTable("VersionFiles");
			//builder.HasMany().WithOne().HasForeignKey(x=>x.FileStatusId);
			//builder.HasOne(x => x.File).WithMany().HasForeignKey("FileId").OnDelete(DeleteBehavior.NoAction);
			//builder.Property(x => x.File).HasColumnName("File");
		}
	}
}
