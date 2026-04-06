export const navitem = [
    {
    name: "Jobs", 
    path: "/dashboard/jobs" ,
    allowedRole:["admin","employee","employer"]
    },
    
    { 
    name: "Saved Jobs",
    path: "/dashboard/saved-jobs" ,
    allowedRole:["admin","employee"]
    },
    { 
    name: "Applied Jobs", 
    path: "/dashboard/applied-jobs" ,
    allowedRole:["admin","employee"]

    },
    { 
    name: "Settings",
    path: "/dashboard/settings",
    allowedRole:["admin","employee","employer"]
    },
    { 
    name: "Add Job",
    path: "/dashboard/Add-job",
    allowedRole:["admin","employer"]
    },
]