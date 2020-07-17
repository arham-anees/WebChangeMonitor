using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cDomainRepository :cRepository<cDomain>, iDomainRepository{
		public cDomainRepository(AppDbContext context):base(context) {}
	}
}
