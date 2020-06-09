using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cDomainMapper : IEntityTypeConfiguration<cDomain> {
		public void Configure(EntityTypeBuilder<cDomain> builder) {
			builder.ToTable("Domains");
		}
	}
}
