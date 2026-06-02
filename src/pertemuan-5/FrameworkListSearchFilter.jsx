import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedTag, setSelectedTag] = useState("");

  /Inisialisasi DataForm/;
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });
  /Inisialisasi Handle perubahan nilai input form/;
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const _selectedTag = dataForm.selectedTag.toString();

  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = _selectedTag
      ? framework.tags.includes(_selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Framework Directory
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Browse and discover popular JavaScript frameworks
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          onChange={handleChange}
        />

        <select
          className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-5xl mx-auto space-y-4">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
            </div>

            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {item.description}
            </p>

            <p className="text-sm text-gray-500 mb-3">
              Developer by{" "}
              <span className="font-medium text-gray-700">
                {item.details.developer}{" "}({item.details.releaseYear})
              </span>
            </p>

            <a
              href={item.details.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 text-sm font-medium hover:underline"
            >
              Visit Website
            </a>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredFrameworks.length === 0 && (
        <p className="text-center text-gray-400 mt-12">No results found.</p>
      )}
    </div>
  );
}
