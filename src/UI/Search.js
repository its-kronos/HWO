import { useState } from 'react';
import { pointTo } from '../utils/utils';

const SearchBar = ({ planets, setExo, orbitRaidus, LOS, setParams, setLOS }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortProperty, setSortProperty] = useState('ESI'); // Default sort by 'ESI'
  const [sortOrder, setSortOrder] = useState('descending'); // Default sort order
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  // List of sortable properties with user-friendly labels
  const sortableProperties = [
    { value: 'pl_rade', label: 'Planet Radius' },
    { value: 'ESI', label: 'ESI' },
    { value: 'st_rad', label: 'Star Radius' },
    { value: 'pl_insol', label: 'Stellar Flux' },
    { value: 'sy_vmag', label: 'Host Apparent Magnitude' },
    { value: 'sy_dist', label: 'Distance from Earth' },
  ];

  // Filter and sort the data
  const filteredResults = planets
    .filter(item => item.pl_name.toLowerCase().includes(searchQuery.toLowerCase()) && !isNaN(item[sortProperty]))
    .sort((a, b) => {
      const comparison = b[sortProperty] - a[sortProperty];
      return sortOrder === 'ascending' ? comparison : -comparison;
    })
    .slice(0, 10); // Limit to 10 results

  // Handle changing the sort property
  const handleSortPropertyChange = (e) => {
    setSortProperty(e.target.value);
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'ascending' ? 'descending' : 'ascending'));
  };

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)} // Set focus to true
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow button clicks
          className="flex-1 p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />

        {/* Sort Dropdown */}
        <select
          value={sortProperty}
          onChange={handleSortPropertyChange}
          onFocus={() => setIsFocused(true)} 
          className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 mx-2"
        >
          {sortableProperties.map(({ value, label }, index) => (
            <option key={index} value={value} onFocus={() => setIsFocused(true)} >
              Sort by {label}
            </option>
          ))}
        </select>

        {/* Sort Order Button */}
        <button
          onClick={toggleSortOrder}
          className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        >
          {sortOrder === 'ascending' ? <span className='p-3'>&uarr;</span> : <span className='p-3'>&darr;</span>}
        </button>
      </div>

      {/* Results */}
      {isFocused && (
        <ul className="space-y-1">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <li key={index} className="p-1 text-white border rounded-lg">
                {item.pl_name} - <span className='text-gray-500'>{sortableProperties.find(prop => prop.value === sortProperty).label}:</span> {parseFloat(item[sortProperty]).toFixed(2)}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => setExo(item)} className='btn btn-primary'>View</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => pointTo(item, orbitRaidus, LOS, setParams, setLOS )} className='btn btn-primary'>Point to</button>
              </li>
            ))
          ) : (
            <li className="p-1 text-gray-500">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
