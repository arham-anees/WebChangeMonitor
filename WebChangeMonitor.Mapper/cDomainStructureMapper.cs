using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cDomainStructureMapper : IEntityTypeConfiguration<cDomainStructure> {
		public void Configure(EntityTypeBuilder<cDomainStructure> builder) {

		}
	}
}
