using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cRoleRepository :cRepository<cRole>,iRoleRepository{
		public cRoleRepository(AppDbContext context):base(context) {

		}
	}
}
