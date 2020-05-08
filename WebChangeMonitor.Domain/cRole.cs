using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
    public class cRole {
        /// <summary>
        /// this is unique identifier of role
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// this is name of role
        /// </summary>
        public string RoleName { get; set; }
        /// <summary>
        /// this is date role is added on
        /// </summary>
        public DateTime DateAddedOn { get; set; }
        /// <summary>
        /// this indicates user who added role to system
        /// </summary>
        public string RoleAddedBy { get; set; }
        /// <summary>
        /// this indicates user who last modified user
        /// </summary>
        public string RoleLastModifiedBy { get; set; }
        /// <summary>
        /// this indicates date of last modification
        /// </summary>
        public DateTime DateLastModifiedOn { get; set; }
        /// <summary>
        /// this indicates status of role
        /// </summary>
        public bool IsActive { get; set; }
    }
}
