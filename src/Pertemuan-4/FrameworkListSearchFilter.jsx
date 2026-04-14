import { useState } from "react";
import frameworkData from "./framework.json";
// import { motion, AnimatePresence } from "framer-motion";


export default function FrameworklistSearchFilter() {
    // const [searchTerm, setSearchTerm] = useState("");
    // const [selectedTag, setSelectedTag] = useState("");
    const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};

    const _searchTerm = dataForm.searchTerm.toLowerCase();

    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name
                .toLowerCase()
                .includes(_searchTerm) ||
            framework.description
                .toLowerCase()
                .includes(_searchTerm);

        const matchesTag = dataForm.selectedTag ? framework.tags.includes(dataForm.selectedTag) : true;

        return matchesSearch && matchesTag;


    });
    const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];
    return (
        <div className="min-h-screen bg-gray-50 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Framework Ecosystem
                    </h1>
                    <p className="mt-2 text-gray-500">Explore the most popular tools for modern development.</p>
                </header>

                <div className="grid gap-6">
                    <input
                        onChange={handleChange}
                        type="text"
                        name="searchTerm"
                        placeholder="Search framework..."
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />

                    <select
                        onChange={handleChange}
                        name="selectedTag"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    >
                        <option value="">All Tags</option>
                        {allTags.map((tag, index) => (
                            <option key={index} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                    {filteredFrameworks.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative border border-gray-100 p-6 rounded-2xl shadow-sm bg-white hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1">
                                    {/* Judul & Badge Tahun */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {item.name}
                                        </h2>
                                        <span className="text-[10px] uppercase tracking-widest font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100">
                                            Est. {item.details.releaseYear}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {item.description}
                                    </p>

                                    {/* Tags Section */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-50 text-gray-500 border border-gray-200 px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Sidebar Info di dalam Card */}
                                <div className="flex flex-col items-start md:items-end gap-3 min-w-[150px]">
                                    <div className="flex flex-col items-start md:items-end">
                                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Developer</span>
                                        <p className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                            {item.details.developer}
                                        </p>
                                    </div>

                                    <a
                                        href={item.details.officialWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-flex items-center text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors"
                                    >
                                        Visit Website
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}