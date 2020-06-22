using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cUserRoleMapper : IEntityTypeConfiguration<cUserRole> {
		public void Configure(EntityTypeBuilder<cUserRole> builder) {
			//builder.Property(x => x.User).IsRequired();

			}
	}
}
