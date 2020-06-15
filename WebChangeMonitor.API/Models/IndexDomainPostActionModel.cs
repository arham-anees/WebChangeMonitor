using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChangeMonitor.API.Models {
	public class IndexDomainPostActionModel {
		public string Domain { get; set; }
		public string ControlPanelUrl { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }

	}
}
