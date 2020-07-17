using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cVersionStatusRepository :cRepository<cVersionStatus>, iVersionStatusRepository{
		public cVersionStatusRepository(AppDbContext context):base(context) {}
	}
}
