using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cUserMapper : IEntityTypeConfiguration<cUser> {
		public void Configure(EntityTypeBuilder<cUser> builder) {
			builder.Property(x => x.FirstName).HasMaxLength(30).IsRequired(false);
			builder.Property(x => x.MiddleName).HasMaxLength(30).IsRequired(false);
			builder.Property(x => x.LastName).HasMaxLength(30).IsRequired(false);
			builder.Property(x => x.Address).HasMaxLength(100).IsRequired(false);
			builder.Property(x => x.City).HasMaxLength(30).IsRequired(false);
			builder.Property(x => x.UserName).HasMaxLength(30).IsRequired();
			builder.Property(x => x.HashedPassword).HasMaxLength(64).IsRequired();
			builder.Property(x => x.Email).HasMaxLength(50).IsRequired(false);
			builder.Property(x => x.Phone).HasMaxLength(15).IsRequired(false);
		}
	}
}
