using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

namespace WebChangeMonitor.API.Helper {
	public static class cHelper {

		/// <summary>
		/// this method returns username of current user
		/// </summary>
		/// <param name="context">request context</param>
		/// <returns>username of authenticated user</returns>
		public static string Username(HttpContext context) {
			if (context.User.HasClaim(x => x.Type == ClaimTypes.NameIdentifier))
				return context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
			return null;
		}
		/// <summary>
		/// this method returns user who sent request to server
		/// </summary>
		/// <param name="context">request context</param>
		/// <param name="unitOfWork">unit of work of context</param>
		/// <returns>user if provided token is correct else null</returns>
		public static cUser User(HttpContext context, iUnitOfWork unitOfWork) {
			var username = Username(context);
			if (username == null)
				return null;
			return unitOfWork.UserRepository.Get(username);
		}
		/// <summary>
		/// this method returns role name of current user
		/// </summary>
		/// <param name="context">request context</param>
		/// <returns>role name of authenticated user</returns>
		public static string Role(HttpContext context) {
			if (context.User.HasClaim(x => x.Type == ClaimTypes.Role))
				return context.User.FindFirst(c => c.Type == ClaimTypes.Role).Value;
			return null;
		}
	}
}
