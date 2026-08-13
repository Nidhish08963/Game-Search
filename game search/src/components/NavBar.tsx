import { useState } from 'react';


type DropdownItem = { label: string; href?: string; onClick?: () => void };

type DropdownGroup = {
    title: string;
    items: DropdownItem[];
};

interface NavBarProps{
    onSelectSort: (sortOrder: string) => void;
    onSelectRating: (rating: number) => void;
    onSelectGenre: (genre: string) => void;
}

function NavBar({onSelectSort,onSelectRating,onSelectGenre}: NavBarProps) {
    const defaultTitles = ['Sort By', 'Ratings', 'Genres'];
    const [groupTitles, setGroupTitles] = useState(defaultTitles);

    const handleItemClick = (groupIndex: number, label: string, onClick?: () => void) => {
        setGroupTitles(prev => {
            const newTitles = [...prev];
            newTitles[groupIndex] = label === 'All' ? defaultTitles[groupIndex] : label;
            return newTitles;
        });
        if (onClick) onClick();
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
                { label: 'All', onClick: () => onSelectRating(0) },
                { label: 'Highest Rated', onClick: () => onSelectRating(10) },
                { label: 'Lowest Rated', onClick: () => onSelectRating(1) }
            ]
        },
        {
            title: groupTitles[2],
            items: [
                { label: 'All', onClick: () => onSelectGenre("") },
                { label: 'Action', onClick: () => onSelectGenre("Action") },
                { label: 'RPG', onClick: () => onSelectGenre("RPG") },
                { label: 'Shooter', onClick: () => onSelectGenre("Shooter") },
                { label: 'Strategy', onClick: () => onSelectGenre("Strategy") }
            ]
        }
    ];

    return (
        <nav className="navbar navbar-expand-lg glass-navbar sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Home</a>
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
                                <ul className="dropdown-menu glass-dropdown">
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

                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;