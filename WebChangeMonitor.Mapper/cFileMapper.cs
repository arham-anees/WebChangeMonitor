using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
    public class cFileMapper : IEntityTypeConfiguration<cFile> {
        public void Configure(EntityTypeBuilder<cFile> builder) {
            builder.Property(x => x.EncodedName).HasMaxLength(20);
            builder.Property(x => x.LocalName).HasMaxLength(200);
            builder.Property(x => x.ServerPath).HasMaxLength(100);
            builder.Property(x => x.HashedContent).HasMaxLength(100);
            builder.Property(x => x.ContentType).HasMaxLength(50);
        }
    }
}
