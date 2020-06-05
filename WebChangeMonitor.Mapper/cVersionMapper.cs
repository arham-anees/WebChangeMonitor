using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cVersionMapper : IEntityTypeConfiguration<cVersion> {
		public void Configure(EntityTypeBuilder<cVersion> builder) {
			builder.ToTable("Versions");
		}
	}
}
