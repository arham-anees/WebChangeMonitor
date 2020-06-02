using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChangeMonitor.API {
	public static class Log {
		public static void WriteLine(string message) {
			Console.WriteLine(message);
		}
		public static void WriteLine(Exception exception) {
			Console.WriteLine(exception.Message);
		}
	}
}
