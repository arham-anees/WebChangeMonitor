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
			builder.HasOne(x => x.FileStatus).WithMany().HasForeignKey(x => x.FileStatusId);
			builder.HasOne(x => x.File).WithMany().HasForeignKey(x => x.FileId);
		}
	}
}
