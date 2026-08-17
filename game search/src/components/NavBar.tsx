import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type DropdownItem = { label: string; href?: string; onClick?: () => void };

type DropdownGroup = {
    title: string;
    items: DropdownItem[];
};

interface NavBarProps{
    genres: string[];
    onSelectSort: (sortOrder: string) => void;
    onSelectGenre: (genre: string) => void;
    onSearch: (searchText: string) => void;
}

function NavBar({ genres, onSelectSort, onSelectGenre, onSearch }: NavBarProps) {
    const defaultTitles = ['Sort By', 'Genres'];
    const [groupTitles, setGroupTitles] = useState(defaultTitles);

    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
        navigate('/');
    };

    const handleItemClick = (groupIndex: number, label: string, onClick?: () => void) => {
        setGroupTitles(prev => {
            const newTitles = [...prev];
            newTitles[groupIndex] = label === 'All' ? defaultTitles[groupIndex] : label;
            return newTitles;
        });
        if (onClick) onClick();
        navigate('/'); // Take the user back to the home page to see the filtered list!
    };

    const dropdownGroups: DropdownGroup[] = [
        {
            title: groupTitles[0],
            items: [
                { label: 'All', onClick: () => onSelectSort("") },
                { label: 'Relevance', onClick: () => onSelectSort("Relevance") },
                { label: 'Newest to Oldest', onClick: () => onSelectSort("Newest to Oldest") },
                { label: 'Oldest to Newest', onClick: () => onSelectSort("Oldest to Newest") }
            ]
        },
        {
            title: groupTitles[1],
            items: [
                { label: 'All', onClick: () => onSelectGenre("") },
                ...genres.map(genre => ({
                    label: genre,
                    onClick: () => onSelectGenre(genre)
                }))
            ]
        }
    ];

    return (
        <nav className="navbar navbar-expand-lg glass-navbar sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2 ms-2">
                        {dropdownGroups.map((group, groupIndex) => (
                            <li className="nav-item dropdown" key={groupIndex}>
                                <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {group.title}
                                </button>
                                <ul className="dropdown-menu glass-dropdown" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {group.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <a 
                                                className="dropdown-item" 
                                                href={item.href || "#"} 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleItemClick(groupIndex, item.label, item.onClick);
                                                }}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            ref={searchRef} 
                            className="form-control form-control-lg me-2" 
                            style={{ minWidth: '350px' }}
                            type="search" 
                            placeholder="Search games..." 
                            aria-label="Search"
                            onChange={handleSearchChange}
                        />
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;