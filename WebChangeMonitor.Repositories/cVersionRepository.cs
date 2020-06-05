using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cVersionRepository :cRepository<cVersion>, iVersionRepository {
		public cVersionRepository(AppDbContext context) : base(context) { }
	}
}
