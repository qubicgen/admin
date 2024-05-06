import { useState, useEffect } from 'react';
// import a from "next/a"
import { Input } from "../components/ui/input"
import axios from 'axios';
import { Label } from "../components/ui/label"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../components/ui/table"
import './Admin.css'

function Admin() {
  const [data, setData] = useState({ queries: [], jobApplications: [], contacts: [], getInTouches: [] });
  const [selectedDataType, setSelectedDataType] = useState('queries');
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.qubicgen.com/api/fetchData', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data[selectedDataType].filter((item) => {
    // Filter logic based on the search term
    return (
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) 
      // ||
      // item.phone.toString().includes(searchTerm.toLowerCase()) 
    );
    
  });

  const handleLogout = () => {
    // Clear the token from cookies or wherever it's stored
    document.cookie = 'TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect or perform any other action after logout if needed
    // For example, redirect to login page
    window.location.href = '/admin/login';
  };


  const handleDataTypeChange = (event) => {
    setSelectedDataType(event.target.value);
  };
  return (
    token ? ( (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">


            
            <a className="flex items-center gap-2 font-semibold" href="#">
              <UsersIcon className="h-6 w-6" />
              <span className="">All Forms Data</span>
            </a>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {/* <div className="relative">
                <SearchIcon
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-white-500 " />
                <input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                  placeholder="Search individuals..."
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div> */}
              <div className="mt-4">
                <Label htmlFor="filter" className="text-xl font-semibold">Filter by Type</Label>
                <select id="dataType" value={selectedDataType} onChange={handleDataTypeChange} className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="queries">Queries</option>
                  <option value="jobApplications">Job Applications</option>
                  <option value="contacts">Contacts</option>
                  <option value="getInTouches">Get In Touches</option>
                </select>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header
          className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-red-100/40 px-6">
          <a className="lg:hidden" href="#">
            <UsersIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </a>
          <div className="w-full flex-1">
            <form>
              <div className="flex justify-evenly" >
              
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 "
                  placeholder="Search individuals..."
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}/>
                    {/* <SearchIcon
                  className=" relative right-44 top-1 text-yellow-500" /> */}
<button class="Btn" onClick={handleLogout}>
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div>
</button>




              </div>

            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
  {selectedDataType === 'queries' && (
    <div className="border shadow-sm rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : 'N/A'}</TableCell>
              <TableCell>{item.email || 'N/A'}</TableCell>
              <TableCell>{item.phone || 'N/A'}</TableCell>
              <TableCell>{item.jobTitle || 'N/A'}</TableCell>
              <TableCell>{item.company || 'N/A'}</TableCell>
              <TableCell>{item.message || 'N/A'}</TableCell>
              <TableCell>{item.date || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )}
  {selectedDataType === 'jobApplications' && (
    <div className="border shadow-sm rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Selected Job Role</TableHead>
            <TableHead>Education</TableHead>
            <TableHead>Work Experience</TableHead>
            <TableHead>Previous/Current Job</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.fullName || 'N/A'}</TableCell>
              <TableCell>{item.email || 'N/A'}</TableCell>
              <TableCell>{item.phone || 'N/A'}</TableCell>
              <TableCell>{item.selectedJobRole || 'N/A'}</TableCell>
              <TableCell>{item.education?.level || 'N/A'}</TableCell>
              <TableCell>{item.workExperience?.experienceLevel || 'N/A'}</TableCell>
              <TableCell>{item.workExperience?.jobTitle || 'N/A'}</TableCell>
              <TableCell>{item.resumeId ? <a href={`https://api.qubicgen.com/api/resume-download?fileName=${item.resumeId}`} target="_blank" rel="noopener noreferrer">View Resume</a> : 'N/A'}</TableCell>
              <TableCell>{item.date || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )}
  {selectedDataType === 'contacts' && (
    <div className="border shadow-sm rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.fullName || 'N/A'}</TableCell>
              <TableCell>{item.email || 'N/A'}</TableCell>
              <TableCell>{item.phone || 'N/A'}</TableCell>
              <TableCell>{item.message || 'N/A'}</TableCell>
              <TableCell>{item.type || 'N/A'}</TableCell>
              <TableCell>{item.date || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )}
  {selectedDataType === 'getInTouches' && (
    <div className="border shadow-sm rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.fullName || 'N/A'}</TableCell>
              <TableCell>{item.email || 'N/A'}</TableCell>
              <TableCell>{item.message || 'N/A'}</TableCell>
              <TableCell>{item.date || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )}
</main>


      </div>
    </div>)
  ): (
    <div>
      You are not logged in .   
      <a href="admin/login" className='text-blue-800' style={{textDecoration:'underline'}}> Go to Login Page</a>
    </div>
  )
  );
}


function UsersIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}

export default Admin;