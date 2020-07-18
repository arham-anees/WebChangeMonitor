using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChangeMonitor.API.Models {
	public class SignUpAuthActionModel {
		public string UserName { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public int Role { get; set; }
		public string Domain { get; set; }
		public string ServerUsername { get; set; }
		public string ServerPassword { get; set; }
		public string ControlPanelUrl { get; set; }
		public	string TargetDirectory { get; set; }
	}
}
