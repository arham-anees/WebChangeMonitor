using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Repositories.Interfaces {
	public interface iVersionRepository :iRepository<cVersion>{
		cVersion Get();
		dynamic GetAll(int userId);

		object GetList();

		cUser LastModifiedBy(int id);
	}
}
