using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Repositories.Interfaces {
	public interface iAcceptanceStatusRepository :iRepository<cAcceptanceStatus>{
		cAcceptanceStatus Get(cUser user);
		object Get(cVersion version);
	}
}
