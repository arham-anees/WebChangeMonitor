using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cVersionFilesMapper : IEntityTypeConfiguration<cVersionFiles> {
		public void Configure(EntityTypeBuilder<cVersionFiles> builder) {
			builder.ToTable("VersionFiles");
		}
	}
}
